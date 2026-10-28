import clsx from "clsx";

type Variant = "primary" | "dark" | "glass" | "ghost";
type Size = "md" | "lg";

/**
 * One button system for the whole site (HIG buttons.md): a filled accent button for the single
 * most likely action in a view, an outline for alternatives, and plain text for low-emphasis
 * actions. Every style has hover and press states.
 */
const base =
  "inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-ui font-medium transition-[background-color,border-color,color,opacity] duration-150 active:opacity-75 disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-green text-on-accent hover:bg-green/88",
  dark: "bg-fg text-bg hover:bg-fg/88",
  glass: "border border-border-strong text-fg hover:border-fg/35 hover:bg-surface-strong",
  ghost: "text-fg-muted hover:bg-surface-strong hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  clsx(base, variants[variant], sizes[size], className);
