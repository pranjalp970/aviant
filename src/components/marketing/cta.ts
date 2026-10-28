import clsx from "clsx";

/**
 * Marketing calls to action: the same filled / outline pair as the app's buttons, set in small
 * mono capitals like an instrument placard. One filled button per view.
 */
const base =
  "annot inline-flex h-12 cursor-pointer select-none items-center justify-center gap-2.5 px-6 transition-[background-color,border-color,color,opacity] duration-150 active:opacity-75";

export const cta = {
  /** Filled with the accent: the one action this view is for. */
  primary: (className?: string) => clsx(base, "bg-green text-on-accent hover:bg-green/88", className),
  /** Hairline outline, for persistent or secondary actions (header, pricing rows). */
  outline: (className?: string) => clsx(base, "border border-border-strong text-fg hover:border-fg/35 hover:bg-surface-strong", className),
  /** Outline marked only by its four corners: the secondary action beside a filled one. */
  bracket: (className?: string) => clsx(base, "bracket text-fg hover:bg-surface-strong", className),
};
