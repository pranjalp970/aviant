"use client";

import dynamic from "next/dynamic";

// WebGL only runs in the browser; the glow keeps the hero composed while it loads.
const Scene = dynamic(() => import("./HeroPlaneScene"), { ssr: false });

export function HeroPlane() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,230,215,0.10),rgba(135,218,129,0.04)_45%,transparent_70%)] blur-2xl" />
      <Scene />
    </div>
  );
}
