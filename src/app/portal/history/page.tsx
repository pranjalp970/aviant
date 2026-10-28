import { CheckCircle, Circle, Microphone, Timer, XCircle } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import type { Metadata } from "next";
import { PageHeader } from "@/components/portal/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { questionById } from "@/content/questions";
import { getSession } from "@/lib/auth/session";
import { recentOralSessions, recentQuizAttempts } from "@/lib/data/queries";

export const metadata: Metadata = { title: "History" };

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
const mins = (sec: number | null) => (sec ? `${Math.max(1, Math.round(sec / 60))} min` : "");

export default async function HistoryPage() {
  const session = (await getSession())!;
  const [attempts, orals] = await Promise.all([recentQuizAttempts(session.rating), recentOralSessions(session.rating)]);

  return (
    <>
      <PageHeader eyebrow="Progress" title="History" description="Every quiz and oral session you've finished, newest first." />

      <section aria-labelledby="quiz-history">
        <h2 id="quiz-history" className="mb-5 flex items-center gap-2.5 font-display text-xl sm:text-2xl">
          <Timer size={20} className="text-fg-subtle" aria-hidden /> Quizzes
        </h2>
        {attempts.length ? (
          <ul className="space-y-3">
            {attempts.map((a) => {
              const p = Math.round((a.score / a.total) * 100);
              const missed = a.answers.filter((x) => !x.correct);
              return (
                <li key={a.id}>
                  <details className="card group">
                    <summary className="flex cursor-pointer list-none items-center gap-4 p-5 transition-colors hover:bg-surface-strong [&::-webkit-details-marker]:hidden">
                      <span className={clsx("w-16 shrink-0 font-display text-2xl tabular-nums", p >= 70 ? "text-accent" : "text-warning")}>{p}%</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-fg">{a.quiz_title}</span>
                        <span className="block text-sm text-fg-subtle">
                          {a.score}/{a.total} correct · {when(a.created_at)} {a.duration_sec ? `· ${mins(a.duration_sec)}` : ""}
                        </span>
                      </span>
                      <span className="annot shrink-0 text-fg-muted group-open:hidden">{missed.length ? `Review ${missed.length} missed` : "Perfect"}</span>
                    </summary>
                    {missed.length > 0 && (
                      <ol className="space-y-5 border-t border-border p-5 pt-6">
                        {missed.map((m) => {
                          const q = questionById(m.questionId);
                          if (!q || q.kind !== "mc") return null;
                          return (
                            <li key={m.questionId} className="flex gap-3">
                              <XCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-danger" aria-label="Missed" />
                              <div className="text-sm">
                                <p className="text-fg">{q.prompt}</p>
                                <p className="mt-1 text-sm text-fg-subtle">Your answer: {m.chosen ?? "No answer"}</p>
                                <p className="text-sm text-accent">Correct: {q.choices[q.answerIndex]}</p>
                                <p className="mt-1 text-sm text-fg-muted">{q.explanation}</p>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </details>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState level={3} icon={Timer} title="No quizzes yet" action={{ href: "/portal/quizzes/ppl-quick-20", label: "Take a Quick 20" }} secondary={{ href: "/portal/quizzes", label: "See all tests" }}>
            Finished practice tests land here with your score, time and every question you missed, explained. A Quick 20 takes about
            fifteen minutes.
          </EmptyState>
        )}
      </section>

      <section aria-labelledby="oral-history" className="mt-12">
        <h2 id="oral-history" className="mb-5 flex items-center gap-2.5 font-display text-xl sm:text-2xl">
          <Microphone size={20} className="text-fg-subtle" aria-hidden /> Oral sessions
        </h2>
        {orals.length ? (
          <ul className="space-y-3">
            {orals.map((o) => (
              <li key={o.id}>
                <details className="card group">
                  <summary className="flex cursor-pointer list-none items-center gap-4 p-5 transition-colors hover:bg-surface-strong [&::-webkit-details-marker]:hidden">
                    <span className={clsx("w-16 shrink-0 font-display text-2xl tabular-nums", o.avg_score != null ? "text-accent" : "text-fg-subtle")}>{o.avg_score != null ? `${Math.round(Number(o.avg_score) * 100)}%` : "—"}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-fg">{o.mode === "examine" ? "Mock oral exam (DPE)" : "Teach session (CFI)"}</span>
                      <span className="block text-sm text-fg-subtle">
                        {o.mode === "examine" ? `${o.grades.length} graded` : `${o.transcript.filter((t) => t.role === "user").length} questions asked`} · {when(o.updated_at)}
                      </span>
                    </span>
                    <span className="annot shrink-0 text-fg-muted group-open:hidden">View</span>
                  </summary>
                  <div className="space-y-5 border-t border-border p-5 pt-6">
                    {o.grades.map((g, i) => (
                      <div key={i} className="text-sm">
                        <p className="text-fg">{g.prompt}</p>
                        <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                          {g.hits.map((h) => (
                            <li key={h} className="flex items-center gap-1.5 text-sm text-fg-muted">
                              <CheckCircle size={14} weight="fill" className="text-accent" aria-label="Covered" /> {h}
                            </li>
                          ))}
                          {g.misses.map((h) => (
                            <li key={h} className="flex items-center gap-1.5 text-sm text-fg-subtle">
                              <Circle size={14} aria-label="Missed" /> {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {o.mode === "teach" && (
                      <ol className="space-y-2 text-sm">
                        {o.transcript.map((t, i) => (
                          <li key={i} className={t.role === "user" ? "text-fg" : "text-fg-muted"}>
                            <span className="annot text-fg-subtle">{t.role === "user" ? "You" : "CFI"}: </span>
                            {t.content}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState level={3} icon={Microphone} title="No oral sessions yet" action={{ href: "/portal/assistant?mode=examine", label: "Start a mock oral" }} secondary={{ href: "/portal/assistant", label: "Talk to your CFI" }}>
            Every conversation with your voice CFI or examiner is saved here, with graded answers showing which ACS key points you
            covered and which you missed.
          </EmptyState>
        )}
      </section>
    </>
  );
}
