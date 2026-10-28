import clsx from "clsx";
import { PLANE_D, PLANE_VIEWBOX } from "./plane-path";

export function PlaneMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={`0 0 ${PLANE_VIEWBOX.width} ${PLANE_VIEWBOX.height}`}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={PLANE_D} fill="currentColor" />
    </svg>
  );
}

export function Logo({ className, withWordmark = true }: { className?: string; withWordmark?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <PlaneMark className="h-[1.1em] w-auto text-accent" />
      {withWordmark && (
        <span className="font-sans text-[1.15em] font-light leading-none tracking-[0.01em] text-accent">aviant</span>
      )}
    </span>
  );
}
