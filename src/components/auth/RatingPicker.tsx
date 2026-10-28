import { RATINGS } from "@/content/acs";
import type { RatingId } from "@/content/types";

/** Rating choice for signup and Settings. Unavailable ratings show as "Coming soon" with a waitlist opt-in. */
export function RatingPicker({ value = "ppl", waitlist = false, legend = "I’m training for" }: { value?: RatingId; waitlist?: boolean; legend?: string }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm text-fg-muted">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {RATINGS.map((r) =>
          r.available ? (
            <label
              key={r.id}
              className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-border-strong bg-inset px-4 has-[:checked]:border-green has-[:checked]:bg-green/10"
            >
              <input type="radio" name="rating" value={r.id} defaultChecked={value === r.id} className="accent-[var(--green)]" />
              <span>
                <span className="block text-sm text-fg">{r.short}</span>
                <span className="block text-xs text-fg-subtle">{r.acsCode}</span>
              </span>
            </label>
          ) : (
            <div key={r.id} className="rounded-xl border border-dashed border-border-strong px-4 py-2.5">
              <p className="flex items-center justify-between gap-2 text-sm text-fg-muted">
                {r.short}
                <span className="rounded-full bg-green/12 px-2 py-0.5 text-xs text-accent">Coming soon</span>
              </p>
              <label className="mt-1.5 flex cursor-pointer items-center gap-2 text-xs text-fg-subtle">
                <input type="checkbox" name={`${r.id}_waitlist`} defaultChecked={waitlist} className="accent-[var(--green)]" />
                Notify me when it launches
              </label>
            </div>
          ),
        )}
      </div>
    </fieldset>
  );
}
