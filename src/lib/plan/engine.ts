// Pure plan engine: no I/O, recomputed on every visit, so the plan adapts to what
// the student actually did. Relative imports keep it testable with plain Node.
import { PLAN_TOPICS, topicForAcsCode, type TopicMeta } from "./topics";

// ── Inputs ─────────────────────────────────────────────────────────────────
export interface PlanInput {
  today: string; // YYYY-MM-DD in the student's timezone
  writtenStatus: "not_taken" | "passed";
  writtenDate: string | null;
  checkrideDate: string | null;
  missedAcsCodes: string[];
  studyDaysPerWeek: number;
  studyMinutesPerDay: number;
  topicConfidence: Record<string, 1 | 2 | 3>;
  /** One row per question the student has answered (spaced-repetition state). */
  reviews: { question_id: string; topic: string | null; box: number; last_correct: boolean }[];
  /** Questions currently due for review. */
  dueCount: number;
  attempts: { quiz_id: string; score: number; total: number; created_at: string }[];
  orals: { mode: string; avg_score: number | null; updated_at: string }[];
  /** What's been logged today (minutes, questions answered). */
  todayLog: { minutes: number; questions: number } | null;
}

// ── Outputs ────────────────────────────────────────────────────────────────
export interface PlanTopic {
  id: string;
  title: string;
  count: number;
  seen: number;
  knowledge: number; // 0–1 estimate of how well they know it
  mastery: number; // 0–1, from spaced-repetition boxes
  minutes: number; // estimated study time still needed
  share: number; // share of the remaining plan
  reason: string;
  missedOnTest: boolean;
}

export interface PlanWeek {
  index: number;
  start: string;
  end: string;
  kind: "learn" | "review" | "checkride";
  topics: { id: string; title: string; minutes: number; newQuestions: number }[];
  milestone: string | null;
  minutes: number;
}

export interface SessionItem {
  id: string;
  kind: "review" | "new" | "teach" | "lesson" | "quiz" | "oral" | "checkride";
  title: string;
  detail: string;
  minutes: number;
  href: string;
  done: boolean;
}

export type PlanStatus = "ahead" | "on_track" | "behind" | "overdue";

export interface Plan {
  phase: "written" | "checkride";
  targetDate: string; // written date (written phase) or checkride date (checkride phase)
  dateSuggested: boolean; // true when the student hasn't set a date and we proposed one
  daysLeft: number;
  status: PlanStatus;
  statusDetail: string;
  fix: string | null;
  requiredMinutes: number;
  capacityMinutes: number;
  weeks: PlanWeek[];
  today: { items: SessionItem[]; minutes: number; goalMinutes: number; focusTopic: string | null };
  topics: PlanTopic[];
  predicted: { score: number; basis: string } | null;
  overallKnowledge: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────
const DAY = 86_400_000;
const parse = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return Date.UTC(y, m - 1, day);
};
const fmt = (t: number) => new Date(t).toISOString().slice(0, 10);
const addDays = (d: string, n: number) => fmt(parse(d) + n * DAY);
const daysBetween = (a: string, b: string) => Math.round((parse(b) - parse(a)) / DAY);
const pretty = (d: string) => new Date(parse(d)).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const round5 = (n: number) => Math.max(5, Math.ceil(n / 5) * 5);
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

const PRIOR: Record<1 | 2 | 3, number> = { 1: 0.25, 2: 0.5, 3: 0.75 };
const PRIOR_WEIGHT = 4; // the confidence rating counts like ~4 answered questions
const REVIEW_MINUTES = 0.5; // per flashcard/review
const FULL_MOCK_MINUTES = 120;
const QUICK_MINUTES = 30;
const TEACH_MINUTES = 12;
const FINAL_REVIEW_DAYS = 7;

/** Minutes to learn one new question: weak topics take longer per question. */
const minutesPerNewQuestion = (k: number) => 0.6 + 1.6 * (1 - k);

