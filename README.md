# MatchMind

AI-powered football match intelligence for live and on-demand experiences.

MatchMind is a hackathon project exploring how synthetic, football-realistic match events can be transformed into explainable insights, real-time narratives, and personalized match recaps for fans, analysts, and broadcasters.

## Project status

Early development. The product direction and initial implementation plan are documented in [`Documentation/`](Documentation/README.md).

## Run the prototype

The first vertical slice is a dependency-free browser prototype. Open `index.html` directly in a browser, or serve the repository with any static file server:

```text
python -m http.server
```

Then open `http://localhost:8000`.

The current product direction is the focused 5v5 scenario lab in [`five-a-side.html`](five-a-side.html): choose a short attacking play, foul under pressure, or corner-kick assist and replay it on the pitch. A collapsible roster identifies all ten players, and an optional player-ratings panel updates illustrative 1–10 ratings at authored scenario moments. Each scenario has a pitch marker at its defining moment; the cue opens tailored event context and links to a collapsed detail panel with selectable layers. These are independent synthetic sequences, not a complete match; supplementary values are authored examples, not live or model-generated analytics. The two-minute demo direction is in [`Documentation/DEMO_SCRIPT.md`](Documentation/DEMO_SCRIPT.md).

The intended event-by-event behavior and review criteria for those three sequences are in [`Documentation/FIVE_A_SIDE_SCENARIO_SCRIPTS.md`](Documentation/FIVE_A_SIDE_SCENARIO_SCRIPTS.md). Copilot-ready rosters, formations, positions, and timed player routes are in [`Documentation/COPILOT_MOVEMENT_CHOREOGRAPHY.md`](Documentation/COPILOT_MOVEMENT_CHOREOGRAPHY.md). These are detailed target scripts; the current UI implementation does not yet represent every scripted detail.

The repository also retains a separate full-match experiment in [`index.html`](index.html), with its original 90-minute data plan in [`Documentation/FULL_MATCH_SCRIPT.md`](Documentation/FULL_MATCH_SCRIPT.md). Treat that as a future/reference path, not the MVP focus. Shared match-domain utilities, insights, and forecasts live in [`domain.js`](domain.js), [`insight-service.js`](insight-service.js), and [`forecast-service.js`](forecast-service.js).

## Validate the data layer

Run the contract and reducer checks with:

```text
node --test tests/*.test.js
```
