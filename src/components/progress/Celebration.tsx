import { CheckCircle, Confetti, Medal } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Badge } from "@/lib/progress/badges";
import type { Challenge } from "@/lib/progress/challenges";

/** Shown once, on the visit where something was newly earned. */
export function Celebration({ badges, challenges }: { badges: Badge[]; challenges: Challenge[] }) {
  if (!badges.length && !challenges.length) return null;
  const xp = badges.length * 100 + challenges.length * 200;
  return (
    <div role="status" className="mb-6 flex items-start gap-4 rounded-ui border border-green/40 bg-surface p-5">
      <span className="grid size-12 shrink-0 place-items-center rounded-ui bg-green text-on-accent">
        <Confetti size={24} weight="fill" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="font-display text-lg">
          {badges.length ? `Badge${badges.length > 1 ? "s" : ""} earned!` : "Weekly challenge complete!"} <span className="text-accent">+{xp} XP</span>
        </p>
        <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-fg-muted">
          {badges.map((b) => (
            <li key={b.id} className="flex items-center gap-1.5">
              <Medal size={14} weight="fill" className="text-accent" aria-hidden /> {b.title}: {b.description.toLowerCase()}
            </li>
          ))}
          {challenges.map((c) => (
            <li key={c.id} className="flex items-center gap-1.5">
              <CheckCircle size={14} weight="fill" className="text-accent" aria-hidden /> {c.title}
            </li>
          ))}
        </ul>
        {badges.length > 0 && (
          <Link href="/portal/logbook" className="mt-2 inline-block text-sm text-accent">
            See your logbook
          </Link>
        )}
      </div>
    </div>
  );
}
