import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/#route", label: "How it works" },
  { href: "/#demo", label: "Try a question" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/login", label: "Log in" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1320px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <Logo className="text-2xl" />
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="annot text-fg-muted">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="annot flex flex-col gap-2 md:items-end">
            <span className="text-fg-muted">Made for student pilots</span>
            <a href={`mailto:${SITE.supportEmail}`} className="normal-case tracking-normal text-fg-muted">
              {SITE.supportEmail}
            </a>
            <span className="flex gap-4 text-fg-subtle">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </span>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 text-xs text-fg-subtle md:flex-row md:justify-between md:gap-16">
          <p className="annot">© {new Date().getFullYear()} Aviant · Private Pilot today, Instrument coming soon</p>
          <p className="max-w-[68ch]">
            Aviant is a study aid. It does not replace instruction from an authorized flight instructor, an FAA-designated pilot examiner, or
            official FAA publications. Always verify against current 14 CFR, the AIM, and the ACS.
          </p>
        </div>
      </div>
    </footer>
  );
}
