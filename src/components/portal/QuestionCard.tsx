"use client";

import { CaretDown, CheckCircle, XCircle } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";
import type { Question } from "@/content/types";

/** Practice card: answer an MC question or reveal the model answer for an oral one. */
export function QuestionCard({ q, index }: { q: Question; index: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const answered = q.kind === "mc" ? picked !== null : open;

  return (
    <article className="card p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full border border-border px-2.5 py-1 text-fg-subtle">#{index + 1}</span>
        <span className="rounded-full bg-green/12 px-2.5 py-1 text-green">{q.kind === "mc" ? "Multiple choice" : "Oral"}</span>
        {q.taskId && <span className="text-fg-subtle">Task {q.taskId.split("-").slice(1).join(".")}</span>}
      </div>
      <h3 className="text-lg leading-snug text-fg">{q.prompt}</h3>

      {q.kind === "mc" && (
        <fieldset className="mt-5">
          <legend className="sr-only">Choose an answer</legend>
          <div className="grid gap-2">
            {q.choices.map((c, i) => {
              const isAnswer = i === q.answerIndex;
              const isPicked = i === picked;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={picked !== null}
                  onClick={() => setPicked(i)}
                  aria-pressed={isPicked}
                  className={clsx(
                    "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-[15px] transition-colors disabled:cursor-default",
                    picked === null && "border-border-strong hover:border-green/50 hover:bg-surface-strong",
                    picked !== null && isAnswer && "border-green bg-green/10 text-fg",
                    picked !== null && isPicked && !isAnswer && "border-danger/60 bg-danger/10 text-fg",
                    picked !== null && !isAnswer && !isPicked && "border-border text-fg-subtle",
                  )}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full border border-current text-xs">{String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{c}</span>
                  {picked !== null && isAnswer && <CheckCircle size={20} weight="fill" className="text-green" aria-label="Correct answer" />}
                  {picked !== null && isPicked && !isAnswer && <XCircle size={20} weight="fill" className="text-danger" aria-label="Your answer, incorrect" />}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {q.kind === "oral" && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border-strong px-4 text-[15px] text-fg-muted hover:text-fg"
        >
          {open ? "Hide model answer" : "Reveal model answer"}
          <CaretDown size={14} className={clsx("transition-transform", open && "rotate-180")} aria-hidden />
        </button>
      )}

      {answered && (
        <div className="mt-5 rounded-2xl border border-border bg-inset p-5" aria-live="polite">
          {q.kind === "mc" && (
            <p className={clsx("mb-2 font-medium", picked === q.answerIndex ? "text-green" : "text-danger")}>
              {picked === q.answerIndex ? "Correct" : "Not quite"}
            </p>
          )}
          {q.kind === "oral" && (
            <ul className="mb-3 flex flex-wrap gap-2">
              {q.keyPoints.map((k) => (
                <li key={k.label} className="rounded-full bg-green/10 px-3 py-1 text-[13px] text-accent">
                  {k.label}
                </li>
              ))}
            </ul>
          )}
          <p className="text-[15px] leading-relaxed text-fg-muted">{q.explanation}</p>
          <p className="mt-3 text-xs text-fg-subtle">Reference: {q.reference}</p>
        </div>
      )}
    </article>
  );
}
