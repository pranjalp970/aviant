import { ArrowRight, CalendarBlank, CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/portal/PageHeader";
import { ratingById } from "@/content/acs";
import { quizzesFor } from "@/content/quizzes";
import { getSession } from "@/lib/auth/session";
import { lastActivity, recentOralSessions, recentQuizAttempts } from "@/lib/data/queries";
import { computeReadiness } from "@/lib/readiness";
import { allReviews } from "@/lib/review";

export const metadata: Metadata = { title: "Home" };

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
};
const pct = (n: number) => `${Math.round(n * 100)}%`;
const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default async function PortalHome() {
  const session = (await getSession())!;
  const rating = ratingById(session.rating);
  const [resume, reviews, orals, attempts] = await Promise.all([
    lastActivity(session.rating),
    allReviews(),
    recentOralSessions(session.rating, 10),
    recentQuizAttempts(session.rating, 10),
  ]);
  const r = computeReadiness({ rating: session.rating, checkrideDate: session.checkrideDate, reviews, orals, attempts });
  const isNew = !reviews.length && !orals.length;
  const quick = quizzesFor(session.rating).find((q) => q.count === 20) ?? quizzesFor(session.rating)[0];
  const doneCount = r.plan.filter((p) => p.done).length;

  return (
    <>
      <PageHeader
        eyebrow={rating.short}
        title={`${greeting()}, ${session.name.split(" ")[0]}`}
        description={isNew ? "Welcome aboard. Here's a good place to start." : "Here's your plan for today."}
      />

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Today's plan */}
        <section aria-labelledby="plan" className="rounded-[28px] border border-green/30 bg-gradient-to-br from-green/12 via-panel to-panel p-7 sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="plan" className="font-display text-2xl">
              Today&rsquo;s plan
            </h2>
            {!isNew && (
              <span className="text-sm text-fg-subtle">
                {doneCount} of {r.plan.length} done
              </span>
            )}
          </div>
          {isNew ? (
            <div className="mt-5">
              <p className="max-w-lg text-fg-muted">
                Take a quick 20-question quiz. It shows where you stand, builds your review deck, and from then on this plan adapts to you.
              </p>
              <Link href={`/portal/quizzes/${quick.id}`} className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-lime px-5 text-[15px] font-medium text-on-accent hover:bg-white">
                Start the quiz <ArrowRight size={16} weight="bold" aria-hidden />
              </Link>
            </div>
          ) : (
            <ol className="mt-5 space-y-2">
              {r.plan.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "group flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition-colors",
                      item.done ? "border-border bg-inset" : "border-border-strong bg-inset hover:border-green/50",
                    )}
                  >
                    {item.done ? (
                      <CheckCircle size={22} weight="fill" className="shrink-0 text-green" aria-label="Done" />
                    ) : (
                      <Circle size={22} className="shrink-0 text-fg-subtle" aria-label="To do" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className={clsx("block text-[15px]", item.done ? "text-fg-muted line-through decoration-fg-subtle" : "text-fg")}>{item.title}</span>
                      <span className="block truncate text-sm text-fg-subtle">{item.detail}</span>
                    </span>
                    {!item.done && <ArrowRight size={16} className="shrink-0 text-fg-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden />}
                  </Link>
                </li>
              ))}
            </ol>
          )}
          {resume && (
            <p className="mt-5 text-sm text-fg-subtle">
              Last time:{" "}
              <Link href={resume.href} className="text-fg-muted underline-offset-2 hover:text-accent hover:underline">
                {resume.title}
              </Link>
            </p>
          )}
        </section>

        {/* Readiness */}
        <section aria-labelledby="readiness" className="card flex flex-col items-center p-7 text-center">
          <h2 id="readiness" className="self-start font-display text-xl">
            Checkride readiness
          </h2>
          <div
            className="relative mt-6 grid size-40 place-items-center rounded-full"
            style={{ background: `conic-gradient(var(--green) 0 ${r.overall * 100}%, var(--track) ${r.overall * 100}% 100%)` }}
            role="img"
            aria-label={`Readiness ${pct(r.overall)}: ${r.label}`}
          >
            <div className="absolute inset-[9px] rounded-full bg-card-solid" />
            <span className="relative">
              <span className="block font-display text-5xl tabular-nums">{Math.round(r.overall * 100)}</span>
              <span className="block text-xs uppercase tracking-[0.14em] text-fg-subtle">percent</span>
            </span>
          </div>
          <p className="mt-4 font-display text-lg text-accent">{r.label}</p>
          <p className="mt-1 text-sm text-fg-subtle">
            Written {pct(r.written)}
            {r.oral != null ? ` · Oral ${pct(r.oral)}` : " · Oral: try a mock oral"}
          </p>
          <div className="mt-6 w-full border-t border-border pt-5">
            {r.daysLeft != null ? (
              <p className="flex items-center justify-center gap-2 text-[15px]">
                <CalendarBlank size={18} className="text-green" aria-hidden />
                {r.daysLeft > 1 ? (
                  <span>
                    <span className="font-display text-xl text-fg">{r.daysLeft}</span> days to your checkride
                  </span>
                ) : r.daysLeft === 1 ? (
                  "Checkride tomorrow. You've got this."
                ) : r.daysLeft === 0 ? (
                  "Checkride day! Good luck."
                ) : (
                  <Link href="/portal/settings" className="text-fg-muted hover:text-accent">
                    Checkride date passed. Update it?
                  </Link>
                )}
              </p>
            ) : (
              <Link href="/portal/settings" className="inline-flex items-center gap-2 text-[15px] text-fg-muted hover:text-accent">
                <CalendarBlank size={18} aria-hidden /> Set your checkride date to pace your plan
              </Link>
            )}
          </div>
        </section>
      </div>

      {/* Mastery by topic / area */}
      <section aria-labelledby="mastery" className="mt-12">
        <div className="mb-1 flex items-baseline justify-between">
          <h2 id="mastery" className="font-display text-2xl">
            Mastery by {session.rating === "ppl" ? "topic" : "area"}
          </h2>
          <Link href="/portal/history" className="text-sm text-fg-muted hover:text-accent">
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
                  href={session.rating === "ppl" ? `/portal/review?mode=new&topic=${g.id}` : `/portal/questions?area=${g.id}`}
                  className="block rounded-2xl border border-border px-4 py-3 transition-colors hover:border-green/40 hover:bg-surface"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[15px]">{titleCase(g.title)}</span>
                    <span className={clsx("font-display tabular-nums", g.mastery >= 0.7 ? "text-green" : g.seen ? "text-warning" : "text-fg-subtle")}>{pct(g.mastery)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-strong" aria-hidden>
                    <div className={clsx("h-full rounded-full", g.mastery >= 0.7 ? "bg-green" : "bg-warning")} style={{ width: pct(g.mastery) }} />
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
