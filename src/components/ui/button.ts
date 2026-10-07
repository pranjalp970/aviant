import clsx from "clsx";

type Variant = "primary" | "dark" | "glass" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[12px] font-medium transition-[background-color,color,transform,box-shadow] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-lime text-on-accent hover:bg-white",
  dark: "bg-fg text-bg hover:bg-fg/85",
  glass: "border border-border-strong text-fg hover:border-fg/40 hover:bg-surface-strong",
  ghost: "text-fg-muted hover:bg-surface-strong hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6 text-base",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  clsx(base, variants[variant], sizes[size], className);
