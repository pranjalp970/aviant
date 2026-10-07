import type { McQuestion } from "@/content/types";

/** Fisher–Yates shuffle (returns a new array). */
export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Same question with its choices in a random order and answerIndex remapped. */
export function shuffleChoices(q: McQuestion): McQuestion {
  const order = shuffle(q.choices.map((_, i) => i));
  return { ...q, choices: order.map((i) => q.choices[i]), answerIndex: order.indexOf(q.answerIndex) };
}

/**
 * Draw a fresh attempt: `count` random questions from the pool, preferring
 * ones not seen in the previous attempt, each with shuffled choices.
 */
export function drawAttempt(pool: readonly McQuestion[], count: number, recentIds: readonly string[] = []): McQuestion[] {
  const recent = new Set(recentIds);
  const fresh = shuffle(pool.filter((q) => !recent.has(q.id)));
  const seen = shuffle(pool.filter((q) => recent.has(q.id)));
  return [...fresh, ...seen].slice(0, Math.min(count, pool.length)).map(shuffleChoices);
}

// Remember the last attempt per quiz so the next one leans toward new questions.
const key = (quizId: string) => `aviant:quiz-recent:${quizId}`;

export function readRecent(quizId: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(key(quizId)) ?? "[]");
  } catch {
    return [];
  }
}

export function writeRecent(quizId: string, ids: string[]) {
  try {
    localStorage.setItem(key(quizId), JSON.stringify(ids));
  } catch {
    /* storage unavailable — draws are still random */
  }
}

/**
 * A balanced sample: `perTopic` random questions from every topic (e.g. the
 * onboarding diagnostic), interleaved so topics don't come in blocks.
 */
export function drawStratified(pool: readonly McQuestion[], perTopic: number): McQuestion[] {
  const byTopic = new Map<string, McQuestion[]>();
  for (const q of pool) byTopic.set(q.topic ?? q.areaId, [...(byTopic.get(q.topic ?? q.areaId) ?? []), q]);
  const picks = [...byTopic.values()].map((qs) => shuffle(qs).slice(0, perTopic));
  const out: McQuestion[] = [];
  for (let round = 0; round < perTopic; round++) for (const p of shuffle(picks)) if (p[round]) out.push(p[round]);
  return out.map(shuffleChoices);
}
