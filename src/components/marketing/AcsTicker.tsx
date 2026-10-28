"use client";

import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { useRef } from "react";
import { PlaneMark } from "@/components/brand/Logo";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

// Areas of Operation from the Private Pilot – Airplane ACS.
const AREAS = [
  ["I", "Preflight Preparation"],
  ["II", "Preflight Procedures"],
  ["III", "Airport Operations"],
  ["IV", "Takeoffs, Landings & Go-Arounds"],
  ["V", "Performance Maneuvers"],
  ["VI", "Navigation"],
  ["VII", "Slow Flight & Stalls"],
  ["VIII", "Basic Instrument Maneuvers"],
  ["IX", "Emergency Operations"],
  ["XI", "Night Operations"],
  ["XII", "Postflight Procedures"],
];

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** A slow drift of ACS areas that speeds up, and reverses, with your scrolling. */
export function AcsTicker() {
  const reduced = useReducedMotionSafe();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const b = boost.get();
    if (b < -0.05) direction.current = -1;
    else if (b > 0.05) direction.current = 1;
    base.set(base.get() - direction.current * 0.9 * (delta / 1000) * (1 + Math.abs(b)));
  });

  const row = AREAS.map(([n, name]) => (
    <span key={n} className="flex shrink-0 items-center gap-6 pr-6">
      <span className="annot text-accent">PA.{n}</span>
      <span className="whitespace-nowrap font-display text-xl text-fg/80 md:text-2xl">{name}</span>
      <PlaneMark className="h-3 w-auto text-fg-subtle/60" />
    </span>
  ));

  return (
    <section aria-label="ACS Areas of Operation covered" className="overflow-hidden border-y border-border py-7">
      <ul className="sr-only">
        {AREAS.map(([n, name]) => (
          <li key={n}>
            Area {n}: {name}
          </li>
        ))}
      </ul>
      <motion.div aria-hidden style={{ x: reduced ? 0 : x }} className="flex w-max">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </motion.div>
    </section>
  );
}
