import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { QUESTIONS } from "@/content/questions";
import type { McQuestion } from "@/content/types";
import { getSession } from "@/lib/auth/session";
import { skipOnboarding } from "@/lib/plan/actions";
import { PLAN_TOPICS } from "@/lib/plan/topics";
import { drawStratified } from "@/lib/quiz/draw";

export const metadata: Metadata = { title: "Build your study plan" };

export default async function OnboardingPage({ searchParams }: PageProps<"/onboarding">) {
  const session = await getSession();
  if (!session) redirect("/login?next=/onboarding");
  const { step } = await searchParams;

  // 2 questions per topic, drawn fresh on each visit
  const pool = QUESTIONS.filter((q): q is McQuestion => q.kind === "mc" && q.rating === "ppl" && !!q.topic);
  const diagnostic = drawStratified(pool, 2);

  return (
    <div className="flex min-h-dvh flex-col px-5 py-6 sm:px-8">
      <header className="mx-auto flex w-full max-w-2xl items-center justify-between">
        <Link href="/" aria-label="Aviant home" className="text-xl">
          <Logo />
        </Link>
        {session.onboarded ? (
          <Link href="/portal" className="text-sm text-fg-muted hover:text-accent">
            Back to dashboard
          </Link>
        ) : (
          <form action={skipOnboarding}>
            <button type="submit" className="cursor-pointer text-sm text-fg-muted hover:text-accent">
              Skip setup
            </button>
          </form>
        )}
      </header>
      <main className="flex flex-1 items-start justify-center py-10 sm:py-16">
        <OnboardingWizard
          defaults={{
            name: session.name,
            writtenStatus: session.writtenStatus,
            writtenDate: session.writtenDate,
            writtenScore: session.writtenScore,
            missedAcsCodes: session.missedAcsCodes,
            checkrideDate: session.checkrideDate,
            studyDaysPerWeek: session.studyDaysPerWeek,
            studyMinutesPerDay: session.studyMinutesPerDay,
            topicConfidence: session.topicConfidence,
          }}
          topics={PLAN_TOPICS.map((t) => ({ id: t.id, title: t.title }))}
          diagnostic={diagnostic}
          startAt={step === "diagnostic" ? "diagnostic-intro" : undefined}
        />
      </main>
    </div>
  );
}
