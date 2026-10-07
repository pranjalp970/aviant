"use client";

import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/** Swings from the zero stop to its reading, with a little analog overshoot. */
export function GaugeNeedle({ angle, delay = 0 }: { angle: number; delay?: number }) {
  const reduced = useReducedMotionSafe();
  return (
    <motion.g
      initial={{ rotate: reduced ? angle : -135 }}
      whileInView={{ rotate: angle }}
      viewport={{ once: true, amount: 0.6 }}
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 38, damping: 7, mass: 1, delay }}
    >
      {/* invisible disc keeps the group's box centred on the pivot */}
      <circle r="86" fill="none" />
      <path d="M-2.6 14 L-1.2 -76 L0 -82 L1.2 -76 L2.6 14 Z" fill="#f4f7f2" />
      <circle r="9" fill="#1b1f1a" stroke="#3a4138" />
      <circle r="2.5" fill="#87da81" />
    </motion.g>
  );
}
