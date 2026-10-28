import { CheckCircle, Lightning } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import Link from "next/link";
import type { Challenge } from "@/lib/progress/challenges";

/** This week's three challenges, one row each, with progress toward the goal. */
export function ChallengeList({ challenges }: { challenges: Challenge[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {challenges.map((c) => (
        <li key={c.id}>
          <Link href={c.href} className="group -mx-2 block rounded-ui px-2 py-4 transition-colors hover:bg-surface-strong">
            <div className="flex items-start justify-between gap-4">
              <span className="flex min-w-0 items-start gap-3">
                {c.done ? (
                  <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-label="Done" />
                ) : (
                  <Lightning size={18} className="mt-0.5 shrink-0 text-fg-subtle" aria-hidden />
                )}
                <span className="min-w-0">
                  <span className={clsx("block text-sm", c.done ? "text-fg-muted" : "text-fg")}>{c.title}</span>
                  <span className="block text-xs text-fg-subtle">{c.detail}</span>
                </span>
              </span>
              <span className={clsx("annot shrink-0", c.done ? "text-accent" : "text-fg-subtle")}>{c.done ? "+200 XP" : `${Math.min(c.have, c.need)} / ${c.need}`}</span>
            </div>
            {!c.done && (
              <div className="ml-[30px] mt-3 h-1 overflow-hidden bg-surface-strong" aria-hidden>
                <div className="h-full bg-green" style={{ width: `${Math.min(100, (c.have / c.need) * 100)}%` }} />
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
