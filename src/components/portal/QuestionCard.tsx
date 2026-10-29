"use client";

import { CaretDown, CheckCircle, XCircle } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";
import { FigurePane } from "@/components/portal/FigureViewer";
import type { Question } from "@/content/types";

/** Practice card: answer an MC question or reveal the model answer for an oral one. */
export function QuestionCard({ q, index }: { q: Question; index: number }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const answered = q.kind === "mc" ? picked !== null : open;

  return (
    <article className="card p-6">
      <p className="annot mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-fg-subtle">
        <span>#{index + 1}</span>
        <span className="text-fg-muted">{q.kind === "mc" ? "Multiple choice" : "Oral"}</span>
        {q.taskId && <span>Task {q.taskId.split("-").slice(1).join(".")}</span>}
        {q.figure && <span>{q.figure.label}</span>}
      </p>
      <h3 className="text-lg leading-snug text-fg">{q.prompt}</h3>
      {q.figure && (
        <div className="mt-4">
          <FigurePane figure={q.figure} />
        </div>
      )}

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
                    "flex min-h-12 cursor-pointer items-center gap-3 rounded-ui border px-4 py-2.5 text-left text-sm transition-colors disabled:cursor-default",
                    picked === null && "border-border-strong hover:border-fg/35 hover:bg-surface-strong",
                    picked !== null && isAnswer && "border-green bg-green/10 text-fg",
                    picked !== null && isPicked && !isAnswer && "border-danger/60 bg-danger/10 text-fg",
                    picked !== null && !isAnswer && !isPicked && "border-border text-fg-subtle",
                  )}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-ui border border-current text-xs">{String.fromCharCode(65 + i)}</span>
                  <span className="flex-1">{c}</span>
                  {picked !== null && isAnswer && <CheckCircle size={20} weight="fill" className="text-accent" aria-label="Correct answer" />}
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
          className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-ui border border-border-strong px-4 text-sm text-fg-muted transition-colors hover:border-fg/35 hover:text-fg"
        >
          {open ? "Hide model answer" : "Reveal model answer"}
          <CaretDown size={14} className={clsx("transition-transform", open && "rotate-180")} aria-hidden />
        </button>
      )}

      {answered && (
        <div className="mt-5 rounded-ui border border-border bg-inset p-5" aria-live="polite">
          {q.kind === "mc" && (
            <p className={clsx("mb-2 font-medium", picked === q.answerIndex ? "text-accent" : "text-danger")}>
              {picked === q.answerIndex ? "Correct" : "Not quite"}
            </p>
          )}
          {q.kind === "oral" && (
            <ul className="mb-3 flex flex-wrap gap-2">
              {q.keyPoints.map((k) => (
                <li key={k.label} className="rounded-ui border border-border-strong px-3 py-1 text-xs text-fg-muted">
                  {k.label}
                </li>
              ))}
            </ul>
          )}
          <p className="text-sm leading-relaxed text-fg-muted">{q.explanation}</p>
          <p className="mt-3 text-xs text-fg-subtle">Reference: {q.reference}</p>
        </div>
      )}
    </article>
  );
}
