import { claudeProvider } from "@/lib/ai/claude-provider";
import { mockProvider } from "@/lib/ai/mock-provider";
import type { AssistantProvider, AssistantRequest } from "@/lib/ai/types";
import { getSession } from "@/lib/auth/session";
import { getCheckride, toContext } from "@/lib/checkride/queries";
import { consumeUsage, LIMITS } from "@/lib/usage";

// Claude when ANTHROPIC_API_KEY is set; otherwise the keyword-matching sample engine.
// Checked per request so adding the key takes effect without a restart.
const configuredProvider = (): AssistantProvider => (process.env.ANTHROPIC_API_KEY ? claudeProvider : mockProvider);

const MAX_TURNS = 60; // keep requests bounded

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<AssistantRequest> & { demo?: boolean; checkrideId?: string };
  if (!body.mode || !body.rating || !Array.isArray(body.messages)) {
    return Response.json({ error: "mode, rating and messages are required" }, { status: 400 });
  }
  // The real model costs money per turn: signed-in students only. The public
  // home-page demo (demo: true) always uses the free sample engine.
  const provider = configuredProvider();
  const engine = body.demo || (provider === claudeProvider && !(await getSession())) ? mockProvider : provider;

  if (engine === claudeProvider && !(await consumeUsage("ai_replies", 1))) {
    return Response.json({
      reply: `You've reached today's limit of ${LIMITS.aiReplies} AI replies. It resets at midnight UTC. In the meantime, the quizzes and question bank are unlimited.`,
      state: body.state ?? { askedIds: [], currentQuestionId: null },
      engine: engine.name,
      limitReached: true,
    });
  }

  // Full mock checkride: load the student's own plan + documents (RLS-scoped).
  const checkrideRow = engine === claudeProvider && body.checkrideId ? await getCheckride(body.checkrideId) : null;

  const res = await engine.respond({
    mode: body.mode === "examine" ? "examine" : "teach",
    rating: body.rating === "ir" ? "ir" : "ppl",
    messages: body.messages.slice(-MAX_TURNS).map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content ?? "").slice(0, 4000) })),
    state: body.state ?? { askedIds: [], currentQuestionId: null },
    checkride: checkrideRow ? toContext(checkrideRow) : undefined,
  });
  return Response.json({ ...res, engine: engine.name });
}
