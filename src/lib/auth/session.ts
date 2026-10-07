import "server-only";
import { cache } from "react";
import { availableRating } from "@/content/acs";
import type { RatingId } from "@/content/types";
import { createClient } from "@/lib/supabase/server";

export type Confidence = 1 | 2 | 3; // new to me / somewhat / confident

export interface Session {
  id: string;
  name: string;
  email: string;
  rating: RatingId;
  voiceCfi: string | null;
  voiceDpe: string | null;
  /** YYYY-MM-DD, or null if not set. */
  checkrideDate: string | null;
  // ── study plan (migration 005) ──
  writtenStatus: "not_taken" | "passed";
  writtenDate: string | null;
  writtenScore: number | null;
  missedAcsCodes: string[];
  studyDaysPerWeek: number;
  studyMinutesPerDay: number;
  topicConfidence: Record<string, Confidence>;
  timezone: string | null;
  onboarded: boolean;
  irWaitlist: boolean;
}

type ProfileRow = Partial<{
  name: string;
  rating: string;
  voice_cfi: string | null;
  voice_dpe: string | null;
  checkride_date: string | null;
  written_status: string;
  written_date: string | null;
  written_score: number | null;
  missed_acs_codes: string[] | null;
  study_days_per_week: number;
  study_minutes_per_day: number;
  topic_confidence: Record<string, Confidence> | null;
  timezone: string | null;
  onboarded_at: string | null;
  ir_waitlist: boolean;
}>;

// Newest schema first; older column sets keep the app working before a migration is applied.
const COLUMN_SETS = [
  "name, rating, voice_cfi, voice_dpe, checkride_date, written_status, written_date, written_score, missed_acs_codes, study_days_per_week, study_minutes_per_day, topic_confidence, timezone, onboarded_at, ir_waitlist",
  "name, rating, voice_cfi, voice_dpe, checkride_date",
  "name, rating, voice_cfi, voice_dpe",
];

/**
 * The signed-in student (Supabase Auth + their profile row), or null.
 * Cached per request so layouts and pages can both call it cheaply.
 */
export const getSession = cache(async (): Promise<Session | null> => {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const claims = claimsData?.claims;
  if (!claims?.sub) return null;

  let profile: ProfileRow | null = null;
  let hasPlanColumns = false;
  for (const [i, cols] of COLUMN_SETS.entries()) {
    const { data, error } = await supabase.from("profiles").select(cols).eq("id", claims.sub).maybeSingle<ProfileRow>();
    if (!error) {
      profile = data;
      hasPlanColumns = i === 0;
      break;
    }
  }

  const email = (claims.email as string | undefined) ?? "";
  const meta = (claims.user_metadata ?? {}) as { name?: string };
  return {
    id: claims.sub,
    email,
    name: profile?.name || meta.name || email.split("@")[0] || "Pilot",
    rating: availableRating(profile?.rating),
    voiceCfi: profile?.voice_cfi ?? null,
    voiceDpe: profile?.voice_dpe ?? null,
    checkrideDate: profile?.checkride_date ?? null,
    writtenStatus: profile?.written_status === "passed" ? "passed" : "not_taken",
    writtenDate: profile?.written_date ?? null,
    writtenScore: profile?.written_score ?? null,
    missedAcsCodes: profile?.missed_acs_codes ?? [],
    studyDaysPerWeek: profile?.study_days_per_week ?? 5,
    studyMinutesPerDay: profile?.study_minutes_per_day ?? 30,
    topicConfidence: profile?.topic_confidence ?? {},
    timezone: profile?.timezone ?? null,
    // Before migration 005 there is nowhere to store onboarding, so don't force it.
    onboarded: hasPlanColumns ? !!profile?.onboarded_at : true,
    irWaitlist: profile?.ir_waitlist ?? false,
  };
});
