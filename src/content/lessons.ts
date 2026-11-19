import { PPL_GUIDES } from "./guides/ppl";
import type { Lesson, RatingId } from "./types";

/** Study guides: the Private Pilot set (see guides/ppl.ts), plus SAMPLE Instrument guides for the coming-soon rating. */
export const LESSONS: Lesson[] = [
  ...PPL_GUIDES,
  {
    slug: "ifr-alternates-and-fuel",
    rating: "ir",
    areaId: "ir-I",
    title: "IFR Alternates & Fuel",
    summary: "The 1-2-3 rule, standard alternate minimums, and IFR fuel reserves.",
    minutes: 8,
    reference: "14 CFR 91.167, 91.169",
    blocks: [
      { type: "h", text: "Do I need an alternate? The 1-2-3 rule" },
      { type: "p", text: "From 1 hour before to 1 hour after your ETA, if the forecast shows a ceiling of at least 2,000 ft and visibility of at least 3 SM at the destination, no alternate is required." },
      { type: "h", text: "Can this airport be my alternate?" },
      { type: "table", head: ["Approach type", "Ceiling", "Visibility"], rows: [["Precision", "600 ft", "2 SM"], ["Non-precision", "800 ft", "2 SM"], ["No approach", "Descend from MEA and land VFR", "—"]] },
      { type: "callout", tone: "tip", text: "Always check the chart for the triangle-A symbol — non-standard alternate minimums or \"NA\" will override the standard numbers." },
      { type: "h", text: "Fuel" },
      { type: "p", text: "Carry enough fuel to fly to the destination, then to the alternate (if required), then 45 minutes at normal cruising speed." },
    ],
  },
  {
    slug: "holding-patterns",
    rating: "ir",
    areaId: "ir-III",
    title: "Holding Patterns",
    summary: "Standard holds, entries, timing, and speed limits.",
    minutes: 9,
    reference: "AIM 5-3-8; Instrument Procedures Handbook",
    blocks: [
      { type: "p", text: "A standard holding pattern uses right turns, with 1-minute inbound legs at or below 14,000 ft MSL and 1½-minute legs above." },
      { type: "h", text: "Maximum holding speeds" },
      { type: "table", head: ["Altitude (MSL)", "Max speed"], rows: [["Up to 6,000 ft", "200 KIAS"], ["6,001–14,000 ft", "230 KIAS"], ["Above 14,000 ft", "265 KIAS"]] },
      { type: "h", text: "Entries" },
      { type: "list", items: ["Direct — the most common; turn to follow the pattern on reaching the fix", "Parallel — fly outbound parallel to the inbound course on the non-holding side, then turn back", "Teardrop — fly outbound 30° off the holding course on the holding side, then turn inbound"] },
      { type: "callout", tone: "tip", text: "Remember the 5 Ts at the fix: Turn, Time, Twist, Throttle, Talk." },
    ],
  },
  {
    slug: "lost-communications",
    rating: "ir",
    areaId: "ir-VII",
    title: "Two-Way Radio Communications Failure",
    summary: "What to fly, at what altitude, and when to leave the clearance limit.",
    minutes: 7,
    reference: "14 CFR 91.185; AIM 6-4-1",
    blocks: [
      { type: "p", text: "If you lose comms in VMC, remain VMC and land as soon as practicable. In IMC, follow 91.185." },
      { type: "h", text: "Route — AVEF" },
      { type: "list", items: ["Assigned route", "Vectored — direct to the fix, route, or airway specified in the vector clearance", "Expected route ATC told you to expect", "Filed route"] },
      { type: "h", text: "Altitude — MEA" },
      { type: "p", text: "For each segment, fly the highest of: the Minimum en route altitude, the altitude you were told to Expect, or the last Assigned altitude." },
      { type: "callout", tone: "warning", text: "Squawk 7600, keep trying other frequencies, and remember you may be able to receive even if you can't transmit." },
    ],
  },
];

export const lessonsFor = (rating: RatingId) => LESSONS.filter((l) => l.rating === rating);
export const lessonBySlug = (slug: string) => LESSONS.find((l) => l.slug === slug);
