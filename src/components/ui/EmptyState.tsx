import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";
import { buttonClass } from "./button";

/**
 * What a section shows before there's anything in it: what will appear here,
 * why it's empty, and the one action that fills it.
 */
export function EmptyState({
  icon: Glyph,
  title,
  children,
  action,
  secondary,
  level = 2,
}: {
  icon: Icon;
  title: string;
  children: React.ReactNode;
  action?: { href: string; label: string };
  secondary?: { href: string; label: string };
  /** Heading level for the title, so it fits the page outline. */
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <div className="rounded-ui border border-dashed border-border-strong px-6 py-10 sm:px-10 sm:py-12">
      <Glyph size={28} className="text-accent" aria-hidden />
      <Heading className="mt-5 font-display text-xl">{title}</Heading>
      <div className="mt-2 max-w-[52ch] text-fg-muted">{children}</div>
      {(action || secondary) && (
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {action && (
            <Link href={action.href} className={buttonClass("primary")}>
              {action.label}
            </Link>
          )}
          {secondary && (
            <Link href={secondary.href} className={buttonClass("ghost")}>
              {secondary.label}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
