/**
 * Voices students can pick for the CFI (Teach) and DPE (Examine) roles.
 * The server only accepts IDs from these lists, so the picker can't be used
 * to call arbitrary voices on the account.
 */

export type TtsProvider = "elevenlabs" | "openai";
export type VoiceRole = "cfi" | "dpe";

export interface VoiceOption {
  id: string;
  name: string;
  description: string;
}

export const VOICES: Record<TtsProvider, VoiceOption[]> = {
  elevenlabs: [
    { id: "JBFqnCBsd6RMkjVDRZzb", name: "George", description: "Warm, captivating · British" },
    { id: "iP95p4xoKVk53GoZ742B", name: "Chris", description: "Charming, down-to-earth · American" },
    { id: "cjVigY5qzO86Huf0OWal", name: "Eric", description: "Smooth, trustworthy · American" },
    { id: "bIHbv24MWmeRgasZH58o", name: "Will", description: "Relaxed, optimistic · American" },
    { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", description: "Laid-back, casual · American" },
    { id: "XrExE9yKIg1WjnnlVkGX", name: "Matilda", description: "Knowledgeable, upbeat · American" },
    { id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice", description: "Clear, engaging educator · British" },
    { id: "SAz9YHcvj6GT2YYXdXww", name: "River", description: "Relaxed, neutral · American" },
    { id: "pNInz6obpgDQGcFmaJgB", name: "Adam", description: "Firm, direct · American" },
    { id: "pqHfZKP75CvOlQylNhV4", name: "Bill", description: "Wise, mature, crisp · American" },
    { id: "nPczCjzI2devNBz1zQrb", name: "Brian", description: "Deep, resonant · American" },
    { id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel", description: "Steady, formal · British" },
    { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", description: "Mature, reassuring · American" },
    { id: "hpp4J3VqNfWAUOO0d1Us", name: "Bella", description: "Professional, bright · American" },
  ],
  openai: [
    { id: "coral", name: "Coral", description: "Warm, friendly" },
    { id: "sage", name: "Sage", description: "Calm, thoughtful" },
    { id: "verse", name: "Verse", description: "Expressive" },
    { id: "ballad", name: "Ballad", description: "Soft, gentle" },
    { id: "nova", name: "Nova", description: "Bright, energetic" },
    { id: "shimmer", name: "Shimmer", description: "Light, clear" },
    { id: "alloy", name: "Alloy", description: "Balanced, neutral" },
    { id: "ash", name: "Ash", description: "Steady, professional" },
    { id: "echo", name: "Echo", description: "Even, measured" },
    { id: "onyx", name: "Onyx", description: "Deep, authoritative" },
    { id: "fable", name: "Fable", description: "Storyteller, British" },
  ],
};

export const DEFAULT_VOICES: Record<TtsProvider, Record<VoiceRole, string>> = {
  elevenlabs: { cfi: "JBFqnCBsd6RMkjVDRZzb", dpe: "pNInz6obpgDQGcFmaJgB" },
  openai: { cfi: "coral", dpe: "ash" },
};

export const isKnownVoice = (provider: TtsProvider, id: string) => VOICES[provider].some((v) => v.id === id);

export const PREVIEW_LINES: Record<VoiceRole, string> = {
  cfi: "Hey, nice work today. Let's go over that crosswind landing and talk about what made it tricky.",
  dpe: "Alright, let's begin. Tell me what documents are required to be on board the aircraft.",
};
