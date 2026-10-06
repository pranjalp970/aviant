"use client";

import {
  ArrowCounterClockwise,
  CheckCircle,
  Circle,
  Microphone,
  MicrophoneSlash,
  PaperPlaneRight,
  SpeakerHigh,
  SpeakerSlash,
  Stop,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { buttonClass } from "@/components/ui/button";
import { VoicePicker } from "@/components/portal/VoicePicker";
import { bestBrowserVoice } from "@/lib/tts/browser-voice";
import { saveOralSession, saveVoicePreference } from "@/lib/data/actions";
import { isKnownVoice, type TtsProvider, type VoiceRole } from "@/lib/tts/voices";
import type { RatingId } from "@/content/types";
import type { AssistantMode, AssistantResponse, ChatMessage, ExamState, Grade } from "@/lib/ai/types";

type Status = "idle" | "listening" | "thinking" | "speaking";

interface Turn extends ChatMessage {
  references?: string[];
}

/* Minimal typing for the Web Speech API (not in lib.dom for all browsers). */
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start(): void;
  stop(): void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
}

const noopSubscribe = () => () => {};
const hasSpeechRecognition = () => "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

const EMPTY_STATE: ExamState = { askedIds: [], currentQuestionId: null };

interface VoiceAssistantProps {
  rating: RatingId;
  ratingLabel: string;
  initialMode: AssistantMode;
  /** Voices saved on the student's profile. */
  savedVoices: Partial<Record<VoiceRole, string>>;
  /** Full mock checkride around the student's own plan: locks to Examine mode. */
  checkride?: { id: string; label: string };
}

