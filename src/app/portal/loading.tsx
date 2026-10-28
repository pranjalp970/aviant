/**
 * Shown the moment someone opens a portal page, while its data loads (HIG loading.md:
 * show something as soon as possible). Mirrors the page header and panel layout so nothing jumps.
 */
export default function PortalLoading() {
  return (
    <div role="status" aria-label="Loading" className="animate-pulse motion-reduce:animate-none">
      <div className="mb-10">
        <div className="h-3 w-24 bg-surface-strong" />
        <div className="mt-4 h-9 w-72 max-w-full bg-surface-strong" />
        <div className="mt-4 h-4 w-96 max-w-full bg-surface-strong" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="h-72 border border-border bg-bg-elevated" />
        <div className="h-72 border border-border bg-bg-elevated" />
      </div>
      <div className="mt-4 h-40 border border-border bg-bg-elevated" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
