"use client";

import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { buttonClass } from "@/components/ui/button";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";
import { HeroPlane } from "./HeroPlane";

const STATEMENT =
  "Checkride prep shouldn't wait for your instructor's schedule. Aviant is an examiner on demand: it asks the hard questions, grades you against the ACS, and explains every answer until it sticks.";

const pad = (n: number, len: number) => String(Math.round(n)).padStart(len, "0");

function Readout({ label, value, unit }: { label: string; value: MotionValue<string> | string; unit?: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-fg-subtle">{label}</span>
      <motion.span className="tabular-nums text-fg">{value}</motion.span>
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
    <>
      <p className="annot flex items-center gap-3 text-accent">
        <span className="h-px w-8 bg-current" aria-hidden />
        AI flight instructor &amp; examiner
      </p>
      <h1 className="mt-6 font-display text-[clamp(3.1rem,8.6vw,7.6rem)] leading-[0.94] tracking-[-0.025em]">
        Train smarter.
        <br />
        <span className="text-accent">Fly better.</span>
      </h1>
      <p className="mt-8 max-w-[420px] text-[1.075rem] leading-relaxed text-fg-muted">
        Talk through your private pilot oral with a voice CFI, face a by-the-book examiner, and follow a study plan built around your test
        dates.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <Link href="/signup" className={buttonClass("primary", "lg")}>
          Start training free
          <ArrowRight size={16} weight="bold" aria-hidden />
        </Link>
        <Link href="#demo" className={buttonClass("glass", "lg")}>
          Try a sample question
        </Link>
      </div>
    </>
  );
}

/**
 * Pinned opening. While it's pinned the plane climbs out of frame, the
 * instruments tick up, and the mission statement fills in word by word.
 * `backdrop` is server-rendered chart line-work (contours, compass rose).
 */
export function HeroFlight({ rose, contours, border }: { rose: ReactNode; contours: ReactNode; border: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 });

  const copyOpacity = useTransform(p, [0.1, 0.32], [1, 0]);
  const copyY = useTransform(p, [0.05, 0.36], [0, -80]);
  const roseRotate = useTransform(p, [0, 1], [0, -48]);
  const roseScale = useTransform(p, [0, 0.6], [1, 1.25]);
  const contourY = useTransform(p, [0, 1], ["0%", "-12%"]);
  const statementOpacity = useTransform(p, [0.36, 0.46], [0, 1]);
  const statementY = useTransform(p, [0.36, 0.5], [40, 0]);
  const cueOpacity = useTransform(p, [0, 0.06], [1, 0]);

  const alt = useTransform(p, [0, 0.12, 0.6, 1], [0, 0, 4500, 5500], { clamp: true });
  const altText = useTransform(alt, (v) => pad(v, 5));
  const hdgText = useTransform(p, (v) => pad(274 + Math.min(1, Math.max(0, (v - 0.04) / 0.2)) * 36, 3) + "°");
  const iasText = useTransform(p, (v) => pad(v < 0.03 ? 0 : Math.min(110, 62 + v * 140), 3));
  const phaseText = useTransform(p, (v): string => (v < 0.04 ? "Preflight" : v < 0.18 ? "Takeoff" : v < 0.5 ? "Climb" : "Cruise"));

  const words = STATEMENT.split(" ");

  if (reduced) {
    return (
      <>
        <section className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 text-fg/[0.07]">{contours}</div>
          <div className="relative mx-auto flex min-h-dvh max-w-[1320px] flex-col justify-end px-5 pb-20 pt-32 sm:px-8">
            <HeroPlane />
            <div className="relative">
              <HeroCopy />
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-[1320px] px-5 py-28 sm:px-8">
          <p className="max-w-[920px] font-display text-[clamp(1.8rem,3.6vw,2.9rem)] leading-[1.18]">{STATEMENT}</p>
        </section>
      </>
    );
  }

  return (
    <section ref={ref} className="relative h-[290vh]">
      <div className="sticky top-0 isolate h-dvh overflow-hidden">
        {/* chart line-work */}
        <motion.div style={{ y: contourY }} className="pointer-events-none absolute inset-x-0 -top-[5%] -z-20 h-[120%] text-fg/[0.075]">
          {contours}
        </motion.div>
        {/* compass rose centred on the plane's parking spot */}
        <div className="pointer-events-none absolute left-[62%] top-[24%] -z-10 aspect-square w-[min(120vw,80vh)] -translate-x-1/2 -translate-y-1/2 md:left-[75%] md:top-[38%] md:w-[min(56vw,88vh)]">
          <motion.div style={{ rotate: roseRotate, scale: roseScale }} className="size-full text-fg/[0.11]">
            {rose}
          </motion.div>
        </div>
        <div className="pointer-events-none absolute inset-3 -z-10 text-fg/20 sm:inset-5">{border}</div>

        <HeroPlane progress={p} />

        {/* opening copy */}
        <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative mx-auto flex h-full max-w-[1320px] flex-col justify-end px-5 pb-[17vh] sm:px-8 md:pb-[15vh]">
          <HeroCopy />
        </motion.div>

        {/* mission statement, revealed while the plane climbs away */}
        <motion.div style={{ opacity: statementOpacity, y: statementY }} className="pointer-events-none absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8">
            <p className="annot mb-8 text-fg-subtle">Why Aviant</p>
            <p className="max-w-[980px] font-display text-[clamp(1.75rem,3.7vw,3.1rem)] leading-[1.16] tracking-[-0.01em]">
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

        {/* instrument strip */}
        <div className="annot pointer-events-none absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="flex flex-wrap gap-x-6 gap-y-1" aria-hidden>
              <Readout label="Alt" value={altText} unit="ft" />
              <Readout label="Hdg" value={hdgText} />
              <span className="hidden sm:contents">
                <Readout label="Ias" value={iasText} unit="kt" />
              </span>
              <span className="hidden md:contents">
                <Readout label="Phase" value={phaseText} />
              </span>
            </div>
            <motion.p style={{ opacity: cueOpacity }} className="hidden items-center gap-2 whitespace-nowrap text-fg-subtle sm:flex">
              Scroll to depart
              <ArrowDown size={13} aria-hidden className="animate-bounce" />
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
