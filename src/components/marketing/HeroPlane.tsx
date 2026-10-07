"use client";

import type { MotionValue } from "motion/react";
import dynamic from "next/dynamic";

// WebGL only runs in the browser.
const Scene = dynamic(() => import("./HeroPlaneScene"), { ssr: false });

export function HeroPlane({ progress }: { progress?: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Scene progress={progress} />
    </div>
  );
}
