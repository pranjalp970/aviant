import type { Metadata } from "next";
import { CheckrideList } from "@/components/portal/CheckrideList";
import { CheckrideSetup } from "@/components/portal/CheckrideSetup";
import { PageHeader } from "@/components/portal/PageHeader";
import { getSession } from "@/lib/auth/session";
import { listCheckrides } from "@/lib/checkride/queries";

export const metadata: Metadata = { title: "Mock checkride" };
// Preparing a large POH for the examiner can take a little while.
export const maxDuration = 120;

export default async function CheckridePage() {
  const session = (await getSession())!;
  const rows = await listCheckrides();
  const enabled = !!process.env.ANTHROPIC_API_KEY;

  return (
    <>
      <PageHeader
        eyebrow="Full mock checkride"
        title="Rehearse the real thing"
        description="Real examiners have you plan a cross-country and then question you on it. Upload yours, and the AI examiner will do the same: your weather, your performance numbers, your weight and balance, your go/no-go call."
      />
      {enabled ? (
        <CheckrideSetup userId={session.id} />
      ) : (
        <p className="card p-7 text-fg-muted">The AI examiner isn&rsquo;t switched on yet, so mock checkrides aren&rsquo;t available.</p>
      )}
      <CheckrideList
        items={rows.map((r) => ({
          id: r.id,
          aircraft: r.aircraft,
          departure: r.departure,
          destination: r.destination,
          docs: r.documents.length,
          created: new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        }))}
      />
    </>
  );
}
