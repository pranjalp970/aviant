import { ArrowRight, BookOpenText, Cards, CheckCircle, Circle, Microphone, Sparkle, Timer, AirplaneTakeoff } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import Link from "next/link";
import type { SessionItem } from "@/lib/plan/engine";

const ICON = { review: Cards, new: Sparkle, teach: Microphone, lesson: BookOpenText, quiz: Timer, oral: Microphone, checkride: AirplaneTakeoff };

/** The day's checklist from the plan engine. */
export function TodaySession({ items }: { items: SessionItem[] }) {
  return (
    <ol className="space-y-2">
      {items.map((item) => {
        const Icon = ICON[item.kind];
        return (
          <li key={item.id}>
            <Link
              href={item.href}
              className={clsx(
                "group flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition-colors",
                item.done ? "border-border bg-inset/50" : "border-border-strong bg-inset hover:border-green/50",
              )}
            >
              {item.done ? (
                <CheckCircle size={22} weight="fill" className="shrink-0 text-green" aria-label="Done" />
              ) : (
                <Circle size={22} className="shrink-0 text-fg-subtle" aria-label="To do" />
              )}
              <span className="min-w-0 flex-1">
                <span className={clsx("flex items-center gap-2 text-[15px]", item.done ? "text-fg-muted line-through decoration-fg-subtle" : "text-fg")}>
                  <Icon size={15} className="shrink-0 text-green" aria-hidden />
                  <span className="truncate">{item.title}</span>
                </span>
                <span className="block truncate text-sm text-fg-subtle">{item.detail}</span>
              </span>
              {!item.done && item.minutes > 0 && <span className="shrink-0 text-sm tabular-nums text-fg-subtle">{item.minutes} min</span>}
              {!item.done && <ArrowRight size={16} className="shrink-0 text-fg-subtle transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden />}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
