/** XP rules and pilot-style ranks. Pure, so it can be shared by server and client code. */
export const XP = {
  correct: 10,
  attempted: 4, // effort counts, even when wrong
  flashcard: 3,
  lesson: 30,
  gradedOral: 15,
  fullMock: 100,
  dailyGoal: 50,
  badge: 100,
  challenge: 200,
} as const;

export const RANKS = [
  { min: 0, title: "Student Pilot" },
  { min: 500, title: "Pre-Solo" },
  { min: 1500, title: "Solo" },
  { min: 3500, title: "Cross-Country" },
  { min: 7000, title: "Checkride Ready" },
  { min: 12000, title: "Private Pilot" },
] as const;

export function rankFor(xp: number) {
  let i = 0;
  while (i + 1 < RANKS.length && xp >= RANKS[i + 1].min) i++;
  const rank = RANKS[i];
  const next = RANKS[i + 1] ?? null;
  return {
    title: rank.title,
    level: i + 1,
    next: next?.title ?? null,
    toNext: next ? next.min - xp : 0,
    progress: next ? (xp - rank.min) / (next.min - rank.min) : 1,
  };
}

/** XP for a finished quiz attempt. */
export const quizXp = (answered: number, correct: number, total: number) =>
  correct * XP.correct + Math.max(0, answered - correct) * XP.attempted + (total >= 60 ? XP.fullMock : 0);
