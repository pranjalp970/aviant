/**
 * Checkride readiness drawn as a flight instrument: the same 270° dial as the gauges on the
 * home page, in the page's own colors so it works in light and dark. The green band marks the
 * Aviant Ready threshold (85%). It's a chart, so it stays round.
 */
const angleOf = (v: number) => -135 + Math.min(1, Math.max(0, v)) * 270;
const polar = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [+(Math.cos(a) * r).toFixed(2), +(Math.sin(a) * r).toFixed(2)] as const;
};
const arc = (from: number, to: number, r: number) => {
  const [x1, y1] = polar(from, r);
  const [x2, y2] = polar(to, r);
  return `M${x1} ${y1} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

const TICKS = Array.from({ length: 21 }, (_, i) => i * 5); // every 5%

export function ReadinessGauge({ value, label }: { value: number; label: string }) {
  const pct = Math.round(value * 100);
  const needle = angleOf(value);
  return (
    <figure className="mx-auto w-full max-w-[240px]">
      <svg viewBox="-100 -100 200 178" className="w-full" role="img" aria-label={`Checkride readiness ${pct}%: ${label}`}>
        {/* track and the ready band */}
        <path d={arc(-135, 135, 84)} stroke="var(--track)" strokeWidth="4" fill="none" />
        <path d={arc(angleOf(0.85), 135, 84)} stroke="var(--green)" strokeWidth="4" fill="none" />
        {/* progress so far along the rim */}
        {value > 0.005 && <path d={arc(-135, needle, 84)} stroke="var(--green)" strokeOpacity="0.45" strokeWidth="4" fill="none" />}
        <g stroke="var(--fg-muted)">
          {TICKS.map((t) => {
            const major = t % 20 === 0;
            const [x1, y1] = polar(angleOf(t / 100), 74);
            const [x2, y2] = polar(angleOf(t / 100), major ? 63 : 68);
            return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={major ? 1.6 : 0.8} opacity={major ? 1 : 0.6} />;
          })}
        </g>
        <g fill="var(--fg-subtle)" fontFamily="var(--font-jbmono)" fontSize="9" textAnchor="middle" dominantBaseline="central">
          {[0, 20, 40, 60, 80, 100].map((t) => {
            const [x, y] = polar(angleOf(t / 100), 52);
            return (
              <text key={t} x={x} y={y}>
                {t}
              </text>
            );
          })}
        </g>
        {/* needle */}
        <g transform={`rotate(${needle})`}>
          <path d="M-2.2 10 L-1 -70 L0 -76 L1 -70 L2.2 10 Z" fill="var(--fg)" />
        </g>
        <circle r="6.5" fill="var(--bg-elevated)" stroke="var(--fg-muted)" strokeWidth="1.2" />
        {/* readout */}
        <text y="54" fill="var(--fg)" fontFamily="var(--font-tenor)" fontSize="28" textAnchor="middle">
          {pct}
          <tspan fontSize="13" fill="var(--fg-subtle)" dx="1">
            %
          </tspan>
        </text>
        <text y="71" fill="var(--fg-subtle)" fontFamily="var(--font-jbmono)" fontSize="7.5" letterSpacing="1.2" textAnchor="middle">
          READINESS
        </text>
      </svg>
      <figcaption className="sr-only">
        {pct}% ready. Aviant Ready starts at 85%.
      </figcaption>
    </figure>
  );
}
