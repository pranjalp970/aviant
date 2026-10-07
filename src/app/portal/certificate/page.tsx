import { Certificate as CertificateIcon, CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { PlaneMark } from "@/components/brand/Logo";
import { PageHeader } from "@/components/portal/PageHeader";
import { PrintButton } from "@/components/progress/PrintButton";
import { buttonClass } from "@/components/ui/button";
import { getSession } from "@/lib/auth/session";
import { loadPlan } from "@/lib/plan/load";
import { loadProgress } from "@/lib/progress/load";
import { computeReadiness } from "@/lib/readiness";

export const metadata: Metadata = { title: "Aviant Ready certificate" };

const pct = (n: number) => `${Math.round(n * 100)}%`;

export default async function CertificatePage() {
  const session = (await getSession())!;
  const ctx = await loadPlan(session);
  const r = computeReadiness({ rating: session.rating, reviews: ctx.reviews, orals: ctx.orals });
  const progress = await loadProgress(session, ctx, r);
  const fulls = ctx.attempts.filter((a) => a.total >= 60).slice(0, 2);

  if (!progress.aviantReady) {
    return (
      <>
        <PageHeader eyebrow="Aviant Ready" title="Not quite yet" description="Your certificate unlocks when your readiness and mock tests show you're ready for the written." />
        <div className="card max-w-xl p-7">
          <ul className="space-y-3 text-[15px]">
            {[
              { ok: r.overall >= 0.85, label: `Checkride readiness of 85% or more (now ${pct(r.overall)})` },
              { ok: fulls.length >= 1 && fulls[0].score / fulls[0].total >= 0.85, label: "A full mock knowledge test at 85%+" },
              { ok: fulls.length === 2 && fulls.every((a) => a.score / a.total >= 0.85), label: "Your last two full mock tests both at 85%+" },
            ].map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                {c.ok ? <CheckCircle size={20} weight="fill" className="text-green" aria-label="Done" /> : <Circle size={20} className="text-fg-subtle" aria-label="Not yet" />}
                <span className={c.ok ? "text-fg" : "text-fg-muted"}>{c.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/portal/plan" className={buttonClass("primary")}>
              Follow your plan
            </Link>
            <Link href="/portal/quizzes/ppl-mock-knowledge" className={buttonClass("glass")}>
              Take a full mock test
            </Link>
          </div>
        </div>
      </>
    );
  }

  const earnedAt = progress.achievements.find((a) => a.id === "badge-written-ready")?.earned_at ?? new Date().toISOString();
  const date = new Date(earnedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="text-fg-muted">Show this to your CFI when you ask for your knowledge-test endorsement.</p>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-3xl rounded-[28px] border-2 border-green/50 bg-card-solid p-8 sm:p-12 print:rounded-none print:border-[3px] print:border-black print:bg-white print:text-black">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-sans text-xl text-green print:text-black">
            <PlaneMark className="h-5 w-auto" /> aviant
          </span>
          <CertificateIcon size={36} weight="fill" className="text-green print:text-black" aria-hidden />
        </div>

        <p className="mt-10 text-sm uppercase tracking-[0.2em] text-fg-subtle print:text-black">Certificate of readiness</p>
        <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3rem)] leading-tight">Aviant Ready</h1>
        <p className="mt-1 text-lg text-fg-muted print:text-black">Private Pilot, Airplane: FAA knowledge test (PAR)</p>

        <p className="mt-10 text-fg-muted print:text-black">This certifies that</p>
        <p className="mt-1 font-display text-3xl">{session.name}</p>
        <p className="mt-4 max-w-xl text-fg-muted print:text-black">
          has demonstrated knowledge-test readiness on Aviant, with overall readiness of <strong className="text-fg print:text-black">{pct(r.overall)}</strong> and
          full-length mock test scores of{" "}
          <strong className="text-fg print:text-black">{fulls.map((a) => pct(a.score / a.total)).join(" and ")}</strong>.
        </p>

        <h2 className="mt-10 text-sm uppercase tracking-[0.14em] text-fg-subtle print:text-black">Mastery by topic</h2>
        <ul className="mt-3 grid gap-x-8 gap-y-1.5 text-[15px] sm:grid-cols-2">
          {r.groups.map((g) => (
            <li key={g.id} className="flex justify-between gap-3 border-b border-border py-1 print:border-black/20">
              <span>{g.title.charAt(0).toUpperCase() + g.title.slice(1)}</span>
              <span className="tabular-nums">{pct(g.mastery)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-4 text-sm text-fg-subtle print:text-black">
          <p>Earned {date}</p>
          <p className="max-w-sm text-right text-xs">
            Aviant is a study aid and is not affiliated with the FAA. This certificate is not an endorsement; your authorized instructor makes that decision.
          </p>
        </div>
      </article>
    </>
  );
}
