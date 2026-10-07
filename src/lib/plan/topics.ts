// Relative imports (not "@/") so the plan engine can be scenario-tested with plain Node.
import { PPL_BANK_TOPICS, PPL_PRACTICE_BANK } from "../../content/banks/ppl-practice-bank";

/** Study topics for the Private Pilot plan, with how much the real test leans on them. */
export interface TopicMeta {
  id: string;
  title: string;
  count: number; // questions in the bank
  /** >1 = frequently missed or heavily tested on the FAA knowledge test, so it gets extra time. */
  emphasis: number;
  lessons: string[];
}

// FAA "frequently missed" reports single out emergency operations and navigation;
// weather and airspace carry many questions on the real test.
const EMPHASIS: Record<string, number> = {
  emergencies: 1.25,
  navigation: 1.2,
  "weather-services": 1.15,
  "weather-theory": 1.1,
  airspace: 1.1,
  regulations: 1.05,
};

const LESSONS_BY_TOPIC: Record<string, string[]> = {
  airspace: ["airspace-classes", "vfr-weather-minimums"],
  airworthiness: ["documents-and-inspections"],
  aerodynamics: ["stalls-and-load-factor"],
};

export const PLAN_TOPICS: TopicMeta[] = PPL_BANK_TOPICS.map((t) => ({
  id: t.id,
  title: t.title.charAt(0).toUpperCase() + t.title.slice(1),
  count: t.count,
  emphasis: EMPHASIS[t.id] ?? 1,
  lessons: LESSONS_BY_TOPIC[t.id] ?? [],
}));

export const topicById = (id: string) => PLAN_TOPICS.find((t) => t.id === id);

// ACS task → topic, learned from how the bank tags its questions (e.g. ppl-I-E → airspace) …
const TASK_TOPIC = new Map<string, string>();
for (const q of PPL_PRACTICE_BANK) if (q.taskId && q.topic && !TASK_TOPIC.has(q.taskId)) TASK_TOPIC.set(q.taskId, q.topic);
// … plus area-level fallbacks for codes the bank doesn't tag directly.
const AREA_TOPIC: Record<string, string> = {
  I: "regulations",
  II: "airworthiness",
  III: "airport-ops",
  IV: "performance",
  V: "aerodynamics",
  VI: "navigation",
  VII: "aerodynamics",
  VIII: "systems",
  IX: "emergencies",
  X: "emergencies",
  XI: "emergencies",
  XII: "airworthiness",
};
const TASK_FALLBACK: Record<string, string> = { "I.D": "navigation", "I.F": "performance" };

/**
 * Map a knowledge-test ACS code like "PA.I.E.K1" to a study topic.
 * Returns null for codes it can't read.
 */
export function topicForAcsCode(code: string): string | null {
  const m = /^PA\.([IVX]+)\.([A-Z])\./i.exec(code.trim());
  if (!m) return null;
  const [area, task] = [m[1].toUpperCase(), m[2].toUpperCase()];
  return TASK_TOPIC.get(`ppl-${area}-${task}`) ?? TASK_FALLBACK[`${area}.${task}`] ?? AREA_TOPIC[area] ?? null;
}

export const ACS_CODE_RE = /^PA\.[IVX]+\.[A-Z]\.[KRS]\d{1,2}[a-z]?$/i;