export function VoiceAssistant({ rating, ratingLabel, initialMode, savedVoices, checkride }: VoiceAssistantProps) {
  const [mode, setMode] = useState<AssistantMode>(checkride ? "examine" : initialMode);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [examState, setExamState] = useState<ExamState>(EMPTY_STATE);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [draft, setDraft] = useState("");
  const [interim, setInterim] = useState("");
  const [voiceOn, setVoiceOn] = useState(true);
  const [micError, setMicError] = useState<string | null>(null);
  const [showDebrief, setShowDebrief] = useState(false);
  const [engine, setEngine] = useState<string | null>(null); // "claude" | "mock", known after the first reply

  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const finalRef = useRef("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const turnsRef = useRef<Turn[]>([]);
  const gradesRef = useRef<Grade[]>([]);
  useEffect(() => {
    turnsRef.current = turns;
    gradesRef.current = grades;
  }, [turns, grades]);
  const micSupported = useSyncExternalStore(noopSubscribe, hasSpeechRecognition, () => true);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, interim]);

  // Cloud voice (ElevenLabs/OpenAI via /api/tts) when configured, best browser voice otherwise.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cloudVoiceRef = useRef<boolean | null>(null); // null = not yet known
  const speakTokenRef = useRef(0);

  // Which natural-voice provider is live, and the student's chosen voices for it.
  const [voiceInfo, setVoiceInfo] = useState<{ provider: TtsProvider | null; defaults: Record<VoiceRole, string> | null } | undefined>();
  const [voicePrefs, setVoicePrefs] = useState(savedVoices);
  const setVoicePref = useCallback((role: VoiceRole, voiceId: string) => {
    setVoicePrefs((p) => ({ ...p, [role]: voiceId }));
    void saveVoicePreference(role, voiceId); // persists to the profile
  }, []);

  // Each conversation is saved as one oral session, created on the first reply.
  const sessionIdRef = useRef<string | null>(null);
  useEffect(() => {
    fetch("/api/tts")
      .then((r) => (r.ok ? r.json() : { provider: null, defaults: null }))
      .then((info) => {
        cloudVoiceRef.current = !!info.provider;
        setVoiceInfo(info);
      })
      .catch(() => setVoiceInfo({ provider: null, defaults: null }));
  }, []);
  const provider = voiceInfo?.provider;
  const selectedVoices = useMemo<Record<VoiceRole, string> | null>(() => {
    const defaults = voiceInfo?.defaults;
    if (!provider || !defaults) return null;
    const pick = (role: VoiceRole) => {
      const id = voicePrefs[role];
      return id && isKnownVoice(provider, id) ? id : defaults[role];
    };
    return { cfi: pick("cfi"), dpe: pick("dpe") };
  }, [provider, voiceInfo, voicePrefs]);

  const stopSpeech = useCallback(() => {
    speakTokenRef.current++; // invalidates any audio still being fetched
    window.speechSynthesis?.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      URL.revokeObjectURL(audioRef.current.src);
      audioRef.current = null;
    }
  }, []);

  const speakWithBrowser = useCallback((text: string) => {
    if (!window.speechSynthesis) return setStatus("idle");
    const u = new SpeechSynthesisUtterance(text);
    const voice = bestBrowserVoice();
    if (voice) u.voice = voice;
    u.onend = () => setStatus("idle");
    u.onerror = () => setStatus("idle");
    setStatus("speaking");
    window.speechSynthesis.speak(u);
  }, []);

  const speak = useCallback(
    async (text: string, m: AssistantMode) => {
      stopSpeech();
      if (!voiceOn || typeof window === "undefined") return setStatus("idle");
      const token = speakTokenRef.current;

      if (cloudVoiceRef.current !== false) {
        try {
          const res = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, mode: m, voiceId: selectedVoices?.[m === "teach" ? "cfi" : "dpe"] }),
          });
          if (res.status === 501) cloudVoiceRef.current = false; // no provider configured
          if (res.ok) {
            cloudVoiceRef.current = true;
            const url = URL.createObjectURL(await res.blob());
            if (token !== speakTokenRef.current) return URL.revokeObjectURL(url); // interrupted meanwhile
            const audio = new Audio(url);
            audioRef.current = audio;
            audio.onended = () => {
              URL.revokeObjectURL(url);
              setStatus("idle");
            };
            setStatus("speaking");
            await audio.play().catch(() => setStatus("idle"));
            return;
          }
        } catch {
          /* network hiccup: fall back to the browser voice for this reply */
        }
      }
      if (token === speakTokenRef.current) speakWithBrowser(text);
    },
    [voiceOn, stopSpeech, speakWithBrowser, selectedVoices],
  );

  useEffect(() => {
    return () => {
      recRef.current?.stop();
      stopSpeech();
    };
  }, [stopSpeech]);

  const send = useCallback(
    async (text: string | null, opts?: { mode?: AssistantMode; state?: ExamState; history?: Turn[] }) => {
      const m = opts?.mode ?? mode;
      const history = opts?.history ?? turnsRef.current;
      const nextTurns: Turn[] = text ? [...history, { role: "user", content: text }] : history;
      setTurns(nextTurns);
      setStatus("thinking");
      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: m,
            rating,
            checkrideId: checkride?.id,
            messages: nextTurns.map(({ role, content }) => ({ role, content })),
            state: opts?.state ?? examState,
          }),
        });
        if (!res.ok) throw new Error();
        const data = (await res.json()) as AssistantResponse & { engine?: string };
        setEngine(data.engine ?? null);
        const allTurns: Turn[] = [...nextTurns, { role: "assistant", content: data.reply, references: data.references }];
        const allGrades = data.grade ? [...gradesRef.current, data.grade] : gradesRef.current;
        setTurns(allTurns);
        setExamState(data.state);
        if (data.grade) setGrades(allGrades);
        if (allTurns.some((t) => t.role === "user")) {
          void saveOralSession({
            id: sessionIdRef.current,
            mode: m,
            rating,
            checkrideId: checkride?.id,
            transcript: allTurns.map(({ role, content }) => ({ role, content })),
            grades: allGrades,
          }).then((r) => {
            sessionIdRef.current = r.id;
          });
        }
        void speak(data.reply, m);
      } catch {
        setTurns((t) => [...t, { role: "assistant", content: "I lost the connection for a second. Say that again?" }]);
        setStatus("idle");
      }
    },
    [mode, rating, examState, speak, checkride],
  );

  function reset(nextMode: AssistantMode) {
    recRef.current?.stop();
    stopSpeech();
    setMode(nextMode);
    sessionIdRef.current = null; // next conversation is a new session
    setTurns([]);
    setExamState(EMPTY_STATE);
    setGrades([]);
    setShowDebrief(false);
    setStatus("idle");
    setInterim("");
  }

  function startListening() {
    setMicError(null);
    const w = window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    stopSpeech();
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    finalRef.current = "";
    rec.onresult = (e) => {
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalRef.current += r[0].transcript;
        else interimText += r[0].transcript;
      }
      setInterim(finalRef.current + interimText);
    };
    rec.onerror = (e) => {
      setMicError(e.error === "not-allowed" ? "Microphone access was blocked. Allow it in your browser, or type your answer below." : "I couldn't hear that. Try again or type below.");
    };
    rec.onend = () => {
      recRef.current = null;
      const said = finalRef.current.trim();
      setInterim("");
      if (said) void send(said);
      else setStatus((s) => (s === "listening" ? "idle" : s));
    };
    recRef.current = rec;
    setStatus("listening");
    rec.start();
  }

  function stopListening() {
    recRef.current?.stop();
  }

  function submitDraft(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || status === "thinking") return;
    setDraft("");
    setMicError(null);
    void send(text);
  }

  const started = turns.length > 0;
  const avg = grades.length ? Math.round((grades.reduce((n, g) => n + g.score, 0) / grades.length) * 100) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      {/* Conversation column */}
      <section aria-label="Conversation" className="card flex min-h-[560px] flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
          {checkride ? (
            <span className="inline-flex h-11 items-center gap-2 rounded-full border border-green/40 bg-green/10 px-4 text-[15px] text-accent">
              Mock checkride · {checkride.label}
            </span>
          ) : (
          <div role="radiogroup" aria-label="Assistant mode" className="inline-flex rounded-full border border-border-strong bg-inset p-1">
            {(
              [
                { v: "teach", label: "Teach", sub: "CFI" },
                { v: "examine", label: "Examine", sub: "DPE" },
              ] as const
            ).map((o) => (
              <button
                key={o.v}
                type="button"
                role="radio"
                aria-checked={mode === o.v}
                onClick={() => mode !== o.v && reset(o.v)}
                className={clsx(
                  "h-10 cursor-pointer rounded-full px-4 text-[15px] transition-colors",
                  mode === o.v ? "bg-lime font-medium text-on-accent" : "text-fg-muted hover:text-fg",
                )}
              >
                {o.label} <span className={mode === o.v ? "text-on-accent/70" : "text-fg-subtle"}>· {o.sub}</span>
              </button>
            ))}
          </div>
          )}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                if (voiceOn) stopSpeech();
                setVoiceOn((v) => !v);
              }}
              aria-pressed={voiceOn}
              aria-label={voiceOn ? "Mute assistant voice" : "Unmute assistant voice"}
              className="grid size-11 cursor-pointer place-items-center rounded-full text-fg-muted hover:bg-surface-strong hover:text-fg"
            >
              {voiceOn ? <SpeakerHigh size={20} aria-hidden /> : <SpeakerSlash size={20} aria-hidden />}
            </button>
            {started && (
              <button
                type="button"
                onClick={() => reset(mode)}
                aria-label="Start over"
                className="grid size-11 cursor-pointer place-items-center rounded-full text-fg-muted hover:bg-surface-strong hover:text-fg"
              >
                <ArrowCounterClockwise size={20} aria-hidden />
              </button>
            )}
          </div>
        </div>

        {/* Transcript */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6" aria-live="polite">
          {!started ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <Orb status={status} />
              <h2 className="mt-8 font-display text-2xl">
                {checkride ? "Your mock checkride" : mode === "teach" ? "Ask your CFI anything" : `${ratingLabel} oral exam`}
              </h2>
              <p className="mt-2 max-w-sm text-fg-muted">
                {checkride
                  ? "The examiner has read your plan and documents. Expect questions on your weather, performance, weight and balance, airspace, and go/no-go decision."
                  : mode === "teach"
                  ? "Tap the mic and ask out loud, or type below. Try: “Explain the VFR weather minimums in Class E.”"
                  : "The examiner will ask scenario-based questions from the ACS, follow up on weak answers, and grade each one."}
              </p>
              {mode === "examine" && (
                <button type="button" onClick={() => void send(null, { history: [], state: EMPTY_STATE })} className={buttonClass("primary", "lg", "mt-6")}>
                  {checkride ? "Begin checkride" : "Begin oral exam"}
                </button>
              )}
            </div>
          ) : (
            turns.map((t, i) => (
              <div key={i} className={clsx("flex", t.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={clsx(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
                    t.role === "user" ? "rounded-br-md bg-lime text-on-accent" : "rounded-bl-md border border-border bg-inset text-fg",
                  )}
                >
                  {t.role === "assistant" && <p className="mb-1 text-xs uppercase tracking-[0.12em] text-green">{mode === "teach" ? "CFI" : "Examiner"}</p>}
                  {t.content}
                  {t.references?.length ? <p className="mt-2 text-xs text-fg-subtle">Ref: {t.references.join(" · ")}</p> : null}
                </div>
              </div>
            ))
          )}
          {interim && (
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md border border-dashed border-lime/50 px-4 py-3 text-[15px] italic text-fg-muted">{interim}…</p>
            </div>
          )}
          {status === "thinking" && (
            <p className="flex items-center gap-2 text-sm text-fg-subtle">
              <span className="size-2 animate-pulse rounded-full bg-green" aria-hidden />
              {mode === "teach" ? "CFI is thinking…" : "Examiner is evaluating…"}
            </p>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-border p-4">
          {micError && (
            <p role="alert" className="mb-3 text-sm text-danger">
              {micError}
            </p>
          )}
          <form onSubmit={submitDraft} className="flex items-center gap-2">
            {micSupported ? (
              <button
                type="button"
                onClick={status === "listening" ? stopListening : startListening}
                disabled={status === "thinking" || (mode === "examine" && !started)}
                aria-label={status === "listening" ? "Stop listening" : "Speak"}
                aria-pressed={status === "listening"}
                className={clsx(
                  "grid size-12 shrink-0 cursor-pointer place-items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  status === "listening" ? "bg-danger text-bg" : "bg-lime text-on-accent hover:bg-white",
                )}
              >
                {status === "listening" ? <Stop size={20} weight="fill" aria-hidden /> : <Microphone size={20} weight="fill" aria-hidden />}
              </button>
            ) : (
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-border text-fg-subtle" title="Voice input isn't supported in this browser">
                <MicrophoneSlash size={20} aria-label="Voice input unavailable" />
              </span>
            )}
            <label htmlFor="composer" className="sr-only">
              Type your message
            </label>
            <input
              id="composer"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={mode === "examine" && !started}
              placeholder={mode === "examine" && !started ? "Begin the exam to answer" : status === "listening" ? "Listening…" : "Or type your answer…"}
              className="h-12 min-w-0 flex-1 rounded-full border border-border-strong bg-inset px-5 text-base text-fg placeholder:text-fg-subtle focus:border-green focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!draft.trim() || status === "thinking"}
              aria-label="Send"
              className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full border border-border-strong text-fg transition-colors hover:bg-surface-strong disabled:cursor-not-allowed disabled:opacity-40"
            >
              <PaperPlaneRight size={20} aria-hidden />
            </button>
          </form>
        </div>
      </section>

      {/* Side panel */}
      <aside className="space-y-4">
        <div className="card flex flex-col items-center p-6 text-center">
          <Orb status={status} small />
          <p className="mt-4 text-sm text-fg-muted" aria-live="polite">
            {{ idle: "Ready", listening: "Listening…", thinking: "Thinking…", speaking: "Speaking…" }[status]}
          </p>
        </div>

        <VoicePicker
          provider={voiceInfo === undefined ? undefined : provider}
          selected={selectedVoices}
          onChange={setVoicePref}
          onBeforePreview={stopSpeech}
        />

        {mode === "examine" && (
          <div className="card p-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-lg">Session score</h2>
              <span className="font-display text-3xl text-accent">
                {avg ?? "—"}
                {avg !== null && <span className="text-base text-fg-muted">%</span>}
              </span>
            </div>
            <p className="mt-1 text-sm text-fg-subtle">
              {grades.length} question{grades.length === 1 ? "" : "s"} graded
            </p>
            <button
              type="button"
              disabled={!grades.length}
              onClick={() => setShowDebrief((v) => !v)}
              aria-expanded={showDebrief}
              className={buttonClass("glass", "md", "mt-4 w-full")}
            >
              {showDebrief ? "Hide debrief" : "View debrief"}
            </button>
            {showDebrief && (
              <ol className="mt-5 space-y-4">
                {grades.map((g, i) => (
                  <li key={i} className="border-t border-border pt-4">
                    <p className="text-sm text-fg">{g.prompt}</p>
                    <p className="mt-1 text-xs text-fg-subtle">{Math.round(g.score * 100)}% of key points</p>
                    <ul className="mt-2 space-y-1">
                      {g.hits.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[13px] text-fg-muted">
                          <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-green" aria-label="Covered" />
                          {h}
                        </li>
                      ))}
                      {g.misses.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[13px] text-fg-subtle">
                          <Circle size={14} className="mt-0.5 shrink-0" aria-label="Missed" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}

        <div className="card p-6 text-sm text-fg-muted">
          <p className="font-display text-base text-fg">{mode === "teach" ? "Teach mode" : "Examine mode"}</p>
          <p className="mt-2">
            {mode === "teach"
              ? "Friendly and patient. Ask follow-ups, request examples, or say “quiz me” when you're ready."
              : "Strict and by the book. Answer like it's checkride day; the examiner grades every answer against ACS key points."}
          </p>
          {engine === "mock" && <p className="mt-4 text-xs text-fg-subtle">Preview: responses come from a sample engine until the AI model is connected.</p>}
        </div>
      </aside>
    </div>
  );
}

function Orb({ status, small }: { status: Status; small?: boolean }) {
  const size = small ? "size-24" : "size-36";
  return (
    <div className={clsx("relative grid place-items-center", size)} aria-hidden>
      <span
        className={clsx(
          "absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--lime),var(--green)_45%,#1d3a1b_80%)] transition-transform duration-500",
          status === "listening" && "scale-110",
          status === "speaking" && "animate-[orb_1.2s_ease-in-out_infinite]",
          status === "thinking" && "animate-pulse",
        )}
      />
      <span className={clsx("absolute -inset-3 rounded-full border border-green/30", status === "listening" && "animate-ping")} />
      <span className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(255,255,255,0.7),transparent_60%)] opacity-60" />
    </div>
  );
}
