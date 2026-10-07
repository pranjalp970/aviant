import "server-only";
import type { RatingId } from "@/content/types";
import { logStudy } from "@/lib/progress/log";
import { XP } from "@/lib/progress/xp";
import { createClient } from "@/lib/supabase/server";
import type { QuizAnswerRecord } from "./actions";

export interface QuizAttemptRow {
  id: string;
  quiz_id: string;
  quiz_title: string;
  score: number;
  total: number;
  duration_sec: number | null;
  answers: QuizAnswerRecord[];
  created_at: string;
}

export interface OralSessionRow {
  id: string;
  mode: "teach" | "examine";
  grades: { prompt: string; score: number; hits: string[]; misses: string[] }[];
  transcript: { role: string; content: string }[];
  avg_score: number | null;
  updated_at: string;
}

export async function recentQuizAttempts(rating: RatingId, limit = 20) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("quiz_attempts")
    .select("id, quiz_id, quiz_title, score, total, duration_sec, answers, created_at")
    .eq("rating", rating)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as QuizAttemptRow[];
}

export async function recentOralSessions(rating: RatingId, limit = 20) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("oral_sessions")
    .select("id, mode, grades, transcript, avg_score, updated_at")
    .eq("rating", rating)
    .order("updated_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as OralSessionRow[];
}

export async function markLessonViewed(slug: string, lessonMinutes: number, timezone: string | null) {
  const supabase = await createClient();
  const { data: prev } = await supabase.from("lesson_progress").select("last_viewed_at").eq("slug", slug).maybeSingle();
  await supabase.from("lesson_progress").upsert({ slug, last_viewed_at: new Date().toISOString() }, { onConflict: "user_id,slug" });
  // count a lesson toward study time once per day
  const day = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: timezone ?? "UTC" }).format(new Date(iso));
  if (!prev || day(prev.last_viewed_at) !== day(new Date().toISOString())) {
    await logStudy({ minutes: lessonMinutes, sessions: 1, xp: XP.lesson });
  }
}

