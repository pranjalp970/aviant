"use client";

import { List, X } from "@phosphor-icons/react";
import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { cta } from "./cta";

const LINKS = [
  { href: "/#route", label: "How it works" },
  { href: "/#instruments", label: "Progress" },
  { href: "/#demo", label: "Try a question" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  // the hairline under the bar fills with the page's "flight progress"
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="Aviant home" className="text-xl">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="annot text-fg-muted">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="annot hidden text-fg-muted sm:block">
            Log in
          </Link>
          <span className="hidden sm:block">
            <Link href="/signup" className={cta.primary("h-10 whitespace-nowrap px-4")}>
              Start training
            </Link>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 cursor-pointer place-items-center text-fg-muted lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <List size={20} aria-hidden />}
          </button>
        </div>
      </div>

      <div className="relative h-px bg-border">
        <motion.div aria-hidden style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-green/70" />
      </div>

      <div id="site-menu" hidden={!open} className="lg:hidden">
        <ul className="mx-auto flex max-w-[1320px] flex-col px-5 pb-6 pt-3 sm:px-8">
          {[...LINKS, { href: "/login", label: "Log in" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="annot flex min-h-12 items-center text-fg-muted">
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-4 sm:hidden">
            <Link href="/signup" onClick={() => setOpen(false)} className={cta.primary("w-full")}>
              Start training
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
