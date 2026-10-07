"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession, type Confidence } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { loadPlan } from "./load";
import { ACS_CODE_RE, PLAN_TOPICS } from "./topics";

export interface StudyPlanInput {
  writtenStatus: "not_taken" | "passed";
  writtenDate: string | null;
  writtenScore: number | null;
  missedAcsCodes: string[];
  checkrideDate: string | null;
  studyDaysPerWeek: number;
  studyMinutesPerDay: number;
  topicConfidence?: Record<string, Confidence>;
  timezone?: string | null;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const validDate = (d: string | null | undefined) => (d && DATE_RE.test(d) && !Number.isNaN(Date.parse(d)) ? d : null);
const validTz = (tz: string | null | undefined) => {
  if (!tz) return null;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return tz.slice(0, 64);
  } catch {
    return null;
  }
};

/** "PA.I.E.K1, pa.vi.a.k1" → ["PA.I.E.K1", "PA.VI.A.K1"] (valid codes only, max 40). */
export async function parseAcsCodes(text: string): Promise<string[]> {
  return [...new Set(text.split(/[\s,;]+/).map((c) => c.trim().toUpperCase()).filter((c) => ACS_CODE_RE.test(c)))].slice(0, 40);
}

function toRow(input: StudyPlanInput) {
  const confidence = Object.fromEntries(
    Object.entries(input.topicConfidence ?? {}).filter(([k, v]) => PLAN_TOPICS.some((t) => t.id === k) && [1, 2, 3].includes(v)),
  );
  return {
    written_status: input.writtenStatus === "passed" ? "passed" : "not_taken",
    written_date: validDate(input.writtenDate),
    written_score: input.writtenScore != null && input.writtenScore >= 0 && input.writtenScore <= 100 ? Math.round(input.writtenScore) : null,
    missed_acs_codes: input.missedAcsCodes.filter((c) => ACS_CODE_RE.test(c)).slice(0, 40),
    checkride_date: validDate(input.checkrideDate),
    study_days_per_week: Math.min(7, Math.max(1, Math.round(input.studyDaysPerWeek || 5))),
    study_minutes_per_day: Math.min(240, Math.max(5, Math.round(input.studyMinutesPerDay || 30))),
    ...(input.topicConfidence ? { topic_confidence: confidence } : {}),
    ...(input.timezone !== undefined ? { timezone: validTz(input.timezone) } : {}),
  };
}

/** Onboarding: save the answers and mark the student as onboarded. */
export async function saveOnboarding(input: StudyPlanInput): Promise<{ ok: boolean; error?: string }> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Please log in again." };
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ ...toRow(input), onboarded_at: new Date().toISOString() })
    .eq("id", session.id);
  if (error) {
    console.error("saveOnboarding", error.message);
    return { ok: false, error: "We couldn't save your plan. Make sure the latest database update (005) has been applied." };
  }
  revalidatePath("/portal", "layout");
  return { ok: true };
}

/** Skip onboarding for now: defaults are used and the plan still adapts as they study. */
export async function skipOnboarding() {
  const session = await getSession();
  if (!session) redirect("/login");
  const supabase = await createClient();
  await supabase.from("profiles").update({ onboarded_at: new Date().toISOString() }).eq("id", session.id);
  redirect("/portal");
}

export interface PlanSummary {
  targetDate: string;
  dateSuggested: boolean;
  daysLeft: number;
  weeks: number;
  minutesPerDay: number;
  daysPerWeek: number;
  status: string;
  statusDetail: string;
  fix: string | null;
  phase: "written" | "checkride";
  focus: { title: string; share: number; reason: string }[];
  strong: string[];
}

/** The freshly built plan, for the last onboarding step. */
export async function planSummary(): Promise<PlanSummary | null> {
  const session = await getSession();
  if (!session) return null;
  const { plan } = await loadPlan(session);
  const sorted = [...plan.topics].sort((a, b) => b.share - a.share);
  return {
    targetDate: plan.targetDate,
    dateSuggested: plan.dateSuggested,
    daysLeft: plan.daysLeft,
    weeks: plan.weeks.length,
    minutesPerDay: session.studyMinutesPerDay,
    daysPerWeek: session.studyDaysPerWeek,
    status: plan.status,
    statusDetail: plan.statusDetail,
    fix: plan.fix,
    phase: plan.phase,
    focus: sorted.slice(0, 3).map((t) => ({ title: t.title, share: t.share, reason: t.reason })),
    strong: [...plan.topics].filter((t) => t.knowledge >= 0.7).sort((a, b) => b.knowledge - a.knowledge).slice(0, 3).map((t) => t.title),
  };
}

/** Settings → Study plan form. */
export async function saveStudyPlanForm(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/login");
  const num = (k: string) => (formData.get(k) ? Number(formData.get(k)) : null);
  const supabase = await createClient();
  await supabase
    .from("profiles")
    .update(
      toRow({
        writtenStatus: formData.get("written_status") === "passed" ? "passed" : "not_taken",
        writtenDate: String(formData.get("written_date") ?? "") || null,
        writtenScore: num("written_score"),
        missedAcsCodes: await parseAcsCodes(String(formData.get("missed_acs_codes") ?? "")),
        checkrideDate: String(formData.get("checkride_date") ?? "") || null,
        studyDaysPerWeek: num("study_days_per_week") ?? session.studyDaysPerWeek,
        studyMinutesPerDay: num("study_minutes_per_day") ?? session.studyMinutesPerDay,
      }),
    )
    .eq("id", session.id);
  revalidatePath("/portal", "layout");
}
