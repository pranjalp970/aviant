import type { ReactNode } from "react";

/** Top of every portal page: a quiet label, the title, one line of context, and an optional action. */
export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="annot mb-3 text-fg-subtle">{eyebrow}</p>}
        <h1 className="font-display text-2xl tracking-[-0.01em] sm:text-3xl">{title}</h1>
        {description && <p className="mt-3 max-w-[60ch] text-fg-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
