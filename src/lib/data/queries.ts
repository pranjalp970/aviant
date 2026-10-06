import "server-only";
import { lessonBySlug } from "@/content/lessons";
import type { RatingId } from "@/content/types";
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

export async function markLessonViewed(slug: string) {
  const supabase = await createClient();
  await supabase.from("lesson_progress").upsert({ slug, last_viewed_at: new Date().toISOString() }, { onConflict: "user_id,slug" });
}

export interface ResumeItem {
  kind: "lesson" | "quiz" | "oral";
  title: string;
  href: string;
  detail: string;
  at: string;
}

/** The single most recent thing the student did, to offer "pick up where you left off". */
export async function lastActivity(rating: RatingId): Promise<ResumeItem | null> {
  const supabase = await createClient();
  const [lesson, quiz, oral] = await Promise.all([
    supabase.from("lesson_progress").select("slug, last_viewed_at").order("last_viewed_at", { ascending: false }).limit(5),
    supabase.from("quiz_attempts").select("quiz_id, quiz_title, score, total, created_at").eq("rating", rating).order("created_at", { ascending: false }).limit(1),
    supabase.from("oral_sessions").select("mode, avg_score, updated_at").eq("rating", rating).order("updated_at", { ascending: false }).limit(1),
  ]);

  const items: ResumeItem[] = [];
  const l = (lesson.data ?? []).map((r) => ({ r, lesson: lessonBySlug(r.slug) })).find((x) => x.lesson?.rating === rating);
  if (l?.lesson) items.push({ kind: "lesson", title: l.lesson.title, href: `/portal/study/${l.lesson.slug}`, detail: `Study guide · ${l.lesson.minutes} min`, at: l.r.last_viewed_at });
  const q = quiz.data?.[0];
  if (q)
    items.push({
      kind: "quiz",
      title: q.quiz_title,
      href: `/portal/quizzes/${q.quiz_id}`,
      detail: `Last score ${Math.round((q.score / q.total) * 100)}% · try a fresh set`,
      at: q.created_at,
    });
  const o = oral.data?.[0];
  if (o)
    items.push({
      kind: "oral",
      title: o.mode === "examine" ? "Mock oral exam" : "Session with your CFI",
      href: `/portal/assistant?mode=${o.mode}`,
      detail: o.avg_score != null ? `Last session ${Math.round(Number(o.avg_score) * 100)}%` : "Continue the conversation",
      at: o.updated_at,
    });
  return items.sort((a, b) => b.at.localeCompare(a.at))[0] ?? null;
}
