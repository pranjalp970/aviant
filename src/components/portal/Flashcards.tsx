"use client";

import { ArrowCounterClockwise, Cards, Check, X } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { buttonClass } from "@/components/ui/button";
import { FigurePane } from "@/components/portal/FigureViewer";
import { EmptyState } from "@/components/ui/EmptyState";
import type { McQuestion } from "@/content/types";
import { recordFlashcard } from "@/lib/data/actions";

/** Flip-and-rate flashcards over the student's due questions. */
export function Flashcards({ cards }: { cards: McQuestion[] }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knew, setKnew] = useState(0);

  if (!cards.length) {
    return (
      <EmptyState icon={Cards} title="Nothing due right now" action={{ href: "/portal/quizzes", label: "Take a practice test" }} secondary={{ href: "/portal/review", label: "Back to review" }}>
        Cards come from questions you&rsquo;ve already answered. Missed ones return first; the rest come back on a schedule as they
        fall due.
      </EmptyState>
    );
  }

  if (i >= cards.length) {
    return (
      <div className="card p-10" role="status">
        <p className="font-display text-3xl">Deck complete</p>
        <p className="mt-2 text-fg-muted">
          You knew {knew} of {cards.length}. Cards you missed will come back soon; the ones you knew are scheduled further out.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/portal/review" className={buttonClass("primary")}>
            Back to review
          </Link>
          <button
            type="button"
            onClick={() => {
              setI(0);
              setKnew(0);
              setFlipped(false);
            }}
            className={buttonClass("glass")}
          >
            <ArrowCounterClockwise size={16} aria-hidden /> Go again
          </button>
        </div>
      </div>
    );
  }

  const q = cards[i];
  function rate(correct: boolean) {
    void recordFlashcard(q.id, correct);
    if (correct) setKnew((n) => n + 1);
    setFlipped(false);
    setI((n) => n + 1);
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-3 flex items-center justify-between text-sm text-fg-subtle">
        <span>
          Card {i + 1} of {cards.length}
        </span>
        <span>{q.reference}</span>
      </div>
      <div className="h-1 overflow-hidden rounded-ui bg-surface-strong" aria-hidden>
        <div className="h-full bg-green" style={{ width: `${(i / cards.length) * 100}%` }} />
      </div>

      <div className="card mt-6 flex min-h-[320px] flex-col p-7 sm:p-9">
        <p className="annot text-fg-subtle">Question</p>
        <p className="mt-3 text-xl leading-snug text-fg">{q.prompt}</p>
        {q.figure && (
          <div className="mt-5">
            <FigurePane key={q.id} figure={q.figure} eager />
          </div>
        )}

        {flipped ? (
          <div className="mt-8" aria-live="polite">
            <p className="annot text-fg-subtle">Answer</p>
            <p className="mt-2 font-display text-xl text-accent">{q.choices[q.answerIndex]}</p>
            <p className="mt-3 text-sm text-fg-muted">{q.explanation}</p>
          </div>
        ) : (
          <p className="mt-6 text-sm text-fg-subtle">Say or think your answer, then flip the card.</p>
        )}

        <div className="mt-auto pt-8">
          {flipped ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => rate(false)}
                className={clsx(buttonClass("glass", "lg"), "border-danger/40 text-fg")}
              >
                <X size={18} className="text-danger" aria-hidden /> I missed it
              </button>
              <button type="button" onClick={() => rate(true)} className={buttonClass("primary", "lg")}>
                <Check size={18} weight="bold" aria-hidden /> I knew it
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => setFlipped(true)} className={buttonClass("primary", "lg", "w-full")}>
              Show answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
