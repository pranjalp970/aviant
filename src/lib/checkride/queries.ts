import "server-only";
import type { CheckrideContext, CheckrideDocument } from "@/lib/ai/types";
import { createClient } from "@/lib/supabase/server";

export interface CheckrideRow {
  id: string;
  rating: string;
  aircraft: string;
  departure: string;
  destination: string;
  notes: string;
  documents: CheckrideDocument[];
  created_at: string;
}

export async function listCheckrides(): Promise<CheckrideRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("checkride_sessions")
    .select("id, rating, aircraft, departure, destination, notes, documents, created_at")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) return [];
  return (data ?? []) as CheckrideRow[];
}

/** RLS limits this to the signed-in student's own sessions. */
export async function getCheckride(id: string): Promise<CheckrideRow | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("checkride_sessions")
    .select("id, rating, aircraft, departure, destination, notes, documents, created_at")
    .eq("id", id)
    .maybeSingle();
  return (data as CheckrideRow | null) ?? null;
}

export const toContext = (row: CheckrideRow): CheckrideContext => ({
  aircraft: row.aircraft,
  departure: row.departure,
  destination: row.destination,
  notes: row.notes,
  documents: row.documents,
});
