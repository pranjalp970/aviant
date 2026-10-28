import { Fire, Lock, Medal, Notebook, Trophy } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import type { Metadata } from "next";
import { PageHeader } from "@/components/portal/PageHeader";
import { ChallengeList } from "@/components/progress/ChallengeList";
import { EmptyState } from "@/components/ui/EmptyState";
import { getSession } from "@/lib/auth/session";
import { loadPlan } from "@/lib/plan/load";
import { weekOf } from "@/lib/progress/challenges";
import { loadProgress } from "@/lib/progress/load";
import { RANKS } from "@/lib/progress/xp";
import { computeReadiness } from "@/lib/readiness";

export const metadata: Metadata = { title: "Logbook" };

const DAY = 86_400_000;
const addDays = (d: string, n: number) => new Date(Date.parse(`${d}T00:00:00Z`) + n * DAY).toISOString().slice(0, 10);
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default async function LogbookPage() {
  const session = (await getSession())!;
  const ctx = await loadPlan(session);
  const readiness = computeReadiness({ rating: session.rating, reviews: ctx.reviews, orals: ctx.orals });
  const progress = await loadProgress(session, ctx, readiness);
  const byDay = new Map(ctx.log.map((r) => [r.day, r]));

  // 12-week heatmap, Monday-first columns, ending this week.
  const firstMonday = addDays(weekOf(ctx.today).start, -7 * 11);
  const weeks = Array.from({ length: 12 }, (_, w) => Array.from({ length: 7 }, (_, d) => addDays(firstMonday, w * 7 + d)));
  const level = (m: number) => (m <= 0 ? 0 : m < 10 ? 1 : m < 25 ? 2 : m < 45 ? 3 : 4);
  const shades = ["bg-surface-strong", "bg-green/25", "bg-green/45", "bg-green/70", "bg-green"];

  const hours = Math.floor(progress.totals.minutes / 60);
  const mins = Math.round(progress.totals.minutes % 60);
  const earned = progress.badges.filter((b) => b.earned);
  const locked = progress.badges.filter((b) => !b.earned).sort((a, b) => b.progress - a.progress);

  return (
    <>
      <PageHeader eyebrow="Progress" title="Logbook" description="Every minute you study counts, like hours in a pilot's logbook." />

      {progress.totals.minutes === 0 && progress.totals.questions === 0 ? (
        <EmptyState icon={Notebook} title="Nothing logged yet" action={{ href: "/portal", label: "Start today's session" }} secondary={{ href: "/portal/review?mode=quiz", label: "Answer a few questions" }}>
          Study time, questions answered, streak and rank appear here after your first session. Ten minutes or twenty questions counts
          as a logged day.
        </EmptyState>
      ) : (
      <>
      {/* Totals */}
      <dl className="card grid grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x [&>div]:border-border [&>div:nth-child(-n+2)]:border-b lg:[&>div:nth-child(-n+2)]:border-b-0 [&>div:nth-child(odd)]:border-r lg:[&>div:nth-child(odd)]:border-r-0">
        <div className="p-5">
          <dt className="annot text-fg-subtle">Total study time</dt>
          <dd className="mt-2 font-display text-3xl tabular-nums">
            {hours}
            <span className="text-base text-fg-subtle">h</span> {mins}
            <span className="text-base text-fg-subtle">m</span>
          </dd>
        </div>
        <div className="p-5">
          <dt className="annot text-fg-subtle">Questions answered</dt>
          <dd className="mt-2 font-display text-3xl tabular-nums">{progress.totals.questions.toLocaleString()}</dd>
        </div>
        <div className="p-5">
          <dt className="annot flex items-center gap-1.5 text-fg-subtle">
            <Fire size={14} weight="fill" className="text-accent" aria-hidden /> Streak
          </dt>
          <dd className="mt-2 font-display text-3xl tabular-nums">
            {progress.streak.current} <span className="text-base text-fg-subtle">best {progress.streak.best}</span>
          </dd>
        </div>
        <div className="p-5">
          <dt className="annot flex items-center gap-1.5 text-fg-subtle">
            <Trophy size={14} weight="fill" className="text-accent" aria-hidden /> {progress.xp.toLocaleString()} XP
          </dt>
          <dd className="mt-2 truncate font-display text-2xl">{progress.rank.title}</dd>
        </div>
      </dl>

      {/* Heatmap */}
      <section aria-labelledby="activity" className="card mt-4 p-6">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 id="activity" className="font-display text-xl">
            Last 12 weeks
          </h2>
          <span className="text-sm text-fg-subtle">{progress.totals.studyDays} study days total</span>
        </div>
        <div className="overflow-x-auto">
          <div className="grid w-max grid-flow-col gap-1.5" role="img" aria-label="Study activity heatmap for the last 12 weeks">
            {weeks.map((week, w) => (
              <div key={w} className="grid gap-1.5">
                {week.map((d) => {
                  const m = byDay.get(d)?.minutes ?? 0;
                  return <span key={d} title={`${d}: ${Math.round(m)} min`} className={clsx("size-4 rounded-ui sm:size-5", d > ctx.today ? "opacity-0" : shades[level(m)], d === ctx.today && "ring-1 ring-green")} />;
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-fg-subtle">
          Less {shades.map((s) => <span key={s} className={clsx("size-4 rounded-ui", s)} aria-hidden />)} More
        </div>
      </section>
      </>
      )}

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Badges */}
        <section aria-labelledby="badges">
          <h2 id="badges" className="mb-5 font-display text-xl sm:text-2xl">
            Badges <span className="text-base text-fg-subtle">{earned.length}/{progress.badges.length}</span>
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[...earned, ...locked].map((b) => (
              <li key={b.id} className={clsx("rounded-ui border p-4", b.earned ? "border-green/40 bg-green/8" : "border-border")}>
                <div className="flex items-start gap-3">
                  <span className={clsx("grid size-10 shrink-0 place-items-center rounded-ui", b.earned ? "bg-green/12 text-accent" : "bg-surface-strong text-fg-subtle")}>
                    {b.earned ? <Medal size={20} weight="fill" aria-hidden /> : <Lock size={18} aria-hidden />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={clsx("text-sm", b.earned ? "text-fg" : "text-fg-muted")}>{b.title}</p>
                    <p className="text-xs text-fg-subtle">{b.description}</p>
                    {b.earned ? (
                      <p className="mt-1 text-xs text-accent">{b.earnedAt ? `Earned ${fmtDate(b.earnedAt)}` : "Earned"}</p>
                    ) : (
                      <div className="mt-2 h-1 overflow-hidden bg-surface-strong" aria-hidden>
                        <div className="h-full bg-green/60" style={{ width: `${b.progress * 100}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-6">
          {/* Ranks */}
          <section aria-labelledby="ranks" className="card p-6">
            <h2 id="ranks" className="mb-4 font-display text-xl">
              Ranks
            </h2>
            <ol className="space-y-2">
              {RANKS.map((r) => {
                const reached = progress.xp >= r.min;
                const current = r.title === progress.rank.title;
                return (
                  <li key={r.title} className={clsx("flex items-center justify-between rounded-ui px-3 py-2 text-sm", current && "bg-green/10")}>
                    <span className={reached ? "text-fg" : "text-fg-subtle"}>
                      {r.title} {current && <span className="ml-1 text-xs text-accent">you</span>}
                    </span>
                    <span className="text-sm tabular-nums text-fg-subtle">{r.min.toLocaleString()} XP</span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-xs text-fg-subtle">
              Earn XP by studying: 10 per correct answer, 4 per attempt, 30 per lesson, 15 per graded oral answer, 50 for meeting your daily goal, 100 per badge,
              200 per weekly challenge.
            </p>
          </section>

          <section aria-labelledby="week">
            <h2 id="week" className="mb-4 font-display text-xl">
              This week&rsquo;s challenges
            </h2>
            <ChallengeList challenges={progress.challenges} />
          </section>
        </div>
      </div>
    </>
  );
}
