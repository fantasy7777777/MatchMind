# Detailed 5v5 scenario scripts

## Purpose and status

This document is the authoritative viewer-facing script for the standalone 5v5
scenario lab. Each scenario is synthetic, deterministic, self-contained, and
independent of the retained 11-a-side replay. Scenario counts are sequence
counts, never match statistics.

The implementation uses the one-second player and ball keyframes in
[Copilot movement choreography](COPILOT_MOVEMENT_CHOREOGRAPHY.md). This document
defines the story and viewer language; the choreography document defines the
coordinates and movement states.

## Shared rules

- The pitch uses normalized coordinates: `x=0` is the left goal line,
  `x=100` the right goal line, `y=0` the top touchline, and `y=100` the bottom
  touchline.
- Home attacks toward increasing `x`; Away attacks toward decreasing `x`.
- Each side has five players, including a goalkeeper.
- Coordinates are authored synthetic positions, not optical tracking or
  measurements from a real provider.
- Controlled possession attaches the ball to the named player. Passes, corners,
  headers, and shots detach it and use an authored flight path.
- Playback interpolates between adjacent keyframes. It must not teleport
  players or the ball.
- A scenario ends at its defined terminal state. It does not imply a subsequent
  restart or continuation.
- The UI must show `Simulated scenario` and must not present sequence counts as
  full-match totals.

## Shared roster and default formation

| Stable ID | Side | Player | Shirt | Default position |
| --- | --- | --- | ---: | --- |
| `home-gk` | Gray | Keeper | 1 | (8,50) |
| `home-7` | Gray | Vale | 7 | (30,30) |
| `home-8` | Gray | Gray | 8 | (32,70) |
| `home-9` | Gray | Qi | 9 | (62,50) |
| `home-10` | Gray | Silva | 10 | (48,50) |
| `away-gk` | Blue | Keeper | 1 | (92,50) |
| `away-4` | Blue | Stone | 4 | (70,30) |
| `away-6` | Blue | Reed | 6 | (70,70) |
| `away-8` | Blue | Park | 8 | (52,50) |
| `away-10` | Blue | Cole | 10 | (36,50) |

Scenario-specific setup rows override these defaults where stated. Player
identity is the stable ID plus team, not the shirt number alone.

## Scenario A — Long ball and breakthrough

- **ID:** `breakthrough`
- **Duration:** 11 seconds
- **Start:** Gray controls in the lower channel at `(32,70)`; Qi starts in a supporting position at `(43,44)`.
- **Outcome:** Qi checks into the far channel, then accelerates as Gray looks up. Stone and Reed drop toward the box while Park and Cole continue pressing higher. At the release, Qi is behind the second-last defender; Gray sends a lofted diagonal into space, Qi gathers in stride, drives into the penalty area, and scores.
- **Sequence counts:** one long pass, one shot, one goal.

### Authored beats

| Time | Beat | Viewer wording |
| --- | --- | --- |
| 00:00–00:02 | Gray carries forward; Qi checks into the far-side channel and scans the defensive line. | Gray advances while Qi finds space. |
| 00:03 | Qi accelerates forward as Stone and Reed begin retreating toward the box. | Qi starts the run; Blue's last line drops. |
| 00:04 | Gray releases from `(55,60)` toward `(73,36)` with a curved, lofted path. Qi is at `(62,37)` and remains behind Stone `(69,39)` and Reed `(69,61)` at release. | Gray spots Qi's run and sends the long ball; Qi is onside. |
| 00:05–00:06 | Qi closes on the dropping ball and controls at `(74,36)` without stopping his forward momentum. | Qi meets the pass in stride. |
| 00:07–00:09 | Qi drives toward the box as Stone closes from the inside and Reed converges to protect the central lane. The goalkeeper stays goal-side, tracks Qi laterally, and faces the ball. | Qi turns the first touch into a direct attack under pressure. |
| 00:10 | Qi shoots from `(93,48)` toward `(99,50)`; the goalkeeper dives across the goal after the strike. | Qi strikes across the goalkeeper, who reacts but cannot reach it. |
| 00:11 | Ball is in goal; no further play is implied. | Qi scores. Sequence complete. |

The run begins onside and stays behind the second-last defender when Gray releases. The ball is played into space in front of Qi, not directly to a stationary target. Defenders recover at different depths: Stone and Reed protect the box, while Park and Cole continue to press and screen around midfield. Exact keyframes are in [Copilot movement choreography](COPILOT_MOVEMENT_CHOREOGRAPHY.md).

