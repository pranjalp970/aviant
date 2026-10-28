import { ArrowRight, Flag, PencilSimple, Star } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/portal/PageHeader";
import { StatusChip } from "@/components/plan/StatusChip";
import { TodaySession } from "@/components/plan/TodaySession";
import { getSession } from "@/lib/auth/session";
import { loadPlan } from "@/lib/plan/load";

export const metadata: Metadata = { title: "Study plan" };

const fmt = (d: string, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" }) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { ...opts, timeZone: "UTC" });
const hours = (m: number) => (m >= 90 ? `${Math.round((m / 60) * 10) / 10} h` : `${Math.round(m)} min`);

export default async function PlanPage() {
  const session = (await getSession())!;
  const { plan } = await loadPlan(session);
  const topics = [...plan.topics].sort((a, b) => b.minutes - a.minutes);
  const maxMinutes = Math.max(1, ...topics.map((t) => t.minutes));

  return (
    <>
      <PageHeader
        eyebrow={plan.phase === "written" ? "Written test prep" : "Checkride prep"}
        title="Your study plan"
        description={`${plan.phase === "written" ? "Written test" : "Checkride"} ${plan.dateSuggested ? "target (suggested)" : "on"} ${fmt(plan.targetDate, { weekday: "long", month: "long", day: "numeric" })} · ${plan.daysLeft} days · ${session.studyMinutesPerDay} min, ${session.studyDaysPerWeek} days a week`}
        action={
          <Link href="/portal/settings#plan" className="inline-flex items-center gap-1.5 text-sm text-fg-muted">
            <PencilSimple size={14} aria-hidden /> Adjust plan
          </Link>
        }
      />

      {/* Status */}
      <section className="card mb-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <StatusChip status={plan.status} />
          <p className="mt-2 max-w-2xl text-sm text-fg">{plan.statusDetail}</p>
          {plan.fix && <p className="mt-1 text-sm text-warning">{plan.fix}</p>}
        </div>
        <dl className="grid shrink-0 grid-cols-2 gap-6">
          <div>
            <dt className="text-xs text-fg-subtle">Study time needed</dt>
            <dd className="font-display text-2xl tabular-nums">{hours(plan.requiredMinutes)}</dd>
          </div>
          <div>
            <dt className="text-xs text-fg-subtle">Time you have</dt>
            <dd className={clsx("font-display text-2xl tabular-nums", plan.capacityMinutes < plan.requiredMinutes && "text-warning")}>{hours(plan.capacityMinutes)}</dd>
          </div>
        </dl>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Roadmap */}
        <section aria-labelledby="roadmap">
          <h2 id="roadmap" className="mb-4 font-display text-2xl">
            Week by week
          </h2>
          <ol className="space-y-3">
            {plan.weeks.map((w, i) => (
              <li key={w.index}>
                <div className={clsx("rounded-2xl border p-5", i === 0 ? "border-green/40 bg-green/8" : "border-border bg-surface")}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-display text-lg">
                      {i === 0 ? "This week" : w.kind === "review" ? "Final review" : `Week ${i + 1}`}
                      <span className="ml-2 text-sm text-fg-subtle">
                        {fmt(w.start)} – {fmt(w.end)}
                      </span>
                    </p>
                    <span className="text-sm text-fg-subtle">~{hours(w.minutes)}</span>
                  </div>
                  {w.topics.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {w.topics.map((t) => (
                        <li key={t.id} className="rounded-full border border-border-strong bg-inset px-3 py-1 text-sm text-fg-muted">
                          {t.title}
                          {t.newQuestions > 0 && <span className="ml-1.5 text-fg-subtle">· {t.newQuestions} new</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                  {w.milestone && (
                    <p className="mt-3 flex items-center gap-2 text-sm text-accent">
                      {w.kind === "learn" ? <Star size={14} weight="fill" aria-hidden /> : <Flag size={14} weight="fill" aria-hidden />} {w.milestone}
                    </p>
                  )}
                </div>
              </li>
            ))}
            <li className="flex items-center gap-2 px-5 pt-3">
              <Flag size={16} weight="fill" className="text-accent" aria-hidden />
              <p className="font-display text-lg text-accent">
                {plan.phase === "written" ? "Written test" : "Checkride"} · {fmt(plan.targetDate)}
              </p>
            </li>
          </ol>
        </section>

        <div className="space-y-8">
          {/* Today */}
          <section aria-labelledby="today">
            <h2 id="today" className="mb-4 font-display text-2xl">
              Today
            </h2>
            <TodaySession items={plan.today.items} />
          </section>

          {/* Where the time goes */}
          <section aria-labelledby="topics">
            <h2 id="topics" className="font-display text-2xl">
              Where your time goes
            </h2>
            <p className="mb-4 mt-1 text-sm text-fg-subtle">More time where you&rsquo;re weaker or the test leans harder, less where you&rsquo;re strong.</p>
            <ul className="space-y-3">
              {topics.map((t) => (
                <li key={t.id}>
                  <Link href={`/portal/review?mode=new&topic=${t.id}`} className="block">
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-fg">{t.title}</span>
                      <span className="shrink-0 tabular-nums text-fg-subtle">{t.minutes >= 1 ? hours(t.minutes) : "done"}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-strong" aria-hidden>
                      <div className="h-full rounded-full bg-green" style={{ width: `${(t.minutes / maxMinutes) * 100}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-fg-subtle">
                      {t.reason} · {Math.round(t.mastery * 100)}% mastered
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <Link href="/onboarding?step=diagnostic" className="flex items-center justify-between rounded-2xl border border-border px-5 py-4 text-sm text-fg-muted">
            Retake the knowledge check to recalibrate
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </>
  );
}
