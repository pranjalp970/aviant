const ROSE_LABELS: Record<number, string> = { 0: "N", 90: "E", 180: "S", 270: "W" };

/** VOR-style compass rose: 5° ticks, 10° longer, numbers every 30°. */
export function CompassRose({ className }: { className?: string }) {
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  return (
    <svg viewBox="-210 -210 420 420" className={className} aria-hidden>
      <g stroke="currentColor" fill="none">
        <circle r="180" strokeWidth="1" />
        <circle r="120" strokeWidth="0.6" strokeDasharray="2 6" />
        {ticks.map((deg) => {
          const long = deg % 10 === 0;
          const a = ((deg - 90) * Math.PI) / 180;
          const r1 = 180;
          const r2 = long ? 166 : 172;
          return (
            <line
              key={deg}
              x1={(Math.cos(a) * r1).toFixed(2)}
              y1={(Math.sin(a) * r1).toFixed(2)}
              x2={(Math.cos(a) * r2).toFixed(2)}
              y2={(Math.sin(a) * r2).toFixed(2)}
              strokeWidth={long ? 1.1 : 0.7}
            />
          );
        })}
        {/* north arrow */}
        <path d="M0 -205 L6 -188 L-6 -188 Z" fill="currentColor" stroke="none" />
      </g>
      <g fill="currentColor" fontFamily="var(--font-sans)" fontSize="11" textAnchor="middle" dominantBaseline="central">
        {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => {
          const a = ((deg - 90) * Math.PI) / 180;
          return (
            <text key={deg} x={(Math.cos(a) * 150).toFixed(2)} y={(Math.sin(a) * 150).toFixed(2)} transform={`rotate(${deg} ${(Math.cos(a) * 150).toFixed(2)} ${(Math.sin(a) * 150).toFixed(2)})`}>
              {ROSE_LABELS[deg] ?? deg / 10}
            </text>
          );
        })}
      </g>
    </svg>
  );
}

/** Graduated border along the edges of a section, like the lat/long scale on a sectional chart. */
export function ChartBorder({ className }: { className?: string }) {
  const n = 60;
  return (
    <div className={className} aria-hidden>
      {(["top", "bottom"] as const).map((side) => (
        <div key={side} className={`absolute inset-x-0 flex justify-between ${side === "top" ? "top-0 items-start" : "bottom-0 items-end"}`}>
          {Array.from({ length: n + 1 }, (_, i) => (
            <span key={i} className="w-px bg-current" style={{ height: i % 10 === 0 ? 14 : i % 5 === 0 ? 9 : 5 }} />
          ))}
        </div>
      ))}
      {(["left", "right"] as const).map((side) => (
        <div key={side} className={`absolute inset-y-0 flex flex-col justify-between ${side === "left" ? "left-0 items-start" : "right-0 items-end"}`}>
          {Array.from({ length: 36 + 1 }, (_, i) => (
            <span key={i} className="h-px bg-current" style={{ width: i % 6 === 0 ? 14 : i % 3 === 0 ? 9 : 5 }} />
          ))}
        </div>
      ))}
    </div>
  );
}
