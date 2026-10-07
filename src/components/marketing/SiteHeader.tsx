"use client";

import { List, X } from "@phosphor-icons/react";
import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";

const LINKS = [
  { href: "/#route", label: "How it works" },
  { href: "/#instruments", label: "Progress" },
  { href: "/#demo", label: "Try a question" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  // the thin line under the bar is the page's "flight progress"
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-border bg-bg/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="Aviant home" className="text-xl">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-lg px-3 py-2 text-[15px] text-fg-muted transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden h-10 items-center rounded-lg px-3 text-[15px] text-fg-muted transition-colors hover:text-fg sm:flex">
            Log in
          </Link>
          <Link
            href="/signup"
            className="flex h-10 items-center rounded-[10px] bg-lime px-4 text-[15px] font-medium text-on-accent transition-colors hover:bg-fg hover:text-bg"
          >
            Start training
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 cursor-pointer place-items-center rounded-lg text-fg-muted hover:text-fg lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <List size={20} aria-hidden />}
          </button>
        </div>
      </div>

      <motion.div aria-hidden style={{ scaleX: progress }} className="h-px origin-left bg-green/70" />

      <div id="site-menu" hidden={!open} className="border-t border-border lg:hidden">
        <ul className="mx-auto flex max-w-[1320px] flex-col px-5 py-3 sm:px-8">
          {[...LINKS, { href: "/login", label: "Log in" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center border-b border-border text-lg text-fg-muted last:border-0 hover:text-fg">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
