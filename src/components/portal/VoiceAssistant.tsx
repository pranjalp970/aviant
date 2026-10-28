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
import { saveOralSession, saveVoicePreference } from "@/lib/data/actions";
import { takeSentences } from "@/lib/ai/partial-json";
import { isKnownVoice, type TtsProvider, type VoiceRole } from "@/lib/tts/voices";
import { SpeechQueue } from "@/lib/voice/speech-queue";
import { useVoiceSettings, type VoiceSettings } from "@/lib/voice/settings";
import type { RatingId } from "@/content/types";
import type { AssistantMode, AssistantResponse, ChatMessage, ExamState, Grade } from "@/lib/ai/types";

type Status = "idle" | "listening" | "thinking" | "speaking";
type Phase = "idle" | "thinking" | "replying";

interface Turn extends ChatMessage {
  references?: string[];
  streaming?: boolean;
}

type Done = AssistantResponse & { engine?: string; limitReached?: boolean };

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
const NO_SPEECH_TIMEOUT_MS = 9000; // close the mic if nothing is said at all

interface VoiceAssistantProps {
  rating: RatingId;
  ratingLabel: string;
  initialMode: AssistantMode;
  /** Voices saved on the student's profile. */
  savedVoices: Partial<Record<VoiceRole, string>>;
  /** Full mock checkride around the student's own plan: locks to Examine mode. */
  checkride?: { id: string; label: string };
  /** Opening message to send right away (e.g. "Teach me airspace…" from the study plan). */
  autoStart?: string;
}

