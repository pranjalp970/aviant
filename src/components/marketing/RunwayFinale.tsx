"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { buttonClass } from "@/components/ui/button";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/** Closing call to action on a runway whose centerline rushes past as you scroll. */
export function RunwayFinale() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const dash = useTransform(scrollYProgress, [0, 1], ["0px", "1800px"]);
  const tilt = useTransform(scrollYProgress, [0.2, 0.8], [74, 66]);
  const lift = useTransform(scrollYProgress, [0.1, 0.55], [60, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden px-5 pt-28 sm:px-8 sm:pt-36">
      <motion.div style={reduced ? undefined : { y: lift }} className="relative z-10 mx-auto max-w-[1320px] text-center">
        <p className="annot text-fg-subtle">Rwy 27 · wind 270 at 8 · cleared</p>
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.98] tracking-[-0.02em]">
          Cleared for takeoff.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-fg-muted">Start talking to your AI CFI in under a minute. Free while Aviant is in beta.</p>
        <Link href="/signup" className={buttonClass("primary", "lg", "mt-9")}>
          Create your free account
          <ArrowRight size={16} weight="bold" aria-hidden />
        </Link>
      </motion.div>

      {/* the view from the hold-short line: threshold bars underfoot, centerline running to the horizon */}
      <div aria-hidden className="relative mx-auto mt-4 h-[46vh] max-w-[1320px] overflow-hidden [perspective:640px] [perspective-origin:50%_-20%] sm:h-[54vh]">
        <motion.div
          style={reduced ? { rotateX: 64 } : { rotateX: tilt }}
          className="runway absolute bottom-0 left-1/2 h-[240%] w-[min(620px,88vw)] -translate-x-1/2 origin-bottom"
        >
          <motion.div
            style={reduced ? undefined : { backgroundPositionY: dash }}
            className="runway-centerline absolute bottom-[30%] left-1/2 top-0 w-[2%] -translate-x-1/2"
          />
          <span className="absolute bottom-[12%] left-1/2 -translate-x-1/2 font-display text-[clamp(5rem,12vw,9rem)] leading-none text-white/75">27</span>
          <div className="absolute inset-x-[7%] bottom-[2%] flex h-[7%] justify-between">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-full w-[6.5%] bg-white/70" />
            ))}
          </div>
        </motion.div>
        {/* far end fades into the dark */}
        <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-bg via-bg/70 to-transparent" />
      </div>
    </section>
  );
}
