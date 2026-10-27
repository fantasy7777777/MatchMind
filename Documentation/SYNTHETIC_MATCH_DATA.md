# Synthetic 5v5 scenario data

## Current implementation

The standalone 5v5 page uses three authored, deterministic scenarios in `five-a-side.js`. The scenario lab does not use a real match API, live footage, or player-tracking feed. Every player position and ball path is authored synthetic choreography.

The current runtime structure is documented in [Data contract](DATA_CONTRACT.md). The story/action wording is in [Detailed 5v5 scenario scripts](FIVE_A_SIDE_SCENARIO_SCRIPTS.md), and the complete current keyframes are in [5v5 movement choreography](COPILOT_MOVEMENT_CHOREOGRAPHY.md).

## Scenario inventory

1. **Long ball and breakthrough:** Gray carries beyond halfway, Qi times an onside run behind a dropping line, and a lofted diagonal finds Qi in stride for a shot and goal.
2. **Foul under pressure:** Vale carries into space, Stone commits a foul, and the sequence ends before the free kick.
3. **Corner-kick assist:** Silva delivers a corner, Qi contests the aerial ball with Stone, then scores with a header.

These are separate synthetic sequences, not consecutive scenes from a single match. Their counts are sequence counts and are not full-match statistics.

## Authoring requirements

- Keep the ten stable player identities and team assignments listed in the choreography document.
- Provide one frame per integer scenario second, from zero through duration inclusive, with all ten player positions and one explicit ball state.
- Keep action time, player positions, ball ownership/flight, timeline labels, and terminal outcome synchronized.
- Use stable deterministic coordinates. Do not imply optical tracking or actual player movement measurements.
- A controlled ball is visually attached to its owner; an in-flight ball has an authored endpoint; a foul stop, aerial contest, and goal are separate states.
- End at the authored terminal state. Do not continue a free kick or other unscripted play.
- Keep the simulated-data label visible.

## Not in the current data model

Referee keyframes, referee distance, match-level possession, statistics panels, generated insights, forecasts, and provider data are future extensions. Do not infer these from the existing player positions or scenario action text.
