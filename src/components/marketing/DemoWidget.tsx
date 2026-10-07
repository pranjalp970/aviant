"use client";

import { ArrowRight, ArrowsClockwise, CheckCircle, Circle } from "@phosphor-icons/react";
import Link from "next/link";
import { useId, useState } from "react";
import { buttonClass } from "@/components/ui/button";
import type { AssistantResponse } from "@/lib/ai/types";

const DEMO_QUESTION_ID = "ppl-004";
const DEMO_PROMPT = "What documents are required to be on board the aircraft?";

export function DemoWidget() {
  const id = useId();
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssistantResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim()) {
      setError("Give the examiner an answer first. Even a partial one works.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          demo: true,
          mode: "examine",
          rating: "ppl",
          messages: [
            { role: "assistant", content: DEMO_PROMPT },
            { role: "user", content: answer },
          ],
          state: { askedIds: [DEMO_QUESTION_ID], currentQuestionId: DEMO_QUESTION_ID },
        }),
      });
      if (!res.ok) throw new Error();
      setResult(await res.json());
    } catch {
      setError("The examiner didn't respond. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const grade = result?.grade;
  const feedback = result?.reply.split(/Moving on\.|Next question\.|Let's shift gears\./)[0].trim();

  return (
    <div className="overflow-hidden rounded-2xl border border-border-strong bg-bg-elevated shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]">
      <div className="annot flex items-center justify-between gap-4 border-b border-border px-5 py-3 text-fg-subtle">
        <span>AI examiner · Private Pilot</span>
        <span className="text-accent">PA.I.B</span>
      </div>
      <div className="p-5 sm:p-8">
      <p className="font-display text-2xl leading-snug text-fg sm:text-[28px]">&ldquo;{DEMO_PROMPT}&rdquo;</p>

      {!result ? (
        <form onSubmit={submit} className="mt-6" noValidate>
          <label htmlFor={id} className="mb-2 block text-sm text-fg-muted">
            Your answer
          </label>
          <textarea
            id={id}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={3}
            placeholder="e.g. The airworthiness certificate, registration…"
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-err` : undefined}
            className="w-full resize-none rounded-xl border border-border-strong bg-inset px-4 py-3 text-base text-fg placeholder:text-fg-subtle focus:border-green focus:outline-none"
          />
          {error && (
            <p id={`${id}-err`} role="alert" className="mt-2 text-sm text-danger">
              {error}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button type="submit" disabled={loading} className={buttonClass("primary")}>
              {loading ? "Examiner is grading…" : "Submit to examiner"}
              {!loading && <ArrowRight size={16} weight="bold" aria-hidden />}
            </button>
            <span className="text-sm text-fg-subtle">Graded against the ACS key points</span>
          </div>
        </form>
      ) : (
        <div className="mt-6" aria-live="polite">
          <div className="flex items-baseline justify-between gap-4">
            <p className="annot text-fg-subtle">Debrief</p>
            {grade && (
              <p className="font-display text-3xl text-accent">
                {Math.round(grade.score * 100)}
                <span className="text-lg text-fg-muted">%</span>
              </p>
            )}
          </div>
          {grade && (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {[...grade.hits.map((h) => ({ h, ok: true })), ...grade.misses.map((h) => ({ h, ok: false }))].map(({ h, ok }) => (
                <li key={h} className="flex items-start gap-2 rounded-xl border border-border bg-inset px-3 py-2.5 text-[15px]">
                  {ok ? (
                    <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-green" aria-label="Covered" />
                  ) : (
                    <Circle size={18} className="mt-0.5 shrink-0 text-fg-subtle" aria-label="Missed" />
                  )}
                  <span className={ok ? "text-fg" : "text-fg-muted"}>{h}</span>
                </li>
              ))}
            </ul>
          )}
          {feedback && <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{feedback}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/signup" className={buttonClass("primary")}>
              Keep going in the full oral
              <ArrowRight size={16} weight="bold" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setAnswer("");
              }}
              className={buttonClass("ghost")}
            >
              <ArrowsClockwise size={16} aria-hidden />
              Try again
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
