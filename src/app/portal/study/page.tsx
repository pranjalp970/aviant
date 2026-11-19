import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/portal/PageHeader";
import { areaById } from "@/content/acs";
import { PPL_BANK_TOPICS } from "@/content/banks/ppl-bank";
import { lessonsFor } from "@/content/lessons";
import type { Lesson } from "@/content/types";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Study guides" };

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default async function StudyPage() {
  const session = (await getSession())!;
  const lessons = lessonsFor(session.rating);

  // Private Pilot guides follow the knowledge-test topics; anything untagged is grouped by ACS area.
  const groups: { id: string; title: string; lessons: Lesson[] }[] = [];
  for (const t of PPL_BANK_TOPICS) {
    const ls = lessons.filter((l) => l.topic === t.id);
    if (ls.length) groups.push({ id: t.id, title: capitalize(t.title), lessons: ls });
  }
  for (const l of lessons.filter((x) => !x.topic || !PPL_BANK_TOPICS.some((t) => t.id === x.topic))) {
    const area = areaById(l.areaId);
    const id = `area-${l.areaId}`;
    let g = groups.find((x) => x.id === id);
    if (!g) groups.push((g = { id, title: area ? `${area.numeral}. ${area.name}` : "Other", lessons: [] }));
    g.lessons.push(l);
  }

  return (
    <>
      <PageHeader
        eyebrow="Study guides"
        title="Learn it, then prove it"
        description={`${lessons.length} short guides covering every topic on the knowledge test, with tables, memory aids, FAA figures and the regulations behind them.`}
      />
      <div className="space-y-12">
        {groups.map((g) => (
          <section key={g.id} aria-labelledby={`topic-${g.id}`}>
            <h2 id={`topic-${g.id}`} className="annot text-fg-subtle">
              {g.title}
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-x-10 border-t border-border md:grid-cols-2">
              {g.lessons.map((l) => (
                <li key={l.slug} className="border-b border-border">
                  <Link href={`/portal/study/${l.slug}`} className="group -mx-2 flex h-full items-start gap-4 rounded-ui px-2 py-5 transition-colors hover:bg-surface-strong">
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg leading-snug text-fg">{l.title}</span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-fg-muted">{l.summary}</span>
                      <span className="annot mt-3 inline-flex items-center gap-1.5 text-fg-subtle">
                        <Clock size={13} aria-hidden />
                        {l.minutes} min read
                      </span>
                    </span>
                    <ArrowRight size={16} className="mt-1.5 shrink-0 text-fg-subtle transition-colors group-hover:text-accent" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
