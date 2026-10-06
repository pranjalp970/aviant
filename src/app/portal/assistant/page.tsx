import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/portal/PageHeader";
import { VoiceAssistant } from "@/components/portal/VoiceAssistant";
import { ratingById } from "@/content/acs";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Voice CFI" };

export default async function AssistantPage({ searchParams }: PageProps<"/portal/assistant">) {
  const session = (await getSession())!;
  const { mode } = await searchParams;
  const rating = ratingById(session.rating);

  return (
    <>
      <PageHeader
        eyebrow="Voice CFI & DPE"
        title="Talk it through"
        description="One assistant, two modes. Learn with your CFI, then switch to Examine for a checkride-style oral."
        action={
          <Link href="/portal/checkride" className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-accent">
            Full mock checkride with your own plan →
          </Link>
        }
      />
      <VoiceAssistant rating={session.rating} ratingLabel={rating.short} initialMode={mode === "examine" ? "examine" : "teach"}
        savedVoices={{ cfi: session.voiceCfi ?? undefined, dpe: session.voiceDpe ?? undefined }}
      />
    </>
  );
}
