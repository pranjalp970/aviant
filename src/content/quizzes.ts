import { PPL_BANK_TOPICS, PPL_FIGURE_IDS } from "./banks/ppl-bank";
import { QUESTIONS } from "./questions";
import type { McQuestion, QuizPreset, RatingId } from "./types";

/** SAMPLE quiz presets. Each draws multiple-choice questions from the bank. */
export const QUIZZES: QuizPreset[] = [
  {
    id: "ppl-mock-knowledge",
    rating: "ppl",
    title: "Mock Knowledge Test",
    description: "Full-length practice exam: 60 questions in 120 minutes across every topic, figures included, like the real PAR test. 70% to pass.",
    areaIds: "all",
    count: 60,
    timeLimitMin: 120,
  },
  {
    id: "ppl-quick-20",
    rating: "ppl",
    title: "Quick 20",
    description: "Twenty random questions from the whole bank. A good daily warm-up.",
    areaIds: "all",
    count: 20,
    timeLimitMin: 40,
  },
  {
    id: "ppl-figures",
    rating: "ppl",
    title: "Charts and calculations",
    description: "Twenty questions on the FAA testing supplement: sectional charts, airport diagrams, weather reports, weight and balance, performance charts and flight-computer math.",
    areaIds: "all",
    figureSet: true,
    count: 20,
    timeLimitMin: 40,
  },
  // one focused quiz per practice-bank topic
  ...PPL_BANK_TOPICS.map(
    (t): QuizPreset => ({
      id: `ppl-topic-${t.id}`,
      rating: "ppl",
      title: t.title.charAt(0).toUpperCase() + t.title.slice(1),
      description: `${Math.min(10, t.count)} random questions on ${t.title.toLowerCase()}, from ${t.count} in the bank.`,
      areaIds: "all",
      topics: [t.id],
      count: 10,
    }),
  ),
  {
    id: "ir-procedures",
    rating: "ir",
    title: "IFR Procedures",
    description: "Alternates, fuel, holding speeds, and approach minimums.",
    areaIds: "all",
    count: 6,
    timeLimitMin: 10,
  },
];

export const quizById = (id: string) => QUIZZES.find((q) => q.id === id);
export const quizzesFor = (rating: RatingId) => QUIZZES.filter((q) => q.rating === rating);

/** Every multiple-choice question a quiz may draw from. Each attempt picks `count` at random (see lib/quiz/draw). */
export function quizPool(quiz: QuizPreset): McQuestion[] {
  return QUESTIONS.filter(
    (q): q is McQuestion =>
      q.kind === "mc" &&
      q.rating === quiz.rating &&
      (quiz.areaIds === "all" || quiz.areaIds.includes(q.areaId)) &&
      (!quiz.topics || (!!q.topic && quiz.topics.includes(q.topic))) &&
      (!quiz.figureSet || PPL_FIGURE_IDS.has(q.id)),
  );
}

/** Questions per attempt — capped by how many are in the pool. */
export const attemptSize = (quiz: QuizPreset) => Math.min(quiz.count, quizPool(quiz).length);
