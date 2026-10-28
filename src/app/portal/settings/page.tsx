import type { Metadata } from "next";
import Link from "next/link";
import { RatingPicker } from "@/components/auth/RatingPicker";
import { DeleteAccount } from "@/components/portal/DeleteAccount";
import { PageHeader } from "@/components/portal/PageHeader";
import { ThemePicker } from "@/components/portal/ThemePicker";
import { Field } from "@/components/ui/Field";
import { buttonClass } from "@/components/ui/button";
import { logout, updateTraining } from "@/lib/auth/actions";
import { getSession } from "@/lib/auth/session";
import { saveStudyPlanForm } from "@/lib/plan/actions";

export const metadata: Metadata = { title: "Settings" };

const selectClass =
  "h-12 w-full cursor-pointer rounded-xl border border-border-strong bg-inset px-4 text-base text-fg focus:border-green focus:outline-none";

export default async function SettingsPage() {
  const session = (await getSession())!;

  return (
    <>
      <PageHeader title="Settings" description="Your profile, your study plan, and how Aviant looks." />
      <div className="max-w-2xl space-y-6">
        {/* Study plan */}
        <form id="plan" action={saveStudyPlanForm} className="card scroll-mt-24 space-y-6 p-7">
          <div>
            <h2 className="font-display text-xl">Study plan</h2>
            <p className="mt-1 text-sm text-fg-muted">Your plan recalculates from these right away.</p>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm text-fg-muted">Written (knowledge) test</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { v: "not_taken", label: "Not taken yet" },
                { v: "passed", label: "Passed" },
              ].map((o) => (
                <label
                  key={o.v}
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border-strong bg-inset px-4 text-sm has-[:checked]:border-green has-[:checked]:bg-green/10"
                >
                  <input type="radio" name="written_status" value={o.v} defaultChecked={session.writtenStatus === o.v} className="accent-[var(--green)]" />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Written test date" name="written_date" type="date" defaultValue={session.writtenDate ?? ""} hint="Leave blank if not scheduled." />
            <Field label="Checkride date" name="checkride_date" type="date" defaultValue={session.checkrideDate ?? ""} hint="Leave blank if not scheduled." />
          </div>

          <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
            <Field label="Written score (%)" name="written_score" type="number" min={0} max={100} inputMode="numeric" defaultValue={session.writtenScore ?? ""} />
            <Field
              label="Missed ACS codes (from your test report)"
              name="missed_acs_codes"
              defaultValue={session.missedAcsCodes.join(", ")}
              placeholder="e.g. PA.I.E.K1, PA.IX.A.K3"
              hint="Your plan and mock orals focus on these."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm text-fg-muted">Study days per week</span>
              <select name="study_days_per_week" defaultValue={session.studyDaysPerWeek} className={selectClass}>
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <option key={d} value={d}>
                    {d} day{d === 1 ? "" : "s"}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-fg-muted">Minutes per study day</span>
              <select name="study_minutes_per_day" defaultValue={session.studyMinutesPerDay} className={selectClass}>
                {[15, 20, 30, 45, 60, 90, 120].map((m) => (
                  <option key={m} value={m}>
                    {m} minutes
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" className={buttonClass("primary")}>
              Save plan
            </button>
            <Link href="/onboarding" className="text-sm text-fg-muted">
              Redo setup (confidence + knowledge check)
            </Link>
          </div>
        </form>

        <form action={updateTraining} className="card space-y-6 p-7">
          <h2 className="font-display text-xl">Profile</h2>
          <Field label="Name" name="name" defaultValue={session.name} autoComplete="name" />
          <div>
            <p className="mb-1.5 text-sm text-fg-muted">Email</p>
            <p className="text-fg">{session.email}</p>
          </div>
          <RatingPicker value={session.rating} waitlist={session.irWaitlist} legend="Training for" />
          <button type="submit" className={buttonClass("primary")}>
            Save profile
          </button>
        </form>

        <section aria-labelledby="appearance" className="card p-7">
          <h2 id="appearance" className="mb-5 font-display text-xl">
            Appearance
          </h2>
          <ThemePicker />
        </section>

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
