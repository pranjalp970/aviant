import type { AcsArea, Rating, RatingId } from "./types";

export const RATINGS: Rating[] = [
  { id: "ppl", name: "Private Pilot — Airplane", short: "Private Pilot", acsCode: "FAA-S-ACS-6" },
  { id: "ir", name: "Instrument Rating — Airplane", short: "Instrument", acsCode: "FAA-S-ACS-8" },
];

export const ratingById = (id: RatingId) => RATINGS.find((r) => r.id === id)!;

const t = (areaId: string, letter: string, name: string) => ({
  id: `${areaId}-${letter}`,
  code: `${areaId.split("-")[1]}.${letter}`,
  name,
});

export const ACS_AREAS: AcsArea[] = [
  // ── Private Pilot ───────────────────────────────────────────
  {
    id: "ppl-I",
    rating: "ppl",
    numeral: "I",
    name: "Preflight Preparation",
    tasks: [
      t("ppl-I", "A", "Pilot Qualifications"),
      t("ppl-I", "B", "Airworthiness Requirements"),
      t("ppl-I", "C", "Weather Information"),
      t("ppl-I", "D", "Cross-Country Flight Planning"),
      t("ppl-I", "E", "National Airspace System"),
      t("ppl-I", "F", "Performance and Limitations"),
      t("ppl-I", "G", "Operation of Systems"),
      t("ppl-I", "H", "Human Factors"),
    ],
  },
  {
    id: "ppl-II",
    rating: "ppl",
    numeral: "II",
    name: "Preflight Procedures",
    tasks: [
      t("ppl-II", "A", "Preflight Assessment"),
      t("ppl-II", "B", "Flight Deck Management"),
      t("ppl-II", "C", "Engine Starting"),
      t("ppl-II", "D", "Taxiing"),
      t("ppl-II", "F", "Before Takeoff Check"),
    ],
  },
  {
    id: "ppl-III",
    rating: "ppl",
    numeral: "III",
    name: "Airport Operations",
    tasks: [t("ppl-III", "A", "Communications, Light Signals, and Runway Lighting Systems"), t("ppl-III", "B", "Traffic Patterns")],
  },
  {
    id: "ppl-IV",
    rating: "ppl",
    numeral: "IV",
    name: "Takeoffs, Landings, and Go-Arounds",
    tasks: [t("ppl-IV", "A", "Normal Takeoff and Climb"), t("ppl-IV", "B", "Normal Approach and Landing"), t("ppl-IV", "M", "Forward Slip to a Landing"), t("ppl-IV", "N", "Go-Around/Rejected Landing")],
  },
  {
    id: "ppl-V",
    rating: "ppl",
    numeral: "V",
    name: "Performance and Ground Reference Maneuvers",
    tasks: [t("ppl-V", "A", "Steep Turns"), t("ppl-V", "B", "Ground Reference Maneuvers")],
  },
  {
    id: "ppl-VI",
    rating: "ppl",
    numeral: "VI",
    name: "Navigation",
    tasks: [t("ppl-VI", "A", "Pilotage and Dead Reckoning"), t("ppl-VI", "B", "Navigation Systems and Radar Services"), t("ppl-VI", "C", "Diversion"), t("ppl-VI", "D", "Lost Procedures")],
  },
  {
    id: "ppl-VII",
    rating: "ppl",
    numeral: "VII",
    name: "Slow Flight and Stalls",
    tasks: [t("ppl-VII", "A", "Maneuvering During Slow Flight"), t("ppl-VII", "B", "Power-Off Stalls"), t("ppl-VII", "C", "Power-On Stalls"), t("ppl-VII", "D", "Spin Awareness")],
  },
  {
    id: "ppl-IX",
    rating: "ppl",
    numeral: "IX",
    name: "Emergency Operations",
    tasks: [t("ppl-IX", "A", "Emergency Descent"), t("ppl-IX", "B", "Emergency Approach and Landing (Simulated)"), t("ppl-IX", "C", "Systems and Equipment Malfunctions")],
  },
  {
    id: "ppl-XI",
    rating: "ppl",
    numeral: "XI",
    name: "Night Operations",
    tasks: [t("ppl-XI", "A", "Night Preparation")],
  },

  // ── Instrument Rating ───────────────────────────────────────
  {
    id: "ir-I",
    rating: "ir",
    numeral: "I",
    name: "Preflight Preparation",
    tasks: [t("ir-I", "A", "Pilot Qualifications"), t("ir-I", "B", "Weather Information"), t("ir-I", "C", "Cross-Country Flight Planning")],
  },
  {
    id: "ir-II",
    rating: "ir",
    numeral: "II",
    name: "Preflight Procedures",
    tasks: [t("ir-II", "A", "Aircraft Systems Related to IFR Operations"), t("ir-II", "B", "Aircraft Flight Instruments and Navigation Equipment"), t("ir-II", "C", "Instrument Flight Deck Check")],
  },
  {
    id: "ir-III",
    rating: "ir",
    numeral: "III",
    name: "ATC Clearances and Procedures",
    tasks: [t("ir-III", "A", "Compliance with Air Traffic Control Clearances"), t("ir-III", "B", "Holding Procedures")],
  },
  {
    id: "ir-IV",
    rating: "ir",
    numeral: "IV",
    name: "Flight by Reference to Instruments",
    tasks: [t("ir-IV", "A", "Instrument Flight"), t("ir-IV", "B", "Recovery from Unusual Flight Attitudes")],
  },
  {
    id: "ir-V",
    rating: "ir",
    numeral: "V",
    name: "Navigation Systems",
    tasks: [t("ir-V", "A", "Intercepting and Tracking Navigational Systems and DME Arcs"), t("ir-V", "B", "Departure, En Route, and Arrival Operations")],
  },
  {
    id: "ir-VI",
    rating: "ir",
    numeral: "VI",
    name: "Instrument Approach Procedures",
    tasks: [t("ir-VI", "A", "Nonprecision Approach"), t("ir-VI", "B", "Precision Approach"), t("ir-VI", "C", "Missed Approach"), t("ir-VI", "E", "Landing from an Instrument Approach")],
  },
  {
    id: "ir-VII",
    rating: "ir",
    numeral: "VII",
    name: "Emergency Operations",
    tasks: [t("ir-VII", "A", "Loss of Communications"), t("ir-VII", "D", "Loss of Primary Flight Instrument Indicators")],
  },
];

export const areasFor = (rating: RatingId) => ACS_AREAS.filter((a) => a.rating === rating);
export const areaById = (id: string) => ACS_AREAS.find((a) => a.id === id);
