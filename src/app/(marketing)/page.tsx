import { ArrowRight, BookOpenText, Check, ListChecks, Microphone, Sparkle, Waveform } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PlaneMark } from "@/components/brand/Logo";
import { DemoWidget } from "@/components/marketing/DemoWidget";
import { HeroPlane } from "@/components/marketing/HeroPlane";
import { ScrollRevealText } from "@/components/marketing/ScrollRevealText";
import { buttonClass } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const TOPICS = [
  "Airspace",
  "Weather",
  "Regulations",
  "Aerodynamics",
  "Systems",
  "Cross-country",
  "Human factors",
  "Emergency ops",
  "Night ops",
  "Holding",
  "Approaches",
  "Lost comms",
];

const STEPS = [
  {
    n: "01",
    title: "Pick your checkride",
    body: "Choose Private Pilot or Instrument. Aviant maps every session to the Airman Certification Standards for that rating.",
  },
  {
    n: "02",
    title: "Talk it through",
    body: "Study with a patient voice CFI in Teach mode, then flip to Examine and face a DPE-style oral that probes until you really know it.",
  },
  {
    n: "03",
    title: "Close the gaps",
    body: "Every answer is graded against ACS key points. You get a debrief, the reference to study, and a recommended next session.",
  },
];

const FAQ = [
  {
    q: "Does Aviant replace my flight instructor or examiner?",
    a: "No. Aviant is a study aid that helps you prepare between lessons. Your training, endorsements, and checkride still come from an authorized CFI and an FAA-designated pilot examiner.",
  },
  {
    q: "Which ratings are supported?",
    a: "Private Pilot (Airplane) and Instrument Rating (Airplane) at launch. Commercial and CFI are on the roadmap.",
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

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[calc(100dvh-120px)] flex-col items-center justify-center px-5 pb-16 pt-10 text-center sm:min-h-[760px]">
        <HeroPlane />
        <span className="glass mb-7 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] uppercase tracking-[0.16em] text-fg">
          <Sparkle size={13} weight="fill" className="text-accent" aria-hidden />
          AI CFI + DPE for student pilots
        </span>
        <h1 className="font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.98] tracking-[-0.02em] [text-wrap:balance]">
          <span className="text-iridescent block">Train smarter.</span>
          <span className="text-iridescent block">Fly better.</span>
        </h1>
        <p className="mt-7 max-w-[560px] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-relaxed text-fg/85">
          A voice-first AI flight instructor and examiner. Rehearse your checkride oral, drill ACS-aligned questions, and walk in on
          checkride day already knowing what&rsquo;s coming.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/signup" className={buttonClass("dark", "lg")}>
            Start training free
            <span className="grid size-6 place-items-center rounded-full border border-white/25">
              <ArrowRight size={12} weight="bold" aria-hidden />
            </span>
          </Link>
          <Link href="#demo" className={buttonClass("glass", "lg")}>
            <Microphone size={18} className="text-accent" aria-hidden />
            Try a sample question
          </Link>
        </div>
      </section>

      {/* ── Topic marquee (stands in for the reference's logo row) ── */}
      <div className="fade-x overflow-hidden border-y border-border py-6" aria-label="Topics covered">
        <ul className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 motion-reduce:animate-none">
          {[...TOPICS, ...TOPICS].map((t, i) => (
            <li key={i} aria-hidden={i >= TOPICS.length} className="flex items-center gap-10 whitespace-nowrap font-display text-xl text-fg-subtle">
              {t}
              <PlaneMark className="h-2.5 w-auto text-green/50" />
            </li>
          ))}
        </ul>
      </div>

      {/* ── 001 Mission ──────────────────────────────────────── */}
      <section className="px-5 py-28 text-center sm:py-36">
        <SectionLabel index="001">Why Aviant</SectionLabel>
        <ScrollRevealText
          className="mx-auto mt-8 max-w-[880px] font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.18] tracking-[-0.01em] text-fg"
          text="Checkride prep shouldn't depend on when your instructor is free. Aviant gives every student pilot an examiner on demand: one that asks the hard questions, grades you against the ACS, and explains every answer until it sticks."
        />
      </section>

      {/* ── 002 How it works ─────────────────────────────────── */}
      <section id="how" className="scroll-mt-28 px-5 pb-28 sm:px-10">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionLabel index="002">How it works</SectionLabel>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] leading-tight">From first lesson to checkride, in three moves</h2>
        </div>
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} as="li" delay={i * 0.08} className="card h-full p-7">
              <span className="font-display text-sm text-green">{s.n}</span>
              <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-fg-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── 003 Product ──────────────────────────────────────── */}
      <section id="product" className="scroll-mt-28 px-5 pb-28 sm:px-10">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionLabel index="003">The product</SectionLabel>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] leading-tight">Everything you need to pass the oral and the written</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-6">
          {/* Voice assistant — hero card */}
          <Reveal className="md:col-span-4">
            <article className="card relative h-full overflow-hidden p-7 sm:p-9">
              <div className="flex items-center gap-2 text-sm text-green">
                <Microphone size={16} weight="fill" aria-hidden /> Voice CFI &amp; DPE
              </div>
              <h3 className="mt-4 max-w-md font-display text-3xl leading-tight">One voice. Two modes. Teach, then examine.</h3>
              <p className="mt-3 max-w-md text-fg-muted">
                Ask your CFI anything out loud. When you&rsquo;re ready, flip the switch and the same assistant becomes a by-the-book examiner.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="inline-flex rounded-full border border-border-strong bg-inset p-1 text-sm" aria-hidden>
                  <span className="rounded-full px-4 py-2 text-fg-muted">Teach · CFI</span>
                  <span className="rounded-full bg-lime px-4 py-2 font-medium text-on-accent">Examine · DPE</span>
                </div>
                <div className="flex h-12 flex-1 items-center gap-[3px]" aria-hidden>
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-[3px] flex-1 rounded-full bg-gradient-to-t from-green/40 to-lime"
                      style={{ height: `${18 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 82}%` }}
                    />
                  ))}
                </div>
              </div>
            </article>
          </Reveal>

          {/* Debrief */}
          <Reveal className="md:col-span-2" delay={0.06}>
            <article className="card h-full p-7">
              <div className="flex items-center gap-2 text-sm text-green">
                <Waveform size={16} weight="fill" aria-hidden /> Graded debriefs
              </div>
              <h3 className="mt-4 font-display text-2xl leading-tight">Know exactly what you missed</h3>
              <ul className="mt-6 space-y-2 text-[15px]" aria-label="Example debrief">
                {[
                  ["Airworthiness certificate", true],
                  ["Registration", true],
                  ["Operating limitations", true],
                  ["Weight and balance", false],
                ].map(([label, ok]) => (
                  <li key={label as string} className="flex items-center gap-2">
                    <span className={`grid size-5 place-items-center rounded-full ${ok ? "bg-green text-on-green" : "border border-border-strong"}`}>
                      {ok && <Check size={11} weight="bold" aria-hidden />}
                    </span>
                    <span className={ok ? "text-fg" : "text-fg-subtle"}>{label as string}</span>
                    <span className="sr-only">{ok ? "covered" : "missed"}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Question bank */}
          <Reveal className="md:col-span-2" delay={0.04}>
            <article className="card h-full p-7">
              <div className="flex items-center gap-2 text-sm text-green">
                <ListChecks size={16} weight="bold" aria-hidden /> ACS question bank
              </div>
              <h3 className="mt-4 font-display text-2xl leading-tight">Organized the way the checkride is</h3>
              <p className="mt-3 text-fg-muted">Browse by Area of Operation and Task, with explanations and references on every answer.</p>
            </article>
          </Reveal>

          {/* Quizzes */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <article className="card h-full p-7">
              <div className="flex items-center gap-2 text-sm text-green">
                <Sparkle size={16} weight="fill" aria-hidden /> Mock knowledge tests
              </div>
              <h3 className="mt-4 font-display text-2xl leading-tight">Written-test style, with a score report</h3>
              <div className="mt-6 flex items-center gap-4" aria-hidden>
                <div className="relative grid size-16 place-items-center rounded-full bg-[conic-gradient(var(--green)_0_84%,var(--track)_84%_100%)]">
                  <div className="absolute inset-[5px] rounded-full bg-card-solid" />
                  <span className="relative font-display text-lg">84</span>
                </div>
                <p className="text-sm text-fg-muted">Sample score after a 12-question PPL set</p>
              </div>
            </article>
          </Reveal>

          {/* Study guides */}
          <Reveal className="md:col-span-2" delay={0.12}>
            <article className="card h-full p-7">
              <div className="flex items-center gap-2 text-sm text-green">
                <BookOpenText size={16} weight="fill" aria-hidden /> Study guides
              </div>
              <h3 className="mt-4 font-display text-2xl leading-tight">Short lessons for every area</h3>
              <p className="mt-3 text-fg-muted">Ten-minute reads with tables, memory aids, and the regs behind them.</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ── 004 Demo ─────────────────────────────────────────── */}
      <section id="demo" className="scroll-mt-28 px-5 pb-28 sm:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel index="004">Try it now</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-tight">Face the examiner. No account needed.</h2>
            <p className="mt-4 max-w-md text-fg-muted">
              This is a real question from the Private Pilot oral. Answer it the way you would on checkride day, and Aviant grades you
              against the ACS key points.
            </p>
          </div>
          <DemoWidget />
        </div>
      </section>

      {/* ── 005 Pricing ──────────────────────────────────────── */}
      <section id="pricing" className="scroll-mt-28 px-5 pb-28 sm:px-10">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionLabel index="005">Pricing</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-tight">Free while we&rsquo;re in beta</h2>
          <p className="mt-3 max-w-lg text-fg-muted">Full access, no card required. Paid plans arrive after launch, and beta pilots will hear first.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            {
              name: "Student Pilot",
              price: "Free",
              note: "during beta",
              featured: true,
              features: ["Voice CFI & DPE, both modes", "Private Pilot + Instrument content", "ACS question bank", "Mock knowledge tests", "Study guides"],
              cta: { href: "/signup", label: "Start training free" },
            },
            {
              name: "Checkride Pro",
              price: "Soon",
              note: "after launch",
              features: ["Unlimited mock orals", "Full-length timed knowledge tests", "Checkride readiness reports", "Priority voice"],
            },
            {
              name: "Flight Schools",
              price: "Soon",
              note: "per seat",
              features: ["Student seats & cohorts", "Instructor dashboards", "Progress sharing with CFIs", "Custom syllabus mapping"],
            },
          ].map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col rounded-[28px] p-8 ${p.featured ? "border border-green/40 bg-gradient-to-b from-green/10 to-transparent" : "card"}`}
            >
              {p.featured && (
                <span className="absolute right-6 top-6 rounded-full bg-lime px-3 py-1 text-xs font-medium text-on-accent">Available now</span>
              )}
              <h3 className="font-display text-xl">{p.name}</h3>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl">{p.price}</span>
                <span className="text-fg-subtle">{p.note}</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] text-fg-muted">
                    <Check size={16} weight="bold" className={`mt-1 shrink-0 ${p.featured ? "text-green" : "text-fg-subtle"}`} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              {p.cta ? (
                <Link href={p.cta.href} className={buttonClass("primary", "md", "mt-8 w-full")}>
                  {p.cta.label}
                </Link>
              ) : (
                <span className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-full border border-border text-[15px] text-fg-subtle">
                  Coming after launch
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ── 006 FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="scroll-mt-28 px-5 pb-28 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel index="006">FAQ</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-tight">Questions, answered</h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {FAQ.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg text-fg transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="relative size-4 shrink-0" aria-hidden>
                    <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-200 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-fg-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="px-5 pb-24 sm:px-10">
        <div className="relative overflow-hidden rounded-[32px] border border-border-strong bg-gradient-to-br from-green/15 via-black to-lime/10 px-6 py-20 text-center">
          <PlaneMark className="mx-auto mb-8 h-10 w-auto text-accent" />
          <h2 className="mx-auto max-w-2xl font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.05]">
            Your checkride, <span className="text-iridescent">rehearsed.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-fg-muted">Start talking to your AI CFI in under a minute. Free during beta.</p>
          <Link href="/signup" className={buttonClass("primary", "lg", "mt-9")}>
            Create your free account
            <ArrowRight size={16} weight="bold" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
