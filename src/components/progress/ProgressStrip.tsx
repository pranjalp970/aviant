import { Fire, Snowflake, Trophy } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import Link from "next/link";
import type { Progress } from "@/lib/progress/load";

/** Daily goal ring + streak + rank/XP: the "keep coming back" row on the dashboard. */
export function ProgressStrip({ progress }: { progress: Progress }) {
  const { goal, streak, rank, xp } = progress;
  const ratio = Math.min(1, goal.minutes / Math.max(1, goal.target));
  const r = 26;
  const c = 2 * Math.PI * r;

  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-3">
      {/* Daily goal */}
      <div className="card flex items-center gap-4 p-4">
        <svg viewBox="0 0 64 64" className="size-16 shrink-0 -rotate-90" role="img" aria-label={`Daily goal: ${goal.minutes} of ${goal.target} minutes`}>
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--track)" strokeWidth="7" />
          <circle cx="32" cy="32" r={r} fill="none" stroke="var(--green)" strokeWidth="7" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - ratio)} />
        </svg>
        <div className="min-w-0">
          <p className="text-sm text-fg-subtle">Daily goal</p>
          <p className="font-display text-xl tabular-nums">
            {goal.minutes}
            <span className="text-sm text-fg-subtle"> / {goal.target} min</span>
          </p>
          <p className={clsx("text-xs", goal.met ? "text-accent" : "text-fg-subtle")}>{goal.met ? "Goal met · +50 XP" : `${goal.target - goal.minutes} min to go`}</p>
        </div>
      </div>

      {/* Streak */}
      <div className="card flex items-center gap-4 p-4">
        <span className={clsx("grid size-16 shrink-0 place-items-center rounded-full", streak.current > 0 ? "bg-warning/12 text-warning" : "bg-surface-strong text-fg-subtle")}>
          <Fire size={30} weight={streak.current > 0 ? "fill" : "regular"} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-fg-subtle">Study streak</p>
          <p className="font-display text-xl tabular-nums">
            {streak.current} <span className="text-sm text-fg-subtle">day{streak.current === 1 ? "" : "s"}</span>
          </p>
          <p className="flex items-center gap-1 text-xs text-fg-subtle">
            {streak.atRisk ? (
              <span className="text-warning">Study today to keep it going</span>
            ) : streak.freezeUsed ? (
              <>
                <Snowflake size={12} aria-hidden /> Streak freeze saved a missed day
              </>
            ) : (
              `Best: ${streak.best} days`
            )}
          </p>
        </div>
      </div>

      {/* Rank */}
      <Link href="/portal/logbook" className="card group flex items-center gap-4 p-4 transition-colors hover:border-green/40">
        <span className="grid size-16 shrink-0 place-items-center rounded-full bg-green/12 text-green">
          <Trophy size={30} weight="fill" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-fg-subtle">Rank · {xp.toLocaleString()} XP</p>
          <p className="truncate font-display text-xl group-hover:text-accent">{rank.title}</p>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-strong" aria-hidden>
            <div className="h-full rounded-full bg-green" style={{ width: `${rank.progress * 100}%` }} />
          </div>
          <p className="mt-1 text-xs text-fg-subtle">{rank.next ? `${rank.toNext.toLocaleString()} XP to ${rank.next}` : "Top rank!"}</p>
        </div>
      </Link>
    </div>
  );
}
