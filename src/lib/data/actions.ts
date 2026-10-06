"use server";

import { revalidatePath } from "next/cache";
import type { RatingId } from "@/content/types";
import type { AssistantMode, ChatMessage, Grade } from "@/lib/ai/types";
import { createClient } from "@/lib/supabase/server";
import { questionById } from "@/content/questions";
import { recordAnswers } from "@/lib/review";
import type { VoiceRole } from "@/lib/tts/voices";

/** Writes go through these actions; RLS on every table limits them to the signed-in student's rows. */

export interface QuizAnswerRecord {
  questionId: string;
  topic?: string;
  correct: boolean;
  chosen: string | null;
}

export async function saveQuizAttempt(input: {
  quizId: string;
  quizTitle: string;
  rating: RatingId;
  score: number;
  total: number;
  durationSec: number;
  answers: QuizAnswerRecord[];
}): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  const { error } = await supabase.from("quiz_attempts").insert({
    quiz_id: input.quizId,
    quiz_title: input.quizTitle,
    rating: input.rating,
    score: input.score,
    total: input.total,
    duration_sec: input.durationSec,
    answers: input.answers,
  });
  if (error) {
    console.error("saveQuizAttempt", error.message);
    return { ok: false };
  }
  // Answered questions feed the spaced-repetition schedule (unanswered ones don't count).
  await recordAnswers(input.answers.filter((a) => a.chosen !== null).map(({ questionId, topic, correct }) => ({ questionId, topic, correct })));
  revalidatePath("/portal");
  revalidatePath("/portal/review");
  revalidatePath("/portal/history");
  return { ok: true };
}

/** Create (no id) or update an oral session as the conversation goes on. Returns the row id. */
export async function saveOralSession(input: {
  id: string | null;
  mode: AssistantMode;
  rating: RatingId;
  transcript: ChatMessage[];
  grades: Grade[];
  checkrideId?: string | null;
}): Promise<{ id: string | null }> {
  const supabase = await createClient();
  const avg = input.grades.length ? input.grades.reduce((n, g) => n + g.score, 0) / input.grades.length : null;
  const row = {
    mode: input.mode,
    rating: input.rating,
    transcript: input.transcript,
    grades: input.grades,
    avg_score: avg,
    ...(input.checkrideId ? { checkride_id: input.checkrideId } : {}),
  };

  const { data, error } = input.id
    ? await supabase.from("oral_sessions").update(row).eq("id", input.id).select("id").single()
    : await supabase.from("oral_sessions").insert(row).select("id").single();
  if (error) {
    console.error("saveOralSession", error.message);
    return { id: input.id };
  }
  return { id: data.id };
}

export async function saveVoicePreference(role: VoiceRole, voiceId: string): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const uid = data?.claims?.sub;
  if (!uid) return { ok: false };
  const { error } = await supabase
    .from("profiles")
    .update(role === "cfi" ? { voice_cfi: voiceId } : { voice_dpe: voiceId })
    .eq("id", uid);
  return { ok: !error };
}

/** Flashcard self-rating: "I knew it" / "I missed it". */
export async function recordFlashcard(questionId: string, correct: boolean): Promise<{ ok: boolean }> {
  const q = questionById(questionId);
  if (!q) return { ok: false };
  await recordAnswers([{ questionId, topic: q.topic, correct }]);
  return { ok: true };
}
