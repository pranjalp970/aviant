import clsx from "clsx";

/** Marketing calls to action: small mono caps, as on an instrument placard. */
export const cta = {
  /** Filled, tinted with the accent. One per view. */
  primary: (className?: string) =>
    clsx("annot inline-flex h-12 items-center justify-center gap-2.5  border border-green/40 bg-green/15 px-6 text-fg", className),
  /** Outline marked only by its four corners. */
  bracket: (className?: string) => clsx("annot bracket inline-flex h-12 items-center justify-center gap-2.5 px-6 text-fg", className),
};
