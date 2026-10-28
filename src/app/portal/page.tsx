import { ArrowRight, CalendarBlank, Certificate, CheckCircle, Circle, Target } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/portal/PageHeader";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { StatusChip } from "@/components/plan/StatusChip";
import { Celebration } from "@/components/progress/Celebration";
import { ChallengeList } from "@/components/progress/ChallengeList";
import { ProgressStrip } from "@/components/progress/ProgressStrip";
import { TodaySession } from "@/components/plan/TodaySession";
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

function Countdown({ label, date, today }: { label: string; date: string; today: string }) {
  const d = daysUntil(date, today);
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className="flex items-center gap-2 text-fg-muted">
        <CalendarBlank size={16} className="text-accent" aria-hidden /> {label}
      </span>
      <span className="text-fg">
        {d > 1 ? (
          <>
            <span className="font-display text-xl tabular-nums">{d}</span> days
          </>
        ) : d === 1 ? (
          "Tomorrow"
        ) : d === 0 ? (
          "Today!"
        ) : (
          <span className="text-fg-subtle">Passed</span>
        )}
      </span>
    </div>
  );
}

export default async function PortalHome() {
  const session = (await getSession())!;
  const rating = ratingById(session.rating);
  const ctx = await loadPlan(session);
  const { plan, reviews, orals, today, attempts } = ctx;
  const r = computeReadiness({ rating: session.rating, reviews, orals });
  const progress = await loadProgress(session, ctx, r);
  const fulls = attempts.filter((a) => a.total >= 60).slice(0, 2);
  const doneCount = plan.today.items.filter((i) => i.done).length;

  return (
    <>
      <PageHeader eyebrow={rating.short} title={`${greeting()}, ${session.name.split(" ")[0]}`} description="Here's your session for today." />
      <Celebration badges={progress.newBadges} challenges={progress.newChallenges} />
      <ProgressStrip progress={progress} />

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Today's session */}
        <section aria-labelledby="today" className="rounded-[28px] border border-green/40 bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="today" className="font-display text-2xl">
              Today&rsquo;s session
            </h2>
            <span className="text-sm text-fg-subtle">
              {doneCount === plan.today.items.length ? "All done for today" : `~${plan.today.minutes} min · ${doneCount} of ${plan.today.items.length} done`}
            </span>
          </div>
          <div className="mt-5">
            <TodaySession items={plan.today.items} />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <StatusChip status={plan.status} />
              <p className="mt-2 text-sm text-fg-muted">{plan.fix ?? plan.statusDetail}</p>
            </div>
            <Link href="/portal/plan" className="inline-flex shrink-0 items-center gap-1.5 text-sm text-accent">
              View full plan <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </section>

        {/* Readiness + countdowns */}
        <section aria-labelledby="readiness" className="card flex flex-col p-6 sm:p-7">
          <h2 id="readiness" className="font-display text-xl">
            Checkride readiness
          </h2>
          <div className="mt-5 flex items-center gap-5">
            <ProgressRing value={r.overall} label={`Readiness ${pct(r.overall)}: ${r.label}`}>
              <span className="font-display text-2xl tabular-nums">{Math.round(r.overall * 100)}</span>
            </ProgressRing>
            <div>
              <p className="font-display text-lg text-accent">{r.label}</p>
              <p className="mt-1 text-sm text-fg-subtle">Written {pct(r.written)}</p>
              <p className="text-sm text-fg-subtle">{r.oral != null ? `Oral ${pct(r.oral)}` : "Oral: try a mock oral"}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-inset px-4 py-3">
            <p className="flex items-center gap-2 text-sm text-fg-muted">
              <Target size={16} className="text-accent" aria-hidden /> Predicted written score
            </p>
            {plan.predicted ? (
              <>
                <p className={clsx("mt-1 font-display text-3xl tabular-nums", plan.predicted.score >= 70 ? "text-accent" : "text-warning")}>
                  {plan.predicted.score}%{" "}
                  <span className="text-sm text-fg-subtle">{plan.predicted.score >= 80 ? "likely pass" : plan.predicted.score >= 70 ? "borderline" : "keep going"}</span>
                </p>
                <p className="text-xs text-fg-subtle">{plan.predicted.basis}</p>
              </>
            ) : (
              <p className="mt-1 text-sm text-fg-subtle">
                <Link href="/portal/quizzes/ppl-quick-20" className="text-accent">
                  Take a Quick 20
                </Link>{" "}
                to unlock your prediction.
              </p>
            )}
          </div>

          <div className="mt-6 space-y-2">
            {session.writtenStatus !== "passed" &&
              (session.writtenDate ? (
                <Countdown label="Written test" date={session.writtenDate} today={today} />
              ) : (
                <Link href="/portal/settings#plan" className="block text-sm text-fg-muted">
                  Set your written test date →
                </Link>
              ))}
            {session.checkrideDate ? (
              <Countdown label="Checkride" date={session.checkrideDate} today={today} />
            ) : (
              <Link href="/portal/settings#plan" className="block text-sm text-fg-muted">
                Set your checkride date →
              </Link>
            )}
          </div>
        </section>
      </div>

      {/* This week + Aviant Ready */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <section aria-labelledby="challenges" className="card p-6 sm:p-7">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 id="challenges" className="font-display text-xl">
              This week&rsquo;s challenges
            </h2>
            <span className="text-sm text-fg-subtle">
              {progress.challenges.filter((c) => c.done).length}/{progress.challenges.length} done · resets Monday
            </span>
          </div>
          <ChallengeList challenges={progress.challenges} />
        </section>

        <section aria-labelledby="ready" className="card flex flex-col p-6 sm:p-7">
          <h2 id="ready" className="flex items-center gap-2 font-display text-xl">
            <Certificate size={22} weight="fill" className="text-accent" aria-hidden /> Aviant Ready
          </h2>
          <p className="mt-1 text-sm text-fg-subtle">Earn your certificate to show your CFI you&rsquo;re ready for the written.</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { ok: r.overall >= 0.85, label: `Readiness 85%+ (now ${pct(r.overall)})` },
              { ok: fulls.length >= 1 && fulls[0].score / fulls[0].total >= 0.85, label: "Full mock test at 85%+" },
              { ok: fulls.length === 2 && fulls.every((a) => a.score / a.total >= 0.85), label: "Second full mock test at 85%+" },
            ].map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                {c.ok ? <CheckCircle size={18} weight="fill" className="text-accent" aria-label="Done" /> : <Circle size={18} className="text-fg-subtle" aria-label="Not yet" />}
                <span className={c.ok ? "text-fg" : "text-fg-muted"}>{c.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-5">
            {progress.aviantReady ? (
              <Link href="/portal/certificate" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                View your certificate <ArrowRight size={14} aria-hidden />
              </Link>
            ) : (
              <Link href="/portal/quizzes/ppl-mock-knowledge" className="text-sm text-fg-muted">
                Take a full mock test →
              </Link>
            )}
          </div>
        </section>
      </div>

      {/* Mastery by topic */}
      <section aria-labelledby="mastery" className="mt-12">
        <div className="mb-1 flex items-baseline justify-between">
          <h2 id="mastery" className="font-display text-2xl">
            Mastery by topic
          </h2>
          <Link href="/portal/history" className="text-sm text-fg-muted">
            View history
          </Link>
        </div>
        <p className="mb-4 text-sm text-fg-subtle">A question counts as mastered after you&rsquo;ve recalled it correctly several times, spaced out.</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[...r.groups]
            .sort((a, b) => a.mastery - b.mastery)
            .map((g) => (
              <li key={g.id}>
                <Link
                  href={`/portal/review?mode=new&topic=${g.id}`}
                  className="block rounded-2xl border border-border px-4 py-3"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm">{g.title.charAt(0).toUpperCase() + g.title.slice(1)}</span>
                    <span className={clsx("font-display tabular-nums", g.mastery >= 0.7 ? "text-accent" : g.seen ? "text-fg" : "text-fg-subtle")}>{pct(g.mastery)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-strong" aria-hidden>
                    <div className="h-full rounded-full bg-green" style={{ width: pct(g.mastery) }} />
                  </div>
                  <p className="mt-1.5 text-xs text-fg-subtle">
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
