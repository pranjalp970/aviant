import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { areasFor, ratingById } from "@/content/acs";
import { QUESTIONS } from "@/content/questions";
import type { RatingId } from "@/content/types";
import type { AssistantMode, AssistantProvider, AssistantRequest, AssistantResponse, CheckrideContext } from "./types";

/**
 * Real AI CFI/DPE on Claude. The question bank is sent as grounding in a
 * cached system prompt; each turn returns a structured { reply, grade } so the
 * UI can speak the reply and record the grade.
 */

const MODEL = "claude-opus-5-5";

const TurnSchema = z.object({
  reply: z.string().describe("What you say out loud to the student. Plain spoken English, no markdown."),
  references: z.array(z.string()).describe("Sources your reply relied on, e.g. '14 CFR 91.155' or 'AIM 5-3-8'. Empty if none."),
  grade: z
    .object({
      questionId: z.string().nullable().describe("Bank id of the question being graded, or null for a question you made up."),
      prompt: z.string().describe("The question that was asked, as you asked it."),
      score: z.number().describe("Share of the key points the student covered, from 0 to 1."),
      hits: z.array(z.string()).describe("Key points the student covered."),
      misses: z.array(z.string()).describe("Key points the student missed or got wrong."),
    })
    .nullable()
    .describe("Set only on the turn where you finish evaluating a question in Examine mode; otherwise null."),
});

// ── Grounding material (built once per rating, kept byte-stable for caching) ──
const groundingCache = new Map<RatingId, string>();

function grounding(rating: RatingId): string {
  const hit = groundingCache.get(rating);
  if (hit) return hit;
  const areas = areasFor(rating)
    .map((a) => `${a.numeral}. ${a.name}: ${a.tasks.map((t) => `${t.code} ${t.name}`).join("; ")}`)
    .join("\n");
  const oral = QUESTIONS.filter((q) => q.rating === rating && q.kind === "oral")
    .map((q) => (q.kind === "oral" ? `[${q.id}] ${q.prompt}\n  Key points: ${q.keyPoints.map((k) => k.label).join("; ")}\n  Model answer: ${q.explanation}\n  Ref: ${q.reference}` : ""))
    .join("\n");
  const facts = QUESTIONS.filter((q) => q.rating === rating && q.kind === "mc")
    .map((q) => (q.kind === "mc" ? `- ${q.prompt} → ${q.choices[q.answerIndex]} (${q.explanation} Ref: ${q.reference})` : ""))
    .join("\n");
  const text = `ACS AREAS OF OPERATION (${ratingById(rating).acsCode}):\n${areas}\n\nORAL QUESTION BANK (with grading key points):\n${oral}\n\nVERIFIED FACTS FROM THE PRACTICE BANK:\n${facts}`;
  groundingCache.set(rating, text);
  return text;
}

const VOICE_RULES = `Everything you write in "reply" is read aloud by text-to-speech, so write the way a person talks: plain sentences, no markdown, no bullet points, no headings, no emoji. Spell out abbreviations the way pilots say them when it helps (for example "fourteen CFR ninety-one point one fifty-five"). Keep replies short: usually two to four sentences, never more than about 90 words.`;

const ACCURACY_RULES = `Accuracy matters more than anything: student pilots will act on what you say. Ground regulatory and procedural facts in the reference material below. If something isn't covered there and you aren't confident, say so and point the student to the relevant source (14 CFR, the AIM, the PHAK, the ACS) rather than guessing. You are a study aid, not a replacement for the student's real CFI or examiner.`;

function checkridePrompt(rating: RatingId, c: CheckrideContext): string {
  const r = ratingById(rating).name;
  const docs = c.documents.length ? c.documents.map((d) => `${d.name} (${d.kind === "poh" ? "aircraft POH/AFM" : d.kind === "plan" ? "cross-country plan" : "other"})`).join(", ") : "none";
  return `You are an FAA Designated Pilot Examiner conducting the oral portion of a ${r} practical test, by voice. This is a full mock checkride built around the student's own preparation.

The student has planned a cross-country flight from ${c.departure || "(departure not given)"} to ${c.destination || "(destination not given)"} in a ${c.aircraft || "(aircraft not given)"}.${c.notes ? ` Their notes: ${c.notes}` : ""}
Documents they provided (attached at the start of the conversation): ${docs}.

Run it the way real examiners do:
- Open by greeting them and asking them to walk you through their planned flight. Then work through the areas of operation using THEIR plan: pilot qualifications and currency, aircraft documents and airworthiness, weather (ask what they found and how it affects the flight; you have no live weather, so if their plan lacks it, give a realistic hypothetical briefing and ask for their decision), performance and limitations using THEIR aircraft's POH charts (takeoff and landing distance, density altitude, climb), weight and balance with their numbers, the route and airspace along it, fuel planning and reserves, diversions and alternates, and the go/no-go decision.
- Quote specific numbers and pages from their documents when you ask about them ("Your POH shows..."). If a document is missing or unclear, ask the student to state the numbers and check them for reasonableness.
- Introduce one realistic change mid-oral (for example weather deteriorating en route or an alternator failure) and ask how they'd handle it.
- Ask one question at a time; probe vague answers with up to two follow-ups; never reveal what you're looking for before they answer.
- When you finish evaluating a topic, fill in "grade" (questionId null, prompt = the question as asked, key points you expected), give brief feedback, and move to the next topic in the same reply.
- If the student asks to stop, give a short debrief: what went well, what to review, and whether this would likely be satisfactory.`;
}

