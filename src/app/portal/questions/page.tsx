import { CaretLeft, CaretRight, Funnel } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import clsx from "clsx";
import { PageHeader } from "@/components/portal/PageHeader";
import { buttonClass } from "@/components/ui/button";
import { QuestionCard } from "@/components/portal/QuestionCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { areaById, areasFor } from "@/content/acs";
import { PPL_BANK_TOPICS } from "@/content/banks/ppl-bank";
import { questionsFor } from "@/content/questions";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Question bank" };

const PAGE_SIZE = 20;

export default async function QuestionsPage({ searchParams }: PageProps<"/portal/questions">) {
  const session = (await getSession())!;
  const sp = await searchParams;
  const str = (v: string | string[] | undefined) => (typeof v === "string" ? v : undefined);

  // Private Pilot is organized by practice-bank topic; other ratings by ACS area.
  const topics = session.rating === "ppl" ? PPL_BANK_TOPICS : [];
  const topic = topics.find((t) => t.id === str(sp.topic))?.id;
  const areaParam = str(sp.area);
  const areaId = areaParam && areaById(areaParam)?.rating === session.rating ? areaParam : undefined;
  const kind = ["mc", "oral", "figure"].includes(str(sp.kind) ?? "") ? (str(sp.kind) as "mc" | "oral" | "figure") : undefined;

  const all = questionsFor(session.rating, areaId).filter(
    (q) => (!kind || (kind === "figure" ? !!q.figure : q.kind === kind)) && (!topic || q.topic === topic),
  );
  const pages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Number(str(sp.page)) || 1));
  const shown = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const title = topic
    ? topics.find((t) => t.id === topic)!.title.replace(/^./, (c) => c.toUpperCase())
    : areaId
      ? `${areaById(areaId)!.numeral}. ${areaById(areaId)!.name}`
      : "All questions";

  const href = (next: { topic?: string; area?: string; kind?: string; page?: number }) => {
    const p = new URLSearchParams();
    const v = { topic, area: areaId, kind, ...next };
    if (v.topic) p.set("topic", v.topic);
    if (v.area) p.set("area", v.area);
    if (v.kind) p.set("kind", v.kind);
    if (next.page && next.page > 1) p.set("page", String(next.page));
    const s = p.toString();
    return `/portal/questions${s ? `?${s}` : ""}`;
  };

  const chip = (active: boolean) =>
    clsx(
      "inline-flex min-h-10 items-center whitespace-nowrap rounded-ui border px-4 text-sm transition-colors",
      active ? "border-green/60 bg-green/10 text-fg" : "border-border text-fg-muted hover:border-border-strong hover:text-fg",
    );

  return (
    <>
      <PageHeader
        eyebrow="Question bank"
        title={title}
        description="Answer multiple-choice questions or reveal model answers for oral questions. Every answer cites its source."
      />

      <nav aria-label={topics.length ? "Filter by topic" : "Filter by area"} className="-mx-5 mb-4 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 sm:flex-wrap">
          <li>
            <Link href={href({ topic: undefined, area: undefined })} className={chip(!topic && !areaId)} aria-current={!topic && !areaId ? "page" : undefined}>
              All
            </Link>
          </li>
          {topics.length
            ? topics.map((t) => (
                <li key={t.id}>
                  <Link href={href({ topic: t.id, area: undefined })} className={chip(topic === t.id)} aria-current={topic === t.id ? "page" : undefined}>
                    {t.title.replace(/^./, (c) => c.toUpperCase())}
                    <span className="annot ml-2 text-fg-subtle">{t.count}</span>
                  </Link>
                </li>
              ))
            : areasFor(session.rating).map((a) => (
                <li key={a.id}>
                  <Link href={href({ area: a.id, topic: undefined })} className={chip(areaId === a.id)} aria-current={areaId === a.id ? "page" : undefined}>
                    {a.numeral} · {a.name}
                  </Link>
                </li>
              ))}
        </ul>
      </nav>
      <nav aria-label="Filter by type" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        {[
          { k: undefined, label: "All types" },
          { k: "mc", label: "Multiple choice" },
          { k: "oral", label: "Oral" },
          { k: "figure", label: "With figures" },
        ].map((o) => (
          <Link key={o.label} href={href({ kind: o.k })} className={chip(kind === o.k)}>
            {o.label}
          </Link>
        ))}
      </nav>

      <p className="annot mb-4 text-fg-subtle" aria-live="polite">
        {all.length} question{all.length === 1 ? "" : "s"}
        {pages > 1 && ` · page ${page} of ${pages}`}
      </p>

      {shown.length ? (
        <div className="grid grid-cols-1 gap-4">
          {shown.map((q, i) => (
            <QuestionCard key={q.id} q={q} index={(page - 1) * PAGE_SIZE + i} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Funnel} title="No questions match these filters" action={{ href: href({ topic: undefined, area: undefined, kind: undefined }), label: "Show all questions" }}>
          This combination of area, topic and question type doesn&rsquo;t have any questions yet. Clear a filter to widen the list; the bank
          grows as more material is added.
        </EmptyState>
      )}

      {pages > 1 && (
        <nav aria-label="Pages" className="mt-10 flex items-center justify-between gap-3">
          {page > 1 ? (
            <Link href={href({ page: page - 1 })} className={buttonClass("glass")}>
              <CaretLeft size={14} aria-hidden /> Previous
            </Link>
          ) : (
            <span />
          )}
          <span className="text-sm text-fg-subtle">
            Page {page} of {pages}
          </span>
          {page < pages ? (
            <Link href={href({ page: page + 1 })} className={buttonClass("glass")}>
              Next <CaretRight size={14} aria-hidden />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
