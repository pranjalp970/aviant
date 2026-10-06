import type { Metadata } from "next";
import { PageHeader } from "@/components/portal/PageHeader";
import { Field } from "@/components/ui/Field";
import { buttonClass } from "@/components/ui/button";
import { RATINGS } from "@/content/acs";
import { DeleteAccount } from "@/components/portal/DeleteAccount";
import { ThemePicker } from "@/components/portal/ThemePicker";
import { logout, updateTraining } from "@/lib/auth/actions";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const session = (await getSession())!;

  return (
    <>
      <PageHeader title="Settings" description="Your profile and what you're training for." />
      <div className="max-w-2xl space-y-6">
        <section aria-labelledby="appearance" className="card p-7">
          <h2 id="appearance" className="mb-5 font-display text-xl">
            Appearance
          </h2>
          <ThemePicker />
        </section>

        <form action={updateTraining} className="card space-y-6 p-7">
          <h2 className="font-display text-xl">Profile</h2>
          <Field label="Name" name="name" defaultValue={session.name} autoComplete="name" />
          <div>
            <p className="mb-1.5 text-sm text-fg-muted">Email</p>
            <p className="text-fg">{session.email}</p>
          </div>
          <fieldset>
            <legend className="mb-2 text-sm text-fg-muted">Training for</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {RATINGS.map((r) => (
                <label
                  key={r.id}
                  className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-border-strong bg-inset px-4 transition-colors has-[:checked]:border-green has-[:checked]:bg-green/10"
                >
                  <input type="radio" name="rating" value={r.id} defaultChecked={session.rating === r.id} className="accent-[var(--green)]" />
                  <span>
                    <span className="block text-[15px] text-fg">{r.short}</span>
                    <span className="block text-xs text-fg-subtle">{r.acsCode}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <Field
            label="Checkride date (optional)"
            name="checkride_date"
            type="date"
            defaultValue={session.checkrideDate ?? ""}
            hint="Used for your countdown and daily study plan."
          />
          <button type="submit" className={buttonClass("primary")}>
            Save changes
          </button>
        </form>

        <section className="card flex flex-col gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl">Log out</h2>
            <p className="mt-1 text-sm text-fg-muted">You can log back in any time.</p>
          </div>
          <form action={logout}>
            <button type="submit" className={buttonClass("glass")}>
              Log out
            </button>
          </form>
        </section>

        <DeleteAccount />
      </div>
    </>
  );
}
