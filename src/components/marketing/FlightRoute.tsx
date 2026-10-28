"use client";

import { Check, Microphone, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { motion, useScroll, useSpring, type Variants } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { PlaneMark } from "@/components/brand/Logo";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const list: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } };
const item: Variants = { hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };
const bar: Variants = { hidden: { scaleX: 0 }, shown: { scaleX: 1, transition: { duration: 0.9, ease: EASE } } };

function Panel({ title, meta, children }: { title: string; meta?: ReactNode; children: ReactNode }) {
  return (
    <motion.div
      variants={list}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.35 }}
      className="overflow-hidden border border-border-strong bg-bg-elevated"
    >
      <div className="annot flex items-center justify-between gap-4 border-b border-border px-5 py-3 text-fg-subtle">
        <span>{title}</span>
        <span className="shrink-0 whitespace-nowrap">{meta}</span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </motion.div>
  );
}

const WEEKS = [
  ["Wk 1", "Regulations · airspace", 0.55],
  ["Wk 2", "Weather theory", 0.9],
  ["Wk 3", "Weather services", 1],
  ["Wk 4", "Navigation · charts", 0.8],
  ["Wk 5", "Performance · W&B", 0.6],
  ["Wk 6", "Final review · 2 mocks", 0.7],
] as const;

function PlanVignette() {
  return (
    <Panel title="Study plan · PPL written" meta={<span className="bg-green/15 px-2 py-0.5 text-accent">On track</span>}>
      <ul className="space-y-2.5">
        {WEEKS.map(([wk, label, w], i) => (
          <motion.li key={wk} variants={item} className="grid grid-cols-[44px_1fr] items-center gap-3 text-sm">
            <span className="annot text-fg-subtle">{wk}</span>
            <div className="relative h-8 overflow-hidden bg-surface-strong">
              <motion.div
                variants={bar}
                style={{ width: `${w * 100}%` }}
                className={clsx("absolute inset-y-0 left-0 origin-left ", i === 2 ? "bg-green" : "bg-fg/10")}
              />
              <span className={clsx("relative flex h-full items-center px-3", i === 2 ? "text-on-accent" : "text-fg-muted")}>{label}</span>
            </div>
          </motion.li>
        ))}
      </ul>
      <motion.div variants={item} className="mt-6 border-t border-border pt-5">
        <p className="annot text-fg-subtle">Today · 45 min</p>
        <ul className="mt-3 space-y-2 text-sm">
          {[
            ["Review 12 due cards", "10 min", true],
            ["New questions: weather services", "20 min", false],
            ["Teach session: METARs & TAFs", "15 min", false],
          ].map(([t, m, done]) => (
            <li key={t as string} className="flex items-center gap-3">
              <span className={clsx("grid size-5 shrink-0 place-items-center  border", done ? "border-green bg-green text-on-green" : "border-border-strong")}>
                {done && <Check size={11} weight="bold" aria-hidden />}
              </span>
              <span className={done ? "text-fg-subtle line-through" : "text-fg"}>{t as string}</span>
              <span className="annot ml-auto text-fg-subtle">{m as string}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Panel>
  );
}

function TeachVignette() {
  return (
    <Panel title="Voice CFI · Teach mode" meta={<span className="text-accent">Live</span>}>
      <div className="space-y-4 text-sm">
        <motion.div variants={item}>
          <p className="annot mb-1 text-accent">CFI</p>
          <p className="text-fg">Before you enter Class B airspace, what do you need from ATC?</p>
        </motion.div>
        <motion.div variants={item} className="ml-auto max-w-[85%] bg-surface-strong px-4 py-3">
          <p className="annot mb-1 text-fg-subtle">You</p>
          <p className="text-fg">Two-way radio contact?</p>
        </motion.div>
        <motion.div variants={item}>
          <p className="annot mb-1 text-accent">CFI</p>
          <p className="text-fg">
            That&rsquo;s enough for Class C and D. Bravo needs an explicit clearance: you have to hear &ldquo;cleared into the Class Bravo.&rdquo;
            Hearing your callsign isn&rsquo;t enough.
          </p>
        </motion.div>
      </div>
      <motion.div variants={item} className="mt-6 flex items-center gap-4 border-t border-border pt-5">
        <span className="grid size-10 shrink-0 place-items-center bg-green text-on-accent">
          <Microphone size={18} weight="fill" aria-hidden />
        </span>
        <div className="flex h-8 flex-1 items-center gap-[3px]" aria-hidden>
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="w-[3px] flex-1 origin-center animate-[eq_1.2s_ease-in-out_infinite] bg-green/70"
              style={{ height: `${Math.min(100, 28 + ((i * 37) % 53) + ((i * 11) % 19))}%`, animationDelay: `${(i % 7) * -0.17}s` }}
            />
          ))}
        </div>
      </motion.div>
    </Panel>
  );
}

