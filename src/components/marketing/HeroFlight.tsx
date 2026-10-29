"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { cta } from "./cta";
import { HeroPlane } from "./HeroPlane";

const STATEMENT =
  "Checkride prep shouldn't wait for your instructor's schedule. Aviant is a study partner on demand: it asks the hard questions, grades you against the ACS, and explains every answer until it sticks.";

const pad = (n: number, len: number) => String(Math.round(n)).padStart(len, "0");

function Readout({ label, value, unit }: { label: string; value: MotionValue<string> | string; unit?: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-fg-subtle">{label}</span>
      <motion.span className="text-fg">{value}</motion.span>
      {unit && <span className="text-fg-subtle">{unit}</span>}
    </div>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

function HeroCopy() {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="tagline">The study tool for student pilots</p>
      <h1 className="mx-auto mt-6 font-display text-4xl tracking-[-0.025em] sm:text-5xl md:text-6xl">
        Train smarter.
        <br />
        Fly better.
      </h1>
      <p className="mx-auto mt-7 max-w-[46ch] text-lg text-fg-muted">
        Practice the private pilot oral out loud, drill the knowledge test, and follow a study plan built around your test dates. Free while
        in beta.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/signup" className={cta.primary()}>
          Start training free
          <ArrowRight size={14} weight="bold" aria-hidden />
        </Link>
        <Link href="#demo" className={cta.bracket()}>
          Try a sample question
        </Link>
      </div>
    </div>
  );
}

/**
 * Pinned opening. While it's pinned the plane climbs out of frame, the compass
 * rose turns, the instruments tick up, and the mission statement fills in word
 * by word. The chart line-work comes in pre-rendered from the server.
 */
export function HeroFlight({ rose }: { rose: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 });

  const copyOpacity = useTransform(p, [0.08, 0.28], [1, 0]);
  const copyY = useTransform(p, [0.04, 0.32], [0, -70]);
  const roseRotate = useTransform(p, [0, 1], [0, -48]);
  const roseScale = useTransform(p, [0, 0.6], [1, 1.2]);
  const statementOpacity = useTransform(p, [0.34, 0.44], [0, 1]);
  const statementY = useTransform(p, [0.34, 0.48], [40, 0]);
  const cueOpacity = useTransform(p, [0, 0.06], [1, 0]);

  const alt = useTransform(p, [0, 0.1, 0.55, 1], [0, 0, 4500, 5500], { clamp: true });
  const altText = useTransform(alt, (v) => pad(v, 5));
  const hdgText = useTransform(p, (v) => pad(274 + Math.min(1, Math.max(0, (v - 0.04) / 0.2)) * 36, 3) + "°");
  const iasText = useTransform(p, (v) => pad(v < 0.03 ? 0 : Math.min(110, 62 + v * 140), 3));
  const phaseText = useTransform(p, (v): string => (v < 0.04 ? "Preflight" : v < 0.16 ? "Takeoff" : v < 0.45 ? "Climb" : "Cruise"));

  const words = STATEMENT.split(" ");

  if (reduced) {
    return (
      <>
        <section className="relative isolate overflow-hidden">
          <div className="relative mx-auto flex min-h-dvh max-w-[1320px] flex-col justify-end px-5 pb-20 pt-32 sm:px-8">
            <HeroPlane />
            <div className="relative">
              <HeroCopy />
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1320px] px-5 py-28 text-center sm:px-8">
          <p className="mx-auto max-w-[34ch] font-display text-2xl md:text-3xl">{STATEMENT}</p>
        </section>
      </>
    );
  }

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 isolate h-dvh overflow-hidden">
        {/* compass rose centred on the plane's parking spot */}
        <div className="pointer-events-none absolute left-1/2 top-[18%] -z-10 aspect-square w-[min(110vw,60vh)] md:top-[23%] -translate-x-1/2 -translate-y-1/2 md:w-[min(52vw,78vh)]">
          <motion.div style={{ rotate: roseRotate, scale: roseScale }} className="size-full text-fg/[0.1]">
            {rose}
          </motion.div>
        </div>

        <HeroPlane progress={p} />

        {/* opening copy */}
        <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative mx-auto flex h-full max-w-[1320px] flex-col justify-end px-5 pb-[15vh] sm:px-8">
          <HeroCopy />
        </motion.div>

        {/* mission statement, revealed while the plane climbs away */}
        <motion.div style={{ opacity: statementOpacity, y: statementY }} className="pointer-events-none absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1320px] px-5 text-center sm:px-8">
            <p className="annot mx-auto mb-8 text-fg-subtle">Why Aviant</p>
            <p className="mx-auto max-w-[34ch] font-display text-2xl tracking-[-0.01em] md:text-3xl lg:text-4xl">
              <span className="sr-only">{STATEMENT}</span>
              <span aria-hidden>
                {words.map((w, i) => (
                  <Word key={i} progress={p} range={[0.46 + (i / words.length) * 0.42, 0.46 + ((i + 1) / words.length) * 0.42]}>
                    {w}
                  </Word>
                ))}
              </span>
            </p>
          </div>
        </motion.div>

        {/* instrument strip + scroll cue */}
        <div className="annot pointer-events-none absolute inset-x-0 bottom-0">
          <div className="relative mx-auto flex max-w-[1320px] items-end justify-between gap-6 px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="flex flex-wrap gap-x-6 gap-y-1" aria-hidden>
              <Readout label="Alt" value={altText} unit="ft" />
              <Readout label="Hdg" value={hdgText} />
              <span className="hidden sm:contents">
                <Readout label="Ias" value={iasText} unit="kt" />
              </span>
            </div>
            <motion.div style={{ opacity: cueOpacity }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-fg-subtle sm:flex sm:bottom-8">
              Scroll
              <span aria-hidden className="h-8 w-px animate-[cue_2.2s_ease-in-out_infinite] bg-fg-subtle" />
            </motion.div>
            <div className="hidden md:block" aria-hidden>
              <Readout label="Phase" value={phaseText} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
