import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/portal/PageHeader";
import { areaById } from "@/content/acs";
import { lessonsFor } from "@/content/lessons";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Study guides" };

export default async function StudyPage() {
  const session = (await getSession())!;
  const lessons = lessonsFor(session.rating);

  return (
    <>
      <PageHeader eyebrow="Study guides" title="Learn it, then prove it" description="Short lessons with tables, memory aids, and the regulations behind them." />
      <ul className="grid gap-4 md:grid-cols-2">
        {lessons.map((l) => {
          const area = areaById(l.areaId);
          return (
            <li key={l.slug}>
              <Link href={`/portal/study/${l.slug}`} className="card flex h-full flex-col p-7">
                <p className="text-sm text-accent">
                  Area {area?.numeral} · {area?.name}
                </p>
                <h2 className="mt-3 font-display text-2xl">{l.title}</h2>
                <p className="mt-2 flex-1 text-fg-muted">{l.summary}</p>
                <p className="mt-6 flex items-center justify-between text-sm text-fg-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} aria-hidden />
                    {l.minutes} min read
                  </span>
                  <ArrowRight size={16} className="text-accent" aria-hidden />
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