function systemPrompt(mode: AssistantMode, rating: RatingId, checkride?: CheckrideContext): string {
  if (checkride) return `${checkridePrompt(rating, checkride)}\n\n${VOICE_RULES}\n\n${ACCURACY_RULES}\n\nReturn JSON matching the provided schema.`;
  const r = ratingById(rating).name;
  const role =
    mode === "examine"
      ? `You are an FAA Designated Pilot Examiner giving the oral portion of a ${r} practical test, by voice, to a student preparing for their checkride.

How to run the oral:
- Ask one question at a time. Favor realistic scenarios ("You're planning a cross-country tomorrow and...") over trivia, the way real examiners do, and move across different areas of operation.
- Use the oral question bank below as your main source. For bank questions, set grade.questionId to the bank id and grade against its key points. You may also ask your own scenario questions; then set questionId to null and choose sensible key points yourself.
- If an answer is incomplete or vague, ask up to two short follow-ups to probe before deciding. Don't give away the answer while probing.
- When you're done evaluating a question, fill in "grade" on that turn, briefly tell the student how they did (and the correct answer if they missed something), then ask the next question in the same reply.
- Stay calm, professional and fair: businesslike, not harsh. Never reveal the grading key points before the student answers.
- On the very first turn, greet the student in one sentence and ask your first question. Leave grade null.
- If the student asks to stop, wrap up with a two-sentence summary of strengths and what to review.`
      : `You are a friendly, patient Certified Flight Instructor helping a student pilot study for their ${r} checkride, by voice.

How to teach:
- Answer the student's question clearly and correctly, then check understanding with a short follow-up question or a practical example from real flying.
- Use memory aids pilots actually use when they help (ARROW, AV1ATE, PAVE, IMSAFE and so on).
- If the student asks you to quiz them, ask one question at a time and give feedback after each answer.
- Encourage the student. Never make them feel dumb for asking.
- Always set "grade" to null in teach mode.`;
  return `${role}\n\n${VOICE_RULES}\n\n${ACCURACY_RULES}\n\nReturn JSON matching the provided schema.`;
}

// ── Provider ──
let client: Anthropic | null = null;
const getClient = () => (client ??= new Anthropic()); // reads ANTHROPIC_API_KEY

export const claudeProvider: AssistantProvider = {
  name: "claude",
  async respond(req: AssistantRequest): Promise<AssistantResponse> {
    // The API needs the conversation to start with a user turn.
    const messages: Anthropic.Beta.BetaMessageParam[] = req.messages.map((m) => ({ role: m.role, content: m.content }));
    if (req.checkride) {
      // The student's documents open the conversation. Cached with everything before them,
      // so a long POH is paid for once per session, not on every turn.
      const blocks: Anthropic.Beta.BetaContentBlockParam[] = req.checkride.documents.map((d) =>
        d.mime.startsWith("image/")
          ? { type: "image", source: { type: "file", file_id: d.fileId } }
          : { type: "document", source: { type: "file", file_id: d.fileId }, title: d.name },
      );
      if (blocks.length) blocks[blocks.length - 1] = { ...blocks[blocks.length - 1], cache_control: { type: "ephemeral" } } as Anthropic.Beta.BetaContentBlockParam;
      blocks.push({ type: "text", text: "Here's my cross-country plan and aircraft documents. I'm ready for the oral." });
      messages.unshift({ role: "user", content: blocks });
    } else if (messages[0]?.role !== "user") {
      messages.unshift({
        role: "user",
        content: req.mode === "examine" ? "(The student has joined the session. Begin the oral exam.)" : "(The student has opened a study session.)",
      });
    }

    try {
      const response = await getClient().beta.messages.parse({
        model: MODEL,
        max_tokens: 8000,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default", // a declined request is retried server-side on Anthropic's recommended model
        // Examine needs careful grading; Teach favors quick spoken replies.
        output_config: { effort: req.mode === "examine" ? "medium" : "low", format: betaZodOutputFormat(TurnSchema) },
        system: [
          { type: "text", text: systemPrompt(req.checkride ? "examine" : req.mode, req.rating, req.checkride) },
          // Large, byte-stable grounding block: cached so each turn only pays for the conversation.
          { type: "text", text: grounding(req.rating), cache_control: { type: "ephemeral" } },
        ],
        messages,
      });

      if (response.stop_reason === "refusal") {
        return { reply: "Let's keep things focused on your checkride prep. Ask me about another topic and we'll keep going.", state: req.state };
      }
      const turn = response.parsed_output;
      if (!turn) throw new Error(`Unparseable response (stop_reason ${response.stop_reason})`);

      const grade =
        (req.mode === "examine" || req.checkride) && turn.grade
          ? {
              questionId: turn.grade.questionId ?? `custom-${Date.now()}`,
              prompt: turn.grade.prompt,
              hits: turn.grade.hits,
              misses: turn.grade.misses,
              score: Math.min(1, Math.max(0, turn.grade.score)),
            }
          : undefined;

      return {
        reply: turn.reply,
        references: turn.references.length ? turn.references : undefined,
        grade,
        state: {
          askedIds: grade ? [...req.state.askedIds, grade.questionId] : req.state.askedIds,
          currentQuestionId: null,
        },
      };
    } catch (error) {
      if (error instanceof Anthropic.AuthenticationError) console.error("Claude: invalid ANTHROPIC_API_KEY");
      else if (error instanceof Anthropic.RateLimitError) console.error("Claude: rate limited");
      else if (error instanceof Anthropic.APIError) console.error(`Claude API error ${error.status}:`, error.message);
      else console.error("Claude provider error:", error);
      return {
        reply: "Sorry, I lost my train of thought for a second. Could you say that again?",
        state: req.state,
      };
    }
  },
};
