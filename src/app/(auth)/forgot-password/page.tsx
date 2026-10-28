import type { Metadata } from "next";
import Link from "next/link";
import { ForgotForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-display text-4xl">Reset your password</h1>
      <p className="mb-8 mt-2 text-fg-muted">Enter your email and we&rsquo;ll send you a reset link.</p>
      <ForgotForm />
      <p className="mt-8 text-sm text-fg-muted">
        <Link href="/login" className="text-accent">
          Back to log in
        </Link>
      </p>
    </>
  );
}
