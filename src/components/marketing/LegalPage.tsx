import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-[760px] px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <p className="annot text-accent">Legal</p>
      <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-tight">{title}</h1>
      <p className="mt-3 text-sm text-fg-subtle">Last updated {SITE.legalUpdated}</p>
      <p className="mt-6 text-lg leading-relaxed text-fg-muted">{intro}</p>
      <div className="mt-10 space-y-10 border-t border-border pt-10 text-[17px] leading-[1.75] text-fg-muted [&_a]:text-accent [&_a:hover]:underline [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:text-fg [&_ul]:mt-3 [&_ul]:space-y-2">
        {children}
      </div>
    </article>
  );
}

export function ContactLine() {
  return SITE.supportEmail ? (
    <>
      email us at <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
    </>
  ) : (
    <>contact us using the details on this page (a dedicated support address is coming soon)</>
  );
}
