import Link from "next/link";
import { Logo, PlaneMark } from "@/components/brand/Logo";
import { ChartBorder } from "@/components/marketing/ChartMarks";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative grid min-h-dvh lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-panel lg:flex lg:flex-col lg:justify-between lg:p-12">
        <ChartBorder className="pointer-events-none absolute inset-5 text-fg/15" />
        <Link href="/" className="relative text-2xl" aria-label="Aviant home">
          <Logo />
        </Link>
        <div className="relative">
          <PlaneMark className="mb-10 h-12 w-auto text-accent" />
          <p className="font-display text-4xl tracking-[-0.02em] xl:text-5xl">
            Train smarter.
            <br />
            <span className="text-accent">Fly better.</span>
          </p>
          <p className="mt-6 max-w-sm text-fg-muted">Your AI CFI and examiner, ready whenever you are: between lessons, the night before, or at 2 a.m.</p>
        </div>
        <p className="annot relative text-fg-subtle">Study aid only. It does not replace an authorized instructor or examiner.</p>
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
