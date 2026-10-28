"use client";

import { useActionState } from "react";
import Link from "next/link";
import { RatingPicker } from "@/components/auth/RatingPicker";
import { Field } from "@/components/ui/Field";
import { buttonClass } from "@/components/ui/button";
import { login, requestPasswordReset, signup, updatePassword, type AuthState } from "@/lib/auth/actions";

const initial: AuthState = {};

function Submit({ pending, idle, busy }: { pending: boolean; idle: string; busy: string }) {
  return (
    <button type="submit" disabled={pending} aria-busy={pending} className={buttonClass("primary", "lg", "mt-2 w-full")}>
      {pending ? busy : idle}
    </button>
  );
}

function FormError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p role="alert" className="rounded-ui border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-fg">
      {error}
    </p>
  );
}

function Notice({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div role="status" className="rounded-ui border border-green/40 bg-green/10 p-5 text-sm leading-relaxed text-fg">
      {children}
      {action}
    </div>
  );
}

export function LoginForm({ linkError, oauthError }: { linkError?: boolean; oauthError?: boolean }) {
  const [state, action, pending] = useActionState(login, initial);
  return (
    <form action={action} noValidate className="space-y-5">
      <FormError
        error={
          state.error ??
          (linkError
            ? "That link has expired or was already used. Log in, or request a new link."
            : oauthError
              ? "Sign-in was cancelled or didn't complete. Try again, or use your email."
              : undefined)
        }
      />
      <Field label="Email" name="email" type="email" autoComplete="email" required error={state.fieldErrors?.email} />
      <div>
        <Field label="Password" name="password" type="password" autoComplete="current-password" required error={state.fieldErrors?.password} />
        <Link href="/forgot-password" className="mt-2 inline-block text-sm text-fg-muted">
          Forgot password?
        </Link>
      </div>
      <Submit pending={pending} idle="Log in" busy="Logging in…" />
    </form>
  );
}

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, initial);
  if (state.message) {
    return (
      <Notice
        action={
          <Link href="/login" className="mt-4 block text-accent">
            Go to log in
          </Link>
        }
      >
        {state.message}
        <span className="mt-2 block text-sm text-fg-muted">Can&rsquo;t find it? Check your spam folder.</span>
      </Notice>
    );
  }
  return (
    <form action={action} noValidate className="space-y-5">
      <FormError error={state.error} />
      <Field label="Name" name="name" autoComplete="name" required error={state.fieldErrors?.name} />
      <Field label="Email" name="email" type="email" autoComplete="email" required error={state.fieldErrors?.email} />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        hint="At least 8 characters."
        error={state.fieldErrors?.password}
      />
      <RatingPicker />
      <Submit pending={pending} idle="Create account" busy="Creating account…" />
    </form>
  );
}

export function ForgotForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, initial);
  if (state.message) {
    return (
      <Notice
        action={
          <Link href="/login" className="mt-4 block text-accent">
            Back to log in
          </Link>
        }
      >
        {state.message}
      </Notice>
    );
  }
  return (
    <form action={action} noValidate className="space-y-5">
      <FormError error={state.error} />
      <Field label="Email" name="email" type="email" autoComplete="email" required error={state.fieldErrors?.email} />
      <Submit pending={pending} idle="Send reset link" busy="Sending…" />
    </form>
  );
}

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(updatePassword, initial);
  return (
    <form action={action} noValidate className="space-y-5">
      <FormError error={state.error} />
      <Field
        label="New password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        hint="At least 8 characters."
        error={state.fieldErrors?.password}
      />
      <Field label="Confirm new password" name="confirm" type="password" autoComplete="new-password" required error={state.fieldErrors?.confirm} />
      <Submit pending={pending} idle="Save new password" busy="Saving…" />
    </form>
  );
}
