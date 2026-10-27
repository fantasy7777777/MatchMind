# Technical plan

## Current 5v5 implementation

The current scenario page is a dependency-free browser experience in `five-a-side.html`, `five-a-side.js`, and `five-a-side.css`. Three deterministic scenario objects are authored inline in `five-a-side.js`; each contains a title, pitch headline, explanation, duration, ordered action labels, player keyframes, and ball keyframes.

At playback time, `frameAt` interpolates each player's position against a single scenario clock and evaluates authored quadratic ball curves. The rendered page supports scenario selection, play/pause/resume, reset/replay, action-timeline seeking, possession highlighting, goalkeeper-facing arrows tied to ball position, and controlled/in-flight/stopped/contested/goal ball states. Defensive pressure is represented through authored recovery and closing positions; no tackling or dive animation is rendered.

The current page includes a collapsible detail panel with independent view-layer controls and event-keyed authored story/tactical/shot/foul detail. Each scenario has a pulsing pitch marker at its key shot, foul, or header; its callout can reveal the same tailored fields in the optional panel. A separate collapsible roster exposes player names, shirt numbers, and roles. An optional performance-rating panel updates authored 1–10 ratings at scripted contribution and outcome moments and gives a short reason for each change. These ratings are illustrative scenario data, not an official scale or model output. This is a presentation prototype: it does not call an AI model, ingest a live feed, calculate xG/speed, or generate forecasts. Displayed probabilities and measurements are synthetic illustrative content. The page still lacks referee position rendering, match-stat panels, persistent viewer profiles, multilingual delivery, and producer/analyst output.

## Source of truth

- Scenario meaning and viewer wording: [Detailed 5v5 scenario scripts](FIVE_A_SIDE_SCENARIO_SCRIPTS.md).
- Exact current roster and coordinates: [5v5 movement choreography](COPILOT_MOVEMENT_CHOREOGRAPHY.md).
- Current browser behavior: `five-a-side.js` and `five-a-side.html`.
- Longer-term domain/data ideas: [Data contract](DATA_CONTRACT.md), clearly separated from the current implementation.

When these disagree, update the docs and code together; do not silently treat an aspirational contract as a current capability.

## Recommended next engineering step

1. Extract the scenario objects from `five-a-side.js` into a provider-neutral data module without changing the visible movement.
2. Define a small validator for scenario metadata, action timestamps, all-ten-player keyframes, ball owners/endpoints/states, and coordinate bounds.
3. Add a deterministic completion summary for each scenario, using only authored actions and outcomes.
4. Add tests for every keyframe's roster completeness, ball/player attachment, terminal state, and event-to-keyframe consistency.
5. Replace authored insight examples only after adding evidence-grounded services, provenance, uncertainty handling, and an evaluation set; keep production and fan presentation profiles separately scoped.

## Implementation constraints

- Keep one playback clock as the source for the clock display, action selection, player interpolation, ball interpolation, and progress percentage.
- Keep stable IDs for players; do not recreate identities as time changes.
- Do not regenerate movement randomly or move players from a formation baseline each frame.
- Keep ball ownership consistent with the current player's location. Passes and shots need authored endpoints; scenario-ending states must not continue into unscripted play.
- Keep the 5v5 prototype separate from the retained 11-a-side experiment unless a deliberate shared contract is implemented.
- Do not add match-wide statistics to an isolated scenario.

## Deferred product work

Live event analysis, AI-generated narratives/explanations, model forecasts, referee position/distance, match statistics, multilingual/audio output, persistent personalization, and broadcast/analyst payloads remain future work. The current detail controls only personalize the display of authored synthetic examples. The [product requirements](PRODUCT_REQUIREMENTS.md) and [demo script](DEMO_SCRIPT.md) define which capabilities can currently be claimed.
