"use client";

import { bestBrowserVoice } from "@/lib/tts/browser-voice";

/**
 * Speaks a reply sentence by sentence while it's still being written.
 * Each sentence's audio is requested as soon as it's queued (so later
 * sentences are ready by the time earlier ones finish) and played in order.
 * Falls back to the browser's voice when no cloud voice is available.
 */

interface Item {
  text: string;
  audio: Promise<string | null>; // blob URL, or null → use the browser voice
}

export interface SpeechQueueOptions {
  mode: () => "teach" | "examine";
  voiceId: () => string | undefined;
  rate: () => number;
  enabled: () => boolean;
  onSpeakingChange: (speaking: boolean) => void;
  /** Called once a turn's input is finished and everything has been spoken. */
  onDone: () => void;
}

export class SpeechQueue {
  private items: Item[] = [];
  private gen = 0;
  private looping = false;
  private inputDone = true;
  private wake: (() => void) | null = null;
  private controllers: AbortController[] = [];
  private audio: HTMLAudioElement | null = null;
  private lastText = "";
  private cloud: boolean | null = null; // null = unknown until the first request

  constructor(private opts: SpeechQueueOptions) {}

  /** Start a new turn: more sentences will follow until finish() is called. */
  begin() {
    this.stop();
    this.inputDone = false;
  }

  enqueue(text: string) {
    if (!text.trim() || !this.opts.enabled()) return;
    const previous = this.lastText;
    this.lastText = text;
    this.items.push({ text, audio: this.fetchAudio(text, previous) });
    this.wake?.();
    if (!this.looping) void this.loop();
  }

  /** No more sentences for this turn. */
  finish() {
    this.inputDone = true;
    this.wake?.();
    if (!this.looping) this.opts.onDone();
  }

  /** Stop speaking immediately and drop anything queued (interrupt). */
  stop() {
    this.gen++;
    this.items = [];
    this.controllers.forEach((c) => c.abort());
    this.controllers = [];
    if (this.audio) {
      this.audio.pause();
      URL.revokeObjectURL(this.audio.src);
      this.audio = null;
    }
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    this.lastText = "";
    this.inputDone = true;
    this.wake?.();
    if (this.looping) {
      this.looping = false;
      this.opts.onSpeakingChange(false);
    }
  }

  setRate(rate: number) {
    if (this.audio) this.audio.playbackRate = rate;
  }

  private async fetchAudio(text: string, previousText: string): Promise<string | null> {
    if (this.cloud === false) return null;
    const ctrl = new AbortController();
    this.controllers.push(ctrl);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode: this.opts.mode(), voiceId: this.opts.voiceId(), previousText }),
        signal: ctrl.signal,
      });
      if (res.status === 501 || res.status === 429) {
        this.cloud = false; // not configured / daily voice limit: browser voice from now on
        return null;
      }
      if (!res.ok) return null;
      this.cloud = true;
      return URL.createObjectURL(await res.blob());
    } catch {
      return null; // aborted or network hiccup: this sentence uses the browser voice
    }
  }

  private async loop() {
    const gen = this.gen;
    this.looping = true;
    this.opts.onSpeakingChange(true);
    while (gen === this.gen) {
      const item = this.items.shift();
      if (!item) {
        if (this.inputDone) break;
        await new Promise<void>((r) => (this.wake = r)); // wait for the next sentence or finish()
        this.wake = null;
        continue;
      }
      const url = await item.audio;
      if (gen !== this.gen) {
        if (url) URL.revokeObjectURL(url);
        break;
      }
      await (url ? this.playUrl(url, gen) : this.speakBrowser(item.text, gen));
    }
    if (gen === this.gen) {
      this.looping = false;
      this.opts.onSpeakingChange(false);
      this.opts.onDone();
    }
  }

  private playUrl(url: string, gen: number) {
    return new Promise<void>((resolve) => {
      const a = new Audio(url);
      a.playbackRate = this.opts.rate();
      this.audio = a;
      const end = () => {
        URL.revokeObjectURL(url);
        if (this.audio === a) this.audio = null;
        resolve();
      };
      a.onended = end;
      a.onerror = end;
      a.play().catch(end);
      if (gen !== this.gen) end();
    });
  }

  private speakBrowser(text: string, gen: number) {
    return new Promise<void>((resolve) => {
      if (gen !== this.gen || !window.speechSynthesis) return resolve();
      const u = new SpeechSynthesisUtterance(text);
      const voice = bestBrowserVoice();
      if (voice) u.voice = voice;
      u.rate = this.opts.rate();
      u.onend = () => resolve();
      u.onerror = () => resolve();
      window.speechSynthesis.speak(u);
    });
  }
}
