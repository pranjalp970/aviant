import { ArrowLeft, FilePdf } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/portal/PageHeader";
import { VoiceAssistant } from "@/components/portal/VoiceAssistant";
import { ratingById } from "@/content/acs";
import { getSession } from "@/lib/auth/session";
import { getCheckride } from "@/lib/checkride/queries";

export const metadata: Metadata = { title: "Mock checkride" };

export default async function CheckrideSessionPage({ params }: PageProps<"/portal/checkride/[id]">) {
  const session = (await getSession())!;
  const row = await getCheckride((await params).id);
  if (!row) notFound();
  const label = `${row.departure} → ${row.destination}`;

  return (
    <>
      <Link href="/portal/checkride" className="mb-6 inline-flex min-h-10 items-center gap-2 text-sm text-fg-muted">
        <ArrowLeft size={14} aria-hidden /> All checkrides
      </Link>
      <PageHeader eyebrow={`Mock checkride · ${row.aircraft}`} title={label} description={row.notes || undefined} />
      {row.documents.length > 0 && (
        <ul className="-mt-6 mb-8 flex flex-wrap gap-2">
          {row.documents.map((d) => (
            <li key={d.fileId} className="inline-flex items-center gap-1.5 rounded-ui border border-border px-3 py-1 text-sm text-fg-muted">
              <FilePdf size={14} className="text-accent" aria-hidden /> {d.name}
            </li>
          ))}
        </ul>
      )}
      <VoiceAssistant
        rating={session.rating}
        ratingLabel={ratingById(session.rating).short}
        initialMode="examine"
        savedVoices={{ cfi: session.voiceCfi ?? undefined, dpe: session.voiceDpe ?? undefined }}
        checkride={{ id: row.id, label }}
      />
    </>
  );
}
