import { ArrowRight, CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import type { Metadata } from "next";
import Link from "next/link";
import { StatusChip } from "@/components/plan/StatusChip";
import { TodaySession } from "@/components/plan/TodaySession";
import { PageHeader } from "@/components/portal/PageHeader";
import { Celebration } from "@/components/progress/Celebration";
import { ChallengeList } from "@/components/progress/ChallengeList";
import { ProgressStrip } from "@/components/progress/ProgressStrip";
import { ReadinessGauge } from "@/components/progress/ReadinessGauge";
import { ratingById } from "@/content/acs";
import { getSession } from "@/lib/auth/session";
import { loadPlan } from "@/lib/plan/load";
import { loadProgress } from "@/lib/progress/load";
import { computeReadiness } from "@/lib/readiness";

export const metadata: Metadata = { title: "Home" };

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
};
const pct = (n: number) => `${Math.round(n * 100)}%`;
const daysUntil = (date: string, today: string) => Math.round((Date.parse(date) - Date.parse(today)) / 86_400_000);
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** A titled panel. Panels sit side by side; nothing inside them is boxed again. */
function Panel({ title, meta, children, className, id }: { title: string; meta?: React.ReactNode; children: React.ReactNode; className?: string; id: string }) {
  return (
    <section aria-labelledby={id} className={clsx("card p-6 sm:p-7", className)}>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id={id} className="font-display text-xl">
          {title}
        </h2>
        {meta && <span className="annot text-fg-subtle">{meta}</span>}
      </div>
      {children}
    </section>
  );
}

