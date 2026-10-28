import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { buttonClass } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found" };

/** Any address that doesn't exist: say so plainly and offer the two places people most likely meant. */
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col px-5 py-8 sm:px-10">
      <Link href="/" aria-label="Aviant home" className="text-xl">
        <Logo />
      </Link>
      <div className="flex flex-1 flex-col justify-center py-16">
        <p className="annot text-fg-subtle">Error 404 · off course</p>
        <h1 className="mt-5 font-display text-3xl sm:text-4xl">This page doesn&rsquo;t exist.</h1>
        <p className="mt-4 max-w-[48ch] text-fg-muted">The link may be out of date, or the address may have a typo. Pick up where you left off instead.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/portal" className={buttonClass("primary")}>
            Go to your dashboard
          </Link>
          <Link href="/" className={buttonClass("glass")}>
            <ArrowLeft size={16} aria-hidden /> Home page
          </Link>
        </div>
      </div>
    </main>
  );
}
