import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/AuthForms";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { enabledProviders } from "@/lib/auth/providers";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const [{ error }, providers] = await Promise.all([searchParams, enabledProviders()]);
  return (
    <>
      <h1 className="font-display text-4xl">Welcome back</h1>
      <p className="mb-8 mt-2 text-fg-muted">Log in to pick up where you left off.</p>
      <OAuthButtons providers={providers} />
      <LoginForm linkError={error === "link"} oauthError={error === "oauth"} />
      <p className="mt-8 text-sm text-fg-muted">
        New to Aviant?{" "}
        <Link href="/signup" className="text-accent">
          Create a free account
        </Link>
      </p>
    </>
  );
}
