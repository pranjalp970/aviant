import clsx from "clsx";

type Variant = "primary" | "dark" | "glass" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[12px] font-medium active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-green text-on-accent",
  dark: "bg-fg text-bg",
  glass: "border border-border-strong text-fg",
  ghost: "text-fg-muted",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  clsx(base, variants[variant], sizes[size], className);