function DrillVignette() {
  return (
    <Panel title="Practice test · Quick 20" meta={<span>14 / 20</span>}>
      <motion.div variants={item} className="h-1 overflow-hidden bg-surface-strong">
        <motion.div variants={bar} className="h-full w-[70%] origin-left bg-green" />
      </motion.div>
      <motion.p variants={item} className="mt-5 text-base text-fg">
        Unless otherwise authorized, Class D airspace normally extends from the surface up to
      </motion.p>
      <ul className="mt-5 space-y-2 text-sm">
        {[
          ["2,500 feet above the airport elevation", true],
          ["3,000 feet AGL", false],
          ["4,000 feet MSL", false],
        ].map(([c, ok]) => (
          <motion.li
            key={c as string}
            variants={item}
            className={clsx(
              "flex items-center gap-3  border px-4 py-3",
              ok ? "border-green/60 bg-green/10 text-fg" : "border-border text-fg-muted",
            )}
          >
            <span className={clsx("grid size-5 shrink-0 place-items-center", ok ? "bg-green text-on-green" : "border border-border-strong")}>
              {ok && <Check size={11} weight="bold" aria-hidden />}
            </span>
            {c as string}
          </motion.li>
        ))}
      </ul>
      <motion.p variants={item} className="mt-4 text-sm text-fg-muted">
        Charted in MSL on the sectional, but normally 2,500 ft above the field. <span className="annot text-fg-subtle">AIM 3-2-5</span>
      </motion.p>
    </Panel>
  );
}

function ExamVignette() {
  return (
    <Panel title="Mock oral · Examine mode" meta={<span>PA.I.B</span>}>
      <motion.p variants={item} className="font-display text-lg text-fg">
        &ldquo;Before we go, which documents need to be on board?&rdquo;
      </motion.p>
      <motion.div variants={item} className="mt-6 flex items-baseline justify-between border-t border-border pt-5">
        <p className="annot text-fg-subtle">Debrief · ACS key points</p>
        <p className="font-display text-3xl text-accent">
          75<span className="text-base text-fg-subtle">%</span>
        </p>
      </motion.div>
      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        {[
          ["Airworthiness certificate", true],
          ["Registration", true],
          ["Operating limitations", true],
          ["Weight & balance data", false],
        ].map(([t, ok]) => (
          <motion.li key={t as string} variants={item} className="flex items-center gap-2.5 border border-border px-3 py-2.5">
            {ok ? <Check size={15} weight="bold" className="text-accent" aria-label="Covered" /> : <X size={15} className="text-danger" aria-label="Missed" />}
            <span className={ok ? "text-fg" : "text-fg-muted"}>{t as string}</span>
          </motion.li>
        ))}
      </ul>
      <motion.p variants={item} className="mt-5 border-l-2 border-green/60 pl-4 text-sm italic text-fg-muted">
        Follow-up: &ldquo;Where in the POH would I find this airplane&rsquo;s weight and balance?&rdquo;
      </motion.p>
    </Panel>
  );
}

const MASTERY = [
  ["Regulations", 0.92],
  ["Airspace", 0.88],
  ["Weather", 0.81],
  ["Navigation", 0.86],
  ["Aircraft systems", 0.9],
] as const;

function ReadyVignette() {
  return (
    <Panel title="Aviant Ready · Written" meta={<span>Oct 2026</span>}>
      <div className="flex items-start justify-between gap-6">
        <motion.div variants={item}>
          <p className="annot text-fg-subtle">Predicted score</p>
          <p className="mt-1 font-display text-6xl leading-none text-fg">88</p>
          <p className="mt-2 text-sm text-fg-muted">Last two mocks: 89% · 91%</p>
        </motion.div>
        <motion.div
          variants={item}
          className="grid size-24 shrink-0 rotate-[-8deg] place-items-center border-2 border-dashed border-green/70 text-accent"
        >
          <div className="text-center">
            <PlaneMark className="mx-auto h-4 w-auto" />
            <p className="annot mt-1.5">Ready</p>
          </div>
        </motion.div>
      </div>
      <ul className="mt-6 space-y-3 border-t border-border pt-5">
        {MASTERY.map(([t, v]) => (
          <motion.li key={t} variants={item} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 text-sm">
            <span className="text-fg-muted">{t}</span>
            <span className="annot tabular-nums text-fg">{Math.round(v * 100)}%</span>
            <div className="col-span-2 h-1 overflow-hidden bg-surface-strong">
              <motion.div variants={bar} style={{ width: `${v * 100}%` }} className="h-full origin-left bg-green" />
            </div>
          </motion.li>
        ))}
      </ul>
    </Panel>
  );
}

