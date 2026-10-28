import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/auth/AuthForms";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Set a new password" };

// Reached from the reset email via /auth/confirm, which signs the student in first.
export default async function ResetPasswordPage() {
  if (!(await getSession())) redirect("/forgot-password");
  return (
    <>
      <h1 className="font-display text-4xl">Set a new password</h1>
      <p className="mb-8 mt-2 text-fg-muted">Choose a new password for your account.</p>
      <ResetPasswordForm />
      <p className="mt-8 text-sm text-fg-muted">
        <Link href="/portal" className="text-accent">
          Skip for now
        </Link>
      </p>
    </>
  );
}
