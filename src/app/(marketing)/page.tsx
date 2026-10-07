import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { AcsTicker } from "@/components/marketing/AcsTicker";
import { ChartBorder, CompassRose, Contours } from "@/components/marketing/ChartMarks";
import { DemoWidget } from "@/components/marketing/DemoWidget";
import { FlightRoute } from "@/components/marketing/FlightRoute";
import { HeroFlight } from "@/components/marketing/HeroFlight";
import { Instruments } from "@/components/marketing/Instruments";
import { RunwayFinale } from "@/components/marketing/RunwayFinale";
import { buttonClass } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";

const PLANS = [
  {
    name: "Student Pilot",
    price: "Free",
    note: "during beta",
    status: "Available now",
    features: ["Voice CFI & DPE, both modes", "Study plan built to your test dates", "306-question practice bank", "Mock knowledge tests", "Spaced-repetition review", "Study guides"],
    cta: { href: "/signup", label: "Start training free" },
  },
  {
    name: "Checkride Pro",
    price: "Soon",
    note: "after launch",
    status: "Planned",
    features: ["Unlimited mock orals", "Full mock checkrides with your own flight plan", "Readiness reports for your CFI", "Priority voice"],
  },
  {
    name: "Flight Schools",
    price: "Soon",
    note: "per seat",
    status: "Planned",
    features: ["Student seats and cohorts", "Instructor dashboards", "Progress sharing with CFIs", "Custom syllabus mapping"],
  },
];

const FAQ = [
  {
    q: "Does Aviant replace my flight instructor or examiner?",
    a: "No. Aviant is a study aid that helps you prepare between lessons. Your training, endorsements, and checkride still come from an authorized CFI and an FAA-designated pilot examiner.",
  },
  {
    q: "Which ratings are supported?",
    a: "Private Pilot (Airplane) today, built around the FAA's Airman Certification Standards. Instrument Rating is coming soon, and Commercial and CFI are on the roadmap.",
  },
  {
    q: "How does the voice assistant work?",
    a: "It's one AI assistant with two modes. Teach mode behaves like a CFI: it explains concepts and answers your questions. Examine mode behaves like a DPE: it asks scenario-based oral questions, follows up on weak answers, and grades you against the ACS.",
  },
  {
    q: "Where does the study material come from?",
    a: "Questions and guides are built around the FAA's Airman Certification Standards and cite 14 CFR, the AIM, and FAA handbooks so you can always check the source.",
  },
  {
    q: "What does it cost?",
    a: "Aviant is free while we're in beta. Create an account and you get full access to the voice assistant, question bank, quizzes, and study guides.",
  },
  {
    q: "Can I use it on my phone?",
    a: "Yes. Aviant runs in any modern browser on desktop or mobile. Voice works best in Chrome, Edge, and Safari.",
  },
];

function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-end">
      <div>
        <p className="annot text-fg-subtle">{eyebrow}</p>
        <h2 className="mt-5 max-w-xl font-display text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.03] tracking-[-0.015em]">{title}</h2>
      </div>
      {children && <div className="max-w-md text-fg-muted md:justify-self-end">{children}</div>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroFlight
        contours={<Contours className="size-full" />}
        rose={<CompassRose className="size-full" />}
        border={<ChartBorder className="absolute inset-0" />}
      />

      <AcsTicker />

      <FlightRoute />

      <Instruments />

      {/* ── Demo ─────────────────────────────────────────────── */}
      <section id="demo" className="scroll-mt-16 px-5 pb-28 sm:px-8 sm:pb-36">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal>
            <p className="annot text-fg-subtle">Try it now</p>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.03] tracking-[-0.015em]">
              Face the examiner. No account needed.
            </h2>
            <p className="mt-5 max-w-md text-fg-muted">
              A real question from the Private Pilot oral. Answer it the way you would on checkride day, and Aviant grades you against the ACS
              key points.
            </p>
            <dl className="mt-10 max-w-md divide-y divide-border border-y border-border text-[15px]">
              {[
                ["Area", "I · Preflight Preparation"],
                ["Task", "B · Airworthiness Requirements"],
                ["Graded on", "ACS knowledge elements"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3">
                  <dt className="annot pt-0.5 text-fg-subtle">{k}</dt>
                  <dd className="text-right text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <DemoWidget />
          </Reveal>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <section id="pricing" className="scroll-mt-16 px-5 pb-28 sm:px-8 sm:pb-36">
        <div className="mx-auto max-w-[1320px]">
          <SectionHead eyebrow="Pricing" title="Free while we're in beta.">
            Full access, no card required. Paid plans arrive after launch, and beta pilots will hear first.
          </SectionHead>
          <div className="mt-14 border-t border-border-strong">
            {PLANS.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 0.06}
                className="grid gap-6 border-b border-border py-9 md:grid-cols-[minmax(0,4fr)_minmax(0,6fr)_minmax(0,3fr)] md:gap-10"
              >
                <div>
                  <p className={`annot ${p.cta ? "text-accent" : "text-fg-subtle"}`}>{p.status}</p>
                  <h3 className="mt-3 font-display text-2xl">{p.name}</h3>
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className={`font-display text-5xl ${p.cta ? "text-fg" : "text-fg-subtle"}`}>{p.price}</span>
                    <span className="text-fg-subtle">{p.note}</span>
                  </p>
                </div>
                <ul className="grid content-start gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-[15px] ${p.cta ? "text-fg" : "text-fg-muted"}`}>
                      <Check size={15} weight="bold" className={`mt-1 shrink-0 ${p.cta ? "text-accent" : "text-fg-subtle"}`} aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="md:justify-self-end">
                  {p.cta ? (
                    <Link href={p.cta.href} className={buttonClass("primary", "md", "w-full md:w-auto")}>
                      {p.cta.label}
                      <ArrowRight size={15} weight="bold" aria-hidden />
                    </Link>
                  ) : (
                    <span className="annot text-fg-subtle">After launch</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="scroll-mt-16 px-5 pb-12 sm:px-8">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="annot text-fg-subtle">FAQ</p>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.03] tracking-[-0.015em]">Questions, answered.</h2>
          </div>
          <div className="border-t border-border-strong">
            {FAQ.map((f, i) => (
              <details key={f.q} className="group border-b border-border">
                <summary className="flex min-h-16 cursor-pointer list-none items-baseline gap-5 py-6 text-lg text-fg transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  <span className="annot w-8 shrink-0 text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">{f.q}</span>
                  <span className="relative top-[-3px] size-3.5 shrink-0 self-center" aria-hidden>
                    <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pl-[52px] text-fg-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RunwayFinale />
    </>
  );
}
