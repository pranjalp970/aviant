import { QUESTIONS } from "@/content/questions";
import type { OralQuestion, Question } from "@/content/types";
import type { AssistantProvider, AssistantRequest, AssistantResponse, Grade } from "./types";

/**
 * Deterministic stand-in for a real LLM. It examines from the oral question
 * bank (keyword grading) and tutors by retrieving the closest bank entry.
 * Good enough to build and demo the UI end-to-end.
 */

const STOP = new Set("a an the is are was were what which how do does you your i me my of to in on for and or with at be it that this when why can".split(" "));

const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));

function gradeAnswer(q: OralQuestion, answer: string): Grade {
  const a = answer.toLowerCase();
  const hits: string[] = [];
  const misses: string[] = [];
  for (const kp of q.keyPoints) {
    (kp.keywords.some((k) => a.includes(k.toLowerCase())) ? hits : misses).push(kp.label);
  }
  return { questionId: q.id, prompt: q.prompt, hits, misses, score: hits.length / q.keyPoints.length };
}

function bestMatch(text: string, pool: Question[]): Question | null {
  const words = new Set(tokens(text));
  if (!words.size) return null;
  let best: Question | null = null;
  let bestScore = 0;
  for (const q of pool) {
    const hay = tokens(`${q.prompt} ${q.explanation}`);
    const score = hay.reduce((n, w) => n + (words.has(w) ? 1 : 0), 0) / Math.sqrt(hay.length);
    if (score > bestScore) {
      bestScore = score;
      best = q;
    }
  }
  return bestScore > 0.15 ? best : null;
}

const pick = <T,>(arr: T[], seed: number) => arr[seed % arr.length];

function examine(req: AssistantRequest): AssistantResponse {
  const oralPool = QUESTIONS.filter((q): q is OralQuestion => q.kind === "oral" && q.rating === req.rating);
  const last = req.messages.at(-1);
  const state = { ...req.state, askedIds: [...req.state.askedIds] };
  let grade: Grade | undefined;
  let feedback = "";

  const current = state.currentQuestionId ? oralPool.find((q) => q.id === state.currentQuestionId) : undefined;

  if (current && last?.role === "user") {
    grade = gradeAnswer(current, last.content);
    if (grade.score >= 0.75) {
      feedback = pick(["Good. That's what I'm looking for.", "Correct, and well organized.", "Satisfactory."], state.askedIds.length) + " ";
      if (grade.misses.length) feedback += `Just don't forget: ${grade.misses.join(", ").toLowerCase()}. `;
    } else if (grade.score > 0) {
      feedback = `Partially there. You covered ${grade.hits.join(", ").toLowerCase()}, but I also needed ${grade.misses.join(", ").toLowerCase()}. ${current.explanation} `;
    } else {
      feedback = `That's not quite it. ${current.explanation} Make a note to review ${current.reference}. `;
    }
  }

  // random order, so every mock oral runs differently
  const remaining = oralPool.filter((q) => !state.askedIds.includes(q.id));
  const next = remaining[Math.floor(Math.random() * remaining.length)];
  if (!next) {
    state.currentQuestionId = null;
    return {
      reply: `${feedback}That covers everything I had for this session. Open the debrief to see how each area went.`,
      state,
      grade,
      references: current ? [current.reference] : undefined,
    };
  }

  state.askedIds.push(next.id);
  state.currentQuestionId = next.id;
  const intro =
    state.askedIds.length === 1
      ? "Alright, let's begin the oral portion. Answer as you would on checkride day. "
      : pick(["Moving on. ", "Next question. ", "Let's shift gears. "], state.askedIds.length);

  return { reply: `${feedback}${intro}${next.prompt}`, state, grade, references: current ? [current.reference] : undefined };
}

function teach(req: AssistantRequest): AssistantResponse {
  const last = req.messages.at(-1);
  const pool = QUESTIONS.filter((q) => q.rating === req.rating);
  if (!last || last.role !== "user") {
    return {
      reply: "Hey, I'm your Aviant CFI. Ask me anything: airspace, weather, regs, systems, maneuvers. I'll explain it and point you to the source.",
      state: req.state,
    };
  }
  const match = bestMatch(last.content, pool);
  if (!match) {
    return {
      reply:
        "Good question. I don't have a solid answer for that in my sample material yet. Try rephrasing, or ask about airspace, weather minimums, required documents, stalls, currency, holding, or lost comms.",
      state: req.state,
    };
  }
  return {
    reply: `${match.explanation} Want me to quiz you on this next?`,
    state: req.state,
    references: [match.reference],
  };
}

export const mockProvider: AssistantProvider = {
  name: "mock",
  async respond(req) {
    return req.mode === "examine" ? examine(req) : teach(req);
  },
};
