/**
 * Content model for Aviant practice material.
 *
 * Everything under src/content is SAMPLE content written to exercise the UI.
 * Replace it with verified FAA material later — keep these shapes and the
 * portal pages will pick the new data up unchanged. Eventually this moves to
 * Supabase tables with the same columns.
 */

export type RatingId = "ppl" | "ir";

export interface Rating {
  id: RatingId;
  name: string;
  short: string;
  acsCode: string; // e.g. FAA-S-ACS-6C
  /** false = "coming soon": not selectable, content hidden. */
  available: boolean;
}

export interface AcsTask {
  id: string; // e.g. "ppl-I-B"
  code: string; // e.g. "I.B"
  name: string;
}

export interface AcsArea {
  id: string; // e.g. "ppl-I"
  rating: RatingId;
  numeral: string; // "I", "II", …
  name: string;
  tasks: AcsTask[];
}

/** A testing-supplement figure a question refers to ("Refer to Figure 20"). */
export interface QuestionFigure {
  src: string; // e.g. "/figures/akts-8080-2h/figure-20.webp"
  label: string; // e.g. "Figure 20"
  /** Plain-language description for screen readers. */
  alt: string;
  width: number;
  height: number;
}

interface QuestionBase {
  id: string;
  rating: RatingId;
  areaId: string;
  taskId?: string;
  prompt: string;
  explanation: string;
  reference: string; // e.g. "14 CFR 91.155"
  difficulty: 1 | 2 | 3;
  /** Study topic (practice-bank section), e.g. "airspace". */
  topic?: string;
  figure?: QuestionFigure;
}

/** Multiple-choice, written-test style. */
export interface McQuestion extends QuestionBase {
  kind: "mc";
  choices: string[];
  answerIndex: number;
}

/** Open-ended oral question, graded against key points. */
export interface OralQuestion extends QuestionBase {
  kind: "oral";
  /** Concepts a good answer should mention; used by the mock grader. */
  keyPoints: { label: string; keywords: string[] }[];
}

export type Question = McQuestion | OralQuestion;

export type LessonBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "tip" | "warning"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export interface Lesson {
  slug: string;
  rating: RatingId;
  areaId: string;
  title: string;
  summary: string;
  minutes: number;
  blocks: LessonBlock[];
  reference: string;
}

export interface QuizPreset {
  id: string;
  rating: RatingId;
  title: string;
  description: string;
  areaIds: string[] | "all";
  /** Optional narrower filter by study topic. */
  topics?: string[];
  /** Only the figure and calculation set: charts, tables and flight-computer math. */
  figureSet?: boolean;
  count: number;
  timeLimitMin?: number;
}
