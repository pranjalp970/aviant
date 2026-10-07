"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/** Inertial scrolling for the marketing pages. Off for reduced motion; touch keeps native scrolling. */
export function SmoothScroll() {
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -72 } });
    return () => lenis.destroy();
  }, [reduced]);

  return null;
}
