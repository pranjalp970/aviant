import "server-only";
import type { Session } from "@/lib/auth/session";
import { recentOralSessions, recentQuizAttempts } from "@/lib/data/queries";
import { allReviews, dueQuestions, type ReviewRow } from "@/lib/review";
import { createClient } from "@/lib/supabase/server";
import { buildPlan, type Plan } from "./engine";

/** Today's date (YYYY-MM-DD) in the student's timezone, falling back to UTC. */
export function localToday(timezone: string | null): string {
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: timezone ?? "UTC", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

export interface StudyLogRow {
  day: string;
  minutes: number;
  questions: number;
  correct: number;
  sessions: number;
  xp: number;
}

/** Recent daily study log (newest first). Empty before migration 005. */
export async function studyLog(days = 120): Promise<StudyLogRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("study_log").select("day, minutes, questions, correct, sessions, xp").order("day", { ascending: false }).limit(days);
  if (error) return [];
  return (data ?? []).map((r) => ({ ...r, minutes: Number(r.minutes) })) as StudyLogRow[];
}

export interface PlanContext {
  plan: Plan;
  reviews: ReviewRow[];
  log: StudyLogRow[];
  today: string;
  attempts: Awaited<ReturnType<typeof recentQuizAttempts>>;
  orals: Awaited<ReturnType<typeof recentOralSessions>>;
}

/** Everything the dashboard and plan page need, with the plan computed from live data. */
export async function loadPlan(session: Session): Promise<PlanContext> {
  const today = localToday(session.timezone);
  const [reviews, attempts, orals, log] = await Promise.all([
    allReviews(),
    recentQuizAttempts(session.rating, 20),
    recentOralSessions(session.rating, 20),
    studyLog(1000),
  ]);
  const todayRow = log.find((r) => r.day === today);
  const plan = buildPlan({
    today,
    writtenStatus: session.writtenStatus,
    writtenDate: session.writtenDate,
    checkrideDate: session.checkrideDate,
    missedAcsCodes: session.missedAcsCodes,
    studyDaysPerWeek: session.studyDaysPerWeek,
    studyMinutesPerDay: session.studyMinutesPerDay,
    topicConfidence: session.topicConfidence,
    reviews,
    dueCount: dueQuestions(reviews, session.rating).length,
    attempts,
    orals,
    todayLog: todayRow ? { minutes: todayRow.minutes, questions: todayRow.questions } : null,
  });
  return { plan, reviews, log, today, attempts, orals };
}
