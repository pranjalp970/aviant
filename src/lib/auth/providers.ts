import "server-only";

export type OAuthProvider = "google" | "apple";

/**
 * Which social sign-ins are switched on in Supabase (Authentication → Providers).
 * Buttons only render for enabled providers, so enabling one in the dashboard
 * makes it appear here within a few minutes. No code change needed.
 */
export async function enabledProviders(): Promise<OAuthProvider[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! },
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const { external } = (await res.json()) as { external?: Record<string, boolean> };
    return (["google", "apple"] as const).filter((p) => external?.[p]);
  } catch {
    return [];
  }
}
