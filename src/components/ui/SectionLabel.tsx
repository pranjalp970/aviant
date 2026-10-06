export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[12px] uppercase tracking-[0.14em] text-fg-muted">
      <span className="text-fg-subtle">{index}</span>
      <span className="size-1.5 rounded-full bg-green" aria-hidden />
      {children}
    </span>
  );
}
