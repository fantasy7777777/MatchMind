# MatchMind documentation

This folder captures the product direction, hackathon constraints, and working implementation plan for MatchMind. These documents are a starting point and should evolve with the prototype.

## Documents

- [Project vision](PROJECT_VISION.md) — audience, problem, promise, and product principles.
- [Product requirements](PRODUCT_REQUIREMENTS.md) — user journeys, MVP scope, and acceptance criteria.
- [Synthetic match data](SYNTHETIC_MATCH_DATA.md) — proposed event and position data for a convincing demo.
- [Detailed 5v5 scenario scripts](FIVE_A_SIDE_SCENARIO_SCRIPTS.md) — action-by-action sequence, movement, viewer output, and acceptance criteria for the three scenarios.
- [Copilot movement choreography](COPILOT_MOVEMENT_CHOREOGRAPHY.md) — authoritative 5v5 roster, keyframes, ball states, and movement rules for the three implemented scenarios.
- [Technical plan](TECHNICAL_PLAN.md) — prototype architecture, milestones, and open decisions.
- [Decisions and open questions](DECISIONS_AND_OPEN_QUESTIONS.md) — confirmed direction, working assumptions, and choices to discuss next.
- [Data sources](DATA_SOURCES.md) — simulated data plan and notes on real-data APIs for future evaluation.
- [Hackathon checklist](HACKATHON_CHECKLIST.md) — submission constraints extracted from the supplied official rules.
- [User stories](USER_STORIES.md) — prioritized viewer and producer stories with acceptance criteria.
- [Security model](SECURITY_MODEL.md) — prototype trust boundaries, controls, and future production requirements.
- [Data contract](DATA_CONTRACT.md) — current inline 5v5 data shape and separately marked future schema.
- [Insight and forecast specification](INSIGHT_AND_FORECAST_SPEC.md) — future grounding, evidence, confidence, and forecast behavior.
- [Demo script](DEMO_SCRIPT.md) — timed two-minute recording plan and judging traceability.
- [Full match script](FULL_MATCH_SCRIPT.md) — retained as a future concept/reference; a 90-minute simulation is not part of the current MVP.

## Implementation order

The current 5v5 page uses deterministic scenario data and keyframe interpolation.
The next engineering step is to move the in-page scenario objects into a
validated data module and add scenario-level completion summaries. Model
forecasts, referee position/distance, and analyst output remain optional future
extensions; the foul ruling shown today is authored scenario content.

## Source of truth

The hackathon constraints in these documents are based on the overview shared by the project owner and `OFFICIAL RULES.md` supplied for this project. The official rules say they prevail over conflicting hackathon materials. Recheck the organizer's current rules and submission platform before submitting, since the rules can change.

## Current assumptions

- MatchMind's product goal is viewer-first, with future broadcast/production support.
- The current page presents short scenario replays; richer fan and analyst modes remain future work.
- The hackathon prototype uses synthetic, football-realistic data. No real match API is required for the first version.
- The current MVP direction is a small set of self-contained synthetic 5v5 scenarios.
- Scenario-level counts describe only that sequence; they are not full-match statistics.
- Authored keyframes create the current player/ball movement; they are not real tracking measurements.
- Referee position/distance, match-stat panels, live analysis, AI explanations, calibrated predictions, and multilingual delivery are deferred. The foul contact/ruling callout and optional detail panel show authored synthetic examples only.
