# Product requirements

## Product direction

MatchMind is intended to make football easier to follow through vivid, explainable, customizable match context. The long-term product is viewer-first and can also provide structured insights for broadcast production.

## Current MVP: standalone 5v5 scenario lab

The current web prototype is a deterministic replay of three self-contained synthetic 5v5 sequences. It is a focused demonstration of event order, player movement, and ball-state rendering. It is not a live-data product or a full match companion yet.

The authoritative scenario stories are in [Detailed 5v5 scenario scripts](FIVE_A_SIDE_SCENARIO_SCRIPTS.md); exact implemented coordinates and keyframes are in [5v5 movement choreography](COPILOT_MOVEMENT_CHOREOGRAPHY.md).

## Current user experience requirements

1. Show three selectable scenarios: long ball and breakthrough, foul under pressure, and corner-kick assist.
2. Show a visible synthetic-scenario label, selected scenario title, and scenario clock.
3. Let the viewer play, pause, resume, reset, and replay the selected scenario.
4. Let the viewer seek to any point in the current scene with a keyboard-accessible progress slider, or select an action in the timeline to jump directly to its timestamp.
5. Render five players per side with stable identities and one-second authored positions.
6. Interpolate player and ball positions against one playback clock; replaying the same scenario produces the same movement.
7. Distinguish controlled, in-flight, stopped, contested, and goal ball states. During possession, attach the ball to the named player; hide the separate ball marker as appropriate.
8. End each sequence in its scripted terminal state. A foul sequence ends before its free kick; a goal sequence ends at the goal.
9. Ensure displayed action label, selected timeline item, scenario clock, player positions, and ball state all refer to the same scenario time.
9a. Keep the progress slider, elapsed/total time labels, and playback synchronized; manual seeking pauses playback and updates the scene and moment details immediately.
10. Keep the scenario self-contained and avoid presenting its events or counts as full-match statistics.
11. Provide a collapsed, optional match-detail panel with independently selectable story, tactical, technique, foot/speed, xG, goalkeeper, possible-next-action, and recap layers.
12. Show event-specific detail only when authored for the selected moment; label speed/xG as illustrative synthetic estimates and next actions as authored possibilities, not model predictions.
13. Provide a collapsible roster that identifies all ten players, their teams, shirt numbers, and goalkeeper/outfield roles.
14. Show a scenario-specific pitch marker at each sequence's defining shot, foul, or header; opening it reveals a concise callout and a link to the matching optional detail layers.
15. On wide screens, keep the pitch visible beside the timeline and optional details while the viewer scrolls; on narrow screens, use the normal stacked layout.
16. Provide an optional per-player performance rating panel that updates during scenario playback and seeking, shows a short reason for each rating change, and clearly labels all scores as illustrative synthetic ratings rather than official or AI-generated assessments.

## Current scenario acceptance criteria

- **Breakthrough:** Gray carries beyond halfway; Qi times an onside run behind a dropping line; Gray plays into space; Qi gathers in stride under pressure and scores. The goalkeeper stays goal-side, tracks the ball, and shows a facing cue.
- **Foul:** Vale carries into space, Stone commits the foul, play stops, and the free kick is not taken.
- **Foul detail:** A pitch incident cue opens the authored contact description and referee ruling; viewers may reveal these in the optional detail panel. The incident is a trip outside the penalty area, resulting in a direct free kick and no card in this scenario.
- **Corner:** Silva delivers the corner, Qi and Stone contest the aerial ball, Qi flicks a header into the goal, and the contest is not labeled a foul.
- **Shot detail prototype:** Seeking Qi's shot or header exposes the selected viewer detail layers, including synthetic shot attributes and chance estimates where authored.
- **Context markers:** The long-ball shot, foul, and corner header each expose a clickable pitch cue at their key moment, with scenario-tailored information.
- **Roster:** A collapsible roster lists all ten named players, teams, shirt numbers, and playing roles.
- **Player ratings:** An optional panel lists both teams' ratings on a 1–10 scale; ratings begin at a neutral baseline and update at authored contribution/outcome moments, with a brief explanation and a synthetic-data disclaimer.

## Deferred product features

The following remain part of the wider product direction, but are not implemented in the current 5v5 page and must not be presented as available in its demo:

- Live event ingestion, AI-generated narratives/explanations, and model-generated forecasts. The current panel displays scenario-authored text and illustrative probabilities only.
- Referee rendering or referee-to-incident distance.
- Scenario or match statistics panels.
- Persistent viewer preferences, audio, or multilingual delivery.
- Structured analyst or broadcast output.
- Real match data/API or live video processing.

If one of these features is added later, update this document, the scenario/data contracts, and the demo script together.

## Longer-term product requirements

When the project moves beyond the scenario lab, MatchMind may add evidence-backed explanations, optional detail layers, personalized presentation, forecasts with uncertainty, and reusable structured insights for production. These features should use grounded data and should not be claimed until implemented and demonstrated.

## Quality and trust requirements

- Use fictional teams and players and label all scenario content synthetic.
- Do not imply optical tracking, real referee measurements, live data, or model accuracy.
- Keep scenario data deterministic and bounded to the pitch.
- Do not invent an action or continuation after a scenario's terminal state.
- Keep future insights and forecasts distinct from authored events and calculated facts.
