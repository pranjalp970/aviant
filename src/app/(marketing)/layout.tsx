import { Footer } from "@/components/marketing/Footer";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SmoothScroll } from "@/components/marketing/SmoothScroll";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-lime focus:px-4 focus:py-2 focus:text-on-accent">
        Skip to content
      </a>
      <SmoothScroll />
      <SiteHeader />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