// ── Topic estimates ────────────────────────────────────────────────────────
function estimateTopics(input: PlanInput): PlanTopic[] {
  const byTopic = new Map<string, PlanInput["reviews"]>();
  for (const r of input.reviews) if (r.topic) byTopic.set(r.topic, [...(byTopic.get(r.topic) ?? []), r]);
  const missedTopics = new Set(input.missedAcsCodes.map(topicForAcsCode).filter((t): t is string => !!t));

  const raw = PLAN_TOPICS.map((t: TopicMeta) => {
    const rows = byTopic.get(t.id) ?? [];
    const seen = rows.length;
    const correct = rows.filter((r) => r.last_correct).length;
    const prior = PRIOR[input.topicConfidence[t.id] ?? 2] ?? 0.4;
    const knowledge = (prior * PRIOR_WEIGHT + correct) / (PRIOR_WEIGHT + seen);
    const mastery = rows.reduce((n, r) => n + r.box / 5, 0) / t.count;
    const weakSeen = rows.filter((r) => r.box <= 2).length;
    const unseen = Math.max(0, t.count - seen);

    // Remaining work: learn unseen questions, re-drill weak ones, plus a CFI session / lessons when shaky.
    let minutes =
      unseen * minutesPerNewQuestion(knowledge) + // first pass
      (unseen * (1 - knowledge) + weakSeen) * REVIEW_MINUTES * 2 + // expected re-reviews
      (knowledge < 0.55 && mastery < 0.6 ? TEACH_MINUTES : 0) +
      (knowledge < 0.7 && mastery < 0.6 ? t.lessons.length * 8 : 0);
    minutes *= t.emphasis;
    if (missedTopics.has(t.id)) minutes *= 1.2;
    // Already mastered topics still get a light touch until the test.
    if (mastery >= 0.8) minutes = Math.min(minutes, t.count * 0.15);

    const reason = missedTopics.has(t.id)
      ? "You missed this on your knowledge test"
      : mastery >= 0.8
        ? "Mastered: light review only"
        : knowledge < 0.4
          ? seen
            ? "Your weakest area so far"
            : "New to you"
          : knowledge > 0.7
            ? "You know this well: quicker pass"
            : t.emphasis > 1.05
              ? "Heavily tested on the real exam"
              : "Steady practice";
    return { id: t.id, title: t.title, count: t.count, seen, knowledge, mastery, minutes, share: 0, reason, missedOnTest: missedTopics.has(t.id) };
  });
  const total = raw.reduce((n, t) => n + t.minutes, 0) || 1;
  return raw.map((t) => ({ ...t, share: t.minutes / total }));
}

/** Highest priority first: weak, heavily tested, missed on the test, not yet covered. */
function priority(t: PlanTopic) {
  const meta = PLAN_TOPICS.find((m) => m.id === t.id)!;
  return (1 - t.knowledge) * meta.emphasis * (t.missedOnTest ? 1.3 : 1) + 0.3 * (1 - t.seen / t.count) - (t.mastery >= 0.8 ? 1 : 0);
}

// ── Predicted written score ────────────────────────────────────────────────
function predict(input: PlanInput, overallK: number): Plan["predicted"] {
  const tests = input.attempts.filter((a) => a.quiz_id !== "diagnostic" && a.total >= 10).slice(0, 3);
  const answered = tests.reduce((n, a) => n + a.total, 0);
  if (answered < 20) return null;
  const acc = tests.reduce((n, a) => n + a.score, 0) / answered;
  const score = Math.round(100 * (0.6 * acc + 0.4 * overallK));
  return { score: clamp(score, 0, 100), basis: `Based on your last ${tests.length} test${tests.length === 1 ? "" : "s"} (${answered} questions) and topic mastery` };
}