const PHASES = [
  {
    fix: "PRFLT",
    phase: "Preflight",
    title: "A plan built around your dates",
    body: "Tell Aviant when your written and checkride are, take a ten-minute diagnostic, and get a daily plan that spends more time where you're weakest. It re-plans as you study.",
    vignette: <PlanVignette />,
  },
  {
    fix: "DEPRT",
    phase: "Departure",
    title: "Learn it out loud",
    body: "Teach mode is a patient voice CFI. Ask anything, hear it explained in plain language, and get quizzed until it sticks.",
    vignette: <TeachVignette />,
  },
  {
    fix: "CRUZE",
    phase: "Cruise",
    title: "Drill the knowledge test",
    body: "306 practice questions across every area, drawn fresh each attempt with shuffled answers. The ones you miss come back on a spaced-repetition schedule.",
    vignette: <DrillVignette />,
  },
  {
    fix: "APRCH",
    phase: "Approach",
    title: "Face the examiner",
    body: "Examine mode asks scenario-based oral questions like a DPE, follows up on weak answers, and grades every response against the ACS key points.",
    vignette: <ExamVignette />,
  },
  {
    fix: "TCHDN",
    phase: "Touchdown",
    title: "Walk in ready",
    body: "Your readiness and predicted written score tell you when you're actually prepared. Clear the bar and earn an Aviant Ready certificate to show your CFI.",
    vignette: <ReadyVignette />,
  },
];

/** "How it works" told as a route: a pinned flight log on the left, one phase per screen on the right. */
export function FlightRoute() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.5", "end 0.6"] });
  const drawn = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="route" ref={ref} className="relative scroll-mt-16">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-x-16 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Pinned flight log */}
        <div className="pt-28 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-center lg:pt-0">
          <p className="annot text-fg-subtle">How it works</p>
          <h2 className="mt-5 max-w-md font-display text-3xl tracking-[-0.015em] md:text-4xl">
            From first lesson to checkride day.
          </h2>

          <ol className="relative mt-12 hidden lg:block" aria-label="Phases">
            {/* route line: dashed when planned, solid where you've flown */}
            <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px border-l border-dashed border-fg/20" />
            <motion.span aria-hidden style={{ scaleY: reduced ? 1 : drawn }} className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-green" />
            {PHASES.map((p, i) => (
              <li key={p.fix} className="relative flex items-center gap-5 py-3">
                <span
                  aria-hidden
                  className={clsx(
                    "relative z-10 grid size-[15px] place-items-center rotate-45 border transition-colors duration-500",
                    i <= active ? "border-green bg-green" : "border-fg/30 bg-bg",
                  )}
                />
                <span className={clsx("annot w-14 transition-colors duration-500", i === active ? "text-accent" : "text-fg-subtle")}>{p.fix}</span>
                <span className={clsx("text-base transition-colors duration-500", i === active ? "text-fg" : "text-fg-subtle")}>{p.phase}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Phases */}
        <div className="pb-16 lg:pb-[20vh]">
          {PHASES.map((p, i) => (
            <motion.article
              key={p.fix}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.55 }}
              className="flex flex-col justify-center border-l border-border py-14 pl-6 sm:pl-10 lg:min-h-[92vh] lg:border-0 lg:py-20 lg:pl-0"
            >
              <p className="annot flex items-center gap-3 text-accent">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <span className="h-px w-6 bg-current" aria-hidden />
                <span>{p.phase}</span>
              </p>
              <h3 className="mt-4 font-display text-xl md:text-2xl">{p.title}</h3>
              <p className="mt-3 max-w-lg text-fg-muted">{p.body}</p>
              <div className="mt-8 max-w-[540px]">{p.vignette}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
