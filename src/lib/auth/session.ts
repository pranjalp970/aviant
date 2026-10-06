import "server-only";
import { cache } from "react";
import type { RatingId } from "@/content/types";
import { createClient } from "@/lib/supabase/server";

export interface Session {
  id: string;
  name: string;
  email: string;
  rating: RatingId;
  voiceCfi: string | null;
  voiceDpe: string | null;
  /** YYYY-MM-DD, or null if not set. */
  checkrideDate: string | null;
}

/**
 * The signed-in student (Supabase Auth + their profile row), or null.
 * Cached per request so layouts and pages can both call it cheaply.
 */
export const getSession = cache(async (): Promise<Session | null> => {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const claims = claimsData?.claims;
  if (!claims?.sub) return null;

  type ProfileRow = { name: string; rating: string; voice_cfi: string | null; voice_dpe: string | null; checkride_date?: string | null };
  const first = await supabase
    .from("profiles")
    .select("name, rating, voice_cfi, voice_dpe, checkride_date")
    .eq("id", claims.sub)
    .maybeSingle<ProfileRow>();
  let profile = first.data;
  if (first.error) {
    // checkride_date arrives with migration 004; keep working before it's applied
    ({ data: profile } = await supabase.from("profiles").select("name, rating, voice_cfi, voice_dpe").eq("id", claims.sub).maybeSingle<ProfileRow>());
  }

  const email = (claims.email as string | undefined) ?? "";
  const meta = (claims.user_metadata ?? {}) as { name?: string };
  return {
    id: claims.sub,
    email,
    name: profile?.name || meta.name || email.split("@")[0] || "Pilot",
    rating: profile?.rating === "ir" ? "ir" : "ppl",
    voiceCfi: profile?.voice_cfi ?? null,
    voiceDpe: profile?.voice_dpe ?? null,
    checkrideDate: profile?.checkride_date ?? null,
  };
});
