import "server-only";
import { areasFor } from "@/content/acs";
import { PPL_BANK_TOPICS } from "@/content/banks/ppl-practice-bank";
import { QUESTIONS } from "@/content/questions";
import type { McQuestion, RatingId } from "@/content/types";
import type { OralSessionRow, QuizAttemptRow } from "@/lib/data/queries";
import { type ReviewRow, dueQuestions } from "@/lib/review";

/**
 * Checkride readiness and a daily study plan, derived from what the student
 * has actually done: spaced-repetition boxes (written knowledge) and recent
 * mock-oral scores. Nothing here is stored; it's recomputed on each visit.
 */

export interface GroupMastery {
  id: string;
  title: string;
  total: number;
  seen: number;
  mastery: number; // 0–1
}

export interface PlanItem {
  id: string;
  title: string;
  detail: string;
  href: string;
  done: boolean;
}

export interface Readiness {
  overall: number; // 0–1
  written: number;
  oral: number | null;
  label: string;
  groups: GroupMastery[];
  daysLeft: number | null;
  plan: PlanItem[];
}

const DAY = 86_400_000;
const isToday = (iso: string) => new Date(iso).toDateString() === new Date().toDateString();

function groupsFor(rating: RatingId): { id: string; title: string; questions: McQuestion[] }[] {
  const mc = QUESTIONS.filter((q): q is McQuestion => q.kind === "mc" && q.rating === rating);
  if (rating === "ppl") {
    return PPL_BANK_TOPICS.map((t) => ({ id: t.id, title: t.title, questions: mc.filter((q) => q.topic === t.id) }));
  }
  return areasFor(rating)
    .map((a) => ({ id: a.id, title: a.name, questions: mc.filter((q) => q.areaId === a.id) }))
    .filter((g) => g.questions.length);
}

function label(score: number) {
  if (score >= 0.85) return "Checkride ready";
  if (score >= 0.7) return "Almost ready";
  if (score >= 0.4) return "Building up";
  return "Getting started";
}

export function computeReadiness(input: {
  rating: RatingId;
  checkrideDate: string | null;
  reviews: ReviewRow[];
  orals: OralSessionRow[];
  attempts: QuizAttemptRow[];
}): Readiness {
  const { rating, checkrideDate, reviews, orals, attempts } = input;
  const byId = new Map(reviews.map((r) => [r.question_id, r]));

  // Written: each question contributes box/5 once seen, so mastery needs repeated correct recall.
  const groups: GroupMastery[] = groupsFor(rating).map((g) => {
    let sum = 0;
    let seen = 0;
    for (const q of g.questions) {
      const r = byId.get(q.id);
      if (r) {
        seen++;
        sum += r.box / 5;
      }
    }
    return { id: g.id, title: g.title, total: g.questions.length, seen, mastery: g.questions.length ? sum / g.questions.length : 0 };
  });
  const totalQ = groups.reduce((n, g) => n + g.total, 0);
  const written = totalQ ? groups.reduce((n, g) => n + g.mastery * g.total, 0) / totalQ : 0;

  // Oral: average of the last three graded mock orals.
  const graded = orals.filter((o) => o.mode === "examine" && o.avg_score != null).slice(0, 3);
  const oral = graded.length ? graded.reduce((n, o) => n + Number(o.avg_score), 0) / graded.length : null;
  const overall = oral == null ? written : 0.75 * written + 0.25 * oral;

  // Days to checkride (date-only, local).
  let daysLeft: number | null = null;
  if (checkrideDate) {
    const [y, m, d] = checkrideDate.split("-").map(Number);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    daysLeft = Math.round((new Date(y, m - 1, d).getTime() - today.getTime()) / DAY);
  }

  // ── Today's plan ──
  const plan: PlanItem[] = [];
  const due = dueQuestions(reviews, rating).length;
  const practicedToday = reviews.filter((r) => isToday(r.updated_at)).length;

  plan.push(
    due
      ? { id: "review", title: `Review ${due} due card${due === 1 ? "" : "s"}`, detail: "Missed and due questions, most-forgotten first", href: "/portal/review?mode=cards", done: false }
      : { id: "review", title: "Review deck", detail: "All caught up. Nothing due right now.", href: "/portal/review", done: true },
  );

  const unseen = totalQ - groups.reduce((n, g) => n + g.seen, 0);
  if (unseen > 0) {
    const daysForNew = daysLeft != null && daysLeft > 0 ? Math.max(1, daysLeft - 7) : 14; // leave the last week for review
    const target = Math.min(40, Math.max(5, Math.ceil(unseen / daysForNew)));
    const weakest = [...groups].filter((g) => g.seen < g.total).sort((a, b) => a.mastery - b.mastery)[0];
    plan.push({
      id: "new",
      title: `Learn ${target} new questions`,
      detail: weakest ? `Start with ${weakest.title.toLowerCase()} (${Math.round(weakest.mastery * 100)}% mastered)` : "From across the bank",
      href: `/portal/review?mode=new${weakest ? `&topic=${weakest.id}` : ""}`,
      done: practicedToday >= target + due,
    });
  }

  const lastOral = orals.find((o) => o.mode === "examine");
  const oralToday = !!lastOral && isToday(lastOral.updated_at);
  const oralDue = !lastOral || Date.now() - new Date(lastOral.updated_at).getTime() > 2 * DAY;
  if (oralDue || oralToday) {
    plan.push({
      id: "oral",
      title: "Mock oral with the examiner",
      detail: oralToday ? "Done today. Nice work." : "About 15 minutes, out loud. Every couple of days builds confidence.",
      href: "/portal/assistant?mode=examine",
      done: oralToday,
    });
  }

  if (daysLeft != null && daysLeft >= 0 && daysLeft <= 10) {
    const recentFull = attempts.find((a) => a.total >= 60 && Date.now() - new Date(a.created_at).getTime() < 3 * DAY);
    plan.push({
      id: "full",
      title: "Full-length mock knowledge test",
      detail: recentFull ? `Last one ${Math.round((recentFull.score / recentFull.total) * 100)}%. Next one in a couple of days.` : "60 questions, 120 minutes. Do one every few days this close to test day.",
      href: "/portal/quizzes/ppl-mock-knowledge",
      done: !!recentFull,
    });
  }

  return { overall, written, oral, label: label(overall), groups, daysLeft, plan };
}
