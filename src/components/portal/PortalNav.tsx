"use client";

import {
  AirplaneTakeoff,
  BookOpenText,
  Cards,
  ClockCounterClockwise,
  Gear,
  House,
  List,
  ListChecks,
  MapTrifold,
  Microphone,
  Notebook,
  SignOut,
  Timer,
  X,
  type Icon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { logout } from "@/lib/auth/actions";

type Item = { href: string; label: string; short?: string; icon: Icon; exact?: boolean };

/** Every section, grouped the way students think about their week (HIG sidebars: titled groups, two levels at most). */
const GROUPS: { title: string | null; items: Item[] }[] = [
  {
    title: null,
    items: [
      { href: "/portal", label: "Home", icon: House, exact: true },
      { href: "/portal/plan", label: "Study plan", icon: MapTrifold },
    ],
  },
  {
    title: "Practice",
    items: [
      { href: "/portal/assistant", label: "Voice CFI", short: "Voice", icon: Microphone },
      { href: "/portal/checkride", label: "Mock checkride", icon: AirplaneTakeoff },
      { href: "/portal/quizzes", label: "Quizzes", icon: Timer },
      { href: "/portal/review", label: "Review", icon: Cards },
    ],
  },
  {
    title: "Learn",
    items: [
      { href: "/portal/study", label: "Study guides", short: "Study", icon: BookOpenText },
      { href: "/portal/questions", label: "Question bank", icon: ListChecks },
    ],
  },
  {
    title: "Progress",
    items: [
      { href: "/portal/logbook", label: "Logbook", icon: Notebook },
      { href: "/portal/history", label: "History", icon: ClockCounterClockwise },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.items);
/** The five sections people use most, for the phone tab bar (HIG tab bars: five or fewer, single-word labels). */
const TABS = ["/portal", "/portal/assistant", "/portal/quizzes", "/portal/review", "/portal/study"].map((h) => ALL.find((i) => i.href === h)!);

function useActive() {
  const path = usePathname();
  return (href: string, exact?: boolean) => (exact ? path === href : path === href || path.startsWith(href + "/"));
}

function NavRow({ item, active, onNavigate }: { item: Item; active: boolean; onNavigate?: () => void }) {
  const Glyph = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "flex min-h-10 items-center gap-3 rounded-ui px-3 text-sm transition-colors duration-150",
        active ? "bg-green/10 text-fg" : "text-fg-muted hover:bg-surface-strong hover:text-fg",
      )}
    >
      <Glyph size={18} weight={active ? "fill" : "regular"} className={active ? "text-accent" : undefined} aria-hidden />
      {item.label}
    </Link>
  );
}

function NavGroups({ onNavigate }: { onNavigate?: () => void }) {
  const isActive = useActive();
  return (
    <div className="space-y-6">
      {GROUPS.map((g, gi) => (
        <div key={gi}>
          {g.title && <p className="annot mb-2 px-3 text-fg-subtle">{g.title}</p>}
          <ul className="space-y-0.5">
            {g.items.map((item) => (
              <li key={item.href}>
                <NavRow item={item} active={isActive(item.href, item.exact)} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Account({ name, ratingLabel }: { name: string; ratingLabel: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-ui bg-green/15 font-display text-accent" aria-hidden>
        {name.charAt(0).toUpperCase()}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-fg">{name}</p>
        <p className="truncate text-xs text-fg-subtle">{ratingLabel}</p>
      </div>
      <form action={logout}>
        <button
          type="submit"
          aria-label="Log out"
          title="Log out"
          className="grid size-9 cursor-pointer place-items-center rounded-ui text-fg-subtle transition-colors hover:bg-surface-strong hover:text-fg"
        >
          <SignOut size={18} aria-hidden />
        </button>
      </form>
    </div>
  );
}

export function Sidebar({ name, ratingLabel }: { name: string; ratingLabel: string }) {
  const isActive = useActive();
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-panel lg:flex print:hidden">
      <Link href="/portal" className="flex h-16 items-center px-6 text-xl" aria-label="Aviant portal home">
        <Logo />
      </Link>
      <nav aria-label="Portal" className="flex-1 overflow-y-auto px-3 pb-4 pt-4">
        <NavGroups />
      </nav>
      <div className="border-t border-border px-3 pt-3">
        <NavRow item={{ href: "/portal/settings", label: "Settings", icon: Gear }} active={isActive("/portal/settings")} />
        <Account name={name} ratingLabel={ratingLabel} />
      </div>
    </aside>
  );
}

export function MobileNav({ name, ratingLabel }: { name: string; ratingLabel: string }) {
  const isActive = useActive();
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  // While the menu is open: Escape closes it, the page behind can't scroll, and focus moves
  // into the menu, returning to the menu button when it closes.
  useEffect(() => {
    if (!open) return;
    const opener = trigger.current;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, [open]);

  const current = ALL.find((i) => isActive(i.href, i.exact)) ?? (path.startsWith("/portal/settings") ? { label: "Settings" } : null);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-bg/90 px-4 backdrop-blur-md lg:hidden print:hidden">
        <Link href="/portal" aria-label="Aviant portal home" className="text-lg">
          <Logo />
        </Link>
        <button
          ref={trigger}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="portal-menu"
          aria-label={`Open menu${current ? `, current section ${current.label}` : ""}`}
          className="annot flex h-11 cursor-pointer items-center gap-2 rounded-ui px-3 text-fg-muted transition-colors hover:text-fg"
        >
          {current?.label ?? "Menu"}
          <List size={18} aria-hidden />
        </button>
      </header>

      {open && (
        <div id="portal-menu" role="dialog" aria-modal="true" aria-label="All sections" className="fixed inset-0 z-50 flex flex-col bg-bg lg:hidden">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
            <Logo className="text-lg" />
            <button
              ref={closeBtn}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-11 cursor-pointer place-items-center rounded-ui text-fg-muted transition-colors hover:text-fg"
            >
              <X size={20} aria-hidden />
            </button>
          </div>
          <nav aria-label="Portal" className="flex-1 overflow-y-auto px-3 py-5">
            <NavGroups onNavigate={() => setOpen(false)} />
          </nav>
          <div className="border-t border-border px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-3">
            <NavRow item={{ href: "/portal/settings", label: "Settings", icon: Gear }} active={isActive("/portal/settings")} onNavigate={() => setOpen(false)} />
            <Account name={name} ratingLabel={ratingLabel} />
          </div>
        </div>
      )}

      <nav
        aria-label="Main sections"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden print:hidden"
      >
        <ul className="grid grid-cols-5">
          {TABS.map(({ href, label, short, icon: Glyph, exact }) => {
            const active = isActive(href, exact);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={clsx("flex h-16 flex-col items-center justify-center gap-1 text-xs transition-colors", active ? "text-accent" : "text-fg-subtle hover:text-fg")}
                >
                  <Glyph size={22} weight={active ? "fill" : "regular"} aria-hidden />
                  {short ?? label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
