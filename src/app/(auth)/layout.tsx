import Link from "next/link";
import { Logo, PlaneMark } from "@/components/brand/Logo";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative grid min-h-dvh lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden border-r border-border bg-panel lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div aria-hidden className="absolute -left-1/4 top-1/4 h-[60%] w-[120%] rotate-[-14deg] rounded-full bg-[radial-gradient(closest-side,rgba(135,218,129,0.22),transparent)] blur-3xl" />
        <Link href="/" className="relative text-2xl" aria-label="Aviant home">
          <Logo />
        </Link>
        <div className="relative">
          <PlaneMark className="mb-10 h-16 w-auto text-accent/90" />
          <p className="font-display text-5xl leading-[1.05]">
            <span className="text-iridescent">Train smarter.</span>
            <br />
            <span className="text-iridescent">Fly better.</span>
          </p>
          <p className="mt-6 max-w-sm text-fg-muted">Your AI CFI and examiner, ready whenever you are: between lessons, the night before, or at 2 a.m.</p>
        </div>
        <p className="relative text-sm text-fg-subtle">Study aid only. It does not replace an authorized instructor or examiner.</p>
      </aside>

      {/* Form panel */}
      <main className="flex flex-col px-5 py-8 sm:px-10">
        <Link href="/" className="text-xl lg:hidden" aria-label="Aviant home">
          <Logo />
        </Link>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </main>
    </div>
  );
}
