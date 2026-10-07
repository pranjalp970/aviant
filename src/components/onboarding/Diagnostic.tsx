"use client";

import { ArrowRight, Question } from "@phosphor-icons/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { buttonClass } from "@/components/ui/button";
import type { McQuestion } from "@/content/types";
import { saveQuizAttempt } from "@/lib/data/actions";

const UNSURE = -1;
const secondsSince = (start: number) => Math.round((Date.now() - start) / 1000);

/**
 * Placement check: one question at a time, no right/wrong feedback (it measures,
 * it doesn't teach), and an "I'm not sure" button so guesses don't inflate results.
 * Results are saved like a quiz, which also seeds the student's review deck.
 */
export function Diagnostic({ questions, onDone }: { questions: McQuestion[]; onDone: () => void }) {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const q = questions[i];

  async function choose(choice: number) {
    const next = [...answers, choice];
    setAnswers(next);
    if (i + 1 < questions.length) {
      setI(i + 1);
      return;
    }
    setSaving(true);
    const records = questions.map((qq, k) => ({
      questionId: qq.id,
      topic: qq.topic,
      correct: next[k] === qq.answerIndex,
      // "not sure" counts as missed, so the topic gets more time and the question comes back
      chosen: next[k] === UNSURE ? "I'm not sure" : qq.choices[next[k]],
    }));
    await saveQuizAttempt({
      quizId: "diagnostic",
      quizTitle: "Diagnostic",
      rating: "ppl",
      score: records.filter((r) => r.correct).length,
      total: questions.length,
      durationSec: secondsSince(startedAt.current),
      answers: records,
    }).catch(() => null);
    onDone();
  }

  if (saving) {
    return (
      <div className="py-16 text-center" role="status">
        <div className="mx-auto size-10 animate-spin rounded-full border-2 border-border-strong border-t-green" aria-hidden />
        <p className="mt-5 font-display text-xl">Building your plan…</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-fg-subtle">
        <span>
          Question {i + 1} of {questions.length}
        </span>
        <span>No feedback until the end. Just answer honestly.</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-surface-strong" aria-hidden>
        <div className="h-full bg-green transition-[width] duration-300" style={{ width: `${(i / questions.length) * 100}%` }} />
      </div>
      <h2 className="mt-8 text-xl leading-snug text-fg">{q.prompt}</h2>
      <div className="mt-6 grid gap-2">
        {q.choices.map((c, k) => (
          <button
            key={`${q.id}-${k}`}
            type="button"
            onClick={() => void choose(k)}
            className="flex min-h-13 cursor-pointer items-center gap-3 rounded-xl border border-border-strong bg-inset px-4 py-3 text-left text-[15px] text-fg transition-colors hover:border-green/60"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full border border-current text-xs text-fg-muted">{String.fromCharCode(65 + k)}</span>
            {c}
          </button>
        ))}
        <button
          type="button"
          onClick={() => void choose(UNSURE)}
          className={clsx("flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border-strong px-4 text-[15px] text-fg-muted transition-colors hover:text-fg")}
        >
          <Question size={18} aria-hidden /> I&rsquo;m not sure
        </button>
      </div>
      <p className="mt-6 flex items-center gap-1 text-xs text-fg-subtle">
        Guessing makes your plan less accurate. &ldquo;I&rsquo;m not sure&rdquo; is the better answer when you don&rsquo;t know. <ArrowRight size={12} aria-hidden />
      </p>
    </div>
  );
}

export function DiagnosticIntro({ count, onStart, onSkip, skipping }: { count: number; onStart: () => void; onSkip: () => void; skipping?: boolean }) {
  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-[0.14em] text-green">Almost done</p>
      <h2 className="mt-3 font-display text-3xl">A quick knowledge check</h2>
      <p className="mx-auto mt-3 max-w-md text-fg-muted">
        {count} questions, about 10 minutes, two from every topic. It shows what you already know, so your plan skips ahead where you&rsquo;re strong and slows down
        where you&rsquo;re not.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onStart} className={buttonClass("primary", "lg")}>
          Start the check
        </button>
        <button type="button" onClick={onSkip} disabled={skipping} className={buttonClass("ghost", "lg")}>
          {skipping ? "One moment…" : "Skip for now"}
        </button>
      </div>
      <p className="mt-4 text-xs text-fg-subtle">Skipping is fine: your plan starts from your confidence ratings and adapts as you study.</p>
    </div>
  );
}
