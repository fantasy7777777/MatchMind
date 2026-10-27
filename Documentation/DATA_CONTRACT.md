# MatchMind data contract

## Status

This document distinguishes the current 5v5 page's inline data shape from the proposed full-match/reference schema that follows. The current page has no schema validator, provider-neutral module, reducer, AI insight service, or forecast service in its 5v5 path. A separate inline insight catalog contains authored synthetic display examples and does not calculate them from event data.

## Current 5v5 runtime shape

`five-a-side.js` defines a roster and three scenario objects. The top-level scenario key is its ID (`breakthrough`, `foul`, or `corner`). Each scenario currently contains:

```text
title: string
pitchTitle: string
explanation: string
duration: integer seconds
actions: Action[]
frames: Frame[]
```

An action currently has:

```text
second: integer
label: string
detail: string
type: string
ownerId: stable player ID | null
```

A frame is produced from the keyframe arrays and contains:

```text
second: integer
players: Record<stablePlayerId, { x: number, y: number }>
ball: {
  x: number
  y: number
  ownerId?: stablePlayerId
  endX?: number
  endY?: number
  state: "controlled" | "in_flight" | "stopped" | "contested" | "goal"
}
```

The roster has ten stable IDs: five players per side, including each goalkeeper. Coordinates use the normalized `0..100` pitch system described in [5v5 movement choreography](COPILOT_MOVEMENT_CHOREOGRAPHY.md). The simulated-data label is presentation-level; the current inline scenario objects do not each carry a `synthetic: true` property.

## Current runtime behavior

```text
Inline scenario object
        ↓
Scenario playback clock
        ↓
frameAt(time): linear interpolation of player/ball coordinates
        ↓
Timeline and pitch rendering
```

The action list provides labels and seek points. It is not currently a validated event log, and the page does not derive statistics, insights, or forecasts from it. The viewer-detail panel reads a separate authored catalog keyed by scenario and action timestamp. When `ownerId` exists, the rendered ball follows that player's interpolated position. In-flight frames use their authored endpoint or control points. Scenario completion is governed by `duration` and terminal ball state.

## Proposed extraction target

When extracting inline objects into a data module, preserve the current visible behavior first. A future validated format may add `scenarioId`, contract version, action IDs, team/actor references, explicit outcome fields, and a `synthetic` marker. Do not claim the proposed fields exist in the current runtime until implemented.

Recommended validation for that future module:

- Exactly ten stable player IDs appear in every frame.
- Keyframes cover integer seconds `0..duration` without gaps.
- Coordinates stay in `0..100`.
- A controlled ball owner exists in the roster and ball position follows that owner.
- An in-flight ball has an explicit endpoint.
- A stopped, contested, or goal state matches the scripted action and is not followed by unscripted continuation.
- Action times are monotonic and within the scenario duration.
## Extended full-match schema (future/reference)

## Match

Required fields:

```text
matchId: string
homeTeamId: string
awayTeamId: string
status: "scheduled" | "live" | "paused" | "ended"
period: 1 | 2
clockSeconds: number >= 0
pitchLengthM: number > 0
pitchWidthM: number > 0
seed: string
dataMode: "synthetic"
```

## Event

Required fields:

```text
eventId: string
matchId: string
sequence: integer >= 0
period: 1 | 2
clockSeconds: number >= 0
eventType: EventType
teamId: string | null
primaryActorId: string | null
outcome: string
location: { x: number, y: number }
synthetic: true
```

`x` and `y` are normalized to `0..100`, with `x` running left to right and `y` running top to bottom in the UI.

Optional fields include `relatedActorIds`, `secondaryActorId`, `assisterId`, `startLocation`, `endLocation`, `relatedEventIds`, `restartType`, `trajectory`, `tags`, `description`, and `confidence`.

Shot and goal events should identify the primary actor (shooter/scorer), `assisterId` when known, the linked pass or shot event, and a normalized trajectory when the UI is expected to explain how the ball traveled.

Any event may include an `actionDetail` object with authored decision context:

```text
actionDetail: {
  action: string
  passerId?: string
  receiverId?: string
  shooterId?: string
  goalkeeperId?: string
  takerId?: string
  targetId?: string
  carrierId?: string
  defenderId?: string
  foulerId?: string
  fouledPlayerId?: string
  participants?: string[]
  phase?: string
  possession?: string
  scoreSnapshot?: string
  decision?: string
  technique?: string
  outcomeDetail: string
}
```

This keeps pass intent, corner targets, defensive decisions, and goalkeeper
outcomes available across the match instead of limiting detail to goals.

Shot events may also include:

