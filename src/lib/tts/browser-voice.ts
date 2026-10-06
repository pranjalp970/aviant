/**
 * Fallback when no cloud voice is configured: pick the most natural voice the
 * browser offers instead of the robotic default. Neural/Natural voices ship
 * with Edge and Chrome; macOS/iOS have Premium/Enhanced Siri-quality voices.
 */
const PREFERRED = [/natural/i, /neural/i, /premium/i, /enhanced/i, /^Google US English$/i, /Samantha|Ava|Evan|Zoe|Nathan/i];

export function bestBrowserVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const en = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (!en.length) return null;
  const us = en.filter((v) => v.lang.toLowerCase() === "en-us");
  for (const pattern of PREFERRED) {
    const hit = us.find((v) => pattern.test(v.name)) ?? en.find((v) => pattern.test(v.name));
    if (hit) return hit;
  }
  return us[0] ?? en[0];
}
