// GENERATED from Media/Private Pilot Practice Bank.pdf (306 original questions, FAA-S-ACS-6C).
// Regenerate rather than hand-edit. Answer order is shuffled at quiz time.

import type { McQuestion } from "../types";

export const PPL_BANK_TOPICS = [
  {
    "id": "regulations",
    "title": "Regulations: privileges, currency and medical",
    "count": 31
  },
  {
    "id": "airworthiness",
    "title": "Airworthiness, documents and inspections",
    "count": 19
  },
  {
    "id": "airspace",
    "title": "Airspace and VFR weather minimums",
    "count": 28
  },
  {
    "id": "airport-ops",
    "title": "Airport operations, markings, lighting and radio",
    "count": 34
  },
  {
    "id": "weather-theory",
    "title": "Weather theory",
    "count": 25
  },
  {
    "id": "weather-services",
    "title": "Weather reports, forecasts and briefings",
    "count": 22
  },
  {
    "id": "aerodynamics",
    "title": "Aerodynamics",
    "count": 25
  },
  {
    "id": "systems",
    "title": "Aircraft systems and flight instruments",
    "count": 35
  },
  {
    "id": "performance",
    "title": "Performance and weight and balance",
    "count": 19
  },
  {
    "id": "navigation",
    "title": "Navigation and flight planning",
    "count": 28
  },
  {
    "id": "aeromedical",
    "title": "Aeromedical factors and decision-making",
    "count": 25
  },
  {
    "id": "emergencies",
    "title": "Emergencies and night operations",
    "count": 15
  }
] as const;

