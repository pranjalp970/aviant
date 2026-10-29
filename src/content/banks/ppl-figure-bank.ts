// Figure-based and calculation questions for the Private Pilot (PAR) knowledge test.
// Figures come from the FAA Airman Knowledge Testing Supplement FAA-CT-8080-2H (effective June 11, 2018):
// PNG exports in assets/figures/, served as WebP from public/figures/ (see scripts/build-figures.mjs).
// Original questions; sources and checks are in docs/figure-bank-notes.md.
// Answer order is shuffled at quiz time, so explanations never refer to choice letters.

import type { McQuestion } from "../types";

export const PPL_FIGURE_BANK: McQuestion[] = [
  {
    "id": "ppl-fig-navigation-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 20, area 1.) What is the control tower frequency for Norfolk International?",
    "choices": [
      "127.15 MHz",
      "120.8 MHz",
      "125.7 MHz"
    ],
    "answerIndex": 1,
    "explanation": "The airport data block shows \"CT - 120.8,\" which is the tower frequency. 127.15 is the ATIS frequency and 125.7 is Norfolk Approach.",
    "reference": "FAA-CT-8080-2H Figure 20; FAA Aeronautical Chart User's Guide",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-20.webp",
      "label": "Figure 20",
      "alt": "Sectional chart excerpt of the Norfolk, Virginia area: Norfolk Class C airspace, Elizabeth City and Newport News, with numbered areas 1 through 7.",
      "width": 1330,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-airspace-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "kind": "mc",
    "prompt": "(Refer to Figure 20, area 1.) What are the vertical limits of the Class C surface area around Norfolk International?",
    "choices": [
      "Surface to 4,000 feet MSL",
      "1,200 feet MSL to 4,000 feet MSL",
      "Surface to 4,000 feet AGL"
    ],
    "answerIndex": 0,
    "explanation": "The inner circle is labeled 40 over SFC: the surface area extends from the surface to 4,000 feet MSL. Class C altitudes on sectional charts are MSL, and the 12 and 20 floors belong to the outer shelf.",
    "reference": "FAA-CT-8080-2H Figure 20; AIM 3-2-4",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-20.webp",
      "label": "Figure 20",
      "alt": "Sectional chart excerpt of the Norfolk, Virginia area: Norfolk Class C airspace, Elizabeth City and Newport News, with numbered areas 1 through 7.",
      "width": 1330,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-airspace-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "kind": "mc",
    "prompt": "(Refer to Figure 20, area 3.) The Class D airspace at Elizabeth City CGAS/Regional extends from the surface up to and including",
    "choices": [
      "2,500 feet AGL",
      "3,000 feet MSL",
      "2,500 feet MSL"
    ],
    "answerIndex": 2,
    "explanation": "The dashed-box number [25] gives the Class D ceiling in hundreds of feet MSL, so the top is 2,500 feet MSL.",
    "reference": "FAA-CT-8080-2H Figure 20; AIM 3-2-5",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-20.webp",
      "label": "Figure 20",
      "alt": "Sectional chart excerpt of the Norfolk, Virginia area: Norfolk Class C airspace, Elizabeth City and Newport News, with numbered areas 1 through 7.",
      "width": 1330,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-navigation-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 20, area 4.) Which frequency provides automated weather at Northeastern Regional (EDE)?",
    "choices": [
      "121.125 MHz",
      "123.0 MHz",
      "122.9 MHz"
    ],
    "answerIndex": 0,
    "explanation": "The data block lists \"AWOS-3 121.125.\" 123.0 is the CTAF, shown with the circled C.",
    "reference": "FAA-CT-8080-2H Figure 20; FAA Aeronautical Chart User's Guide",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-20.webp",
      "label": "Figure 20",
      "alt": "Sectional chart excerpt of the Norfolk, Virginia area: Norfolk Class C airspace, Elizabeth City and Newport News, with numbered areas 1 through 7.",
      "width": 1330,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-navigation-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 20, area 3.) What hazard is charted near Weeksville, southeast of Elizabeth City?",
    "choices": [
      "A restricted area from the surface to 3,008 feet MSL",
      "An unmarked balloon on a cable up to 3,008 feet MSL",
      "A parachute jumping area up to 3,008 feet AGL"
    ],
    "answerIndex": 1,
    "explanation": "A boxed caution note warns of an unmarked balloon on a cable to 3,008 feet MSL. Tethered balloon cables are hard to see, so pilots should check NOTAMs and stay well clear.",
    "reference": "FAA-CT-8080-2H Figure 20; FAA Aeronautical Chart User's Guide",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-20.webp",
      "label": "Figure 20",
      "alt": "Sectional chart excerpt of the Norfolk, Virginia area: Norfolk Class C airspace, Elizabeth City and Newport News, with numbered areas 1 through 7.",
      "width": 1330,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-navigation-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 20, area 6.) Area 6 lies next to the Back Bay and Mackay Island National Wildlife Refuges. What minimum altitude are pilots requested to maintain over these refuges?",
    "choices": [
      "1,000 feet AGL",
      "500 feet AGL",
      "2,000 feet AGL"
    ],
    "answerIndex": 2,
    "explanation": "Pilots are requested to maintain at least 2,000 feet above the surface over charted national wildlife refuges, parks and wilderness areas.",
    "reference": "FAA-CT-8080-2H Figure 20; AIM 7-4-6",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-20.webp",
      "label": "Figure 20",
      "alt": "Sectional chart excerpt of the Norfolk, Virginia area: Norfolk Class C airspace, Elizabeth City and Newport News, with numbered areas 1 through 7.",
      "width": 1330,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-airspace-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "kind": "mc",
    "prompt": "(Refer to Figure 21.) What is the ceiling of the Class D airspace at Minot International (MOT)?",
    "choices": [
      "4,200 feet MSL",
      "4,200 feet AGL",
      "2,500 feet MSL"
    ],
    "answerIndex": 0,
    "explanation": "The dashed box [42] gives the Class D ceiling in hundreds of feet MSL: 4,200 feet MSL, about 2,500 feet above the 1,716-foot field elevation.",
    "reference": "FAA-CT-8080-2H Figure 21; AIM 3-2-5",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-21.webp",
      "label": "Figure 21",
      "alt": "Sectional chart excerpt of the Minot, North Dakota area: Minot International Class D airspace, Garrison airport, obstructions and Devils Lake West MOA, with numbered areas.",
      "width": 1331,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-navigation-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 21.) What frequency should be used to contact Minot tower?",
    "choices": [
      "118.725 MHz",
      "118.2 MHz",
      "122.95 MHz"
    ],
    "answerIndex": 1,
    "explanation": "\"CT - 118.2\" is the control tower frequency. 118.725 is the ASOS frequency and 122.95 is UNICOM.",
    "reference": "FAA-CT-8080-2H Figure 21",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-21.webp",
      "label": "Figure 21",
      "alt": "Sectional chart excerpt of the Minot, North Dakota area: Minot International Class D airspace, Garrison airport, obstructions and Devils Lake West MOA, with numbered areas.",
      "width": 1331,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-navigation-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 21, area 2.) What is the maximum elevation figure (MEF) for the quadrant containing area 2?",
    "choices": [
      "2,600 feet MSL",
      "2,264 feet MSL",
      "2,800 feet MSL"
    ],
    "answerIndex": 2,
    "explanation": "The large blue 2 with a small 8 in that latitude/longitude quadrant means an MEF of 2,800 feet MSL. 2,264 is a single obstruction, and the 26 belongs to the quadrant to the east.",
    "reference": "FAA-CT-8080-2H Figure 21; FAA Aeronautical Chart User's Guide",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-21.webp",
      "label": "Figure 21",
      "alt": "Sectional chart excerpt of the Minot, North Dakota area: Minot International Class D airspace, Garrison airport, obstructions and Devils Lake West MOA, with numbered areas.",
      "width": 1331,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-navigation-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 21.) What is the elevation of Garrison Airport (D05), west of area 2?",
    "choices": [
      "1,937 feet MSL",
      "3,700 feet MSL",
      "2,206 feet MSL"
    ],
    "answerIndex": 0,
    "explanation": "The first number in the data block, 1937, is the field elevation in feet MSL. The 37 after the L is the longest runway (3,700 feet), and 2,206 is a nearby obstruction.",
    "reference": "FAA-CT-8080-2H Figure 21",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-21.webp",
      "label": "Figure 21",
      "alt": "Sectional chart excerpt of the Minot, North Dakota area: Minot International Class D airspace, Garrison airport, obstructions and Devils Lake West MOA, with numbered areas.",
      "width": 1331,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-navigation-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 21.) An obstruction south-southwest of Minot is labeled 3149 with (1031) below it. How tall is it above the ground?",
    "choices": [
      "3,149 feet",
      "1,031 feet",
      "2,118 feet"
    ],
    "answerIndex": 1,
    "explanation": "The upper number is the top of the obstruction in feet MSL and the number in parentheses is its height above ground, so it is 1,031 feet AGL.",
    "reference": "FAA-CT-8080-2H Figure 21; FAA Aeronautical Chart User's Guide",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-21.webp",
      "label": "Figure 21",
      "alt": "Sectional chart excerpt of the Minot, North Dakota area: Minot International Class D airspace, Garrison airport, obstructions and Devils Lake West MOA, with numbered areas.",
      "width": 1331,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-navigation-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 22, area 1.) What is the maximum elevation figure for the quadrant containing area 1?",
    "choices": [
      "7,100 feet MSL",
      "6,389 feet MSL",
      "4,960 feet MSL"
    ],
    "answerIndex": 0,
    "explanation": "The MEF printed in that quadrant is a large 7 with a small 1, meaning 7,100 feet MSL. 6,389 and 4,960 are spot elevations, not the MEF.",
    "reference": "FAA-CT-8080-2H Figure 22; FAA Aeronautical Chart User's Guide",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-22.webp",
      "label": "Figure 22",
      "alt": "Sectional chart excerpt of northern Idaho: Sandpoint, Priest River and Coeur d'Alene airports, Lake Pend Oreille and maximum elevation figures, with numbered areas.",
      "width": 1331,
      "height": 1752
    }
  },
  {
    "id": "ppl-fig-navigation-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 22.) What is the CTAF at Coeur d'Alene-Boyington (COE)?",
    "choices": [
      "135.075 MHz",
      "122.8 MHz",
      "122.05 MHz"
    ],
    "answerIndex": 1,
    "explanation": "In the data block, 122.8 is followed by the circled C, which marks the CTAF. 135.075 is the AWOS-3, and 122.05 is the flight service frequency on the Coeur d'Alene VOR-DME box.",
    "reference": "FAA-CT-8080-2H Figure 22",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-22.webp",
      "label": "Figure 22",
      "alt": "Sectional chart excerpt of northern Idaho: Sandpoint, Priest River and Coeur d'Alene airports, Lake Pend Oreille and maximum elevation figures, with numbered areas.",
      "width": 1331,
      "height": 1752
    }
  },
  {
    "id": "ppl-fig-navigation-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 22.) What is the field elevation of Sandpoint Airport (SZT)?",
    "choices": [
      "5,500 feet MSL",
      "2,386 feet MSL",
      "2,131 feet MSL"
    ],
    "answerIndex": 2,
    "explanation": "The data block reads \"2131 *L 55 122.7\": 2,131 feet MSL is the elevation, and 55 is the longest runway length in hundreds of feet.",
    "reference": "FAA-CT-8080-2H Figure 22",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-22.webp",
      "label": "Figure 22",
      "alt": "Sectional chart excerpt of northern Idaho: Sandpoint, Priest River and Coeur d'Alene airports, Lake Pend Oreille and maximum elevation figures, with numbered areas.",
      "width": 1331,
      "height": 1752
    }
  },
  {
    "id": "ppl-fig-navigation-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 22.) The Priest River (1S6) data block shows \"*L.\" What does the asterisk mean?",
    "choices": [
      "Lighting limitations exist; refer to the Chart Supplement",
      "The runway lights operate from dusk to dawn",
      "The lights are pilot-controlled on the CTAF"
    ],
    "answerIndex": 0,
    "explanation": "An asterisk before the L means lighting limitations exist, such as part-time or pilot-controlled lighting. The Chart Supplement gives the details.",
    "reference": "FAA-CT-8080-2H Figure 22; FAA Aeronautical Chart User's Guide",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-22.webp",
      "label": "Figure 22",
      "alt": "Sectional chart excerpt of northern Idaho: Sandpoint, Priest River and Coeur d'Alene airports, Lake Pend Oreille and maximum elevation figures, with numbered areas.",
      "width": 1331,
      "height": 1752
    }
  },
  {
    "id": "ppl-fig-airspace-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "kind": "mc",
    "prompt": "(Refer to Figure 23.) The military training route VR97-1059 crosses the chart near Hiltonia. What do the four digits in \"1059\" indicate?",
    "choices": [
      "The route is flown above 1,500 feet AGL",
      "The route is flown at or below 1,500 feet AGL",
      "The route is flown at or below 1,059 feet MSL"
    ],
    "answerIndex": 1,
    "explanation": "Military training routes with four-digit numbers have no segment above 1,500 feet AGL. Routes with three-digit numbers have at least one segment above 1,500 feet AGL.",
    "reference": "FAA-CT-8080-2H Figure 23; AIM 3-5-2",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-23.webp",
      "label": "Figure 23",
      "alt": "Sectional chart excerpt of eastern Georgia: Bulldog MOAs, military training routes, and Plantation, Statesboro, Millen and Allendale airports, with numbered areas.",
      "width": 1330,
      "height": 1752
    }
  },
  {
    "id": "ppl-fig-airspace-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "kind": "mc",
    "prompt": "(Refer to Figure 23.) Which airspace is excluded from the Bulldog C MOA?",
    "choices": [
      "Airspace within 5 NM of Sylvania",
      "Airspace above 10,000 feet MSL",
      "Airspace at and below 1,500 feet AGL"
    ],
    "answerIndex": 2,
    "explanation": "The chart note says the Bulldog C MOA \"excludes airspace 1500' AGL and below,\" so the MOA begins above 1,500 feet AGL.",
    "reference": "FAA-CT-8080-2H Figure 23; AIM 3-4-5",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-23.webp",
      "label": "Figure 23",
      "alt": "Sectional chart excerpt of eastern Georgia: Bulldog MOAs, military training routes, and Plantation, Statesboro, Millen and Allendale airports, with numbered areas.",
      "width": 1330,
      "height": 1752
    }
  },
  {
    "id": "ppl-fig-navigation-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 23.) The Plantation Airport (JYL) data block includes \"RP 5, 15.\" What does this mean?",
    "choices": [
      "Runways 5 and 15 have displaced thresholds",
      "Right-hand traffic is used for Runways 5 and 15",
      "Runways 5 and 15 are restricted to private use"
    ],
    "answerIndex": 1,
    "explanation": "RP followed by runway numbers means right traffic patterns are in effect for those runways.",
    "reference": "FAA-CT-8080-2H Figure 23; FAA Aeronautical Chart User's Guide",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-23.webp",
      "label": "Figure 23",
      "alt": "Sectional chart excerpt of eastern Georgia: Bulldog MOAs, military training routes, and Plantation, Statesboro, Millen and Allendale airports, with numbered areas.",
      "width": 1330,
      "height": 1752
    }
  },
  {
    "id": "ppl-fig-navigation-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 23.) Which frequency gives automated weather at Statesboro-Bulloch County (TBR)?",
    "choices": [
      "119.025 MHz",
      "122.8 MHz",
      "122.6 MHz"
    ],
    "answerIndex": 0,
    "explanation": "The data block shows \"AWOS-3 119.025.\" 122.8 is the CTAF, and 122.6 belongs to the Statesboro RCO.",
    "reference": "FAA-CT-8080-2H Figure 23",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-23.webp",
      "label": "Figure 23",
      "alt": "Sectional chart excerpt of eastern Georgia: Bulldog MOAs, military training routes, and Plantation, Statesboro, Millen and Allendale airports, with numbered areas.",
      "width": 1330,
      "height": 1752
    }
  },
  {
    "id": "ppl-fig-navigation-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 24.) What is the CTAF at Sulphur Springs Municipal (SLR)?",
    "choices": [
      "118.35 MHz",
      "109.0 MHz",
      "123.075 MHz"
    ],
    "answerIndex": 2,
    "explanation": "The data block reads \"489 L 50 123.075\" with the circled C after 123.075, so that is the CTAF. 118.35 is the AWOS-3 and 109.0 is the Sulphur Springs navaid.",
    "reference": "FAA-CT-8080-2H Figure 24",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-24.webp",
      "label": "Figure 24",
      "alt": "Sectional chart excerpt of northeast Texas: Sulphur Springs, Commerce, and the Paris VORTAC, with numbered areas.",
      "width": 1752,
      "height": 1331
    }
  },
  {
    "id": "ppl-fig-navigation-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 24.) What is the frequency of the Paris VORTAC?",
    "choices": [
      "113.6 MHz",
      "122.25 MHz",
      "109.0 MHz"
    ],
    "answerIndex": 0,
    "explanation": "The Paris navaid box shows \"113.6 Ch 83 PRX.\" 122.25 is the Fort Worth flight service frequency shown above the box.",
    "reference": "FAA-CT-8080-2H Figure 24",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-24.webp",
      "label": "Figure 24",
      "alt": "Sectional chart excerpt of northeast Texas: Sulphur Springs, Commerce, and the Paris VORTAC, with numbered areas.",
      "width": 1752,
      "height": 1331
    }
  },
  {
    "id": "ppl-fig-navigation-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 24.) What is the field elevation of Commerce Municipal (2F7)?",
    "choices": [
      "3,900 feet MSL",
      "516 feet MSL",
      "958 feet MSL"
    ],
    "answerIndex": 1,
    "explanation": "The data block reads \"516 L 39 122.9\": 516 feet MSL is the elevation, and 39 is the longest runway (3,900 feet). 958 is a nearby obstruction.",
    "reference": "FAA-CT-8080-2H Figure 24",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-24.webp",
      "label": "Figure 24",
      "alt": "Sectional chart excerpt of northeast Texas: Sulphur Springs, Commerce, and the Paris VORTAC, with numbered areas.",
      "width": 1752,
      "height": 1331
    }
  },
  {
    "id": "ppl-fig-airspace-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "kind": "mc",
    "prompt": "(Refer to Figure 25, area 7.) What are the floor and ceiling of the Class B airspace over area 7?",
    "choices": [
      "4,000 feet MSL to 11,000 feet MSL",
      "3,000 feet MSL to 11,000 feet MSL",
      "Surface to 11,000 feet MSL"
    ],
    "answerIndex": 0,
    "explanation": "The shelf containing area 7 is labeled 110 over 40, meaning Class B from 4,000 feet MSL to 11,000 feet MSL. The 30 shelf lies closer to the primary airport.",
    "reference": "FAA-CT-8080-2H Figure 25; AIM 3-2-3",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-25.webp",
      "label": "Figure 25",
      "alt": "Sectional chart excerpt of the Dallas-Fort Worth Class B airspace: Addison, Collin County, Dallas Love and Denton airports, with numbered areas.",
      "width": 1750,
      "height": 1331
    }
  },
  {
    "id": "ppl-fig-navigation-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 25.) What is the tower frequency at Addison Airport (ADS)?",
    "choices": [
      "133.4 MHz",
      "122.95 MHz",
      "126.0 MHz"
    ],
    "answerIndex": 2,
    "explanation": "\"CT - 126.0\" is the tower frequency. 133.4 is the ATIS and 122.95 is UNICOM.",
    "reference": "FAA-CT-8080-2H Figure 25",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-25.webp",
      "label": "Figure 25",
      "alt": "Sectional chart excerpt of the Dallas-Fort Worth Class B airspace: Addison, Collin County, Dallas Love and Denton airports, with numbered areas.",
      "width": 1750,
      "height": 1331
    }
  },
  {
    "id": "ppl-fig-navigation-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 25.) What is the tower frequency at Collin County Regional/McKinney (TKI)?",
    "choices": [
      "118.825 MHz",
      "119.925 MHz",
      "122.95 MHz"
    ],
    "answerIndex": 0,
    "explanation": "\"CT - 118.825\" is the tower. 119.925 is the ASOS and 122.95 is UNICOM.",
    "reference": "FAA-CT-8080-2H Figure 25",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-25.webp",
      "label": "Figure 25",
      "alt": "Sectional chart excerpt of the Dallas-Fort Worth Class B airspace: Addison, Collin County, Dallas Love and Denton airports, with numbered areas.",
      "width": 1750,
      "height": 1331
    }
  },
  {
    "id": "ppl-fig-airspace-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "kind": "mc",
    "prompt": "(Refer to Figure 25.) Dallas Love Field's data block includes \"NO SVFR.\" What does this mean?",
    "choices": [
      "Special VFR is available only at night",
      "Fixed-wing special VFR operations are not authorized",
      "VFR flight is prohibited in the Class B surface area"
    ],
    "answerIndex": 1,
    "explanation": "NO SVFR means special VFR clearances are not issued to fixed-wing aircraft at that airport. Ordinary VFR operations are still allowed when weather meets basic VFR minimums.",
    "reference": "FAA-CT-8080-2H Figure 25; 14 CFR 91.157",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-25.webp",
      "label": "Figure 25",
      "alt": "Sectional chart excerpt of the Dallas-Fort Worth Class B airspace: Addison, Collin County, Dallas Love and Denton airports, with numbered areas.",
      "width": 1750,
      "height": 1331
    }
  },
  {
    "id": "ppl-fig-navigation-020",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 26, area 4.) What frequency provides automated weather at Jamestown Regional (JMS)?",
    "choices": [
      "123.0 MHz",
      "118.425 MHz",
      "122.9 MHz"
    ],
    "answerIndex": 1,
    "explanation": "The data block shows \"ASOS 118.425.\" 123.0 is the CTAF.",
    "reference": "FAA-CT-8080-2H Figure 26",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-26.webp",
      "label": "Figure 26",
      "alt": "Sectional chart excerpt of central North Dakota: Jamestown Regional, Devils Lake East MOA, restricted areas R-5401 to R-5403, with numbered areas.",
      "width": 1330,
      "height": 1751
    }
  },
  {
    "id": "ppl-fig-airspace-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "kind": "mc",
    "prompt": "(Refer to Figure 26.) How does the Devils Lake East MOA relate to the nearby restricted areas?",
    "choices": [
      "The MOA excludes the airspace within the restricted areas when they are active",
      "The MOA and restricted areas are always active together",
      "The restricted areas are only active when the MOA is inactive"
    ],
    "answerIndex": 0,
    "explanation": "The chart note states that the MOA excludes airspace within the restricted areas when they are active.",
    "reference": "FAA-CT-8080-2H Figure 26; AIM 3-4-3",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-26.webp",
      "label": "Figure 26",
      "alt": "Sectional chart excerpt of central North Dakota: Jamestown Regional, Devils Lake East MOA, restricted areas R-5401 to R-5403, with numbered areas.",
      "width": 1330,
      "height": 1751
    }
  },
  {
    "id": "ppl-fig-navigation-021",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 26.) What is the elevation of Tomlinson Airport (8J7)?",
    "choices": [
      "3,600 feet MSL",
      "1,533 feet MSL",
      "1,535 feet MSL"
    ],
    "answerIndex": 1,
    "explanation": "The data block reads \"1533 L 36 122.9\": 1,533 feet MSL is the elevation. 1,535 belongs to the nearby private Smith airport.",
    "reference": "FAA-CT-8080-2H Figure 26",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-26.webp",
      "label": "Figure 26",
      "alt": "Sectional chart excerpt of central North Dakota: Jamestown Regional, Devils Lake East MOA, restricted areas R-5401 to R-5403, with numbered areas.",
      "width": 1330,
      "height": 1751
    }
  },
  {
    "id": "ppl-fig-airspace-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-E",
    "topic": "airspace",
    "kind": "mc",
    "prompt": "(Refer to Figure 26.) How can a pilot find out whether R-5402 and R-5403 are active?",
    "choices": [
      "Call the telephone number printed in the note on the chart",
      "Listen to the Jamestown ASOS broadcast",
      "Restricted areas are always active, so no check is needed"
    ],
    "answerIndex": 0,
    "explanation": "The chart includes a boxed note with a phone number for information on R-5402 and R-5403. The ASOS broadcasts weather only, and restricted areas are not necessarily active at all times.",
    "reference": "FAA-CT-8080-2H Figure 26; AIM 3-4-3",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-26.webp",
      "label": "Figure 26",
      "alt": "Sectional chart excerpt of central North Dakota: Jamestown Regional, Devils Lake East MOA, restricted areas R-5401 to R-5403, with numbered areas.",
      "width": 1330,
      "height": 1751
    }
  },
  {
    "id": "ppl-fig-airport-ops-001",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 47, illustration A.) Both bars show red lights over white lights. What does this two-bar VASI indication mean?",
    "choices": [
      "The airplane is on the glide path",
      "The airplane is above the glide path",
      "The airplane is below the glide path"
    ],
    "answerIndex": 0,
    "explanation": "On a two-bar VASI, red over white (far bar red, near bar white) means on the glide path. Remember: red over white, you're all right.",
    "reference": "FAA-CT-8080-2H Figure 47; AIM 2-1-2",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-47.webp",
      "label": "Figure 47",
      "alt": "Illustrations of two-bar VASI light combinations as seen on approach, labeled A through F.",
      "width": 1384,
      "height": 1472
    }
  },
  {
    "id": "ppl-fig-airport-ops-002",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 47, illustration C.) Both bars show all white lights. What does this indicate?",
    "choices": [
      "On the glide path",
      "Above the glide path",
      "Below the glide path"
    ],
    "answerIndex": 1,
    "explanation": "When both bars of a two-bar VASI appear white, the airplane is above the glide path.",
    "reference": "FAA-CT-8080-2H Figure 47; AIM 2-1-2",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-47.webp",
      "label": "Figure 47",
      "alt": "Illustrations of two-bar VASI light combinations as seen on approach, labeled A through F.",
      "width": 1384,
      "height": 1472
    }
  },
  {
    "id": "ppl-fig-airport-ops-003",
    "rating": "ppl",
    "areaId": "ppl-III",
    "taskId": "ppl-III-A",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 47, illustration D.) Both bars show all red lights. What does this indicate?",
    "choices": [
      "Above the glide path",
      "On the glide path",
      "Below the glide path"
    ],
    "answerIndex": 2,
    "explanation": "All red on a two-bar VASI means the airplane is below the glide path and should correct upward.",
    "reference": "FAA-CT-8080-2H Figure 47; AIM 2-1-2",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-47.webp",
      "label": "Figure 47",
      "alt": "Illustrations of two-bar VASI light combinations as seen on approach, labeled A through F.",
      "width": 1384,
      "height": 1472
    }
  },
  {
    "id": "ppl-fig-airport-ops-004",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 48, marking A.) The arrows on the runway centerline before the threshold of Runway 12 mark a displaced threshold. How may this portion of the runway be used?",
    "choices": [
      "Taxiing, takeoff and landing rollout, but not touchdown",
      "Landing only; takeoffs are not permitted",
      "No operations of any kind"
    ],
    "answerIndex": 0,
    "explanation": "Pavement behind a displaced threshold is marked with arrows. It is available for taxi, takeoff and landing rollout, but landings must not touch down before the threshold.",
    "reference": "FAA-CT-8080-2H Figure 48; AIM 2-3-3",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-48.webp",
      "label": "Figure 48",
      "alt": "Airport diagram with runways 12-30 and 17-35, a closed runway, and labeled markings A through E.",
      "width": 1381,
      "height": 1518
    }
  },
  {
    "id": "ppl-fig-airport-ops-005",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 48, marking C.) The short runway southwest of the ramp is marked with X's. What does this mean?",
    "choices": [
      "The runway is for helicopters only",
      "The runway is closed",
      "The runway is a taxiway during daylight"
    ],
    "answerIndex": 1,
    "explanation": "White X's on a runway mark it as closed. The pavement cannot be used for takeoff or landing.",
    "reference": "FAA-CT-8080-2H Figure 48; AIM 2-3-6",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-48.webp",
      "label": "Figure 48",
      "alt": "Airport diagram with runways 12-30 and 17-35, a closed runway, and labeled markings A through E.",
      "width": 1381,
      "height": 1518
    }
  },
  {
    "id": "ppl-fig-airport-ops-006",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 48, marking E.) The area beyond Runway 30 is marked with yellow chevrons. How may it be used?",
    "choices": [
      "For taxiing and takeoff, but not landing",
      "As an overrun for landing rollout only",
      "It is not usable for taxiing, takeoff or landing"
    ],
    "answerIndex": 2,
    "explanation": "Yellow chevrons mark a blast pad or stopway area. It is not usable for taxiing, takeoff or landing.",
    "reference": "FAA-CT-8080-2H Figure 48; AIM 2-3-3",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-48.webp",
      "label": "Figure 48",
      "alt": "Airport diagram with runways 12-30 and 17-35, a closed runway, and labeled markings A through E.",
      "width": 1381,
      "height": 1518
    }
  },
  {
    "id": "ppl-fig-airport-ops-007",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 49.) Runway 4-22 is marked with large X's at each end. What is its status?",
    "choices": [
      "The runway is closed",
      "The runway is used for takeoffs only",
      "The runway is a seaplane lane"
    ],
    "answerIndex": 0,
    "explanation": "X markings on a runway indicate it is closed to all operations.",
    "reference": "FAA-CT-8080-2H Figure 49; AIM 2-3-6",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-49.webp",
      "label": "Figure 49",
      "alt": "Airport diagram with runway 18-36, a closed runway 4-22 marked with X's, displaced thresholds on 18 and 36, and a segmented circle.",
      "width": 1386,
      "height": 1171
    }
  },
  {
    "id": "ppl-fig-airport-ops-008",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 49.) A pilot is landing on Runway 36. Where is the earliest point the airplane may touch down?",
    "choices": [
      "At the very beginning of the paved surface",
      "At the threshold bar beyond the arrows and arrowheads",
      "At the runway numbers painted at the far end"
    ],
    "answerIndex": 1,
    "explanation": "The arrows and arrowheads mark a displaced threshold. The landing threshold is the white bar beyond them, so touchdown must be at or past that bar.",
    "reference": "FAA-CT-8080-2H Figure 49; AIM 2-3-3",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-49.webp",
      "label": "Figure 49",
      "alt": "Airport diagram with runway 18-36, a closed runway 4-22 marked with X's, displaced thresholds on 18 and 36, and a segmented circle.",
      "width": 1386,
      "height": 1171
    }
  },
  {
    "id": "ppl-fig-airport-ops-009",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 64, item A.) What is the red sign marked \"19\"?",
    "choices": [
      "A runway location sign",
      "A runway holding position sign",
      "A destination sign for Runway 19"
    ],
    "answerIndex": 1,
    "explanation": "A red sign with white runway numbers is a mandatory runway holding position sign. Do not cross it without an ATC clearance at a towered airport.",
    "reference": "FAA-CT-8080-2H Figure 64; AIM 2-3-8",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-64.webp",
      "label": "Figure 64",
      "alt": "Airport markings and lighting diagram showing runway 19, taxiways, hold signs, stop bar lights and labeled items A through F.",
      "width": 1384,
      "height": 1411
    }
  },
  {
    "id": "ppl-fig-airport-ops-010",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 64, item E.) A single dashed yellow line with in-pavement yellow lights crosses the taxiway. What is it?",
    "choices": [
      "A runway holding position marking",
      "An ILS critical area boundary",
      "A taxiway/taxiway intersection holding position marking"
    ],
    "answerIndex": 2,
    "explanation": "A single dashed yellow line across a taxiway is the holding position marking for a taxiway intersection. A runway holding position marking has four lines, two solid and two dashed. The three yellow in-pavement lights beside it are clearance bar lights, which mark the hold point in low visibility.",
    "reference": "FAA-CT-8080-2H Figure 64; AIM 2-3-5",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-64.webp",
      "label": "Figure 64",
      "alt": "Airport markings and lighting diagram showing runway 19, taxiways, hold signs, stop bar lights and labeled items A through F.",
      "width": 1384,
      "height": 1411
    }
  },
  {
    "id": "ppl-fig-airport-ops-011",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 65, left sign in row A.) What does the red sign reading \"4-22\" indicate?",
    "choices": [
      "You are on Runway 4-22",
      "Runway 4-22 is to the left",
      "Hold short of Runway 4-22 unless cleared"
    ],
    "answerIndex": 2,
    "explanation": "White numbers on red make a mandatory runway holding position sign. It marks the hold short point for the runway named.",
    "reference": "FAA-CT-8080-2H Figure 65; AIM 2-3-8",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-65.webp",
      "label": "Figure 65",
      "alt": "Panel of U.S. airport signs labeled A through F, including red mandatory signs and yellow and black location and direction signs.",
      "width": 1292,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-airport-ops-012",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 65, left sign in row B.) What does the red sign reading \"4-APCH\" indicate?",
    "choices": [
      "A holding position for the approach area of Runway 4",
      "The direction to the Runway 4 approach end",
      "The start of the Runway 4 ILS critical area"
    ],
    "answerIndex": 0,
    "explanation": "\"4-APCH\" is a mandatory holding position sign protecting the approach area of Runway 4. Aircraft hold there so they don't intrude into the approach path.",
    "reference": "FAA-CT-8080-2H Figure 65; AIM 2-3-8",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-65.webp",
      "label": "Figure 65",
      "alt": "Panel of U.S. airport signs labeled A through F, including red mandatory signs and yellow and black location and direction signs.",
      "width": 1292,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-airport-ops-013",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 65, left sign in row C.) What does the red \"ILS\" sign indicate?",
    "choices": [
      "The boundary of the ILS critical area as you leave it",
      "A holding position for the ILS critical area",
      "The ILS localizer frequency is available"
    ],
    "answerIndex": 1,
    "explanation": "A red \"ILS\" sign marks the ILS critical area holding position. When instructed, hold there so you don't disturb the ILS signal.",
    "reference": "FAA-CT-8080-2H Figure 65; AIM 2-3-8",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-65.webp",
      "label": "Figure 65",
      "alt": "Panel of U.S. airport signs labeled A through F, including red mandatory signs and yellow and black location and direction signs.",
      "width": 1292,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-airport-ops-014",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 65, left sign in row D.) What does the red sign with a white circle and horizontal bar mean?",
    "choices": [
      "Taxiway ends ahead",
      "Aircraft entry is prohibited",
      "Hold short of the runway"
    ],
    "answerIndex": 1,
    "explanation": "The circle with a horizontal bar is a no-entry sign. It marks paved areas aircraft must not enter, such as one-way taxiways.",
    "reference": "FAA-CT-8080-2H Figure 65; AIM 2-3-8",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-65.webp",
      "label": "Figure 65",
      "alt": "Panel of U.S. airport signs labeled A through F, including red mandatory signs and yellow and black location and direction signs.",
      "width": 1292,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-airport-ops-015",
    "rating": "ppl",
    "areaId": "ppl-II",
    "taskId": "ppl-II-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 65, left sign in row E.) A yellow letter on a black background with a yellow border is what type of sign?",
    "choices": [
      "A direction sign",
      "A destination sign",
      "A taxiway location sign"
    ],
    "answerIndex": 2,
    "explanation": "Yellow characters on black identify a location sign. This one tells you which taxiway you are on.",
    "reference": "FAA-CT-8080-2H Figure 65; AIM 2-3-9",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-65.webp",
      "label": "Figure 65",
      "alt": "Panel of U.S. airport signs labeled A through F, including red mandatory signs and yellow and black location and direction signs.",
      "width": 1292,
      "height": 1747
    }
  },
  {
    "id": "ppl-fig-airport-ops-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 77.) What is the CTAF at Pierre Regional (PIR)?",
    "choices": [
      "122.95 MHz",
      "122.7 MHz",
      "119.025 MHz"
    ],
    "answerIndex": 1,
    "explanation": "The Communications line lists \"CTAF 122.7.\" 122.95 is UNICOM and 119.025 is the ASOS frequency.",
    "reference": "FAA-CT-8080-2H Figure 77; Chart Supplement legend",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-77.webp",
      "label": "Figure 77",
      "alt": "Chart Supplement excerpt for Pierre Regional (PIR) and Pine Ridge (IEN), South Dakota.",
      "width": 1183,
      "height": 1765
    }
  },
  {
    "id": "ppl-fig-airport-ops-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 77.) What are the length, width and surface of Runway 13-31 at Pierre Regional?",
    "choices": [
      "6,881 feet by 150 feet, asphalt",
      "6,900 feet by 150 feet, concrete",
      "6,900 feet by 100 feet, grooved asphalt"
    ],
    "answerIndex": 2,
    "explanation": "The entry \"RWY 13-31: H6900X100 (ASPH-GRVD)\" means hard surface 6,900 feet long and 100 feet wide, grooved asphalt. 6,881 by 150 belongs to Runway 07-25.",
    "reference": "FAA-CT-8080-2H Figure 77; Chart Supplement legend",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-77.webp",
      "label": "Figure 77",
      "alt": "Chart Supplement excerpt for Pierre Regional (PIR) and Pine Ridge (IEN), South Dakota.",
      "width": 1183,
      "height": 1765
    }
  },
  {
    "id": "ppl-fig-airport-ops-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 77.) What is the landing distance available (LDA) on Runway 07 at Pierre Regional?",
    "choices": [
      "6,830 feet",
      "6,881 feet",
      "6,900 feet"
    ],
    "answerIndex": 0,
    "explanation": "Under Runway Declared Distance Information, Runway 07 shows \"LDA-6830.\" 6,881 feet is its takeoff run available (TORA).",
    "reference": "FAA-CT-8080-2H Figure 77; AIM 4-3-6",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-77.webp",
      "label": "Figure 77",
      "alt": "Chart Supplement excerpt for Pierre Regional (PIR) and Pine Ridge (IEN), South Dakota.",
      "width": 1183,
      "height": 1765
    }
  },
  {
    "id": "ppl-fig-airport-ops-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 77.) Which approach lighting system serves Runway 31 at Pierre Regional?",
    "choices": [
      "REIL",
      "MALSR",
      "VASI"
    ],
    "answerIndex": 1,
    "explanation": "The Runway 31 line lists \"MALSR,\" a medium-intensity approach lighting system with runway alignment indicator lights. Runway 13 has REIL instead.",
    "reference": "FAA-CT-8080-2H Figure 77; AIM 2-1-1",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-77.webp",
      "label": "Figure 77",
      "alt": "Chart Supplement excerpt for Pierre Regional (PIR) and Pine Ridge (IEN), South Dakota.",
      "width": 1183,
      "height": 1765
    }
  },
  {
    "id": "ppl-fig-airport-ops-020",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 77.) What is the current status of Runway 06-24 at Pine Ridge (IEN)?",
    "choices": [
      "Closed indefinitely",
      "Open daylight hours only",
      "Restricted to aircraft under 12,500 pounds"
    ],
    "answerIndex": 0,
    "explanation": "Airport Remarks state \"Rwy 06-24 CLOSED indef.\"",
    "reference": "FAA-CT-8080-2H Figure 77",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-77.webp",
      "label": "Figure 77",
      "alt": "Chart Supplement excerpt for Pierre Regional (PIR) and Pine Ridge (IEN), South Dakota.",
      "width": 1183,
      "height": 1765
    }
  },
  {
    "id": "ppl-fig-airport-ops-021",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 77.) A pilot plans to land at Pine Ridge (IEN) at 0600Z. How can the runway lights be turned on?",
    "choices": [
      "They are on continuously from dusk to dawn",
      "They cannot be used after 0530Z",
      "Activate them by keying the microphone on the CTAF, 122.9"
    ],
    "answerIndex": 2,
    "explanation": "The MIRL and PAPI operate from dusk to 0530Z. After 0530Z they are pilot-activated on the CTAF, which is listed as 122.9.",
    "reference": "FAA-CT-8080-2H Figure 77; Chart Supplement legend",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-77.webp",
      "label": "Figure 77",
      "alt": "Chart Supplement excerpt for Pierre Regional (PIR) and Pine Ridge (IEN), South Dakota.",
      "width": 1183,
      "height": 1765
    }
  },
  {
    "id": "ppl-fig-airport-ops-022",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 79.) What class of airspace surrounds Sioux Gateway/Col Bud Day Field (SUX) when the tower is closed?",
    "choices": [
      "Class D",
      "Class E",
      "Class G"
    ],
    "answerIndex": 1,
    "explanation": "The Airspace line reads \"CLASS D svc 1200-0330Z other times CLASS E.\" When the tower closes, the surface area becomes Class E.",
    "reference": "FAA-CT-8080-2H Figure 79; AIM 3-2-5",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-79.webp",
      "label": "Figure 79",
      "alt": "Chart Supplement excerpt for Sioux City VORTAC and Sioux Gateway/Col Bud Day Field (SUX), Iowa.",
      "width": 1183,
      "height": 1764
    }
  },
  {
    "id": "ppl-fig-airport-ops-023",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 79.) A pilot is cleared to land on Runway 17 at Sioux Gateway and hold short of Runway 13-31. How much landing distance is available?",
    "choices": [
      "5,400 feet",
      "6,600 feet",
      "5,650 feet"
    ],
    "answerIndex": 2,
    "explanation": "The Land and Hold Short table lists Runway 17, hold short point 13-31, with 5,650 feet available. 5,400 feet applies to Runway 13 holding short of 17-35, and 6,600 feet is the full length of Runway 17-35.",
    "reference": "FAA-CT-8080-2H Figure 79; AIM 4-3-11",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-79.webp",
      "label": "Figure 79",
      "alt": "Chart Supplement excerpt for Sioux City VORTAC and Sioux Gateway/Col Bud Day Field (SUX), Iowa.",
      "width": 1183,
      "height": 1764
    }
  },
  {
    "id": "ppl-fig-airport-ops-024",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 79.) What is the tower frequency at Sioux Gateway?",
    "choices": [
      "118.7 MHz",
      "119.45 MHz",
      "121.9 MHz"
    ],
    "answerIndex": 0,
    "explanation": "\"SIOUX CITY TOWER 118.7\" is the tower frequency, which is also the CTAF. 119.45 is the ATIS and 121.9 is ground control.",
    "reference": "FAA-CT-8080-2H Figure 79",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-79.webp",
      "label": "Figure 79",
      "alt": "Chart Supplement excerpt for Sioux City VORTAC and Sioux Gateway/Col Bud Day Field (SUX), Iowa.",
      "width": 1183,
      "height": 1764
    }
  },
  {
    "id": "ppl-fig-airport-ops-025",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "airport-ops",
    "kind": "mc",
    "prompt": "(Refer to Figure 81.) What is the traffic pattern altitude at Crawford (99V)?",
    "choices": [
      "6,470 feet MSL",
      "7,470 feet MSL",
      "7,000 feet MSL"
    ],
    "answerIndex": 1,
    "explanation": "The entry \"TPA-7470(1000)\" gives a pattern altitude of 7,470 feet MSL, which is 1,000 feet above the 6,470-foot field elevation.",
    "reference": "FAA-CT-8080-2H Figure 81; Chart Supplement legend",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-81.webp",
      "label": "Figure 81",
      "alt": "Chart Supplement excerpt for Crawford (99V), Mineral County Memorial (C24) and Astronaut Kent Rominger (8V1), Colorado.",
      "width": 1183,
      "height": 1769
    }
  },
  {
    "id": "ppl-fig-weather-services-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 12.) What wind is reported at KINK?",
    "choices": [
      "110 degrees true at 12 knots, gusts to 18 knots",
      "110 degrees magnetic at 12 knots, gusts to 18 knots",
      "120 degrees true at 18 knots, gusts to 12 knots"
    ],
    "answerIndex": 0,
    "explanation": "\"11012G18KT\" means wind from 110 degrees at 12 knots, gusting 18 knots. Wind direction in a METAR is referenced to true north.",
    "reference": "FAA-CT-8080-2H Figure 12; AC 00-45H",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-12.webp",
      "label": "Figure 12",
      "alt": "Five text weather reports: METARs for KINK, KBOI and KLAX, and SPECI reports for KMDW and KJFK.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 12.) What sky condition is reported at KBOI?",
    "choices": [
      "Scattered clouds at 1,500 feet",
      "Scattered clouds at 15,000 feet",
      "Broken ceiling at 15,000 feet"
    ],
    "answerIndex": 1,
    "explanation": "\"SCT150\" means scattered clouds with bases at 15,000 feet AGL. Cloud heights are coded in hundreds of feet, and scattered does not form a ceiling.",
    "reference": "FAA-CT-8080-2H Figure 12; AC 00-45H",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-12.webp",
      "label": "Figure 12",
      "alt": "Five text weather reports: METARs for KINK, KBOI and KLAX, and SPECI reports for KMDW and KJFK.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 12.) At KLAX the temperature is 16 °C and the dewpoint is 15 °C. What does this suggest?",
    "choices": [
      "Moist, nearly saturated air in which fog or low clouds may form or persist",
      "Dry air with little chance of visibility restrictions",
      "Rapid warming that will lift the cloud bases"
    ],
    "answerIndex": 0,
    "explanation": "A spread of only 1 °C means the air is nearly saturated. Mist (BR) and clouds at 700 feet are already reported, and further cooling could cause fog.",
    "reference": "FAA-CT-8080-2H Figure 12; PHAK Chapter 12",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-12.webp",
      "label": "Figure 12",
      "alt": "Five text weather reports: METARs for KINK, KBOI and KLAX, and SPECI reports for KMDW and KJFK.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 12.) What does the remark \"RAB35\" in the KMDW report mean?",
    "choices": [
      "Rain began 35 minutes ago",
      "Rain is forecast to end at 35 minutes past the hour",
      "Rain began at 35 minutes past the hour"
    ],
    "answerIndex": 2,
    "explanation": "B means began, and the two digits give the minutes past the hour. RAB35 means rain began at 35 minutes past the hour.",
    "reference": "FAA-CT-8080-2H Figure 12; AC 00-45H",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-12.webp",
      "label": "Figure 12",
      "alt": "Five text weather reports: METARs for KINK, KBOI and KLAX, and SPECI reports for KMDW and KJFK.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 12.) What does \"R04/2200\" mean in the KJFK report?",
    "choices": [
      "Runway 04 visual range is 2,200 feet",
      "Runway 04 visibility is 2,200 meters",
      "Runway 04 is closed until 2200Z"
    ],
    "answerIndex": 0,
    "explanation": "R04/2200 is runway visual range: 2,200 feet for Runway 04. U.S. METARs report RVR in feet.",
    "reference": "FAA-CT-8080-2H Figure 12; AC 00-45H",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-12.webp",
      "label": "Figure 12",
      "alt": "Five text weather reports: METARs for KINK, KBOI and KLAX, and SPECI reports for KMDW and KJFK.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 15.) What is the valid period of the KMEM TAF?",
    "choices": [
      "From 1720Z on the 12th to 1720Z on the 13th",
      "From 1800Z on the 12th to 2400Z on the 13th",
      "From 1200Z on the 18th to 1300Z on the 24th"
    ],
    "answerIndex": 1,
    "explanation": "\"1218/1324\" is the valid period: from the 12th at 1800Z to the 13th at 2400Z. 121720Z is when the forecast was issued.",
    "reference": "FAA-CT-8080-2H Figure 15; AC 00-45H",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-15.webp",
      "label": "Figure 15",
      "alt": "Two terminal aerodrome forecasts in text, for KMEM and KOKC.",
      "width": 1394,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 15.) What does \"PROB40 1220/1222 1SM TSRA OVC008CB\" in the KMEM TAF forecast?",
    "choices": [
      "A 40 percent chance, between 2000Z and 2200Z, of 1 SM visibility in thunderstorms with moderate rain and an 800-foot overcast with cumulonimbus",
      "Thunderstorms with 1 SM visibility for 40 minutes, beginning at 2000Z",
      "Thunderstorms within 40 NM of the airport between 1200Z and 2200Z"
    ],
    "answerIndex": 0,
    "explanation": "PROB40 gives a 40 percent probability for the period 1220/1222 (2000Z-2200Z on the 12th). TSRA is a thunderstorm with moderate rain, and OVC008CB is an overcast layer at 800 feet with cumulonimbus.",
    "reference": "FAA-CT-8080-2H Figure 15; AC 00-45H",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-15.webp",
      "label": "Figure 15",
      "alt": "Two terminal aerodrome forecasts in text, for KMEM and KOKC.",
      "width": 1394,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 15.) Beginning at 2200Z on the 12th, what ceiling does the KMEM TAF forecast?",
    "choices": [
      "Overcast at 2,500 feet",
      "Broken at 15,000 feet",
      "Broken at 1,500 feet"
    ],
    "answerIndex": 2,
    "explanation": "\"FM122200 ... BKN015 OVC025\": the lowest broken layer, 1,500 feet, is the ceiling. Heights are in hundreds of feet AGL.",
    "reference": "FAA-CT-8080-2H Figure 15; AC 00-45H",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-15.webp",
      "label": "Figure 15",
      "alt": "Two terminal aerodrome forecasts in text, for KMEM and KOKC.",
      "width": 1394,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 15.) What does \"00000KT\" mean in the KMEM TAF segment \"BECMG 1310/1312 00000KT\"?",
    "choices": [
      "Wind direction is variable",
      "Winds are calm",
      "Wind information is missing"
    ],
    "answerIndex": 1,
    "explanation": "00000KT is the code for calm wind. Variable wind would be coded VRB, as in the later \"VRB06KT\" group.",
    "reference": "FAA-CT-8080-2H Figure 15; AC 00-45H",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-15.webp",
      "label": "Figure 15",
      "alt": "Two terminal aerodrome forecasts in text, for KMEM and KOKC.",
      "width": 1394,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 15.) What does \"TEMPO 0513/0516 1 1/2SM BR\" in the KOKC TAF mean?",
    "choices": [
      "Temporary visibility of 1 1/2 SM in mist between 1300Z and 1600Z on the 5th",
      "Visibility becoming 1 1/2 SM in mist after 1600Z",
      "A 13 to 16 percent chance of mist"
    ],
    "answerIndex": 0,
    "explanation": "TEMPO marks temporary fluctuations expected for less than half of the stated period. 0513/0516 is 1300Z to 1600Z on the 5th, and BR is mist.",
    "reference": "FAA-CT-8080-2H Figure 15; AC 00-45H",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-15.webp",
      "label": "Figure 15",
      "alt": "Two terminal aerodrome forecasts in text, for KMEM and KOKC.",
      "width": 1394,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 17.) What wind and temperature are forecast for STL at 9,000 feet?",
    "choices": [
      "230 degrees true at 32 knots, +2 °C",
      "320 degrees true at 23 knots, +2 °C",
      "230 degrees true at 32 knots, -2 °C"
    ],
    "answerIndex": 0,
    "explanation": "The STL 9,000-foot group is \"2332+02\": wind from 230 degrees true at 32 knots, temperature +2 °C. Winds aloft directions are true.",
    "reference": "FAA-CT-8080-2H Figure 17; AC 00-45H",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-17.webp",
      "label": "Figure 17",
      "alt": "Winds and temperatures aloft forecast table (FB WBC) for ALS, AMA, DEN, HLC, MKC and STL at altitudes from 3,000 to 39,000 feet.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 17.) Why is no temperature forecast for MKC at 3,000 feet?",
    "choices": [
      "The temperature is above freezing",
      "Temperatures are not forecast for the 3,000-foot level or within 2,500 feet of station elevation",
      "The forecast wind is less than 10 knots"
    ],
    "answerIndex": 1,
    "explanation": "The winds and temperatures aloft forecast never includes a temperature at 3,000 feet. It also omits temperatures for any level within 2,500 feet of station elevation.",
    "reference": "FAA-CT-8080-2H Figure 17; AC 00-45H",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-17.webp",
      "label": "Figure 17",
      "alt": "Winds and temperatures aloft forecast table (FB WBC) for ALS, AMA, DEN, HLC, MKC and STL at altitudes from 3,000 to 39,000 feet.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 17.) What is the forecast for STL at 34,000 feet?",
    "choices": [
      "730 degrees at 6 knots, -49 °C",
      "230 degrees true at 106 knots, -49 °C",
      "230 degrees true at 6 knots, +49 °C"
    ],
    "answerIndex": 1,
    "explanation": "\"730649\": a direction code above 36 means the speed is 100 knots or more. Subtract 50 from 73 to get 230 degrees and add 100 to 06 to get 106 knots. Above 24,000 feet the temperature is always negative, so 49 means -49 °C.",
    "reference": "FAA-CT-8080-2H Figure 17; AC 00-45H",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-17.webp",
      "label": "Figure 17",
      "alt": "Winds and temperatures aloft forecast table (FB WBC) for ALS, AMA, DEN, HLC, MKC and STL at altitudes from 3,000 to 39,000 feet.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 17.) The DEN forecast at 12,000 feet is 2532-08. How does the temperature compare to the standard atmosphere?",
    "choices": [
      "About 1 °C warmer than standard",
      "About 8 °C colder than standard",
      "About 1 °C colder than standard"
    ],
    "answerIndex": 0,
    "explanation": "Standard temperature at 12,000 feet is 15 °C - (2 °C x 12) = -9 °C. The forecast -8 °C is about 1 °C warmer than standard.",
    "reference": "FAA-CT-8080-2H Figure 17; PHAK Chapter 4",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-17.webp",
      "label": "Figure 17",
      "alt": "Winds and temperatures aloft forecast table (FB WBC) for ALS, AMA, DEN, HLC, MKC and STL at altitudes from 3,000 to 39,000 feet.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-weather-services-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-C",
    "topic": "weather-services",
    "kind": "mc",
    "prompt": "(Refer to Figure 17.) What is the forecast wind for AMA at 6,000 feet?",
    "choices": [
      "140 degrees true at 27 knots",
      "270 degrees true at 14 knots, +14 °C",
      "270 degrees true at 14 knots"
    ],
    "answerIndex": 2,
    "explanation": "The AMA 6,000-foot group is \"2714\": 270 degrees true at 14 knots. There is no temperature because 6,000 feet is within 2,500 feet of the station elevation.",
    "reference": "FAA-CT-8080-2H Figure 17; AC 00-45H",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-17.webp",
      "label": "Figure 17",
      "alt": "Winds and temperatures aloft forecast table (FB WBC) for ALS, AMA, DEN, HLC, MKC and STL at altitudes from 3,000 to 39,000 feet.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-performance-001",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figures 32 and 33.) Determine the loaded condition: pilot 180 lb and front passenger 160 lb, no rear passengers or baggage, main tanks full (44 gal), auxiliary tanks empty.",
    "choices": [
      "2,619 lb, moment/100 2,041; CG forward of limits",
      "2,619 lb, moment/100 2,041; within limits",
      "2,619 lb, moment/100 2,198; CG aft of limits"
    ],
    "answerIndex": 0,
    "explanation": "Empty 2,015/1,554 + front 180 (153) + front 160 (136) + main fuel 264 (198) = 2,619 lb and 2,041. At 2,620 lb the minimum moment is 2,058, so 2,041 is below it and the CG is forward of the limit.",
    "reference": "FAA-CT-8080-2H Figures 32 and 33; FAA-H-8083-1B",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-32-33.webp",
      "label": "Figures 32 and 33",
      "alt": "Weight and balance tables: useful load weights and moments for front seats, rear seats, baggage and fuel, plus empty weight and CG limits. Alongside it: table of minimum and maximum moment/100 for airplane weights from 2,100 to 2,950 pounds.",
      "width": 1686,
      "height": 1778
    }
  },
  {
    "id": "ppl-fig-performance-002",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figures 32 and 33.) Pilot 200 lb, front passenger 180 lb, rear passenger 170 lb, baggage 30 lb, main fuel 40 gal, auxiliary tanks empty. What are the total weight and moment/100, and is the airplane within limits?",
    "choices": [
      "2,835 lb, 2,305; CG aft of limits",
      "2,835 lb, 2,305; within limits",
      "2,895 lb, 2,347; within limits"
    ],
    "answerIndex": 1,
    "explanation": "Weights: 2,015 + 200 + 180 + 170 + 30 + 240 = 2,835 lb. Moments: 1,554 + 170 + 153 + 206 + 42 + 180 = 2,305. At 2,830-2,840 lb the limits are about 2,292 to 2,409, so 2,305 is within limits.",
    "reference": "FAA-CT-8080-2H Figures 32 and 33; FAA-H-8083-1B",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-32-33.webp",
      "label": "Figures 32 and 33",
      "alt": "Weight and balance tables: useful load weights and moments for front seats, rear seats, baggage and fuel, plus empty weight and CG limits. Alongside it: table of minimum and maximum moment/100 for airplane weights from 2,100 to 2,950 pounds.",
      "width": 1686,
      "height": 1778
    }
  },
  {
    "id": "ppl-fig-performance-003",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figures 32 and 33.) Pilot 180 lb, front passenger 170 lb, rear passengers 190 and 160 lb, main tanks full (44 gal), auxiliary tanks full (19 gal). What is the problem with this loading?",
    "choices": [
      "The CG is aft of limits",
      "The total weight exceeds the 2,950-lb maximum by 143 lb",
      "The total weight exceeds the 2,950-lb maximum by 33 lb"
    ],
    "answerIndex": 1,
    "explanation": "Total weight = 2,015 + 180 + 170 + 190 + 160 + 264 + 114 = 3,093 lb, which is 143 lb over the 2,950-lb maximum. The overweight must be fixed before CG is considered.",
    "reference": "FAA-CT-8080-2H Figures 32 and 33; FAA-H-8083-1B",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-32-33.webp",
      "label": "Figures 32 and 33",
      "alt": "Weight and balance tables: useful load weights and moments for front seats, rear seats, baggage and fuel, plus empty weight and CG limits. Alongside it: table of minimum and maximum moment/100 for airplane weights from 2,100 to 2,950 pounds.",
      "width": 1686,
      "height": 1778
    }
  },
  {
    "id": "ppl-fig-performance-004",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figures 32 and 33.) Pilot 190 lb, two rear passengers at 200 lb each, baggage 100 lb, main fuel 30 gal. Is the airplane within limits?",
    "choices": [
      "No; the CG is aft of limits",
      "Yes; the airplane is within limits",
      "No; the CG is forward of limits"
    ],
    "answerIndex": 0,
    "explanation": "Weight = 2,015 + 190 + 400 + 100 + 180 = 2,885 lb. Moment = 1,554 + 162 + 484 + 140 + 135 = 2,475. The maximum at 2,885 lb is about 2,448, so the CG is aft of limits.",
    "reference": "FAA-CT-8080-2H Figures 32 and 33; FAA-H-8083-1B",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-32-33.webp",
      "label": "Figures 32 and 33",
      "alt": "Weight and balance tables: useful load weights and moments for front seats, rear seats, baggage and fuel, plus empty weight and CG limits. Alongside it: table of minimum and maximum moment/100 for airplane weights from 2,100 to 2,950 pounds.",
      "width": 1686,
      "height": 1778
    }
  },
  {
    "id": "ppl-fig-performance-005",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 32.) Pilot 200 lb, rear passenger 120 lb, baggage 150 lb, main tanks full (44 gal). What is the total moment/100?",
    "choices": [
      "2,207",
      "2,347",
      "2,277"
    ],
    "answerIndex": 2,
    "explanation": "Moments: empty 1,554 + pilot 170 + rear 145 + baggage 210 + fuel 198 = 2,277. Total weight is 2,749 lb.",
    "reference": "FAA-CT-8080-2H Figure 32; FAA-H-8083-1B",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-32.webp",
      "label": "Figure 32",
      "alt": "Weight and balance tables: useful load weights and moments for front seats, rear seats, baggage and fuel, plus empty weight and CG limits.",
      "width": 850,
      "height": 1778
    }
  },
  {
    "id": "ppl-fig-performance-006",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figures 32 and 33.) Pilot and front passenger at 200 lb each, both main and auxiliary tanks full, no other load. Where is the CG?",
    "choices": [
      "Forward of limits",
      "Within limits",
      "Aft of limits"
    ],
    "answerIndex": 0,
    "explanation": "Weight = 2,015 + 400 + 264 + 114 = 2,793 lb. Moment = 1,554 + 340 + 198 + 107 = 2,199. The minimum at 2,793 lb is about 2,246, so the CG is forward of limits.",
    "reference": "FAA-CT-8080-2H Figures 32 and 33; FAA-H-8083-1B",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-32-33.webp",
      "label": "Figures 32 and 33",
      "alt": "Weight and balance tables: useful load weights and moments for front seats, rear seats, baggage and fuel, plus empty weight and CG limits. Alongside it: table of minimum and maximum moment/100 for airplane weights from 2,100 to 2,950 pounds.",
      "width": 1686,
      "height": 1778
    }
  },
  {
    "id": "ppl-fig-performance-007",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 32.) Pilot 190 lb, front passenger 170 lb, rear passenger 180 lb, baggage 40 lb, main fuel 35 gal. Where is the CG?",
    "choices": [
      "About 77.4 inches aft of datum",
      "About 81.7 inches aft of datum",
      "About 84.9 inches aft of datum"
    ],
    "answerIndex": 1,
    "explanation": "Weight = 2,015 + 190 + 170 + 180 + 40 + 210 = 2,805 lb. Moment = (1,554 + 162 + 144 + 218 + 56 + 158) x 100 = 229,200 lb-in. CG = 229,200 / 2,805 = 81.7 inches.",
    "reference": "FAA-CT-8080-2H Figure 32; FAA-H-8083-1B",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-32.webp",
      "label": "Figure 32",
      "alt": "Weight and balance tables: useful load weights and moments for front seats, rear seats, baggage and fuel, plus empty weight and CG limits.",
      "width": 850,
      "height": 1778
    }
  },
  {
    "id": "ppl-fig-performance-008",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 32.) During flight, 25 gallons are burned from the main tanks. By how much does this reduce the moment/100?",
    "choices": [
      "150",
      "90",
      "112"
    ],
    "answerIndex": 2,
    "explanation": "The main tank table shows 25 gal = 150 lb with a moment/100 of 112, so the moment drops by 112 (and the weight by 150 lb).",
    "reference": "FAA-CT-8080-2H Figure 32",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-32.webp",
      "label": "Figure 32",
      "alt": "Weight and balance tables: useful load weights and moments for front seats, rear seats, baggage and fuel, plus empty weight and CG limits.",
      "width": 850,
      "height": 1778
    }
  },
  {
    "id": "ppl-fig-performance-009",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 32.) What is the forward CG limit at the maximum takeoff weight of 2,950 lb?",
    "choices": [
      "82.1 inches",
      "77.0 inches",
      "84.7 inches"
    ],
    "answerIndex": 0,
    "explanation": "The CG limit table lists 82.1 inches forward and 84.7 inches aft at 2,950 lb. 77.0 inches is the forward limit at 2,475 lb or less.",
    "reference": "FAA-CT-8080-2H Figure 32",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-32.webp",
      "label": "Figure 32",
      "alt": "Weight and balance tables: useful load weights and moments for front seats, rear seats, baggage and fuel, plus empty weight and CG limits.",
      "width": 850,
      "height": 1778
    }
  },
  {
    "id": "ppl-fig-performance-010",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figures 32 and 33.) With the loading of pilot 200 lb, front passenger 180 lb, rear passenger 170 lb, baggage 30 lb and 40 gal of main fuel (2,835 lb), how much more weight could be added before reaching maximum gross weight?",
    "choices": [
      "65 lb",
      "115 lb",
      "215 lb"
    ],
    "answerIndex": 1,
    "explanation": "Maximum weight 2,950 lb - 2,835 lb = 115 lb. The CG must still be checked after anything is added.",
    "reference": "FAA-CT-8080-2H Figures 32 and 33; FAA-H-8083-1B",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-32-33.webp",
      "label": "Figures 32 and 33",
      "alt": "Weight and balance tables: useful load weights and moments for front seats, rear seats, baggage and fuel, plus empty weight and CG limits. Alongside it: table of minimum and maximum moment/100 for airplane weights from 2,100 to 2,950 pounds.",
      "width": 1686,
      "height": 1778
    }
  },
  {
    "id": "ppl-fig-performance-011",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 32.) What is the weight of full auxiliary tanks?",
    "choices": [
      "114 lb",
      "107 lb",
      "120 lb"
    ],
    "answerIndex": 0,
    "explanation": "The auxiliary tank table lists 19 gal = 114 lb (at 6 lb per gallon), with a moment/100 of 107.",
    "reference": "FAA-CT-8080-2H Figure 32",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-32.webp",
      "label": "Figure 32",
      "alt": "Weight and balance tables: useful load weights and moments for front seats, rear seats, baggage and fuel, plus empty weight and CG limits.",
      "width": 850,
      "height": 1778
    }
  },
  {
    "id": "ppl-fig-performance-012",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "An airplane weighs 2,400 lb. A 60-lb bag is moved from the baggage area (arm 140 in) to a seat at arm 100 in. How far does the CG move?",
    "choices": [
      "1.0 inch aft",
      "1.0 inch forward",
      "2.5 inches forward"
    ],
    "answerIndex": 1,
    "explanation": "Change in CG = weight moved x distance moved / total weight = 60 x 40 / 2,400 = 1.0 inch. The weight moved forward, so the CG moves forward.",
    "reference": "FAA-H-8083-1B; PHAK Chapter 10",
    "difficulty": 2
  },
  {
    "id": "ppl-fig-performance-013",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "An airplane takes off at 2,500 lb with the CG at 80.0 inches. It burns 30 gallons (180 lb) of fuel from tanks at arm 75 inches. Where is the CG after the fuel burn?",
    "choices": [
      "79.6 inches",
      "80.4 inches",
      "80.0 inches"
    ],
    "answerIndex": 1,
    "explanation": "Initial moment = 2,500 x 80.0 = 200,000. Removing 180 x 75 = 13,500 leaves 186,500 at 2,320 lb. CG = 186,500 / 2,320 = 80.4 inches; burning fuel ahead of the CG moves the CG aft.",
    "reference": "FAA-H-8083-1B; PHAK Chapter 10",
    "difficulty": 3
  },
  {
    "id": "ppl-fig-performance-014",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "Find the CG: empty weight 1,500 lb at arm 36 in; pilot and passenger 340 lb at 37 in; fuel 30 gal (180 lb) at 48 in; baggage 40 lb at 95 in.",
    "choices": [
      "38.4 inches",
      "37.2 inches",
      "41.5 inches"
    ],
    "answerIndex": 0,
    "explanation": "Moments: 54,000 + 12,580 + 8,640 + 3,800 = 79,020 lb-in. Weight: 1,500 + 340 + 180 + 40 = 2,060 lb. CG = 79,020 / 2,060 = 38.4 inches.",
    "reference": "PHAK Chapter 10; FAA-H-8083-1B",
    "difficulty": 2
  },
  {
    "id": "ppl-fig-performance-015",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "An airplane weighs 2,600 lb with the CG at 85.5 inches; the aft limit is 84.5 inches. How much baggage must be moved from the baggage area (arm 140 in) to a seat at arm 85 in to bring the CG to the aft limit?",
    "choices": [
      "About 19 lb",
      "About 47 lb",
      "About 55 lb"
    ],
    "answerIndex": 1,
    "explanation": "Weight to move = total weight x CG change / distance moved = 2,600 x 1.0 / 55 = 47.3 lb, so about 47 lb.",
    "reference": "FAA-H-8083-1B",
    "difficulty": 3
  },
  {
    "id": "ppl-fig-performance-016",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 35.) What true airspeed should be expected at 8,000 feet on a standard day?",
    "choices": [
      "157 knots",
      "161 knots",
      "185 knots"
    ],
    "answerIndex": 1,
    "explanation": "In the Standard day (ISA) section at 8,000 feet, TAS is 161 knots (185 MPH). 157 knots is the ISA -20 °C value.",
    "reference": "FAA-CT-8080-2H Figure 35",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-35.webp",
      "label": "Figure 35",
      "alt": "Cruise power setting table at 65 percent power for a twin-engine airplane, listing manifold pressure, fuel flow per engine and true airspeed by pressure altitude for ISA -20 C, standard, and ISA +20 C.",
      "width": 1784,
      "height": 751
    }
  },
  {
    "id": "ppl-fig-performance-017",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 35.) What is the fuel flow per engine at 12,000 feet when the temperature is ISA +20 °C?",
    "choices": [
      "11.5 GPH",
      "10.9 GPH",
      "10.6 GPH"
    ],
    "answerIndex": 2,
    "explanation": "In the ISA +20 °C section at 12,000 feet, the fuel flow is 10.6 GPH per engine. The standard-day value is 10.9 GPH.",
    "reference": "FAA-CT-8080-2H Figure 35",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-35.webp",
      "label": "Figure 35",
      "alt": "Cruise power setting table at 65 percent power for a twin-engine airplane, listing manifold pressure, fuel flow per engine and true airspeed by pressure altitude for ISA -20 C, standard, and ISA +20 C.",
      "width": 1784,
      "height": 751
    }
  },
  {
    "id": "ppl-fig-performance-018",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 35.) How much fuel will both engines burn in 2 hours of cruise at 6,000 feet on a standard day?",
    "choices": [
      "46 gallons",
      "23 gallons",
      "92 gallons"
    ],
    "answerIndex": 0,
    "explanation": "Fuel flow is 11.5 GPH per engine. Two engines x 11.5 GPH x 2 hours = 46 gallons.",
    "reference": "FAA-CT-8080-2H Figure 35",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-35.webp",
      "label": "Figure 35",
      "alt": "Cruise power setting table at 65 percent power for a twin-engine airplane, listing manifold pressure, fuel flow per engine and true airspeed by pressure altitude for ISA -20 C, standard, and ISA +20 C.",
      "width": 1784,
      "height": 751
    }
  },
  {
    "id": "ppl-fig-performance-019",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 35.) At 6,000 feet the indicated outside air temperature is 26 °C. What true airspeed should be expected?",
    "choices": [
      "158 knots",
      "161 knots",
      "155 knots"
    ],
    "answerIndex": 1,
    "explanation": "26 °C at 6,000 feet matches the ISA +20 °C column, which gives 161 knots. 158 knots is the standard-day value and 155 knots is ISA -20 °C.",
    "reference": "FAA-CT-8080-2H Figure 35",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-35.webp",
      "label": "Figure 35",
      "alt": "Cruise power setting table at 65 percent power for a twin-engine airplane, listing manifold pressure, fuel flow per engine and true airspeed by pressure altitude for ISA -20 C, standard, and ISA +20 C.",
      "width": 1784,
      "height": 751
    }
  },
  {
    "id": "ppl-fig-performance-020",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 38.) At 5,000 feet and 41 °F with an 8-knot headwind, what is the total landing distance to clear a 50-foot obstacle?",
    "choices": [
      "1,195 feet",
      "956 feet",
      "1,075 feet"
    ],
    "answerIndex": 1,
    "explanation": "The table gives 1,195 feet at 5,000 feet and 41 °F. Reduce by 10 percent for each 4 knots of headwind: 8 knots = 20 percent, so 1,195 x 0.80 = 956 feet.",
    "reference": "FAA-CT-8080-2H Figure 38",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-38.webp",
      "label": "Figure 38",
      "alt": "Airplane landing distance table at 1,600 pounds for four altitude and temperature conditions, with notes for headwind, temperature and grass runways.",
      "width": 1785,
      "height": 410
    }
  },
  {
    "id": "ppl-fig-performance-021",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 38.) At sea level and 59 °F with no wind, what ground roll is needed to land on a dry grass runway?",
    "choices": [
      "534 feet",
      "660 feet",
      "1,290 feet"
    ],
    "answerIndex": 1,
    "explanation": "Ground roll is 445 feet. For dry grass, add 20 percent of the total-to-clear-50-feet figure: 0.20 x 1,075 = 215 feet. 445 + 215 = 660 feet.",
    "reference": "FAA-CT-8080-2H Figure 38",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-38.webp",
      "label": "Figure 38",
      "alt": "Airplane landing distance table at 1,600 pounds for four altitude and temperature conditions, with notes for headwind, temperature and grass runways.",
      "width": 1785,
      "height": 410
    }
  },
  {
    "id": "ppl-fig-performance-022",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 38.) At 2,500 feet and 50 °F with a 4-knot headwind, what is the landing ground roll?",
    "choices": [
      "423 feet",
      "470 feet",
      "517 feet"
    ],
    "answerIndex": 0,
    "explanation": "The table ground roll is 470 feet. A 4-knot headwind reduces it by 10 percent: 470 x 0.90 = 423 feet.",
    "reference": "FAA-CT-8080-2H Figure 38",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-38.webp",
      "label": "Figure 38",
      "alt": "Airplane landing distance table at 1,600 pounds for four altitude and temperature conditions, with notes for headwind, temperature and grass runways.",
      "width": 1785,
      "height": 410
    }
  },
  {
    "id": "ppl-fig-performance-023",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 36.) Landing on Runway 17 with the wind from 210 degrees at 25 knots, what is the crosswind component?",
    "choices": [
      "About 19 knots",
      "About 25 knots",
      "About 16 knots"
    ],
    "answerIndex": 2,
    "explanation": "The angle between the wind and the runway is 210 - 170 = 40 degrees. At 40 degrees and 25 knots, the graph gives about 16 knots of crosswind (25 x sin 40 = 16) and about 19 knots of headwind.",
    "reference": "FAA-CT-8080-2H Figure 36; PHAK Chapter 11",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-36.webp",
      "label": "Figure 36",
      "alt": "Crosswind component graph: wind angle arcs and wind speed lines read against headwind (vertical axis) and crosswind (horizontal axis) components.",
      "width": 1384,
      "height": 1137
    }
  },
  {
    "id": "ppl-fig-performance-024",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 36.) Landing on Runway 36 with the wind from 330 degrees at 30 knots, what is the headwind component?",
    "choices": [
      "About 26 knots",
      "About 15 knots",
      "About 30 knots"
    ],
    "answerIndex": 0,
    "explanation": "The wind is 30 degrees off the runway. At 30 degrees and 30 knots, the graph gives about 26 knots of headwind (30 x cos 30 = 26) and 15 knots of crosswind.",
    "reference": "FAA-CT-8080-2H Figure 36; PHAK Chapter 11",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-36.webp",
      "label": "Figure 36",
      "alt": "Crosswind component graph: wind angle arcs and wind speed lines read against headwind (vertical axis) and crosswind (horizontal axis) components.",
      "width": 1384,
      "height": 1137
    }
  },
  {
    "id": "ppl-fig-performance-025",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 36.) The wind is from 090 degrees at 20 knots, and Runways 6 and 13 are available. Which runway has the smaller crosswind, and about how much?",
    "choices": [
      "Runway 13, about 13 knots",
      "Runway 6, about 10 knots",
      "Runway 6, about 17 knots"
    ],
    "answerIndex": 1,
    "explanation": "Runway 6 is 30 degrees from the wind: crosswind about 10 knots (20 x sin 30). Runway 13 is 40 degrees off: about 13 knots. 17 knots is the headwind on Runway 6, not the crosswind.",
    "reference": "FAA-CT-8080-2H Figure 36; PHAK Chapter 11",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-36.webp",
      "label": "Figure 36",
      "alt": "Crosswind component graph: wind angle arcs and wind speed lines read against headwind (vertical axis) and crosswind (horizontal axis) components.",
      "width": 1384,
      "height": 1137
    }
  },
  {
    "id": "ppl-fig-performance-026",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 37.) What approach speed at 50 feet is listed for a landing weight of 2,400 pounds?",
    "choices": [
      "60 knots",
      "65 knots",
      "63 knots"
    ],
    "answerIndex": 2,
    "explanation": "The speed table in the figure lists 63 knots (72 MPH) at 2,400 pounds.",
    "reference": "FAA-CT-8080-2H Figure 37",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-37.webp",
      "label": "Figure 37",
      "alt": "Airplane landing distance graph with associated conditions and a table of approach speeds by weight.",
      "width": 1135,
      "height": 1785
    }
  },
  {
    "id": "ppl-fig-performance-027",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 40.) At a takeoff weight of 2,600 pounds, what speed should the airplane have at 50 feet?",
    "choices": [
      "63 knots",
      "68 knots",
      "72 knots"
    ],
    "answerIndex": 1,
    "explanation": "The takeoff speed table lists 63 knots for lift-off and 68 knots at 50 feet at 2,600 pounds. 72 knots applies at 2,950 pounds.",
    "reference": "FAA-CT-8080-2H Figure 40",
    "difficulty": 1,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-40.webp",
      "label": "Figure 40",
      "alt": "Airplane takeoff distance graph with associated conditions and a table of lift-off and 50-foot speeds by weight.",
      "width": 1084,
      "height": 1786
    }
  },
  {
    "id": "ppl-fig-performance-028",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 8.) Field elevation is 5,250 feet and the altimeter setting is 29.80. What is the pressure altitude?",
    "choices": [
      "5,362 feet",
      "5,138 feet",
      "5,250 feet"
    ],
    "answerIndex": 0,
    "explanation": "The conversion table gives +112 feet for 29.80. 5,250 + 112 = 5,362 feet. A setting below 29.92 means pressure altitude is higher than field elevation.",
    "reference": "FAA-CT-8080-2H Figure 8; PHAK Chapter 11",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-8.webp",
      "label": "Figure 8",
      "alt": "Density altitude chart: diagonal pressure-altitude lines plotted against outside air temperature, with a table converting altimeter setting to a pressure altitude correction.",
      "width": 1384,
      "height": 1339
    }
  },
  {
    "id": "ppl-fig-performance-029",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 8.) Field elevation is 1,165 feet and the altimeter setting is 30.10. What is the pressure altitude?",
    "choices": [
      "1,330 feet",
      "1,000 feet",
      "1,165 feet"
    ],
    "answerIndex": 1,
    "explanation": "The conversion factor for 30.10 is -165 feet. 1,165 - 165 = 1,000 feet.",
    "reference": "FAA-CT-8080-2H Figure 8; PHAK Chapter 11",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-8.webp",
      "label": "Figure 8",
      "alt": "Density altitude chart: diagonal pressure-altitude lines plotted against outside air temperature, with a table converting altimeter setting to a pressure altitude correction.",
      "width": 1384,
      "height": 1339
    }
  },
  {
    "id": "ppl-fig-performance-030",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-F",
    "topic": "performance",
    "kind": "mc",
    "prompt": "(Refer to Figure 8.) What is the approximate density altitude at a pressure altitude of 3,000 feet and an outside air temperature of 30 °C?",
    "choices": [
      "About 3,000 feet",
      "About 5,400 feet",
      "About 7,500 feet"
    ],
    "answerIndex": 1,
    "explanation": "Standard temperature at 3,000 feet is about 9 °C, so it is 21 °C warmer than standard. Following the 3,000-foot line up to 30 °C gives about 5,400 feet; the rule of thumb (120 feet per degree) gives a similar 5,500 feet.",
    "reference": "FAA-CT-8080-2H Figure 8; PHAK Chapter 11",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-8.webp",
      "label": "Figure 8",
      "alt": "Density altitude chart: diagonal pressure-altitude lines plotted against outside air temperature, with a table converting altimeter setting to a pressure altitude correction.",
      "width": 1384,
      "height": 1339
    }
  },
  {
    "id": "ppl-fig-navigation-022",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "True course is 090, true airspeed 120 knots, and the wind is from 180 degrees at 20 knots. What are the true heading and groundspeed?",
    "choices": [
      "100 degrees and 118 knots",
      "080 degrees and 118 knots",
      "100 degrees and 122 knots"
    ],
    "answerIndex": 0,
    "explanation": "The wind is from the right, so correct right: WCA = arcsin(20/120) = about 10 degrees, giving a true heading of 100. Groundspeed = 120 x cos 10 = about 118 knots.",
    "reference": "PHAK Chapter 16; E6B wind side",
    "difficulty": 3
  },
  {
    "id": "ppl-fig-navigation-023",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "True course is 270, true airspeed 110 knots, and the wind is from 300 degrees at 20 knots. What are the true heading and groundspeed?",
    "choices": [
      "265 degrees and 92 knots",
      "275 degrees and 92 knots",
      "275 degrees and 128 knots"
    ],
    "answerIndex": 1,
    "explanation": "The wind is 30 degrees to the right of the nose, so correct right about 5 degrees: TH = 275. The headwind component (about 17 knots) leaves a groundspeed of about 92 knots.",
    "reference": "PHAK Chapter 16; E6B wind side",
    "difficulty": 3
  },
  {
    "id": "ppl-fig-navigation-024",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 17.) A flight near STL at 9,000 feet has a true course of 090 and a true airspeed of 120 knots. Using the forecast wind, what are the approximate true heading and groundspeed?",
    "choices": [
      "080 degrees and 143 knots",
      "100 degrees and 97 knots",
      "100 degrees and 143 knots"
    ],
    "answerIndex": 2,
    "explanation": "The STL 9,000-foot wind is 230 degrees at 32 knots, coming from behind and to the right. Correct right about 10 degrees (TH 100); the tailwind component raises groundspeed to about 143 knots.",
    "reference": "FAA-CT-8080-2H Figure 17; PHAK Chapter 16",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-17.webp",
      "label": "Figure 17",
      "alt": "Winds and temperatures aloft forecast table (FB WBC) for ALS, AMA, DEN, HLC, MKC and STL at altitudes from 3,000 to 39,000 feet.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-navigation-025",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 17.) A flight near HLC at 12,000 feet has a true course of 360 and a true airspeed of 130 knots. Using the forecast wind, what are the approximate true heading and groundspeed?",
    "choices": [
      "355 degrees and 144 knots",
      "005 degrees and 144 knots",
      "355 degrees and 116 knots"
    ],
    "answerIndex": 0,
    "explanation": "The HLC 12,000-foot wind is 220 degrees at 19 knots, from behind and to the left. Correct left about 5 degrees (TH 355); the tailwind raises groundspeed to about 144 knots.",
    "reference": "FAA-CT-8080-2H Figure 17; PHAK Chapter 16",
    "difficulty": 3,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-17.webp",
      "label": "Figure 17",
      "alt": "Winds and temperatures aloft forecast table (FB WBC) for ALS, AMA, DEN, HLC, MKC and STL at altitudes from 3,000 to 39,000 feet.",
      "width": 1384,
      "height": 1917
    }
  },
  {
    "id": "ppl-fig-navigation-026",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "True course is 135, true airspeed 95 knots, and the wind is from 045 degrees at 15 knots. What are the true heading and groundspeed?",
    "choices": [
      "144 degrees and 94 knots",
      "126 degrees and 80 knots",
      "126 degrees and 94 knots"
    ],
    "answerIndex": 2,
    "explanation": "A wind from 045 is 90 degrees to the left of the course, a pure crosswind. WCA = arcsin(15/95) = about 9 degrees left, so TH = 126. Groundspeed = 95 x cos 9 = about 94 knots.",
    "reference": "PHAK Chapter 16; E6B wind side",
    "difficulty": 3
  },
  {
    "id": "ppl-fig-navigation-027",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "True heading is 050 and the magnetic variation is 10 degrees east. What is the magnetic heading?",
    "choices": [
      "040 degrees",
      "060 degrees",
      "050 degrees"
    ],
    "answerIndex": 0,
    "explanation": "East is least, west is best: subtract easterly variation. 050 - 10 = 040 degrees magnetic.",
    "reference": "PHAK Chapter 16",
    "difficulty": 1
  },
  {
    "id": "ppl-fig-navigation-028",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "True course is 180 and the magnetic variation is 7 degrees west. What is the magnetic course?",
    "choices": [
      "173 degrees",
      "187 degrees",
      "180 degrees"
    ],
    "answerIndex": 1,
    "explanation": "Add westerly variation: 180 + 7 = 187 degrees magnetic.",
    "reference": "PHAK Chapter 16",
    "difficulty": 1
  },
  {
    "id": "ppl-fig-navigation-029",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "Magnetic heading is 040 and the compass deviation card shows -2 degrees for that heading. What compass heading should be flown?",
    "choices": [
      "042 degrees",
      "040 degrees",
      "038 degrees"
    ],
    "answerIndex": 2,
    "explanation": "Compass heading = magnetic heading + deviation = 040 + (-2) = 038 degrees.",
    "reference": "PHAK Chapter 16",
    "difficulty": 1
  },
  {
    "id": "ppl-fig-navigation-030",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "How long will it take to fly 145 NM at a groundspeed of 116 knots?",
    "choices": [
      "1 hour 15 minutes",
      "1 hour 25 minutes",
      "1 hour 5 minutes"
    ],
    "answerIndex": 0,
    "explanation": "Time = distance / groundspeed = 145 / 116 = 1.25 hours = 1 hour 15 minutes.",
    "reference": "PHAK Chapter 16",
    "difficulty": 1
  },
  {
    "id": "ppl-fig-navigation-031",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "An airplane passes two checkpoints 36 NM apart in 18 minutes. What is the groundspeed?",
    "choices": [
      "108 knots",
      "120 knots",
      "135 knots"
    ],
    "answerIndex": 1,
    "explanation": "Groundspeed = 36 NM / (18/60 hour) = 36 / 0.3 = 120 knots.",
    "reference": "PHAK Chapter 16",
    "difficulty": 1
  },
  {
    "id": "ppl-fig-navigation-032",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "A day VFR flight is planned for 2 hours 20 minutes at 8.5 gallons per hour. What is the minimum fuel needed, including the required reserve?",
    "choices": [
      "19.8 gallons",
      "24.1 gallons",
      "26.2 gallons"
    ],
    "answerIndex": 1,
    "explanation": "Trip fuel = 2.33 h x 8.5 = 19.8 gal. Day VFR requires 30 more minutes at normal cruise: 0.5 x 8.5 = 4.25 gal. Total = 24.1 gallons.",
    "reference": "14 CFR 91.151; PHAK Chapter 16",
    "difficulty": 2
  },
  {
    "id": "ppl-fig-navigation-033",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "A night VFR flight is planned for 1 hour 30 minutes at 9.6 gallons per hour. What is the minimum fuel needed, including the required reserve?",
    "choices": [
      "19.2 gallons",
      "14.4 gallons",
      "21.6 gallons"
    ],
    "answerIndex": 2,
    "explanation": "Trip fuel = 1.5 x 9.6 = 14.4 gal. Night VFR requires a 45-minute reserve: 0.75 x 9.6 = 7.2 gal. Total = 21.6 gallons.",
    "reference": "14 CFR 91.151",
    "difficulty": 2
  },
  {
    "id": "ppl-fig-navigation-034",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "An airplane has 47 gallons of usable fuel and burns 9.5 gallons per hour. How long can it fly in daytime VFR while keeping the 30-minute reserve?",
    "choices": [
      "4 hours 57 minutes",
      "4 hours 27 minutes",
      "4 hours 0 minutes"
    ],
    "answerIndex": 1,
    "explanation": "Reserve = 0.5 x 9.5 = 4.75 gal. Fuel available for the trip = 47 - 4.75 = 42.25 gal. 42.25 / 9.5 = 4.45 hours = about 4 hours 27 minutes.",
    "reference": "14 CFR 91.151; PHAK Chapter 16",
    "difficulty": 3
  },
  {
    "id": "ppl-fig-navigation-035",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "A pilot wants to descend from 8,500 feet to a 2,500-foot pattern altitude at 500 feet per minute with a groundspeed of 120 knots. How far from the airport should the descent begin?",
    "choices": [
      "12 NM",
      "24 NM",
      "30 NM"
    ],
    "answerIndex": 1,
    "explanation": "Altitude to lose = 6,000 feet. At 500 fpm that takes 12 minutes. At 120 knots (2 NM per minute), 12 minutes covers 24 NM.",
    "reference": "PHAK Chapter 16",
    "difficulty": 2
  },
  {
    "id": "ppl-fig-navigation-036",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "Convert 230 statute miles to nautical miles.",
    "choices": [
      "200 NM",
      "265 NM",
      "185 NM"
    ],
    "answerIndex": 0,
    "explanation": "1 nautical mile = 1.15 statute miles. 230 / 1.15 = 200 NM.",
    "reference": "PHAK Chapter 16",
    "difficulty": 1
  },
  {
    "id": "ppl-fig-navigation-037",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "At a pressure altitude of 8,000 feet and an outside air temperature of -5 °C, the calibrated airspeed is 120 knots. What is the approximate true airspeed?",
    "choices": [
      "About 120 knots",
      "About 106 knots",
      "About 134 knots"
    ],
    "answerIndex": 2,
    "explanation": "TAS increases with altitude because the air is less dense. Setting 8,000 feet and -5 °C on the E6B airspeed window gives about 134 knots for 120 knots CAS.",
    "reference": "PHAK Chapter 8; E6B computer side",
    "difficulty": 2
  },
  {
    "id": "ppl-fig-navigation-038",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "After flying 60 NM, a pilot finds the airplane is 3 NM left of course with 60 NM remaining. Using the 1-in-60 rule, how much heading change will return the airplane to course at the destination?",
    "choices": [
      "3 degrees right",
      "9 degrees right",
      "6 degrees right"
    ],
    "answerIndex": 2,
    "explanation": "Being 3 NM off after 60 NM means a 3-degree error. To parallel the course needs 3 degrees, and to converge in the remaining 60 NM needs 3 more, so turn 6 degrees right.",
    "reference": "PHAK Chapter 16",
    "difficulty": 3
  },
  {
    "id": "ppl-fig-navigation-039",
    "rating": "ppl",
    "areaId": "ppl-VI",
    "taskId": "ppl-VI-A",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "True course is 360, true airspeed 100 knots, and the wind is from 360 degrees at 30 knots. How long will a 140-NM leg take?",
    "choices": [
      "1 hour 5 minutes",
      "1 hour 24 minutes",
      "2 hours 0 minutes"
    ],
    "answerIndex": 2,
    "explanation": "A direct headwind reduces groundspeed to 100 - 30 = 70 knots. 140 / 70 = 2.0 hours.",
    "reference": "PHAK Chapter 16",
    "difficulty": 2
  },
  {
    "id": "ppl-fig-navigation-040",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "(Refer to Figure 27.) An airplane departs a California airport at 1430 PDT for a 2 hour 15 minute flight. What is the estimated arrival time in UTC?",
    "choices": [
      "2345Z",
      "2245Z",
      "1645Z"
    ],
    "answerIndex": 0,
    "explanation": "Figure 27 says to add 7 hours to convert Pacific daylight time to UTC: 1430 PDT = 2130Z. 2130Z + 2:15 = 2345Z.",
    "reference": "FAA-CT-8080-2H Figure 27",
    "difficulty": 2,
    "figure": {
      "src": "/figures/akts-8080-2h/figure-27.webp",
      "label": "Figure 27",
      "alt": "Map of U.S. time zones with magnetic variation lines and a table for converting local standard and daylight time to UTC.",
      "width": 1784,
      "height": 1178
    }
  },
  {
    "id": "ppl-fig-navigation-041",
    "rating": "ppl",
    "areaId": "ppl-I",
    "taskId": "ppl-I-D",
    "topic": "navigation",
    "kind": "mc",
    "prompt": "An airplane departs at 1315Z on an 85-NM leg with a groundspeed of 102 knots. What is the estimated time of arrival?",
    "choices": [
      "1400Z",
      "1405Z",
      "1415Z"
    ],
    "answerIndex": 1,
    "explanation": "Time en route = 85 / 102 = 0.833 hour = 50 minutes. 1315Z + 50 minutes = 1405Z.",
    "reference": "PHAK Chapter 16",
    "difficulty": 1
  }
];
