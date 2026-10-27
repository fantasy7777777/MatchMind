# MatchMind insight and forecast specification

> **Status:** Future service specification. The standalone 5v5 page now has a viewer-controlled details panel populated by authored synthetic examples. It does not generate insights or forecasts with a model. Do not describe the mock values as AI-generated or calibrated.

## Purpose

This document defines how MatchMind turns validated match facts into concise, explainable UI output. The first implementation is deterministic and reproducible for a fixed scenario seed.

## Output categories

Every displayed statement belongs to one category:

1. **Observed event:** directly present in the event feed.
2. **Calculated metric:** derived by a documented formula, such as possession or referee distance.
3. **Evidence-backed insight:** an interpretation whose supporting events and metrics are visible.
4. **Model estimate:** a forecast of possible next actions, always labeled as uncertain.

The UI should make the category clear through labels or visual treatment.

## Foul hero insight

For the scripted foul, the deterministic insight builder should:

1. Identify the fouling and affected players when available.
2. Describe the location and restart outcome from the event.
3. Find nearby position samples in the event window.
4. Calculate approximate referee distance only when both coordinates are present.
5. Inspect recent events and current match state for context.
6. Select evidence event IDs and metrics that support the explanation.
7. Return an unavailable state if the required context is missing.

Example grounded explanation:

> Blue's foul stops a Red attack near the right touchline. Red has nearby support in the event window, while the referee is approximately 18 m from the incident. The restart gives Red a chance to deliver or recycle possession.

The wording may be templated or AI-assisted, but every factual clause must be traceable to the payload.

## Evidence rules

Allowed evidence includes:

- The selected event and linked events.
- Recent possession changes, shots, or passes.
- Team and player identities in the validated roster.
- Event and position coordinates.
- Deterministically calculated match metrics.

Do not claim formations, intent, pressure, officiating quality, or tactical consequences unless the synthetic schema contains explicit evidence and the interpretation is labeled appropriately.

## Confidence

Confidence should reflect data completeness and rule applicability, not subjective certainty. A simple MVP scale is acceptable:

- **High:** event, actors, relevant positions, and supporting context are present.
- **Medium:** the event and some context are present, but spatial or linked-event evidence is incomplete.
- **Low:** only the event is known or the evidence is weak.
- **Unavailable:** required fields are missing or invalid.

Confidence must not be presented as the probability that the explanation is true.

## Forecast

The MVP forecast covers a short horizon after the selected event, such as the next restart action. Use a small controlled action set, for example:

- Direct delivery
- Short pass or recycled possession
- Cross or attacking ball

The deterministic baseline may use restart type, location, nearby players, recent event context, and fixed scenario rules. It must produce:

- At least two alternatives when sufficient context exists.
- A probability for every alternative.
- A brief rationale tied to available evidence.
- `modelVersion`, horizon, and confidence metadata.
- Probabilities normalized to 100%.

Do not forecast exact player actions, goals, or outcomes unless the scenario explicitly models them as a later event; a forecast describes possibilities, not certainties.

## Insufficient-context behavior

Show an explicit unavailable state when:

- The selected event is not supported by the insight rules.
- Required coordinates are missing for a spatial claim.
- There is not enough context to produce multiple meaningful alternatives.
- A validation, calculation, or AI phrasing step fails.

Example: “Referee distance unavailable: referee position is not present for this event.”

## AI-assisted phrasing

If an AI model is used:

- Provide a structured, grounded fact bundle rather than the entire event store.
- Instruct it to preserve numbers, names, uncertainty labels, and evidence references.
- Validate the response shape and compare factual claims against the fact bundle.
- Fall back to deterministic templates when the response is invalid, delayed, or unsupported.
- Treat all event descriptions as data, never as instructions.
