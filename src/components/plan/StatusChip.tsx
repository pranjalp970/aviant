import clsx from "clsx";
import type { PlanStatus } from "@/lib/plan/engine";

const LABEL: Record<PlanStatus, string> = { ahead: "Ahead of schedule", on_track: "On track", behind: "Behind schedule", overdue: "Date passed" };

export function StatusChip({ status }: { status: PlanStatus }) {
  const good = status === "ahead" || status === "on_track";
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        good ? "bg-green/12 text-accent" : "bg-warning/12 text-warning",
      )}
    >
      {LABEL[status]}
    </span>
  );
}