// ── The plan ───────────────────────────────────────────────────────────────
export function buildPlan(input: PlanInput): Plan {
  const topics = estimateTopics(input);
  const totalQ = topics.reduce((n, t) => n + t.count, 0);
  const overallK = topics.reduce((n, t) => n + t.knowledge * t.count, 0) / totalQ;
  const mpd = clamp(input.studyMinutesPerDay, 5, 240);
  const dpw = clamp(input.studyDaysPerWeek, 1, 7);
  const studyDaysIn = (days: number) => Math.max(0, Math.floor((days * dpw) / 7));
  const weekMinutes = mpd * dpw;
  const predicted = predict(input, overallK);

  const writtenDone = input.writtenStatus === "passed";
  const writtenOverdue = !writtenDone && !!input.writtenDate && daysBetween(input.today, input.writtenDate) < 0;

  // ── Checkride phase ──
  if (writtenDone || (writtenOverdue && input.checkrideDate)) {
    return checkridePlan(input, topics, { mpd, dpw, weekMinutes, overallK, predicted });
  }

  // ── Written phase ──
  const learnMinutes = topics.reduce((n, t) => n + t.minutes, 0);
  const checkpoints = Math.max(1, Math.round(learnMinutes / weekMinutes / 2)) * QUICK_MINUTES; // a Quick 20 every ~2 weeks
  const finalWeekMinutes = 2 * FULL_MOCK_MINUTES + 60; // two full mocks + review
  const required = Math.round(learnMinutes + checkpoints + finalWeekMinutes);

  let targetDate = input.writtenDate && !writtenOverdue ? input.writtenDate : null;
  const dateSuggested = !targetDate;
  if (!targetDate) {
    const weeksNeeded = Math.ceil((learnMinutes + checkpoints) / weekMinutes) + 1; // + final review week
    targetDate = addDays(input.today, Math.max(14, weeksNeeded * 7));
  }
  const daysLeft = daysBetween(input.today, targetDate);
  const capacity = studyDaysIn(daysLeft) * mpd;
  const learnDays = Math.max(1, daysLeft - FINAL_REVIEW_DAYS);
  const learnCapacity = studyDaysIn(learnDays) * mpd;
  const learnNeed = learnMinutes + checkpoints;
  const ratio = learnNeed / Math.max(1, learnCapacity);

  const inFinalWeek = daysLeft <= FINAL_REVIEW_DAYS;
  let status: PlanStatus = ratio <= 0.85 ? "ahead" : ratio <= 1.05 ? "on_track" : "behind";
  if (inFinalWeek) status = predicted ? (predicted.score >= 85 ? "ahead" : predicted.score >= 75 ? "on_track" : "behind") : "on_track";
  let fix: string | null = null;
  let statusDetail =
    status === "ahead"
      ? "You have more time than you need. Stay consistent and you'll finish early."
      : status === "on_track"
        ? "Your study time matches what you need. Keep the streak going."
        : "You need more study time than you have scheduled before your test.";
  if (inFinalWeek && !writtenOverdue) {
    statusDetail =
      daysLeft === 0
        ? "Test day! Skip new material: a light review, then go get it."
        : predicted
          ? predicted.score >= 75
            ? `Final week. Your predicted score is ${predicted.score}%. Keep taking full mock tests and reviewing weak spots.`
            : `Final week, and your predicted score is ${predicted.score}%. Focus on your weakest topics; if mocks stay under 70%, consider rescheduling.`
          : "Final week: take a full mock test to see where you stand.";
  }
  if (writtenOverdue) {
    status = "overdue";
    statusDetail = "Your written test date has passed. Did you take it? Update your plan in Settings.";
  } else if (status === "behind") {
    const extra = round5((learnNeed - learnCapacity) / Math.max(1, studyDaysIn(learnDays)));
    const newDate = pretty(addDays(input.today, Math.ceil((learnNeed / weekMinutes) * 7) + FINAL_REVIEW_DAYS));
    fix =
      extra <= 45
        ? `Add about ${extra} min/day, or move your written to around ${newDate}.`
        : `That's a lot to cover in the time left. Consider moving your written to around ${newDate}. Until then, the plan focuses on your weakest, most-tested topics first.`;
  }

  // ── Week roadmap: highest priority first, alternating with lighter topics ──
  const ordered = [...topics].filter((t) => t.minutes > 1).sort((a, b) => priority(b) - priority(a));
  const behind = status === "behind";
  // On track: alternate heavy and light topics so weeks stay varied.
  // Behind: strictly highest priority first, so the most important material is covered.
  const queue: PlanTopic[] = behind ? ordered : [];
  while (!behind && ordered.length) {
    queue.push(ordered.shift()!);
    if (ordered.length) queue.push(ordered.pop()!);
  }
  const learnWeeks = inFinalWeek ? 0 : Math.max(1, Math.ceil(learnDays / 7));
  const remaining = new Map(queue.map((t) => [t.id, t.minutes]));
  const weeks: PlanWeek[] = [];
  for (let w = 0; w < learnWeeks; w++) {
    const start = addDays(input.today, w * 7);
    const end = addDays(input.today, Math.min(w * 7 + 6, learnDays - 1));
    const daysThisWeek = daysBetween(start, end) + 1;
    let cap = studyDaysIn(daysThisWeek) * mpd || mpd;
    const milestone = w % 2 === 1 ? "Quick 20 checkpoint: aim for 75%+" : null;
    if (milestone) cap -= QUICK_MINUTES;
    const entry: PlanWeek = { index: w, start, end, kind: "learn", topics: [], milestone, minutes: 0 };
    const isLast = w === learnWeeks - 1;
    for (const t of queue) {
      let left = remaining.get(t.id) ?? 0;
      if (left < 1 || cap < 1) continue;
      const take = isLast && !behind ? left : Math.min(left, cap); // on track: last week absorbs rounding
      left -= take;
      cap -= take;
      remaining.set(t.id, left);
      const perQ = minutesPerNewQuestion(t.knowledge) + REVIEW_MINUTES;
      entry.topics.push({ id: t.id, title: t.title, minutes: Math.round(take), newQuestions: Math.min(t.count - t.seen, Math.round(take / perQ)) });
    }
    entry.minutes = Math.round(entry.topics.reduce((n, x) => n + x.minutes, 0) + (milestone ? QUICK_MINUTES : 0));
    weeks.push(entry);
  }
  if (daysLeft > FINAL_REVIEW_DAYS || weeks.length === 0) {
    weeks.push({
      index: weeks.length,
      start: addDays(targetDate, -Math.min(FINAL_REVIEW_DAYS, daysLeft)),
      end: addDays(targetDate, -1),
      kind: "review",
      topics: [...topics].sort((a, b) => a.mastery - b.mastery).slice(0, 3).map((t) => ({ id: t.id, title: t.title, minutes: 20, newQuestions: 0 })),
      milestone: "Two full mock tests: aim for 80%+ before test day",
      minutes: finalWeekMinutes,
    });
  }

  const thisWeek = weeks[0];
  const focus = topics.find((t) => t.id === thisWeek?.topics.find((x) => x.newQuestions > 0)?.id) ?? [...topics].sort((a, b) => priority(b) - priority(a))[0];
  const weakest = [...topics].sort((a, b) => a.mastery - b.mastery)[0];
  const today = writtenSession(input, inFinalWeek ? weakest : focus, { mpd, inFinalWeek, milestoneThisWeek: thisWeek?.kind === "learn" && !!thisWeek.milestone });

  return {
    phase: "written",
    targetDate,
    dateSuggested,
    daysLeft,
    status,
    statusDetail,
    fix,
    requiredMinutes: required,
    capacityMinutes: capacity,
    weeks,
    today,
    topics,
    predicted,
    overallKnowledge: overallK,
  };
}

