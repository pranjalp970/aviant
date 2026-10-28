"use client";

import { Warning } from "@phosphor-icons/react";
import { useActionState, useState } from "react";
import { Field } from "@/components/ui/Field";
import { deleteAccount, type AuthState } from "@/lib/auth/actions";

export function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(deleteAccount, {} as AuthState);

  return (
    <section aria-labelledby="danger" className="rounded-ui border border-danger/30 p-7">
      <h2 id="danger" className="flex items-center gap-2 font-display text-xl text-fg">
        <Warning size={20} className="text-danger" aria-hidden /> Delete account
      </h2>
      <p className="mt-2 text-sm text-fg-muted">
        Permanently deletes your account, study history, oral sessions, and uploaded files. This can&rsquo;t be undone.
      </p>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
     className="mt-5 inline-flex h-11 cursor-pointer transition-colors hover:bg-danger/10 items-center rounded-ui border border-danger/50 px-5 text-sm text-danger"
        >
          Delete my account…
        </button>
      ) : (
        <form action={action} className="mt-5 space-y-4" noValidate>
          {state.error && (
            <p role="alert" className="rounded-ui border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-fg">
              {state.error}
            </p>
          )}
          <Field label="Type DELETE to confirm" name="confirm" autoComplete="off" autoCapitalize="characters" error={state.fieldErrors?.confirm} />
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={pending}
       className="inline-flex h-11 cursor-pointer hover:opacity-90 items-center rounded-ui bg-danger px-5 text-sm font-medium text-bg transition-opacity disabled:opacity-50"
            >
              {pending ? "Deleting…" : "Permanently delete"}
            </button>
      <button type="button" onClick={() => setOpen(false)} className="inline-flex h-11 cursor-pointer transition-colors hover:bg-surface-strong hover:text-fg items-center rounded-ui px-5 text-sm text-fg-muted">
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
