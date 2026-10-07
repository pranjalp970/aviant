import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const COLS = [
  {
    title: "Product",
    links: [
      { href: "/#route", label: "How it works" },
      { href: "/#demo", label: "Try a question" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Ratings",
    links: [
      { href: "/signup", label: "Private Pilot" },
      { href: "/#faq", label: "Instrument (coming soon)" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/signup", label: "Create account" },
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
    <footer className="relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-[1320px] px-5 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <Logo className="text-2xl" />
            <p className="mt-4 max-w-xs text-[15px] text-fg-muted">An AI flight instructor and examiner for student pilots.</p>
          </div>
          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="annot mb-4 text-fg-subtle">{c.title}</p>
              <ul className="space-y-1">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="inline-flex min-h-9 items-center text-fg-muted transition-colors hover:text-fg">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-[13px] leading-relaxed text-fg-subtle md:flex-row md:justify-between">
          <p className="annot">© {new Date().getFullYear()} Aviant · Est. 2026</p>
          <p className="max-w-2xl md:text-right">
            Aviant is a study aid. It does not replace instruction from an authorized flight instructor, an FAA-designated pilot examiner, or
            official FAA publications. Always verify against current 14 CFR, the AIM, and the ACS.
          </p>
        </div>
      </div>
      {/* oversized wordmark, cropped by the page edge */}
      <p aria-hidden className="pointer-events-none mt-10 select-none text-center font-sans text-[29vw] font-light leading-[0.72] tracking-[-0.04em] text-fg/[0.05]">
        aviant
      </p>
    </footer>
  );
}
