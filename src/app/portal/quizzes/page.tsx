import { ArrowRight, Timer } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/portal/PageHeader";
import { attemptSize, quizPool, quizzesFor } from "@/content/quizzes";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Quizzes" };

export default async function QuizzesPage() {
  const session = (await getSession())!;
  const quizzes = quizzesFor(session.rating);

  return (
    <>
      <PageHeader
        eyebrow="Knowledge tests"
        title="Quizzes"
        description="Written-test style practice with instant scoring and explanations for every question."
        action={
          <Link href="/portal/questions" className="text-sm text-fg-muted">
            Browse the question bank
          </Link>
        }
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {quizzes.map((q) => {
          const n = attemptSize(q);
          const pool = quizPool(q).length;
          return (
            <li key={q.id}>
              <Link href={`/portal/quizzes/${q.id}`} className="card flex h-full flex-col p-7">
                <div className="flex items-center gap-3 text-sm text-fg-subtle">
                  <span>
                    {n} questions{pool > n ? ` · drawn from ${pool}` : ""}
                  </span>
                  {q.timeLimitMin && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green/12 px-2.5 py-0.5 text-accent">
                      <Timer size={14} aria-hidden />
                      {q.timeLimitMin} min
                    </span>
                  )}
                </div>
                <h2 className="mt-4 font-display text-2xl">{q.title}</h2>
                <p className="mt-2 flex-1 text-fg-muted">{q.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
                  Start quiz
                  <ArrowRight size={16} className="transition-transform" aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
