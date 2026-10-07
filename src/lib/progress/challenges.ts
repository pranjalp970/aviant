/** Weekly challenges: three per week, deterministic, personalized to the weakest topic. Pure. */
import { qualifies, type DayActivity } from "./streak";

export interface ChallengeInput {
  today: string; // YYYY-MM-DD local
  phase: "written" | "checkride";
  studyDaysPerWeek: number;
  weakest: { id: string; title: string } | null;
  log: (DayActivity & { questions: number })[];
  reviews: { topic: string | null; box: number; updated_at: string }[];
  orals: { mode: string; avg_score: number | null; updated_at: string }[];
  attempts: { score: number; total: number; created_at: string }[];
}

export interface Challenge {
  id: string; // unique per week, e.g. "challenge-2026-10-05-1"
  title: string;
  detail: string;
  have: number;
  need: number;
  done: boolean;
  href: string;
}

const toDate = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, day));
};
const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Monday–Sunday week containing `today`. */
export function weekOf(today: string) {
  const d = toDate(today);
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  return { start: iso(monday), end: iso(sunday), number: Math.floor(monday.getTime() / (7 * 86_400_000)) };
}

export function weeklyChallenges(input: ChallengeInput): Challenge[] {
  const w = weekOf(input.today);
  const inWeek = (dateOrIso: string) => {
    const d = dateOrIso.slice(0, 10);
    return d >= w.start && d <= w.end;
  };
  const make = (i: number, c: Omit<Challenge, "id" | "done">): Challenge => ({ ...c, id: `challenge-${w.start}-${i}`, done: c.have >= c.need });

  const days = input.log.filter((d) => inWeek(d.day) && qualifies(d)).length;
  const daysGoal = Math.min(5, Math.max(2, input.studyDaysPerWeek));
  const questions = input.log.filter((d) => inWeek(d.day)).reduce((n, d) => n + d.questions, 0);
  const oralsThisWeek = input.orals.filter((o) => o.mode === "examine" && inWeek(o.updated_at)).length;

  const out: Challenge[] = [
    make(1, { title: `Study ${daysGoal} days this week`, detail: "10+ minutes or 20+ questions counts as a day", have: days, need: daysGoal, href: "/portal" }),
  ];

  if (input.phase === "checkride") {
    out.push(make(2, { title: "Do 3 mock orals", detail: "Out loud with the examiner, graded against the ACS", have: oralsThisWeek, need: 3, href: "/portal/assistant?mode=examine" }));
  } else if (input.weakest) {
    const t = input.weakest;
    const mastered = input.reviews.filter((r) => r.topic === t.id && r.box >= 3 && inWeek(r.updated_at)).length;
    out.push(
      make(2, {
        title: `Lock in 15 questions: ${t.title}`,
        detail: "Get them right on review until they move up the deck",
        have: mastered,
        need: 15,
        href: `/portal/review?mode=new&topic=${t.id}`,
      }),
    );
  }

  // Third challenge rotates week to week.
  const variant = w.number % 3;
  if (variant === 0 || input.phase === "checkride") {
    out.push(make(3, { title: "Answer 150 questions", detail: "Quizzes, reviews and flashcards all count", have: questions, need: 150, href: "/portal/quizzes" }));
  } else if (variant === 1) {
    const best = Math.max(0, ...input.attempts.filter((a) => a.total >= 20 && inWeek(a.created_at)).map((a) => a.score / a.total));
    out.push(make(3, { title: "Score 80%+ on a Quick 20", detail: "Or any test of 20+ questions", have: Math.round(best * 100), need: 80, href: "/portal/quizzes/ppl-quick-20" }));
  } else {
    out.push(make(3, { title: "Do 2 mock orals", detail: "Practice saying it out loud, like checkride day", have: oralsThisWeek, need: 2, href: "/portal/assistant?mode=examine" }));
  }
  return out;
}
