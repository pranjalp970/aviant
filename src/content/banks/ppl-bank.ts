// The full Private Pilot written-test bank: the practice bank plus the figure and calculation set.
// Relative imports (not "@/") so the plan engine can be scenario-tested with plain Node.
import type { McQuestion } from "../types";
import { PPL_FIGURE_BANK } from "./ppl-figure-bank";
import { PPL_BANK_TOPICS as PRACTICE_TOPICS, PPL_PRACTICE_BANK } from "./ppl-practice-bank";

export const PPL_BANK: McQuestion[] = [...PPL_PRACTICE_BANK, ...PPL_FIGURE_BANK];

/** Ids of the figure and calculation set, for the charts quiz. */
export const PPL_FIGURE_IDS = new Set(PPL_FIGURE_BANK.map((q) => q.id));

/** Study topics with their question counts across both banks. */
export const PPL_BANK_TOPICS = PRACTICE_TOPICS.map((t) => ({ ...t, count: PPL_BANK.filter((q) => q.topic === t.id).length }));