export const PPL_PRACTICE_BANK: McQuestion[] = [
  {
    "id": "ppl-pb-01-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "To carry passengers as pilot in command, you must have made three takeoffs and three landings in the same category and class of aircraft within the preceding",
    "choices": [
      "60 days.",
      "90 days.",
      "12 calendar months."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 90 days.",
    "reference": "14 CFR 61.57(a)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "To carry passengers at night, those three takeoffs and landings must have been made",
    "choices": [
      "as touch-and-goes, between sunset and sunrise.",
      "to a full stop, between 1 hour after sunset and 1 hour before sunrise.",
      "to a full stop, at any time after sunset."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: to a full stop, between 1 hour after sunset and 1 hour before sunrise.",
    "reference": "14 CFR 61.57(b)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "For passenger-carrying currency in a tailwheel airplane, the landings must be",
    "choices": [
      "touch-and-go.",
      "made at night.",
      "made to a full stop."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: made to a full stop.",
    "reference": "14 CFR 61.57(a)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "To act as pilot in command, you must have completed a flight review within the preceding",
    "choices": [
      "24 calendar months.",
      "12 calendar months.",
      "36 calendar months."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 24 calendar months.",
    "reference": "14 CFR 61.56",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "A 34-year-old pilot receives a third-class medical certificate on March 9, 2026. For private pilot privileges it expires at the end of",
    "choices": [
      "March 2028.",
      "March 2029.",
      "March 2031."
    ],
    "answerIndex": 2,
    "explanation": "Under age 40 at the exam, a third-class medical lasts 60 calendar months.",
    "reference": "14 CFR 61.23",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "A 42-year-old pilot receives a third-class medical certificate on August 10, 2026. It expires on",
    "choices": [
      "August 10, 2028.",
      "August 31, 2028.",
      "August 31, 2031."
    ],
    "answerIndex": 1,
    "explanation": "Age 40 or over, it lasts 24 calendar months and runs to the end of the month.",
    "reference": "14 CFR 61.23",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "Under BasicMed, the aircraft flown may have a maximum certificated takeoff weight and seating of no more than",
    "choices": [
      "6,000 lb and 6 occupants.",
      "12,500 lb and 7 occupants.",
      "12,500 lb and 10 occupants."
    ],
    "answerIndex": 1,
    "explanation": "Limits were raised in November 2024.",
    "reference": "14 CFR 61.113(i)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "A BasicMed flight must be conducted",
    "choices": [
      "at or below 18,000 ft MSL and at no more than 250 knots indicated.",
      "below 10,000 ft MSL and at no more than 200 knots indicated.",
      "in Class E and G airspace only."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: at or below 18,000 ft MSL and at no more than 250 knots indicated.",
    "reference": "14 CFR 61.113(i)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "A private pilot may share the operating expenses of a flight with passengers, provided the pilot pays",
    "choices": [
      "nothing, as long as the passengers pay only for fuel.",
      "at least half of the total.",
      "not less than the pro rata share."
    ],
    "answerIndex": 2,
    "explanation": "Only fuel, oil, airport expenditures and rental fees may be shared.",
    "reference": "14 CFR 61.113(c)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "A private pilot may fly in connection with a business or employment if",
    "choices": [
      "the flight is only incidental to that business and carries no passengers or property for compensation or hire.",
      "the employer pays the pilot for the flying time.",
      "the flight stays within 50 NM of the home airport."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: the flight is only incidental to that business and carries no passengers or property for compensation or hire.",
    "reference": "14 CFR 61.113(b)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "When acting as pilot in command, you must have in your possession or readily accessible in the aircraft",
    "choices": [
      "your pilot certificate only.",
      "your pilot certificate, a government-issued photo ID, and an appropriate medical certificate.",
      "your logbook showing a current flight review."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: your pilot certificate, a government-issued photo ID, and an appropriate medical certificate.",
    "reference": "14 CFR 61.3",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "After a change of permanent mailing address, you may not exercise pilot privileges unless you have notified the FAA within",
    "choices": [
      "30 days.",
      "60 days.",
      "90 days."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 30 days.",
    "reference": "14 CFR 61.60",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "Before acting as pilot in command of an airplane with a 230-horsepower engine, a private pilot must",
    "choices": [
      "hold a commercial certificate.",
      "pass a practical test in that airplane.",
      "receive and log ground and flight training and get a one-time logbook endorsement."
    ],
    "answerIndex": 2,
    "explanation": "More than 200 horsepower is high-performance.",
    "reference": "14 CFR 61.31(f)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "A complex airplane has",
    "choices": [
      "retractable landing gear, flaps, and a controllable-pitch propeller.",
      "an engine of more than 200 horsepower.",
      "retractable landing gear and a turbocharger."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: retractable landing gear, flaps, and a controllable-pitch propeller.",
    "reference": "14 CFR 61.1 and 61.31(e)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "For logging night flight time, night is the period",
    "choices": [
      "from sunset to sunrise.",
      "from 1 hour after sunset to 1 hour before sunrise.",
      "from the end of evening civil twilight to the beginning of morning civil twilight."
    ],
    "answerIndex": 2,
    "explanation": "The choice \"from 1 hour after sunset to 1 hour before sunrise\" is the passenger-currency period; the choice \"from sunset to sunrise\" is when position lights are required.",
    "reference": "14 CFR 1.1",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "A pilot in command who deviates from a regulation to deal with an in-flight emergency must send a written report",
    "choices": [
      "to the nearest Flight Standards office within 48 hours.",
      "to the NTSB within 10 days.",
      "to the Administrator, if requested."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: to the Administrator, if requested.",
    "reference": "14 CFR 91.3(c)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "No person may act as a crewmember of a civil aircraft with a blood alcohol concentration of, or within how many hours after drinking alcohol?",
    "choices": [
      "0.04 or greater; 8 hours.",
      "0.08 or greater; 8 hours.",
      "0.04 or greater; 12 hours."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 0.04 or greater; 8 hours.",
    "reference": "14 CFR 91.17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "A pilot convicted of driving while intoxicated must send a written report to the FAA within",
    "choices": [
      "60 days.",
      "90 days.",
      "the time remaining until the next medical exam."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 60 days.",
    "reference": "14 CFR 61.15(e)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "For a flight away from the vicinity of the departure airport, required preflight action includes becoming familiar with",
    "choices": [
      "weather reports and forecasts, fuel requirements, and alternatives if the flight cannot be completed as planned.",
      "a filed VFR flight plan and a recorded Flight Service briefing.",
      "only the destination forecast and NOTAMs."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: weather reports and forecasts, fuel requirements, and alternatives if the flight cannot be completed as planned.",
    "reference": "14 CFR 91.103",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-020",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "For day VFR flight in an airplane, you must carry enough fuel to reach the first point of intended landing and then fly at normal cruise for at least",
    "choices": [
      "30 minutes.",
      "45 minutes.",
      "1 hour."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 30 minutes.",
    "reference": "14 CFR 91.151",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-021",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "For night VFR flight, the reserve after reaching the first point of intended landing is",
    "choices": [
      "20 minutes.",
      "30 minutes.",
      "45 minutes."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: 45 minutes.",
    "reference": "14 CFR 91.151",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-022",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "Except for takeoff and landing, the minimum altitude over a congested area is",
    "choices": [
      "500 ft above the highest obstacle within 1,000 ft.",
      "1,000 ft above the highest obstacle within a horizontal radius of 2,000 ft.",
      "2,000 ft above the surf ace."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 1,000 ft above the highest obstacle within a horizontal radius of 2,000 ft.",
    "reference": "14 CFR 91.119",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-023",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "The required flight crew must use supplemental oxygen for the part of the flight lasting more than 30 minutes at cabin pressure altitudes",
    "choices": [
      "above 10,000 ft up to and including 12,500 ft MSL.",
      "above 12,500 ft up to and including 14,000 ft MSL.",
      "above 14,000 ft up to and including 15,000 ft MSL."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: above 12,500 ft up to and including 14,000 ft MSL.",
    "reference": "14 CFR 91.211",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-024",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "At cabin pressure altitudes above 15,000 ft MSL",
    "choices": [
      "only the pilot must use oxygen.",
      "passengers must use oxygen continuously.",
      "each occupant must be provided with supplemental oxygen."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: each occupant must be provided with supplemental oxygen.",
    "reference": "14 CFR 91.211",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-025",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "Two airplanes are converging at about the same altitude. Which has the right-of-way?",
    "choices": [
      "The airplane on the other's right.",
      "The faster airplane.",
      "The airplane on the other's left."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: The airplane on the other's right.",
    "reference": "14 CFR 91.113",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-026",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "Which aircraft has the right-of-way over all other air traffic?",
    "choices": [
      "A glider.",
      "An airship.",
      "An aircraft in distress."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: An aircraft in distress.",
    "reference": "14 CFR 91.113",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-027",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "The maximum indicated airspeed in the airspace underlying Class B airspace is",
    "choices": [
      "250 knots.",
      "230 knots.",
      "200 knots."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: 200 knots.",
    "reference": "14 CFR 91.117",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-028",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "Unless each occupant is wearing an approved parachute, a pilot carrying a passenger may not intentionally exceed",
    "choices": [
      "60 degrees of bank or 30 degrees of nose-up or nose-down pitch.",
      "45 degrees of bank or 20 degrees of pitch.",
      "90 degrees of bank or 45 degrees of pitch."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 60 degrees of bank or 30 degrees of nose-up or nose-down pitch.",
    "reference": "14 CFR 91.307",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-029",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "Which occurrence requires immediate notification of the NTSB?",
    "choices": [
      "An in-flight fire.",
      "A flat tire on landing.",
      "A bird strike that causes no damage."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: An in-flight fire.",
    "reference": "49 CFR 830.5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-030",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "After an aircraft accident, the operator must file a report with the NTSB within",
    "choices": [
      "24 hours.",
      "7 days.",
      "10 days."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: 10 days.",
    "reference": "49 CFR 830.15",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-01-031",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-A",
    "topic": "regulations",
    "prompt": "You are cruising VFR more than 3,000 ft AGL on a magnetic course of 250 degrees. Which altitude is appropriate?",
    "choices": [
      "5,500 ft MSL.",
      "6,000 ft MSL.",
      "6,500 ft MSL."
    ],
    "answerIndex": 2,
    "explanation": "Courses of 180 through 359 degrees use even thousands plus 500 ft.",
    "reference": "14 CFR 91.159",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "Which documents must be aboard the aircraft during flight?",
    "choices": [
      "Airworthiness certificate, registration certificate, and operating limitations.",
      "Airworthiness certificate, maintenance logbooks, and owner's handbook.",
      "Registration certificate, engine logbook, and pilot logbook."
    ],
    "answerIndex": 0,
    "explanation": "The usual memory aid is ARROW; weight and balance data is part of the operating limitations.",
    "reference": "14 CFR 91.203 and 91.9",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "A standard airworthiness certificate remains effective",
    "choices": [
      "for 12 calendar months.",
      "as long as the aircraft is maintained and operated as the regulations require.",
      "until the aircraft is sold."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: as long as the aircraft is maintained and operated as the regulations require.",
    "reference": "14 CFR 21.181",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "An aircraft registration certificate issued today expires after",
    "choices": [
      "3 years.",
      "5 years.",
      "7 years."
    ],
    "answerIndex": 2,
    "explanation": "Registration moved from 3 to 7 years in January 2023.",
    "reference": "14 CFR 47.40",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "An annual inspection was completed on July 12, 2026. The next annual is due no later than",
    "choices": [
      "July 12, 2027.",
      "July 31, 2027.",
      "July 1, 2027."
    ],
    "answerIndex": 1,
    "explanation": "Inspections are due at the end of the 12th calendar month.",
    "reference": "14 CFR 91.409",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "A 100-hour inspection is required",
    "choices": [
      "on every aircraft operated under Part 91.",
      "only on aircraft flown under IFR.",
      "when carrying persons for hire, or when giving flight instruction for hire in an aircraft the instructor provides."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: when carrying persons for hire, or when giving flight instruction for hire in an aircraft the instructor provides.",
    "reference": "14 CFR 91.409(b)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "A 100-hour inspection was due at 2,450.0 hours but was done at 2,456.0 hours after a flight to the maintenance shop. The next 100-hour inspection is due at",
    "choices": [
      "2,550.0 hours.",
      "2,556.0 hours.",
      "2,560.0 hours."
    ],
    "answerIndex": 0,
    "explanation": "The limit may be exceeded by up to 10 hours to reach a place of inspection, but the extra time counts toward the next 100 hours.",
    "reference": "14 CFR 91.409(b)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "The ATC transponder must have been tested and inspected within the preceding",
    "choices": [
      "12 calendar months.",
      "24 calendar months.",
      "36 calendar months."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 24 calendar months.",
    "reference": "14 CFR 91.413",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "The emergency locator transmitter must be inspected every",
    "choices": [
      "12 calendar months.",
      "24 calendar months.",
      "100 hours."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 12 calendar months.",
    "reference": "14 CFR 91.207(d)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "ELT batteries must be replaced or recharged",
    "choices": [
      "every 12 calendar months regardless of use.",
      "after 1 cumulative hour of use or when 50 percent of their useful life has expired.",
      "only after the unit fails a test."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: after 1 cumulative hour of use or when 50 percent of their useful life has expired.",
    "reference": "14 CFR 91.207(c)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "Who is primarily responsible for maintaining an aircraft in an airworthy condition?",
    "choices": [
      "The pilot in command.",
      "The mechanic who signed the last inspection.",
      "The owner or operator."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: The owner or operator.",
    "reference": "14 CFR 91.403",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "Who is responsible for determining that the aircraft is in condition for safe flight before each flight?",
    "choices": [
      "The pilot in command.",
      "The owner.",
      "The mechanic."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: The pilot in command.",
    "reference": "14 CFR 91.7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "Which is preventive maintenance that a private pilot may perform on an aircraft he or she owns?",
    "choices": [
      "Replacing a landing gear tire and replenishing hydraulic fluid.",
      "Repairing a cracked exhaust stack by welding.",
      "Replacing a propeller."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: Replacing a landing gear tire and replenishing hydraulic fluid.",
    "reference": "14 CFR Part 43, Appendix A, paragraph (c)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "After performing preventive maintenance, the pilot must",
    "choices": [
      "have a mechanic sign the pilot's logbook.",
      "make an entry in the maintenance records with a description of the work, the date, and the pilot's signature, certificate number and certificate type.",
      "notify the Flight Standards office."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: make an entry in the maintenance records with a description of the work, the date, and the pilot's signature, certificate number and certificate type.",
    "reference": "14 CFR 43.9",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "Which statement about Airworthiness Directives is true?",
    "choices": [
      "They are advisory.",
      "They are mandatory only for aircraft operated for hire.",
      "Compliance is mandatory, and the owner or operator is responsible for it."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: Compliance is mandatory, and the owner or operator is responsible for it.",
    "reference": "14 CFR Part 39 and 91.403",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "Your annual inspection has expired and the nearest shop is at another airport. To fly there legally you need",
    "choices": [
      "a special flight permit.",
      "permission from the control tower.",
      "a logbook entry stating the aircraft is safe."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: a special flight permit.",
    "reference": "14 CFR 21.197",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "The aircraft has no minimum equipment list. A landing light that is not required for your day flight is inoperative. Before flight it must be",
    "choices": [
      "noted in your pilot logbook.",
      "removed or deactivated, and placarded \"Inoperative.\"",
      "reported to ATC on initial contact."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: removed or deactivated, and placarded \"Inoperative.\".",
    "reference": "14 CFR 91.213(d)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "Which instrument is required for day VFR flight?",
    "choices": [
      "Attitude indicator.",
      "Magnetic direction indicator.",
      "Vertical speed indicator."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: Magnetic direction indicator.",
    "reference": "14 CFR 91.205(b)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "For night VFR flight, a landing light is required",
    "choices": [
      "on every flight.",
      "only in Class B and Class C airspace.",
      "only when the aircraft is operated for hire."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: only when the aircraft is operated for hire.",
    "reference": "14 CFR 91.205(c)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-02-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-B",
    "topic": "airworthiness",
    "prompt": "After maintenance that may have appreciably changed the aircraft's flight characteristics, no passengers may be carried until",
    "choices": [
      "an appropriately rated pilot with at least a private certificate flies it, makes an operational check, and logs the flight.",
      "an FAA inspector examines the aircraft.",
      "the aircraft has flown 10 hours solo."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: an appropriately rated pilot with at least a private certificate flies it, makes an operational check, and logs the flight.",
    "reference": "14 CFR 91.407(b)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "The basic VFR weather minimums in Class B airspace are",
    "choices": [
      "3 SM visibility and clear of clouds.",
      "3 SM visibility; 500 ft below, 1,000 ft above and 2,000 ft horizontally from clouds.",
      "1 SM visibility and clear of clouds."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 3 SM visibility and clear of clouds.",
    "reference": "14 CFR 91.155",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "In Class D airspace, the minimum distance you must remain below clouds is",
    "choices": [
      "1,000 ft.",
      "500 ft.",
      "2,000 ft."
    ],
    "answerIndex": 1,
    "explanation": "Class C, D and E below 10,000 ft MSL all use 3 SM and 500 below, 1,000 above, 2,000 horizontal.",
    "reference": "14 CFR 91.155",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "VFR flight at 10,500 ft MSL in Class E airspace requires",
    "choices": [
      "3 SM visibility; 500 ft below, 1,000 ft above, 2,000 ft horizontal.",
      "5 SM visibility; 1,000 ft below, 1,000 ft above, 1 SM horizontal.",
      "5 SM visibility and clear of clouds."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 5 SM visibility; 1,000 ft below, 1,000 ft above, 1 SM horizontal.",
    "reference": "14 CFR 91.155",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "During the day in Class G airspace at 1,200 ft AGL or below, an airplane needs",
    "choices": [
      "3 SM visibility; 500 ft below, 1,000 ft above, 2,000 ft horizontal.",
      "1 SM visibility; 500 ft below, 1,000 ft above, 2,000 ft horizontal.",
      "1 SM visibility and clear of clouds."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: 1 SM visibility and clear of clouds.",
    "reference": "14 CFR 91.155",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "At night in Class G airspace at 1,200 ft AGL or below, outside the traffic pattern, an airplane needs",
    "choices": [
      "3 SM visibility; 500 ft below, 1,000 ft above, 2,000 ft horizontal.",
      "1 SM visibility and clear of clouds.",
      "5 SM visibility; 1,000 ft below, 1,000 ft above, 1 SM horizontal."
    ],
    "answerIndex": 0,
    "explanation": "Within half a mile of the runway in the pattern, 1 SM and clear of clouds is allowed.",
    "reference": "14 CFR 91.155",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "During the day in Class G airspace, more than 1,200 ft AGL but below 10,000 ft MSL, an airplane needs",
    "choices": [
      "1 SM visibility and clear of clouds.",
      "1 SM visibility; 500 ft below, 1,000 ft above, 2,000 ft horizontal.",
      "3 SM visibility; 500 ft below, 1,000 ft above, 2,000 ft horizontal."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 1 SM visibility; 500 ft below, 1,000 ft above, 2,000 ft horizontal.",
    "reference": "14 CFR 91.155",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "Without a special VFR clearance, you may not fly beneath the ceiling within the surf ace area of controlled airspace designated for an airport when the ceiling is less than",
    "choices": [
      "1,000 ft.",
      "1,500 ft.",
      "3,000 ft."
    ],
    "answerIndex": 0,
    "explanation": "Takeoff, landing or entering the pattern also needs 3 SM ground visibility.",
    "reference": "14 CFR 91.155(c) and (d)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "The weather minimums for special VFR are",
    "choices": [
      "3 SM visibility and clear of clouds.",
      "1 SM visibility and 500 ft below clouds.",
      "1 SM visibility and clear of clouds, with an ATC clearance."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: 1 SM visibility and clear of clouds, with an ATC clearance.",
    "reference": "14 CFR 91.157",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "Special VFR at night requires",
    "choices": [
      "a private pilot certificate and a Mode C transponder.",
      "an instrument-rated pilot and an aircraft equipped for IFR flight.",
      "only an ATC clearance."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: an instrument-rated pilot and an aircraft equipped for IFR flight.",
    "reference": "14 CFR 91.157",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "Class A airspace over the contiguous United States extends from",
    "choices": [
      "18,000 ft MSL up to and including FL600.",
      "14,500 ft MSL up to FL450.",
      "10,000 ft MSL up to 18,000 ft MSL."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 18,000 ft MSL up to and including FL600.",
    "reference": "14 CFR 71.33",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "What is required to enter Class B airspace?",
    "choices": [
      "Two-way radio contact only.",
      "A filed VFR flight plan.",
      "An ATC clearance to enter."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: An ATC clearance to enter.",
    "reference": "14 CFR 91.131",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "You call approach control before entering Class C airspace and hear,\" Aircraft calling Sacramento Approach, standby.\" You",
    "choices": [
      "may enter, because the controller answered.",
      "may not enter, because the reply did not include your call sign and two-way communication is not established.",
      "should squawk 7600 and continue."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: may not enter, because the reply did not include your call sign and two-way communication is not established.",
    "reference": "AIM 3-2-4",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "The outer shelf of a typical Class C area extends to a radius of",
    "choices": [
      "10 NM.",
      "15 NM.",
      "20 NM."
    ],
    "answerIndex": 0,
    "explanation": "The inner core is 5 NM from the surf ace to 4,000 ft above the airport; the shelf runs from 1,200 ft to 4,000 ft.",
    "reference": "AIM 3-2-4",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "On a sectional chart, a Class D airport shows the number 29 inside a dashed blue box. The Class D airspace extends from the surf ace up to and including",
    "choices": [
      "2,900 ft MSL.",
      "2,900 ft AGL.",
      "29,000 ft MSL."
    ],
    "answerIndex": 0,
    "explanation": "Ceilings are shown in hundreds of feet MSL. Aeronautical Chart Users' Guide.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "When a part-time control tower closes, its Class D airspace",
    "choices": [
      "remains Class D.",
      "always becomes Class G.",
      "becomes Class E or Class G, as listed in the Chart Supplement."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: becomes Class E or Class G, as listed in the Chart Supplement.",
    "reference": "AIM 3-2-5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "A dashed magenta line around an airport on a sectional chart shows",
    "choices": [
      "Class D airspace.",
      "Class E airspace beginning at the surf ace.",
      "Class E airspace beginning at 700 ft AGL."
    ],
    "answerIndex": 1,
    "explanation": "Aeronautical Chart Users' Guide.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "A shaded magenta band on a sectional chart shows that Class E airspace begins at",
    "choices": [
      "the surf ace.",
      "1,200 ft AGL.",
      "700 ft AGL."
    ],
    "answerIndex": 2,
    "explanation": "Aeronautical Chart Users' Guide.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "The Mode C veil requires an altitude-reporting transponder and ADS-B Out",
    "choices": [
      "within 30 NM of a Class B primary airport, from the surf ace up to 10,000 ft MSL.",
      "within 20 NM of any Class C airport.",
      "within 10 NM of any towered airport."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: within 30 NM of a Class B primary airport, from the surf ace up to 10,000 ft MSL.",
    "reference": "14 CFR 91.215 and 91.225",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "Outside Class A, B and C airspace, ADS-B Out is required in Class E airspace over the contiguous United States",
    "choices": [
      "at and above 3,000 ft AGL.",
      "at and above 10,000 ft MSL, except at and below 2,500 ft AGL.",
      "only above 14,500 ft MSL."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: at and above 10,000 ft MSL, except at and below 2,500 ft AGL.",
    "reference": "14 CFR 91.225",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-020",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "You plan to cross 500 ft above the ceiling of a Class C area, at 5,000 ft MSL. The aircraft must have",
    "choices": [
      "no special equipment.",
      "a two-way radio only.",
      "an altitude-reporting transponder and ADS-B Out."
    ],
    "answerIndex": 2,
    "explanation": "Required above the ceiling of Class B and C areas up to 10,000 ft MSL.",
    "reference": "14 CFR 91.215 and 91.225",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-021",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "You may fly through a restricted area",
    "choices": [
      "at any time under VFR.",
      "when it is not active, or with permission from the using or controlling agency.",
      "never."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: when it is not active, or with permission from the using or controlling agency.",
    "reference": "14 CFR 91.133; AIM 3-4-3",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-022",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "Flight Service tells you the military operations area on your VFR route is active. You",
    "choices": [
      "may fly through without a clearance but should exercise extreme caution.",
      "must get a clearance from the controlling agency.",
      "are prohibited from entering."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: may fly through without a clearance but should exercise extreme caution.",
    "reference": "AIM 3-4-5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-023",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "An alert area on a sectional chart tells you",
    "choices": [
      "flight is prohibited.",
      "an ATC clearance is needed.",
      "there may be a high volume of pilot training or unusual aerial activity, and all pilots are responsible for collision avoidance."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: there may be a high volume of pilot training or unusual aerial activity, and all pilots are responsible for collision avoidance.",
    "reference": "AIM 3-4-6",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-024",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "A warning area is airspace",
    "choices": [
      "over land next to military bases.",
      "extending from 3 NM off the U.S. coast outward, with activity that may be hazardous to nonparticipating aircraft.",
      "within 3 NM of a nuclear plant."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: extending from 3 NM off the U.S. coast outward, with activity that may be hazardous to nonparticipating aircraft.",
    "reference": "AIM 3-4-4",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-025",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "A military training route charted as IR207 is flown",
    "choices": [
      "under IFR, with one or more segments above 1,500 ft AGL.",
      "under VFR, at or below 1,500 ft AGL.",
      "under VFR, above 1,500 ft AGL."
    ],
    "answerIndex": 0,
    "explanation": "IR means IFR; three digits mean segments above 1,500 ft AGL, four digits mean at or below 1,500 ft AGL.",
    "reference": "AIM 3-5-2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-026",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "The standing flight restriction over major stadium events applies within",
    "choices": [
      "1 NM and below 1,000 ft AGL.",
      "3 NM and below 3,000 ft AGL.",
      "5 NM and below 5,000 ft AGL."
    ],
    "answerIndex": 1,
    "explanation": "It runs from one hour before to one hour after events at stadiums seating 30,000 or more.",
    "reference": "AIM 3-5-3; standing FDC NOTAM",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-027",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "Special awareness training is required before flying VFR within how many nautical miles of the Washington, D.C. (DCA) VOR/DME?",
    "choices": [
      "30 NM.",
      "40 NM.",
      "60 NM."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: 60 NM.",
    "reference": "14 CFR 91.161",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-03-028",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "prompt": "Over charted national parks and wildlife refuges, pilots are requested to maintain at least",
    "choices": [
      "2,000 ft above the surf ace.",
      "1,000 ft above the surf ace.",
      "500 ft above the surf ace."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 2,000 ft above the surf ace.",
    "reference": "AIM 7-5-6",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-001",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "The numbers 9 and 27 on a runway mean it is aligned approximately",
    "choices": [
      "009 and 027 degrees true.",
      "090 and 270 degrees magnetic.",
      "090 and 270 degrees true."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 090 and 270 degrees magnetic.",
    "reference": "AIM 2-3-3",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-002",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "The pavement before a displaced threshold may be used for",
    "choices": [
      "taxiing, takeoff, and landing rollout from the opposite direction.",
      "landing touchdown only.",
      "nothing."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: taxiing, takeoff, and landing rollout from the opposite direction.",
    "reference": "AIM 2-3-3",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-003",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "Pavement marked with yellow chevrons may be used for",
    "choices": [
      "taxiing only.",
      "the takeoff roll only.",
      "nothing; it is unusable for taxi, takeoff or landing."
    ],
    "answerIndex": 2,
    "explanation": "Chevrons mark blast pads and stopways.",
    "reference": "AIM 2-3-3",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-004",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "As you taxi toward a runway, the runway holding position marking appears as",
    "choices": [
      "two solid yellow lines on your side and two dashed yellow lines on the runway side.",
      "two dashed yellow lines on your side and two solid yellow lines on the runway side.",
      "a single solid yellow line."
    ],
    "answerIndex": 0,
    "explanation": "Stop on the solid-line side.",
    "reference": "AIM 2-3-5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-005",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "After landing, you are clear of the runway when",
    "choices": [
      "the nose of the aircraft crosses the hold line.",
      "the entire aircraft has crossed the hold line.",
      "the cockpit is past the runway edge lights."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: the entire aircraft has crossed the hold line.",
    "reference": "AIM 4-3-20",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-006",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "A sign with white characters on a red background, such as \"15-33,\" is",
    "choices": [
      "a taxiway location sign.",
      "a direction sign to the runway.",
      "a runway holding position sign you must not pass without clearance at a towered airport."
    ],
    "answerIndex": 2,
    "explanation": "Mandatory instruction sign.",
    "reference": "AIM 2-3-8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-007",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "A sign with a yellow letter on a black background tells you",
    "choices": [
      "which taxiway you are on.",
      "the direction to a taxiway.",
      "the runway distance remaining."
    ],
    "answerIndex": 0,
    "explanation": "Location sign.",
    "reference": "AIM 2-3-9",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-008",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "A sign beside the runway showing a white \"4\" on a black background means",
    "choices": [
      "you are on runway 4.",
      "4,000 ft of runway remain.",
      "taxiway 4 is ahead."
    ],
    "answerIndex": 1,
    "explanation": "Runway distance remaining sign, in thousands of feet.",
    "reference": "AIM 2-3-13",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-009",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "Taxiway centerline lights are",
    "choices": [
      "blue.",
      "green.",
      "white."
    ],
    "answerIndex": 1,
    "explanation": "Taxiway edge lights are blue.",
    "reference": "AIM 2-1-10",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-010",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "On a runway with an instrument approach, the runway edge lights for the last 2,000 ft (or half the runway, whichever is less) are",
    "choices": [
      "red.",
      "green.",
      "yellow."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: yellow.",
    "reference": "AIM 2-1-4",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-011",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "An airport beacon showing two quick white flashes between green flashes identifies",
    "choices": [
      "a military airport.",
      "a civilian land airport.",
      "a heliport."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: a military airport.",
    "reference": "AIM 2-1-9",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-012",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "An airport beacon operating during the day in Class D airspace often means",
    "choices": [
      "the tower is closed.",
      "the weather is below basic VFR minimums.",
      "the runway lights are out of service."
    ],
    "answerIndex": 1,
    "explanation": "Ground visibility under 3 SM or ceiling under 1,000 ft, though the beacon is not a guarantee.",
    "reference": "AIM 2-1-9",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-013",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "On a two-bar VASI, you are on the glide path when you see",
    "choices": [
      "white over white.",
      "red over red.",
      "red over white."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: red over white.",
    "reference": "AIM 2-1-2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-014",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "A four-light PAPI showing three white lights and one red light means you are",
    "choices": [
      "slightly high.",
      "on the glide path.",
      "slightly low."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: slightly high.",
    "reference": "AIM 2-1-2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-015",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "With pilot-controlled lighting, keying the microphone seven times within five seconds",
    "choices": [
      "turns the lights off.",
      "selects low intensity.",
      "selects the highest intensity available."
    ],
    "answerIndex": 2,
    "explanation": "Five clicks gives medium, three gives low.",
    "reference": "AIM 2-1-8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-016",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "The recommended entry to the traffic pattern at a nontowered airport is",
    "choices": [
      "straight in on final.",
      "45 degrees to the downwind leg, at midfield, at pattern altitude.",
      "overhead at 500 ft above pattern altitude, descending on base."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 45 degrees to the downwind leg, at midfield, at pattern altitude.",
    "reference": "AIM 4-3-3; Airplane Flying Handbook, chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-017",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "Unless markings or the Chart Supplement show otherwise, traffic pattern turns at a nontowered airport are made",
    "choices": [
      "to the left.",
      "to the right.",
      "in either direction."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: to the left.",
    "reference": "14 CFR 91.126",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-018",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "At an airport with no tower, Flight Service station or UNICOM, self-announce on the MULTICOM frequency",
    "choices": [
      "121.5.",
      "122.9.",
      "122.75."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 122.9.",
    "reference": "AIM 4-1-9",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-019",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "If an ATIS broadcast leaves out sky condition and visibility, you can assume",
    "choices": [
      "the sky is clear and visibility is unrestricted.",
      "the ceiling is above 3,000 ft and visibility is more than 3 miles.",
      "the ceiling is above 5,000 ft and visibility is more than 5 miles."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: the ceiling is above 5,000 ft and visibility is more than 5 miles.",
    "reference": "AIM 4-1-13",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-020",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "Wingtip vortices are strongest when the generating aircraft is",
    "choices": [
      "heavy, clean and slow.",
      "light, dirty and fast.",
      "heavy, dirty and fast."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: heavy, clean and slow.",
    "reference": "AIM 7-4-3",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-021",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "When landing behind a large aircraft on the same runway, you should",
    "choices": [
      "stay below its approach path and land short of its touchdown point.",
      "stay at or above its approach path and land beyond its touchdown point.",
      "follow its approach path and land on its touchdown point."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: stay at or above its approach path and land beyond its touchdown point.",
    "reference": "AIM 7-4-6",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-022",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "When taking off behind a departing large aircraft, you should",
    "choices": [
      "lift off before its rotation point and climb above its flight path.",
      "lift off beyond its rotation point and stay below its flight path.",
      "delay rotation to build extra airspeed."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: lift off before its rotation point and climb above its flight path.",
    "reference": "AIM 7-4-6",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-023",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "Which wind keeps the upwind vortex of a landing large aircraft over the runway the longest?",
    "choices": [
      "A strong headwind.",
      "A direct crosswind of 15 knots.",
      "A light quartering tailwind."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: A light quartering tailwind.",
    "reference": "AIM 7-4-4",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-024",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "In flight, a flashing red light signal from the tower means",
    "choices": [
      "give way to other aircraft and keep circling.",
      "the airport is unsafe; do not land.",
      "return for landing."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: the airport is unsafe; do not land.",
    "reference": "14 CFR 91.125",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-025",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "On the ground, a flashing green light signal from the tower means",
    "choices": [
      "cleared to taxi.",
      "cleared for takeoff.",
      "stop."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: cleared to taxi.",
    "reference": "14 CFR 91.125",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-026",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "An alternating red and green light signal means",
    "choices": [
      "return to your starting point.",
      "cleared to land.",
      "exercise extreme caution."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: exercise extreme caution.",
    "reference": "14 CFR 91.125",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-027",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "The transponder code for lost communications is",
    "choices": [
      "7500.",
      "7600.",
      "7700."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 7600.",
    "reference": "AIM 6-4-2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-028",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "Ground control says, \"Taxi to Runway 27 via Alpha.\" Taxiway Alpha crosses Runway 18. You",
    "choices": [
      "may cross every runway along the route.",
      "may cross Runway 18 if you see no traffic.",
      "must hold short of Runway 18 until specifically cleared to cross."
    ],
    "answerIndex": 2,
    "explanation": "Each runway crossing needs its own clearance.",
    "reference": "AIM 4-3-18",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-029",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "\"Line up and wait\" means",
    "choices": [
      "taxi onto the departure runway and hold in position; it is not a takeoff clearance.",
      "hold short of the runway.",
      "begin the takeoff roll when ready."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: taxi onto the departure runway and hold in position; it is not a takeoff clearance.",
    "reference": "AIM 5-2-5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-030",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "Which taxi instruction must always be read back?",
    "choices": [
      "The wind.",
      "Any instruction to hold short of a runway.",
      "The altimeter setting."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: Any instruction to hold short of a runway.",
    "reference": "AIM 4-3-18",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-031",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "You have been cleared to cross a runway, but the red in-pavement runway entrance lights come on as you reach the hold line. You should",
    "choices": [
      "cross, because the clearance takes priority.",
      "stop and tell ATC the lights are red.",
      "cross quickly."
    ],
    "answerIndex": 1,
    "explanation": "Runway status lights never give a clearance, and a red light overrides one.",
    "reference": "AIM 2-1-6",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-032",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "Your radio fails as you approach a Class D airport in VFR weather. You should",
    "choices": [
      "stay outside or above the airspace until you see the flow of traffic, squawk 7600, then join the pattern and watch the tower for light signals.",
      "land straight in on the nearest runway.",
      "squawk 7700 and circle over the field at 500 ft."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: stay outside or above the airspace until you see the flow of traffic, squawk 7600, then join the pattern and watch the tower for light signals.",
    "reference": "AIM 4-2-13 and 6-4-2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-033",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "A \"hot spot\" on an airport diagram is",
    "choices": [
      "a run-up area.",
      "a location with fuel service.",
      "a location with a history or risk of collision or runway incursion."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: a location with a history or risk of collision or runway incursion.",
    "reference": "Chart Supplement and airport diagram legend",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-04-034",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "prompt": "The correct way to say 10,500 ft to ATC is",
    "choices": [
      "\"one zero thousand five hundred.\"",
      "\"ten point five.\"",
      "\"one hundred five hundred.\""
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: \"one zero thousand five hundred.\".",
    "reference": "AIM 4-2-9",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "The basic cause of all weather is",
    "choices": [
      "unequal heating of the Earth's surf ace.",
      "the rotation of the Earth.",
      "moisture in the upper atmosphere."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: unequal heating of the Earth's surf ace.",
    "reference": "Pilot's Handbook of Aeronautical Knowledge (PHAK), chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Standard sea-level temperature and pressure are",
    "choices": [
      "0 degrees C and 29.92 inches of mercury.",
      "15 degrees C and 29.92 inches of mercury.",
      "15 degrees C and 30.00 inches of mercury."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 15 degrees C and 29.92 inches of mercury.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Near the surf ace, wind flows across the isobars toward low pressure instead of parallel to them because",
    "choices": [
      "Coriolis force is stronger at the surf ace.",
      "the pressure gradient is weaker at the surf ace.",
      "surf ace friction slows the wind and weakens the Coriolis effect."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: surf ace friction slows the wind and weakens the Coriolis effect.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "In the Northern Hemisphere, air around a low-pressure area flows",
    "choices": [
      "counterclockwise, inward and upward.",
      "clockwise, outward and downward.",
      "clockwise, inward and upward."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: counterclockwise, inward and upward.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "A sea breeze develops during the day because",
    "choices": [
      "water heats faster than land.",
      "land heats faster than water, so cooler air flows in from the water.",
      "the pressure over land is higher than over water."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: land heats faster than water, so cooler air flows in from the water.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "The surf ace temperature is 70 degrees F and the dew point is 48 degrees F. The bases of cumulus clouds will be at approximately",
    "choices": [
      "3,000 ft AGL.",
      "5,000 ft AGL.",
      "8,000 ft AGL."
    ],
    "answerIndex": 1,
    "explanation": "A 22-degree spread divided by 4.4, times 1,000 ft.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Which describes a stable air mass?",
    "choices": [
      "Cumuliform clouds, showers and good visibility.",
      "Towering cumulus and turbulence.",
      "Stratiform clouds, steady precipitation, smooth air and poor visibility."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: Stratiform clouds, steady precipitation, smooth air and poor visibility.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Which describes an unstable air mass?",
    "choices": [
      "Cumuliform clouds, showery precipitation, turbulence and good visibility.",
      "Stratiform clouds and smooth air.",
      "Fog and continuous drizzle."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: Cumuliform clouds, showery precipitation, turbulence and good visibility.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "What makes an air mass more stable?",
    "choices": [
      "Warming from below.",
      "Cooling from below.",
      "Adding moisture at low levels."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: Cooling from below.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "The most common ground-based temperature inversion is produced by",
    "choices": [
      "the passage of a warm front.",
      "widespread sinking air in a high-pressure area.",
      "terrestrial radiation on a clear, relatively calm night."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: terrestrial radiation on a clear, relatively calm night.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Beneath a low-level temperature inversion with high humidity, expect",
    "choices": [
      "smooth air and poor visibility from fog, haze or low clouds.",
      "turbulence and good visibility.",
      "showers and gusty winds."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: smooth air and poor visibility from fog, haze or low clouds.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Radiation fog is most likely to form",
    "choices": [
      "over water on a windy afternoon.",
      "over low-lying land on a clear night with little or no wind.",
      "on the windward side of mountains in strong wind."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: over low-lying land on a clear night with little or no wind.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Which types of fog depend on wind in order to exist?",
    "choices": [
      "Radiation fog and steam fog.",
      "Radiation fog and ice fog.",
      "Advection fog and upslope fog."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: Advection fog and upslope fog.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "The three conditions needed for a thunderstorm to form are",
    "choices": [
      "sufficient moisture, an unstable lapse rate and a lifting action.",
      "high pressure, stable air and high humidity.",
      "stratiform clouds, a cold surf ace and light winds."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: sufficient moisture, an unstable lapse rate and a lifting action.",
    "reference": "PHAK chapter 12; Aviation Weather Handbook, thunderstorms chapter",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Which stage of a thunderstorm is characterized mainly by downdrafts?",
    "choices": [
      "Cumulus.",
      "Dissipating.",
      "Mature."
    ],
    "answerIndex": 1,
    "explanation": "The cumulus stage is mainly updrafts; the mature stage has both.",
    "reference": "Aviation Weather Handbook",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "A squall line is",
    "choices": [
      "a band of fog along a coastline.",
      "a line of stratus ahead of a warm front.",
      "a narrow band of active thunderstorms, often ahead of a cold front, with some of the most severe weather hazards."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: a narrow band of active thunderstorms, often ahead of a cold front, with some of the most severe weather hazards.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "An airplane flying through a microburst on final approach typically meets",
    "choices": [
      "an increasing headwind and performance gain, then a downdraft, then a tailwind and performance loss.",
      "a tailwind first, then a headwind.",
      "a steady crosswind with no change in performance."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: an increasing headwind and performance gain, then a downdraft, then a tailwind and performance loss.",
    "reference": "AIM chapter 7, section 1 (microbursts)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "From the time it strikes the ground until it dissipates, a microburst usually lasts",
    "choices": [
      "2 to 5 hours.",
      "seldom more than 15 minutes.",
      "about 1 hour."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: seldom more than 15 minutes.",
    "reference": "AIM chapter 7, section 1 (microbursts)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Structural icing in flight requires",
    "choices": [
      "temperatures below freezing only.",
      "visible moisture only.",
      "visible moisture and an aircraft surf ace temperature at or below freezing."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: visible moisture and an aircraft surf ace temperature at or below freezing.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-020",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Ice pellets at the surf ace are evidence of",
    "choices": [
      "freezing rain at a higher altitude.",
      "a cold front passage.",
      "thunderstorms in the area."
    ],
    "answerIndex": 0,
    "explanation": "Rain froze while falling through colder air below a warm layer.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-021",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Frost forms on an aircraft when",
    "choices": [
      "rain falls on a cold wing.",
      "the surf ace temperature is at or below the dew point and the dew point is below freezing.",
      "the temperature and dew point are both above freezing."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: the surf ace temperature is at or below the dew point and the dew point is below freezing.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-022",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Standing lenticular clouds over a mountain ridge indicate",
    "choices": [
      "smooth air.",
      "calm winds aloft.",
      "a mountain wave with possible severe turbulence."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: a mountain wave with possible severe turbulence.",
    "reference": "Aviation Weather Handbook, mountain weather chapter",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-023",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Wind shear near a low-level temperature inversion should be expected when the wind speed at 2,000 to 4,000 ft above the surf ace is at least",
    "choices": [
      "25 knots.",
      "10 knots.",
      "15 knots."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 25 knots.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-024",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Which weather is typical of a fast-moving cold front?",
    "choices": [
      "Wide bands of stratus and steady drizzle.",
      "A line of cumuliform clouds with showers and gusty winds, followed by good visibility.",
      "Fog and calm winds."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: A line of cumuliform clouds with showers and gusty winds, followed by good visibility.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-05-025",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-theory",
    "prompt": "Which cloud type produces the greatest turbulence?",
    "choices": [
      "Nimbostratus.",
      "Altocumulus.",
      "Cumulonimbus."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: Cumulonimbus.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "METAR KSJC 051753Z 31012G20KT 10SM FEW040 BKN250 22/09 A2992. The wind is",
    "choices": [
      "310 degrees magnetic at 12 knots, gusting to 20.",
      "310 degrees true at 12 knots, gusting to 20.",
      "031 degrees true at 12 knots, gusting to 20."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 310 degrees true at 12 knots, gusting to 20.",
    "reference": "Aviation Weather Handbook, METAR section",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "METAR KSJC 051753Z 31012G20KT 10SM FEW040 BKN250 22/09 A2992. In this METAR, the ceiling is",
    "choices": [
      "4,000 ft.",
      "not present; there is no ceiling.",
      "25,000 ft."
    ],
    "answerIndex": 2,
    "explanation": "The ceiling is the lowest broken or overcast layer, or vertical visibility. FEW and SCT are not ceilings.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "METAR KOAK 051453Z 00000KT 1/2SM FG VV002 12/12 A3001. This reports",
    "choices": [
      "missing wind, visibility 1 to 2 SM, overcast at 200 ft.",
      "calm wind, visibility 2 SM, scattered clouds at 2,000 ft.",
      "calm wind, visibility 1/2 SM in fog, vertical visibility 200 ft."
    ],
    "answerIndex": 2,
    "explanation": "VV002 is an indefinite ceiling of 200 ft.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "A ceiling of 2,500 ft with 4 SM visibility is categorized as",
    "choices": [
      "VFR.",
      "MVFR.",
      "IFR."
    ],
    "answerIndex": 1,
    "explanation": "MVFR is a ceiling of 1,000 to 3,000 ft or visibility of 3 to 5 SM.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "A ceiling of 800 ft with 5 SM visibility is categorized as",
    "choices": [
      "MVFR.",
      "LIFR.",
      "IFR."
    ],
    "answerIndex": 2,
    "explanation": "IFR is a ceiling of 500 to below 1,000 ft or visibility of 1 to below 3 SM. The lower of the two categories applies.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "Wind direction is referenced to",
    "choices": [
      "magnetic north in METARs and true north in tower reports.",
      "true north in METARs and TAFs, and magnetic north in tower and ATIS reports.",
      "true north in all reports."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: true north in METARs and TAFs, and magnetic north in tower and ATIS reports.",
    "reference": "Aviation Weather Handbook; AIM chapter 7, section 1",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "A TAF forecasts conditions within",
    "choices": [
      "5 SM of the center of the airport runway complex.",
      "10 SM of the airport.",
      "25 NM of the airport."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: 5 SM of the center of the airport runway complex.",
    "reference": "Aviation Weather Handbook, TAF section",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "TAF excerpt: FM051800 28015G25KT P6SM SCT050 TEMPO 0520/0522 3SM -SHRA BKN030. Between 2000Z and 2200Z on the 5th, expect",
    "choices": [
      "a permanent change to 3 SM visibility.",
      "a 30 percent chance of thunderstorms.",
      "temporary conditions of 3 SM in light rain showers with a broken ceiling at 3,000 ft."
    ],
    "answerIndex": 2,
    "explanation": "TEMPO covers fluctuations expected to last less than an hour at a time.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "In a TAF, P6SM means visibility",
    "choices": [
      "greater than 6 SM.",
      "of 6 SM with a 60 percent probability.",
      "of 6 SM in precipitation."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: greater than 6 SM.",
    "reference": "Aviation Weather Handbook, TAF section",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "A winds and temperatures aloft forecast shows 2715-05 for 9,000 ft. This means",
    "choices": [
      "wind from 270 degrees true at 15 knots, temperature minus 5 degrees C.",
      "wind from 271 degrees at 5 knots, temperature minus 5 degrees C.",
      "wind from 270 degrees magnetic at 15 knots, temperature plus 5 degrees C."
    ],
    "answerIndex": 0,
    "explanation": "The first two digits are direction in tens of degrees true, the next two are speed in knots.",
    "reference": "Aviation Weather Handbook",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "In a winds aloft forecast, 9900 means",
    "choices": [
      "wind from the north at 90 knots.",
      "the data is missing.",
      "the wind is light and variable."
    ],
    "answerIndex": 2,
    "explanation": "Light and variable is less than 5 knots.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "The best source of information on actual turbulence, icing and cloud tops along your route is",
    "choices": [
      "the TAF.",
      "pilot weather reports (PIREPs).",
      "the surf ace prognostic chart."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: pilot weather reports (PIREPs).",
    "reference": "Aviation Weather Handbook, PIREP section",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "A G-AIRMET Sierra is issued for",
    "choices": [
      "IFR conditions and mountain obscuration.",
      "moderate turbulence.",
      "moderate icing."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: IFR conditions and mountain obscuration.",
    "reference": "Aviation Weather Handbook, G-AIRMET section",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "A G-AIRMET Zulu is issued for",
    "choices": [
      "turbulence and strong surf ace winds.",
      "IFR conditions.",
      "moderate icing and freezing levels."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: moderate icing and freezing levels.",
    "reference": "Aviation Weather Handbook, G-AIRMET section",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "A G-AIRMET Tango is issued for",
    "choices": [
      "thunderstorms.",
      "moderate turbulence, sustained surf ace winds of 30 knots or more, and low-level wind shear.",
      "mountain obscuration."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: moderate turbulence, sustained surf ace winds of 30 knots or more, and low-level wind shear.",
    "reference": "Aviation Weather Handbook, G-AIRMET section",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "A SIGMET (non-convective) is issued for",
    "choices": [
      "severe icing, severe or extreme turbulence, volcanic ash, or widespread dust storms or sandstorms, and applies to all aircraft.",
      "moderate icing affecting light aircraft only.",
      "thunderstorms only."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: severe icing, severe or extreme turbulence, volcanic ash, or widespread dust storms or sandstorms, and applies to all aircraft.",
    "reference": "Aviation Weather Handbook, SIGMET section",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "A convective SIGMET implies",
    "choices": [
      "light turbulence.",
      "IFR ceilings only.",
      "severe or greater turbulence, severe icing and low-level wind shear."
    ],
    "answerIndex": 2,
    "explanation": "Issued for tornadoes, lines of thunderstorms, embedded thunderstorms, hail of 3/4 inch or more, or surf ace winds of 50 knots or more.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "Which product replaced the text Area Forecast for the contiguous United States?",
    "choices": [
      "The Terminal Aerodrome Forecast.",
      "The Graphical Forecasts for Aviation (GFA).",
      "The winds and temperatures aloft forecast."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: The Graphical Forecasts for Aviation (GFA).",
    "reference": "Aviation Weather Handbook",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "You should request an outlook briefing when",
    "choices": [
      "your departure is six or more hours away.",
      "you need to update an earlier briefing.",
      "you are already in flight."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: your departure is six or more hours away.",
    "reference": "AIM chapter 7, section 1 (preflight briefing)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-020",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "Datalink NEXRAD radar shown in the cockpit",
    "choices": [
      "is real time and can be used to pick a path between cells.",
      "is never more than one minute old.",
      "may be several minutes older than the age shown, so use it for strategic avoidance only."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: may be several minutes older than the age shown, so use it for strategic avoidance only.",
    "reference": "AIM chapter 7, section 1 (FIS-B)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-021",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "Flight Information Service-Broadcast (FIS-B) weather is received",
    "choices": [
      "through an ADS-B In receiver on 978 MHz, at no charge.",
      "on 121.5 MHz.",
      "only through a paid satellite subscription."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: through an ADS-B In receiver on 978 MHz, at no charge.",
    "reference": "AIM chapter 7, section 1 (FIS-B)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-06-022",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "prompt": "Closely spaced isobars on a surf ace chart indicate",
    "choices": [
      "calm winds.",
      "a strong pressure gradient and strong winds.",
      "fog."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: a strong pressure gradient and strong winds.",
    "reference": "PHAK chapter 12",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "In straight-and-level, unaccelerated flight",
    "choices": [
      "lift equals weight and thrust equals drag.",
      "lift is greater than weight.",
      "thrust is greater than drag."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: lift equals weight and thrust equals drag.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "An airplane stalls",
    "choices": [
      "only at low airspeed.",
      "only in a nose-high attitude.",
      "whenever the critical angle of attack is exceeded, at any airspeed and attitude."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: whenever the critical angle of attack is exceeded, at any airspeed and attitude.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "Increasing the airplane's weight",
    "choices": [
      "lowers the stall speed.",
      "raises the stall speed but does not change the critical angle of attack.",
      "raises both the stall speed and the critical angle of attack."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: raises the stall speed but does not change the critical angle of attack.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "In a level 60-degree banked turn, the wings of a 2,400 lb airplane must support",
    "choices": [
      "2,400 lb.",
      "3,600 lb.",
      "4,800 lb."
    ],
    "answerIndex": 2,
    "explanation": "A 60-degree bank produces a load factor of 2.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "An airplane stalls at 50 knots in level flight. In a level 60-degree banked turn it stalls at about",
    "choices": [
      "71 knots.",
      "61 knots.",
      "100 knots."
    ],
    "answerIndex": 0,
    "explanation": "Stall speed rises with the square root of the load factor: 50 x 1.41.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "As airspeed decreases in level flight",
    "choices": [
      "both induced and parasite drag decrease.",
      "induced drag increases and parasite drag decreases.",
      "induced drag decreases and parasite drag increases."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: induced drag increases and parasite drag decreases.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "Best glide speed is the speed at which",
    "choices": [
      "parasite drag is lowest.",
      "induced drag is lowest.",
      "total drag is lowest and the lift-to-drag ratio is highest."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: total drag is lowest and the lift-to-drag ratio is highest.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "Ground effect",
    "choices": [
      "occurs within about one wingspan of the surf ace, reduces induced drag, and can let the airplane lift off before it reaches a safe flying speed.",
      "increases induced drag near the runway.",
      "only affects airplanes with retractable gear."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: occurs within about one wingspan of the surf ace, reduces induced drag, and can let the airplane lift off before it reaches a safe flying speed.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "P-factor makes the airplane yaw left at high angles of attack because",
    "choices": [
      "the engine turns the propeller clockwise.",
      "the descending propeller blade has a greater angle of attack and produces more thrust than the ascending blade.",
      "the slipstream strikes the right side of the tail."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: the descending propeller blade has a greater angle of attack and produces more thrust than the ascending blade.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "Compared with a forward CG, loading the airplane at the aft CG limit gives",
    "choices": [
      "a higher stall speed and more stability.",
      "no change in handling.",
      "a lower stall speed and less longitudinal stability."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: a lower stall speed and less longitudinal stability.",
    "reference": "PHAK chapters 5 and 10",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "Extending the flaps",
    "choices": [
      "raises the stall speed.",
      "lowers the stall speed and allows a steeper approach without an increase in airspeed.",
      "reduces drag."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: lowers the stall speed and allows a steeper approach without an increase in airspeed.",
    "reference": "PHAK chapter 6",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "For an airplane to spin, it must first be",
    "choices": [
      "stalled, with yaw present.",
      "in a steep turn.",
      "above maneuvering speed."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: stalled, with yaw present.",
    "reference": "Airplane Flying Handbook, chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "In the absence of a manuf acturer's procedure, the general spin recovery sequence is",
    "choices": [
      "full power, ailerons into the spin, back elevator.",
      "full aileron opposite the spin, then power.",
      "power idle, ailerons neutral, full rudder opposite the rotation, then forward elevator to break the stall."
    ],
    "answerIndex": 2,
    "explanation": "Airplane Flying Handbook, chapter 5. The aircraft's own manual takes priority.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "As airplane weight decreases, maneuvering speed (VA)",
    "choices": [
      "increases.",
      "decreases.",
      "stays the same."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: decreases.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "Adverse yaw is",
    "choices": [
      "the nose yawing away from the direction of roll, because the lowered aileron on the rising wing creates more drag.",
      "the nose yawing into the turn from excess rudder.",
      "a result of propeller torque."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: the nose yawing away from the direction of roll, because the lowered aileron on the rising wing creates more drag.",
    "reference": "PHAK chapter 6",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "What makes an airplane turn?",
    "choices": [
      "Rudder pressure.",
      "The horizontal component of lift.",
      "Centrifugal force."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: The horizontal component of lift.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "Pitch is movement about the",
    "choices": [
      "longitudinal axis.",
      "vertical axis.",
      "lateral axis."
    ],
    "answerIndex": 2,
    "explanation": "Roll is about the longitudinal axis and yaw about the vertical axis.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "In a turn, the ball of the inclinometer is displaced toward the outside of the turn. The airplane is",
    "choices": [
      "slipping.",
      "skidding.",
      "coordinated."
    ],
    "answerIndex": 1,
    "explanation": "In a slip the ball falls to the inside of the turn.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "Wing twist (washout) is designed so that",
    "choices": [
      "the wing root stalls before the tip, keeping the ailerons effective.",
      "the wingtip stalls first.",
      "the wing produces more lift at cruise."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: the wing root stalls before the tip, keeping the ailerons effective.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-020",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "In still air, a heavier airplane compared with the same airplane at a lighter weight has",
    "choices": [
      "a much shorter glide distance.",
      "the same glide ratio, flown at a higher best-glide speed.",
      "a longer glide distance."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: the same glide ratio, flown at a higher best-glide speed.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-021",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "The positive limit load factor for a normal category airplane is",
    "choices": [
      "4.4 G.",
      "6.0 G.",
      "3.8 G."
    ],
    "answerIndex": 2,
    "explanation": "Utility category is 4.4 G and aerobatic is 6.0 G.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-022",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "At a high density altitude, compared with sea level, the airplane stalls at",
    "choices": [
      "the same indicated airspeed but a higher true airspeed.",
      "a lower indicated airspeed.",
      "a higher indicated airspeed."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: the same indicated airspeed but a higher true airspeed.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-023",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "In severe turbulence, you should slow the airplane to at or below",
    "choices": [
      "VNO.",
      "VA.",
      "VFE."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: VA.",
    "reference": "PHAK chapter 5",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-024",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "The angle of incidence is the angle between",
    "choices": [
      "the relative wind and the horizon.",
      "the chord line and the relative wind.",
      "the chord line and the airplane's longitudinal axis."
    ],
    "answerIndex": 2,
    "explanation": "The choice \"the chord line and the relative wind\" describes the angle of attack.",
    "reference": "PHAK chapter 4",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-07-025",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "aerodynamics",
    "prompt": "Loading the airplane with the CG ahead of the forward limit",
    "choices": [
      "makes the airplane unstable in pitch.",
      "makes it nose-heavy, and there may not be enough elevator authority to flare for landing.",
      "lowers the stall speed."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: makes it nose-heavy, and there may not be enough elevator authority to flare for landing.",
    "reference": "PHAK chapter 10",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "Carburetor ice is most likely when the outside air temperature is",
    "choices": [
      "below 0 degrees F in dry air.",
      "between 20 and 70 degrees F with high humidity.",
      "above 90 degrees F only."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: between 20 and 70 degrees F with high humidity.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "With a constant-speed propeller, the first sign of carburetor ice is usually",
    "choices": [
      "a drop in RPM.",
      "a rise in manifold pressure.",
      "a drop in manifold pressure."
    ],
    "answerIndex": 2,
    "explanation": "With a fixed-pitch propeller the first sign is a drop in RPM.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "Applying carburetor heat when no ice is present",
    "choices": [
      "enriches the mixture and causes a slight loss of power.",
      "leans the mixture.",
      "increases power."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: enriches the mixture and causes a slight loss of power.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "If you climb to a high altitude without leaning the mixture, it becomes",
    "choices": [
      "leaner.",
      "richer, because air density decreases while fuel flow stays the same.",
      "no different."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: richer, because air density decreases while fuel flow stays the same.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "Detonation is",
    "choices": [
      "the fuel-air charge exploding in the cylinder instead of burning evenly.",
      "the charge igniting before the spark because of a hot spot.",
      "normal combustion at high power."
    ],
    "answerIndex": 0,
    "explanation": "The choice \"the charge igniting before the spark because of a hot spot\" describes preignition.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "If you suspect detonation during a climb, you should",
    "choices": [
      "lower the nose to increase airspeed and enrich the mixture.",
      "lean the mixture.",
      "raise the nose to reduce airspeed."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: lower the nose to increase airspeed and enrich the mixture.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "If the specified grade of fuel is not available, you may use",
    "choices": [
      "the next lower grade.",
      "the next higher grade.",
      "automotive diesel."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: the next higher grade.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "An engine that keeps running after the ignition switch is turned OFF most likely has",
    "choices": [
      "fouled spark plugs.",
      "an over-rich mixture.",
      "a broken magneto ground wire."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: a broken magneto ground wire.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "The main reasons for a dual ignition system are",
    "choices": [
      "easier starting in cold weather.",
      "less carburetor icing.",
      "more complete combustion and a safety backup."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: more complete combustion and a safety backup.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "High oil temperature together with low oil pressure most likely means",
    "choices": [
      "the mixture is too rich.",
      "the oil level is too low.",
      "there is too much oil in the engine."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: the oil level is too low.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "In an airplane with a constant-speed propeller",
    "choices": [
      "the throttle sets RPM and the propeller control sets manifold pressure.",
      "the mixture control sets both.",
      "the throttle sets manifold pressure and the propeller control sets RPM."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: the throttle sets manifold pressure and the propeller control sets RPM.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "In flight, the ammeter shows a continuous discharge. You should",
    "choices": [
      "turn everything on to test the battery.",
      "assume the alternator has failed, reduce the electrical load, and plan to land as soon as practical.",
      "ignore it; the magnetos need battery power anyway."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: assume the alternator has failed, reduce the electrical load, and plan to land as soon as practical.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "100LL aviation gasoline is dyed",
    "choices": [
      "blue.",
      "green.",
      "red."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: blue.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "Filling the fuel tanks after the last flight of the day",
    "choices": [
      "prevents moisture from condensing in the tanks.",
      "keeps the fuel cool.",
      "moves the CG forward."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: prevents moisture from condensing in the tanks.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "Which instrument uses pitot (ram air) pressure?",
    "choices": [
      "The altimeter.",
      "The airspeed indicator only.",
      "The vertical speed indicator."
    ],
    "answerIndex": 1,
    "explanation": "The altimeter and vertical speed indicator use static pressure only.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "The pitot tube and its drain hole ice over while the static port stays clear. In a climb, the airspeed indicator will",
    "choices": [
      "drop to zero.",
      "decrease.",
      "increase, acting like an altimeter."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: increase, acting like an altimeter.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "If the static port becomes blocked",
    "choices": [
      "the altimeter freezes at the altitude where the blockage occurred and the vertical speed indicator reads zero.",
      "only the airspeed indicator is affected.",
      "the altimeter reads zero."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: the altimeter freezes at the altitude where the blockage occurred and the vertical speed indicator reads zero.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "Selecting the alternate static source inside an unpressurized cabin usually makes",
    "choices": [
      "the altimeter read lower than actual.",
      "the altimeter read a little higher and the airspeed indicator a little faster than actual.",
      "no difference."
    ],
    "answerIndex": 1,
    "explanation": "Cabin pressure is slightly lower than outside static pressure.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "The lower limit of the white arc on the airspeed indicator is",
    "choices": [
      "VS1.",
      "VFE.",
      "VS0."
    ],
    "answerIndex": 2,
    "explanation": "Stall speed in the landing configuration.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-020",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "The top of the green arc on the airspeed indicator is",
    "choices": [
      "VNE.",
      "VA.",
      "VNO."
    ],
    "answerIndex": 2,
    "explanation": "Maximum structural cruising speed.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-021",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "The yellow arc on the airspeed indicator is",
    "choices": [
      "the flap operating range.",
      "the caution range, to be used only in smooth air.",
      "a range that must never be entered."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: the caution range, to be used only in smooth air.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-022",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "Pressure altitude is",
    "choices": [
      "the altitude shown when the altimeter is set to 29.92.",
      "height above the ground.",
      "indicated altitude corrected for temperature."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: the altitude shown when the altimeter is set to 29.92.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-023",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "You change the altimeter setting from 30.10 to 29.80. The indicated altitude",
    "choices": [
      "decreases by 300 ft.",
      "increases by 300 ft.",
      "decreases by 30 ft."
    ],
    "answerIndex": 0,
    "explanation": "One inch of mercury equals about 1,000 ft.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-024",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "You fly from an area of high pressure into an area of low pressure without resetting the altimeter. The altimeter",
    "choices": [
      "reads lower than your true altitude.",
      "reads higher than your true altitude, so the airplane is lower than indicated.",
      "is unaffected."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: reads higher than your true altitude, so the airplane is lower than indicated.",
    "reference": "\"High to low, look out below.\" PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-025",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "When the air is colder than standard, true altitude is",
    "choices": [
      "higher than indicated altitude.",
      "the same as indicated altitude.",
      "lower than indicated altitude."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: lower than indicated altitude.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-026",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "A vacuum-driven heading indicator must be checked against the magnetic compass about every 15 minutes because of",
    "choices": [
      "magnetic dip.",
      "gyroscopic precession.",
      "variation."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: gyroscopic precession.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-027",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "In the Northern Hemisphere, accelerating on an east or west heading makes the magnetic compass indicate a turn toward the",
    "choices": [
      "south.",
      "north.",
      "east."
    ],
    "answerIndex": 1,
    "explanation": "Accelerate north, decelerate south.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-028",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "In the Northern Hemisphere, when you begin a turn from a north heading the magnetic compass",
    "choices": [
      "leads the turn.",
      "reads accurately.",
      "lags, or briefly shows a turn in the opposite direction."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: lags, or briefly shows a turn in the opposite direction.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-029",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "Magnetic variation is",
    "choices": [
      "compass error caused by the aircraft's electrical equipment.",
      "the downward pull of the compass toward the pole.",
      "the angle between true north and magnetic north."
    ],
    "answerIndex": 2,
    "explanation": "The choice \"compass error caused by the aircraft's electrical equipment\" describes deviation.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-030",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "A standard-rate turn of 360 degrees takes",
    "choices": [
      "1 minute.",
      "2 minutes.",
      "4 minutes."
    ],
    "answerIndex": 1,
    "explanation": "Three degrees per second.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-031",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "On a glass-cockpit primary flight display, failure of the attitude and heading reference system (AHRS) removes",
    "choices": [
      "airspeed and altitude.",
      "engine indications.",
      "attitude and heading."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: attitude and heading.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-032",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "Failure of the air data computer (ADC) removes",
    "choices": [
      "attitude and heading.",
      "airspeed, altitude and vertical speed.",
      "the moving map."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: airspeed, altitude and vertical speed.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-033",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "In a typical trainer with round gauges, a vacuum pump failure disables",
    "choices": [
      "the turn coordinator and airspeed indicator.",
      "the attitude indicator and heading indicator.",
      "the altimeter and vertical speed indicator."
    ],
    "answerIndex": 1,
    "explanation": "The turn coordinator is normally electric.",
    "reference": "PHAK chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-034",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "A propeller blade is twisted along its length to",
    "choices": [
      "keep a fairly uniform angle of attack from hub to tip, because the tip moves faster.",
      "reduce noise.",
      "keep the engine cool."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: keep a fairly uniform angle of attack from hub to tip, because the tip moves faster.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-08-035",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-G",
    "topic": "systems",
    "prompt": "During a climb the engine temperature is rising above normal. You should",
    "choices": [
      "steepen the climb to get to cooler air sooner.",
      "lean the mixture.",
      "reduce the rate of climb, increase airspeed and enrich the mixture."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: reduce the rate of climb, increase airspeed and enrich the mixture.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "Which combination produces the highest density altitude?",
    "choices": [
      "Low temperature, low humidity, high pressure.",
      "High temperature, low humidity, high pressure.",
      "High temperature, high humidity, low pressure."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: High temperature, high humidity, low pressure.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "Field elevation is 1,200 ft and the altimeter setting is 29.42. Pressure altitude is",
    "choices": [
      "700 ft.",
      "1,700 ft.",
      "1,250 ft."
    ],
    "answerIndex": 1,
    "explanation": "29.92 minus 29.42 is 0.50 inch, or 500 ft, added to field elevation.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "Standard temperature at 6,000 ft is",
    "choices": [
      "3 degrees C.",
      "9 degrees C.",
      "minus 3 degrees C."
    ],
    "answerIndex": 0,
    "explanation": "15 degrees C at sea level minus 2 degrees per 1,000 ft.",
    "reference": "PHAK chapter 4",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "Pressure altitude is 5,000 ft and the outside air temperature is 25 degrees C. Using 120 ft per degree above standard, density altitude is about",
    "choices": [
      "5,600 ft.",
      "6,200 ft.",
      "7,400 ft."
    ],
    "answerIndex": 2,
    "explanation": "Standard at 5,000 ft is 5 degrees C; 20 degrees above standard times 120 ft is 2,400 ft.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "Compared with sea level, a takeoff at high density altitude gives",
    "choices": [
      "a shorter takeoff roll.",
      "a longer takeoff roll and a lower rate of climb, at the same indicated rotation speed.",
      "a higher indicated rotation speed and a better climb."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: a longer takeoff roll and a lower rate of climb, at the same indicated rotation speed.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "Compared with dry air at the same temperature and pressure, humid air is",
    "choices": [
      "less dense, which reduces performance.",
      "more dense, which improves performance.",
      "no different."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: less dense, which reduces performance.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "You are landing on Runway 27 with the wind from 300 degrees at 20 knots. The crosswind component is about",
    "choices": [
      "17 knots.",
      "10 knots.",
      "20 knots."
    ],
    "answerIndex": 1,
    "explanation": "The wind is 30 degrees off the runway; 20 x 0.5.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "You are departing Runway 18 with the wind from 240 degrees at 16 knots. The components are about",
    "choices": [
      "8 knots crosswind and 14 knots headwind.",
      "16 knots crosswind and no headwind.",
      "14 knots crosswind and 8 knots headwind."
    ],
    "answerIndex": 2,
    "explanation": "The wind is 60 degrees off the runway; 16 x 0.87 and 16 x 0.5.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "VX gives",
    "choices": [
      "the greatest gain in altitude over the shortest horizontal distance.",
      "the greatest gain in altitude in the shortest time.",
      "the greatest glide distance."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: the greatest gain in altitude over the shortest horizontal distance.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "VY gives",
    "choices": [
      "the steepest climb angle.",
      "the greatest gain in altitude in a given time.",
      "the best fuel economy."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: the greatest gain in altitude in a given time.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "Which combination gives the longest takeoff roll?",
    "choices": [
      "A headwind and a downhill runway.",
      "A headwind and low density altitude.",
      "A tailwind, an uphill runway and high density altitude."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: A tailwind, an uphill runway and high density altitude.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "Empty weight is 1,500 lb at arm 38.0 in. Front seats carry 340 lb at arm 36.0. The rear seat carries 150 lb at arm 72.0. Fuel is 40 gallons at arm 48.0. The loaded CG is at",
    "choices": [
      "39.8 in.",
      "41.1 in.",
      "43.2 in."
    ],
    "answerIndex": 1,
    "explanation": "Total weight 2,230 lb (fuel 240 lb); total moment 91,560; 91,560 divided by 2,230 is 41.06.",
    "reference": "PHAK chapter 10",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "38 gallons of aviation gasoline weighs",
    "choices": [
      "228 lb.",
      "266 lb.",
      "304 lb."
    ],
    "answerIndex": 0,
    "explanation": "Avgas weighs 6 lb per gallon.",
    "reference": "PHAK chapter 10",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "An airplane weighs 3,000 lb. You move 100 lb of baggage from station 150 to station 60. The CG moves",
    "choices": [
      "1.5 in. forward.",
      "3.0 in. aft.",
      "3.0 in. forward."
    ],
    "answerIndex": 2,
    "explanation": "Weight moved times distance, divided by total weight: 100 x 90 / 3,000.",
    "reference": "PHAK chapter 10",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "An airplane loaded above its maximum gross weight will have",
    "choices": [
      "a lower stall speed and a shorter takeoff roll.",
      "a higher stall speed, a longer takeoff roll and a lower rate of climb.",
      "better stability and a longer range."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: a higher stall speed, a longer takeoff roll and a lower rate of climb.",
    "reference": "PHAK chapter 10",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "Maximum takeoff weight is 2,550 lb and basic empty weight is 1,650 lb. With 53 gallons of usable fuel on board, the weight left for people and baggage is",
    "choices": [
      "582 lb.",
      "900 lb.",
      "635 lb."
    ],
    "answerIndex": 0,
    "explanation": "Useful load is 900 lb; 53 gallons weighs 318 lb.",
    "reference": "PHAK chapter 10",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "When landing at a high-elevation airport, you should fly",
    "choices": [
      "a higher indicated approach speed than at sea level.",
      "a lower indicated approach speed than at sea level.",
      "the same indicated approach speed, expecting a higher groundspeed and a longer landing roll."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: the same indicated approach speed, expecting a higher groundspeed and a longer landing roll.",
    "reference": "PHAK chapter 11",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "Fuel burn is 8.5 gallons per hour. For a 2 hour 30 minute day VFR flight with the legal reserve, you need at least",
    "choices": [
      "21.3 gallons.",
      "25.5 gallons.",
      "29.8 gallons."
    ],
    "answerIndex": 1,
    "explanation": "Three hours at 8.5 gallons per hour, including the 30-minute day reserve.",
    "reference": "14 CFR 91.151",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-09-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "prompt": "Basic empty weight includes",
    "choices": [
      "the airframe, engine and usable fuel.",
      "the pilot and full fuel.",
      "the airframe, engine, fixed equipment, unusable fuel and full operating fluids including oil."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: the airframe, engine, fixed equipment, unusable fuel and full operating fluids including oil.",
    "reference": "PHAK chapter 10",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-001",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "One minute of latitude equals",
    "choices": [
      "1 statute mile.",
      "1 nautical mile.",
      "60 nautical miles."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 1 nautical mile.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-002",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "You plan to depart at 0930 Pacific Daylight Time. The departure time in UTC is",
    "choices": [
      "1630Z.",
      "1730Z.",
      "0230Z."
    ],
    "answerIndex": 0,
    "explanation": "Pacific Daylight Time is UTC minus 7 hours.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-003",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "You depart at 1400 Central Standard Time and fly for 2 hours to an airport in the Eastern Standard Time zone. You land at",
    "choices": [
      "1600 EST.",
      "1500 EST.",
      "1700 EST."
    ],
    "answerIndex": 2,
    "explanation": "1400 CST is 2000Z; two hours later is 2200Z, which is 1700 EST.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-004",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "True course is 090 degrees and variation is 13 degrees east. Magnetic course is",
    "choices": [
      "103 degrees.",
      "077 degrees.",
      "090 degrees."
    ],
    "answerIndex": 1,
    "explanation": "Subtract easterly variation.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-005",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "True course is 135 degrees, wind correction is 5 degrees right, variation is 10 degrees west and deviation is minus 2 degrees. Compass heading is",
    "choices": [
      "148 degrees.",
      "128 degrees.",
      "152 degrees."
    ],
    "answerIndex": 0,
    "explanation": "135 plus 5 is 140 true heading; plus 10 west is 150 magnetic; minus 2 is 148.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-006",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "Isogonic lines on a chart connect points of",
    "choices": [
      "equal elevation.",
      "zero variation.",
      "equal magnetic variation."
    ],
    "answerIndex": 2,
    "explanation": "The agonic line is the line of zero variation.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-007",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "The scale of a sectional chart is",
    "choices": [
      "1:250,000.",
      "1:500,000.",
      "1:1,000,000."
    ],
    "answerIndex": 1,
    "explanation": "Aeronautical Chart Users' Guide.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-008",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "On a sectional chart, airports with control towers are shown in",
    "choices": [
      "blue.",
      "magenta.",
      "black."
    ],
    "answerIndex": 0,
    "explanation": "Aeronautical Chart Users' Guide.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-009",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "Airport data on a sectional reads \"1250 L 46 122.8.\" The 46 means",
    "choices": [
      "the field elevation is 46 ft.",
      "the runways are 4 and 6.",
      "the longest runway is 4,600 ft."
    ],
    "answerIndex": 2,
    "explanation": "1250 is elevation, L is lighting, 122.8 is the common traffic advisory frequency. Aeronautical Chart Users' Guide.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-010",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "A large 4 followed by a smaller raised 5 in a chart quadrangle is the maximum elevation figure. It means",
    "choices": [
      "450 ft AGL.",
      "4,500 ft MSL.",
      "45,000 ft MSL."
    ],
    "answerIndex": 1,
    "explanation": "Aeronautical Chart Users' Guide.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-011",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "Next to an obstruction symbol the chart shows 1549 with (354) beneath it. The top of the obstruction is",
    "choices": [
      "1,549 ft MSL and 354 ft AGL.",
      "354 ft MSL and 1,549 ft AGL.",
      "1,549 ft AGL, with lighting at 354 ft."
    ],
    "answerIndex": 0,
    "explanation": "Aeronautical Chart Users' Guide.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-012",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "VOR radials are",
    "choices": [
      "true bearings to the station.",
      "magnetic courses to the station.",
      "magnetic courses from the station."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: magnetic courses from the station.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-013",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "To fly inbound to a VOR on the 180 radial, set the OBS to",
    "choices": [
      "180 with a TO indication.",
      "360 with a TO indication.",
      "360 with a FROM indication."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 360 with a TO indication.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-014",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "The OBS is set to 090 with a FROM indication and the CDI needle is deflected to the left. The aircraft is",
    "choices": [
      "southeast of the station.",
      "northeast of the station.",
      "southwest of the station."
    ],
    "answerIndex": 0,
    "explanation": "FROM on 090 puts the aircraft east of the station; a left needle means the 090 radial lies to the north.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-015",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "Full-scale deflection of a VOR course deviation indicator means the aircraft is off course by",
    "choices": [
      "5 degrees.",
      "20 degrees.",
      "10 degrees or more."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: 10 degrees or more.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-016",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "Receiver autonomous integrity monitoring (RAIM) needs at least",
    "choices": [
      "3 satellites.",
      "5 satellites, or 4 with barometric aiding.",
      "8 satellites."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 5 satellites, or 4 with barometric aiding.",
    "reference": "AIM 1-1-17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-017",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "At a groundspeed of 120 knots, 45 NM takes",
    "choices": [
      "22.5 minutes.",
      "27 minutes.",
      "37.5 minutes."
    ],
    "answerIndex": 0,
    "explanation": "45 divided by 120, times 60.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-018",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "You cover 12 NM between two checkpoints in 6 minutes. Your groundspeed is",
    "choices": [
      "100 knots.",
      "110 knots.",
      "120 knots."
    ],
    "answerIndex": 2,
    "explanation": "12 NM in one tenth of an hour.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-019",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "If a VFR flight plan is not closed, search and rescue procedures begin",
    "choices": [
      "15 minutes after the estimated time of arrival.",
      "30 minutes after the estimated time of arrival.",
      "1 hour after the estimated time of arrival."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 30 minutes after the estimated time of arrival.",
    "reference": "AIM chapter 5, section 1 (closing VFR flight plans)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-020",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "You land at a towered airport at the end of a VFR flight plan. The flight plan",
    "choices": [
      "stays open until you close it with Flight Service.",
      "is closed automatically by the tower.",
      "expires when you leave the runway."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: stays open until you close it with Flight Service.",
    "reference": "AIM chapter 5, section 1 (closing VFR flight plans)",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-021",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "VFR flight following provides",
    "choices": [
      "guaranteed separation from all traffic.",
      "terrain clearance.",
      "traffic advisories when controller workload permits; you remain responsible for seeing and avoiding traffic and terrain."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: traffic advisories when controller workload permits; you remain responsible for seeing and avoiding traffic and terrain.",
    "reference": "AIM 4-1-15",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-022",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "You are unsure of your position on a cross-country. A sound first response is to",
    "choices": [
      "descend for a closer look at the ground.",
      "climb if conditions allow, contact ATC or Flight Service for help, and conserve fuel.",
      "keep flying the same heading at full power."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: climb if conditions allow, contact ATC or Flight Service for help, and conserve fuel.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-023",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "Sectional charts and the Chart Supplement are revised every",
    "choices": [
      "56 days.",
      "6 months.",
      "12 months."
    ],
    "answerIndex": 0,
    "explanation": "Sectionals moved to a 56-day cycle in 2021.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-024",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "FDC NOTAMs contain",
    "choices": [
      "local fuel prices and services.",
      "only runway closures.",
      "regulatory information such as temporary flight restrictions and changes to charts and procedures."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: regulatory information such as temporary flight restrictions and changes to charts and procedures.",
    "reference": "AIM 5-1-3",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-025",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "Pilotage is navigation by",
    "choices": [
      "calculations of time, speed, distance and direction.",
      "reference to visible landmarks.",
      "radio navigation aids."
    ],
    "answerIndex": 1,
    "explanation": "The choice \"calculations of time, speed, distance and direction\" describes dead reckoning.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-026",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "When you must divert to an alternate airport, you should first",
    "choices": [
      "turn to an approximate heading, then work out the exact heading, time and fuel.",
      "complete all calculations before changing heading.",
      "climb to the highest available altitude."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: turn to an approximate heading, then work out the exact heading, time and fuel.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-027",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "Your true course is 360 degrees and the wind is from 270 degrees. To hold the course, your heading must be",
    "choices": [
      "east of north.",
      "exactly north.",
      "west of north."
    ],
    "answerIndex": 2,
    "explanation": "A wind from the left requires a correction to the left.",
    "reference": "PHAK chapter 16",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-10-028",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "prompt": "Tick marks around an airport symbol on a sectional chart mean",
    "choices": [
      "the airport has a control tower.",
      "fuel is available and the field is attended during normal working hours.",
      "the runway is lighted."
    ],
    "answerIndex": 1,
    "explanation": "Aeronautical Chart Users' Guide.",
    "reference": "See answer explanation",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "Hypoxic hypoxia is caused by",
    "choices": [
      "carbon monoxide in the blood.",
      "reduced oxygen pressure at altitude.",
      "alcohol or drugs."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: reduced oxygen pressure at altitude.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "Carbon monoxide poisoning is a form of",
    "choices": [
      "hypemic hypoxia, because the blood cannot carry enough oxygen.",
      "stagnant hypoxia.",
      "histotoxic hypoxia."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: hypemic hypoxia, because the blood cannot carry enough oxygen.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "The most likely source of carbon monoxide in a light airplane cabin is",
    "choices": [
      "the fuel vents.",
      "the battery.",
      "an exhaust leak into the cabin heater."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: an exhaust leak into the cabin heater.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "Hypoxia is especially dangerous because",
    "choices": [
      "it is painful.",
      "early symptoms such as euphoria and impaired judgment are hard to recognize in yourself.",
      "it only occurs above 18,000 ft."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: early symptoms such as euphoria and impaired judgment are hard to recognize in yourself.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "Hyperventilation is caused by",
    "choices": [
      "breathing too fast or too deeply, often from stress, which removes too much carbon dioxide.",
      "a lack of oxygen at altitude.",
      "carbon monoxide."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: breathing too fast or too deeply, often from stress, which removes too much carbon dioxide.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "If you become disoriented after flying into cloud, you should",
    "choices": [
      "trust the sensations from your body.",
      "look outside for the horizon.",
      "rely on the flight instruments."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: rely on the flight instruments.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "A rapid acceleration on takeoff in poor visibility can create the illusion of",
    "choices": [
      "a nose-up attitude, tempting the pilot to push the nose down.",
      "a nose-down attitude.",
      "a turn to the left."
    ],
    "answerIndex": 0,
    "explanation": "Somatogravic illusion.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "The Coriolis illusion is caused by",
    "choices": [
      "staring at a single light.",
      "an abrupt head movement during a prolonged constant-rate turn.",
      "a sloping cloud bank."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: an abrupt head movement during a prolonged constant-rate turn.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "On approach to a runway that is narrower than you are used to, you will tend to",
    "choices": [
      "feel lower than you are and fly a high approach.",
      "feel no different.",
      "feel higher than you are and fly a low approach."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: feel higher than you are and fly a low approach.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "On approach to an upsloping runway, you will tend to",
    "choices": [
      "feel lower than you are.",
      "feel higher than you are and fly a low approach.",
      "land long."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: feel higher than you are and fly a low approach.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "Autokinesis is",
    "choices": [
      "the apparent movement of a stationary light stared at in the dark.",
      "a false horizon from sloping clouds.",
      "a flicker effect from the propeller."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: the apparent movement of a stationary light stared at in the dark.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "To see a dim object at night, you should",
    "choices": [
      "look directly at it.",
      "close one eye.",
      "look slightly to one side of it."
    ],
    "answerIndex": 2,
    "explanation": "Off-center viewing uses the rods.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "Full dark adaptation of the eyes takes about",
    "choices": [
      "5 minutes.",
      "30 minutes.",
      "2 hours."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: 30 minutes.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "Another aircraft is on a collision course with you if it",
    "choices": [
      "shows no relative motion in the windscreen and grows larger.",
      "moves steadily across the windscreen.",
      "appears to climb."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: shows no relative motion in the windscreen and grows larger.",
    "reference": "PHAK chapter 17; AIM chapter 8",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "After a scuba dive that required decompression stops, you should wait before flying at least",
    "choices": [
      "4 hours.",
      "12 hours.",
      "24 hours."
    ],
    "answerIndex": 2,
    "explanation": "After a dive with no decompression stops, wait 12 hours before flying up to 8,000 ft.",
    "reference": "AIM 8-1-2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "\"It won't happen to me\" is the hazardous attitude called",
    "choices": [
      "macho.",
      "invulnerability.",
      "resignation."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: invulnerability.",
    "reference": "PHAK chapter 2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "The antidote for the macho attitude is",
    "choices": [
      "\"Taking chances is foolish.\"",
      "\"Follow the rules; they are usually right.\"",
      "\"Not so fast. Think first.\""
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: \"Taking chances is foolish.\".",
    "reference": "PHAK chapter 2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "The antidote for resignation (\"What's the use?\") is",
    "choices": [
      "\"It could happen to me.\"",
      "\"Follow the rules; they are usually right.\"",
      "\"I'm not helpless. I can make a difference.\""
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: \"I'm not helpless. I can make a difference.\".",
    "reference": "PHAK chapter 2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "The PAVE checklist stands for",
    "choices": [
      "Plan, Airspeed, Visibility, Emergency.",
      "Pilot, Aircraft, enVironment, External pressures.",
      "Passengers, Altitude, Vectors, Engine."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: Pilot, Aircraft, enVironment, External pressures.",
    "reference": "PHAK chapter 2; Risk Management Handbook",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-020",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "In the IMSAFE checklist, the S stands for",
    "choices": [
      "stress.",
      "sleep.",
      "safety."
    ],
    "answerIndex": 0,
    "explanation": "Illness, Medication, Stress, Alcohol, Fatigue, Emotion.",
    "reference": "PHAK chapter 2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-021",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "A passenger who insists on reaching a meeting on time is an example of",
    "choices": [
      "an aircraft risk.",
      "an environmental risk.",
      "an external pressure."
    ],
    "answerIndex": 2,
    "explanation": "The E in PAVE.",
    "reference": "Risk Management Handbook",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-022",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "The first step in the DECIDE model is to",
    "choices": [
      "do the necessary action.",
      "detect that a change has occurred.",
      "evaluate the result."
    ],
    "answerIndex": 1,
    "explanation": "Detect, Estimate, Choose, Identify, Do, Evaluate.",
    "reference": "PHAK chapter 2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-023",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "Descending with a head cold is likely to cause",
    "choices": [
      "ear or sinus block and pain, because pressure cannot equalize.",
      "hypoxia.",
      "hyperventilation."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: ear or sinus block and pain, because pressure cannot equalize.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-024",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "The autopilot or GPS is doing something you do not understand. The best response is to",
    "choices": [
      "keep reprogramming until it works.",
      "watch and see what it does next.",
      "drop to a lower level of automation or hand-fly, then sort it out."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: drop to a lower level of automation or hand-fly, then sort it out.",
    "reference": "PHAK chapter 2, automation management",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-11-025",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-H",
    "topic": "aeromedical",
    "prompt": "In haze, objects and the runway appear",
    "choices": [
      "closer than they are.",
      "farther away than they are, which leads to a low approach.",
      "unchanged."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: farther away than they are, which leads to a low approach.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-001",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "The engine fails in cruise flight. Your first action is to",
    "choices": [
      "attempt a restart.",
      "establish best glide speed.",
      "make a mayday call."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: establish best glide speed.",
    "reference": "Airplane Flying Handbook, emergency procedures chapter",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-002",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "The engine fails just after takeoff, below a safe turning altitude. You should",
    "choices": [
      "turn back to the runway.",
      "pull up to gain altitude.",
      "land generally straight ahead, turning only enough to avoid obstacles."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: land generally straight ahead, turning only enough to avoid obstacles.",
    "reference": "Airplane Flying Handbook, emergency procedures chapter",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-003",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "An emergency locator transmitter may be tested",
    "choices": [
      "only during the first 5 minutes after the hour, for no more than three audible sweeps.",
      "at any time for up to one minute.",
      "only by a certificated mechanic."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: only during the first 5 minutes after the hour, for no more than three audible sweeps.",
    "reference": "AIM 6-2-4",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-004",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "The radio call \"pan-pan\" indicates",
    "choices": [
      "a distress condition.",
      "an urgency condition.",
      "a radio check."
    ],
    "answerIndex": 1,
    "explanation": "Mayday is for distress.",
    "reference": "AIM 6-3-1",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-005",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "The transponder code for an emergency is",
    "choices": [
      "1200.",
      "7600.",
      "7700."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: 7700.",
    "reference": "AIM 6-2-2",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-006",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "A pilot without an instrument rating flies into cloud by accident. The best response is to",
    "choices": [
      "keep control by reference to the instruments and make a shallow 180-degree turn.",
      "climb through the cloud.",
      "descend quickly until the ground is visible."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: keep control by reference to the instruments and make a shallow 180-degree turn.",
    "reference": "Airplane Flying Handbook, emergency procedures chapter",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-007",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "You smell burning insulation in flight. You should first",
    "choices": [
      "open all the vents and continue.",
      "turn off the master switch, then follow the electrical fire checklist.",
      "switch on more equipment to find the fault."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: turn off the master switch, then follow the electrical fire checklist.",
    "reference": "Airplane Flying Handbook, emergency procedures chapter; aircraft checklist",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-008",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "The first step for an engine fire in flight is to",
    "choices": [
      "increase power to blow the fire out.",
      "open the cabin heat.",
      "shut off the fuel supply with the mixture and fuel selector."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: shut off the fuel supply with the mixture and fuel selector.",
    "reference": "Airplane Flying Handbook, emergency procedures chapter; aircraft checklist",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-009",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "At night you see the red and green position lights of another aircraft at your altitude, with no white light. The aircraft is",
    "choices": [
      "approaching head-on; alter course to the right.",
      "flying away from you.",
      "crossing from left to right."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: approaching head-on; alter course to the right.",
    "reference": "14 CFR 91.113; Airplane Flying Handbook, night operations chapter",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-010",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "At night you see a steady red light and a flashing red beacon ahead at your altitude. The other aircraft is",
    "choices": [
      "flying away from you.",
      "crossing from your right to your left.",
      "crossing from your left to your right."
    ],
    "answerIndex": 1,
    "explanation": "You are seeing its left wingtip light. An aircraft on your right has the right-of-way.",
    "reference": "14 CFR 91.113",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-011",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "Fuel is low, the weather is closing in, and no airport is within reach. The best choice is to",
    "choices": [
      "continue and hope conditions improve.",
      "climb above the weather.",
      "make a precautionary landing while engine power is still available."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: make a precautionary landing while engine power is still available.",
    "reference": "Airplane Flying Handbook, emergency procedures chapter",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-012",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "A cabin door pops open during the takeoff climb. You should",
    "choices": [
      "keep flying the airplane, fly a normal pattern and land.",
      "let go of the controls and close the door immediately.",
      "turn back at once at low altitude."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: keep flying the airplane, fly a normal pattern and land.",
    "reference": "Airplane Flying Handbook, emergency procedures chapter",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-013",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "A carbureted engine starts running rough and losing power in visible moisture. You should first",
    "choices": [
      "lean the mixture fully.",
      "apply full carburetor heat.",
      "switch off one magneto."
    ],
    "answerIndex": 1,
    "explanation": "The correct answer is: apply full carburetor heat.",
    "reference": "PHAK chapter 7",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-014",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "You encounter icing in an airplane that is not approved for it. You should",
    "choices": [
      "continue at the same altitude.",
      "slow to stall speed to reduce ice build-up.",
      "leave the icing conditions immediately by turning back or changing altitude."
    ],
    "answerIndex": 2,
    "explanation": "The correct answer is: leave the icing conditions immediately by turning back or changing altitude.",
    "reference": "Aviation Weather Handbook, icing chapter",
    "kind": "mc",
    "difficulty": 2
  },
  {
    "id": "ppl-pb-12-015",
    "rating": "ppl",
    "areaId": "ppl-IX",
    "taskId": "ppl-IX-C",
    "topic": "emergencies",
    "prompt": "On a night approach over dark, featureless terrain, pilots tend to",
    "choices": [
      "fly lower than a normal approach, so use the VASI or PAPI.",
      "fly higher than normal.",
      "see the runway as closer than it is."
    ],
    "answerIndex": 0,
    "explanation": "The correct answer is: fly lower than a normal approach, so use the VASI or PAPI.",
    "reference": "PHAK chapter 17",
    "kind": "mc",
    "difficulty": 2
  }
];
