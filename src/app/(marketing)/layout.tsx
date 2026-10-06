import { Footer } from "@/components/marketing/Footer";
import { NavPill } from "@/components/marketing/NavPill";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative min-h-dvh overflow-x-clip md:px-6">
      {/* Ambient sweep behind the frame, echoing the reference's silver swoosh in brand green */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-[20%] top-[-10%] h-[70vh] w-[80vw] rotate-[-12deg] rounded-[100%] bg-[radial-gradient(closest-side,rgba(135,218,129,0.16),transparent)] blur-3xl" />
        <div className="absolute -right-[25%] bottom-[-15%] h-[70vh] w-[80vw] rotate-[-12deg] rounded-[100%] bg-[radial-gradient(closest-side,rgba(229,255,187,0.10),transparent)] blur-3xl" />
      </div>

      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-on-accent">
        Skip to content
      </a>

      <div className="grain relative mx-auto max-w-[1280px] border-border-strong bg-panel/90 md:my-6 md:rounded-[40px] md:border">
        <NavPill />
        <main id="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
