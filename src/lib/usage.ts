import "server-only";
import { createClient } from "@/lib/supabase/server";

/** Daily caps per student for the paid services. Override in the environment. */
export const LIMITS = {
  aiReplies: Number(process.env.AI_DAILY_REPLY_LIMIT) || 60,
  ttsChars: Number(process.env.TTS_DAILY_CHAR_LIMIT) || 20000,
};

/**
 * Counts usage against today's cap (UTC day). Returns false when the student
 * is over the limit. Fails open, with a log line, if the usage table hasn't
 * been created yet, so a missing migration never locks students out.
 */
export async function consumeUsage(kind: "ai_replies" | "tts_chars", amount: number): Promise<boolean> {
  const supabase = await createClient();
  const cap = kind === "ai_replies" ? LIMITS.aiReplies : LIMITS.ttsChars;
  const { data, error } = await supabase.rpc("consume_usage", { kind, amount, cap });
  if (error) {
    console.warn(`consume_usage unavailable (${error.message}). Run supabase/migrations/003_daily_usage_limits.sql. Allowing request.`);
    return true;
  }
  return data === true;
}