// ── Today's session (written phase) ────────────────────────────────────────
function writtenSession(
  input: PlanInput,
  focus: PlanTopic | undefined,
  o: { mpd: number; inFinalWeek: boolean; milestoneThisWeek: boolean },
): Plan["today"] {
  const items: SessionItem[] = [];
  const log = input.todayLog ?? { minutes: 0, questions: 0 };
  const isToday = (iso: string) => iso.slice(0, 10) === input.today;
  let budget = o.mpd;

  // 1. Reviews first (up to ~40% of the session)
  if (input.dueCount > 0) {
    const n = Math.min(input.dueCount, Math.max(5, Math.floor((budget * 0.4) / REVIEW_MINUTES)));
    const m = Math.max(3, Math.round(n * REVIEW_MINUTES));
    items.push({ id: "review", kind: "review", title: `Review ${n} due card${n === 1 ? "" : "s"}`, detail: "Questions you missed or are due to see again", minutes: m, href: "/portal/review?mode=cards", done: false });
    budget -= m;
  } else {
    items.push({ id: "review", kind: "review", title: "Review deck", detail: "All caught up, nothing due", minutes: 0, href: "/portal/review", done: true });
  }

  // 2. Final week: full mock tests take priority
  if (o.inFinalWeek) {
    const recentFull = input.attempts.find((a) => a.total >= 60 && daysBetween(a.created_at.slice(0, 10), input.today) <= 2);
    items.push({
      id: "full",
      kind: "quiz",
      title: "Full mock knowledge test",
      detail: recentFull ? `Done recently (${Math.round((recentFull.score / recentFull.total) * 100)}%). Rest, then another in a couple of days.` : "60 questions in 120 minutes. Set aside the time; it's your best rehearsal.",
      minutes: FULL_MOCK_MINUTES,
      href: "/portal/quizzes/ppl-mock-knowledge",
      done: !!recentFull,
    });
    if (focus) {
      items.push({ id: "drill", kind: "quiz", title: `Drill your weakest topic: ${focus.title}`, detail: `${Math.round(focus.mastery * 100)}% mastered. Ten questions to firm it up.`, minutes: 15, href: `/portal/quizzes/ppl-topic-${focus.id}`, done: false });
    }
  } else if (o.milestoneThisWeek && !input.attempts.some((a) => a.total >= 20 && daysBetween(a.created_at.slice(0, 10), input.today) <= 6)) {
    // 3. Checkpoint week: a Quick 20
    items.push({ id: "quick", kind: "quiz", title: "Quick 20 checkpoint", detail: "Twenty mixed questions to measure progress. Aim for 75%+.", minutes: QUICK_MINUTES, href: "/portal/quizzes/ppl-quick-20", done: false });
    budget -= QUICK_MINUTES;
  }

  if (focus && !o.inFinalWeek) {
    // 4. A teach session or lesson when the focus topic is shaky
    const meta = PLAN_TOPICS.find((t) => t.id === focus.id);
    const teachToday = input.orals.some((s) => s.mode === "teach" && isToday(s.updated_at));
    let extra: SessionItem | null = null;
    if (focus.knowledge < 0.55 && focus.mastery < 0.5) {
      extra = meta?.lessons.length
        ? { id: "lesson", kind: "lesson", title: `Read: ${focus.title} study guide`, detail: "A short lesson before you practice", minutes: 8, href: `/portal/study/${meta.lessons[0]}`, done: false }
        : { id: "teach", kind: "teach", title: `Learn with your CFI: ${focus.title}`, detail: "Ten minutes out loud: the essentials, then a quick quiz", minutes: 10, href: `/portal/assistant?mode=teach&topic=${focus.id}`, done: teachToday };
    }
    // 5. New questions in the focus topic fill the rest of the session
    const perQ = minutesPerNewQuestion(focus.knowledge);
    const n = clamp(Math.round(Math.max(0, budget - (extra?.minutes ?? 0)) / perQ), 5, 30);
    const unseen = focus.count - focus.seen;
    if (extra) items.push(extra);
    if (unseen > 0) {
      items.push({
        id: "new",
        kind: "new",
        title: `Learn ${Math.min(n, unseen)} new questions: ${focus.title}`,
        detail: `${Math.round(focus.mastery * 100)}% mastered · ${unseen} still new`,
        minutes: Math.round(Math.min(n, unseen) * perQ),
        href: `/portal/review?mode=new&topic=${focus.id}`,
        done: log.questions >= Math.min(n, unseen) + Math.min(input.dueCount, 10),
      });
    } else {
      items.push({ id: "drill", kind: "quiz", title: `${focus.title} quiz`, detail: "You've seen every question; drill it to mastery", minutes: 15, href: `/portal/quizzes/ppl-topic-${focus.id}`, done: false });
    }
  }

  const minutes = items.reduce((n, i) => n + (i.done ? 0 : i.minutes), 0);
  return { items, minutes, goalMinutes: o.mpd, focusTopic: focus?.id ?? null };
}

