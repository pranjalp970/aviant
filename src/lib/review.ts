import "server-only";
import { questionById } from "@/content/questions";
import type { McQuestion, RatingId } from "@/content/types";
import { createClient } from "@/lib/supabase/server";

/**
 * Spaced repetition (Leitner boxes 1–5).
 * Wrong → box 1, due immediately. Right → next box, due after that box's interval.
 * Box 4+ counts as mastered.
 */
const INTERVAL_DAYS = [0, 0, 1, 3, 7, 21]; // index = box
export const MASTERED_BOX = 4;

export interface ReviewRow {
  question_id: string;
  topic: string | null;
  box: number;
  due_at: string;
  last_correct: boolean;
  times_seen: number;
  times_wrong: number;
  updated_at: string;
}

/** Apply a batch of answers (from a quiz or flashcards) to the review schedule. */
export async function recordAnswers(answers: { questionId: string; topic?: string; correct: boolean }[]) {
  if (!answers.length) return;
  const supabase = await createClient();
  const ids = answers.map((a) => a.questionId);
  const { data: existing, error } = await supabase
    .from("question_reviews")
    .select("question_id, box, times_seen, times_wrong")
    .in("question_id", ids);
  if (error) {
    console.warn("question_reviews unavailable (run migration 004):", error.message);
    return;
  }
  const prev = new Map((existing ?? []).map((r) => [r.question_id, r]));
  const now = Date.now();
  const rows = answers.map((a) => {
    const p = prev.get(a.questionId);
    const box = a.correct ? Math.min(5, (p?.box ?? 1) + 1) : 1;
    return {
      question_id: a.questionId,
      topic: a.topic ?? null,
      box,
      due_at: new Date(now + INTERVAL_DAYS[box] * 86_400_000).toISOString(),
      last_correct: a.correct,
      times_seen: (p?.times_seen ?? 0) + 1,
      times_wrong: (p?.times_wrong ?? 0) + (a.correct ? 0 : 1),
      updated_at: new Date(now).toISOString(),
    };
  });
  const { error: upsertError } = await supabase.from("question_reviews").upsert(rows, { onConflict: "user_id,question_id" });
  if (upsertError) console.error("recordAnswers", upsertError.message);
}

/** Every review row for this student (small: at most one per bank question). */
export async function allReviews(): Promise<ReviewRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("question_reviews")
    .select("question_id, topic, box, due_at, last_correct, times_seen, times_wrong, updated_at");
  if (error) return [];
  return (data ?? []) as ReviewRow[];
}

const asMc = (id: string) => {
  const q = questionById(id);
  return q && q.kind === "mc" ? q : null;
};

/** Questions due now, most-forgotten first (lowest box, then oldest due date). */
export function dueQuestions(rows: ReviewRow[], rating: RatingId): McQuestion[] {
  const now = Date.now();
  return rows
    .filter((r) => new Date(r.due_at).getTime() <= now)
    .sort((a, b) => a.box - b.box || a.due_at.localeCompare(b.due_at))
    .map((r) => asMc(r.question_id))
    .filter((q): q is McQuestion => !!q && q.rating === rating);
}

export function reviewStats(rows: ReviewRow[], rating: RatingId) {
  const mine = rows.filter((r) => asMc(r.question_id)?.rating === rating);
  const now = Date.now();
  return {
    seen: mine.length,
    due: mine.filter((r) => new Date(r.due_at).getTime() <= now).length,
    missed: mine.filter((r) => !r.last_correct).length,
    mastered: mine.filter((r) => r.box >= MASTERED_BOX).length,
  };
}
