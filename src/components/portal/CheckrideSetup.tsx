"use client";

import { FilePdf, FileText, Image as ImageIcon, Trash, UploadSimple } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";
import { Field } from "@/components/ui/Field";
import { buttonClass } from "@/components/ui/button";
import { createCheckride, type UploadedFile } from "@/lib/checkride/actions";
import { createClient } from "@/lib/supabase/client";

const MAX_MB = 25;
const ACCEPT = "application/pdf,image/png,image/jpeg,image/webp,text/plain";
const ALLOWED = new Set(ACCEPT.split(","));

type Kind = UploadedFile["kind"];
interface Picked {
  file: File;
  kind: Kind;
}

const KIND_LABEL: Record<Kind, string> = { plan: "Cross-country plan", poh: "Aircraft POH / AFM", other: "Other" };

function FileIcon({ mime }: { mime: string }) {
  if (mime === "application/pdf") return <FilePdf size={20} className="text-green" aria-hidden />;
  if (mime.startsWith("image/")) return <ImageIcon size={20} className="text-green" aria-hidden />;
  return <FileText size={20} className="text-green" aria-hidden />;
}

export function CheckrideSetup({ userId }: { userId: string }) {
  const router = useRouter();
  const inputId = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const [kindForNext, setKindForNext] = useState<Kind>("plan");
  const [files, setFiles] = useState<Picked[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const busy = status !== null;

  function addFiles(list: FileList | null) {
    if (!list) return;
    setError(null);
    const next: Picked[] = [];
    for (const f of Array.from(list)) {
      if (!ALLOWED.has(f.type)) {
        setError(`${f.name}: use a PDF, image (PNG/JPG/WebP), or text file.`);
        continue;
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        setError(`${f.name} is over ${MAX_MB} MB. Upload just the sections you need (limitations, performance, weight & balance).`);
        continue;
      }
      next.push({ file: f, kind: kindForNext });
    }
    setFiles((prev) => [...prev, ...next].slice(0, 4));
    if (fileInput.current) fileInput.current.value = "";
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const aircraft = String(form.get("aircraft") ?? "").trim();
    const departure = String(form.get("departure") ?? "").trim();
    const destination = String(form.get("destination") ?? "").trim();
    if (!aircraft || !departure || !destination) {
      setError("Add your aircraft, departure, and destination.");
      return;
    }
    setError(null);
    try {
      // 1. Browser → private Supabase storage (keeps large POHs off our server's upload limit).
      const supabase = createClient();
      const uploaded: UploadedFile[] = [];
      for (const [n, p] of files.entries()) {
        setStatus(`Uploading ${n + 1} of ${files.length}: ${p.file.name}…`);
        const safe = p.file.name.replace(/[^\w.\-]+/g, "_").slice(-80);
        const path = `${userId}/${crypto.randomUUID()}-${safe}`;
        const { error: upErr } = await supabase.storage.from("checkride-docs").upload(path, p.file, { contentType: p.file.type });
        if (upErr) throw new Error(`Upload failed for ${p.file.name}. ${upErr.message}`);
        uploaded.push({ path, name: p.file.name, mime: p.file.type, kind: p.kind });
      }
      // 2. Server prepares them for the examiner and saves the session.
      setStatus(files.length ? "Preparing your documents for the examiner…" : "Setting up your checkride…");
      const res = await createCheckride({ aircraft, departure, destination, notes: String(form.get("notes") ?? ""), files: uploaded });
      if (res.error || !res.id) throw new Error(res.error ?? "Something went wrong.");
      router.push(`/portal/checkride/${res.id}`);
    } catch (err) {
      setStatus(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={submit} className="card space-y-6 p-7 sm:p-8" noValidate>
      <div>
        <h2 className="font-display text-2xl">New mock checkride</h2>
        <p className="mt-1 text-fg-muted">Tell the examiner about your planned cross-country, and upload your plan and your aircraft&rsquo;s POH.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Aircraft" name="aircraft" placeholder="e.g. Cessna 172S, N12345" required disabled={busy} />
        <Field label="Departure" name="departure" placeholder="e.g. KPAO" required disabled={busy} />
        <Field label="Destination" name="destination" placeholder="e.g. KSNS" required disabled={busy} />
      </div>

      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm text-fg-muted">
          Notes for the examiner <span className="text-fg-subtle">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          disabled={busy}
          placeholder="Planned date and time, passengers and bags, cruise altitude, anything else on your plan…"
          className="w-full resize-y rounded-xl border border-border-strong bg-inset px-4 py-3 text-base text-fg placeholder:text-fg-subtle focus:border-green focus:outline-none"
        />
      </div>

      <fieldset disabled={busy}>
        <legend className="mb-2 text-sm text-fg-muted">Documents (up to 4 files, {MAX_MB} MB each)</legend>
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor={`${inputId}-kind`} className="sr-only">
            Document type
          </label>
          <select
            id={`${inputId}-kind`}
            value={kindForNext}
            onChange={(e) => setKindForNext(e.target.value as Kind)}
            className="h-11 cursor-pointer rounded-xl border border-border-strong bg-inset px-3 text-[15px] text-fg focus:border-green focus:outline-none"
          >
            <option value="plan">Cross-country plan / nav log</option>
            <option value="poh">Aircraft POH / AFM</option>
            <option value="other">Other (weather briefing, W&amp;B…)</option>
          </select>
          <input ref={fileInput} id={inputId} type="file" accept={ACCEPT} multiple onChange={(e) => addFiles(e.target.files)} className="sr-only" />
          <label htmlFor={inputId} className={buttonClass("glass", "md", "cursor-pointer")}>
            <UploadSimple size={18} aria-hidden /> Add file
          </label>
        </div>
        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((p, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-border bg-inset px-4 py-3">
                <FileIcon mime={p.file.type} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] text-fg">{p.file.name}</span>
                  <span className="block text-xs text-fg-subtle">
                    {KIND_LABEL[p.kind]} · {(p.file.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                  aria-label={`Remove ${p.file.name}`}
                  className="grid size-10 cursor-pointer place-items-center rounded-lg text-fg-subtle hover:bg-surface-strong hover:text-fg"
                >
                  <Trash size={18} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-sm text-fg-subtle">
          Tip: a full POH can run hundreds of pages. Uploading just the limitations, performance, and weight &amp; balance sections makes the examiner faster.
          No documents? You can still start; the examiner will ask you for the numbers.
        </p>
      </fieldset>

      {error && (
        <p role="alert" className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-[15px] text-fg">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={busy} aria-busy={busy} className={buttonClass("primary", "lg")}>
          {busy ? "Working…" : "Start mock checkride"}
        </button>
        {status && (
          <span className="text-sm text-fg-muted" aria-live="polite">
            {status}
          </span>
        )}
      </div>
    </form>
  );
}
