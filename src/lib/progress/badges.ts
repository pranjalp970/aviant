/** Pilot-style milestone badges, evaluated from what the student has done. Pure. */

export interface BadgeContext {
  totalQuestions: number;
  totalMinutes: number;
  studyDays: number;
  bestStreak: number;
  bankSize: number;
  seenQuestions: number;
  topicMastery: Record<string, number>; // topic id → 0..1
  fullMocks: { score: number; total: number }[];
  gradedOrals: number[]; // avg scores 0..1, newest first
  aviantReady: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  progress: number; // 0..1 toward earning it
}

const p = (have: number, need: number) => Math.min(1, need ? have / need : 0);
const mastery = (c: BadgeContext, ...ids: string[]) => Math.min(...ids.map((id) => c.topicMastery[id] ?? 0));

export function evaluateBadges(c: BadgeContext): Badge[] {
  const bestMock = Math.max(0, ...c.fullMocks.map((m) => m.score / m.total));
  const last3 = c.gradedOrals.slice(0, 3);
  const oralAvg = last3.length ? last3.reduce((a, b) => a + b, 0) / last3.length : 0;
  const defs: Omit<Badge, "earned">[] = [];
  const add = (id: string, title: string, description: string, progress: number) => defs.push({ id, title, description, progress });

  add("first-flight", "First Flight", "Finish your first study session", p(c.totalQuestions > 0 || c.totalMinutes > 0 ? 1 : 0, 1));
  add("first-solo", "First Solo", "Study on 5 different days", p(c.studyDays, 5));
  add("cross-country", "Cross-Country", "Keep a 7-day study streak", p(c.bestStreak, 7));
  add("long-haul", "Long Haul", "Keep a 30-day study streak", p(c.bestStreak, 30));
  add("pattern-work", "Pattern Work", "Answer 100 questions", p(c.totalQuestions, 100));
  add("logbook-builder", "Logbook Builder", "Log 10 hours of study", p(c.totalMinutes, 600));
  add("ground-school", "Ground School Grad", "See every question in the bank at least once", p(c.seenQuestions, c.bankSize));
  add("weather-wise", "Weather Wise", "Master both weather topics (80%+)", p(mastery(c, "weather-theory", "weather-services"), 0.8));
  add("airspace-ace", "Airspace Ace", "Master airspace (80%+)", p(mastery(c, "airspace"), 0.8));
  add("rules-of-the-air", "Rules of the Air", "Master regulations (80%+)", p(mastery(c, "regulations"), 0.8));
  add("navigator", "Navigator", "Master navigation (80%+)", p(mastery(c, "navigation"), 0.8));
  add("cool-head", "Cool Head", "Master emergencies (80%+)", p(mastery(c, "emergencies"), 0.8));
  add("mock-ace", "Mock Ace", "Score 90%+ on a full mock knowledge test", p(bestMock, 0.9));
  add("oral-ready", "Oral Ready", "Average 80%+ on three mock orals", last3.length < 3 ? p(last3.length, 3) * 0.5 : p(oralAvg, 0.8));
  add("written-ready", "Written Ready", "Earn your Aviant Ready certificate", c.aviantReady ? 1 : 0);

  return defs.map((d) => ({ ...d, earned: d.progress >= 1 }));
}
