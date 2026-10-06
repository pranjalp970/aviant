"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AuthState {
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "password" | "confirm", string>>;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function siteOrigin() {
  const h = await headers();
  return h.get("origin") ?? `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
}

/** Supabase error → something a student can act on. */
function friendly(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "That email and password don't match. Check them and try again.";
  if (m.includes("email not confirmed")) return "Confirm your email first. Check your inbox for the link we sent.";
  if (m.includes("already registered")) return "An account with this email already exists. Try logging in instead.";
  if (m.includes("rate limit") || m.includes("too many")) return "Too many attempts. Wait a minute and try again.";
  if (m.includes("password")) return message;
  return "Something went wrong. Please try again.";
}

export async function login(_: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fieldErrors: AuthState["fieldErrors"] = {};
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (!password) fieldErrors.password = "Enter your password.";
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: friendly(error.message) };
  redirect("/portal");
}

export async function signup(_: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const rating = formData.get("rating") === "ir" ? "ir" : "ppl";
  const fieldErrors: AuthState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Tell us what to call you.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (password.length < 8) fieldErrors.password = "Use at least 8 characters.";
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, rating }, // copied into the profile by the on_auth_user_created trigger
      emailRedirectTo: `${await siteOrigin()}/auth/confirm?next=/portal`,
    },
  });
  if (error) return { error: friendly(error.message) };
  if (!data.session) {
    // email confirmation is on: no session until they click the link
    return { message: `Almost there. We sent a confirmation link to ${email}. Click it to activate your account.` };
  }
  redirect("/portal");
}

export async function requestPasswordReset(_: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_RE.test(email)) return { fieldErrors: { email: "Enter a valid email address." } };
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await siteOrigin()}/auth/confirm?next=/reset-password`,
  });
  if (error && error.message.toLowerCase().includes("rate")) return { error: friendly(error.message) };
  // Same message whether or not the account exists, so emails can't be probed.
  return { message: `If an account exists for ${email}, a reset link is on its way.` };
}

export async function updatePassword(_: AuthState, formData: FormData): Promise<AuthState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (password.length < 8) return { fieldErrors: { password: "Use at least 8 characters." } };
  if (password !== confirm) return { fieldErrors: { confirm: "The passwords don't match." } };
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: friendly(error.message) };
  redirect("/portal");
}

export async function updateTraining(formData: FormData) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const uid = data?.claims?.sub;
  if (!uid) redirect("/login");
  const name = String(formData.get("name") ?? "").trim();
  const rating = formData.get("rating") === "ir" ? "ir" : "ppl";
  const date = String(formData.get("checkride_date") ?? "").trim();
  const checkride_date = /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null;
  await supabase
    .from("profiles")
    .update({ rating, checkride_date, ...(name ? { name } : {}) })
    .eq("id", uid);
  revalidatePath("/portal", "layout");
}

/** "Continue with Google / Apple": send the student to the provider, then back to /auth/confirm. */
export async function signInWithProvider(formData: FormData) {
  const provider = formData.get("provider");
  if (provider !== "google" && provider !== "apple") redirect("/login");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${await siteOrigin()}/auth/confirm?next=/portal` },
  });
  if (error || !data.url) redirect("/login?error=oauth");
  redirect(data.url);
}

/** Permanently delete the signed-in student's account and everything attached to it. */
export async function deleteAccount(_: AuthState, formData: FormData): Promise<AuthState> {
  if (String(formData.get("confirm") ?? "").trim().toUpperCase() !== "DELETE") {
    return { fieldErrors: { confirm: 'Type DELETE to confirm.' } };
  }
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const uid = data?.claims?.sub;
  if (!uid) redirect("/login");

  // 1. Uploaded checkride files: copies sent to Anthropic, then our storage.
  const { data: sessions } = await supabase.from("checkride_sessions").select("documents");
  const docs = (sessions ?? []).flatMap((s) => (s.documents ?? []) as { fileId?: string; path?: string }[]);
  if (process.env.ANTHROPIC_API_KEY && docs.some((d) => d.fileId)) {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const anthropic = new Anthropic();
    await Promise.allSettled(docs.filter((d) => d.fileId).map((d) => anthropic.files.delete(d.fileId!)));
  }
  const { data: stored } = await supabase.storage.from("checkride-docs").list(uid, { limit: 1000 });
  if (stored?.length) await supabase.storage.from("checkride-docs").remove(stored.map((f) => `${uid}/${f.name}`));

  // 2. The account itself; all app tables cascade from it.
  const { error } = await supabase.rpc("delete_own_account");
  if (error) {
    console.error("delete_own_account", error.message);
    return { error: "We couldn't delete your account just now. Please try again in a minute." };
  }
  await supabase.auth.signOut();
  redirect("/?account=deleted");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
