"use client";

import { ArrowLeft, ArrowRight, CalendarBlank, CheckCircle, Target, Warning } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { buttonClass } from "@/components/ui/button";
import type { McQuestion } from "@/content/types";
import type { Confidence } from "@/lib/auth/session";
import { parseAcsCodes, planSummary, saveOnboarding, type PlanSummary } from "@/lib/plan/actions";
import { Diagnostic, DiagnosticIntro } from "./Diagnostic";

type Stage = "starting" | "training" | "passed";
type Step = "stage" | "dates" | "time" | "confidence" | "diagnostic-intro" | "diagnostic" | "summary";
const STEPS: Step[] = ["stage", "dates", "time", "confidence", "diagnostic-intro", "summary"];

export interface WizardDefaults {
  name: string;
  writtenStatus: "not_taken" | "passed";
  writtenDate: string | null;
  writtenScore: number | null;
  missedAcsCodes: string[];
  checkrideDate: string | null;
  studyDaysPerWeek: number;
  studyMinutesPerDay: number;
  topicConfidence: Record<string, Confidence>;
}

const MINUTES = [15, 30, 45, 60, 90];
const CONF_LABELS: Record<Confidence, string> = { 1: "New to me", 2: "Somewhat", 3: "Confident" };

function Choice({ selected, onClick, title, detail }: { selected: boolean; onClick: () => void; title: string; detail?: string }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={clsx(
        "w-full cursor-pointer rounded-2xl border px-5 py-4 text-left",
        selected ? "border-green bg-green/10" : "border-border-strong bg-inset",
      )}
    >
      <span className="block text-base text-fg">{title}</span>
      {detail && <span className="mt-0.5 block text-sm text-fg-muted">{detail}</span>}
    </button>
  );
}

const fmtDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" });

