"use server";

import Anthropic, { toFile } from "@anthropic-ai/sdk";
import { revalidatePath } from "next/cache";
import type { CheckrideDocument } from "@/lib/ai/types";
import { getSession } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "checkride-docs";
const MAX_FILES = 4;

export interface UploadedFile {
  path: string; // `${userId}/…` in Supabase storage (uploaded by the browser)
  name: string;
  mime: string;
  kind: CheckrideDocument["kind"];
}

/**
 * Create a mock checkride: copy each uploaded file from our private storage to
 * Claude's Files API (so the examiner can read it every turn without re-sending
 * it), then save the session. Returns the new session id.
 */
export async function createCheckride(input: {
  aircraft: string;
  departure: string;
  destination: string;
  notes: string;
  files: UploadedFile[];
}): Promise<{ id?: string; error?: string }> {
  const session = await getSession();
  if (!session) return { error: "Please log in again." };
  if (!process.env.ANTHROPIC_API_KEY) return { error: "The AI examiner isn't configured yet." };
  if (input.files.length > MAX_FILES) return { error: `Upload at most ${MAX_FILES} files.` };
  // Only accept files from this student's own folder.
  if (input.files.some((f) => !f.path.startsWith(`${session.id}/`))) return { error: "Invalid file." };

  const supabase = await createClient();
  const anthropic = new Anthropic();
  const documents: CheckrideDocument[] = [];
  try {
    for (const f of input.files) {
      const { data, error } = await supabase.storage.from(BUCKET).download(f.path);
      if (error || !data) throw new Error(`Couldn't read ${f.name}`);
      const uploaded = await anthropic.files.upload({
        file: await toFile(Buffer.from(await data.arrayBuffer()), f.name, { type: f.mime }),
      });
      documents.push({ fileId: uploaded.id, kind: f.kind, name: f.name, mime: f.mime, path: f.path });
    }
  } catch (e) {
    console.error("createCheckride upload", e);
    await Promise.allSettled(documents.map((d) => anthropic.files.delete(d.fileId)));
    return { error: e instanceof Error && e.message.startsWith("Couldn't") ? e.message : "We couldn't prepare your documents. Try again, or try a smaller file." };
  }

  const clip = (s: string, n: number) => s.trim().slice(0, n);
  const { data: row, error } = await supabase
    .from("checkride_sessions")
    .insert({
      rating: session.rating,
      aircraft: clip(input.aircraft, 80),
      departure: clip(input.departure, 40).toUpperCase(),
      destination: clip(input.destination, 40).toUpperCase(),
      notes: clip(input.notes, 1500),
      documents,
    })
    .select("id")
    .single();
  if (error || !row) {
    console.error("createCheckride insert", error?.message);
    await Promise.allSettled(documents.map((d) => anthropic.files.delete(d.fileId)));
    return { error: "We couldn't save your checkride. Make sure the latest database update has been applied." };
  }
  revalidatePath("/portal/checkride");
  return { id: row.id };
}

/** Delete a checkride session and its files (storage + Claude Files API). */
export async function deleteCheckride(id: string): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  const { data: row } = await supabase.from("checkride_sessions").select("documents").eq("id", id).maybeSingle();
  if (!row) return { ok: false };
  const docs = (row.documents ?? []) as CheckrideDocument[];
  if (process.env.ANTHROPIC_API_KEY && docs.length) {
    const anthropic = new Anthropic();
    await Promise.allSettled(docs.map((d) => anthropic.files.delete(d.fileId)));
  }
  if (docs.length) await supabase.storage.from(BUCKET).remove(docs.map((d) => d.path));
  await supabase.from("checkride_sessions").delete().eq("id", id);
  revalidatePath("/portal/checkride");
  return { ok: true };
}
