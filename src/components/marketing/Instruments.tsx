import { GaugeNeedle } from "./GaugeNeedle";

type Gauge = {
  label: string;
  unit: string;
  max: number;
  value: number;
  major: number; // numbered tick interval
  minor: number;
  green?: [number, number];
  redline?: number;
  caption: string;
};

const GAUGES: Gauge[] = [
  { label: "Readiness", unit: "%", max: 100, value: 87, major: 20, minor: 5, green: [85, 100], caption: "Mastery across every ACS area. Aviant Ready at 85." },
  { label: "Predicted", unit: "score", max: 100, value: 84, major: 20, minor: 5, green: [70, 100], redline: 70, caption: "From your recent mock tests. 70 passes the written." },
  { label: "Today", unit: "min", max: 60, value: 45, major: 10, minor: 2, green: [45, 60], caption: "Minutes against the daily goal your plan sets." },
  { label: "Streak", unit: "days", max: 30, value: 12, major: 5, minor: 1, caption: "Consecutive study days, with a weekly freeze." },
];

// 270° dial, zero at lower-left (-135°) and max at lower-right (+135°).
const angleOf = (v: number, max: number) => -135 + (v / max) * 270;
const polar = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [+(Math.cos(a) * r).toFixed(2), +(Math.sin(a) * r).toFixed(2)] as const;
};
const arc = (from: number, to: number, r: number) => {
  const [x1, y1] = polar(from, r);
  const [x2, y2] = polar(to, r);
  return `M${x1} ${y1} A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

function Dial({ g, index }: { g: Gauge; index: number }) {
  const ticks = Array.from({ length: g.max / g.minor + 1 }, (_, i) => i * g.minor);
  return (
    <figure className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-[240px] bg-[#1a1d19] p-[6%]">
        <svg viewBox="-100 -100 200 200" className="size-full" role="img" aria-label={`${g.label}: ${g.value} ${g.unit}`}>
          <circle r="98" fill="#070807" stroke="#2c312b" strokeWidth="2" />
          {g.green && <path d={arc(angleOf(g.green[0], g.max), angleOf(g.green[1], g.max), 84)} stroke="#87da81" strokeWidth="6" fill="none" />}
          {g.redline !== undefined && (
            <line
              x1={polar(angleOf(g.redline, g.max), 76)[0]}
              y1={polar(angleOf(g.redline, g.max), 76)[1]}
              x2={polar(angleOf(g.redline, g.max), 92)[0]}
              y2={polar(angleOf(g.redline, g.max), 92)[1]}
              stroke="#ff6b5a"
              strokeWidth="3"
            />
          )}
          <g stroke="#e9eee6">
            {ticks.map((t) => {
              const isMajor = t % g.major === 0;
              const [x1, y1] = polar(angleOf(t, g.max), 88);
              const [x2, y2] = polar(angleOf(t, g.max), isMajor ? 74 : 81);
              return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={isMajor ? 2 : 1} opacity={isMajor ? 1 : 0.6} />;
            })}
          </g>
          <g fill="#e9eee6" fontFamily="var(--font-mono)" fontSize="13" textAnchor="middle" dominantBaseline="central">
            {ticks
              .filter((t) => t % g.major === 0)
              .map((t) => {
                const [x, y] = polar(angleOf(t, g.max), 60);
                return (
                  <text key={t} x={x} y={y}>
                    {t}
                  </text>
                );
              })}
          </g>
          <text y="30" fill="#e9eee6" fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.5" textAnchor="middle">
            {g.label.toUpperCase()}
          </text>
          <text y="44" fill="#87da81" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" textAnchor="middle">
            {g.unit.toUpperCase()}
          </text>
          <GaugeNeedle angle={angleOf(g.value, g.max)} delay={0.15 + index * 0.12} />
        </svg>
        {/* panel screws */}
        {["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"].map((pos) => (
          <span key={pos} aria-hidden className={`absolute ${pos} size-2.5  bg-[#2a2f29]`} />
        ))}
      </div>
      <figcaption className="mt-5 max-w-[220px] text-center text-sm text-[#a3aba0]">{g.caption}</figcaption>
    </figure>
  );
}

/** Progress, shown the way a pilot reads it: on round gauges. */
export function Instruments() {
  return (
    <section id="instruments" className="scroll-mt-16 px-3 py-24 sm:px-5 sm:py-32">
      <div className="mx-auto max-w-[1320px] overflow-hidden border border-white/10 bg-[#0b0d0b] text-[#f4f7f2]">
        <div className="grid gap-8 border-b border-white/10 px-6 py-12 sm:px-10 md:grid-cols-[1fr_1fr] md:items-end md:py-16">
          <div>
            <p className="annot text-[#87da81]">Your instrument panel</p>
            <h2 className="mt-5 max-w-lg font-display text-3xl tracking-[-0.015em] md:text-4xl">
              Know you&rsquo;re ready. Don&rsquo;t guess.
            </h2>
          </div>
          <p className="max-w-md text-[#a3aba0] md:justify-self-end">
            Every quiz, flashcard and oral feeds the same four gauges, so you always know where you stand and what to fly next.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 px-6 py-14 sm:px-10 lg:grid-cols-4">
          {GAUGES.map((g, i) => (
            <Dial key={g.label} g={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
