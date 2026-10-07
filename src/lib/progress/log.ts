import "server-only";
import { getSession } from "@/lib/auth/session";
import { localToday } from "@/lib/plan/load";
import { createClient } from "@/lib/supabase/server";
import { XP } from "./xp";

export interface StudyActivity {
  minutes: number;
  questions?: number;
  correct?: number;
  sessions?: number;
  xp?: number;
}

/**
 * Add activity to today's study log (streaks, daily goal, XP) in the student's
 * own timezone, and award the daily-goal bonus the first time the goal is met.
 * Never throws: logging must not break studying (e.g. before migration 005).
 */
export async function logStudy(a: StudyActivity) {
  try {
    const session = await getSession();
    if (!session) return;
    const supabase = await createClient();
    const day = localToday(session.timezone);
    const { error } = await supabase.rpc("log_study", {
      p_day: day,
      p_minutes: Math.max(0, Math.round(a.minutes * 100) / 100),
      p_questions: a.questions ?? 0,
      p_correct: a.correct ?? 0,
      p_sessions: a.sessions ?? 0,
      p_xp: a.xp ?? 0,
    });
    if (error) return;

    const { data: row } = await supabase.from("study_log").select("minutes").eq("day", day).maybeSingle();
    if (row && Number(row.minutes) >= session.studyMinutesPerDay) {
      // primary key (user_id, id) makes this a no-op after the first time today
      await supabase.from("achievements").upsert({ id: `goal-${day}`, xp: XP.dailyGoal }, { onConflict: "user_id,id", ignoreDuplicates: true });
    }
  } catch (e) {
    console.warn("logStudy skipped:", e instanceof Error ? e.message : e);
  }
}
