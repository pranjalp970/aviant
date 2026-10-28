import type { Metadata, Viewport } from "next";
import { Afacad_Flux, JetBrains_Mono, Tenor_Sans } from "next/font/google";
import { SITE } from "@/lib/site";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

const afacad = Afacad_Flux({
  variable: "--font-afacad",
  subsets: ["latin"],
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const tenor = Tenor_Sans({
  variable: "--font-tenor",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Aviant — Train smarter. Fly better.",
    template: "%s · Aviant",
  },
  description:
    "Aviant is an AI flight instructor and designated pilot examiner for student pilots. Rehearse your checkride oral, drill ACS-aligned questions, and study with a voice CFI that never gets tired.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#050506" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the theme script and browser extensions change <html> attributes
    // before React loads. It only covers this element's own attributes, not its children.
    <html lang="en" data-theme="dark" className={`${afacad.variable} ${tenor.variable} ${jbmono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Applies the saved theme before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
