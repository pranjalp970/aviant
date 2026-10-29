"use client";

import { ArrowLeft, ArrowRight, CheckCircle, Timer, XCircle } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FigureLink, FigurePane, preloadFigure } from "@/components/portal/FigureViewer";
import { buttonClass } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import type { McQuestion, RatingId } from "@/content/types";
import { saveQuizAttempt } from "@/lib/data/actions";
import { drawAttempt, readRecent, writeRecent } from "@/lib/quiz/draw";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

interface QuizRunnerProps {
  quizId: string;
  title: string;
  rating: RatingId;
  pool: McQuestion[];
  count: number;
  timeLimitMin?: number;
}

export function QuizRunner({ quizId, title, rating, pool, count, timeLimitMin }: QuizRunnerProps) {
  // null until the student starts — the random draw happens client-side on start
  const [questions, setQuestions] = useState<McQuestion[] | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [i, setI] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [left, setLeft] = useState<number | null>(null);

  const done = questions !== null && (submitted || left === 0);

  // Save each finished attempt once (manual submit or time running out).
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const savedRef = useRef(false);
  const startedAtRef = useRef(0);
  useEffect(() => {
    if (!done || savedRef.current || !questions) return;
    savedRef.current = true;
    const records = questions.map((q, k) => ({
      questionId: q.id,
      topic: q.topic,
      correct: answers[k] === q.answerIndex,
      chosen: answers[k] === null ? null : q.choices[answers[k]!],
    }));
    saveQuizAttempt({
      quizId,
      quizTitle: title,
      rating,
      score: records.filter((r) => r.correct).length,
      total: questions.length,
      durationSec: Math.round((Date.now() - startedAtRef.current) / 1000),
      answers: records,
    })
      .then((r) => setSaveStatus(r.ok ? "saved" : "error"))
      .catch(() => setSaveStatus("error"));
  }, [done, questions, answers, quizId, title, rating]);

  // Fetch the next question's figure while this one is being answered.
  useEffect(() => {
    preloadFigure(questions?.[i + 1]?.figure);
  }, [questions, i]);

  useEffect(() => {
    if (left === null || done) return;
    const t = setTimeout(() => setLeft((s) => (s === null ? s : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [left, done]);

  /** Draw a new random set (avoiding last attempt's questions where possible) and start. */
  function start() {
    const drawn = drawAttempt(pool, count, readRecent(quizId));
    writeRecent(quizId, drawn.map((q) => q.id));
    setQuestions(drawn);
    setAnswers(drawn.map(() => null));
    setI(0);
    setSubmitted(false);
    setLeft(timeLimitMin ? timeLimitMin * 60 : null);
    savedRef.current = false;
    startedAtRef.current = Date.now();
    setSaveStatus("idle");
  }

  if (questions === null) {
    return (
      <div className="card p-8 sm:p-10">
        <p className="font-display text-2xl">Ready when you are</p>
        <p className="mt-2 max-w-md text-fg-muted">
          {count} questions{timeLimitMin ? `, ${timeLimitMin} minutes` : ""}. Each attempt draws a new random set
          {pool.length > count ? ` from ${pool.length} questions` : ""}, and the answer order is shuffled.
        </p>
        <button type="button" onClick={start} disabled={!count} className={buttonClass("primary", "lg", "mt-6")}>
          Start quiz
        </button>
      </div>
    );
  }

  const q = questions[i];
  const answeredCount = answers.filter((a) => a !== null).length;
  const correct = answers.filter((a, k) => a === questions[k].answerIndex).length;
  const pct = Math.round((correct / questions.length) * 100);
  const restart = start;

  if (done) {
    const passed = pct >= 70;
    return (
      <div className="space-y-10">
        <section className="card flex flex-col gap-8 p-8 sm:flex-row sm:items-center sm:p-10" aria-labelledby="score">
          <ProgressRing value={pct / 100} size={136} stroke={10} label={`Score ${pct}%`}>
            <span className="font-display text-3xl">{pct}%</span>
          </ProgressRing>
          <div>
          <h2 id="score" className="font-display text-2xl">
            {passed ? "Nice work. That's a pass." : "Not quite there yet."}
          </h2>
          <p className="mt-2 text-fg-muted">
            {correct} of {questions.length} correct. The FAA knowledge test passing score is 70%.
          </p>
          <p className="mt-1 text-sm text-fg-subtle" aria-live="polite">
            {saveStatus === "saved" ? (
              <>
                Saved to your{" "}
                <Link href="/portal/history" className="text-accent">
                  history
                </Link>
                .
              </>
            ) : saveStatus === "error" ? (
              "Couldn't save this attempt. Your results are still shown below."
            ) : (
              "Saving your results…"
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={restart} className={buttonClass("primary")}>
              Retake with new questions
            </button>
            {correct < questions.length && quizId !== "review" && (
              <Link href="/portal/review?mode=quiz" className={buttonClass("glass")}>
                Review what I missed
              </Link>
            )}
            <Link href="/portal/quizzes" className={buttonClass("ghost")}>
              All quizzes
            </Link>
          </div>
          </div>
        </section>

        <section aria-labelledby="review">
          <h2 id="review" className="mb-4 font-display text-2xl">
            Review
          </h2>
          <ol className="space-y-3">
            {questions.map((qq, k) => {
              const a = answers[k];
              const ok = a === qq.answerIndex;
              return (
                <li key={qq.id} className="card p-5">
                  <div className="flex items-start gap-3">
                    {ok ? (
                      <CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-label="Correct" />
                    ) : (
                      <XCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-danger" aria-label="Incorrect" />
                    )}
                    <div>
                      <p className="text-fg">{qq.prompt}</p>
                      {qq.figure && <FigureLink figure={qq.figure} />}
                      {!ok && (
                        <p className="mt-2 text-sm text-fg-subtle">
                          Your answer: {a === null ? "No answer" : qq.choices[a]}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-accent">Correct: {qq.choices[qq.answerIndex]}</p>
                      <p className="mt-2 text-sm text-fg-muted">{qq.explanation}</p>
                      <p className="mt-2 text-xs text-fg-subtle">Reference: {qq.reference}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      {/* Progress header */}
      <div className="flex items-center justify-between gap-4 px-6 pb-4 pt-6 sm:px-8">
        <p className="text-sm text-fg-muted">
          <span className="sr-only">{title}: </span>Question {i + 1} of {questions.length}
        </p>
        {left !== null && (
          <p className={clsx("inline-flex items-center gap-1.5 font-display tabular-nums", left < 60 ? "text-warning" : "text-fg")} aria-label={`Time left ${fmt(left)}`}>
            <Timer size={16} aria-hidden />
            {fmt(left)}
          </p>
        )}
      </div>
      <div className="mx-6 h-1 overflow-hidden rounded-ui bg-surface-strong sm:mx-8" aria-hidden>
        <div className="h-full bg-green" style={{ width: `${((i + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="text-xl leading-snug text-fg">{q.prompt}</h2>
        {q.figure && (
          <div className="mt-5">
            <FigurePane key={q.id} figure={q.figure} eager />
          </div>
        )}
        <fieldset className="mt-6">
          <legend className="sr-only">Choose an answer</legend>
          <div className="grid gap-2">
            {q.choices.map((c, k) => {
              const selected = answers[i] === k;
              return (
                <label
                  key={k}
                  className={clsx(
          "flex min-h-13 cursor-pointer transition-colors hover:border-fg/35 items-center gap-3 rounded-ui border px-4 py-3 text-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-green",
                    selected ? "border-green bg-green/10 text-fg" : "border-border-strong text-fg-muted",
                  )}
                >
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={selected}
                    onChange={() => setAnswers((prev) => prev.map((v, j) => (j === i ? k : v)))}
                    className="sr-only"
                  />
                  <span className={clsx("grid size-7 shrink-0 place-items-center rounded-ui border text-xs", selected ? "border-green bg-green text-on-green" : "border-current")}>
                    {String.fromCharCode(65 + k)}
                  </span>
                  {c}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <button type="button" onClick={() => setI((v) => v - 1)} disabled={i === 0} className={buttonClass("ghost")}>
            <ArrowLeft size={16} aria-hidden />
            Previous
          </button>
          {i < questions.length - 1 ? (
            <button type="button" onClick={() => setI((v) => v + 1)} className={buttonClass("primary")}>
              Next
              <ArrowRight size={16} weight="bold" aria-hidden />
            </button>
          ) : (
            <button type="button" onClick={() => setSubmitted(true)} className={buttonClass("primary")}>
              Submit ({answeredCount}/{questions.length} answered)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