export function OnboardingWizard({ defaults, topics, diagnostic, startAt }: { defaults: WizardDefaults; topics: { id: string; title: string }[]; diagnostic: McQuestion[]; startAt?: Step }) {
  const [step, setStep] = useState<Step>(startAt ?? "stage");
  const [stage, setStage] = useState<Stage>(defaults.writtenStatus === "passed" ? "passed" : "training");
  const [writtenDate, setWrittenDate] = useState(defaults.writtenDate ?? "");
  const [writtenScore, setWrittenScore] = useState(defaults.writtenScore?.toString() ?? "");
  const [codes, setCodes] = useState(defaults.missedAcsCodes.join(", "));
  const [checkrideDate, setCheckrideDate] = useState(defaults.checkrideDate ?? "");
  const [days, setDays] = useState(defaults.studyDaysPerWeek);
  const [minutes, setMinutes] = useState(defaults.studyMinutesPerDay);
  const [confidence, setConfidence] = useState<Record<string, Confidence>>(() => Object.fromEntries(topics.map((t) => [t.id, defaults.topicConfidence[t.id] ?? 2])));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState<PlanSummary | null>(null);

  const passed = stage === "passed";
  const index = Math.max(0, STEPS.indexOf(step === "diagnostic" ? "diagnostic-intro" : step));
  const today = new Date().toISOString().slice(0, 10);

  async function save() {
    setBusy(true);
    setError(null);
    const res = await saveOnboarding({
      writtenStatus: passed ? "passed" : "not_taken",
      writtenDate: passed ? null : writtenDate || null,
      writtenScore: passed && writtenScore ? Number(writtenScore) : null,
      missedAcsCodes: passed ? await parseAcsCodes(codes) : [],
      checkrideDate: checkrideDate || null,
      studyDaysPerWeek: days,
      studyMinutesPerDay: minutes,
      topicConfidence: confidence,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      return false;
    }
    return true;
  }

  async function finish() {
    setBusy(true);
    setSummary(await planSummary());
    setBusy(false);
    setStep("summary");
  }

  const next = async () => {
    setError(null);
    if (step === "stage") setStep("dates");
    else if (step === "dates") {
      if (writtenDate && writtenDate < today && !passed) return setError("That date is in the past. Pick an upcoming date, or leave it blank.");
      setStep("time");
    } else if (step === "time") setStep("confidence");
    else if (step === "confidence") {
      if (await save()) setStep("diagnostic-intro");
    }
  };
  const back = () => {
    setError(null);
    const order: Step[] = ["stage", "dates", "time", "confidence", "diagnostic-intro"];
    const i = order.indexOf(step);
    if (i > 0) setStep(order[i - 1]);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress */}
      {step !== "summary" && (
        <div className="mb-10 flex gap-1.5" aria-label={`Step ${index + 1} of ${STEPS.length}`}>
          {STEPS.map((s, i) => (
            <span key={s} className={clsx("h-1.5 flex-1 rounded-full", i <= index ? "bg-green" : "bg-surface-strong")} />
          ))}
        </div>
      )}

      {step === "stage" && (
        <section>
          <h1 className="font-display text-2xl sm:text-3xl leading-tight">Hi {defaults.name.split(" ")[0]}! Let&rsquo;s build your plan.</h1>
          <p className="mt-2 text-fg-muted">Five quick questions and an optional 10-minute check. Where are you in your training?</p>
          <div role="radiogroup" className="mt-8 grid gap-3">
            <Choice selected={stage === "starting"} onClick={() => setStage("starting")} title="Just getting started" detail="Few or no lessons yet. I want to learn the material from the ground up." />
            <Choice selected={stage === "training"} onClick={() => setStage("training")} title="In training, haven't taken the written" detail="I'm flying and want to pass the knowledge test." />
            <Choice selected={stage === "passed"} onClick={() => setStage("passed")} title="Passed the written, preparing for my checkride" detail="I want to get ready for the oral exam." />
          </div>
        </section>
      )}

      {step === "dates" && (
        <section>
          <h1 className="font-display text-2xl sm:text-3xl leading-tight">{passed ? "When's your checkride?" : "When's your written test?"}</h1>
          <p className="mt-2 text-fg-muted">Your plan works back from these dates. Not scheduled yet? Leave it blank and we&rsquo;ll suggest one from your pace.</p>
          <div className="mt-8 space-y-5">
            {!passed && (
              <DateField label="Written (knowledge) test date" value={writtenDate} onChange={setWrittenDate} min={today} />
            )}
            {passed && (
              <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-fg-muted">Your written score (%)</span>
                  <input
                    type="number"
                    min={70}
                    max={100}
                    inputMode="numeric"
                    value={writtenScore}
                    onChange={(e) => setWrittenScore(e.target.value)}
                    className="h-12 w-full rounded-xl border border-border-strong bg-inset px-4 text-base text-fg focus:border-green focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-fg-muted">Missed ACS codes from your test report (optional)</span>
                  <input
                    value={codes}
                    onChange={(e) => setCodes(e.target.value)}
                    placeholder="e.g. PA.I.E.K1, PA.IX.A.K3"
                    className="h-12 w-full rounded-xl border border-border-strong bg-inset px-4 text-base text-fg placeholder:text-fg-subtle focus:border-green focus:outline-none"
                  />
                  <span className="mt-1.5 block text-xs text-fg-subtle">Examiners probe these on the oral, so your plan and mock orals will too.</span>
                </label>
              </div>
            )}
            <DateField label={passed ? "Checkride date" : "Checkride date (optional)"} value={checkrideDate} onChange={setCheckrideDate} min={writtenDate || today} />
          </div>
        </section>
      )}

      {step === "time" && (
        <section>
          <h1 className="font-display text-2xl sm:text-3xl leading-tight">How much time can you study?</h1>
          <p className="mt-2 text-fg-muted">Be realistic: a plan you keep beats an ambitious one you don&rsquo;t. You can change this anytime.</p>
          <fieldset className="mt-8">
            <legend className="mb-3 text-sm text-fg-muted">Days per week</legend>
            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={days === d}
                  onClick={() => setDays(d)}
                  className={clsx("h-12 cursor-pointer rounded-xl border text-lg", days === d ? "border-green bg-green/10 text-fg" : "border-border-strong bg-inset text-fg-muted")}
                >
                  {d}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-8">
            <legend className="mb-3 text-sm text-fg-muted">Minutes per study day</legend>
            <div className="grid grid-cols-5 gap-2">
              {MINUTES.map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={minutes === m}
                  onClick={() => setMinutes(m)}
                  className={clsx("h-12 cursor-pointer rounded-xl border", minutes === m ? "border-green bg-green/10 text-fg" : "border-border-strong bg-inset text-fg-muted")}
                >
                  {m} min
                </button>
              ))}
            </div>
          </fieldset>
          <p className="mt-6 text-sm text-fg-subtle">
            That&rsquo;s about <span className="text-fg">{Math.round((days * minutes) / 60 * 10) / 10} hours a week</span>.
          </p>
        </section>
      )}

      {step === "confidence" && (
        <section>
          <h1 className="font-display text-2xl sm:text-3xl leading-tight">How do you feel about each topic?</h1>
          <p className="mt-2 text-fg-muted">A gut check is fine. Confident topics get a quicker pass; new ones get more time.</p>
          <ul className="mt-8 rounded-2xl border border-border">
            {topics.map((t) => (
              <li key={t.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-fg">{t.title}</span>
                <div role="radiogroup" aria-label={t.title} className="grid grid-cols-3 gap-1 rounded-xl border border-border-strong bg-inset p-1 sm:w-[300px]">
                  {([1, 2, 3] as Confidence[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={confidence[t.id] === c}
                      onClick={() => setConfidence((prev) => ({ ...prev, [t.id]: c }))}
                      className={clsx("h-9 cursor-pointer rounded-lg text-sm", confidence[t.id] === c ? "bg-green font-medium text-on-accent" : "text-fg-muted")}
                    >
                      {CONF_LABELS[c]}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === "diagnostic-intro" && <DiagnosticIntro count={diagnostic.length} onStart={() => setStep("diagnostic")} onSkip={() => void finish()} skipping={busy} />}
      {step === "diagnostic" && <Diagnostic questions={diagnostic} onDone={() => void finish()} />}
      {step === "summary" && <Summary summary={summary} />}

      {error && (
        <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-fg">
          <Warning size={18} className="mt-0.5 shrink-0 text-danger" aria-hidden /> {error}
        </p>
      )}

      {["stage", "dates", "time", "confidence"].includes(step) && (
        <div className="mt-10 flex items-center justify-between">
          {step !== "stage" ? (
            <button type="button" onClick={back} className={buttonClass("ghost")}>
              <ArrowLeft size={16} aria-hidden /> Back
            </button>
          ) : (
            <span />
          )}
          <button type="button" onClick={() => void next()} disabled={busy} className={buttonClass("primary", "lg")}>
            {busy ? "Saving…" : "Continue"} <ArrowRight size={16} weight="bold" aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

function DateField({ label, value, onChange, min }: { label: string; value: string; onChange: (v: string) => void; min: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-fg-muted">{label}</span>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="date"
          value={value}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 rounded-xl border border-border-strong bg-inset px-4 text-base text-fg focus:border-green focus:outline-none"
        />
        {value ? (
          <button type="button" onClick={() => onChange("")} className="text-sm text-fg-muted">
            Not scheduled yet
          </button>
        ) : (
          <span className="text-sm text-fg-subtle">Not scheduled yet</span>
        )}
      </div>
    </label>
  );
}

function Summary({ summary }: { summary: PlanSummary | null }) {
  if (!summary) {
    return (
      <div>
        <h1 className="font-display text-3xl">You&rsquo;re all set</h1>
        <Link href="/portal" className={buttonClass("primary", "lg", "mt-8")}>
          Go to my dashboard <ArrowRight size={16} weight="bold" aria-hidden />
        </Link>
      </div>
    );
  }
  const statusTone = summary.status === "behind" || summary.status === "overdue" ? "text-warning" : "text-accent";
  return (
    <section>
      <CheckCircle size={44} weight="fill" className="text-accent" aria-hidden />
      <h1 className="mt-4 font-display text-2xl sm:text-3xl leading-tight">Your plan is ready</h1>
      <p className="mt-3 max-w-lg text-fg-muted">
        {summary.phase === "written" ? "Written test" : "Checkride"} {summary.dateSuggested ? "target" : "on"}{" "}
        <span className="text-fg">{fmtDate(summary.targetDate)}</span>
        {summary.dateSuggested ? " (suggested from your pace)" : ""}: {summary.weeks} week{summary.weeks === 1 ? "" : "s"} at {summary.minutesPerDay} minutes, {summary.daysPerWeek} days a
        week.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="card p-5">
          <p className="flex items-center gap-2 text-sm text-fg-subtle">
            <Target size={16} className="text-accent" aria-hidden /> Most of your time goes to
          </p>
          <ul className="mt-3 space-y-2">
            {summary.focus.map((f) => (
              <li key={f.title}>
                <span className="flex items-baseline justify-between gap-2 text-sm text-fg">
                  {f.title} <span className="font-display tabular-nums text-accent">{Math.round(f.share * 100)}%</span>
                </span>
                <span className="block text-xs text-fg-subtle">{f.reason}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <p className="flex items-center gap-2 text-sm text-fg-subtle">
            <CalendarBlank size={16} className="text-accent" aria-hidden /> Pace
          </p>
          <p className={clsx("mt-3 font-display text-xl", statusTone)}>
            {{ ahead: "Ahead of schedule", on_track: "On track", behind: "Tight on time", overdue: "Date has passed" }[summary.status] ?? "On track"}
          </p>
          <p className="mt-1 text-sm text-fg-muted">{summary.statusDetail}</p>
          {summary.fix && <p className="mt-2 text-sm text-fg">{summary.fix}</p>}
          {summary.strong.length > 0 && <p className="mt-3 text-xs text-fg-subtle">Quicker pass for: {summary.strong.join(", ")}.</p>}
        </div>
      </div>

      <p className="mt-6 max-w-md text-sm text-fg-subtle">Your plan recalculates every day from how you actually do, so it stays honest if you get ahead or fall behind.</p>
      <Link href="/portal" className={buttonClass("primary", "lg", "mt-8")}>
        Start today&rsquo;s session <ArrowRight size={16} weight="bold" aria-hidden />
      </Link>
    </section>
  );
}
