// Private Pilot oral exam questions, mapped to ACS (FAA-S-ACS-6C) tasks and written from FAA sources.
// The voice examiner asks these and grades answers against the key points; the keywords are
// lowercase phrases a correct spoken answer is likely to contain (used by the offline grader).
// Explanations are read aloud, so they're written as plain speech.

import type { OralQuestion } from "../types";

type KeyPoint = [label: string, keywords: string[]];

const oral = (q: Omit<OralQuestion, "kind" | "rating" | "areaId" | "keyPoints"> & { taskId: string; keyPoints: KeyPoint[] }): OralQuestion => ({
  ...q,
  kind: "oral",
  rating: "ppl",
  areaId: q.taskId.split("-").slice(0, 2).join("-"),
  keyPoints: q.keyPoints.map(([label, keywords]) => ({ label, keywords })),
});

export const PPL_ORAL_BANK: OralQuestion[] = [
  // ── I.A Pilot Qualifications ────────────────────────────────
  oral({
    id: "ppl-oral-001",
    taskId: "ppl-I-A",
    topic: "regulations",
    difficulty: 1,
    prompt: "What recent flight experience do you need to carry passengers during the day, and at night?",
    keyPoints: [
      ["3 takeoffs and landings", ["three takeoff", "3 takeoff", "three landing", "3 landing", "takeoffs and landings"]],
      ["Within the preceding 90 days", ["90", "ninety"]],
      ["Same category, class and type", ["category", "class"]],
      ["At night: to a full stop, 1 hour after sunset to 1 hour before sunrise", ["full stop", "after sunset", "before sunrise"]],
    ],
    explanation:
      "To carry passengers you need three takeoffs and landings within the preceding 90 days, as sole manipulator of the controls, in the same category, class and, if a type rating is required, type. In a tailwheel airplane they must be to a full stop. For night, the three takeoffs and landings must be to a full stop during the period from one hour after sunset to one hour before sunrise.",
    reference: "14 CFR 61.57(a)–(b)",
  }),
  oral({
    id: "ppl-oral-002",
    taskId: "ppl-I-A",
    topic: "regulations",
    difficulty: 1,
    prompt: "What documents do you personally need to have with you to act as pilot in command?",
    keyPoints: [
      ["Pilot certificate", ["pilot certificate", "pilot license", "private pilot certificate", "my certificate"]],
      ["Medical certificate, or BasicMed", ["medical", "basicmed", "basic med"]],
      ["Government-issued photo ID", ["photo", "driver", "passport", "identification", "government id"]],
    ],
    explanation:
      "You must have your pilot certificate, a current medical certificate or proof of BasicMed eligibility, and a government-issued photo ID such as a driver's license or passport. You have to present them if the FAA, the NTSB or law enforcement asks.",
    reference: "14 CFR 61.3",
  }),
  oral({
    id: "ppl-oral-003",
    taskId: "ppl-I-A",
    topic: "regulations",
    difficulty: 1,
    prompt: "How long is a third-class medical certificate valid for private pilot privileges?",
    keyPoints: [
      ["60 calendar months if under 40 at the exam", ["60", "sixty", "five years"]],
      ["24 calendar months if 40 or older", ["24", "twenty-four", "twenty four", "two years"]],
      ["Runs to the end of the month", ["calendar month", "end of the month", "last day"]],
    ],
    explanation:
      "If you were under 40 on the date of the exam, a third-class medical lasts 60 calendar months. At 40 or older, it lasts 24 calendar months. Calendar months mean it runs to the last day of the month. A first or second-class medical covers private privileges for the same periods.",
    reference: "14 CFR 61.23(d)",
  }),
  oral({
    id: "ppl-oral-004",
    taskId: "ppl-I-A",
    topic: "regulations",
    difficulty: 2,
    prompt: "What is BasicMed, and what are its limits?",
    keyPoints: [
      ["Held a medical certificate after July 14, 2006", ["2006", "held a medical", "previous medical", "prior medical"]],
      ["Online course every 24 months and physician exam every 48 months", ["course", "48", "forty-eight", "forty eight", "physician", "doctor"]],
      ["Aircraft with 7 or fewer occupants, 12,500 pounds or less", ["seven", "7 occupant", "7 seat", "12,500", "12500", "twelve thousand five hundred"]],
      ["Below 18,000 feet, 250 knots or less, not for hire", ["18,000", "18000", "eighteen thousand", "250", "two fifty", "compensation", "hire"]],
    ],
    explanation:
      "BasicMed lets you fly without a medical certificate if you hold a U.S. driver's license, have held a medical certificate at some point after July 14, 2006, take an online medical course every 24 calendar months, and get a physical from a state-licensed physician every 48 calendar months. You're limited to aircraft authorized for no more than seven occupants and 12,500 pounds maximum takeoff weight, below 18,000 feet MSL, at 250 knots or less, within the United States, and not for compensation or hire.",
    reference: "14 CFR 61.113(i); 14 CFR Part 68",
  }),
  oral({
    id: "ppl-oral-005",
    taskId: "ppl-I-A",
    topic: "regulations",
    difficulty: 1,
    prompt: "When do you need a flight review, and what does it involve?",
    keyPoints: [
      ["Every 24 calendar months", ["24", "twenty-four", "twenty four", "two years"]],
      ["At least 1 hour of ground and 1 hour of flight training", ["one hour", "1 hour", "hour of ground", "hour of flight"]],
      ["Given by an authorized instructor", ["instructor", "cfi"]],
      ["A checkride or the WINGS program can take its place", ["checkride", "practical test", "new rating", "wings"]],
    ],
    explanation:
      "To act as pilot in command you need a flight review within the preceding 24 calendar months. It's at least one hour of ground training and one hour of flight training with an authorized instructor, who endorses your logbook. Passing a checkride for a new certificate or rating, or completing a phase of the FAA WINGS program, also counts.",
    reference: "14 CFR 61.56",
  }),
  oral({
    id: "ppl-oral-006",
    taskId: "ppl-I-A",
    topic: "regulations",
    difficulty: 2,
    prompt: "Some friends want to fly with you to the beach and split the cost. Is that legal?",
    keyPoints: [
      ["You must pay at least your pro rata share", ["pro rata", "equal share", "my share", "split"]],
      ["Only fuel, oil, airport fees and rental fees", ["fuel", "oil", "rental", "airport"]],
      ["Common purpose: you'd be going anyway", ["common purpose", "going anyway", "own reason", "same destination"]],
      ["No holding out or advertising the flight", ["holding out", "advertis", "post"]],
    ],
    explanation:
      "Yes, a private pilot may share operating expenses with passengers, as long as the pilot pays at least a pro rata share. Only fuel, oil, airport expenditures and rental fees can be shared. You need a common purpose with your passengers, meaning you have your own reason to make the trip, and you can't hold out by advertising rides to the public.",
    reference: "14 CFR 61.113(c)",
  }),
  oral({
    id: "ppl-oral-007",
    taskId: "ppl-I-A",
    topic: "regulations",
    difficulty: 2,
    prompt: "What endorsements would you need to fly a complex airplane, a high-performance airplane, or a tailwheel airplane?",
    keyPoints: [
      ["Complex: retractable gear, flaps and controllable-pitch propeller", ["retractable", "controllable", "constant speed", "constant-speed"]],
      ["High performance: more than 200 horsepower", ["200", "two hundred", "horsepower"]],
      ["Tailwheel endorsement", ["tailwheel", "tail wheel", "conventional gear"]],
      ["One-time logbook endorsement after training with an instructor", ["one-time", "one time", "logbook", "instructor"]],
    ],
    explanation:
      "Each needs ground and flight training from an authorized instructor and a one-time logbook endorsement. A complex airplane has retractable landing gear, flaps and a controllable-pitch propeller. A high-performance airplane has an engine of more than 200 horsepower. A tailwheel endorsement covers conventional-gear airplanes.",
    reference: "14 CFR 61.31(e), (f), (i)",
  }),
  oral({
    id: "ppl-oral-008",
    taskId: "ppl-I-A",
    topic: "regulations",
    difficulty: 1,
    prompt: "You moved to a new house last month. Do you need to tell the FAA?",
    keyPoints: [
      ["Yes, within 30 days", ["30", "thirty"]],
      ["Notify the FAA Airmen Certification Branch, online or in writing", ["faa", "airmen", "online", "writing", "mail"]],
      ["Otherwise you can't exercise your privileges", ["can't fly", "cannot fly", "not exercise", "may not", "privileges"]],
    ],
    explanation:
      "Yes. If you change your permanent mailing address, you may not exercise the privileges of your certificate after 30 days unless you've notified the FAA Airmen Certification Branch, which you can do online.",
    reference: "14 CFR 61.60",
  }),
  oral({
    id: "ppl-oral-009",
    taskId: "ppl-I-A",
    topic: "regulations",
    difficulty: 1,
    prompt: "What are the rules about alcohol and flying?",
    keyPoints: [
      ["8 hours from bottle to throttle", ["8 hour", "eight hour"]],
      ["Blood alcohol below 0.04", [".04", "0.04", "point zero four", "point oh four"]],
      ["Not under the influence", ["influence", "impaired", "hangover"]],
      ["Report alcohol-related driving actions to the FAA within 60 days", ["60 days", "sixty days", "dui", "motor vehicle"]],
    ],
    explanation:
      "You may not act as a crewmember within eight hours after drinking any alcohol, while under the influence, or with a blood alcohol concentration of 0.04 or more. Separately, any alcohol- or drug-related motor vehicle action, such as a DUI conviction or license suspension, must be reported to the FAA Security and Investigations Division within 60 days.",
    reference: "14 CFR 91.17, 61.15",
  }),
  oral({
    id: "ppl-oral-010",
    taskId: "ppl-I-A",
    topic: "regulations",
    difficulty: 2,
    prompt: "Can a private pilot fly for their business?",
    keyPoints: [
      ["Yes, if the flight is only incidental to the business", ["incidental"]],
      ["No passengers or property carried for hire", ["passengers", "property", "for hire"]],
      ["Otherwise no compensation or hire", ["compensation", "paid", "hire"]],
    ],
    explanation:
      "Yes, a private pilot may act as pilot in command for compensation or hire in connection with a business or employment, but only if the flight is incidental to that business and doesn't carry passengers or property for compensation or hire. Flying a client to a meeting you're attending is incidental; being paid to fly people around is not.",
    reference: "14 CFR 61.113(a)–(b)",
  }),
  oral({
    id: "ppl-oral-011",
    taskId: "ppl-I-E",
    topic: "airspace",
    difficulty: 2,
    prompt: "As a student pilot, what do you need to fly solo in Class B airspace?",
    keyPoints: [
      ["Ground and flight training in that specific Class B", ["ground", "flight training", "training"]],
      ["Instructor endorsement within the preceding 90 days", ["endorse", "90", "ninety"]],
      ["Some Class B primary airports prohibit student pilots", ["prohibit", "not allowed", "appendix d", "primary airport"]],
    ],
    explanation:
      "A student pilot needs ground and flight training in that specific Class B airspace and a logbook endorsement from an instructor within the preceding 90 days. Some Class B primary airports, listed in Part 91 Appendix D, don't allow student pilot operations at all.",
    reference: "14 CFR 61.95, 91.131(b); Part 91 Appendix D",
  }),

  // ── I.B Airworthiness Requirements ──────────────────────────
  oral({
    id: "ppl-oral-012",
    taskId: "ppl-I-B",
    topic: "airworthiness",
    difficulty: 1,
    prompt: "What documents must be on board the airplane?",
    keyPoints: [
      ["Airworthiness certificate", ["airworthiness"]],
      ["Registration certificate", ["registration"]],
      ["Operating limitations: POH or AFM, placards and markings", ["operating limitation", "poh", "afm", "flight manual", "placard", "pilot's operating"]],
      ["Weight and balance data", ["weight and balance", "weight & balance", "w&b"]],
    ],
    explanation:
      "Remember ARROW: the Airworthiness certificate, displayed so passengers can see it; the Registration certificate; a Radio station license, needed only for international flights; Operating limitations, meaning the POH or flight manual, placards and instrument markings; and Weight and balance data.",
    reference: "14 CFR 91.9, 91.203",
  }),
  oral({
    id: "ppl-oral-013",
    taskId: "ppl-I-B",
    topic: "airworthiness",
    difficulty: 1,
    prompt: "What instruments and equipment are required for day VFR flight?",
    keyPoints: [
      ["Airspeed indicator and altimeter", ["airspeed", "altimeter"]],
      ["Tachometer, oil pressure and oil temperature gauges", ["tachometer", "oil pressure", "oil temp"]],
      ["Fuel gauges", ["fuel gauge", "fuel quantity"]],
      ["Magnetic compass", ["compass", "magnetic direction"]],
      ["Anticollision lights, seat belts and ELT", ["anticollision", "anti-collision", "seat belt", "seatbelt", "elt"]],
    ],
    explanation:
      "The memory aid is A TOMATO FLAMES: airspeed indicator, tachometer, oil pressure gauge, manifold pressure gauge for altitude engines, altimeter, temperature gauge for liquid-cooled engines, oil temperature gauge, fuel gauges, landing gear position indicator if retractable, anticollision lights on airplanes certificated after March 1996, magnetic compass, an ELT if required, and seat belts.",
    reference: "14 CFR 91.205(b)",
  }),
  oral({
    id: "ppl-oral-014",
    taskId: "ppl-XI-A",
    topic: "emergencies",
    difficulty: 1,
    prompt: "What additional equipment is required for VFR flight at night?",
    keyPoints: [
      ["Spare fuses", ["fuse"]],
      ["Landing light if operated for hire", ["landing light"]],
      ["Anticollision lights", ["anticollision", "anti-collision", "beacon", "strobe"]],
      ["Position lights", ["position light", "navigation light", "nav light"]],
      ["Adequate source of electricity", ["electric", "alternator", "battery", "generator"]],
    ],
    explanation:
      "Night VFR adds FLAPS to the day list: spare fuses, a landing light if the aircraft is operated for hire, an anticollision light system, position lights, and a source of electricity adequate for all installed equipment.",
    reference: "14 CFR 91.205(c)",
  }),
  oral({
    id: "ppl-oral-015",
    taskId: "ppl-I-B",
    topic: "airworthiness",
    difficulty: 2,
    prompt: "What inspections does the airplane need to be legal for VFR flight?",
    keyPoints: [
      ["Annual inspection within 12 calendar months", ["annual", "12", "twelve"]],
      ["100-hour inspection if used for hire or flight instruction for hire", ["100 hour", "100-hour", "hundred hour"]],
      ["ELT inspection every 12 calendar months", ["elt"]],
      ["Transponder check every 24 calendar months", ["transponder"]],
      ["Airworthiness directives complied with", ["airworthiness directive", "directives", "ads complied", "ad compliance"]],
    ],
    explanation:
      "Every airplane needs an annual inspection within the preceding 12 calendar months, and a 100-hour inspection if it's used to carry people for hire or for flight instruction for hire. The ELT must be inspected every 12 calendar months, the transponder every 24 calendar months if you'll use it, and all applicable airworthiness directives must be complied with. The pitot-static check is required only for IFR.",
    reference: "14 CFR 91.207, 91.409, 91.413; 14 CFR Part 39",
  }),
  oral({
    id: "ppl-oral-016",
    taskId: "ppl-I-B",
    topic: "airworthiness",
    difficulty: 3,
    prompt: "A rental airplane is due for its 100-hour inspection in 5 hours, but the only shop that can do it is 8 hours away. Can you fly it there?",
    keyPoints: [
      ["The 100-hour limit may be exceeded by up to 10 hours", ["10 hours", "ten hours"]],
      ["Only to reach a place where the inspection can be done", ["reach", "place", "get to", "ferry"]],
      ["The extra time counts toward the next 100 hours", ["next", "counts", "subtract", "deduct"]],
    ],
    explanation:
      "Yes. You would exceed the 100 hours by 3 hours, and the regulation allows up to 10 hours over, but only to reach a place where the inspection can be done. The excess time is counted toward the next 100-hour interval, so the next inspection comes due 3 hours early.",
    reference: "14 CFR 91.409(b)",
  }),
  oral({
    id: "ppl-oral-017",
    taskId: "ppl-I-B",
    topic: "airworthiness",
    difficulty: 2,
    prompt: "What is an airworthiness directive, and how do you know whether one has been complied with?",
    keyPoints: [
      ["Mandatory, issued by the FAA under Part 39", ["mandatory", "required", "part 39", "must"]],
      ["Corrects an unsafe condition", ["unsafe"]],
      ["One-time or recurring", ["recurring", "one-time", "one time", "repetitive"]],
      ["Status is recorded in the maintenance records", ["logbook", "log book", "maintenance record", "records"]],
    ],
    explanation:
      "An airworthiness directive is a legally enforceable rule issued by the FAA to correct an unsafe condition in an aircraft, engine, propeller or appliance. Some are one-time and some recur by hours or calendar time. The maintenance records must show the current status of each applicable AD, the method of compliance, and when any recurring action is next due.",
    reference: "14 CFR Part 39; 91.417(a)(2)(v)",
  }),
  oral({
    id: "ppl-oral-018",
    taskId: "ppl-I-B",
    topic: "airworthiness",
    difficulty: 2,
    prompt: "During preflight you find the landing light doesn't work. The airplane has no minimum equipment list. Can you fly today?",
    keyPoints: [
      ["Not required by the equipment list or kinds of operations list", ["equipment list", "koel", "kinds of operation", "type certificate"]],
      ["Not required by 91.205 for the flight", ["91.205", "required by", "day vfr", "not for hire"]],
      ["Not required by an airworthiness directive", ["airworthiness directive", "directive"]],
      ["Placarded inoperative, or removed or deactivated", ["placard", "inoperative", "deactivat", "removed"]],
      ["Pilot decides it isn't a hazard", ["hazard", "safe"]],
    ],
    explanation:
      "Probably, using 91.213(d). The landing light must not be required by the airplane's equipment list or kinds of operations list, by 91.205, or by an airworthiness directive. For a day flight that isn't for hire, 91.205 doesn't require it. Then it must be placarded inoperative, or deactivated or removed by maintenance, and you must decide it doesn't create a hazard for this flight.",
    reference: "14 CFR 91.213(d)",
  }),
  oral({
    id: "ppl-oral-019",
    taskId: "ppl-I-B",
    topic: "airworthiness",
    difficulty: 2,
    prompt: "What maintenance are you allowed to do yourself as a private pilot?",
    keyPoints: [
      ["Preventive maintenance listed in Part 43 Appendix A", ["appendix a", "part 43", "preventive maintenance"]],
      ["Examples: oil changes, tires, bulbs, fluids", ["oil", "tire", "bulb", "fluid", "spark plug", "fuse"]],
      ["On an airplane you own or operate", ["own", "operate"]],
      ["Record it in the maintenance records", ["logbook", "log book", "record", "sign"]],
    ],
    explanation:
      "A certificated pilot may perform preventive maintenance from Part 43 Appendix A on an aircraft they own or operate that isn't used under Part 121, 129 or 135. Examples are changing oil, servicing tires, replacing bulbs and fuses, and replenishing hydraulic fluid. You must make an entry in the maintenance records with a description, the date, your signature and certificate number.",
    reference: "14 CFR 43.3(g), 43.9; Part 43 Appendix A",
  }),
  oral({
    id: "ppl-oral-020",
    taskId: "ppl-I-B",
    topic: "airworthiness",
    difficulty: 1,
    prompt: "Who is responsible for making sure the airplane is airworthy?",
    keyPoints: [
      ["The owner or operator maintains it", ["owner", "operator"]],
      ["The pilot in command determines it's safe for flight", ["pilot in command", "pic", "the pilot"]],
      ["Includes inspections and airworthiness directives", ["inspection", "directive"]],
    ],
    explanation:
      "The owner or operator is primarily responsible for maintaining the aircraft in an airworthy condition, including inspections and airworthiness directives. The pilot in command is responsible for determining whether the aircraft is in condition for safe flight, and must discontinue the flight if it isn't.",
    reference: "14 CFR 91.3, 91.7, 91.403",
  }),
  oral({
    id: "ppl-oral-021",
    taskId: "ppl-I-B",
    topic: "airworthiness",
    difficulty: 2,
    prompt: "What is a special flight permit, and when would you need one?",
    keyPoints: [
      ["For an airplane that doesn't meet airworthiness requirements but can fly safely", ["not airworthy", "doesn't meet", "does not meet", "unairworthy", "capable of safe", "safe flight"]],
      ["Ferry to a repair base, delivery or evacuation", ["ferry", "repair", "maintenance", "evacuat", "deliver"]],
      ["Issued by the FAA, usually the local FSDO", ["fsdo", "faa"]],
    ],
    explanation:
      "A special flight permit, often called a ferry permit, allows an aircraft that doesn't currently meet airworthiness requirements, but is capable of safe flight, to be flown for a specific purpose, such as to a base where repairs or an overdue inspection can be done, or to evacuate it from danger. You apply to the FAA, usually through the local Flight Standards District Office.",
    reference: "14 CFR 21.197",
  }),

  // ── I.C Weather Information ─────────────────────────────────
  oral({
    id: "ppl-oral-022",
    taskId: "ppl-I-C",
    topic: "weather-services",
    difficulty: 1,
    prompt: "Where can you get an official weather briefing, and what types of briefing are there?",
    keyPoints: [
      ["Flight Service: 1-800-WX-BRIEF or 1800wxbrief.com", ["flight service", "1-800", "1800", "wx brief", "wxbrief", "fss"]],
      ["Standard briefing", ["standard"]],
      ["Abbreviated briefing", ["abbreviated"]],
      ["Outlook briefing, 6 or more hours ahead", ["outlook"]],
    ],
    explanation:
      "Flight Service provides official briefings by phone at 1-800-WX-BRIEF or online at 1800wxbrief.com. A standard briefing is for when you haven't looked at the weather yet. An abbreviated briefing updates an earlier one or gives a specific item. An outlook briefing is for a departure six or more hours away.",
    reference: "AIM 7-1; Aviation Weather Handbook (FAA-H-8083-28)",
  }),
  oral({
    id: "ppl-oral-023",
    taskId: "ppl-I-C",
    topic: "weather-services",
    difficulty: 2,
    prompt: "Read me this METAR: KBNA 121853Z 21012G20KT 4SM -RA BR BKN009 OVC015 18/16 A2994.",
    keyPoints: [
      ["Wind 210 at 12 knots, gusting 20", ["210", "two one zero", "two ten", "gust"]],
      ["Visibility 4 miles in light rain and mist", ["4 mile", "four mile", "4 statute", "four statute", "light rain", "mist"]],
      ["Ceiling 900 feet broken", ["900", "nine hundred", "ceiling"]],
      ["Temperature 18, dewpoint 16, altimeter 29.94", ["29.94", "2994", "two nine nine four", "dewpoint", "dew point"]],
    ],
    explanation:
      "Nashville, on the 12th at 1853 Zulu: wind from 210 degrees true at 12 knots gusting 20, visibility 4 statute miles in light rain and mist, ceiling 900 broken with an overcast layer at 1,500, temperature 18, dewpoint 16, altimeter 29.94. With a 900-foot ceiling, that's IFR.",
    reference: "Aviation Weather Handbook (FAA-H-8083-28); AIM 7-1",
  }),
  oral({
    id: "ppl-oral-024",
    taskId: "ppl-I-C",
    topic: "weather-services",
    difficulty: 2,
    prompt: "What's the difference between an AIRMET and a SIGMET?",
    keyPoints: [
      ["AIRMETs: Sierra for IFR, Tango for turbulence, Zulu for icing", ["sierra", "tango", "zulu"]],
      ["SIGMETs: severe icing, severe or extreme turbulence, dust or sand, volcanic ash", ["severe", "volcanic", "dust", "sand"]],
      ["SIGMETs are hazardous to all aircraft", ["all aircraft"]],
      ["Convective SIGMETs cover thunderstorms", ["convective", "thunderstorm"]],
    ],
    explanation:
      "AIRMETs warn of conditions mainly hazardous to light aircraft: Sierra for IFR conditions and mountain obscuration, Tango for moderate turbulence, strong surface winds and low-level wind shear, and Zulu for moderate icing and freezing levels. SIGMETs warn of hazards to all aircraft: severe icing, severe or extreme turbulence, dust or sandstorms below 3 miles visibility, and volcanic ash. Convective SIGMETs cover thunderstorms.",
    reference: "AIM 7-1; Aviation Weather Handbook (FAA-H-8083-28)",
  }),
  oral({
    id: "ppl-oral-025",
    taskId: "ppl-I-C",
    topic: "weather-theory",
    difficulty: 1,
    prompt: "What three things does a thunderstorm need to form, and what are its life stages?",
    keyPoints: [
      ["Moisture", ["moisture", "water vapor", "humid"]],
      ["Unstable air", ["unstable", "instability"]],
      ["A lifting force", ["lift"]],
      ["Cumulus, mature and dissipating stages", ["cumulus", "mature", "dissipat"]],
    ],
    explanation:
      "A thunderstorm needs sufficient moisture, an unstable lapse rate, and a lifting force such as a front, terrain or surface heating. In the cumulus stage, updrafts build the cloud. The mature stage starts when precipitation falls from the base, with strong updrafts and downdrafts, and it's the most violent. In the dissipating stage, downdrafts take over.",
    reference: "Aviation Weather Handbook (FAA-H-8083-28); PHAK Ch. 12",
  }),
  oral({
    id: "ppl-oral-026",
    taskId: "ppl-I-C",
    topic: "weather-theory",
    difficulty: 1,
    prompt: "How far should you stay from a severe thunderstorm, and why?",
    keyPoints: [
      ["At least 20 nautical miles", ["20", "twenty"]],
      ["Hail, turbulence and lightning extend outside the cloud", ["hail", "turbulence", "lightning"]],
      ["Never under the anvil or between storms", ["anvil", "between"]],
    ],
    explanation:
      "The AIM says to avoid any thunderstorm identified as severe or giving an intense radar echo by at least 20 nautical miles. Severe turbulence, hail and lightning can extend well outside the visible cloud, and hail can fall from the anvil miles from the core, so never fly under the anvil or try to thread between storms.",
    reference: "AIM 7-1 (thunderstorm flying)",
  }),
  oral({
    id: "ppl-oral-027",
    taskId: "ppl-I-C",
    topic: "weather-theory",
    difficulty: 2,
    prompt: "What conditions cause structural icing, and which type of precipitation is the most dangerous?",
    keyPoints: [
      ["Visible moisture", ["visible moisture", "cloud", "rain", "precipitation"]],
      ["Temperature at or below freezing", ["freezing", "zero", "0 degrees", "32"]],
      ["Freezing rain is worst; it means warmer air above", ["freezing rain", "warmer air above", "inversion", "warm layer"]],
      ["Get out: turn around or change altitude", ["turn around", "turning around", "180", "climb", "descend", "change altitude", "changing altitude", "get out", "exit", "leave"]],
    ],
    explanation:
      "Structural icing needs visible moisture, such as cloud or rain, and an airframe at or below freezing. Freezing rain is the most dangerous because it builds clear ice very quickly, and it tells you there's warmer air above you. If you pick up ice, get out of it right away by turning around or changing altitude toward warmer air.",
    reference: "Aviation Weather Handbook (FAA-H-8083-28); AIM 7-1",
  }),
  oral({
    id: "ppl-oral-028",
    taskId: "ppl-I-C",
    topic: "weather-theory",
    difficulty: 2,
    prompt: "Describe the weather you'd expect as a cold front passes.",
    keyPoints: [
      ["Cumuliform clouds, showers or thunderstorms", ["cumul", "shower", "thunderstorm"]],
      ["Gusty wind shift", ["wind shift", "shift", "gust"]],
      ["Temperature and dewpoint drop", ["colder", "cooler", "temperature drop", "drop"]],
      ["Pressure rises, then rapid clearing", ["pressure rise", "pressure increase", "pressure goes up", "clear"]],
    ],
    explanation:
      "A cold front usually brings a narrow band of cumuliform clouds with showers or thunderstorms, sometimes a squall line ahead of it. As it passes, the wind shifts and gusts, often to the northwest, the temperature and dewpoint drop sharply, and the pressure rises. Behind it, skies clear quickly and visibility improves.",
    reference: "Aviation Weather Handbook (FAA-H-8083-28); PHAK Ch. 12",
  }),
  oral({
    id: "ppl-oral-029",
    taskId: "ppl-I-C",
    topic: "weather-theory",
    difficulty: 2,
    prompt: "What's the difference between radiation fog and advection fog?",
    keyPoints: [
      ["Radiation fog: clear, calm nights as the ground cools", ["clear", "calm", "night", "ground cool"]],
      ["Radiation fog burns off after sunrise", ["burn off", "burns off", "sunrise", "morning"]],
      ["Advection fog: moist air moving over a colder surface", ["advection", "moves over", "moving over", "cold surface", "cooler surface"]],
      ["Advection fog needs wind and is common on coasts", ["wind", "coast"]],
    ],
    explanation:
      "Radiation fog forms on clear, calm nights when the ground cools by radiation and chills the moist air near it. It's common in low areas and usually burns off after sunrise. Advection fog forms when warm, moist air moves over a cooler surface, so it needs wind, often forms along coasts, and can persist day or night over wide areas.",
    reference: "Aviation Weather Handbook (FAA-H-8083-28); PHAK Ch. 12",
  }),
  oral({
    id: "ppl-oral-030",
    taskId: "ppl-I-C",
    topic: "weather-theory",
    difficulty: 2,
    prompt: "What is a temperature inversion, and what weather does it bring?",
    keyPoints: [
      ["Temperature increases with altitude", ["increase", "warmer", "rises with altitude", "gets warmer"]],
      ["Very stable air", ["stable"]],
      ["Poor visibility from haze, smoke or fog", ["haze", "smoke", "fog", "visibility"]],
      ["Possible wind shear at the inversion", ["wind shear", "shear"]],
    ],
    explanation:
      "An inversion is a layer where temperature increases with altitude instead of decreasing. The air is very stable, so smoke, haze and fog get trapped beneath it, giving smooth air but poor visibility. Ground-based inversions form on clear, calm nights. Watch for wind shear where calm air below meets strong winds above.",
    reference: "Aviation Weather Handbook (FAA-H-8083-28); PHAK Ch. 12",
  }),
  oral({
    id: "ppl-oral-031",
    taskId: "ppl-I-C",
    topic: "weather-services",
    difficulty: 2,
    prompt: "How do you read a winds aloft forecast? Decode 2615 plus 05 at 6,000 feet.",
    keyPoints: [
      ["Wind from 260 degrees true", ["260", "two six zero", "two sixty", "true"]],
      ["15 knots", ["15", "fifteen"]],
      ["Temperature plus 5 Celsius", ["plus five", "+5", "plus 5", "positive five", "five degrees", "5 degrees"]],
      ["9900 means light and variable", ["9900", "light and variable"]],
    ],
    explanation:
      "The first two digits are the direction in tens of degrees true, the next two are speed in knots, and the last part is temperature in Celsius. So 2615 plus 05 is wind from 260 true at 15 knots, temperature plus 5. A code of 9900 means light and variable, and if the direction digits are over 50, subtract 50 from the direction and add 100 to the speed.",
    reference: "Aviation Weather Handbook (FAA-H-8083-28)",
  }),
  oral({
    id: "ppl-oral-032",
    taskId: "ppl-I-C",
    topic: "weather-services",
    difficulty: 2,
    prompt: "What is a TAF, and what do FM, TEMPO and PROB mean in one?",
    keyPoints: [
      ["Forecast for 5 statute miles around the airport", ["5 mile", "five mile", "5 statute", "five statute"]],
      ["Usually covers 24 or 30 hours", ["24", "30", "twenty-four", "thirty"]],
      ["FM: a rapid, lasting change from that time", ["from"]],
      ["TEMPO: temporary changes, under an hour at a time", ["temporar"]],
      ["PROB30 or PROB40: probability of conditions", ["probability", "percent", "chance"]],
    ],
    explanation:
      "A terminal aerodrome forecast covers the area within 5 statute miles of the airport, usually for 24 or 30 hours. FM means from: a rapid, lasting change starting at that time. TEMPO means temporary fluctuations, each lasting less than an hour and together less than half the period. PROB30 or PROB40 gives the percent chance of the conditions that follow.",
    reference: "Aviation Weather Handbook (FAA-H-8083-28)",
  }),
  oral({
    id: "ppl-oral-033",
    taskId: "ppl-I-C",
    topic: "weather-services",
    difficulty: 1,
    prompt: "What is a PIREP, and why is it valuable?",
    keyPoints: [
      ["A pilot weather report", ["pilot report", "pilot weather report"]],
      ["The only direct report of tops, icing and turbulence", ["tops", "icing", "turbulence"]],
      ["Routine or urgent", ["urgent", "routine", "uua"]],
      ["Give them to ATC or Flight Service", ["atc", "flight service", "controller"]],
    ],
    explanation:
      "A PIREP is a pilot weather report. It's the only real observation of conditions aloft, such as cloud tops, icing and turbulence, so it fills the gaps between forecasts. Reports are coded UA for routine or UUA for urgent, and you can give one to ATC or Flight Service any time you meet weather worth reporting.",
    reference: "AIM 7-1",
  }),
  oral({
    id: "ppl-oral-034",
    taskId: "ppl-I-C",
    topic: "weather-services",
    difficulty: 2,
    prompt: "What are the Graphical Forecasts for Aviation, and what did they replace?",
    keyPoints: [
      ["An interactive graphical forecast and observation tool", ["graphical", "interactive", "map"]],
      ["Shows clouds, weather, ceilings, visibility, icing, turbulence and winds", ["ceiling", "icing", "turbulence", "clouds"]],
      ["Replaced the text area forecast", ["area forecast", "replaced"]],
    ],
    explanation:
      "The GFA, on the Aviation Weather Center website, shows observations and forecasts of clouds, weather, ceilings, visibility, winds, icing and turbulence on one interactive map for the contiguous United States. It replaced the old text Area Forecast.",
    reference: "Aviation Weather Handbook (FAA-H-8083-28)",
  }),
  oral({
    id: "ppl-oral-035",
    taskId: "ppl-I-C",
    topic: "weather-theory",
    difficulty: 2,
    prompt: "What is a microburst, and what does it do to an airplane on approach?",
    keyPoints: [
      ["An intense, localized downdraft", ["downdraft", "down draft"]],
      ["First a headwind, then a downdraft and tailwind", ["headwind", "tailwind"]],
      ["Airspeed rises, then drops sharply", ["airspeed", "lose", "drop", "loss"]],
      ["Up to 6,000 feet per minute; lasts about 15 minutes", ["15 minutes", "fifteen", "6,000", "6000", "six thousand"]],
    ],
    explanation:
      "A microburst is an intense, short-lived downdraft, usually less than a mile across where it hits the ground, with downdrafts up to 6,000 feet per minute. On approach you first get an increasing headwind and a gain in airspeed, then a strong downdraft and a tailwind that can drop airspeed and push the airplane into the ground. Most last about 15 minutes. Avoid them, especially near thunderstorms and virga.",
    reference: "AIM 7-1 (microbursts)",
  }),

  // ── I.D Cross-Country Flight Planning ───────────────────────
  oral({
    id: "ppl-oral-036",
    taskId: "ppl-I-D",
    topic: "regulations",
    difficulty: 1,
    prompt: "How much fuel do you need for a VFR flight by day, and at night?",
    keyPoints: [
      ["Enough to reach the first point of intended landing", ["first point", "destination", "intended landing"]],
      ["Plus 30 minutes by day", ["30", "thirty"]],
      ["Plus 45 minutes at night", ["45", "forty-five", "forty five"]],
      ["At normal cruising speed", ["cruis"]],
    ],
    explanation:
      "You need enough fuel, considering wind and forecast weather, to fly to the first point of intended landing and then, at normal cruising speed, for at least 30 more minutes by day or 45 more minutes at night. Many pilots set a personal minimum of an hour.",
    reference: "14 CFR 91.151",
  }),
  oral({
    id: "ppl-oral-037",
    taskId: "ppl-I-D",
    topic: "regulations",
    difficulty: 1,
    prompt: "What does the preflight action regulation require you to know before a flight?",
    keyPoints: [
      ["All available information concerning the flight", ["all available"]],
      ["Runway lengths and takeoff and landing distances", ["runway length", "takeoff", "landing distance"]],
      ["Weather reports and forecasts", ["weather"]],
      ["Fuel requirements", ["fuel"]],
      ["Alternatives and known ATC delays", ["alternat", "delay"]],
    ],
    explanation:
      "Under 91.103 you must become familiar with all available information about the flight. That includes runway lengths and takeoff and landing distance data and, for flights away from the local area, weather reports and forecasts, fuel requirements, alternatives if the flight can't be completed, and known ATC delays. NWKRAFT is a common memory aid.",
    reference: "14 CFR 91.103",
  }),
  oral({
    id: "ppl-oral-038",
    taskId: "ppl-I-D",
    topic: "navigation",
    difficulty: 2,
    prompt: "Walk me through turning a true course from the chart into a compass heading.",
    keyPoints: [
      ["Apply wind correction to get true heading", ["wind correction", "wca", "true heading"]],
      ["Apply variation: east is least, west is best", ["variation", "east is least", "west is best"]],
      ["Apply deviation from the compass card", ["deviation", "compass card", "correction card"]],
    ],
    explanation:
      "Start with the true course measured on the chart. Apply the wind correction angle to get true heading. Apply magnetic variation from the isogonic line, subtracting east and adding west, to get magnetic heading. Finally, apply deviation from the compass correction card to get compass heading.",
    reference: "PHAK Ch. 16",
  }),
  oral({
    id: "ppl-oral-039",
    taskId: "ppl-I-D",
    topic: "regulations",
    difficulty: 1,
    prompt: "What altitudes do you cruise at VFR when you're more than 3,000 feet above the ground?",
    keyPoints: [
      ["Based on magnetic course", ["magnetic course", "magnetic"]],
      ["0 to 179 degrees: odd thousands plus 500", ["odd"]],
      ["180 to 359 degrees: even thousands plus 500", ["even"]],
      ["Applies above 3,000 AGL and below 18,000 MSL", ["3,000", "3000", "three thousand", "18,000", "eighteen thousand"]],
    ],
    explanation:
      "When more than 3,000 feet above the surface and below 18,000 feet MSL, a VFR flight on a magnetic course of 0 through 179 degrees flies odd thousands plus 500 feet, such as 5,500. On a magnetic course of 180 through 359, fly even thousands plus 500, such as 6,500.",
    reference: "14 CFR 91.159",
  }),
  oral({
    id: "ppl-oral-040",
    taskId: "ppl-I-D",
    topic: "navigation",
    difficulty: 1,
    prompt: "How do you file, open and close a VFR flight plan, and what happens if you forget to close it?",
    keyPoints: [
      ["File with Flight Service", ["flight service", "fss", "1800wxbrief", "1-800"]],
      ["It must be opened or activated", ["open", "activate"]],
      ["Close it after landing", ["close"]],
      ["Search and rescue starts 30 minutes after your ETA", ["30 minutes", "thirty minutes", "search"]],
    ],
    explanation:
      "You file a VFR flight plan with Flight Service by phone, radio or online. It isn't active until you open it, usually right after takeoff. When you land, close it. If it isn't closed within 30 minutes of your estimated arrival time, Flight Service starts search and rescue procedures.",
    reference: "AIM 5-1",
  }),
  oral({
    id: "ppl-oral-041",
    taskId: "ppl-I-D",
    topic: "navigation",
    difficulty: 1,
    prompt: "What makes a good checkpoint on a VFR cross-country?",
    keyPoints: [
      ["Easy to identify from the air", ["landmark", "river", "highway", "lake", "town", "road", "railroad", "tower"]],
      ["Spaced regularly, roughly every 10 to 20 miles", ["10", "20", "ten", "twenty", "every"]],
      ["Unique and visible from your altitude", ["unique", "distinct", "visible", "stand out"]],
    ],
    explanation:
      "Good checkpoints are features you can't mistake from your cruising altitude, such as a town with a distinctive shape, a highway intersection, a lake or a river bend. Space them about every 10 to 20 miles so you can check your groundspeed and correct your heading early.",
    reference: "PHAK Ch. 16",
  }),

  // ── I.E National Airspace System ────────────────────────────
  oral({
    id: "ppl-oral-042",
    taskId: "ppl-I-E",
    topic: "airspace",
    difficulty: 1,
    prompt: "What are the VFR weather minimums in Class C, D and E airspace below 10,000 feet?",
    keyPoints: [
      ["3 statute miles visibility", ["3 mile", "three mile", "3 statute", "three statute"]],
      ["500 feet below clouds", ["500", "five hundred"]],
      ["1,000 feet above clouds", ["1,000", "1000", "thousand"]],
      ["2,000 feet horizontal", ["2,000", "2000", "two thousand"]],
    ],
    explanation:
      "Three statute miles visibility, and 500 feet below, 1,000 feet above and 2,000 feet horizontally from clouds. It's often remembered as 3-152. In Class B it's 3 miles and clear of clouds.",
    reference: "14 CFR 91.155",
  }),
  oral({
    id: "ppl-oral-043",
    taskId: "ppl-I-E",
    topic: "airspace",
    difficulty: 2,
    prompt: "What are the VFR minimums in Class G airspace at or below 1,200 feet above the ground, by day and at night?",
    keyPoints: [
      ["Day: 1 statute mile and clear of clouds", ["1 mile", "one mile", "1 statute", "one statute", "clear of clouds"]],
      ["Night: 3 miles, 500 below, 1,000 above, 2,000 horizontal", ["3 mile", "three mile", "3 statute", "three statute"]],
      ["Night exception: 1 mile clear of clouds in the pattern within half a mile of the runway", ["half mile", "half a mile", "1/2", "pattern"]],
    ],
    explanation:
      "By day it's 1 statute mile and clear of clouds. At night it's 3 statute miles and 500 below, 1,000 above and 2,000 feet horizontally from clouds, except that you may fly in the traffic pattern with 1 mile visibility, clear of clouds, within half a mile of the runway.",
    reference: "14 CFR 91.155(a)–(b)",
  }),
  oral({
    id: "ppl-oral-044",
    taskId: "ppl-I-E",
    topic: "airspace",
    difficulty: 1,
    prompt: "What do you need to enter Class B, Class C and Class D airspace?",
    keyPoints: [
      ["Class B: an explicit ATC clearance", ["clearance", "cleared"]],
      ["Class C and D: two-way radio communication established", ["two-way", "two way", "communication"]],
      ["Class B and C: Mode C transponder and ADS-B Out", ["transponder", "mode c", "ads-b", "adsb"]],
      ["Class B: a private pilot certificate or a student endorsement", ["endorse", "private pilot", "certificate"]],
    ],
    explanation:
      "Class B requires an explicit clearance, a two-way radio, a Mode C transponder and ADS-B Out, and at least a private pilot certificate or a student endorsement. Class C requires two-way communication established before entering, plus a Mode C transponder and ADS-B Out. Class D requires two-way communication established before entering.",
    reference: "14 CFR 91.129, 91.130, 91.131, 91.215, 91.225",
  }),
  oral({
    id: "ppl-oral-045",
    taskId: "ppl-I-E",
    topic: "airspace",
    difficulty: 2,
    prompt: "You call approach before entering Class C, and they answer, \"Aircraft calling, standby.\" Can you enter?",
    keyPoints: [
      ["No, two-way communication isn't established", ["not established", "isn't established", "doesn't count", "can't", "cannot", "may not", "not allowed"]],
      ["ATC must use your call sign", ["call sign", "callsign", "tail number"]],
      ["Stay outside until they do", ["outside", "wait", "remain clear", "stay clear"]],
    ],
    explanation:
      "No. Two-way communication is established only when the controller responds using your call sign. \"Aircraft calling, standby\" doesn't count, so remain outside the Class C until they answer with your call sign. If they had said your call sign and \"standby,\" you could enter.",
    reference: "AIM 3-2-4; 14 CFR 91.130",
  }),
  oral({
    id: "ppl-oral-046",
    taskId: "ppl-I-E",
    topic: "airspace",
    difficulty: 2,
    prompt: "What is the Mode C veil, and where are a transponder and ADS-B Out required?",
    keyPoints: [
      ["Within 30 nautical miles of a Class B primary airport, up to 10,000 feet", ["30", "thirty"]],
      ["In Class A, B and C airspace", ["class a", "class b", "class c"]],
      ["At and above 10,000 MSL, except at or below 2,500 AGL", ["10,000", "10000", "ten thousand", "2,500", "2500"]],
      ["Above Class C up to 10,000 feet", ["above class c", "above the class c", "over class c", "over the class c", "ceiling of class c"]],
    ],
    explanation:
      "The Mode C veil is the area within 30 nautical miles of a Class B primary airport, from the surface to 10,000 feet MSL. A Mode C transponder and ADS-B Out are required there, in Class A, B and C airspace, above the ceiling of Class C within its lateral limits up to 10,000 feet, and at and above 10,000 feet MSL except at or below 2,500 feet AGL.",
    reference: "14 CFR 91.215, 91.225",
  }),
  oral({
    id: "ppl-oral-047",
    taskId: "ppl-I-E",
    topic: "airspace",
    difficulty: 1,
    prompt: "What is a military operations area, and can you fly through one VFR?",
    keyPoints: [
      ["Military training airspace", ["military", "training"]],
      ["Separates military activity from IFR traffic", ["ifr", "separate"]],
      ["VFR flight is allowed without permission", ["allowed", "no permission", "without permission", "permitted", "may fly", "you can", "legal"]],
      ["Check whether it's active and use extra caution", ["active", "contact", "flight service", "controlling agency", "vigilan", "caution"]],
    ],
    explanation:
      "A MOA separates military training activity, like aerobatics and air combat practice, from IFR traffic. VFR pilots may fly through without permission, but should find out whether it's active, by contacting Flight Service or the controlling agency listed on the chart, and keep a very sharp lookout.",
    reference: "AIM 3-4-5",
  }),
  oral({
    id: "ppl-oral-048",
    taskId: "ppl-I-E",
    topic: "airspace",
    difficulty: 1,
    prompt: "What's the difference between prohibited and restricted airspace?",
    keyPoints: [
      ["Prohibited: no flight allowed, for security", ["prohibited", "security", "never", "no flight"]],
      ["Restricted: hazards like artillery or missiles", ["artillery", "missile", "gunfire", "hazard"]],
      ["Restricted may be entered when inactive or with permission", ["not active", "inactive", "permission", "controlling agency", "cold"]],
    ],
    explanation:
      "Prohibited areas, such as over the White House, ban all flight for national security. Restricted areas contain invisible hazards like artillery firing or missiles. You may not enter a restricted area while it's active without permission from the controlling or using agency.",
    reference: "AIM 3-4-2, 3-4-3",
  }),
  oral({
    id: "ppl-oral-049",
    taskId: "ppl-I-E",
    topic: "airspace",
    difficulty: 1,
    prompt: "What is a TFR, and how do you find out about them?",
    keyPoints: [
      ["Temporary flight restriction", ["temporary"]],
      ["Issued by NOTAM", ["notam"]],
      ["For VIPs, disasters, stadiums and similar events", ["president", "vip", "stadium", "fire", "disaster", "sport", "space"]],
      ["Check before every flight", ["briefing", "check", "flight service", "tfr.faa.gov", "app"]],
    ],
    explanation:
      "A temporary flight restriction limits flight in an area for things like presidential movement, disasters, wildfires, space launches and major sporting events. TFRs are issued by NOTAM and aren't on the printed chart, so check for them on every flight in your briefing, on the FAA TFR website or in your EFB.",
    reference: "14 CFR 91.137–91.145; AIM 3-5-3",
  }),
  oral({
    id: "ppl-oral-050",
    taskId: "ppl-I-E",
    topic: "airspace",
    difficulty: 2,
    prompt: "What is special VFR, and when can you use it?",
    keyPoints: [
      ["An ATC clearance within a surface area", ["clearance", "surface area"]],
      ["1 statute mile visibility and clear of clouds", ["1 mile", "one mile", "1 statute", "one statute", "clear of clouds"]],
      ["At night it requires an instrument rating and IFR-equipped airplane", ["instrument rating", "night", "ifr"]],
      ["Not available at some Class B airports", ["not available", "some airports", "class b", "appendix d"]],
    ],
    explanation:
      "Special VFR is an ATC clearance to operate within the surface area of Class B, C, D or E airspace when the weather is below basic VFR. You must stay clear of clouds with at least 1 statute mile visibility. At night it requires an instrument rating and an IFR-equipped airplane, and it isn't available for airplanes at some busy Class B airports.",
    reference: "14 CFR 91.157",
  }),
  oral({
    id: "ppl-oral-051",
    taskId: "ppl-I-E",
    topic: "airspace",
    difficulty: 2,
    prompt: "How is Class E airspace shown on a sectional, and where does it begin?",
    keyPoints: [
      ["Magenta shading: Class E begins at 700 feet AGL", ["700", "seven hundred", "magenta"]],
      ["Blue shading or no marking: Class E begins at 1,200 feet AGL", ["1,200", "1200", "twelve hundred"]],
      ["Dashed magenta: Class E to the surface", ["dashed", "surface"]],
      ["Up to but not including 18,000 MSL", ["18,000", "18000", "eighteen thousand"]],
    ],
    explanation:
      "A faded magenta band shows Class E beginning at 700 feet AGL on the shaded side. A faded blue band marks where it begins at 1,200 feet AGL, and where nothing is shown it generally begins at 1,200 AGL. A dashed magenta line is a Class E surface area. Class E extends up to, but not including, 18,000 feet MSL.",
    reference: "FAA Aeronautical Chart User's Guide; AIM 3-2-6",
  }),
  oral({
    id: "ppl-oral-052",
    taskId: "ppl-I-E",
    topic: "regulations",
    difficulty: 2,
    prompt: "What speed limits apply below 10,000 feet and near Class B, C and D airspace?",
    keyPoints: [
      ["250 knots below 10,000 feet MSL", ["250", "two fifty", "two hundred fifty"]],
      ["200 knots within 4 nautical miles of a Class C or D primary airport, at or below 2,500 AGL", ["200", "two hundred", "4 nautical", "four nautical", "4 miles", "four miles"]],
      ["200 knots under a Class B shelf or in a VFR corridor", ["shelf", "corridor", "underneath", "beneath", "under"]],
    ],
    explanation:
      "Below 10,000 feet MSL the limit is 250 knots indicated. Within 4 nautical miles of the primary airport of Class C or D airspace, at or below 2,500 feet AGL, it's 200 knots. Under a Class B shelf or in a VFR corridor through Class B, it's also 200 knots. ATC can authorize otherwise.",
    reference: "14 CFR 91.117",
  }),
  oral({
    id: "ppl-oral-053",
    taskId: "ppl-I-E",
    topic: "regulations",
    difficulty: 1,
    prompt: "What are the minimum safe altitudes over congested and non-congested areas?",
    keyPoints: [
      ["Anywhere: high enough for an emergency landing", ["emergency landing", "glide", "undue hazard"]],
      ["Congested: 1,000 feet above the highest obstacle within 2,000 feet", ["1,000", "1000", "thousand"]],
      ["Other areas: 500 feet above the surface", ["500", "five hundred"]],
      ["Sparsely populated: 500 feet from any person, vessel, vehicle or structure", ["vessel", "vehicle", "structure", "person"]],
    ],
    explanation:
      "Except for takeoff and landing, you must always be high enough to make an emergency landing without undue hazard to people or property. Over congested areas, stay 1,000 feet above the highest obstacle within 2,000 feet horizontally. Elsewhere, 500 feet above the surface, and over open water or sparsely populated areas, no closer than 500 feet to any person, vessel, vehicle or structure.",
    reference: "14 CFR 91.119",
  }),
  oral({
    id: "ppl-oral-054",
    taskId: "ppl-III-A",
    topic: "airport-ops",
    difficulty: 2,
    prompt: "You see the airport's rotating beacon on in the middle of the day. What might that mean?",
    keyPoints: [
      ["Weather may be below VFR minimums in the surface area", ["below vfr", "ifr", "weather", "minimums"]],
      ["Ceiling below 1,000 feet or visibility below 3 miles", ["1,000", "1000", "3 mile", "three mile"]],
      ["It isn't required, so check the weather", ["not required", "no requirement", "not always", "check"]],
    ],
    explanation:
      "In a Class B, C, D or E surface area, a beacon operating during daylight often means the ceiling is below 1,000 feet or the ground visibility is below 3 miles, so you'd need special VFR or an IFR clearance. There's no requirement to turn it on, though, so always confirm with the actual weather.",
    reference: "AIM 2-1-10",
  }),

  // ── I.F Performance and Limitations ─────────────────────────
  oral({
    id: "ppl-oral-055",
    taskId: "ppl-I-F",
    topic: "performance",
    difficulty: 1,
    prompt: "What is density altitude, and how does it affect performance?",
    keyPoints: [
      ["Pressure altitude corrected for nonstandard temperature", ["pressure altitude", "nonstandard", "non-standard", "temperature"]],
      ["Raised by high elevation, heat and humidity", ["hot", "high", "humid"]],
      ["Longer takeoff and landing, worse climb", ["longer", "takeoff", "climb"]],
      ["Less engine power and propeller efficiency", ["power", "propeller", "engine"]],
    ],
    explanation:
      "Density altitude is pressure altitude corrected for nonstandard temperature. It's the altitude the airplane performs as if it were at. High elevation, high temperature and high humidity all raise it, which reduces engine power, propeller efficiency and lift, so takeoff and landing rolls get longer and the climb rate drops.",
    reference: "PHAK Ch. 11",
  }),
  oral({
    id: "ppl-oral-056",
    taskId: "ppl-I-F",
    topic: "performance",
    difficulty: 2,
    prompt: "How do you work out the center of gravity, and what's dangerous about an aft CG?",
    keyPoints: [
      ["Weight times arm equals moment", ["moment", "arm"]],
      ["CG equals total moment divided by total weight", ["divide", "total moment", "total weight"]],
      ["Aft CG makes the airplane less stable", ["less stable", "unstable"]],
      ["Stall and spin recovery get harder", ["stall", "spin", "recover"]],
    ],
    explanation:
      "Multiply each weight by its arm to get its moment, add up the weights and moments, then divide total moment by total weight to find the CG, and check it against the envelope. An aft CG makes the airplane less stable in pitch and more sensitive, and makes stall and spin recovery harder or, beyond the aft limit, possibly impossible.",
    reference: "Weight & Balance Handbook (FAA-H-8083-1B); PHAK Ch. 10",
  }),
  oral({
    id: "ppl-oral-057",
    taskId: "ppl-I-F",
    topic: "performance",
    difficulty: 1,
    prompt: "What happens when an airplane is overloaded?",
    keyPoints: [
      ["Higher takeoff speed and longer takeoff run", ["takeoff", "longer", "higher speed"]],
      ["Reduced climb rate and ceiling", ["climb", "ceiling"]],
      ["Higher stall speed", ["stall"]],
      ["Excess stress on the structure", ["structur", "stress", "load"]],
    ],
    explanation:
      "An overloaded airplane needs a higher takeoff speed and a longer takeoff run, climbs slower, has a lower ceiling, shorter range, higher stall speed and longer landing roll. It also puts excess stress on the structure, which can lead to failure in turbulence or maneuvering.",
    reference: "PHAK Ch. 10",
  }),
  oral({
    id: "ppl-oral-058",
    taskId: "ppl-I-F",
    topic: "performance",
    difficulty: 2,
    prompt: "How does wind affect takeoff and landing distances, and how do you figure a crosswind component?",
    keyPoints: [
      ["Headwind shortens distances; tailwind lengthens them", ["headwind", "tailwind"]],
      ["Crosswind equals wind speed times the sine of the angle", ["sine", "sin "]],
      ["Rules of thumb: 30 degrees is half, 45 about 70 percent, 60 about 90 percent", ["half", "70", "90", "percent", "chart"]],
      ["Compare with the maximum demonstrated crosswind", ["demonstrated", "maximum crosswind", "max crosswind"]],
    ],
    explanation:
      "A headwind reduces groundspeed and shortens takeoff and landing distances, and a tailwind lengthens them a lot. The crosswind component is the wind speed times the sine of the angle between the wind and the runway: about half at 30 degrees, 70 percent at 45 and 90 percent at 60. Compare it with your skill and the POH's maximum demonstrated crosswind.",
    reference: "PHAK Ch. 11; FAA-CT-8080-2H Figure 36",
  }),
  oral({
    id: "ppl-oral-059",
    taskId: "ppl-I-F",
    topic: "performance",
    difficulty: 2,
    prompt: "What is ground effect, and how can it fool you on takeoff?",
    keyPoints: [
      ["Within about one wingspan of the surface", ["wingspan", "wing span"]],
      ["Reduces induced drag", ["induced drag", "drag"]],
      ["The airplane may lift off before it can climb", ["lift off", "before", "too slow", "premature", "early"]],
      ["It may sink back once out of ground effect", ["climb", "settle", "sink"]],
    ],
    explanation:
      "Within about one wingspan of the ground, the surface interferes with wingtip vortices and downwash, reducing induced drag. That can let an overloaded airplane, or one in high density altitude, lift off below its normal climb speed, then settle back or fail to climb once it leaves ground effect. On landing, it causes floating.",
    reference: "PHAK Ch. 5",
  }),
  oral({
    id: "ppl-oral-060",
    taskId: "ppl-I-F",
    topic: "performance",
    difficulty: 2,
    prompt: "What's the difference between VX and VY, and how do they change with altitude?",
    keyPoints: [
      ["VX: best angle, most altitude per distance", ["angle", "distance", "obstacle"]],
      ["VY: best rate, most altitude per time", ["rate", "time", "minute"]],
      ["VX increases and VY decreases with altitude", ["increase", "decrease"]],
      ["They meet at the absolute ceiling", ["absolute ceiling", "meet", "converge", "same"]],
    ],
    explanation:
      "VX, best angle of climb, gives the most altitude for the distance covered, for clearing obstacles. VY, best rate of climb, gives the most altitude per unit of time. As altitude increases, VX increases and VY decreases until they're equal at the airplane's absolute ceiling.",
    reference: "PHAK Ch. 11",
  }),
  oral({
    id: "ppl-oral-061",
    taskId: "ppl-I-F",
    topic: "performance",
    difficulty: 1,
    prompt: "Which V-speeds are marked on the airspeed indicator, and which important ones aren't?",
    keyPoints: [
      ["Stall speeds: bottom of the white and green arcs", ["vs0", "vso", "vs1", "stall"]],
      ["Maximum flap speed and maximum structural cruising speed: top of the white and green arcs", ["vfe", "flap", "vno", "structural cruising"]],
      ["Never-exceed speed: red line", ["vne", "never exceed", "red line", "redline"]],
      ["Not marked: maneuvering speed, VX, VY and best glide", ["maneuvering", "vx", "vy", "glide"]],
    ],
    explanation:
      "The bottom of the white arc is VS0, stall in landing configuration, and the top is VFE, maximum flap extended speed. The bottom of the green arc is VS1, clean stall speed, and the top is VNO, maximum structural cruising speed. The yellow arc is smooth air only, and the red line is VNE. Maneuvering speed, VX, VY and best glide aren't marked, so you need to know them from the POH.",
    reference: "PHAK Ch. 8",
  }),
  oral({
    id: "ppl-oral-062",
    taskId: "ppl-I-F",
    topic: "aerodynamics",
    difficulty: 3,
    prompt: "Why does maneuvering speed decrease as the airplane gets lighter?",
    keyPoints: [
      ["Below maneuvering speed, the wing stalls before it can be overstressed", ["stall before", "stalls before", "overstress", "load limit"]],
      ["A lighter airplane flies at a lower angle of attack at a given speed", ["lower angle", "angle of attack", "aoa"]],
      ["More margin to the critical angle, so a gust can create a higher load before stalling", ["margin", "gust", "more load", "higher load"]],
    ],
    explanation:
      "At maneuvering speed or below, an abrupt full control input or gust will stall the wing before it can exceed the load limit. A lighter airplane flies at a lower angle of attack at the same speed, so it has more margin before the critical angle. A gust can therefore produce more G before the wing stalls, and the speed that keeps you safe has to be lower.",
    reference: "PHAK Ch. 5",
  }),

  // ── I.G Operation of Systems ────────────────────────────────
  oral({
    id: "ppl-oral-063",
    taskId: "ppl-I-G",
    topic: "aerodynamics",
    difficulty: 2,
    prompt: "Explain the left-turning tendencies of a single-engine propeller airplane.",
    keyPoints: [
      ["Torque", ["torque"]],
      ["P-factor", ["p-factor", "p factor", "asymmetric"]],
      ["Spiraling slipstream", ["slipstream", "spiral"]],
      ["Gyroscopic precession", ["gyroscopic", "precession"]],
    ],
    explanation:
      "There are four. Torque: the airplane tends to roll opposite the clockwise propeller. P-factor: at high angles of attack the descending right-side blade makes more thrust. Spiraling slipstream: the prop wash hits the left side of the vertical tail. Gyroscopic precession: when the propeller disk is tilted, the force acts 90 degrees later. All four are strongest at high power and low airspeed, and right rudder corrects them.",
    reference: "PHAK Ch. 5",
  }),
  oral({
    id: "ppl-oral-064",
    taskId: "ppl-I-G",
    topic: "systems",
    difficulty: 1,
    prompt: "Explain how the magnetos work and why there are two.",
    keyPoints: [
      ["Self-contained, driven by the engine", ["engine", "self", "independent", "own"]],
      ["Don't need the battery or alternator", ["electrical", "battery", "alternator", "master"]],
      ["Two for redundancy and more efficient combustion", ["redundan", "backup", "back up", "efficien", "combustion"]],
      ["Two spark plugs per cylinder", ["two spark", "spark plug", "per cylinder"]],
    ],
    explanation:
      "Magnetos are self-contained generators driven by the engine that produce high-voltage sparks, so they don't need the battery or alternator; the engine keeps running with the master off. There are two, each firing one of the two spark plugs in every cylinder, which gives redundancy and a more complete, efficient burn.",
    reference: "PHAK Ch. 7",
  }),
  oral({
    id: "ppl-oral-065",
    taskId: "ppl-I-G",
    topic: "systems",
    difficulty: 1,
    prompt: "What are the signs of carburetor ice, and what do you do about it?",
    keyPoints: [
      ["Drop in RPM, or manifold pressure with a constant-speed prop", ["rpm", "manifold"]],
      ["Rough running", ["rough"]],
      ["Apply full carburetor heat", ["carburetor heat", "carb heat"]],
      ["RPM drops further at first, then rises as the ice melts", ["drop", "then rise", "increase", "melt", "goes up"]],
      ["Possible from about 20 to 70 degrees Fahrenheit in humid air", ["humid", "moisture", "70", "twenty", "seventy"]],
    ],
    explanation:
      "With a fixed-pitch propeller the first sign is a drop in RPM, followed by rough running; with a constant-speed propeller it's a drop in manifold pressure. Apply full carburetor heat. The RPM will drop further at first and then rise as the ice melts. Carb ice can form from about 20 to 70 degrees Fahrenheit with high humidity, especially at low power.",
    reference: "PHAK Ch. 7",
  }),
  oral({
    id: "ppl-oral-066",
    taskId: "ppl-I-G",
    topic: "systems",
    difficulty: 2,
    prompt: "Describe the fuel system in the airplane you fly, from the tanks to the engine.",
    keyPoints: [
      ["Tanks and vents", ["tank", "vent"]],
      ["Fuel selector valve", ["selector"]],
      ["Strainer and sump drains", ["strainer", "sump", "drain"]],
      ["Gravity feed or fuel pumps", ["gravity", "pump"]],
      ["Carburetor or fuel injection", ["carburetor", "injection"]],
    ],
    explanation:
      "In a typical high-wing trainer, fuel flows by gravity from vented wing tanks to a fuel selector, through a fuel strainer with a sump drain, and to the carburetor, with a primer for starting. Low-wing airplanes use an engine-driven pump with an electric boost pump as backup. Know your own airplane's diagram from the POH, including tank capacity and unusable fuel.",
    reference: "PHAK Ch. 7; your POH Section 7",
  }),
  oral({
    id: "ppl-oral-067",
    taskId: "ppl-I-G",
    topic: "systems",
    difficulty: 1,
    prompt: "What fuel does your airplane use, and what would you do if that grade isn't available?",
    keyPoints: [
      ["100LL, dyed blue", ["100ll", "100 low lead", "blue"]],
      ["Never use a lower grade", ["lower grade", "never"]],
      ["A higher grade only as a temporary substitute", ["higher grade", "higher octane", "temporar"]],
      ["Check samples for water and contaminants", ["sump", "water", "contamin"]],
    ],
    explanation:
      "Most training airplanes use 100LL avgas, which is dyed blue. Never use a lower grade than the POH specifies, because it can cause detonation. If the right grade isn't available, a higher grade is the only acceptable substitute, and only temporarily. Always sample the fuel for the right color and for water or debris.",
    reference: "PHAK Ch. 7",
  }),
  oral({
    id: "ppl-oral-068",
    taskId: "ppl-I-G",
    topic: "systems",
    difficulty: 2,
    prompt: "What is detonation, and how do you prevent it or stop it?",
    keyPoints: [
      ["Uncontrolled, explosive combustion", ["explo", "uncontrolled"]],
      ["Caused by low-grade fuel, a lean mixture or high temperatures", ["lean", "grade", "temperature", "hot"]],
      ["Enrich the mixture, reduce power, lower the nose to cool", ["enrich", "richen", "reduce power", "lower the nose", "cowl"]],
    ],
    explanation:
      "Detonation is the fuel-air charge exploding instead of burning smoothly, which can damage pistons and cylinders. It's caused by fuel of a lower grade than required, an overly lean mixture, high power at low airspeed and high engine temperatures. To stop it, enrich the mixture, reduce power, lower the nose to increase cooling airflow, and open cowl flaps if equipped.",
    reference: "PHAK Ch. 7",
  }),
  oral({
    id: "ppl-oral-069",
    taskId: "ppl-I-G",
    topic: "systems",
    difficulty: 2,
    prompt: "Explain the airplane's electrical system, and what you'd do if the alternator failed.",
    keyPoints: [
      ["The alternator powers equipment and charges the battery", ["alternator"]],
      ["The ammeter or low-voltage light shows the failure", ["ammeter", "discharge", "voltage", "low volt"]],
      ["Turn off nonessential equipment", ["load", "turn off", "nonessential", "non-essential", "shed"]],
      ["Land as soon as practical", ["land"]],
      ["The engine keeps running on the magnetos", ["magneto", "engine will keep", "engine keeps", "engine still"]],
    ],
    explanation:
      "An engine-driven alternator powers the electrical equipment and charges the battery, which is used for starting and as a backup. If the ammeter shows a discharge or the low-voltage light comes on, check the circuit breakers and alternator switch, then reduce electrical load to stretch the battery and land as soon as practical. The engine keeps running because the magnetos don't need the electrical system.",
    reference: "PHAK Ch. 7",
  }),
  oral({
    id: "ppl-oral-070",
    taskId: "ppl-I-G",
    topic: "systems",
    difficulty: 2,
    prompt: "Which instruments use the pitot-static system, and what happens if the static port is blocked?",
    keyPoints: [
      ["Airspeed indicator, altimeter and vertical speed indicator", ["airspeed", "altimeter", "vertical speed", "vsi"]],
      ["The altimeter freezes", ["freez", "stuck", "constant", "doesn't change"]],
      ["The VSI reads zero", ["zero"]],
      ["Use the alternate static source", ["alternate static", "break", "glass"]],
    ],
    explanation:
      "The airspeed indicator uses pitot and static pressure, and the altimeter and VSI use static pressure only. With a blocked static port, the altimeter freezes at the altitude where it blocked, the VSI reads zero, and the airspeed indicator reads wrong: low in a climb, high in a descent. Switch to the alternate static source if you have one.",
    reference: "PHAK Ch. 8",
  }),
  oral({
    id: "ppl-oral-071",
    taskId: "ppl-I-G",
    topic: "systems",
    difficulty: 2,
    prompt: "Your attitude and heading indicators start to drift. What's probably happening, and what do you do?",
    keyPoints: [
      ["Vacuum system failure", ["vacuum", "suction"]],
      ["Confirm on the suction gauge", ["suction gauge", "gauge"]],
      ["Use the turn coordinator, compass and outside references", ["turn coordinator", "compass", "outside"]],
      ["Cover the failed instruments", ["cover"]],
    ],
    explanation:
      "The attitude and heading indicators are usually vacuum-driven, so drifting together points to a vacuum pump failure; confirm it on the suction gauge. Cover the failed instruments so they don't mislead you, and fly by outside references, the electric turn coordinator and the magnetic compass. Land at the nearest suitable airport if weather is a concern.",
    reference: "PHAK Ch. 8",
  }),
  oral({
    id: "ppl-oral-072",
    taskId: "ppl-I-G",
    topic: "systems",
    difficulty: 2,
    prompt: "Explain the errors of the magnetic compass.",
    keyPoints: [
      ["Variation and deviation", ["variation", "deviation"]],
      ["Northerly turning error from magnetic dip", ["northerly", "turning error", "dip", "undershoot"]],
      ["Acceleration error: accelerate north, decelerate south", ["accelerat", "ands"]],
      ["Accurate only in straight, level, unaccelerated flight", ["straight", "level", "unaccelerated"]],
    ],
    explanation:
      "Variation is the angle between true and magnetic north, and deviation is error from the airplane's own magnetic fields. Magnetic dip causes northerly turning error: turning from north the compass lags, and turning from south it leads, so undershoot north and overshoot south. Acceleration error on east or west headings shows a turn north when accelerating and south when decelerating. The compass is only reliable in straight, level, unaccelerated flight.",
    reference: "PHAK Ch. 8",
  }),
  oral({
    id: "ppl-oral-073",
    taskId: "ppl-I-G",
    topic: "systems",
    difficulty: 2,
    prompt: "Name the different types of altitude. Which one determines airplane performance?",
    keyPoints: [
      ["Indicated altitude", ["indicated"]],
      ["True altitude (MSL) and absolute altitude (AGL)", ["true", "absolute", "agl", "msl"]],
      ["Pressure altitude: 29.92 set", ["pressure", "29.92"]],
      ["Density altitude determines performance", ["density"]],
    ],
    explanation:
      "Indicated altitude is what the altimeter shows with the local setting. True altitude is height above mean sea level and absolute altitude is height above the ground. Pressure altitude is what you read with 29.92 set. Density altitude, pressure altitude corrected for temperature, is what determines performance.",
    reference: "PHAK Ch. 8",
  }),
  oral({
    id: "ppl-oral-074",
    taskId: "ppl-I-G",
    topic: "systems",
    difficulty: 1,
    prompt: "What happens to your altimeter if you fly from an area of high pressure into low pressure without resetting it?",
    keyPoints: [
      ["The altimeter reads higher than your true altitude", ["higher", "reads high"]],
      ["You're lower than you think", ["lower than"]],
      ["High to low, look out below", ["look out below"]],
      ["The same happens flying into colder air", ["cold", "temperature"]],
    ],
    explanation:
      "The altimeter will read higher than your actual altitude, so you'll be lower than you think. The saying is \"high to low, look out below.\" Flying from warm air into colder air has the same effect. Update the altimeter setting from nearby stations as you go.",
    reference: "PHAK Ch. 8",
  }),

  // ── I.H Human Factors ───────────────────────────────────────
  oral({
    id: "ppl-oral-075",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 1,
    prompt: "What is hypoxia? Name the types and some symptoms.",
    keyPoints: [
      ["Not enough oxygen reaching the body's tissues", ["oxygen"]],
      ["Hypoxic, hypemic, stagnant and histotoxic", ["hypoxic", "hypemic", "stagnant", "histotoxic"]],
      ["Euphoria, headache, impaired judgment, cyanosis", ["euphori", "headache", "judgment", "blue", "cyanosis", "tingl"]],
      ["Treat with supplemental oxygen and descent", ["descend", "supplemental", "descent"]],
    ],
    explanation:
      "Hypoxia is a lack of enough oxygen in the body. Hypoxic hypoxia comes from low oxygen pressure at altitude, hypemic from blood that can't carry oxygen, as with carbon monoxide, stagnant from poor circulation, and histotoxic from cells that can't use oxygen, as with alcohol. Symptoms include euphoria, headache, impaired judgment, tingling and blue lips or fingernails. Use supplemental oxygen and descend.",
    reference: "AIM 8-1-2; PHAK Ch. 17",
  }),
  oral({
    id: "ppl-oral-076",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 1,
    prompt: "When is supplemental oxygen required?",
    keyPoints: [
      ["Above 12,500 up to 14,000 feet: crew after 30 minutes", ["12,500", "12500", "twelve thousand five hundred", "30 minutes", "thirty minutes"]],
      ["Above 14,000 feet: crew at all times", ["14,000", "14000", "fourteen thousand"]],
      ["Above 15,000 feet: provided to every occupant", ["15,000", "15000", "fifteen thousand", "passenger", "occupant"]],
    ],
    explanation:
      "At cabin altitudes above 12,500 feet up to and including 14,000 feet, the required crew must use oxygen for any time over 30 minutes. Above 14,000 feet, the required crew must use it the entire time. Above 15,000 feet, every occupant must be provided with oxygen.",
    reference: "14 CFR 91.211",
  }),
  oral({
    id: "ppl-oral-077",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 2,
    prompt: "What is spatial disorientation, and how do you prevent it?",
    keyPoints: [
      ["The inner ear gives false sensations", ["inner ear", "vestibular", "semicircular"]],
      ["Happens without visual references, such as in clouds or at night", ["cloud", "night", "visual reference", "horizon"]],
      ["Trust the instruments", ["instrument", "trust"]],
      ["Examples: the leans, graveyard spiral, Coriolis illusion", ["leans", "graveyard", "coriolis"]],
    ],
    explanation:
      "Spatial disorientation is losing track of your attitude because the inner ear sends false signals when you can't see the horizon, such as in clouds, haze or at night. Examples are the leans, the graveyard spiral and the Coriolis illusion. Prevent it by avoiding flight without visual references, and if you lose them, trust the flight instruments over your sensations.",
    reference: "AIM 8-1-5; PHAK Ch. 17",
  }),
  oral({
    id: "ppl-oral-078",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 2,
    prompt: "Name some visual illusions on approach and how they can affect your landing.",
    keyPoints: [
      ["Narrow runway: you feel high and fly low", ["narrow"]],
      ["Upsloping runway: you feel high and fly low", ["upslop", "slope"]],
      ["Featureless terrain or a black hole: you feel high and fly low", ["featureless", "black hole", "dark", "water"]],
      ["Haze or rain: misjudging distance and height", ["haze", "rain"]],
      ["Use a VASI or PAPI and a stabilized approach", ["vasi", "papi", "glide"]],
    ],
    explanation:
      "A narrower-than-usual runway or an upsloping runway makes you feel too high, so you tend to fly a low approach; wider or downsloping runways do the opposite. Featureless terrain, dark water at night, rain on the windscreen and haze all create the impression of being higher or farther than you are, again leading to low approaches. Use the visual glide slope lights and fly a stabilized approach.",
    reference: "AIM 8-1-5",
  }),
  oral({
    id: "ppl-oral-079",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 1,
    prompt: "What is the IMSAFE checklist?",
    keyPoints: [
      ["Illness", ["illness", "sick"]],
      ["Medication", ["medication", "medicine"]],
      ["Stress", ["stress"]],
      ["Alcohol", ["alcohol"]],
      ["Fatigue", ["fatigue", "tired", "rest"]],
      ["Emotion or eating", ["emotion", "eating"]],
    ],
    explanation:
      "IMSAFE is a personal fitness check before every flight: Illness, Medication, Stress, Alcohol, Fatigue, and Emotion, which some versions replace with Eating. If any item is a concern, you shouldn't fly.",
    reference: "PHAK Ch. 2; Risk Management Handbook (FAA-H-8083-2A)",
  }),
  oral({
    id: "ppl-oral-080",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 1,
    prompt: "Name the five hazardous attitudes and their antidotes.",
    keyPoints: [
      ["Anti-authority: follow the rules", ["anti-authority", "anti authority"]],
      ["Impulsivity: not so fast, think first", ["impuls"]],
      ["Invulnerability: it could happen to me", ["invulnerab"]],
      ["Macho: taking chances is foolish", ["macho"]],
      ["Resignation: I'm not helpless", ["resignation"]],
    ],
    explanation:
      "Anti-authority, \"don't tell me,\" with the antidote \"follow the rules, they are usually right.\" Impulsivity, \"do it quickly,\" countered by \"not so fast, think first.\" Invulnerability, \"it won't happen to me,\" countered by \"it could happen to me.\" Macho, \"I can do it,\" countered by \"taking chances is foolish.\" Resignation, \"what's the use,\" countered by \"I'm not helpless, I can make a difference.\"",
    reference: "PHAK Ch. 2",
  }),
  oral({
    id: "ppl-oral-081",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 1,
    prompt: "What is the PAVE checklist, and how do you use it?",
    keyPoints: [
      ["Pilot", ["pilot"]],
      ["Aircraft", ["aircraft", "airplane"]],
      ["Environment", ["environment", "weather"]],
      ["External pressures", ["external"]],
    ],
    explanation:
      "PAVE is a way to identify risk before a flight: the Pilot, including IMSAFE and currency; the Aircraft, its airworthiness and performance; the enVironment, meaning weather, terrain, airspace and lighting; and External pressures, like schedules or passengers. External pressures are the most likely to push you into a bad decision.",
    reference: "Risk Management Handbook (FAA-H-8083-2A); PHAK Ch. 2",
  }),
  oral({
    id: "ppl-oral-082",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 2,
    prompt: "You went scuba diving this morning. When can you fly?",
    keyPoints: [
      ["12 hours after dives without decompression stops, up to 8,000 feet", ["12", "twelve"]],
      ["24 hours after dives that needed decompression stops", ["24", "twenty-four", "twenty four"]],
      ["24 hours before any flight above 8,000 feet", ["8,000", "8000", "eight thousand"]],
      ["The risk is decompression sickness", ["decompression", "bends", "nitrogen"]],
    ],
    explanation:
      "The AIM recommends waiting at least 12 hours after a dive that didn't require decompression stops before flying up to 8,000 feet, and at least 24 hours after a dive that did. For flights above 8,000 feet, wait at least 24 hours after any dive. The danger is decompression sickness from nitrogen absorbed while diving.",
    reference: "AIM 8-1-2",
  }),
  oral({
    id: "ppl-oral-083",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 1,
    prompt: "How can carbon monoxide get into the cabin, and what would you do if you suspected it?",
    keyPoints: [
      ["Exhaust leaking through the cabin heater", ["exhaust", "heater", "heat", "muffler"]],
      ["Symptoms: headache, drowsiness, dizziness", ["headache", "drows", "dizz", "sleep"]],
      ["Turn off the heat and open fresh air vents", ["heat off", "turn off", "fresh air", "vent", "window"]],
      ["Use oxygen if available and land as soon as possible", ["oxygen", "land"]],
    ],
    explanation:
      "Most light airplanes heat the cabin with air passed over the exhaust muffler, so a crack can leak carbon monoxide into the cabin. It's odorless and causes headache, drowsiness, dizziness and loss of muscle power. Shut off the cabin heat, open the fresh air vents, use oxygen if you have it, and land as soon as possible.",
    reference: "AIM 8-1-4; PHAK Ch. 17",
  }),
  oral({
    id: "ppl-oral-084",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 1,
    prompt: "How do you scan for traffic, and how can you tell if another aircraft is on a collision course?",
    keyPoints: [
      ["Short eye movements across 10-degree sectors", ["10 degree", "ten degree", "sector", "segment", "block"]],
      ["About one second per sector", ["second"]],
      ["No relative motion means a collision course", ["relative motion", "not moving", "stationary", "doesn't move", "does not move"]],
      ["It keeps getting bigger", ["bigger", "larger", "grow"]],
    ],
    explanation:
      "Use a series of short, regularly spaced eye movements, bringing successive areas of the sky into view in sectors no wider than about 10 degrees, and look at each for about a second. An aircraft that stays in the same spot on your windscreen, with no apparent relative motion, while growing larger is on a collision course.",
    reference: "AIM 8-1-6",
  }),
  oral({
    id: "ppl-oral-085",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 1,
    prompt: "What is hyperventilation, and how do you treat it?",
    keyPoints: [
      ["Breathing too fast or too deep", ["fast", "rapid", "deep"]],
      ["Too much carbon dioxide is lost", ["carbon dioxide", "co2"]],
      ["Symptoms like hypoxia: dizziness and tingling", ["dizz", "tingl", "light-headed", "lightheaded"]],
      ["Slow your breathing, talk, or breathe into a bag", ["slow", "talk", "bag"]],
    ],
    explanation:
      "Hyperventilation is breathing too fast or too deeply, often from stress or anxiety, which lowers the carbon dioxide in your blood. Symptoms such as dizziness, tingling and muscle spasms feel a lot like hypoxia. Consciously slow your breathing, talk out loud, or breathe into a bag. If you're unsure whether it's hypoxia, use oxygen.",
    reference: "AIM 8-1-3; PHAK Ch. 17",
  }),
  oral({
    id: "ppl-oral-086",
    taskId: "ppl-I-H",
    topic: "aeromedical",
    difficulty: 2,
    prompt: "How can medications affect your ability to fly?",
    keyPoints: [
      ["Many over-the-counter drugs cause drowsiness", ["drows", "antihistamine", "sleep", "over-the-counter", "over the counter", "cold medicine"]],
      ["No flying on drugs that affect your faculties", ["91.17", "faculties", "impair"]],
      ["Ask an aviation medical examiner", ["ame", "aviation medical examiner", "doctor"]],
      ["The condition being treated may itself be disqualifying", ["condition", "illness", "underlying"]],
    ],
    explanation:
      "Many prescription and over-the-counter medicines, especially antihistamines, cold remedies and sleep aids, cause drowsiness or slowed reactions. You may not fly while using any drug that affects your faculties contrary to safety, and the condition you're treating may be disqualifying on its own. When in doubt, ask an aviation medical examiner, and remember that sedating antihistamines can affect you for well over a day.",
    reference: "14 CFR 91.17, 61.53; AIM 8-1-1",
  }),

  // ── II Preflight Procedures ─────────────────────────────────
  oral({
    id: "ppl-oral-087",
    taskId: "ppl-II-D",
    topic: "airport-ops",
    difficulty: 2,
    prompt: "How do you position the flight controls while taxiing in a strong quartering headwind, and in a quartering tailwind?",
    keyPoints: [
      ["Headwind: aileron up on the upwind side, turned toward the wind", ["into the wind", "upwind", "toward the wind"]],
      ["Headwind: elevator neutral", ["neutral"]],
      ["Tailwind: aileron down on the upwind side, turned away from the wind", ["away from the wind", "dive away", "aileron down"]],
      ["Tailwind: elevator down", ["elevator down", "forward", "nose down"]],
    ],
    explanation:
      "Climb into a headwind, dive away from a tailwind. In a quartering headwind, turn the yoke toward the wind so the upwind aileron is up, with the elevator neutral in a tricycle-gear airplane. In a quartering tailwind, turn the yoke away from the wind so the upwind aileron is down, and hold the elevator down by pushing forward.",
    reference: "Airplane Flying Handbook (taxiing)",
  }),
  oral({
    id: "ppl-oral-088",
    taskId: "ppl-II-D",
    topic: "airport-ops",
    difficulty: 1,
    prompt: "What is a hot spot, and how do you avoid a runway incursion?",
    keyPoints: [
      ["A spot with a history or risk of collisions or incursions", ["hot spot", "hotspot", "confusing", "history"]],
      ["Shown on airport diagrams and in the Chart Supplement", ["diagram", "chart supplement"]],
      ["Read back all hold-short instructions", ["read back", "readback", "hold short"]],
      ["Never cross a hold line without a clearance; keep your head up", ["clearance", "heads up", "head up", "sterile", "stop"]],
    ],
    explanation:
      "A hot spot is a place on an airport with a history or potential risk of collisions or runway incursions, often a confusing intersection. They're circled on airport diagrams and described in the Chart Supplement. Review the taxi route before moving, write down and read back hold-short instructions, keep your head up and the cockpit sterile, and never cross a hold line without a clearance. If unsure, stop and ask.",
    reference: "AIM 2-3; FAA airport diagrams",
  }),

  // ── III Airport Operations ──────────────────────────────────
  oral({
    id: "ppl-oral-089",
    taskId: "ppl-III-A",
    topic: "airport-ops",
    difficulty: 1,
    prompt: "What does a flashing green light from the tower mean on the ground, and what does steady red mean in the air?",
    keyPoints: [
      ["Flashing green on the ground: cleared to taxi", ["taxi"]],
      ["Steady red in the air: give way and continue circling", ["give way", "circl"]],
      ["Acknowledge by rocking wings in daytime or flashing lights at night", ["rock", "wings", "flash"]],
    ],
    explanation:
      "On the ground, flashing green means cleared to taxi. In the air, steady red means give way to other aircraft and continue circling. Acknowledge light signals in flight by rocking your wings in daytime or flashing your landing or navigation lights at night.",
    reference: "AIM 4-3-13",
  }),
  oral({
    id: "ppl-oral-090",
    taskId: "ppl-III-A",
    topic: "airport-ops",
    difficulty: 1,
    prompt: "Your radio fails as you approach a towered airport. What do you do?",
    keyPoints: [
      ["Squawk 7600", ["7600", "seventy six hundred", "seventy-six hundred", "76 hundred"]],
      ["Stay outside or above the airspace and figure out the traffic flow", ["outside", "above", "traffic flow", "pattern"]],
      ["Watch for light gun signals", ["light gun", "light signal", "signals", "tower light"]],
      ["Acknowledge by rocking the wings or flashing lights", ["rock", "flash"]],
    ],
    explanation:
      "Squawk 7600, check your radio settings, and keep listening in case only the transmitter failed. Stay outside or above the Class D until you can determine the direction and flow of traffic, then join the pattern and watch the tower for light gun signals. Acknowledge by rocking your wings in daytime or flashing your lights at night.",
    reference: "AIM 4-2-13, 4-3-13",
  }),
  oral({
    id: "ppl-oral-091",
    taskId: "ppl-III-A",
    topic: "airport-ops",
    difficulty: 1,
    prompt: "Describe the runway hold-short markings and the sign you'd see beside them.",
    keyPoints: [
      ["Four yellow lines: two solid and two dashed", ["two solid", "solid", "dashed", "four"]],
      ["Hold on the solid side", ["solid side", "solid-line side", "solid line side"]],
      ["A red sign with white runway numbers", ["red", "white"]],
      ["Mandatory: you need a clearance to cross", ["mandatory", "clearance", "cleared"]],
    ],
    explanation:
      "The runway holding position marking is four yellow lines across the taxiway, two solid and two dashed. You hold on the solid-line side; the dashed side faces the runway. Beside it is a mandatory runway holding position sign, red with white runway numbers, and you need a clearance to cross at a towered airport.",
    reference: "AIM 2-3-5, 2-3-8",
  }),
  oral({
    id: "ppl-oral-092",
    taskId: "ppl-III-A",
    topic: "airport-ops",
    difficulty: 1,
    prompt: "What do VASI and PAPI lights tell you?",
    keyPoints: [
      ["VASI: red over white means on the glidepath", ["red over white"]],
      ["White over white is high, red over red is low", ["white over white", "red over red", "high", "low"]],
      ["PAPI: two white and two red means on the glidepath", ["two white", "two red", "papi"]],
      ["Obstacle clearance within 10 degrees of centerline out to 4 miles", ["10", "ten", "4 nautical", "four nautical", "4 miles", "four miles", "obstacle"]],
    ],
    explanation:
      "They show whether you're on the glidepath. On a two-bar VASI, red over white is on the glidepath, white over white is high, and red over red is low. On a PAPI, two white and two red lights mean on glidepath; more white is high and more red is low. A VASI gives obstruction clearance within 10 degrees of the extended centerline out to 4 nautical miles.",
    reference: "AIM 2-1-2",
  }),
  oral({
    id: "ppl-oral-093",
    taskId: "ppl-III-A",
    topic: "airport-ops",
    difficulty: 1,
    prompt: "How do you turn on pilot-controlled runway lighting?",
    keyPoints: [
      ["Key the microphone on the CTAF or listed frequency", ["key", "click", "microphone", "mic"]],
      ["Seven clicks for high, five for medium, three for low", ["seven", "five", "three"]],
      ["Within 5 seconds", ["five seconds", "5 seconds"]],
      ["Lights usually stay on for 15 minutes", ["15 minutes", "fifteen"]],
    ],
    explanation:
      "Key the microphone on the CTAF or the frequency listed in the Chart Supplement: seven times within five seconds for high intensity, five for medium and three for low. The lights usually stay on for 15 minutes, so key it again on final to reset the timer.",
    reference: "AIM 2-1-9",
  }),
  oral({
    id: "ppl-oral-094",
    taskId: "ppl-III-B",
    topic: "airport-ops",
    difficulty: 1,
    prompt: "How do you enter the traffic pattern at a non-towered airport?",
    keyPoints: [
      ["A 45-degree entry to the downwind leg at midfield", ["45", "forty-five", "forty five", "midfield"]],
      ["At pattern altitude, usually 1,000 feet above the airport", ["1,000", "1000", "thousand", "pattern altitude"]],
      ["Left turns unless marked otherwise", ["left"]],
      ["Announce your position on the CTAF", ["ctaf", "announce", "radio", "position report", "self-announce"]],
    ],
    explanation:
      "Listen to the AWOS and the CTAF, determine the active runway, and announce your position about 10 miles out. The preferred entry is a 45-degree entry to the downwind leg at midfield, at pattern altitude, usually 1,000 feet above the airport. Turns are to the left unless the Chart Supplement or markings show right traffic.",
    reference: "AC 90-66C; AIM 4-3-3; 14 CFR 91.126",
  }),
  oral({
    id: "ppl-oral-095",
    taskId: "ppl-IV-B",
    topic: "airport-ops",
    difficulty: 2,
    prompt: "How do you avoid wake turbulence when landing behind a larger airplane?",
    keyPoints: [
      ["Stay at or above its glidepath", ["above", "glide path", "glidepath"]],
      ["Land beyond its touchdown point", ["beyond", "touchdown", "past"]],
      ["Vortices sink and drift with the wind", ["sink", "descend", "drift"]],
      ["A light quartering tailwind is the worst", ["quartering tailwind", "tailwind"]],
    ],
    explanation:
      "Wingtip vortices sink below the generating aircraft's flight path and drift with the wind. Stay at or above the larger airplane's glidepath and land beyond its touchdown point. Be most careful with a light quartering tailwind, which can keep vortices over the runway or move them into the touchdown zone.",
    reference: "AIM 7-4",
  }),

  // ── IV Takeoffs, Landings, and Go-Arounds ───────────────────
  oral({
    id: "ppl-oral-096",
    taskId: "ppl-IV-N",
    topic: "airport-ops",
    difficulty: 2,
    prompt: "When would you go around, and how do you do it?",
    keyPoints: [
      ["Unstable approach, runway obstructed, ATC instruction, or any doubt", ["unstable", "obstruct", "traffic", "doubt", "not stabilized", "atc"]],
      ["Apply full power", ["full power", "power"]],
      ["Pitch for climb and turn off carburetor heat", ["pitch", "vy", "vx", "carb heat", "carburetor heat"]],
      ["Retract flaps in stages once climbing", ["flap", "stages", "incremental", "positive rate"]],
      ["Sidestep to keep traffic in sight", ["side", "offset"]],
    ],
    explanation:
      "Go around whenever the approach isn't stabilized, the runway isn't clear, ATC tells you to, or you have any doubt. Apply full power, carburetor heat off, and pitch for a climb attitude, then retract the flaps in stages per the POH once you have a positive rate of climb. Move to the side of the runway to keep traffic in sight, and announce the go-around.",
    reference: "Airplane Flying Handbook (go-arounds); ACS PA.IV.N",
  }),
  oral({
    id: "ppl-oral-097",
    taskId: "ppl-IV-B",
    topic: "aerodynamics",
    difficulty: 2,
    prompt: "How do you correct for a crosswind on final and at touchdown?",
    keyPoints: [
      ["Crab on final, then wing-low or sideslip for touchdown", ["crab", "wing low", "wing-low", "slip"]],
      ["Lower the upwind wing", ["upwind", "into the wind"]],
      ["Opposite rudder keeps the nose aligned with the runway", ["rudder", "align"]],
      ["Touch down on the upwind main wheel first, adding aileron as you slow", ["upwind main", "upwind wheel", "more aileron"]],
    ],
    explanation:
      "Many pilots crab on final, then transition to the wing-low method: lower the upwind wing into the wind to stop drift, and use opposite rudder to keep the longitudinal axis aligned with the runway. Touch down on the upwind main wheel first, and keep adding aileron into the wind as you slow on the rollout.",
    reference: "Airplane Flying Handbook (crosswind approach and landing)",
  }),
  oral({
    id: "ppl-oral-098",
    taskId: "ppl-IV-M",
    topic: "aerodynamics",
    difficulty: 2,
    prompt: "What is a forward slip, and when would you use it?",
    keyPoints: [
      ["Loses altitude without gaining airspeed", ["altitude", "without gaining", "airspeed"]],
      ["Aileron one way, opposite rudder", ["opposite rudder", "cross control", "cross-control", "aileron"]],
      ["The flight path stays straight while the nose points off to the side", ["track", "flight path", "nose"]],
      ["Check the POH for slip limits with flaps", ["flaps", "poh", "limitation"]],
    ],
    explanation:
      "A forward slip increases drag so you can lose altitude quickly without picking up airspeed, such as when you're too high on final or in an airplane without flaps. Lower one wing with aileron and apply opposite rudder so the airplane keeps tracking toward the runway while the nose points off to the side. Some POHs prohibit or caution against slips with flaps extended.",
    reference: "Airplane Flying Handbook (slips); ACS PA.IV.M",
  }),

  // ── V Performance and Ground Reference Maneuvers ────────────
  oral({
    id: "ppl-oral-099",
    taskId: "ppl-V-A",
    topic: "aerodynamics",
    difficulty: 2,
    prompt: "In a 45-degree steep turn, what happens to load factor and stall speed, and how do you fly it?",
    keyPoints: [
      ["Load factor about 1.4 G", ["1.4", "1.41", "one point four"]],
      ["Stall speed rises about 19 percent", ["19", "nineteen", "stall speed"]],
      ["Add back pressure and power to hold altitude", ["back pressure", "power"]],
      ["Overbanking tendency: hold a little opposite aileron", ["overbank", "opposite aileron"]],
    ],
    explanation:
      "At 45 degrees of bank the load factor is about 1.41 G and stall speed rises about 19 percent. Roll in smoothly, add back pressure and some power to hold altitude, and expect an overbanking tendency that may need a little opposite aileron. Roll out on your entry heading, releasing back pressure as you level the wings.",
    reference: "PHAK Ch. 5; Airplane Flying Handbook (steep turns)",
  }),
  oral({
    id: "ppl-oral-100",
    taskId: "ppl-V-B",
    topic: "aerodynamics",
    difficulty: 2,
    prompt: "During turns around a point, where is your bank steepest, and why?",
    keyPoints: [
      ["Steepest where groundspeed is highest", ["groundspeed", "ground speed", "fastest"]],
      ["That's directly downwind", ["downwind"]],
      ["Shallowest directly upwind", ["upwind", "shallow"]],
      ["To keep a constant radius over the ground", ["radius", "constant distance", "circle"]],
    ],
    explanation:
      "The bank is steepest on the downwind side, where your groundspeed is highest, because you need a higher rate of turn to keep the same radius. It's shallowest directly upwind, where groundspeed is lowest. The goal is a constant radius around the point with the wind drift corrected.",
    reference: "Airplane Flying Handbook (ground reference maneuvers)",
  }),

  // ── VI Navigation ───────────────────────────────────────────
  oral({
    id: "ppl-oral-101",
    taskId: "ppl-VI-B",
    topic: "navigation",
    difficulty: 2,
    prompt: "How do you use a VOR to find which radial you're on?",
    keyPoints: [
      ["Tune and identify the station by Morse code", ["identify", "morse", "ident"]],
      ["Turn the OBS until the needle centers with a FROM flag", ["obs", "center", "from"]],
      ["The number set on the OBS is your radial", ["radial"]],
      ["Your position, not your heading, sets the indication", ["heading", "position"]],
    ],
    explanation:
      "Tune the VOR and confirm the Morse code identifier. Rotate the omni-bearing selector until the course deviation needle centers with a FROM indication; the course set is the radial you're on. The indication depends only on your position relative to the station, not on which way the airplane is pointed.",
    reference: "PHAK Ch. 16",
  }),
  oral({
    id: "ppl-oral-102",
    taskId: "ppl-VI-B",
    topic: "navigation",
    difficulty: 3,
    prompt: "How can you check the accuracy of a VOR receiver?",
    keyPoints: [
      ["VOT test signal: within 4 degrees", ["vot", "test signal"]],
      ["Ground checkpoint within 4, airborne checkpoint within 6", ["checkpoint", "six", "6 degree"]],
      ["Dual VORs within 4 degrees of each other", ["dual", "two receivers", "each other"]],
      ["Required every 30 days for IFR, and logged", ["30", "thirty", "ifr", "log"]],
    ],
    explanation:
      "Using a VOT test signal, the needle should center within plus or minus 4 degrees on 360 from or 180 to. A designated ground checkpoint allows 4 degrees and an airborne checkpoint 6 degrees, and two VOR receivers checked against each other must agree within 4 degrees. It's required every 30 days for IFR, with the date, place, error and a signature recorded.",
    reference: "14 CFR 91.171",
  }),
  oral({
    id: "ppl-oral-103",
    taskId: "ppl-VI-D",
    topic: "navigation",
    difficulty: 1,
    prompt: "You're lost on a VFR cross-country. What do you do?",
    keyPoints: [
      ["Climb for visibility and radio range", ["climb"]],
      ["Communicate with ATC, Flight Service, or on 121.5", ["communicate", "atc", "121.5", "flight service", "radio"]],
      ["Confess that you're lost", ["confess", "admit"]],
      ["Comply with instructions", ["comply"]],
      ["Conserve fuel", ["conserve", "fuel"]],
    ],
    explanation:
      "Use the five Cs: Climb for a better view and radio reception, Communicate with ATC or Flight Service, or use 121.5 if needed, Confess your situation, Comply with their instructions, and Conserve fuel by reducing power. Meanwhile, look for big landmarks and use the VOR or GPS to fix your position.",
    reference: "PHAK Ch. 16; AIM 6-2",
  }),
  oral({
    id: "ppl-oral-104",
    taskId: "ppl-VI-C",
    topic: "navigation",
    difficulty: 2,
    prompt: "Weather is building ahead and you decide to divert. How do you do it?",
    keyPoints: [
      ["Turn toward the alternate right away", ["turn", "immediately", "right away"]],
      ["Estimate heading, distance and time", ["heading", "distance", "time", "estimate"]],
      ["Check fuel", ["fuel"]],
      ["Tell ATC or Flight Service and update your flight plan", ["atc", "flight service", "flight plan", "notify"]],
    ],
    explanation:
      "Make the decision early and turn toward the alternate right away, using a rough heading from the chart or GPS. Then work out the distance, time and fuel needed, refine the heading, and confirm the airport has what you need. Tell ATC or Flight Service, and amend your flight plan if you filed one.",
    reference: "PHAK Ch. 16; ACS PA.VI.C",
  }),
  oral({
    id: "ppl-oral-105",
    taskId: "ppl-VI-B",
    topic: "navigation",
    difficulty: 1,
    prompt: "What is VFR flight following, and how do you get it?",
    keyPoints: [
      ["Radar traffic advisories", ["radar", "traffic advisor", "traffic call"]],
      ["Request it from approach control or center", ["approach", "center"]],
      ["Workload permitting; you still see and avoid", ["workload", "see and avoid"]],
      ["Give your position, altitude and destination", ["position", "destination", "altitude"]],
    ],
    explanation:
      "Flight following is radar traffic advisory service for VFR pilots from approach control or center, provided workload permitting. Call with your call sign, aircraft type, position, altitude and destination; you'll get a squawk code and traffic calls. It doesn't relieve you of seeing and avoiding other aircraft.",
    reference: "AIM 4-1-15",
  }),

  // ── VII Slow Flight and Stalls ──────────────────────────────
  oral({
    id: "ppl-oral-106",
    taskId: "ppl-VII-B",
    topic: "aerodynamics",
    difficulty: 1,
    prompt: "What causes an airplane to stall, and how do you recover?",
    keyPoints: [
      ["Exceeding the critical angle of attack", ["critical angle", "angle of attack", "aoa"]],
      ["Can happen at any airspeed or attitude", ["any airspeed", "any attitude", "any speed"]],
      ["Reduce the angle of attack", ["reduce", "lower the nose", "forward", "decrease"]],
      ["Level the wings and add power", ["level", "power"]],
    ],
    explanation:
      "A stall happens when the wing exceeds its critical angle of attack and the airflow separates, which can happen at any airspeed, attitude or power setting. To recover, reduce the angle of attack with forward elevator pressure, level the wings with coordinated controls, add power as needed, and return to the desired flight path without a secondary stall.",
    reference: "PHAK Ch. 5; Airplane Flying Handbook (stalls)",
  }),
  oral({
    id: "ppl-oral-107",
    taskId: "ppl-VII-D",
    topic: "aerodynamics",
    difficulty: 2,
    prompt: "What is a spin, and how do you recover from one?",
    keyPoints: [
      ["An aggravated stall with autorotation", ["autorotation", "aggravated", "one wing", "both wings"]],
      ["Power to idle", ["power", "idle"]],
      ["Ailerons neutral", ["aileron", "neutral"]],
      ["Full opposite rudder", ["opposite rudder", "rudder"]],
      ["Elevator forward to break the stall", ["elevator", "forward"]],
    ],
    explanation:
      "A spin is an aggravated stall that results in autorotation: both wings are stalled, one more than the other, and the airplane descends in a corkscrew. For most light airplanes, remember PARE: Power to idle, Ailerons neutral, Rudder full opposite the rotation, and Elevator briskly forward. When rotation stops, neutralize the rudder and recover smoothly from the dive. Always follow your POH.",
    reference: "Airplane Flying Handbook (spins); PHAK Ch. 5",
  }),
  oral({
    id: "ppl-oral-108",
    taskId: "ppl-VII-A",
    topic: "aerodynamics",
    difficulty: 2,
    prompt: "What is slow flight, and how does the airplane feel in it?",
    keyPoints: [
      ["Any more angle of attack or less power would trigger a stall warning", ["stall warning", "just above stall"]],
      ["Controls feel mushy", ["mushy", "sluggish", "less effective"]],
      ["More right rudder and power to hold altitude", ["right rudder", "power"]],
      ["Behind the power curve", ["back side", "behind the power curve", "power curve"]],
    ],
    explanation:
      "Slow flight is flying at an airspeed where any increase in angle of attack or load factor, or any reduction in power, would trigger a stall warning. The controls feel mushy, you need more right rudder for the left-turning tendencies, and you're on the back side of the power curve, where flying slower takes more power to hold altitude.",
    reference: "Airplane Flying Handbook (slow flight); ACS PA.VII.A",
  }),
  oral({
    id: "ppl-oral-109",
    taskId: "ppl-VII-B",
    topic: "aerodynamics",
    difficulty: 2,
    prompt: "Why is a stall in the turn from base to final so dangerous?",
    keyPoints: [
      ["A skidding turn with too much rudder", ["skid", "rudder", "uncoordinated"]],
      ["The inside wing stalls first and can enter a spin", ["spin", "inside wing"]],
      ["Too low to recover", ["low altitude", "too low", "altitude"]],
      ["Keep the ball centered and don't tighten the turn with rudder", ["ball", "coordinat", "bank"]],
    ],
    explanation:
      "Pilots who overshoot final often add bottom rudder to tighten the turn without more bank, creating a skid. If they pull back too, the inside wing stalls first and the airplane can roll into a spin at an altitude too low to recover. Keep the turn coordinated with the ball centered, use reasonable bank, and go around rather than force the turn.",
    reference: "Airplane Flying Handbook (stalls and spins)",
  }),

  // ── IX Emergency Operations ─────────────────────────────────
  oral({
    id: "ppl-oral-110",
    taskId: "ppl-IX-B",
    topic: "emergencies",
    difficulty: 1,
    prompt: "Your engine quits at 3,000 feet above the ground. Walk me through what you'd do.",
    keyPoints: [
      ["Establish best glide speed", ["best glide", "glide"]],
      ["Pick a field to land in", ["field", "landing site", "place to land", "landing spot"]],
      ["Restart checklist: fuel, mixture, carburetor heat, magnetos", ["fuel", "mixture", "carb", "magneto", "mags"]],
      ["Declare an emergency: Mayday and 7700", ["mayday", "7700", "declare", "121.5"]],
      ["Secure the engine before touchdown", ["secure", "shut", "master off", "fuel off"]],
    ],
    explanation:
      "Remember ABCDE. Airspeed: pitch for best glide and trim. Best field: pick a landing site within gliding range, preferably into the wind. Checklist: try a restart with fuel selector, mixture rich, carburetor heat on and magnetos. Declare: Mayday on the current frequency or 121.5 and squawk 7700. Execute: if it won't restart, secure the engine, unlatch the doors, and land at the slowest safe speed.",
    reference: "Airplane Flying Handbook (emergency procedures); your POH Section 3",
  }),
  oral({
    id: "ppl-oral-111",
    taskId: "ppl-IX-A",
    topic: "emergencies",
    difficulty: 2,
    prompt: "When would you perform an emergency descent, and how is it done?",
    keyPoints: [
      ["For fire, smoke or a medical emergency", ["fire", "smoke", "medical"]],
      ["Power to idle", ["idle", "power"]],
      ["Bank about 30 to 45 degrees", ["bank", "30", "45", "thirty", "forty-five"]],
      ["Stay within VNE, VFE and VLE", ["vne", "limit", "speed", "never exceed"]],
    ],
    explanation:
      "An emergency descent is for situations like an engine or cabin fire, smoke, a passenger medical emergency or a loss of pressurization. Reduce power to idle, configure as the POH directs, and roll into a bank of about 30 to 45 degrees to keep positive load factor and clear the area below. Stay within VNE and the flap and gear speed limits, and level off with altitude to spare.",
    reference: "Airplane Flying Handbook (emergency descent); ACS PA.IX.A",
  }),
  oral({
    id: "ppl-oral-112",
    taskId: "ppl-IX-C",
    topic: "emergencies",
    difficulty: 2,
    prompt: "You smell burning insulation in flight. What do you do?",
    keyPoints: [
      ["Master switch off", ["master"]],
      ["Avionics and all electrical switches off", ["avionics", "electrical", "switches"]],
      ["Use the extinguisher if needed, then ventilate", ["extinguish", "ventilat", "vent"]],
      ["Land as soon as possible", ["land"]],
    ],
    explanation:
      "That suggests an electrical fire. Turn off the master switch and all electrical and avionics switches, close the vents until the fire is out, use the fire extinguisher if needed, and then ventilate the cabin. Land as soon as possible. If you need a radio, the POH may let you restore essential circuits one at a time to find the faulty one.",
    reference: "Your POH Section 3; Airplane Flying Handbook (emergency procedures)",
  }),
  oral({
    id: "ppl-oral-113",
    taskId: "ppl-IX-B",
    topic: "emergencies",
    difficulty: 2,
    prompt: "Your engine fails right after takeoff at 300 feet. What do you do?",
    keyPoints: [
      ["Lower the nose immediately to hold best glide", ["nose", "glide", "pitch"]],
      ["Land mostly straight ahead", ["straight ahead"]],
      ["Only small turns to avoid obstacles", ["small turn", "avoid", "slight"]],
      ["Don't try to turn back to the runway", ["turn back", "impossible turn", "not turn"]],
    ],
    explanation:
      "Lower the nose immediately to keep flying speed, then land more or less straight ahead, using only small turns to avoid obstacles. At 300 feet there isn't enough altitude to turn back to the runway safely; attempting it often ends in a stall and spin. If time allows, fuel, mixture and ignition off before touchdown.",
    reference: "Airplane Flying Handbook (emergency approach and landing)",
  }),
  oral({
    id: "ppl-oral-114",
    taskId: "ppl-IX-C",
    topic: "emergencies",
    difficulty: 2,
    prompt: "You accidentally fly into a cloud. What do you do?",
    keyPoints: [
      ["Trust the instruments and level the wings", ["instrument", "wings level", "level"]],
      ["Make a gentle 180-degree turn back", ["180", "one eighty", "turn around"]],
      ["Ask ATC for help", ["atc", "help", "declare"]],
      ["Climb if terrain is a concern", ["climb", "terrain"]],
    ],
    explanation:
      "Trust the flight instruments and keep the wings level. Make a gentle, standard-rate or shallower 180-degree turn back the way you came, holding altitude, or climb if terrain is a concern. Ask ATC for help; they can give you headings and altitudes, and declaring an emergency gets you priority.",
    reference: "Airplane Flying Handbook (inadvertent IMC); AIM 6-2",
  }),
  oral({
    id: "ppl-oral-115",
    taskId: "ppl-IX-C",
    topic: "emergencies",
    difficulty: 1,
    prompt: "What do the transponder codes 7500, 7600 and 7700 mean?",
    keyPoints: [
      ["7500: hijacking", ["hijack"]],
      ["7600: lost communications", ["lost comm", "radio failure", "communication"]],
      ["7700: emergency", ["emergency"]],
    ],
    explanation:
      "7500 means hijacking, 7600 means radio communication failure, and 7700 means emergency. The usual VFR code is 1200. If ATC has already assigned you a code, you can keep it, since they're already watching you.",
    reference: "AIM 4-1-20, 6-2-2",
  }),
  oral({
    id: "ppl-oral-116",
    taskId: "ppl-IX-C",
    topic: "emergencies",
    difficulty: 2,
    prompt: "What is an ELT, and what are the rules for it?",
    keyPoints: [
      ["Emergency locator transmitter that activates on impact", ["emergency locator", "impact", "crash"]],
      ["406 MHz monitored by satellite; 121.5 no longer", ["406", "satellite", "121.5"]],
      ["Inspected every 12 calendar months", ["12", "twelve", "inspect"]],
      ["Battery replaced after 1 hour of use or half its life", ["one hour", "1 hour", "half", "50"]],
      ["Test only in the first 5 minutes after the hour", ["five minutes", "5 minutes", "first five"]],
    ],
    explanation:
      "An ELT is an emergency locator transmitter that activates automatically on impact to help rescuers find you. Satellites monitor 406 megahertz ELTs; 121.5 signals are no longer monitored by satellite. It must be inspected every 12 calendar months, and its battery replaced after one hour of cumulative use or half its useful life. Test it only in the first five minutes after the hour, for no more than three sweeps.",
    reference: "14 CFR 91.207; AIM 6-2-4",
  }),

  // ── XI Night Operations ─────────────────────────────────────
  oral({
    id: "ppl-oral-117",
    taskId: "ppl-XI-A",
    topic: "emergencies",
    difficulty: 2,
    prompt: "What are the three definitions of night, and what does each apply to?",
    keyPoints: [
      ["Sunset to sunrise: position lights required", ["sunset to sunrise", "position light"]],
      ["Civil twilight to civil twilight: logging night time", ["civil twilight", "log"]],
      ["1 hour after sunset to 1 hour before sunrise: passenger currency", ["hour after sunset"]],
    ],
    explanation:
      "From sunset to sunrise, position lights must be on. Night as defined in 14 CFR Part 1, from the end of evening civil twilight to the beginning of morning civil twilight, is used for logging night time. From one hour after sunset to one hour before sunrise is the period for night takeoffs and landings to stay current to carry passengers.",
    reference: "14 CFR 1.1, 61.57(b), 91.209",
  }),
  oral({
    id: "ppl-oral-118",
    taskId: "ppl-XI-A",
    topic: "aeromedical",
    difficulty: 2,
    prompt: "How does your vision change at night, and how do you deal with it?",
    keyPoints: [
      ["Rods and cones: use off-center viewing", ["rod", "cone", "off-center", "off center", "peripheral"]],
      ["About 30 minutes to fully adapt", ["30", "thirty"]],
      ["Avoid bright lights and use dim cockpit lighting", ["bright", "dim", "red light"]],
      ["A night blind spot in the center of vision, so keep scanning", ["blind spot", "scan"]],
    ],
    explanation:
      "At night the cones in the center of your eye don't work well, leaving a night blind spot, so you rely on the rods around it. Look slightly off-center to see dim objects and keep your eyes moving. Full dark adaptation takes about 30 minutes, and bright light ruins it in seconds, so keep cockpit lighting dim.",
    reference: "AIM 8-1-6; PHAK Ch. 17",
  }),
  oral({
    id: "ppl-oral-119",
    taskId: "ppl-XI-A",
    topic: "emergencies",
    difficulty: 2,
    prompt: "How would you plan for an engine failure on a night cross-country?",
    keyPoints: [
      ["Route near airports, highways and lit areas", ["airport", "highway", "lit"]],
      ["Fly higher for more gliding range", ["higher", "altitude", "glide"]],
      ["Best glide toward a lit area; landing light on short final", ["landing light"]],
      ["Carry the 45-minute night fuel reserve", ["45", "forty-five", "forty five"]],
    ],
    explanation:
      "Plan the route near airports, highways and lit areas, and cruise higher to give yourself more gliding range and time. If the engine fails, set up best glide toward a lit airport or area, run the restart checklist, declare an emergency, and turn on the landing light on short final. Remember the VFR night fuel reserve is 45 minutes.",
    reference: "Airplane Flying Handbook (night operations); 14 CFR 91.151",
  }),
  oral({
    id: "ppl-oral-120",
    taskId: "ppl-XI-A",
    topic: "emergencies",
    difficulty: 2,
    prompt: "At night you see another airplane's red light on your right and its green light on your left. What does that tell you?",
    keyPoints: [
      ["It's coming toward you", ["toward", "head-on", "head on", "coming at"]],
      ["Red is its left wingtip, green its right", ["left wing", "right wing", "red is", "green is"]],
      ["Take action: alter course to the right and keep it in sight", ["turn right", "alter course", "give way", "avoid"]],
    ],
    explanation:
      "Red is the left wingtip light and green is the right, so seeing red on your right and green on your left means the other airplane is headed toward you. Under the right-of-way rules for head-on traffic, both aircraft alter course to the right, so turn right and keep it in sight.",
    reference: "14 CFR 91.113(e), 91.209; AIM 8-1-6",
  }),
];
