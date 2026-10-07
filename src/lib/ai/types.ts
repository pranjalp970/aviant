import type { RatingId } from "@/content/types";

export type AssistantMode = "teach" | "examine";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Opaque-ish session state the client echoes back each turn. */
export interface ExamState {
  askedIds: string[];
  currentQuestionId: string | null;
}

export interface Grade {
  questionId: string;
  prompt: string;
  hits: string[];
  misses: string[];
  /** 0–1 share of key points covered. */
  score: number;
}

/** A document the student uploaded for a mock checkride, stored with Claude's Files API. */
export interface CheckrideDocument {
  fileId: string;
  kind: "plan" | "poh" | "other";
  name: string;
  mime: string;
  path: string; // Supabase storage path
}

export interface CheckrideContext {
  aircraft: string;
  departure: string;
  destination: string;
  notes: string;
  documents: CheckrideDocument[];
}

export interface AssistantRequest {
  mode: AssistantMode;
  rating: RatingId;
  messages: ChatMessage[];
  state: ExamState;
  /** Present for a full mock checkride built around the student's own plan. */
  checkride?: CheckrideContext;
  /** ACS codes the student missed on the FAA knowledge test (examiners probe these). */
  focusCodes?: string[];
}

export interface AssistantResponse {
  reply: string;
  state: ExamState;
  grade?: Grade;
  /** Source references the reply leaned on. */
  references?: string[];
}

/**
 * Any AI backend (Claude, OpenAI, …) implements this. The route handler at
 * /api/assistant picks the provider — swap `mockProvider` for a real one.
 */
export interface AssistantProvider {
  name: string;
  /** `onReply` (optional) receives the spoken reply as it streams in, so the UI can show and speak it early. */
  respond(req: AssistantRequest, onReply?: (replySoFar: string) => void): Promise<AssistantResponse>;
}
