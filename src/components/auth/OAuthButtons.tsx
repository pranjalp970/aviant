import { signInWithProvider } from "@/lib/auth/actions";
import type { OAuthProvider } from "@/lib/auth/providers";

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg viewBox="0 0 17 20" className="h-5 w-auto" aria-hidden>
      <path
        fill="currentColor"
        d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9C3.6 4.8 2 5.8 1.1 7.4c-1.8 3.2-.5 7.9 1.3 10.5.9 1.3 1.9 2.7 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.6 1-1.5 1.4-2.9 1.4-3-.1 0-2.7-1-2.7-4.3zM11.6 3c.7-.9 1.2-2 1-3.2-1 0-2.2.7-3 1.6-.6.7-1.2 1.9-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"
      />
    </svg>
  );
}

const LABELS: Record<OAuthProvider, string> = { google: "Continue with Google", apple: "Continue with Apple" };

/** Social sign-in buttons. Renders nothing when no provider is enabled in Supabase. */
export function OAuthButtons({ providers }: { providers: OAuthProvider[] }) {
  if (!providers.length) return null;
  return (
    <div className="mb-6">
      <div className="grid gap-3">
        {providers.map((p) => (
          <form key={p} action={signInWithProvider}>
            <input type="hidden" name="provider" value={p} />
            <button
              type="submit"
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-border-strong bg-white text-sm font-medium text-black"
            >
              {p === "google" ? <GoogleMark /> : <AppleMark />}
              {LABELS[p]}
            </button>
          </form>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4 text-sm text-fg-subtle">
        <span className="h-px flex-1 bg-border" aria-hidden />
        or use email
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>
    </div>
  );
}
