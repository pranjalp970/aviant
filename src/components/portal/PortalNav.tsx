"use client";

import { AirplaneTakeoff, BookOpenText, MapTrifold, Notebook, Cards, ClockCounterClockwise, Gear, House, ListChecks, Microphone, SignOut, Timer } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { logout } from "@/lib/auth/actions";

const NAV = [
  { href: "/portal", label: "Home", icon: House, exact: true },
  { href: "/portal/assistant", label: "Voice CFI", icon: Microphone },
  { href: "/portal/quizzes", label: "Quizzes", icon: Timer },
  { href: "/portal/review", label: "Review", icon: Cards },
  { href: "/portal/study", label: "Study", icon: BookOpenText },
];

// Desktop sidebar only; the mobile tab bar stays at five items.
const SIDEBAR_EXTRA = [
  { href: "/portal/plan", label: "Study plan", icon: MapTrifold, exact: false },
  { href: "/portal/checkride", label: "Mock checkride", icon: AirplaneTakeoff, exact: false },
  { href: "/portal/questions", label: "Question bank", icon: ListChecks, exact: false },
  { href: "/portal/logbook", label: "Logbook", icon: Notebook, exact: false },
  { href: "/portal/history", label: "History", icon: ClockCounterClockwise, exact: false },
];

function useActive() {
  const path = usePathname();
  return (href: string, exact?: boolean) => (exact ? path === href : path === href || path.startsWith(href + "/"));
}

export function Sidebar({ name, ratingLabel }: { name: string; ratingLabel: string }) {
  const isActive = useActive();
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-panel p-5 lg:flex print:hidden">
      <Link href="/portal" className="px-2 py-2 text-xl" aria-label="Aviant portal home">
        <Logo />
      </Link>
      <nav aria-label="Portal" className="mt-8 flex-1">
        <ul className="space-y-1">
          {[...NAV, ...SIDEBAR_EXTRA].map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm",
                    active ? "bg-green/12 text-accent" : "text-fg-muted",
                  )}
                >
                  <Icon size={20} weight={active ? "fill" : "regular"} aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="space-y-1 pt-6">
        <Link
          href="/portal/settings"
          aria-current={isActive("/portal/settings") ? "page" : undefined}
          className={clsx(
            "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm",
            isActive("/portal/settings") ? "bg-green/12 text-accent" : "text-fg-muted",
          )}
        >
          <Gear size={20} aria-hidden />
          Settings
        </Link>
        <div className="flex items-center gap-3 px-3 py-3">
          <span className="grid size-9 place-items-center rounded-full bg-green font-medium text-on-accent" aria-hidden>
            {name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-fg">{name}</p>
            <p className="truncate text-xs text-fg-subtle">{ratingLabel}</p>
          </div>
          <form action={logout}>
            <button type="submit" aria-label="Log out" className="grid size-9 cursor-pointer place-items-center rounded-lg text-fg-subtle">
              <SignOut size={18} aria-hidden />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const isActive = useActive();
  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-panel px-4 lg:hidden print:hidden">
        <Link href="/portal" aria-label="Aviant portal home" className="text-lg">
          <Logo />
        </Link>
        <div className="flex items-center">
          <Link href="/portal/history" aria-label="History" className="grid size-11 place-items-center rounded-full text-fg-muted">
            <ClockCounterClockwise size={22} aria-hidden />
          </Link>
          <Link href="/portal/settings" aria-label="Settings" className="grid size-11 place-items-center rounded-full text-fg-muted">
            <Gear size={22} aria-hidden />
          </Link>
        </div>
      </header>
      <nav
        aria-label="Portal"
        className="fixed inset-x-0 bottom-0 z-40 bg-panel pb-[env(safe-area-inset-bottom)] lg:hidden print:hidden"
      >
        <ul className="grid grid-cols-5">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={clsx("flex h-16 flex-col items-center justify-center gap-1 text-xs", active ? "text-accent" : "text-fg-subtle")}
                >
                  <Icon size={22} weight={active ? "fill" : "regular"} aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
