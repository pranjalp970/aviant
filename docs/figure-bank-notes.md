# Figure bank — sources and review notes

Bank: `src/content/banks/ppl-figure-bank.ts` (export `PPL_FIGURE_BANK`, 120 questions), merged with the practice bank in
`src/content/banks/ppl-bank.ts`. It feeds every quiz, the mock test, review and the question bank. The "Charts and calculations"
quiz (`ppl-figures`) draws only from this set. The onboarding diagnostic leaves it out to stay short.

Figures: PNG exports in `assets/figures/akts-8080-2h/` (in git, not deployed), converted to WebP in `public/figures/akts-8080-2h/`
by `node scripts/build-figures.mjs`. Sectional excerpts and the time-zone map use lossy WebP at quality 85, and everything else is
near-lossless. Total size went from 32 MB to 6.6 MB. Questions show figures in `src/components/portal/FigureViewer.tsx`, which has
zoom from 1× to 4×, drag or arrow keys to pan, ctrl-scroll or pinch to zoom, and a full-screen view.

## Sources

| Source | Edition / date | Link |
|---|---|---|
| FAA-CT-8080-2H, *Airman Knowledge Testing Supplement for Sport Pilot, Recreational Pilot, Remote Pilot, and Private Pilot* | Published 2018, effective June 11, 2018. Listed as the current edition on the FAA supplements page (page last updated Sep 29, 2026). PDF: 113 pages, 176,480,343 bytes, SHA-256 `738a0cd5c429e20888e94fd490d90ba09223ac4d350d06fe228788d4b502f4fd` (downloaded Oct 28, 2026). | https://www.faa.gov/sites/faa.gov/files/training_testing/testing/supplements/sport_rec_private_akts.pdf (index: https://www.faa.gov/training_testing/testing/supplements) |
| ACS Knowledge Test Table (PAR format) | "Updated: October 2024" | https://www.faa.gov/training_testing/testing/acs/acs_knowledge_test_table.pdf |
| FAA Airman Testing community advisory, April 2023 | PAR time cut to 120 min effective Apr 24, 2023 | https://www.faa.gov/training_testing/testing/community_advisory_april_2023 |

The explanations also cite the AIM, 14 CFR 91.151 and 91.157, the PHAK (FAA-H-8083-25), the Weight & Balance Handbook (FAA-H-8083-1B), AC 00-45H and the FAA Aeronautical Chart User's Guide. All questions are original; no third-party test-prep questions were used.

## Current PAR test format (verified on faa.gov)

- **60 questions, 2.0 hours, minimum passing score 70.** Source: ACS Knowledge Test Table (Oct 2024).
- The 120-minute limit took effect **April 24, 2023**, reduced from 150 minutes. Source: April 2023 community advisory.
- **Correction to your note.** I did not find FAA confirmation that PAR includes 5 unscored questions. The April 2023 advisory adds 5 unscored validation questions to the ATM, ATS and IRA tests (effective July 31, 2023) and does not mention them for PAR. The FAA table lists PAR as 60 questions, which agrees. Check the current PSI PAR Applicant Information Bulletin before stating "60 + 5" in the app.

## How the figures were made and checked

- Each figure page was rendered at **200 dpi** with `pdftoppm` and cropped to the figure, without the page header, caption or page number. The sectional excerpts in the PDF are 300 ppi rasters.
- Figures that are printed sideways in the PDF (24, 25, 27, 35, 38) are rotated upright.
- `figure-32-33.png` places Figures 32 and 33 side by side, for questions that need both tables.
- Chart readings were checked against the official PDF itself, viewed at 150–300% zoom, not from memory. Text figures (METAR, TAF, winds aloft, Chart Supplement, W&B and performance tables) were also cross-checked against text extracted from the PDF.
- Every calculation was worked twice. The first pass was during authoring. The second was an independent script (`verify.py`, not committed) that recomputed 35 calculated answers with different methods, such as a vector-search wind triangle and raw table lookups. It found **0 mismatches**.
- **Deliberately omitted:** questions that need a plotter or ruler to measure course and distance on a sectional excerpt. Each excerpt is marked "not to scale," and measurements from screenshots aren't reliable enough. Course, distance and time math is covered with stated numbers in the E6B section instead. Figures 16, 29 and 30 do not exist in the 2H edition.

## Figure manifest (files actually used)

