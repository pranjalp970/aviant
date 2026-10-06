import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Landing point for links in Supabase emails (sign-up confirmation, password
 * reset). Handles both the PKCE `code` flow and `token_hash` links, starts the
 * session, then forwards to `next`.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const nextParam = searchParams.get("next") ?? "/portal";
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/portal"; // same-site only

  // Cancelled or failed Google/Apple sign-in comes back with an error instead of a code.
  if (searchParams.get("error")) return NextResponse.redirect(new URL("/login?error=oauth", origin));

  const supabase = await createClient();
  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : tokenHash && type
      ? await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
      : { error: new Error("Missing code") };

  if (error) return NextResponse.redirect(new URL("/login?error=link", origin));
  return NextResponse.redirect(new URL(next, origin));
}
