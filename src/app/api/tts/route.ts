import { getSession } from "@/lib/auth/session";
import { consumeUsage } from "@/lib/usage";
import { DEFAULT_VOICES, isKnownVoice, type TtsProvider } from "@/lib/tts/voices";

/**
 * Natural text-to-speech for the voice CFI/DPE.
 *
 * Set ONE provider in web/.env.local (see .env.example):
 *   ELEVENLABS_API_KEY  — most human-sounding
 *   OPENAI_API_KEY      — cheaper, and takes tone instructions
 * With neither set this returns 501 and the client falls back to the
 * browser's built-in voice.
 */

type Mode = "teach" | "examine";

const MAX_CHARS = 2000;

// Persona per mode: a warm instructor vs. a crisp, neutral examiner.
const OPENAI_INSTRUCTIONS: Record<Mode, string> = {
  teach:
    "You are a friendly, encouraging certified flight instructor. Speak warmly and conversationally at a relaxed pace, like explaining something to a student pilot over the wing.",
  examine:
    "You are an FAA designated pilot examiner conducting a checkride oral exam. Speak in a calm, professional, even tone. Clear and measured, not unfriendly, but businesslike.",
};

function activeProvider(): TtsProvider | null {
  if (process.env.ELEVENLABS_API_KEY) return "elevenlabs";
  if (process.env.OPENAI_API_KEY) return "openai";
  return null;
}

/** Student's pick if it's on the allowlist, else the .env override, else the default. */
function resolveVoice(provider: TtsProvider, mode: Mode, requested?: string) {
  if (requested && isKnownVoice(provider, requested)) return requested;
  const role = mode === "teach" ? "cfi" : "dpe";
  const env =
    provider === "elevenlabs"
      ? role === "cfi"
        ? process.env.ELEVENLABS_VOICE_CFI
        : process.env.ELEVENLABS_VOICE_DPE
      : role === "cfi"
        ? process.env.OPENAI_VOICE_CFI
        : process.env.OPENAI_VOICE_DPE;
  return env || DEFAULT_VOICES[provider][role];
}

async function elevenlabs(text: string, mode: Mode, voice: string, key: string) {
  return fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: process.env.ELEVENLABS_MODEL ?? "eleven_flash_v2_5",
      voice_settings: mode === "teach" ? { stability: 0.45, similarity_boost: 0.8, style: 0.25 } : { stability: 0.7, similarity_boost: 0.8, style: 0.05 },
    }),
  });
}

async function openai(text: string, mode: Mode, voice: string, key: string) {
  return fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_TTS_MODEL ?? "gpt-4o-mini-tts",
      voice,
      input: text,
      instructions: OPENAI_INSTRUCTIONS[mode],
      response_format: "mp3",
    }),
  });
}

/** Which provider is live and the default voices, so the picker shows the right list. */
export async function GET() {
  if (!(await getSession())) return Response.json({ error: "Not signed in" }, { status: 401 });
  const provider = activeProvider();
  return Response.json({
    provider,
    defaults: provider ? { cfi: resolveVoice(provider, "teach"), dpe: resolveVoice(provider, "examine") } : null,
  });
}

export async function POST(request: Request) {
  // Only signed-in users may spend the TTS quota.
  if (!(await getSession())) return Response.json({ error: "Not signed in" }, { status: 401 });

  const { text, mode, voiceId } = (await request.json()) as { text?: string; mode?: Mode; voiceId?: string };
  if (!text?.trim()) return Response.json({ error: "text is required" }, { status: 400 });
  const m: Mode = mode === "examine" ? "examine" : "teach";
  const input = text.slice(0, MAX_CHARS);

  const provider = activeProvider();
  if (!provider) return Response.json({ error: "No TTS provider configured" }, { status: 501 });
  const voice = resolveVoice(provider, m, voiceId);
  // Daily voice allowance; over it, the client falls back to the browser voice.
  if (!(await consumeUsage("tts_chars", input.length))) {
    return Response.json({ error: "Daily voice limit reached" }, { status: 429 });
  }

  const upstream =
    provider === "elevenlabs"
      ? await elevenlabs(input, m, voice, process.env.ELEVENLABS_API_KEY!)
      : await openai(input, m, voice, process.env.OPENAI_API_KEY!);
  if (!upstream.ok || !upstream.body) {
    console.error("TTS provider error", upstream.status, await upstream.text().catch(() => ""));
    return Response.json({ error: "Voice service unavailable" }, { status: 502 });
  }
  // Stream the audio straight through so playback can start quickly.
  return new Response(upstream.body, {
    headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
  });
}
