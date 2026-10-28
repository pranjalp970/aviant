"use client";

import { ArrowRight, FilePdf, Trash } from "@phosphor-icons/react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteCheckride } from "@/lib/checkride/actions";

interface Item {
  id: string;
  aircraft: string;
  departure: string;
  destination: string;
  docs: number;
  created: string;
}

export function CheckrideList({ items }: { items: Item[] }) {
  const [pending, start] = useTransition();
  const [removing, setRemoving] = useState<string | null>(null);

  if (!items.length) return null;
  return (
    <section aria-labelledby="past" className="mt-12">
      <h2 id="past" className="mb-4 font-display text-2xl">
        Your checkrides
      </h2>
      <ul className="space-y-3">
        {items.map((c) => (
          <li key={c.id} className="card flex items-center gap-4 p-5">
            <Link href={`/portal/checkride/${c.id}`} className="flex min-w-0 flex-1 items-center gap-4">
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-lg text-fg">
                  {c.departure} → {c.destination}
                </span>
                <span className="flex items-center gap-2 text-sm text-fg-subtle">
                  {c.aircraft} · {c.created}
                  {c.docs > 0 && (
                    <span className="inline-flex items-center gap-1">
                      · <FilePdf size={14} aria-hidden /> {c.docs}
                    </span>
                  )}
                </span>
              </span>
              <span className="hidden items-center gap-1 text-sm text-accent sm:inline-flex">
                Continue <ArrowRight size={14} className="transition-transform" aria-hidden />
              </span>
            </Link>
            <button
              type="button"
              disabled={pending && removing === c.id}
              onClick={() => {
                if (!confirm(`Delete the ${c.departure} → ${c.destination} checkride and its uploaded files?`)) return;
                setRemoving(c.id);
                start(async () => {
                  await deleteCheckride(c.id);
                  setRemoving(null);
                });
              }}
              aria-label={`Delete ${c.departure} to ${c.destination} checkride`}
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg text-fg-subtle disabled:opacity-50"
            >
              <Trash size={18} aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
