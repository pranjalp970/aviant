import { ArrowRight, Check, Plus } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { AcsTicker } from "@/components/marketing/AcsTicker";
import { CompassRose } from "@/components/marketing/ChartMarks";
import { cta } from "@/components/marketing/cta";
import { DemoWidget } from "@/components/marketing/DemoWidget";
import { FlightRoute } from "@/components/marketing/FlightRoute";
import { HeroFlight } from "@/components/marketing/HeroFlight";
import { Instruments } from "@/components/marketing/Instruments";
import { RunwayFinale } from "@/components/marketing/RunwayFinale";
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

const PATHS = [
  {
    title: "I'm studying for the written",
    body: "Drill all 306 practice questions, take timed mock tests, and see a predicted score before you book the exam.",
    link: "Start with the written",
    href: "/signup",
  },
  {
    title: "My checkride is coming up",
    body: "Rehearse the oral with an examiner that asks follow-ups on weak answers and grades you against the ACS.",
    link: "Rehearse the oral",
    href: "/signup",
  },
  {
    title: "I teach student pilots",
    body: "Instructor dashboards and progress sharing are on the way. Your students can start on their own today.",
    link: "See flight school plans",
    href: "/#pricing",
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

/** Panoptical-style section opening: the label sits in its own column, the heading beside it. */
function SectionHead({ label, title, children }: { label: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
      <p className="annot pt-2 text-fg-subtle">{label}</p>
      <div>
        <h2 className="max-w-2xl font-display text-3xl tracking-[-0.015em] md:text-4xl">{title}</h2>
        {children && <p className="mt-5 max-w-[52ch] text-fg-muted">{children}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroFlight rose={<CompassRose className="size-full" />} />

      <AcsTicker />

      {/* ── Who it's for ─────────────────────────────────────── */}
      <section aria-labelledby="paths" className="mx-auto max-w-[1320px] px-5 py-28 sm:px-8 sm:py-36">
        <Reveal className="text-center">
          <p className="annot mx-auto text-fg-subtle">Start where you are</p>
          <h2 id="paths" className="mx-auto mt-5 font-display text-3xl tracking-[-0.015em] md:text-4xl">
            Where are you in training?
          </h2>
        </Reveal>
        <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {PATHS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06}>
              <Link href={p.href} className="card-link group flex h-full flex-col border border-border-strong bg-bg-elevated p-7">
                <h3 className="font-display text-xl">{p.title}</h3>
                <p className="mt-3 flex-1 text-fg-muted">{p.body}</p>
                <span className="annot mt-8 inline-flex items-center gap-2 text-accent">
                  <ArrowRight size={12} weight="bold" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden /> {p.link}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <div className="border-t border-border">
        <FlightRoute />
      </div>

      <Instruments />

      {/* ── What we do / what we don't ───────────────────────── */}
      <section className="border-t border-border">
        <Reveal className="mx-auto grid grid-cols-1 max-w-[1320px] gap-5 px-5 py-24 sm:px-8 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:py-32">
          <p className="annot pt-1.5 text-fg-subtle">What Aviant does</p>
          <p className="max-w-[60ch] text-lg text-fg-muted md:text-xl">
            Student pilots study alone most of the week, and the oral is the part nobody can cram from a book. Aviant gives you a CFI who
            explains things out loud and an examiner who asks the follow-up you were hoping to avoid. It keeps track of what you know, what
            you keep missing, and how many days you have left.
          </p>
        </Reveal>
      </section>
      <section className="border-t border-border">
        <Reveal className="mx-auto max-w-[1320px] px-5 py-24 text-center sm:px-8 md:py-32">
          <h2 className="mx-auto font-display text-3xl tracking-[-0.015em] md:text-4xl">We don&rsquo;t sign you off.</h2>
          <p className="mx-auto mt-6 max-w-[56ch] text-fg-muted">
            Only your CFI can endorse you, and only an examiner can pass you. Aviant gets you ready for both. Every answer cites the
            regulation, the AIM, or the handbook it came from, and when the material doesn&rsquo;t cover something, it says so instead of
            guessing.
          </p>
        </Reveal>
      </section>

      {/* ── Demo ─────────────────────────────────────────────── */}
      <section id="demo" className="scroll-mt-16 border-t border-border px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal>
            <p className="annot text-fg-subtle">Try it now</p>
            <h2 className="mt-5 font-display text-3xl tracking-[-0.015em] md:text-4xl">Face the examiner. No account needed.</h2>
            <p className="mt-5 max-w-[44ch] text-fg-muted">
              A real question from the Private Pilot oral. Answer it the way you would on checkride day, and Aviant grades you against
              the ACS key points.
            </p>
            <dl className="mt-10 max-w-md text-sm">
              {[
                ["Area", "I · Preflight Preparation"],
                ["Task", "B · Airworthiness Requirements"],
                ["Graded on", "ACS knowledge elements"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[120px_1fr] gap-4 border-t border-border py-3 last:border-b">
                  <dt className="annot pt-0.5 text-fg-subtle">{k}</dt>
                  <dd className="text-fg">{v}</dd>
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
      <section id="pricing" className="scroll-mt-16 border-t border-border px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-[1320px]">
          <Reveal>
            <SectionHead label="Pricing" title="Free while we're in beta.">
              Full access, no card required. Paid plans arrive after launch, and beta pilots will hear first.
            </SectionHead>
          </Reveal>
          <div className="mt-14 border-t border-border-strong">
            {PLANS.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 0.06}
                className="grid grid-cols-1 gap-6 border-b border-border py-9 md:grid-cols-[180px_minmax(0,4fr)_minmax(0,6fr)_auto] md:gap-10"
              >
                <p className={`annot pt-1.5 ${p.cta ? "text-accent" : "text-fg-subtle"}`}>{p.status}</p>
                <div>
                  <h3 className="font-display text-xl">{p.name}</h3>
                  <p className="mt-3 flex items-baseline gap-2">
                    <span className={`font-display text-4xl ${p.cta ? "text-fg" : "text-fg-subtle"}`}>{p.price}</span>
                    <span className="text-fg-subtle">{p.note}</span>
                  </p>
                </div>
                <ul className="grid grid-cols-1 content-start gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-sm ${p.cta ? "text-fg" : "text-fg-muted"}`}>
                      <Check size={14} weight="bold" className={`mt-1 shrink-0 ${p.cta ? "text-accent" : "text-fg-subtle"}`} aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="md:justify-self-end">
                  {p.cta ? (
                    <Link href={p.cta.href} className={cta.primary("w-full md:w-auto")}>
                      {p.cta.label}
                      <ArrowRight size={14} weight="bold" aria-hidden />
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
      <section id="faq" className="scroll-mt-16 border-t border-border px-5 py-28 sm:px-8 sm:py-36">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="annot text-fg-subtle">FAQ</p>
            <h2 className="mt-5 font-display text-3xl tracking-[-0.015em] md:text-4xl">Questions, answered.</h2>
          </div>
          <div className="border-t border-border-strong">
            {FAQ.map((f) => (
              <details key={f.q} className="group border-b border-border">
                <summary className="flex min-h-16 cursor-pointer list-none items-baseline gap-5 py-6 text-lg text-fg transition-colors hover:text-fg-muted [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">{f.q}</span>
                  <Plus size={16} className="shrink-0 self-center text-fg-subtle transition-transform duration-300 group-open:rotate-45" aria-hidden />
                </summary>
                <p className="pb-7 text-fg-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <RunwayFinale />
    </>
  );
}
