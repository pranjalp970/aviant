import { ArrowRight, Timer } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/portal/PageHeader";
import { attemptSize, quizPool, quizzesFor } from "@/content/quizzes";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Quizzes" };

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default async function QuizzesPage() {
  const session = (await getSession())!;
  const quizzes = quizzesFor(session.rating);
  // Full-length and timed tests lead; one short quiz per topic follows as a list.
  const featured = quizzes.filter((q) => !q.topics);
  const topics = quizzes.filter((q) => q.topics);

  return (
    <>
      <PageHeader
        eyebrow="Knowledge tests"
        title="Quizzes"
        description="Written-test style practice with instant scoring and an explanation for every question."
        action={
          <Link href="/portal/questions" className="annot inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg">
            Browse the question bank <ArrowRight size={12} weight="bold" aria-hidden />
          </Link>
        }
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featured.map((q) => {
          const n = attemptSize(q);
          const pool = quizPool(q).length;
          return (
            <li key={q.id}>
              <Link href={`/portal/quizzes/${q.id}`} className="card card-link group flex h-full flex-col p-7">
                <p className="annot flex flex-wrap items-center gap-x-3 gap-y-1 text-fg-subtle">
                  <span>
                    {n} questions{pool > n ? ` · from ${pool}` : ""}
                  </span>
                  {q.timeLimitMin && (
                    <span className="inline-flex items-center gap-1.5 text-fg-muted">
                      <Timer size={13} aria-hidden />
                      {q.timeLimitMin} min
                    </span>
                  )}
                </p>
                <h2 className="mt-4 font-display text-xl sm:text-2xl">{q.title}</h2>
                <p className="mt-2 flex-1 text-fg-muted">{q.description}</p>
                <span className="annot mt-7 inline-flex items-center gap-2 text-accent">
                  Start <ArrowRight size={12} weight="bold" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {topics.length > 0 && (
        <section aria-labelledby="by-topic" className="mt-14">
          <h2 id="by-topic" className="font-display text-xl">
            By topic
          </h2>
          <p className="mt-1 text-sm text-fg-subtle">Ten questions from one area, for a focused session.</p>
          <ul className="mt-5 grid grid-cols-1 gap-x-10 border-t border-border md:grid-cols-2">
            {topics.map((q) => {
              const pool = quizPool(q).length;
              return (
                <li key={q.id} className="border-b border-border">
                  <Link href={`/portal/quizzes/${q.id}`} className="group -mx-2 flex items-center gap-4 rounded-ui px-2 py-4 transition-colors hover:bg-surface-strong">
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-fg">{capitalize(q.title)}</span>
                      <span className="annot mt-1 block text-fg-subtle">
                        {attemptSize(q)} questions · from {pool}
                      </span>
                    </span>
                    <ArrowRight size={16} className="shrink-0 text-fg-subtle transition-colors group-hover:text-fg" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
