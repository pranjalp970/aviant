import { ArrowLeft, Cards, CheckSquareOffset, SealCheck, Timer } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Flashcards } from "@/components/portal/Flashcards";
import { PageHeader } from "@/components/portal/PageHeader";
import { QuizRunner } from "@/components/portal/QuizRunner";
import { EmptyState } from "@/components/ui/EmptyState";
import { PPL_BANK_TOPICS } from "@/content/banks/ppl-bank";
import { QUESTIONS } from "@/content/questions";
import type { McQuestion } from "@/content/types";
import { getSession } from "@/lib/auth/session";
import { allReviews, dueQuestions, reviewStats } from "@/lib/review";

export const metadata: Metadata = { title: "Review" };

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default async function ReviewPage({ searchParams }: PageProps<"/portal/review">) {
  const session = (await getSession())!;
  const { mode, topic } = await searchParams;
  const rows = await allReviews();
  const due = dueQuestions(rows, session.rating);
  const stats = reviewStats(rows, session.rating);

  const back = (
    <Link href="/portal/review" className="mb-6 inline-flex min-h-10 items-center gap-2 text-sm text-fg-muted">
      <ArrowLeft size={14} aria-hidden /> Review
    </Link>
  );

  if (mode === "quiz") {
    return (
      <>
        {back}
        <PageHeader eyebrow="Review" title="Review quiz" description="Questions you've missed or are due to see again, most-forgotten first." />
        <div className="max-w-3xl">
          {due.length ? (
            <QuizRunner quizId="review" title="Review quiz" rating={session.rating} pool={due} count={Math.min(20, due.length)} />
          ) : (
            <Flashcards cards={[]} />
          )}
        </div>
      </>
    );
  }

  if (mode === "cards") {
    return (
      <>
        {back}
        <PageHeader eyebrow="Review" title="Flashcards" description="Flip each card and be honest: missed cards come back soon, known cards later." />
        <Flashcards cards={due.slice(0, 30)} />
      </>
    );
  }

  if (mode === "new") {
    // Questions the student has never answered, optionally in one topic (used by the study plan).
    const seen = new Set(rows.map((r) => r.question_id));
    const t = typeof topic === "string" ? PPL_BANK_TOPICS.find((x) => x.id === topic) : undefined;
    const fresh = QUESTIONS.filter(
      (q): q is McQuestion => q.kind === "mc" && q.rating === session.rating && !seen.has(q.id) && (!t || q.topic === t.id),
    );
    const title = t ? `New questions: ${titleCase(t.title)}` : "New questions";
    return (
      <>
        {back}
        <PageHeader eyebrow="Learn" title={title} description={`${fresh.length} question${fresh.length === 1 ? "" : "s"} you haven't seen yet.`} />
        <div className="max-w-3xl">
          {fresh.length ? (
            <QuizRunner quizId={`new-${t?.id ?? "all"}`} title={title} rating={session.rating} pool={fresh} count={Math.min(10, fresh.length)} />
          ) : (
            <EmptyState icon={SealCheck} title="You've seen every question here" action={{ href: "/portal/review", label: "Go to review" }} secondary={{ href: "/portal/plan", label: "Back to your plan" }}>
              Nothing new is left{t ? " in this topic" : ""}. Questions move to &ldquo;mastered&rdquo; once you recall them correctly a few
              times, spaced out, so keep reviewing the ones that come due.
            </EmptyState>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Spaced repetition" title="Review" description="Missed questions come back right away. Each one you get right returns later and later until it's mastered." />

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Due now", value: stats.due, accent: true },
          { label: "Missed last time", value: stats.missed },
          { label: "Mastered", value: stats.mastered },
          { label: "Seen so far", value: stats.seen },
        ].map((s) => (
          <div key={s.label} className={s.accent ? "rounded-ui border border-green/40 bg-green/10 p-5" : "card p-5"}>
            <dt className="annot text-fg-subtle">{s.label}</dt>
            <dd className={`mt-2 font-display text-3xl tabular-nums sm:text-4xl ${s.accent ? "text-accent" : "text-fg"}`}>{s.value}</dd>
          </div>
        ))}
      </dl>

      {!stats.seen ? (
        <div className="mt-10">
          <EmptyState icon={Cards} title="The review deck is empty" action={{ href: "/portal/quizzes/ppl-quick-20", label: "Take a Quick 20" }} secondary={{ href: "/portal/review?mode=new", label: "Learn new questions" }}>
            The deck builds itself from your practice tests. Every question you answer is scheduled here, and the ones you miss come back
            first.
          </EmptyState>
        </div>
      ) : !stats.due ? (
        <div className="mt-10">
          <EmptyState icon={CheckSquareOffset} title="All caught up" action={{ href: "/portal/review?mode=new", label: "Learn new questions" }} secondary={{ href: "/portal/quizzes", label: "Take a practice test" }}>
            Nothing is due right now. Questions you&rsquo;ve answered come back on a schedule, sooner if you missed them and later if you
            knew them, so check back tomorrow.
          </EmptyState>
        </div>
      ) : (
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link href="/portal/review?mode=quiz" className="card card-link group p-7">
          <span className="grid size-11 place-items-center rounded-ui bg-green/12 text-accent">
            <Timer size={22} weight="fill" aria-hidden />
          </span>
          <h2 className="mt-5 font-display text-xl sm:text-2xl">Review quiz</h2>
          <p className="mt-2 text-fg-muted">Up to 20 due questions, multiple choice, scored like a regular quiz.</p>
        </Link>
        <Link href="/portal/review?mode=cards" className="card card-link group p-7">
          <span className="grid size-11 place-items-center rounded-ui bg-green/12 text-accent">
            <Cards size={22} weight="fill" aria-hidden />
          </span>
          <h2 className="mt-5 font-display text-xl sm:text-2xl">Flashcards</h2>
          <p className="mt-2 text-fg-muted">Recall the answer yourself, flip, and rate. Faster, and great on your phone.</p>
        </Link>
      </div>
      )}

    </>
  );
}
