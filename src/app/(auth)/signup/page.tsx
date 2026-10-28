import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/auth/AuthForms";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { enabledProviders } from "@/lib/auth/providers";

export const metadata: Metadata = { title: "Create account" };

export default async function SignupPage() {
  const providers = await enabledProviders();
  return (
    <>
      <h1 className="font-display text-4xl">Start training</h1>
      <p className="mb-8 mt-2 text-fg-muted">Free during beta. No card required.</p>
      <OAuthButtons providers={providers} />
      <SignupForm />
      <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="text-fg-muted underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-fg-muted underline">
          Privacy Policy
        </Link>
        .
      </p>
      <p className="mt-8 text-sm text-fg-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-accent">
          Log in
        </Link>
      </p>
    </>
  );
}