| File | Figure | Title | PDF page (printed) | What it shows / used for |
|---|---|---|---|---|
| figure-8.png | 8 | Density Altitude Chart | 42 (2-8) | DA chart + altimeter-setting → pressure-altitude conversion table |
| figure-12.png | 12 | Aviation Routine Weather Reports (METAR) | 46 (2-12) | METAR/SPECI for KINK, KBOI, KLAX, KMDW, KJFK |
| figure-15.png | 15 | Terminal Aerodrome Forecasts (TAF) | 49 (2-15) | TAFs for KMEM, KOKC |
| figure-17.png | 17 | Winds and Temperatures Aloft Forecast | 50 (2-16) | FB WBC: ALS, AMA, DEN, HLC, MKC, STL |
| figure-20.png | 20 | Sectional Chart Excerpt | 53 (2-19) | Norfolk VA: Class C, Elizabeth City Class D, balloon caution, refuges |
| figure-21.png | 21 | Sectional Chart Excerpt | 54 (2-20) | Minot ND: Class D, MEF, obstructions, Garrison |
| figure-22.png | 22 | Sectional Chart Excerpt | 55 (2-21) | N. Idaho: Sandpoint, Priest River, Coeur d'Alene, MEF |
| figure-23.png | 23 | Sectional Chart Excerpt | 56 (2-22) | E. Georgia: Bulldog MOAs, VR97-1059, Plantation, Statesboro |
| figure-24.png | 24 | Sectional Chart Excerpt | 57 (2-23) | NE Texas: Sulphur Springs, Commerce, Paris VORTAC (rotated upright) |
| figure-25.png | 25 | Sectional Chart Excerpt | 58 (2-24) | Dallas–Fort Worth Class B, Addison, Collin Co, Love Field (rotated upright) |
| figure-26.png | 26 | Sectional Chart Excerpt | 59 (2-25) | Central ND: Jamestown, Devils Lake East MOA, R-5401–R-5403 |
| figure-27.png | 27 | Time Conversion Table | 60 (2-26) | Local time → UTC (rotated upright) |
| figure-32.png | 32 | Airplane Weight and Balance Tables | 63 (2-29) | Useful-load weights/moments, empty weight, CG limits |
| figure-33.png | 33 | Airplane Weight and Balance Tables | 64 (2-30) | Min/max moment/100 by weight (also used inside figure-32-33.png) |
| figure-32-33.png | 32 + 33 | (combined) | 63–64 | Both W&B tables side by side |
| figure-35.png | 35 | Airplane Power Setting Table | 66 (2-32) | Twin cruise table: TAS, fuel flow per engine (rotated upright) |
| figure-36.png | 36 | Crosswind Component Graph | 67 (2-33) | Headwind/crosswind components |
| figure-37.png | 37 | Airplane Landing Distance Graph | 68 (2-34) | Landing graph + approach-speed table |
| figure-38.png | 38 | Airplane Landing Distance Table | 69 (2-35) | 1,600-lb landing table with wind/temp/grass notes (rotated upright) |
| figure-40.png | 40 | Airplane Takeoff Distance Graph | 71 (2-37) | Takeoff graph + lift-off/50-ft speed table |
| figure-47.png | 47 | VASI Illustrations | 78 (2-44) | Two-bar VASI indications |
| figure-48.png | 48 | Airport Diagram | 79 (2-45) | Displaced threshold, closed runway, blast pad chevrons |
| figure-49.png | 49 | Airport Diagram | 80 (2-46) | Closed Rwy 4-22, displaced thresholds on 18/36, segmented circle |
| figure-64.png | 64 | Airport Markings | 95 (2-61) | Hold signs, holding position markings, stop bar |
| figure-65.png | 65 | U.S. Airport Signs | 96 (2-62) | Mandatory, location, direction and destination signs |
| figure-77.png | 77 | Chart Supplement | 108 (2-74) | Pierre Rgnl (PIR), Pine Ridge (IEN) |
| figure-79.png | 79 | Chart Supplement | 110 (2-76) | Sioux Gateway (SUX), Sioux City VORTAC |
| figure-81.png | 81 | Chart Supplement | 112 (2-78) | Crawford (99V), Creede (C24), Del Norte (8V1) |

The PNG sources total about 31 MB; the app serves the WebP versions.

## Question counts

By category (as requested):

| Category | Count | Target |
|---|---|---|
| Sectional chart reading | 30 | 30 |
| Airport signs, markings, diagrams, VASI | 15 | 15 |
| Chart Supplement | 10 | 10 |
| Weather text products (METAR 5, TAF 5, winds aloft 5) | 15 | 15 |
| Weight and balance | 15 | 15 |
| Performance charts | 15 | 15 |
| E6B / navigation math | 20 | 20 |
| **Total** | **120** | 120 |

By topic id: navigation 41 · airport-ops 25 · performance 30 · weather-services 15 · airspace 9.
101 questions have a figure; 19 are pure calculations with no figure. Correct-answer positions in the source are 0: 42, 1: 48, 2: 30 (they are shuffled at runtime anyway).

## needsReview list (4), resolved

All four were checked against the figures at high zoom before the bank went live, and each answer is correct:
- navigation-009: area 1 is west of the meridian and in the 7¹ quadrant.
- airspace-006: area 7 lies outside the 30 shelf boundary, in the 110/40 shelf.
- airport-ops-010: item E is the taxiway holding position marking. The three lights are clearance bar lights, and the circled 4 is a
  geographic position marking. The explanation now mentions the clearance bar lights.
- performance-030: on the chart, the 3,000 ft line at 30 °C reads about 5,400 ft.

The flags have been removed from the bank.

| id | Why it was flagged |
|---|---|
| ppl-fig-navigation-009 | Fig 22 area 1 MEF (7,100). Grid-line placement around area 1 was hard to confirm at the zoom used, so check that area 1 is in the "7¹" quadrant. |
| ppl-fig-airspace-006 | Fig 25 area 7 Class B floor 4,000 ft (110/40 label sits beside area 7). The 110/30 shelf boundary is close, so confirm which shelf contains area 7. |
| ppl-fig-airport-ops-010 | Fig 64 item E, identified as a taxiway/taxiway holding position marking. The figure also shows a circled "4" nearby whose meaning wasn't confirmed. |
| ppl-fig-performance-030 | Fig 8 density altitude (~5,400 ft). Computed with the ISA formula (5,376 ft) and the rule of thumb (5,520 ft), not read off the plotted chart lines; the wrong choices are 2,000+ ft away. |

## Other things a human should check

- The Fig 8 (pressure altitude) and Fig 38 (landing table) answers come from extracted text and are exact. The Fig 36 crosswind answers are trigonometric, and the graph is the same geometry.
- The E6B true-airspeed answer (about 134 kt) is the exact ISA calculation; a physical E6B reads about the same.
- Each Fig 47/48/49/64/65 question uses only items whose meaning was unambiguous at 200% zoom. Fig 47 item B, Fig 48 items B, D and F, the Fig 49 tetrahedron, and the Fig 64 B, D and F items were skipped because they were ambiguous.
- Spot-check the alt text before shipping.
