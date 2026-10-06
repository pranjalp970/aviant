import { ArrowLeft, Lightbulb, Microphone, Warning } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonClass } from "@/components/ui/button";
import { areaById } from "@/content/acs";
import { lessonBySlug, lessonsFor } from "@/content/lessons";
import type { LessonBlock } from "@/content/types";
import { markLessonViewed } from "@/lib/data/queries";

export async function generateMetadata({ params }: PageProps<"/portal/study/[slug]">): Promise<Metadata> {
  const lesson = lessonBySlug((await params).slug);
  return { title: lesson?.title ?? "Study guide" };
}

function Block({ b }: { b: LessonBlock }) {
  switch (b.type) {
    case "h":
      return <h2 className="mt-10 font-display text-2xl text-fg">{b.text}</h2>;
    case "p":
      return <p className="mt-4 text-[17px] leading-[1.75] text-fg-muted">{b.text}</p>;
    case "list":
      return (
        <ul className="mt-4 space-y-2">
          {b.items.map((it) => (
            <li key={it} className="flex gap-3 text-[17px] leading-relaxed text-fg-muted">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-green" aria-hidden />
              {it}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div
          className={clsx(
            "mt-6 flex gap-3 rounded-2xl border p-5 text-[15px] leading-relaxed",
            b.tone === "tip" ? "border-green/30 bg-green/8 text-fg" : "border-warning/30 bg-warning/8 text-fg",
          )}
        >
          {b.tone === "tip" ? (
            <Lightbulb size={20} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-label="Tip" />
          ) : (
            <Warning size={20} weight="fill" className="mt-0.5 shrink-0 text-warning" aria-label="Caution" />
          )}
          <p>{b.text}</p>
        </div>
      );
    case "table":
      return (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[480px] text-left text-[15px]">
            <thead className="bg-surface-strong text-fg">
              <tr>
                {b.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-fg-muted">
              {b.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} className={clsx("px-4 py-3", j === 0 && "text-fg")}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function LessonPage({ params }: PageProps<"/portal/study/[slug]">) {
  const lesson = lessonBySlug((await params).slug);
  if (!lesson) notFound();
  await markLessonViewed(lesson.slug); // powers "pick up where you left off"
  const area = areaById(lesson.areaId);
  const siblings = lessonsFor(lesson.rating);
  const next = siblings[siblings.findIndex((l) => l.slug === lesson.slug) + 1];

  return (
    <article className="mx-auto max-w-[720px]">
      <Link href="/portal/study" className="mb-6 inline-flex min-h-10 items-center gap-2 text-sm text-fg-muted hover:text-accent">
        <ArrowLeft size={14} aria-hidden />
        All study guides
      </Link>
      <p className="text-sm uppercase tracking-[0.14em] text-green">
        Area {area?.numeral} · {area?.name}
      </p>
      <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3rem)] leading-tight">{lesson.title}</h1>
      <p className="mt-3 text-lg text-fg-muted">{lesson.summary}</p>
      <p className="mt-4 text-sm text-fg-subtle">{lesson.minutes} min read · Sources: {lesson.reference}</p>

      <div className="mt-8 border-t border-border pt-2">
        {lesson.blocks.map((b, i) => (
          <Block key={i} b={b} />
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-4 rounded-[24px] border border-green/30 bg-gradient-to-br from-green/12 to-transparent p-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl">Think you&rsquo;ve got it?</p>
          <p className="mt-1 text-fg-muted">Have the examiner question you on this topic out loud.</p>
        </div>
        <Link href="/portal/assistant?mode=examine" className={buttonClass("primary")}>
          <Microphone size={16} weight="fill" aria-hidden />
          Start a mock oral
        </Link>
      </div>

      {next && (
        <Link href={`/portal/study/${next.slug}`} className="card mt-4 flex items-center justify-between p-6 transition-colors hover:border-green/40">
          <span>
            <span className="block text-sm text-fg-subtle">Next lesson</span>
            <span className="font-display text-lg">{next.title}</span>
          </span>
          <ArrowLeft size={18} className="rotate-180 text-accent" aria-hidden />
        </Link>
      )}

      <p className="mt-10 text-xs text-fg-subtle">Sample content for the preview build. Verify against current FAA publications.</p>
    </article>
  );
}
