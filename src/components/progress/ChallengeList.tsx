import { CheckCircle, Lightning } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import Link from "next/link";
import type { Challenge } from "@/lib/progress/challenges";

export function ChallengeList({ challenges }: { challenges: Challenge[] }) {
  return (
    <ul className="space-y-3">
      {challenges.map((c) => (
        <li key={c.id}>
          <Link href={c.href} className={clsx("block rounded-2xl border p-4 transition-colors", c.done ? "border-green/40 bg-green/8" : "border-border hover:border-green/40")}>
            <div className="flex items-start justify-between gap-3">
              <span className="flex items-start gap-2">
                {c.done ? <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-green" aria-label="Done" /> : <Lightning size={18} weight="fill" className="mt-0.5 shrink-0 text-warning" aria-hidden />}
                <span>
                  <span className="block text-[15px] text-fg">{c.title}</span>
                  <span className="block text-xs text-fg-subtle">{c.detail}</span>
                </span>
              </span>
              <span className={clsx("shrink-0 text-xs font-medium", c.done ? "text-accent" : "text-fg-subtle")}>{c.done ? "+200 XP" : `${Math.min(c.have, c.need)}/${c.need}`}</span>
            </div>
            {!c.done && (
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-strong" aria-hidden>
                <div className="h-full rounded-full bg-warning" style={{ width: `${Math.min(100, (c.have / c.need) * 100)}%` }} />
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
