import { AirplaneTakeoff, ArrowRight, BookOpenText, Cards, CheckCircle, Circle, Microphone, Sparkle, Timer } from "@phosphor-icons/react/dist/ssr";
import clsx from "clsx";
import Link from "next/link";
import type { SessionItem } from "@/lib/plan/engine";

const ICON = { review: Cards, new: Sparkle, teach: Microphone, lesson: BookOpenText, quiz: Timer, oral: Microphone, checkride: AirplaneTakeoff };

/** The day's checklist from the plan engine: one row per item, divided by hairlines. */
export function TodaySession({ items }: { items: SessionItem[] }) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {items.map((item) => {
        const Icon = ICON[item.kind];
        return (
          <li key={item.id}>
            <Link href={item.href} className="group -mx-2 flex items-center gap-4 rounded-ui px-2 py-4 transition-colors hover:bg-surface-strong">
              {item.done ? (
                <CheckCircle size={22} weight="fill" className="shrink-0 text-accent" aria-label="Done" />
              ) : (
                <Circle size={22} className="shrink-0 text-fg-subtle" aria-label="To do" />
              )}
              <span className="min-w-0 flex-1">
                <span className={clsx("flex items-center gap-2 text-sm", item.done ? "text-fg-subtle line-through decoration-fg-subtle" : "text-fg")}>
                  <Icon size={15} className="shrink-0 text-fg-subtle" aria-hidden />
                  <span className="min-w-0 truncate">{item.title}</span>
                </span>
                <span className="mt-0.5 block truncate text-sm text-fg-subtle">{item.detail}</span>
              </span>
              {!item.done && item.minutes > 0 && <span className="annot shrink-0 text-fg-subtle">{item.minutes} min</span>}
              {!item.done && <ArrowRight size={16} className="shrink-0 text-fg-subtle transition-colors group-hover:text-fg" aria-hidden />}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
