import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/portal/PageHeader";
import { VoiceAssistant } from "@/components/portal/VoiceAssistant";
import { ratingById } from "@/content/acs";
import { getSession } from "@/lib/auth/session";
import { topicById } from "@/lib/plan/topics";

export const metadata: Metadata = { title: "Voice CFI" };

export default async function AssistantPage({ searchParams }: PageProps<"/portal/assistant">) {
  const session = (await getSession())!;
  const { mode, topic } = await searchParams;
  const topicMeta = typeof topic === "string" ? topicById(topic) : undefined;
  const autoStart = topicMeta
    ? `Teach me ${topicMeta.title.toLowerCase()} for my private pilot written. Start with the essentials, then quiz me on it.`
    : undefined;
  const rating = ratingById(session.rating);

  return (
    <>
      <PageHeader
        eyebrow="Voice CFI & DPE"
        title="Talk it through"
        description="One assistant, two modes. Learn with your CFI, then switch to Examine for a checkride-style oral."
        action={
          <Link href="/portal/checkride" className="inline-flex items-center gap-2 text-sm text-fg-muted">
            Full mock checkride with your own plan →
          </Link>
        }
      />
      <VoiceAssistant rating={session.rating} ratingLabel={rating.short} initialMode={mode === "examine" && !topicMeta ? "examine" : "teach"}
        savedVoices={{ cfi: session.voiceCfi ?? undefined, dpe: session.voiceDpe ?? undefined }}
        autoStart={autoStart}
        key={topicMeta?.id ?? "assistant"}
      />
    </>
  );
}