```text
shotDetail: {
  bodyPart: "left foot" | "right foot" | "head" | "left knee" | "right knee"
  preferredFoot: "left" | "right"
  preferredFootUsed: boolean
  technique: string
  shotSpeedKmh: number > 0
}
```

Goal events may include a structured `celebration` with a short `name` and
viewer-facing `description`. These are authored synthetic observations, not
biometric measurements or video-derived facts.

The controlled event vocabulary includes:

```text
pass, shot, goal, foul, corner, cross, carry, match_state, offside, tackle,
interception, possession_change, save, substitution, yellow_card, red_card,
period_start, period_end
```

`match_state` is a minute-level temporal checkpoint. It is not a football touch,
pass, shot, or possession change. Its `actionDetail` carries the current phase,
possession estimate, score snapshot, and tactical state.

## Position sample

```text
clockSeconds: number >= 0
entityId: string
x: number 0..100
y: number 0..100
speedMps?: number >= 0
directionDegrees?: number 0..360
```

Samples must stay within the pitch, align with the selected event window, and must not imply continuous tracking when only a handful of samples exists.

The retained 11-a-side reference model may also include:

```text
position: string
baselinePosition: { x: number 0..100, y: number 0..100 }
```

`baselinePosition` keeps the full 11-a-side lineup visible between focused event samples. It is a displayable synthetic formation reference, not a claim of continuous optical tracking. The 5v5 MVP does not use this fallback model; it uses explicit scenario keyframes instead.


## Scenario keyframe

The 5v5 scenario lab provides a complete one-second authored keyframe layer:

```text
second: integer 0..durationSeconds
ball: { x, y, ownerId?, state, endX?, endY? }
players: [
  {
    entityId: string
    x: number 0..100
    y: number 0..100
  }
]
synthetic: true
```

Each scenario keyframe contains all ten 5v5 players and the ball. It is authored
synthetic choreography consumed by the browser at the current scenario time; it
must not be described as optical tracking or real sensor data. The retained
11-a-side prototype has a separate full-match tracking shape and must not be
confused with this MVP contract.

Ball states are explicit:

- `controlled`: `ownerId` is required and the rendered ball follows that player.
- `in_flight`: `ownerId` is absent and an authored endpoint is required.
- `stopped`: the ball is stationary after a foul or restart state.
- `contested`: the ball is at an authored aerial-contest location.
- `goal`: the scenario has reached its terminal goal state.

## Derived insight

```text
insightId: string
matchId: string
eventId: string
asOfSequence: integer >= 0
kind: string
headline: string
explanation: string
evidenceEventIds: string[]
evidenceMetrics: object
confidence: number 0..1
generatedAt: string
language: string
synthetic: true
```

Evidence must reference existing events or explicitly calculated metrics. An insight with insufficient evidence should be unavailable rather than invented.

## Forecast

```text
forecastId: string
eventId: string
asOfSequence: integer >= 0
horizonSeconds: number > 0
alternatives: [
  {
    action: string
    probability: number 0..100
    rationale: string
  }
]
modelVersion: string
confidence: number 0..1
synthetic: true
```

Probabilities must be non-negative and sum to 100 after normalization. The UI may round values for display, but the underlying values must remain normalized. Forecasts are estimates, never facts.

## Validation rules

- Event IDs are unique within a match, and event sequences are unique and monotonic.
- Match clocks are monotonic except for explicitly modeled period transitions.
- Referenced teams and people exist in the match roster.
- Goals link to a shot or explicitly identified own-goal event.
- Foul actors are shown only when known.
- Position coordinates are within bounds.
- Referee distance is calculated only when both incident and referee coordinates exist.
- Unknown or invalid optional fields do not become fabricated UI content.

## Validation behavior

Validate the complete scenario before playback starts. The validator should:

- Return a structured list of field-level errors for invalid input.
- Refuse to start simulation when required data is invalid.
- Preserve valid zero values; do not treat `0` coordinates or probabilities as missing.
- Avoid silently sorting, filling, or correcting invalid events because that can hide scenario authoring errors.
- Allow an explicit unavailable result for optional evidence that is legitimately absent.

Validation should be reusable for future provider adapters after mapping external data into this contract.

## Derived-state responsibilities

The match-state reducer consumes the validated event history up to the current simulation position and derives:

- Score from valid goal outcomes.
- Shots and shots on target from shot outcomes.
- Awarded corners from corner events.
- Offsides from offside events.
- Possession from the documented possession-state or possession-change model.
- Selected event and associated position window for the viewer.

Each metric should have one implementation and one documented definition. The presentation layer should only format and display the result.

## Versioning

Include a contract version with the scenario or application release. Add optional fields compatibly; changing required fields or event semantics requires a new contract version and migration note.

