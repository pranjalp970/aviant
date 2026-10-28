"use client";

import { CaretDown, Play, SpinnerGap, Stop } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { PREVIEW_LINES, VOICES, type TtsProvider, type VoiceRole } from "@/lib/tts/voices";

interface VoicePickerProps {
  provider: TtsProvider | null | undefined; // undefined = still checking
  selected: Record<VoiceRole, string> | null;
  onChange: (role: VoiceRole, voiceId: string) => void;
  /** Stop the assistant talking before a preview plays. */
  onBeforePreview: () => void;
}

const ROLES: { role: VoiceRole; label: string; sub: string }[] = [
  { role: "cfi", label: "CFI voice", sub: "Teach mode" },
  { role: "dpe", label: "DPE voice", sub: "Examine mode" },
];

export function VoicePicker({ provider, selected, onChange, onBeforePreview }: VoicePickerProps) {
  const [previewing, setPreviewing] = useState<{ role: VoiceRole; state: "loading" | "playing" } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cacheRef = useRef(new Map<string, string>()); // voice+role → blob URL, so replays are free

  useEffect(() => {
    const cache = cacheRef.current;
    return () => {
      audioRef.current?.pause();
      cache.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  function stopPreview() {
    audioRef.current?.pause();
    audioRef.current = null;
    setPreviewing(null);
  }

  async function preview(role: VoiceRole) {
    if (!selected) return;
    if (previewing?.role === role) return stopPreview();
    stopPreview();
    onBeforePreview();
    setError(null);
    const voiceId = selected[role];
    const key = `${voiceId}:${role}`;
    try {
      let url = cacheRef.current.get(key);
      if (!url) {
        setPreviewing({ role, state: "loading" });
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: PREVIEW_LINES[role], mode: role === "cfi" ? "teach" : "examine", voiceId }),
        });
        if (res.status === 429) throw new Error("limit");
        if (!res.ok) throw new Error();
        url = URL.createObjectURL(await res.blob());
        cacheRef.current.set(key, url);
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setPreviewing(null);
      setPreviewing({ role, state: "playing" });
      await audio.play();
    } catch (e) {
      setPreviewing(null);
      setError(e instanceof Error && e.message === "limit" ? "You've used today's voice allowance. Previews are back tomorrow." : "Couldn't play that preview. Try again in a moment.");
    }
  }

  return (
    <div className="card p-6">
      <h2 className="font-display text-lg">Voices</h2>

      {provider === undefined && <p className="mt-2 text-sm text-fg-subtle">Checking voice options…</p>}

      {provider === null && (
        <p className="mt-2 text-sm text-fg-muted">
          Natural voices aren&rsquo;t set up yet, so the assistant uses your browser&rsquo;s built-in voice.
        </p>
      )}

      {provider && selected && (
        <div className="mt-4 space-y-5">
          {ROLES.map(({ role, label, sub }) => {
            const p = previewing?.role === role ? previewing.state : null;
            return (
              <div key={role}>
                <label htmlFor={`voice-${role}`} className="mb-1.5 flex items-baseline justify-between text-sm">
                  <span className="text-fg">{label}</span>
                  <span className="text-xs text-fg-subtle">{sub}</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative min-w-0 flex-1">
                    <select
                      id={`voice-${role}`}
                      value={selected[role]}
                      onChange={(e) => {
                        if (previewing?.role === role) stopPreview();
                        onChange(role, e.target.value);
                      }}
           className="h-11 w-full cursor-pointer transition-colors hover:border-fg/35 appearance-none rounded-ui border border-border-strong bg-inset pl-3 pr-9 text-sm text-fg focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
                    >
                      {VOICES[provider].map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                    <CaretDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-fg-subtle" aria-hidden />
                  </div>
                  <button
                    type="button"
                    onClick={() => void preview(role)}
                    aria-label={p === "playing" ? `Stop ${label} preview` : `Preview ${label}`}
          className="grid size-11 shrink-0 cursor-pointer transition-colors hover:border-fg/35 place-items-center rounded-ui border border-border-strong text-accent"
                  >
                    {p === "loading" ? (
                      <SpinnerGap size={18} className="animate-spin" aria-hidden />
                    ) : p === "playing" ? (
                      <Stop size={18} weight="fill" aria-hidden />
                    ) : (
                      <Play size={18} weight="fill" aria-hidden />
                    )}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-fg-subtle">{VOICES[provider].find((v) => v.id === selected[role])?.description}</p>
              </div>
            );
          })}
          {error && (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}
          <p className="text-xs text-fg-subtle">Saved to your account.</p>
        </div>
      )}
    </div>
  );
}