At second 10, a pulsing marker beside Qi's shot opens the authored shot and goalkeeper detail, with a link to the matching optional layers.
## Scenario B — Foul under pressure

- **ID:** `foul`
- **Duration:** 8 seconds
- **Start:** The opening recovery is already complete at playback time zero. Vale has the ball attached at his first player keyframe `(42,30)`; the loose-ball approach is not animated in the current page.
- **Outcome:** Stone trips Vale at `(71,38)` by clipping his trailing lower leg; the referee awards a direct free kick to Gray and shows no card.
- **Sequence counts:** one trip, one direct free kick, zero shots.

### Authored beats

| Time | Beat | Viewer wording |
| --- | --- | --- |
| 00:00–00:04 | Vale carries from his opening position `(42,30)` to `(68,37)` while Gray and Qi fill support lanes and Stone recovers. | Vale drives into space; Blue recovers. |
| 00:05 | As Vale pushes the ball from `(68,37)` toward `(71,38)`, Stone reaches across his path from goal side and clips Vale's trailing lower leg. Vale stumbles, loses control, and the referee whistles for a direct free kick to Gray. No card is shown in this authored version. | Stone trips Vale. Direct free kick to Gray; no card. |
| 00:06–00:08 | Players separate into a restart shape; the free kick is not taken. | Restart shape. Sequence complete before the kick. |

The penalty-area boundary begins at `x=86`, so the foul at `(71,38)` is outside
the area and the restart is a direct free kick, not a penalty. The optional
detail panel gives the authored contact description and ruling. A pulsing
incident marker on the pitch opens a nearby callout and can reveal those same
details in the optional panel. This does not render a referee position or
calculate referee-to-incident distance. The trip and ruling are scripted
synthetic events; no leg-contact or fall animation is shown.

## Scenario C — Corner-kick assist

- **ID:** `corner`
- **Duration:** 5 seconds
- **Start:** Silva controls a stationary ball at `(98,4)`. Attackers and defenders are already arranged in a crowded goalmouth, with Qi stationed at the intended contact point `(89,47)` and Stone marking him.
- **Outcome:** Silva sends a high, curved delivery over the crowd. Qi and Stone meet it immediately; Qi gets first contact and scores with a header.
- **Sequence counts:** one corner, one aerial contest, one headed shot, one goal.

### Authored beats

| Time | Beat | Viewer wording |
| --- | --- | --- |
| 00:00 | Both teams hold their set-piece positions; Qi is already near the landing point. | Players set for the corner. |
| 00:01 | Silva delivers from `(98,4)` toward `(89,47)` along a smooth quadratic arc with control point `(76,22)`. | Silva curls a high cross over the crowd. |
| 00:02 | Qi and Stone contest at `(89,47)`; Qi makes first contact. | Qi meets the dropping ball immediately; Qi gets the first touch. |
| 00:03 | Qi redirects `(89,47)` toward `(99,54)`. | Qi flicks the header toward the far side. |
| 00:04 | Ball crosses the line at `(99,54)`; the goalkeeper dives after the header. | Qi scores from Silva's corner. |
| 00:05 | No further play is implied. | Sequence complete. |

Both teams make only small adjustments while the ball is in flight; Qi does not sprint in from midfield after the cross has already reached the box. The aerial contest is not a foul. The goalkeeper tracks the cross and reacts to the header. At second 3, a pulsing marker beside Qi's header opens the authored delivery and goalkeeper outcome, with a link to the matching optional layers.
## Viewer and authoring acceptance criteria

- Selecting a scenario resets its clock, keyframes, ball state, and timeline.
- The selected action, clock, player positions, and ball state always refer to
  the same scenario time.
- Controlled possession has one clear visual owner; the separate ball marker is
  hidden while the owner marker is highlighted.
- In-flight, stopped, contested, and goal ball states are visually distinct.
- The final state is explicit and does not imply an un-scripted next action.
- If a future view adds forecasts, they must be labelled illustrative estimates,
  be generated before the predicted action, and sum to 100%.

## Deferred features

The current standalone page does not implement referee rendering, live or
model-generated forecasts, scenario statistics, multilingual output, or a
structured analyst-output panel. Its detail selector displays only authored
synthetic examples; do not describe those examples as live AI analysis.


