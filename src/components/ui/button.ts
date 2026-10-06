import clsx from "clsx";

type Variant = "primary" | "dark" | "glass" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,transform,box-shadow] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary: "bg-lime text-on-accent hover:bg-white",
  dark: "btn-glow bg-black text-fg shadow-[0_0_30px_-8px_rgba(135,218,129,0.55)] hover:shadow-[0_0_40px_-6px_rgba(135,218,129,0.8)]",
  glass: "glass text-fg hover:bg-surface-strong",
  ghost: "text-fg-muted hover:bg-surface-strong hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6 text-base",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  clsx(base, variants[variant], sizes[size], className);
