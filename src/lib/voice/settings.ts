"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/** Per-device conversation preferences for the voice assistant. */
export interface VoiceSettings {
  handsFree: boolean; // reopen the mic automatically after each reply
  rate: number; // speaking speed
  pauseMs: number; // how long a silence ends your answer
}

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = { handsFree: false, rate: 1, pauseMs: 2000 };

const KEY = "aviant:voice-settings";
const EVENT = "aviant:voice-settings-change";
let memory = "";

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function useVoiceSettings(): [VoiceSettings, (patch: Partial<VoiceSettings>) => void] {
  const raw = useSyncExternalStore(subscribe, read, () => "");
  const settings = useMemo<VoiceSettings>(() => {
    try {
      return { ...DEFAULT_VOICE_SETTINGS, ...(raw ? JSON.parse(raw) : {}) };
    } catch {
      return DEFAULT_VOICE_SETTINGS;
    }
  }, [raw]);
  const update = useCallback(
    (patch: Partial<VoiceSettings>) => {
      memory = JSON.stringify({ ...settings, ...patch });
      try {
        localStorage.setItem(KEY, memory);
      } catch {
        /* kept in memory for this visit */
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [settings],
  );
  return [settings, update];
}
