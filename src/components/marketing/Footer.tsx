import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const COLS = [
  {
    title: "Product",
    links: [
      { href: "/#product", label: "Voice CFI & DPE" },
      { href: "/#product", label: "Question bank" },
      { href: "/#product", label: "Mock knowledge tests" },
      { href: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Ratings",
    links: [
      { href: "/signup", label: "Private Pilot" },
      { href: "/signup", label: "Instrument Rating" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/signup", label: "Create account" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border px-6 pb-10 pt-16 sm:px-10">
      <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Logo className="text-2xl" />
          <p className="mt-4 max-w-xs text-[15px] text-fg-muted">Train smarter. Fly better. An AI flight instructor and examiner for student pilots.</p>
        </div>
        {COLS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="mb-4 text-sm uppercase tracking-[0.14em] text-fg-subtle">{c.title}</p>
            <ul className="space-y-1">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="inline-flex min-h-9 items-center text-fg-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-[13px] leading-relaxed text-fg-subtle md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Aviant. Est. 2026.</p>
        <p className="max-w-2xl md:text-right">
          Aviant is a study aid. It does not replace instruction from an authorized flight instructor, an FAA-designated pilot examiner, or
          official FAA publications. Always verify against current 14 CFR, the AIM, and the ACS.
        </p>
      </div>
    </footer>
  );
}