// ── Checkride phase ────────────────────────────────────────────────────────
function checkridePlan(
  input: PlanInput,
  topics: PlanTopic[],
  o: { mpd: number; dpw: number; weekMinutes: number; overallK: number; predicted: Plan["predicted"] },
): Plan {
  const dateSuggested = !input.checkrideDate || daysBetween(input.today, input.checkrideDate) < 0;
  const targetDate = dateSuggested ? addDays(input.today, 42) : input.checkrideDate!;
  const daysLeft = daysBetween(input.today, targetDate);
  const weeksLeft = Math.max(1, Math.ceil(daysLeft / 7));
  const missed = topics.filter((t) => t.missedOnTest);
  const weakest = [...topics].sort((a, b) => priority(b) - priority(a));
  const focusOrder = [...missed, ...weakest.filter((t) => !t.missedOnTest)];

  const graded = input.orals.filter((s) => s.mode === "examine" && s.avg_score != null).slice(0, 3);
  const oralAvg = graded.length ? graded.reduce((n, s) => n + Number(s.avg_score), 0) / graded.length : null;
  const required = weeksLeft * (3 * 15 + 2 * TEACH_MINUTES + 60);
  const capacity = Math.floor((daysLeft * o.dpw) / 7) * o.mpd;
  const status: PlanStatus = oralAvg != null && oralAvg >= 0.85 ? "ahead" : capacity >= required ? "on_track" : "behind";

  const weeks: PlanWeek[] = [];
  for (let w = 0; w < weeksLeft; w++) {
    const start = addDays(input.today, w * 7);
    const end = addDays(input.today, Math.min(w * 7 + 6, Math.max(0, daysLeft - 1)));
    const last = w >= weeksLeft - 2;
    const picks = focusOrder.slice((w * 2) % Math.max(1, focusOrder.length), ((w * 2) % Math.max(1, focusOrder.length)) + 2);
    weeks.push({
      index: w,
      start,
      end,
      kind: "checkride",
      topics: picks.map((t) => ({ id: t.id, title: t.title, minutes: TEACH_MINUTES + 10, newQuestions: 0 })),
      milestone: last ? "Full mock checkride with your own cross-country plan" : "Three mock orals with the examiner",
      minutes: Math.min(o.weekMinutes, 3 * 15 + picks.length * (TEACH_MINUTES + 10) + (last ? 30 : 0)),
    });
  }

  const isToday = (iso: string) => iso.slice(0, 10) === input.today;
  const items: SessionItem[] = [];
  if (input.dueCount > 0) {
    const n = Math.min(input.dueCount, 20);
    items.push({ id: "review", kind: "review", title: `Review ${n} due card${n === 1 ? "" : "s"}`, detail: "Keep your written knowledge fresh for the oral", minutes: Math.round(n * REVIEW_MINUTES), href: "/portal/review?mode=cards", done: false });
  }
  const oralToday = input.orals.some((s) => s.mode === "examine" && isToday(s.updated_at));
  items.push({
    id: "oral",
    kind: "oral",
    title: "Mock oral with the examiner",
    detail: oralAvg != null ? `Recent average ${Math.round(oralAvg * 100)}%` : "Fifteen minutes out loud, graded against the ACS",
    minutes: 15,
    href: "/portal/assistant?mode=examine",
    done: oralToday,
  });
  const focus = focusOrder[0];
  if (focus) {
    items.push({
      id: "teach",
      kind: "teach",
      title: `Brush up: ${focus.title}`,
      detail: focus.missedOnTest ? "You missed this on your knowledge test; examiners probe it" : "Your weakest area going into the oral",
      minutes: 10,
      href: `/portal/assistant?mode=teach&topic=${focus.id}`,
      done: input.orals.some((s) => s.mode === "teach" && isToday(s.updated_at)),
    });
  }
  if (daysLeft <= 14) {
    items.push({ id: "checkride", kind: "checkride", title: "Full mock checkride", detail: "Upload your cross-country plan and POH; the examiner quizzes you on it", minutes: 30, href: "/portal/checkride", done: false });
  }

  return {
    phase: "checkride",
    targetDate,
    dateSuggested,
    daysLeft,
    status,
    statusDetail:
      status === "ahead"
        ? "Your mock orals are strong. Keep them sharp with a few sessions a week."
        : status === "on_track"
          ? "Plenty of time for mock orals before your checkride."
          : "Tight on time: prioritize mock orals and your weakest areas.",
    fix: status === "behind" ? `Aim for at least ${round5(required / Math.max(1, Math.floor((daysLeft * o.dpw) / 7)))} min on study days.` : null,
    requiredMinutes: required,
    capacityMinutes: capacity,
    weeks,
    today: { items, minutes: items.reduce((n, i) => n + (i.done ? 0 : i.minutes), 0), goalMinutes: o.mpd, focusTopic: focus?.id ?? null },
    topics,
    predicted: o.predicted,
    overallKnowledge: o.overallK,
  };
}
