import { PPL_BANK } from "./banks/ppl-bank";
import type { McQuestion, OralQuestion, Question, RatingId } from "./types";

/**
 * SAMPLE question bank — placeholder content for building the app.
 * To be replaced with the verified FAA-aligned bank. Always confirm against
 * current 14 CFR, the AIM, and the ACS before relying on any of this.
 */

const mc = (q: Omit<McQuestion, "kind">): McQuestion => ({ kind: "mc", ...q });
const oral = (q: Omit<OralQuestion, "kind">): OralQuestion => ({ kind: "oral", ...q });

const SAMPLE_QUESTIONS: Question[] = [
  // ── PPL · I.A Pilot Qualifications ──────────────────────────
  oral({
    id: "ppl-001",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-A",
    prompt: "What are the recent flight experience requirements to carry passengers during the day and at night?",
    keyPoints: [
      { label: "3 takeoffs and landings", keywords: ["three", "3 takeoff", "3 landing", "takeoffs and landings"] },
      { label: "Preceding 90 days", keywords: ["90 days", "ninety"] },
      { label: "Same category and class", keywords: ["category", "class"] },
      { label: "Night: full stop, 1 hr after sunset to 1 hr before sunrise", keywords: ["full stop", "sunset", "sunrise"] },
    ],
    explanation:
      "To act as PIC carrying passengers you need three takeoffs and landings within the preceding 90 days in the same category, class, and type (if a type rating is required). Tailwheel landings must be to a full stop. For night, the three takeoffs and landings must be to a full stop during the period beginning 1 hour after sunset and ending 1 hour before sunrise.",
    reference: "14 CFR 61.57(a)–(b)",
    difficulty: 1,
  }),
  mc({
    id: "ppl-002",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-A",
    prompt: "A pilot who is 35 years old receives a third-class medical certificate. For private pilot privileges, it is valid until the end of the",
    choices: ["12th calendar month", "24th calendar month", "36th calendar month", "60th calendar month"],
    answerIndex: 3,
    explanation:
      "For a pilot under age 40 on the date of the exam, a third-class medical is valid for 60 calendar months. At age 40 or older it is valid for 24 calendar months.",
    reference: "14 CFR 61.23(d)",
    difficulty: 1,
  }),
  mc({
    id: "ppl-003",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-A",
    prompt: "No person may act as a crewmember of a civil aircraft within how many hours after consuming any alcoholic beverage?",
    choices: ["4 hours", "8 hours", "12 hours", "24 hours"],
    answerIndex: 1,
    explanation: "14 CFR 91.17 prohibits acting as a crewmember within 8 hours after consuming alcohol, while under the influence, or with a blood alcohol concentration of 0.04 or greater.",
    reference: "14 CFR 91.17",
    difficulty: 1,
  }),

  // ── PPL · I.B Airworthiness ─────────────────────────────────
  oral({
    id: "ppl-004",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-B",
    prompt: "What documents are required to be on board the aircraft?",
    keyPoints: [
      { label: "Airworthiness certificate", keywords: ["airworthiness"] },
      { label: "Registration", keywords: ["registration"] },
      { label: "Operating limitations (POH/AFM, placards)", keywords: ["operating limitation", "poh", "afm", "flight manual", "placard"] },
      { label: "Weight and balance", keywords: ["weight and balance", "weight & balance", "w&b"] },
    ],
    explanation:
      "A common memory aid is ARROW: Airworthiness certificate, Registration certificate, Radio station license (only required for international flight), Operating limitations (AFM/POH, placards, markings), and Weight and balance data.",
    reference: "14 CFR 91.9, 91.203; FCC rules",
    difficulty: 1,
  }),
  mc({
    id: "ppl-005",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-B",
    prompt: "How often must an aircraft's ATC transponder be tested and inspected?",
    choices: ["Every 12 calendar months", "Every 24 calendar months", "Every 100 hours of time in service", "At each annual inspection only"],
    answerIndex: 1,
    explanation: "ATC transponders must be tested and inspected within the preceding 24 calendar months.",
    reference: "14 CFR 91.413",
    difficulty: 1,
  }),
  oral({
    id: "ppl-006",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-B",
    prompt: "Which instruments and equipment are required for day VFR flight?",
    keyPoints: [
      { label: "Airspeed indicator", keywords: ["airspeed"] },
      { label: "Altimeter", keywords: ["altimeter"] },
      { label: "Magnetic direction indicator", keywords: ["compass", "magnetic direction"] },
      { label: "Engine instruments (tach, oil pressure, oil temp, fuel gauge)", keywords: ["tachometer", "oil pressure", "oil temp", "fuel gauge"] },
      { label: "ELT and seat belts", keywords: ["elt", "emergency locator", "seat belt", "safety belt"] },
    ],
    explanation:
      "Common memory aid A TOMATO FLAMES: Altimeter, Tachometer, Oil pressure gauge, Manifold pressure gauge (altitude engines), Airspeed indicator, Temperature gauge (liquid-cooled), Oil temperature gauge, Fuel gauge, Landing gear position indicator, Anticollision lights (aircraft certificated after March 11, 1996), Magnetic direction indicator, ELT, Safety belts.",
    reference: "14 CFR 91.205(b)",
    difficulty: 2,
  }),

  // ── PPL · I.C Weather ───────────────────────────────────────
  mc({
    id: "ppl-007",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-C",
    prompt: "A METAR reports: SCT010 BKN025 OVC060. What is the ceiling?",
    choices: ["1,000 ft AGL", "2,500 ft AGL", "6,000 ft AGL", "There is no ceiling"],
    answerIndex: 1,
    explanation: "The ceiling is the lowest layer reported as broken or overcast, or the vertical visibility into an obscuration. Here, that is the broken layer at 2,500 ft AGL.",
    reference: "AIM 7-1; 14 CFR 1.1",
    difficulty: 1,
  }),
  mc({
    id: "ppl-008",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-C",
    prompt: "In the standard atmosphere, temperature decreases with altitude at approximately",
    choices: ["1 °C per 1,000 ft", "2 °C per 1,000 ft", "3 °C per 1,000 ft", "3.5 °C per 1,000 ft"],
    answerIndex: 1,
    explanation: "The standard lapse rate is about 2 °C (3.5 °F) per 1,000 ft, starting from 15 °C and 29.92 inHg at sea level.",
    reference: "PHAK Ch. 4",
    difficulty: 1,
  }),

  // ── PPL · I.E National Airspace System ──────────────────────
  mc({
    id: "ppl-009",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-E",
    prompt: "What are the basic VFR weather minimums in Class E airspace below 10,000 ft MSL?",
    choices: [
      "1 SM; clear of clouds",
      "3 SM; 500 ft below, 1,000 ft above, 2,000 ft horizontal",
      "3 SM; clear of clouds",
      "5 SM; 1,000 ft below, 1,000 ft above, 1 SM horizontal",
    ],
    answerIndex: 1,
    explanation: "Below 10,000 ft MSL in Class E: 3 statute miles visibility and cloud clearance of 500 ft below, 1,000 ft above, and 2,000 ft horizontal.",
    reference: "14 CFR 91.155",
    difficulty: 2,
  }),
  mc({
    id: "ppl-010",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-E",
    prompt: "Before entering Class C airspace, a pilot must",
    choices: [
      "Receive an explicit clearance into the airspace",
      "Establish two-way radio communication with ATC",
      "File a VFR flight plan",
      "Hold at least a private pilot certificate",
    ],
    answerIndex: 1,
    explanation:
      "Class C requires two-way radio communication established prior to entry (ATC responding with your call sign), a Mode C transponder, and ADS-B Out. An explicit clearance is required for Class B, not C.",
    reference: "14 CFR 91.130; AIM 3-2-4",
    difficulty: 2,
  }),
  mc({
    id: "ppl-011",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-E",
    prompt: "Over a congested area, except for takeoff and landing, the minimum altitude is",
    choices: [
      "500 ft above the surface",
      "1,000 ft above the highest obstacle within a horizontal radius of 2,000 ft",
      "1,500 ft above the highest obstacle within 1 NM",
      "2,000 ft AGL",
    ],
    answerIndex: 1,
    explanation: "Over congested areas you must remain 1,000 ft above the highest obstacle within a horizontal radius of 2,000 ft of the aircraft.",
    reference: "14 CFR 91.119(b)",
    difficulty: 1,
  }),
  oral({
    id: "ppl-012",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-E",
    prompt: "As a student pilot, what do you need to operate in Class B airspace?",
    keyPoints: [
      { label: "Explicit ATC clearance", keywords: ["clearance", "cleared into"] },
      { label: "Instructor endorsement for that airspace", keywords: ["endorsement", "endorsed"] },
      { label: "Mode C transponder and ADS-B Out", keywords: ["transponder", "mode c", "ads-b"] },
      { label: "Two-way radio", keywords: ["radio"] },
    ],
    explanation:
      "Student pilots need an explicit ATC clearance and a logbook endorsement from an authorized instructor (ground and flight training within the preceding 90 days for that specific Class B). The aircraft needs a two-way radio, Mode C transponder, and ADS-B Out. Some Class B primary airports are off-limits to student pilots entirely (91.131(b)(2) / Part 91 Appendix D).",
    reference: "14 CFR 61.95, 91.131",
    difficulty: 2,
  }),

  // ── PPL · I.D Cross-Country ─────────────────────────────────
  mc({
    id: "ppl-013",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-D",
    prompt: "What is the minimum fuel requirement for a VFR flight in an airplane at night?",
    choices: [
      "Enough to reach the first point of intended landing",
      "Enough to reach the first point of intended landing plus 30 minutes at normal cruise",
      "Enough to reach the first point of intended landing plus 45 minutes at normal cruise",
      "Enough for 1 hour at normal cruise",
    ],
    answerIndex: 2,
    explanation: "VFR in an airplane requires fuel to the first point of intended landing plus 30 minutes at normal cruise by day, or 45 minutes at night.",
    reference: "14 CFR 91.151",
    difficulty: 1,
  }),
  mc({
    id: "ppl-014",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-D",
    prompt: "When cruising VFR more than 3,000 ft AGL on a magnetic course of 270°, which altitude is appropriate?",
    choices: ["5,500 ft MSL", "6,500 ft MSL", "7,000 ft MSL", "6,000 ft MSL"],
    answerIndex: 1,
    explanation: "Magnetic courses 0°–179° fly odd thousands plus 500 ft; 180°–359° fly even thousands plus 500 ft. 270° is westbound, so 6,500 ft MSL.",
    reference: "14 CFR 91.159",
    difficulty: 1,
  }),

  // ── PPL · I.F Performance & aerodynamics ────────────────────
  mc({
    id: "ppl-015",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-F",
    prompt: "Which combination of conditions results in the longest takeoff distance?",
    choices: [
      "Low elevation, low temperature, low humidity",
      "High elevation, high temperature, high humidity",
      "High elevation, low temperature, low humidity",
      "Low elevation, high temperature, low humidity",
    ],
    answerIndex: 1,
    explanation: "High, hot, and humid conditions all raise density altitude, reducing engine power, propeller efficiency, and lift — so takeoff distance increases.",
    reference: "PHAK Ch. 11",
    difficulty: 1,
  }),
  mc({
    id: "ppl-016",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-F",
    prompt: "In a coordinated, level 60° bank turn, the load factor is approximately",
    choices: ["1.2 G", "1.5 G", "2 G", "3 G"],
    answerIndex: 2,
    explanation: "Load factor = 1 / cos(bank). At 60° that's 1 / 0.5 = 2 G, which raises stall speed by about 41%.",
    reference: "PHAK Ch. 5",
    difficulty: 2,
  }),
  oral({
    id: "ppl-017",
    rating: "ppl",
    areaId: "ppl-VII",
    taskId: "ppl-VII-B",
    prompt: "What causes an airplane to stall, and how do you recover?",
    keyPoints: [
      { label: "Exceeding the critical angle of attack", keywords: ["critical angle", "angle of attack", "aoa"] },
      { label: "Can occur at any airspeed / attitude", keywords: ["any airspeed", "any attitude"] },
      { label: "Reduce angle of attack first", keywords: ["reduce", "lower the nose", "forward pressure", "decrease angle"] },
      { label: "Level wings, add power", keywords: ["level the wings", "wings level", "power", "full throttle"] },
    ],
    explanation:
      "A wing stalls when it exceeds its critical angle of attack — at any airspeed, attitude, or power setting. Recovery: reduce the angle of attack (forward pressure), level the wings with coordinated controls, add power as appropriate, and return to the desired flight path.",
    reference: "Airplane Flying Handbook Ch. 5",
    difficulty: 1,
  }),
  oral({
    id: "ppl-018",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-G",
    prompt: "Explain the left-turning tendencies of a single-engine propeller airplane.",
    keyPoints: [
      { label: "Torque", keywords: ["torque"] },
      { label: "P-factor", keywords: ["p-factor", "p factor", "asymmetric"] },
      { label: "Spiraling slipstream", keywords: ["slipstream", "spiral"] },
      { label: "Gyroscopic precession", keywords: ["gyroscopic", "precession"] },
    ],
    explanation:
      "Four forces: torque reaction (Newton's third law), spiraling slipstream striking the left side of the vertical stabilizer, P-factor (the descending blade takes a bigger bite at high AOA), and gyroscopic precession (most noticeable when the tail is raised in a tailwheel airplane).",
    reference: "PHAK Ch. 5",
    difficulty: 2,
  }),
  mc({
    id: "ppl-019",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-G",
    prompt: "Carburetor icing is most likely when the outside air temperature is between",
    choices: ["−20 °F and 0 °F with low humidity", "20 °F and 70 °F with visible moisture or high humidity", "80 °F and 100 °F with low humidity", "Only below freezing"],
    answerIndex: 1,
    explanation: "Fuel vaporization and venturi pressure drop can cool the carburetor by 60 °F or more, so icing is most likely between about 20 °F and 70 °F with high humidity — even on clear days.",
    reference: "PHAK Ch. 7",
    difficulty: 2,
  }),

  // ── PPL · I.H Human Factors ─────────────────────────────────
  mc({
    id: "ppl-020",
    rating: "ppl",
    areaId: "ppl-I",
    taskId: "ppl-I-H",
    prompt: "Carbon monoxide poisoning causes which type of hypoxia?",
    choices: ["Hypoxic", "Hypemic", "Stagnant", "Histotoxic"],
    answerIndex: 1,
    explanation: "Hypemic hypoxia is the blood's reduced ability to carry oxygen — CO binds to hemoglobin far more readily than oxygen does.",
    reference: "PHAK Ch. 17",
    difficulty: 2,
  }),

  // ── PPL · III Airport Operations ────────────────────────────
  mc({
    id: "ppl-021",
    rating: "ppl",
    areaId: "ppl-III",
    taskId: "ppl-III-A",
    prompt: "While in flight, a flashing red light signal from the tower means",
    choices: ["Cleared to land", "Return for landing", "Give way to other aircraft and continue circling", "Airport unsafe — do not land"],
    answerIndex: 3,
    explanation: "In flight: steady green = cleared to land; flashing green = return for landing; steady red = give way and continue circling; flashing red = airport unsafe, do not land.",
    reference: "14 CFR 91.125; AIM 4-3-13",
    difficulty: 1,
  }),
  mc({
    id: "ppl-022",
    rating: "ppl",
    areaId: "ppl-III",
    taskId: "ppl-III-B",
    prompt: "Two airplanes of the same category are converging at approximately the same altitude (not head-on). Which has the right-of-way?",
    choices: ["The faster aircraft", "The aircraft on the left", "The aircraft on the right", "The higher aircraft"],
    answerIndex: 2,
    explanation: "When aircraft of the same category converge at about the same altitude, the aircraft to the other's right has the right-of-way.",
    reference: "14 CFR 91.113(d)",
    difficulty: 1,
  }),

  // ── PPL · IX Emergency ──────────────────────────────────────
  oral({
    id: "ppl-023",
    rating: "ppl",
    areaId: "ppl-IX",
    taskId: "ppl-IX-B",
    prompt: "Your engine quits at 3,000 ft AGL. Walk me through what you'd do.",
    keyPoints: [
      { label: "Pitch for best glide speed", keywords: ["best glide", "glide speed", "airspeed"] },
      { label: "Pick a landing site", keywords: ["field", "landing site", "pick a spot", "place to land"] },
      { label: "Restart checklist (fuel, mixture, mags, carb heat)", keywords: ["checklist", "fuel selector", "mixture", "mags", "carb heat", "restart"] },
      { label: "Communicate: 121.5 / 7700", keywords: ["7700", "121.5", "mayday"] },
    ],
    explanation:
      "Aviate first: establish best glide airspeed, then pick the best field within gliding range and turn toward it. Run the engine restart checklist (fuel selector, mixture, carb heat, mags, primer). If it doesn't restart, communicate (Mayday on the current frequency or 121.5, squawk 7700) and complete the securing checklist before landing.",
    reference: "Airplane Flying Handbook Ch. 18; POH Section 3",
    difficulty: 2,
  }),

  // ── PPL · XI Night ──────────────────────────────────────────
  oral({
    id: "ppl-024",
    rating: "ppl",
    areaId: "ppl-XI",
    taskId: "ppl-XI-A",
    prompt: "What additional equipment is required for VFR flight at night?",
    keyPoints: [
      { label: "Position lights", keywords: ["position light", "nav light", "navigation light"] },
      { label: "Anticollision lights", keywords: ["anticollision", "anti-collision", "beacon", "strobe"] },
      { label: "Landing light (if for hire)", keywords: ["landing light"] },
      { label: "Electrical source and spare fuses", keywords: ["electrical", "source of electricity", "fuse"] },
    ],
    explanation:
      "Memory aid FLAPS: Fuses (one spare set, or three of each kind, accessible in flight), Landing light (if operated for hire), Anticollision lights, Position lights, Source of electrical energy — in addition to the day VFR equipment.",
    reference: "14 CFR 91.205(c)",
    difficulty: 1,
  }),

  // ── IR · I.A Pilot Qualifications ───────────────────────────
  oral({
    id: "ir-001",
    rating: "ir",
    areaId: "ir-I",
    taskId: "ir-I-A",
    prompt: "What are the instrument currency requirements, and what happens if you lose currency?",
    keyPoints: [
      { label: "Within preceding 6 calendar months", keywords: ["6 calendar months", "six calendar months", "6 months", "six months"] },
      { label: "6 instrument approaches", keywords: ["six approaches", "6 approaches", "approaches"] },
      { label: "Holding procedures", keywords: ["holding", "hold"] },
      { label: "Intercepting and tracking courses", keywords: ["intercept", "tracking"] },
      { label: "IPC after the grace period", keywords: ["ipc", "proficiency check"] },
    ],
    explanation:
      "Within the preceding 6 calendar months: 6 instrument approaches, holding procedures and tasks, and intercepting and tracking courses through the use of navigational electronic systems (HIT-6). If you lapse, you have another 6 calendar months to regain currency with a safety pilot, sim, or instructor. Beyond that, you need an instrument proficiency check (IPC).",
    reference: "14 CFR 61.57(c)–(d)",
    difficulty: 1,
  }),

  // ── IR · I.C Cross-Country / alternates ─────────────────────
  mc({
    id: "ir-002",
    rating: "ir",
    areaId: "ir-I",
    taskId: "ir-I-C",
    prompt: "When is an alternate airport NOT required on an IFR flight plan (destination has an instrument approach)?",
    choices: [
      "When forecast weather from 1 hr before to 1 hr after ETA is at least 2,000 ft ceiling and 3 SM visibility",
      "When forecast weather at ETA is at least 1,000 ft ceiling and 3 SM visibility",
      "When forecast weather from 2 hrs before to 2 hrs after ETA is VFR",
      "An alternate is always required",
    ],
    answerIndex: 0,
    explanation: "The 1-2-3 rule: from 1 hour before to 1 hour after ETA, ceilings at least 2,000 ft above airport elevation and visibility at least 3 SM.",
    reference: "14 CFR 91.169(b)",
    difficulty: 1,
  }),
  mc({
    id: "ir-003",
    rating: "ir",
    areaId: "ir-I",
    taskId: "ir-I-C",
    prompt: "What are the standard alternate minimums for an airport with a precision approach?",
    choices: ["400 ft and 1 SM", "600 ft and 2 SM", "800 ft and 2 SM", "1,000 ft and 3 SM"],
    answerIndex: 1,
    explanation: "Standard alternate minimums: precision approach 600 ft ceiling and 2 SM; non-precision 800 ft and 2 SM. If no approach exists, you need forecast conditions allowing descent from the MEA and VFR approach and landing.",
    reference: "14 CFR 91.169(c)",
    difficulty: 2,
  }),
  mc({
    id: "ir-004",
    rating: "ir",
    areaId: "ir-I",
    taskId: "ir-I-C",
    prompt: "IFR fuel requirements call for enough fuel to fly to the destination, then to the alternate (if required), and then for",
    choices: ["30 minutes at normal cruise", "45 minutes at normal cruise", "1 hour at normal cruise", "45 minutes at holding speed"],
    answerIndex: 1,
    explanation: "For airplanes under IFR: fuel to the first airport of intended landing, to the alternate if required, then 45 minutes at normal cruising speed.",
    reference: "14 CFR 91.167",
    difficulty: 1,
  }),

  // ── IR · II Preflight / instruments ─────────────────────────
  mc({
    id: "ir-005",
    rating: "ir",
    areaId: "ir-II",
    taskId: "ir-II-B",
    prompt: "When checking VOR accuracy using a VOT, the maximum permissible bearing error is",
    choices: ["±4°", "±6°", "±2°", "±8°"],
    answerIndex: 0,
    explanation: "VOT and ground checkpoint: ±4°. Airborne checkpoint: ±6°. Dual VOR comparison: within 4° of each other. Must be done within the preceding 30 days for IFR.",
    reference: "14 CFR 91.171",
    difficulty: 1,
  }),
  mc({
    id: "ir-006",
    rating: "ir",
    areaId: "ir-II",
    taskId: "ir-II-B",
    prompt: "If the static port becomes blocked during a climb, the airspeed indicator will",
    choices: ["Read higher than actual", "Read lower than actual", "Read zero", "Remain accurate"],
    answerIndex: 1,
    explanation: "With the static port blocked, the trapped static pressure is higher than the true ambient pressure as you climb, so the ASI under-reads. The altimeter freezes and the VSI shows zero.",
    reference: "PHAK Ch. 8; IFH Ch. 5",
    difficulty: 3,
  }),
  oral({
    id: "ir-007",
    rating: "ir",
    areaId: "ir-II",
    taskId: "ir-II-A",
    prompt: "Explain the two gyroscopic principles and which instruments use them.",
    keyPoints: [
      { label: "Rigidity in space", keywords: ["rigidity"] },
      { label: "Precession", keywords: ["precession"] },
      { label: "Attitude indicator and heading indicator use rigidity", keywords: ["attitude indicator", "heading indicator", "ai", "hi"] },
      { label: "Turn coordinator uses precession", keywords: ["turn coordinator", "turn and slip", "turn indicator"] },
    ],
    explanation:
      "Rigidity in space: a spinning gyro stays fixed in its plane of rotation — used by the attitude indicator and heading indicator. Precession: a force applied to a spinning gyro is felt 90° ahead in the direction of rotation — used by the turn coordinator / turn-and-slip indicator.",
    reference: "Instrument Flying Handbook Ch. 5",
    difficulty: 2,
  }),

  // ── IR · III Holding ────────────────────────────────────────
  mc({
    id: "ir-008",
    rating: "ir",
    areaId: "ir-III",
    taskId: "ir-III-B",
    prompt: "What is the maximum holding airspeed for a civil airplane at 6,000 ft MSL (no published speed restriction)?",
    choices: ["175 KIAS", "200 KIAS", "230 KIAS", "265 KIAS"],
    answerIndex: 1,
    explanation: "Maximum holding speeds: up to 6,000 ft MSL — 200 KIAS; 6,001–14,000 ft — 230 KIAS; above 14,000 ft — 265 KIAS (unless otherwise published).",
    reference: "AIM 5-3-8",
    difficulty: 2,
  }),
  oral({
    id: "ir-009",
    rating: "ir",
    areaId: "ir-III",
    taskId: "ir-III-B",
    prompt: "Describe a standard holding pattern and the three recommended entries.",
    keyPoints: [
      { label: "Right turns", keywords: ["right turn", "right-hand"] },
      { label: "1-minute inbound legs at or below 14,000 ft", keywords: ["1 minute", "one minute", "1-minute"] },
      { label: "Direct entry", keywords: ["direct"] },
      { label: "Parallel entry", keywords: ["parallel"] },
      { label: "Teardrop entry", keywords: ["teardrop"] },
    ],
    explanation:
      "A standard hold uses right turns with 1-minute inbound legs at or below 14,000 ft MSL (1½ minutes above). The AIM recommends three entries based on your heading relative to the holding course: direct, parallel, and teardrop.",
    reference: "AIM 5-3-8",
    difficulty: 2,
  }),

  // ── IR · III Reports ────────────────────────────────────────
  oral({
    id: "ir-010",
    rating: "ir",
    areaId: "ir-III",
    taskId: "ir-III-A",
    prompt: "What reports must be made to ATC at all times, even in radar contact?",
    keyPoints: [
      { label: "Missed approach", keywords: ["missed approach"] },
      { label: "Leaving an assigned altitude / vacating", keywords: ["vacating", "leaving an assigned altitude", "leaving altitude"] },
      { label: "Unable to climb/descend at 500 fpm", keywords: ["500"] },
      { label: "Change in TAS ±5% or 10 kt", keywords: ["airspeed", "tas", "10 knots", "5%"] },
      { label: "Unforecast weather / safety of flight; equipment failure", keywords: ["unforecast", "safety of flight", "malfunction", "failure"] },
    ],
    explanation:
      "Common memory aid MARVELOUS VFR C500 covers all required reports. Those required at all times include: Missed approach, Airspeed change of ±10 kt or 5% TAS, Reaching a holding fix, VFR-on-top altitude change, Leaving a holding fix, Unforecast weather, Safety-of-flight information, Vacating an altitude, Radio/nav/approach equipment failure, and unable to Climb/descend at 500 fpm. ETA changes, the FAF, and compulsory reporting points are added when not in radar contact.",
    reference: "14 CFR 91.183, 91.187; AIM 5-3-3",
    difficulty: 3,
  }),

  // ── IR · VI Approaches ──────────────────────────────────────
  mc({
    id: "ir-011",
    rating: "ir",
    areaId: "ir-VI",
    taskId: "ir-VI-E",
    prompt: "At DA, you see only the approach light system (no red terminating or side-row bars). You may descend to",
    choices: [
      "The runway",
      "100 ft above the touchdown zone elevation",
      "200 ft above the touchdown zone elevation",
      "You must go around immediately",
    ],
    answerIndex: 1,
    explanation: "With only the approach lights in sight, you may descend no lower than 100 ft above TDZE unless the red terminating bars or red side row bars are also distinctly visible.",
    reference: "14 CFR 91.175(c)(3)(i)",
    difficulty: 3,
  }),

  // ── IR · VII Lost comms ─────────────────────────────────────
  oral({
    id: "ir-012",
    rating: "ir",
    areaId: "ir-VII",
    taskId: "ir-VII-A",
    prompt: "You lose two-way radio communications in IMC. What route and altitude do you fly?",
    keyPoints: [
      { label: "Route: Assigned, Vectored, Expected, Filed", keywords: ["assigned", "vector", "expected", "filed", "avef"] },
      { label: "Altitude: highest of MEA, Expected, Assigned", keywords: ["highest", "mea", "minimum enroute"] },
      { label: "Squawk 7600", keywords: ["7600"] },
    ],
    explanation:
      "Squawk 7600. Route (AVEF): the Assigned route; if being vectored, direct to the fix/route specified in the vector clearance; in absence of that, the route ATC said to Expect; otherwise the Filed route. Altitude: for each segment, fly the highest of the MEA, the altitude ATC said to Expect, or the last Assigned altitude.",
    reference: "14 CFR 91.185",
    difficulty: 2,
  }),
];

/**
 * The live bank: the Private Pilot bank (practice questions plus the figure set) supersedes
 * the sample PPL multiple-choice items; sample oral and IR questions remain
 * until their real banks arrive.
 */
export const QUESTIONS: Question[] = [
  ...SAMPLE_QUESTIONS.filter((q) => !(q.rating === "ppl" && q.kind === "mc")),
  ...PPL_BANK,
];

export const questionsFor = (rating: RatingId, areaId?: string) =>
  QUESTIONS.filter((q) => q.rating === rating && (!areaId || q.areaId === areaId));

export const questionById = (id: string) => QUESTIONS.find((q) => q.id === id);
