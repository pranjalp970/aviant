/** Circular progress for a single score (a chart, so it stays round). Drawn as two SVG strokes. */
export function ProgressRing({ value, size = 112, stroke = 8, label, children }: { value: number; size?: number; stroke?: number; label: string; children?: React.ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.min(1, Math.max(0, value));
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--track)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--green)" strokeWidth={stroke} strokeDasharray={`${(v * c).toFixed(2)} ${c.toFixed(2)}`} />
      </svg>
      <span className="relative">{children}</span>
    </div>
  );
}
