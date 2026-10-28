import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/portal/PageHeader";
import { QuizRunner } from "@/components/portal/QuizRunner";
import { attemptSize, quizById, quizPool } from "@/content/quizzes";

export async function generateMetadata({ params }: PageProps<"/portal/quizzes/[id]">): Promise<Metadata> {
  const quiz = quizById((await params).id);
  return { title: quiz?.title ?? "Quiz" };
}

export default async function QuizPage({ params }: PageProps<"/portal/quizzes/[id]">) {
  const quiz = quizById((await params).id);
  if (!quiz) notFound();

  return (
    <>
      <Link href="/portal/quizzes" className="mb-6 inline-flex min-h-10 items-center gap-2 text-sm text-fg-muted">
        <ArrowLeft size={14} aria-hidden />
        All quizzes
      </Link>
      <PageHeader eyebrow="Quiz" title={quiz.title} description={quiz.description} />
      <div className="max-w-3xl">
        <QuizRunner quizId={quiz.id} title={quiz.title} rating={quiz.rating} pool={quizPool(quiz)} count={attemptSize(quiz)} timeLimitMin={quiz.timeLimitMin} />
      </div>
    </>
  );
}
