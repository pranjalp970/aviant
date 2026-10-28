import { Fire, Snowflake, Trophy } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import Link from "next/link";
import { ProgressRing } from "@/components/ui/ProgressRing";
import type { Progress } from "@/lib/progress/load";

/** Daily goal, streak and rank as one instrument strip: three readouts, divided by hairlines. */
export function ProgressStrip({ progress }: { progress: Progress }) {
  const { goal, streak, rank, xp } = progress;
  const ratio = Math.min(1, goal.minutes / Math.max(1, goal.target));

  return (
    <div className="card grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {/* Daily goal */}
      <div className="flex items-center gap-4 p-5">
        <ProgressRing value={ratio} size={56} stroke={5} label={`Daily goal: ${goal.minutes} of ${goal.target} minutes`} />
        <div className="min-w-0">
          <p className="annot text-fg-subtle">Daily goal</p>
          <p className="mt-1 font-display text-xl tabular-nums">
            {goal.minutes}
            <span className="text-sm text-fg-subtle"> / {goal.target} min</span>
          </p>
          <p className={clsx("text-xs", goal.met ? "text-accent" : "text-fg-subtle")}>{goal.met ? "Goal met · +50 XP" : `${goal.target - goal.minutes} min to go`}</p>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-4 p-5">
        <span className={clsx("grid size-14 shrink-0 place-items-center rounded-ui", streak.current > 0 ? "bg-green/12 text-accent" : "bg-surface-strong text-fg-subtle")}>
          <Fire size={26} weight={streak.current > 0 ? "fill" : "regular"} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="annot text-fg-subtle">Study streak</p>
          <p className="mt-1 font-display text-xl tabular-nums">
            {streak.current} <span className="text-sm text-fg-subtle">day{streak.current === 1 ? "" : "s"}</span>
          </p>
          <p className="flex items-center gap-1 text-xs text-fg-subtle">
            {streak.atRisk ? (
              <span className="text-warning">Study today to keep it going</span>
            ) : streak.freezeUsed ? (
              <>
                <Snowflake size={12} aria-hidden /> A streak freeze saved a missed day
              </>
            ) : (
              `Best: ${streak.best} day${streak.best === 1 ? "" : "s"}`
            )}
          </p>
        </div>
      </div>

      {/* Rank */}
      <Link href="/portal/logbook" className="group flex items-center gap-4 p-5 transition-colors hover:bg-surface-strong">
        <span className="grid size-14 shrink-0 place-items-center rounded-ui bg-green/12 text-accent">
          <Trophy size={26} weight="fill" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="annot text-fg-subtle">Rank · {xp.toLocaleString()} XP</p>
          <p className="mt-1 truncate font-display text-xl">{rank.title}</p>
          <div className="mt-2 h-1 overflow-hidden bg-surface-strong" aria-hidden>
            <div className="h-full bg-green" style={{ width: `${rank.progress * 100}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-fg-subtle">{rank.next ? `${rank.toNext.toLocaleString()} XP to ${rank.next}` : "Top rank"}</p>
        </div>
      </Link>
    </div>
  );
}
