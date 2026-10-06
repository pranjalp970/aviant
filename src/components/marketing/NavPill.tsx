"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PlaneMark } from "@/components/brand/Logo";

const LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#product", label: "Product" },
  { href: "/#demo", label: "Try a question" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function NavPill() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header className="sticky top-4 z-50 flex justify-center px-4 pt-6">
      <div ref={panel} className="relative">
        <nav aria-label="Main" className="flex items-center gap-2">
          <Link
            href="/"
            aria-label="Aviant home"
            className="glass grid size-12 place-items-center rounded-full transition-transform duration-200 hover:scale-105"
          >
            <PlaneMark className="h-4 w-auto text-accent" />
          </Link>
          <div className="glass flex items-center gap-1 rounded-full p-1">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="flex h-10 cursor-pointer items-center gap-2 rounded-full px-4 text-[15px] text-fg-muted transition-colors hover:text-fg"
            >
              {open ? <X size={16} weight="bold" aria-hidden /> : <List size={16} weight="bold" aria-hidden />}
              Menu
            </button>
            <Link
              href="/login"
              className="hidden h-10 items-center rounded-full px-4 text-[15px] text-fg-muted transition-colors hover:text-fg sm:flex"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="flex h-10 items-center rounded-full bg-lime px-4 text-[15px] font-medium text-on-accent transition-colors hover:bg-white"
            >
              Start training
            </Link>
          </div>
        </nav>

        <div
          id="site-menu"
          hidden={!open}
          className="glass absolute left-1/2 top-[calc(100%+10px)] w-[min(320px,calc(100vw-32px))] -translate-x-1/2 rounded-3xl p-2"
        >
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-2xl px-4 text-fg-muted transition-colors hover:bg-surface-strong hover:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="sm:hidden">
              <Link href="/login" className="flex min-h-11 items-center rounded-2xl px-4 text-fg-muted hover:bg-surface-strong hover:text-fg">
                Log in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