export function VoiceAssistant({ rating, ratingLabel, initialMode, savedVoices, checkride, autoStart }: VoiceAssistantProps) {
  const [mode, setMode] = useState<AssistantMode>(checkride ? "examine" : initialMode);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [examState, setExamState] = useState<ExamState>(EMPTY_STATE);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [draft, setDraft] = useState("");
  const [interim, setInterim] = useState("");
  const [voiceOn, setVoiceOn] = useState(true);
  const [micError, setMicError] = useState<string | null>(null);
  const [handsFreePaused, setHandsFreePaused] = useState(false);
  const [showDebrief, setShowDebrief] = useState(false);
  const [engine, setEngine] = useState<string | null>(null); // "claude" | "mock", known after the first reply
  const [settings, updateSettings] = useVoiceSettings();

  const status: Status = listening ? "listening" : speaking ? "speaking" : phase !== "idle" ? "thinking" : "idle";

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

  // ── Voices ──
  const [voiceInfo, setVoiceInfo] = useState<{ provider: TtsProvider | null; defaults: Record<VoiceRole, string> | null } | undefined>();
  const [voicePrefs, setVoicePrefs] = useState(savedVoices);
  const setVoicePref = useCallback((role: VoiceRole, voiceId: string) => {
    setVoicePrefs((p) => ({ ...p, [role]: voiceId }));
    void saveVoicePreference(role, voiceId); // persists to the profile
  }, []);
  useEffect(() => {
    fetch("/api/tts")
      .then((r) => (r.ok ? r.json() : { provider: null, defaults: null }))
      .then(setVoiceInfo)
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

  // Live values for the speech queue and recognition callbacks (they outlive renders).
  const live = useRef({ mode, voiceOn, settings, selectedVoices });
  useEffect(() => {
    live.current = { mode, voiceOn, settings, selectedVoices };
  }, [mode, voiceOn, settings, selectedVoices]);

  // ── Speaking: sentence-by-sentence queue ──
  const queueRef = useRef<SpeechQueue | null>(null);
  const autoListenRef = useRef(false); // reopen the mic once this reply has been spoken (hands-free)
  const startListeningRef = useRef<(auto?: boolean) => void>(() => {});
  const queue = useCallback(() => {
    queueRef.current ??= new SpeechQueue({
      mode: () => live.current.mode,
      voiceId: () => live.current.selectedVoices?.[live.current.mode === "teach" ? "cfi" : "dpe"],
      rate: () => live.current.settings.rate,
      enabled: () => live.current.voiceOn,
      onSpeakingChange: setSpeaking,
      onDone: () => {
        if (autoListenRef.current && live.current.settings.handsFree) {
          autoListenRef.current = false;
          setTimeout(() => startListeningRef.current(true), 350);
        }
      },
    });
    return queueRef.current;
  }, []);

  useEffect(() => {
    queueRef.current?.setRate(settings.rate);
  }, [settings.rate]);

  // Each conversation is saved as one oral session, created on the first reply.
  const sessionIdRef = useRef<string | null>(null);
  const fetchCtrlRef = useRef<AbortController | null>(null);
  const interruptedRef = useRef(false);
  const turnIdRef = useRef(0); // only the newest turn may speak, finish the queue, or change status

  useEffect(() => {
    return () => {
      recRef.current?.stop();
      queueRef.current?.stop();
      fetchCtrlRef.current?.abort();
    };
  }, []);

  // ── Sending a turn (streams the reply in, speaking each sentence as it completes) ──
  const send = useCallback(
    async (text: string | null, opts?: { mode?: AssistantMode; state?: ExamState; history?: Turn[] }) => {
      const m = opts?.mode ?? mode;
      const history = (opts?.history ?? turnsRef.current).map(({ role, content, references }) => ({ role, content, references }));
      const withUser: Turn[] = text ? [...history, { role: "user", content: text }] : history;
      const idx = withUser.length; // this reply's slot, stable even if the student talks over it
      setTurns([...withUser, { role: "assistant", content: "", streaming: true }]);
      setPhase("thinking");
      setHandsFreePaused(false);
      const myTurn = ++turnIdRef.current;
      const current = () => myTurn === turnIdRef.current;
      interruptedRef.current = false;
      autoListenRef.current = true;
      const q = queue();
      q.begin();
      let spoken = 0;

      const showReply = (reply: string, final = false) => {
        setTurns((t) => t.map((turn, i) => (i === idx ? { ...turn, content: reply } : turn)));
        if (!current()) return; // an older reply still finishing in the background: text only
        setPhase((p) => (p === "thinking" ? "replying" : p));
        if (interruptedRef.current) return;
        const { sentences, next } = takeSentences(reply, spoken, final);
        spoken = next;
        sentences.forEach((s) => q.enqueue(s));
      };

      const ctrl = new AbortController();
      fetchCtrlRef.current = ctrl;
      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stream: true,
            mode: m,
            rating,
            checkrideId: checkride?.id,
            messages: withUser.map(({ role, content }) => ({ role, content })),
            state: opts?.state ?? examState,
          }),
          signal: ctrl.signal,
        });
        if (!res.ok || !res.body) throw new Error("request failed");

        let done: Done | null = null;
        if (res.headers.get("content-type")?.includes("application/json")) {
          done = (await res.json()) as Done; // e.g. daily limit reached
        } else {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buf = "";
          for (;;) {
            const { value, done: end } = await reader.read();
            if (end) break;
            buf += decoder.decode(value, { stream: true });
            let nl: number;
            while ((nl = buf.indexOf("\n")) >= 0) {
              const line = buf.slice(0, nl).trim();
              buf = buf.slice(nl + 1);
              if (!line) continue;
              const evt = JSON.parse(line) as { type: string; text?: string } & Done;
              if (evt.type === "reply" && evt.text) showReply(evt.text);
              else if (evt.type === "done") done = evt;
              else if (evt.type === "error") throw new Error("stream error");
            }
          }
        }
        if (!done) throw new Error("no reply");

        showReply(done.reply, true);
        if (current()) q.finish();
        setEngine(done.engine ?? null);
        const finalTurns: Turn[] = [...withUser, { role: "assistant", content: done.reply, references: done.references }];
        setTurns((t) => t.map((turn, i) => (i === idx ? finalTurns[idx] : turn)));
        const allGrades = done.grade ? [...gradesRef.current, done.grade] : gradesRef.current;
        setExamState(done.state);
        if (done.grade) setGrades(allGrades);
        if (done.limitReached && current()) autoListenRef.current = false;
        if (finalTurns.some((t) => t.role === "user")) {
          void saveOralSession({
            id: sessionIdRef.current,
            mode: m,
            rating,
            checkrideId: checkride?.id,
            transcript: finalTurns.map(({ role, content }) => ({ role, content })),
            grades: allGrades,
            newGrade: !!done.grade,
          }).then((r) => {
            sessionIdRef.current = r.id;
          });
        }
      } catch {
        if (ctrl.signal.aborted) return; // conversation was reset
        if (current()) {
          autoListenRef.current = false;
          q.finish();
        }
        setTurns((t) => t.map((turn, i) => (i === idx ? { role: "assistant", content: "I lost the connection for a second. Say that again?" } : turn)));
      } finally {
        if (!ctrl.signal.aborted && current()) setPhase("idle");
      }
    },
    [mode, rating, examState, checkride, queue],
  );

  function reset(nextMode: AssistantMode) {
    recRef.current?.stop();
    queueRef.current?.stop();
    fetchCtrlRef.current?.abort();
    turnIdRef.current++;
    autoListenRef.current = false;
    setMode(nextMode);
    sessionIdRef.current = null; // next conversation is a new session
    setTurns([]);
    setExamState(EMPTY_STATE);
    setGrades([]);
    setShowDebrief(false);
    setPhase("idle");
    setInterim("");
    setHandsFreePaused(false);
  }

  // ── Listening: waits through short thinking pauses, interrupts the examiner ──
  const sendRef = useRef(send);
  useEffect(() => {
    sendRef.current = send;
  }, [send]);

  // Study-plan deep link: start the lesson immediately, once.
  const autoStartedRef = useRef(false);
  useEffect(() => {
    if (!autoStart || autoStartedRef.current) return;
    autoStartedRef.current = true;
    void sendRef.current(autoStart);
  }, [autoStart]);

  const startListening = useCallback((auto = false) => {
    if (recRef.current) return;
    setMicError(null);
    const w = window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;

    // Talking over the examiner cuts it off; the rest of its reply still appears as text.
    interruptedRef.current = true;
    autoListenRef.current = false;
    queueRef.current?.stop();
    setHandsFreePaused(false);

    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = true; // we decide when the answer is over, not the browser
    finalRef.current = "";
    let heard = false;
    let silence: ReturnType<typeof setTimeout> | undefined;
    const noSpeech = setTimeout(() => rec.stop(), NO_SPEECH_TIMEOUT_MS);

    rec.onresult = (e) => {
      heard = true;
      clearTimeout(noSpeech);
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalRef.current += r[0].transcript;
        else interimText += r[0].transcript;
      }
      setInterim(finalRef.current + interimText);
      clearTimeout(silence);
      silence = setTimeout(() => rec.stop(), live.current.settings.pauseMs);
    };
    rec.onerror = (e) => {
      if (e.error === "no-speech" || e.error === "aborted") return;
      setMicError(e.error === "not-allowed" ? "Microphone access was blocked. Allow it in your browser, or type your answer below." : "I couldn't hear that. Try again or type below.");
    };
    rec.onend = () => {
      clearTimeout(silence);
      clearTimeout(noSpeech);
      recRef.current = null;
      setListening(false);
      const said = (finalRef.current || "").trim();
      setInterim("");
      if (said) void sendRef.current(said);
      else if (auto && !heard) setHandsFreePaused(true); // nobody answered: don't leave the mic open forever
    };
    recRef.current = rec;
    setListening(true);
    try {
      rec.start();
    } catch {
      recRef.current = null;
      setListening(false);
    }
  }, []);
  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  const stopListening = useCallback(() => recRef.current?.stop(), []);

  // Space bar = push to talk / send (when not typing).
  const awaitingFirstWords = phase === "thinking";
  const examNotStarted = mode === "examine" && turns.length === 0;
  useEffect(() => {
    if (!micSupported) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(t.tagName))) return;
      if (examNotStarted || awaitingFirstWords) return;
      e.preventDefault();
      if (recRef.current) stopListening();
      else startListening();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [micSupported, examNotStarted, awaitingFirstWords, startListening, stopListening]);

  function submitDraft(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || awaitingFirstWords) return;
    setDraft("");
    setMicError(null);
    interruptedRef.current = true;
    queueRef.current?.stop();
    void send(text);
  }

  const started = turns.length > 0;
  const avg = grades.length ? Math.round((grades.reduce((n, g) => n + g.score, 0) / grades.length) * 100) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      {/* Conversation column */}
      <section aria-label="Conversation" className="card flex min-h-[560px] flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          {checkride ? (
            <span className="inline-flex h-11 items-center gap-2 rounded-full border border-green/40 bg-green/10 px-4 text-sm text-accent">
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
                    "h-10 cursor-pointer rounded-full px-4 text-sm",
                    mode === o.v ? "bg-green font-medium text-on-accent" : "text-fg-muted",
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
                if (voiceOn) queueRef.current?.stop();
                setVoiceOn((v) => !v);
              }}
              aria-pressed={voiceOn}
              aria-label={voiceOn ? "Mute assistant voice" : "Unmute assistant voice"}
              className="grid size-11 cursor-pointer place-items-center rounded-full text-fg-muted"
            >
              {voiceOn ? <SpeakerHigh size={20} aria-hidden /> : <SpeakerSlash size={20} aria-hidden />}
            </button>
            {started && (
              <button
                type="button"
                onClick={() => reset(mode)}
                aria-label="Start over"
                className="grid size-11 cursor-pointer place-items-center rounded-full text-fg-muted"
              >
                <ArrowCounterClockwise size={20} aria-hidden />
              </button>
            )}
          </div>
        </div>

        {/* Transcript */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6" aria-live="polite">
          {!started ? (
            <div className="flex h-full flex-col justify-end px-1 py-10 sm:px-3">
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
            turns.map((t, i) =>
              t.role === "assistant" && t.streaming && !t.content ? null : (
                <div key={i} className={clsx("flex", t.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    aria-busy={t.streaming || undefined}
                    className={clsx(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                      t.role === "user" ? "rounded-br-md bg-green text-on-accent" : "rounded-bl-md bg-surface-strong text-fg",
                    )}
                  >
                    {t.role === "assistant" && <p className="mb-1 annot text-accent">{mode === "teach" ? "CFI" : "Examiner"}</p>}
                    {t.content}
                    {t.streaming && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-green" aria-hidden />}
                    {t.references?.length ? <p className="mt-2 text-xs text-fg-subtle">Ref: {t.references.join(" · ")}</p> : null}
                  </div>
                </div>
              ),
            )
          )}
          {interim && (
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md border border-dashed border-green/50 px-4 py-3 text-sm italic text-fg-muted">{interim}…</p>
            </div>
          )}
          {phase === "thinking" && (
            <p className="flex items-center gap-2 text-sm text-fg-subtle">
              {mode === "teach" ? "CFI is thinking…" : "Examiner is evaluating…"}
            </p>
          )}
        </div>

        {/* Composer */}
        <div className="p-4">
          {micError && (
            <p role="alert" className="mb-3 text-sm text-danger">
              {micError}
            </p>
          )}
          {handsFreePaused && (
            <p className="mb-3 text-sm text-fg-muted" role="status">
              Hands-free paused because I didn&rsquo;t hear anything. Tap the mic or press Space when you&rsquo;re ready.
            </p>
          )}
          <form onSubmit={submitDraft} className="flex items-center gap-2">
            {micSupported ? (
              <button
                type="button"
                onClick={() => (listening ? stopListening() : startListening())}
                disabled={awaitingFirstWords || examNotStarted}
                aria-label={listening ? "Done talking, send" : speaking ? "Interrupt and speak" : "Speak"}
                aria-pressed={listening}
                className={clsx(
                  "grid size-12 shrink-0 cursor-pointer place-items-center rounded-full disabled:cursor-not-allowed disabled:opacity-40",
                  listening ? "bg-danger text-bg" : "bg-green text-on-accent",
                )}
              >
                {listening ? <Stop size={20} weight="fill" aria-hidden /> : <Microphone size={20} weight="fill" aria-hidden />}
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
              disabled={examNotStarted}
              placeholder={examNotStarted ? "Begin the exam to answer" : listening ? "Listening… pause to send" : "Or type your answer…"}
              className="h-12 min-w-0 flex-1 rounded-full border border-border-strong bg-inset px-5 text-base text-fg placeholder:text-fg-subtle focus:border-green focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!draft.trim() || awaitingFirstWords}
              aria-label="Send"
              className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full border border-border-strong text-fg disabled:cursor-not-allowed disabled:opacity-40"
            >
              <PaperPlaneRight size={20} aria-hidden />
            </button>
          </form>
          {micSupported && (
            <p className="mt-2 hidden text-xs text-fg-subtle sm:block">
              Press <kbd className="rounded border border-border-strong px-1.5 py-0.5 font-sans">Space</kbd> to talk. Tap the mic while the{" "}
              {mode === "teach" ? "CFI" : "examiner"} is speaking to interrupt.
            </p>
          )}
        </div>
      </section>

      {/* Side panel */}
      <aside className="space-y-4">
        <div className="card flex flex-col items-center p-6">
          <Orb status={status} small />
          <p className="mt-4 text-sm text-fg-muted" aria-live="polite">
            {{ idle: settings.handsFree && started ? "Ready (hands-free)" : "Ready", listening: "Listening…", thinking: "Thinking…", speaking: "Speaking…" }[status]}
          </p>
        </div>

        <ConversationSettings settings={settings} update={updateSettings} micSupported={micSupported} />

        <VoicePicker
          provider={voiceInfo === undefined ? undefined : provider}
          selected={selectedVoices}
          onChange={setVoicePref}
          onBeforePreview={() => queueRef.current?.stop()}
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
              <ol className="mt-6 space-y-6">
                {grades.map((g, i) => (
                  <li key={i}>
                    <p className="text-sm text-fg">{g.prompt}</p>
                    <p className="mt-1 text-xs text-fg-subtle">{Math.round(g.score * 100)}% of key points</p>
                    <ul className="mt-2 space-y-1">
                      {g.hits.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-fg-muted">
                          <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-label="Covered" />
                          {h}
                        </li>
                      ))}
                      {g.misses.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-fg-subtle">
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

const SPEEDS = [
  { v: 0.9, label: "0.9×" },
  { v: 1, label: "1×" },
  { v: 1.15, label: "1.15×" },
  { v: 1.3, label: "1.3×" },
];
const PAUSES = [
  { v: 1200, label: "Short" },
  { v: 2000, label: "Normal" },
  { v: 3500, label: "Long" },
];

function Segmented<T extends number>({ label, options, value, onChange }: { label: string; options: { v: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid rounded-xl border border-border-strong bg-inset p-1" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          role="radio"
          aria-checked={value === o.v}
          onClick={() => onChange(o.v)}
          className={clsx("h-9 cursor-pointer rounded-lg text-sm", value === o.v ? "bg-green font-medium text-on-accent" : "text-fg-muted")}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ConversationSettings({ settings, update, micSupported }: { settings: VoiceSettings; update: (p: Partial<VoiceSettings>) => void; micSupported: boolean }) {
  return (
    <div className="card space-y-5 p-6">
      <h2 className="font-display text-lg">Conversation</h2>
      {micSupported && (
        <label className="flex cursor-pointer items-start justify-between gap-4">
          <span>
            <span className="block text-sm text-fg">Hands-free</span>
            <span className="block text-xs text-fg-subtle">The mic reopens after each reply, like a phone call.</span>
          </span>
          <input
            type="checkbox"
            role="switch"
            checked={settings.handsFree}
            onChange={(e) => update({ handsFree: e.target.checked })}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className="relative mt-0.5 h-6 w-11 shrink-0 rounded-full border border-border-strong bg-inset peer-checked:border-green peer-checked:bg-green peer-focus-visible:ring-2 peer-focus-visible:ring-green after:absolute after:left-0.5 after:top-0.5 after:size-[18px] after:rounded-full after:bg-fg-subtle after:transition-transform peer-checked:after:translate-x-5 peer-checked:after:bg-white"
          />
        </label>
      )}
      <div>
        <p className="mb-1.5 text-sm text-fg">Speaking speed</p>
        <Segmented label="Speaking speed" options={SPEEDS} value={settings.rate} onChange={(rate) => update({ rate })} />
      </div>
      {micSupported && (
        <div>
          <p className="text-sm text-fg">Wait before sending</p>
          <p className="mb-1.5 text-xs text-fg-subtle">How long a pause ends your answer. Longer gives you time to think.</p>
          <Segmented label="Wait before sending" options={PAUSES} value={settings.pauseMs} onChange={(pauseMs) => update({ pauseMs })} />
        </div>
      )}
      <p className="text-xs text-fg-subtle">Saved on this device.</p>
    </div>
  );
}

function Orb({ status, small }: { status: Status; small?: boolean }) {
  const size = small ? "size-24" : "size-36";
  return (
    <div className={clsx("relative grid place-items-center", size)} aria-hidden>
      <span
        className={clsx(
          "absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--orb-highlight),var(--green)_45%,#1d3a1b_80%)] transition-transform duration-500",
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