/** One label / value line inside a panel. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-sm text-fg-muted">{label}</dt>
      <dd className="text-right text-sm text-fg">{children}</dd>
    </div>
  );
}

function Countdown({ date, today }: { date: string; today: string }) {
  const d = daysUntil(date, today);
  if (d > 1)
    return (
      <>
        <span className="font-display text-lg tabular-nums">{d}</span> <span className="text-fg-subtle">days</span>
      </>
    );
  if (d === 1) return <>Tomorrow</>;
  if (d === 0) return <span className="text-accent">Today</span>;
  return <span className="text-fg-subtle">Passed</span>;
}

export default async function PortalHome() {
  const session = (await getSession())!;
  const rating = ratingById(session.rating);
  const ctx = await loadPlan(session);
  const { plan, reviews, orals, today, attempts } = ctx;
  const r = computeReadiness({ rating: session.rating, reviews, orals });
  const progress = await loadProgress(session, ctx, r);
  const fulls = attempts.filter((a) => a.total >= 60).slice(0, 2);
  const doneCount = plan.today.items.length ? plan.today.items.filter((i) => i.done).length : 0;
  const allDone = plan.today.items.length > 0 && doneCount === plan.today.items.length;

  const readyChecks = [
    { ok: r.overall >= 0.85, label: "Readiness at 85% or higher", detail: `Now ${pct(r.overall)}` },
    { ok: fulls.length >= 1 && fulls[0].score / fulls[0].total >= 0.85, label: "A full mock test at 85% or higher" },
    { ok: fulls.length === 2 && fulls.every((a) => a.score / a.total >= 0.85), label: "A second full mock test at 85% or higher" },
  ];

  return (
    <>
      <PageHeader eyebrow={rating.short} title={`${greeting()}, ${session.name.split(" ")[0]}`} description="Here's your session for today." />
      <Celebration badges={progress.newBadges} challenges={progress.newChallenges} />
      <ProgressStrip progress={progress} />

      <div className="mt-4 grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {/* ── Main column ── */}
        <div className="min-w-0 space-y-4">
          <Panel
            id="today"
            title="Today's session"
            meta={allDone ? "All done for today" : `About ${plan.today.minutes} min · ${doneCount} of ${plan.today.items.length} done`}
          >
            <TodaySession items={plan.today.items} />
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <StatusChip status={plan.status} />
                <p className="mt-2 text-sm text-fg-muted">{plan.fix ?? plan.statusDetail}</p>
              </div>
              <Link href="/portal/plan" className="annot inline-flex shrink-0 items-center gap-2 text-accent transition-opacity hover:opacity-80">
                View full plan <ArrowRight size={12} weight="bold" aria-hidden />
              </Link>
            </div>
          </Panel>

          <Panel
            id="challenges"
            title="This week's challenges"
            meta={`${progress.challenges.filter((c) => c.done).length} of ${progress.challenges.length} done · resets Monday`}
          >
            <ChallengeList challenges={progress.challenges} />
          </Panel>
        </div>

        {/* ── Side column ── */}
        <div className="min-w-0 space-y-4">
          <Panel id="readiness" title="Checkride readiness">
            <ReadinessGauge value={r.overall} label={r.label} />
            <p className="mt-1 text-center text-sm text-fg">{r.label}</p>
            <dl className="mt-5 divide-y divide-border border-y border-border">
              <Row label="Written knowledge">{pct(r.written)}</Row>
              <Row label="Oral">{r.oral != null ? pct(r.oral) : <Link href="/portal/assistant?mode=examine" className="text-accent hover:opacity-80">Try a mock oral</Link>}</Row>
              <Row label="Predicted written score">
                {plan.predicted ? (
                  <span className={clsx("font-display text-lg tabular-nums", plan.predicted.score < 70 && "text-warning")}>
                    {plan.predicted.score}%{" "}
                    <span className="font-sans text-xs text-fg-subtle">
                      {plan.predicted.score >= 80 ? "likely pass" : plan.predicted.score >= 70 ? "borderline" : "below passing"}
                    </span>
                  </span>
                ) : (
                  <Link href="/portal/quizzes/ppl-quick-20" className="text-accent hover:opacity-80">
                    Take a Quick 20
                  </Link>
                )}
              </Row>
              {session.writtenStatus !== "passed" && (
                <Row label="Written test">
                  {session.writtenDate ? (
                    <Countdown date={session.writtenDate} today={today} />
                  ) : (
                    <Link href="/portal/settings#plan" className="text-accent hover:opacity-80">
                      Set a date
                    </Link>
                  )}
                </Row>
              )}
              <Row label="Checkride">
                {session.checkrideDate ? (
                  <Countdown date={session.checkrideDate} today={today} />
                ) : (
                  <Link href="/portal/settings#plan" className="text-accent hover:opacity-80">
                    Set a date
                  </Link>
                )}
              </Row>
            </dl>
            {plan.predicted && <p className="mt-3 text-xs text-fg-subtle">{plan.predicted.basis}</p>}
          </Panel>

          <Panel id="ready" title="Aviant Ready" meta={`${readyChecks.filter((c) => c.ok).length} of 3`}>
            <p className="text-sm text-fg-muted">A certificate to show your CFI you&rsquo;re ready for the written.</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {readyChecks.map((c) => (
                <li key={c.label} className="flex items-start gap-2.5">
                  {c.ok ? (
                    <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-label="Done" />
                  ) : (
                    <Circle size={18} className="mt-0.5 shrink-0 text-fg-subtle" aria-label="Not yet" />
                  )}
                  <span className={c.ok ? "text-fg" : "text-fg-muted"}>
                    {c.label}
                    {c.detail && <span className="text-fg-subtle"> · {c.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href={progress.aviantReady ? "/portal/certificate" : "/portal/quizzes/ppl-mock-knowledge"}
              className="annot mt-6 inline-flex items-center gap-2 text-accent transition-opacity hover:opacity-80"
            >
              {progress.aviantReady ? "View your certificate" : "Take a full mock test"} <ArrowRight size={12} weight="bold" aria-hidden />
            </Link>
          </Panel>
        </div>
      </div>

      {/* ── Mastery by topic ── */}
      <section aria-labelledby="mastery" className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p className="annot text-fg-subtle">Question bank</p>
            <h2 id="mastery" className="mt-2 font-display text-2xl">
              Mastery by topic
            </h2>
          </div>
          <Link href="/portal/history" className="annot text-fg-muted transition-colors hover:text-fg">
            View history
          </Link>
        </div>
        <p className="mt-2 text-sm text-fg-subtle">A question counts as mastered once you&rsquo;ve recalled it correctly several times, spaced out.</p>
        <ul className="mt-6 grid grid-cols-1 gap-x-10 border-t border-border md:grid-cols-2">
          {[...r.groups]
            .sort((a, b) => a.mastery - b.mastery)
            .map((g) => (
              <li key={g.id} className="border-b border-border">
                <Link href={`/portal/review?mode=new&topic=${g.id}`} className="group -mx-2 block rounded-ui px-2 py-4 transition-colors hover:bg-surface-strong">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="min-w-0 text-sm text-fg">{capitalize(g.title)}</span>
                    <span className={clsx("annot shrink-0", g.mastery >= 0.7 ? "text-accent" : "text-fg-muted")}>{pct(g.mastery)}</span>
                  </div>
                  <div className="mt-2.5 h-1 overflow-hidden bg-surface-strong" aria-hidden>
                    <div className="h-full bg-green" style={{ width: pct(g.mastery) }} />
                  </div>
                  <p className="mt-2 text-xs text-fg-subtle">
                    {g.seen} of {g.total} questions seen
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}
