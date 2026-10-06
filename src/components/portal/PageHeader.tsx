import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-2 text-sm uppercase tracking-[0.14em] text-green">{eyebrow}</p>}
        <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-tight">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-fg-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
