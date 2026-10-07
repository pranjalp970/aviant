import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Refreshes the Supabase session, then applies optimistic route gating.
// Pages re-check the session server-side; this only avoids a flash.
export async function proxy(request: NextRequest) {
  const { response, userId } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const redirect = (to: URL) => {
    const r = NextResponse.redirect(to);
    response.cookies.getAll().forEach((c) => r.cookies.set(c)); // keep refreshed cookies
    return r;
  };

  if ((pathname.startsWith("/portal") || pathname === "/onboarding") && !userId) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", pathname);
    return redirect(url);
  }
  if ((pathname === "/login" || pathname === "/signup") && userId) {
    return redirect(new URL("/portal", request.url));
  }
  return response;
}

export const config = {
  matcher: ["/portal/:path*", "/onboarding", "/login", "/signup", "/reset-password", "/api/:path*"],
};
