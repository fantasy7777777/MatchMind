# MatchMind decisions and current status

This log separates product direction from what the current 5v5 page implements.

## Product direction

| Topic | Direction |
| --- | --- |
| Product goal | Make football more engaging, detailed, customizable, and vivid for viewers. |
| Audience | Viewers first; broadcast and streaming production teams are a secondary audience. |
| Information design | Make detail optional rather than displaying every metric at once. |
| Data for hackathon prototype | Use synthetic, football-realistic data; no live API is needed for the current demo. |
| Long-term intelligence | Explain moments with evidence; make forecasts probabilistic and uncertain; expose structured output for production. |

## Current 5v5 scope

- Three independent deterministic sequences: breakthrough, foul, and curled corner/header.
- Ten stable fictional player identities; all player coordinates and ball paths are authored.
- One-second keyframes are interpolated using the scenario playback clock.
- Current UI supports scenario choice, play/pause/resume, reset/replay, timeline seeking, player markers, ball ownership/flight/stopped/contested/goal states.
- Referee position/distance, live data, AI explanations, calibrated forecasts, statistics panels, multilingual/audio output, persistent profiles, and analyst output are deferred. The foul contact and ruling currently shown are authored synthetic values in a pitch-linked callout and optional detail panel.
- The full 11-a-side replay remains a separate reference experiment.

## Next implementation recommendation

1. Extract the inline scenario objects into a data module while preserving current behavior.
2. Add validation for player rosters, keyframe coverage, coordinates, ball ownership/endpoints, and terminal states.
3. Add deterministic scenario completion summaries and tests for all-frame consistency.
4. Keep future insight/forecast features separately scoped; update the product requirements and demo script only when they are implemented.
