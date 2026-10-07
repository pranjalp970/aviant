"use server";

import { revalidatePath } from "next/cache";
import type { RatingId } from "@/content/types";
import type { AssistantMode, ChatMessage, Grade } from "@/lib/ai/types";
import { createClient } from "@/lib/supabase/server";
import { questionById } from "@/content/questions";
import { logStudy } from "@/lib/progress/log";
import { quizXp, XP } from "@/lib/progress/xp";
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
  const answered = input.answers.filter((a) => a.chosen !== null);
  await recordAnswers(answered.map(({ questionId, topic, correct }) => ({ questionId, topic, correct })));
  const correct = answered.filter((a) => a.correct).length;
  await logStudy({
    minutes: Math.min(input.durationSec / 60, answered.length * 1.5 + 3), // ignore time left idle on the page
    questions: answered.length,
    correct,
    sessions: 1,
    xp: quizXp(answered.length, correct, input.total),
  });
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
  /** This save added a new examiner grade (bonus XP). */
  newGrade?: boolean;
}): Promise<{ id: string | null }> {
  const supabase = await createClient();
  // Study time: minutes since this session was last saved, capped so an idle tab doesn't count.
  let minutes = 1;
  if (input.id) {
    const { data: prev } = await supabase.from("oral_sessions").select("updated_at").eq("id", input.id).maybeSingle();
    if (prev) minutes = Math.min(5, Math.max(0, (Date.now() - Date.parse(prev.updated_at)) / 60_000));
  }
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
  await logStudy({ minutes, sessions: input.id ? 0 : 1, xp: input.newGrade ? XP.gradedOral : 2 });
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
  await logStudy({ minutes: 1 / 3, questions: 1, correct: correct ? 1 : 0, xp: XP.flashcard });
  return { ok: true };
}
