import "server-only";
import { areasFor } from "@/content/acs";
import { PPL_BANK_TOPICS } from "@/content/banks/ppl-practice-bank";
import { QUESTIONS } from "@/content/questions";
import type { McQuestion, RatingId } from "@/content/types";
import type { OralSessionRow } from "@/lib/data/queries";
import type { ReviewRow } from "@/lib/review";

/**
 * Checkride readiness, derived from what the student has actually done:
 * spaced-repetition boxes (written knowledge) and recent mock-oral scores.
 * The daily plan itself lives in lib/plan.
 */

export interface GroupMastery {
  id: string;
  title: string;
  total: number;
  seen: number;
  mastery: number; // 0–1
}

export interface Readiness {
  overall: number; // 0–1
  written: number;
  oral: number | null;
  label: string;
  groups: GroupMastery[];
}

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

export function computeReadiness(input: { rating: RatingId; reviews: ReviewRow[]; orals: OralSessionRow[] }): Readiness {
  const byId = new Map(input.reviews.map((r) => [r.question_id, r]));

  // Written: each question contributes box/5 once seen, so mastery needs repeated correct recall.
  const groups: GroupMastery[] = groupsFor(input.rating).map((g) => {
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
  const graded = input.orals.filter((o) => o.mode === "examine" && o.avg_score != null).slice(0, 3);
  const oral = graded.length ? graded.reduce((n, o) => n + Number(o.avg_score), 0) / graded.length : null;
  const overall = oral == null ? written : 0.75 * written + 0.25 * oral;

  return { overall, written, oral, label: label(overall), groups };
}
