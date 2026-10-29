import "server-only";
import { PPL_BANK } from "@/content/banks/ppl-bank";
import type { Session } from "@/lib/auth/session";
import type { PlanContext } from "@/lib/plan/load";
import type { Readiness } from "@/lib/readiness";
import { createClient } from "@/lib/supabase/server";
import { evaluateBadges, type Badge } from "./badges";
import { weeklyChallenges, type Challenge } from "./challenges";
import { computeStreak, qualifies, type Streak } from "./streak";
import { rankFor, XP } from "./xp";

export interface Progress {
  xp: number;
  rank: ReturnType<typeof rankFor>;
  streak: Streak;
  goal: { minutes: number; target: number; met: boolean };
  totals: { minutes: number; questions: number; studyDays: number };
  badges: (Badge & { earnedAt: string | null })[];
  newBadges: Badge[];
  challenges: Challenge[];
  newChallenges: Challenge[];
  aviantReady: boolean;
  achievements: { id: string; xp: number; earned_at: string }[];
}

/** Aviant Ready: strong overall readiness and two recent full mock tests at 85%+. */
export function isAviantReady(readiness: Readiness, attempts: PlanContext["attempts"]) {
  const fulls = attempts.filter((a) => a.total >= 60).slice(0, 2);
  return readiness.overall >= 0.85 && fulls.length === 2 && fulls.every((a) => a.score / a.total >= 0.85);
}

export async function loadProgress(session: Session, ctx: PlanContext, readiness: Readiness): Promise<Progress> {
  const supabase = await createClient();
  const { data: ach } = await supabase.from("achievements").select("id, xp, earned_at");
  const achievements = (ach ?? []) as Progress["achievements"];
  const earnedAt = new Map(achievements.map((a) => [a.id, a.earned_at]));

  const log = ctx.log;
  const totals = {
    minutes: log.reduce((n, r) => n + r.minutes, 0),
    questions: log.reduce((n, r) => n + r.questions, 0),
    studyDays: log.filter(qualifies).length,
  };
  const streak = computeStreak(log, ctx.today);
  const todayRow = log.find((r) => r.day === ctx.today);
  const goal = { minutes: Math.round(todayRow?.minutes ?? 0), target: session.studyMinutesPerDay, met: (todayRow?.minutes ?? 0) >= session.studyMinutesPerDay };
  const aviantReady = isAviantReady(readiness, ctx.attempts);

  const badges = evaluateBadges({
    totalQuestions: totals.questions,
    totalMinutes: totals.minutes,
    studyDays: totals.studyDays,
    bestStreak: streak.best,
    bankSize: PPL_BANK.length,
    seenQuestions: ctx.reviews.length,
    topicMastery: Object.fromEntries(readiness.groups.map((g) => [g.id, g.mastery])),
    fullMocks: ctx.attempts.filter((a) => a.total >= 60).map((a) => ({ score: a.score, total: a.total })),
    gradedOrals: ctx.orals.filter((o) => o.mode === "examine" && o.avg_score != null).map((o) => Number(o.avg_score)),
    aviantReady,
  });

  // Record newly earned badges once (with their XP) so the celebration shows a single time.
  const newBadges = badges.filter((b) => b.earned && !earnedAt.has(`badge-${b.id}`));
  if (newBadges.length) {
    const { error } = await supabase
      .from("achievements")
      .upsert(newBadges.map((b) => ({ id: `badge-${b.id}`, xp: XP.badge })), { onConflict: "user_id,id", ignoreDuplicates: true });
    if (!error) {
      const now = new Date().toISOString();
      for (const b of newBadges) {
        earnedAt.set(`badge-${b.id}`, now);
        achievements.push({ id: `badge-${b.id}`, xp: XP.badge, earned_at: now });
      }
    }
  }

  // Weekly challenges, personalized to the weakest topic in the plan.
  const weakest = [...ctx.plan.topics].filter((t) => t.seen < t.count || t.mastery < 0.8).sort((a, b) => a.knowledge - b.knowledge || a.mastery - b.mastery)[0];
  const challenges = weeklyChallenges({
    today: ctx.today,
    phase: ctx.plan.phase,
    studyDaysPerWeek: session.studyDaysPerWeek,
    weakest: weakest ? { id: weakest.id, title: weakest.title } : null,
    log,
    reviews: ctx.reviews,
    orals: ctx.orals,
    attempts: ctx.attempts,
  });
  const newChallenges = challenges.filter((c) => c.done && !earnedAt.has(c.id));
  if (newChallenges.length) {
    const { error } = await supabase
      .from("achievements")
      .upsert(newChallenges.map((c) => ({ id: c.id, xp: XP.challenge })), { onConflict: "user_id,id", ignoreDuplicates: true });
    if (!error) for (const c of newChallenges) achievements.push({ id: c.id, xp: XP.challenge, earned_at: new Date().toISOString() });
  }

  const xp = log.reduce((n, r) => n + r.xp, 0) + achievements.reduce((n, a) => n + a.xp, 0);
  return {
    xp,
    rank: rankFor(xp),
    streak,
    goal,
    totals,
    badges: badges.map((b) => ({ ...b, earnedAt: earnedAt.get(`badge-${b.id}`) ?? null })),
    newBadges,
    challenges,
    newChallenges,
    aviantReady,
    achievements,
  };
}
