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
      <PageHeader eyebrow="Study guides" title="Learn it, then prove it" description="Ten-minute lessons with tables, memory aids, and the regulations behind them." />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {lessons.map((l) => {
          const area = areaById(l.areaId);
          return (
            <li key={l.slug}>
              <Link href={`/portal/study/${l.slug}`} className="card card-link group flex h-full flex-col p-7">
                <p className="annot text-fg-subtle">
                  Area {area?.numeral} · {area?.name}
                </p>
                <h2 className="mt-4 font-display text-xl sm:text-2xl">{l.title}</h2>
                <p className="mt-2 flex-1 text-fg-muted">{l.summary}</p>
                <p className="mt-7 flex items-center justify-between">
                  <span className="annot inline-flex items-center gap-1.5 text-fg-subtle">
                    <Clock size={13} aria-hidden />
                    {l.minutes} min read
                  </span>
                  <ArrowRight size={16} className="text-fg-subtle transition-colors group-hover:text-accent" aria-hidden />
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
