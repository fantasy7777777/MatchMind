# 5v5 movement choreography

## Purpose and status

This document is the coordinate-level source of truth for the three standalone scenarios in [Detailed 5v5 scenario scripts](FIVE_A_SIDE_SCENARIO_SCRIPTS.md). It records the exact player identities and every one-second player and ball keyframe currently used by `five-a-side.js`. The sequence data is authored synthetic choreography, not optical tracking.

The current page interpolates positional markers between these keyframes. Goalkeepers have a small orientation arrow that points toward the ball; it is a visual cue, not body-pose animation. Jumping, falling, and goalkeeper dive poses are not separately animated.

## Coordinate and playback rules

- Coordinates are percentages: `x=0` left goal line, `x=100` right goal line; `y=0` top touchline, `y=100` bottom touchline.
- Home attacks toward increasing `x`; Away attacks toward decreasing `x`.
- Coordinates describe a stylized pitch; they do not claim official small-sided pitch dimensions.
- Each scenario has a keyframe for every integer second from zero through its duration. Every keyframe contains all ten players and the ball.
- Interpolate positions using the same scenario playback clock. Pause freezes the clock and all markers; resume continues at that time; reset and scenario selection return to time zero.
- Replays must be deterministic. Do not add random jitter or regenerate players from a formation at each action.
- When `ownerId` is set, the ball marker follows that player's position. When the ball is in flight, use its authored start and endpoint. Stopped, contested, and goal states are explicit.
- Keep all coordinates inside the pitch. Team plus stable ID identifies a player; shirt number alone is ambiguous.

## Stable roster and default shape

Each side has a goalkeeper and four outfield players. Home / Gray attacks right; Away / Blue attacks left.

| Stable ID | Shirt | Name | Team | Default position |
| --- | ---: | --- | --- | --- |
| `home-gk` | 1 | Keeper | Gray | (8,50) |
| `home-7` | 7 | Vale | Gray | (30,30) |
| `home-8` | 8 | Gray | Gray | (32,70) |
| `home-9` | 9 | Qi | Gray | (62,50) |
| `home-10` | 10 | Silva | Gray | (48,50) |
| `away-gk` | 1 | Keeper | Blue | (92,50) |
| `away-4` | 4 | Stone | Blue | (70,30) |
| `away-6` | 6 | Reed | Blue | (70,70) |
| `away-8` | 8 | Park | Blue | (52,50) |
| `away-10` | 10 | Cole | Blue | (36,50) |

Scenario-specific setup coordinates override defaults when indicated. The exact browser schema and event labels currently live inline in `five-a-side.js`; extracting and validating them as a data module is future work.

## Scenario A — Long ball and breakthrough

**ID:** `breakthrough` · **Duration:** 11 seconds · **Outcome:** Gray carries beyond halfway and releases a lofted diagonal into Qi's run. Qi is behind the second-last defender at release, gathers in stride, drives into the box, and scores. **Counts:** one long pass, one shot, one goal.

Qi begins in a supporting position, checks across the far channel, then accelerates. At second 4, when Gray releases from `(55,60)`, Qi is at `(62,37)` while Stone and Reed have recovered to `(69,39)` and `(69,61)`; both are goal-side of Qi, keeping him onside in this authored sequence. Stone and Reed continue dropping toward their box while Park and Cole remain higher to press and screen the ball-side lanes. The ball arcs from `(55,60)` to `(73,36)` with control point `(65,46)`. Qi reaches it at second 5 and controls at `(74,36)` at second 6.

| Second | H-GK | H-7 Vale | H-8 Gray | H-9 Qi | H-10 Silva | A-GK | A-4 Stone | A-6 Reed | A-8 Park | A-10 Cole | Ball |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | (8,50) | (30,30) | (32,70) | (43,44) | (48,50) | (92,50) | (70,30) | (70,70) | (52,50) | (36,50) | H-8 controlled (32,70) |
| 1 | (9,50) | (32,31) | (39,68) | (44,45) | (49,51) | (91,50) | (68,32) | (70,69) | (53,51) | (38,50) | H-8 controlled (39,68) |
| 2 | (10,50) | (34,32) | (45,65) | (48,44) | (50,52) | (90,50) | (66,35) | (69,67) | (54,52) | (40,50) | H-8 controlled (45,65) |
| 3 | (11,50) | (36,33) | (51,62) | (55,40) | (52,53) | (89,50) | (66,38) | (68,64) | (55,53) | (43,50) | H-8 controlled (51,62) |
| 4 | (12,50) | (38,34) | (55,60) | (62,37) | (54,53) | (88,50) | (69,39) | (69,61) | (56,54) | (46,50) | Long pass: (55,60) → (73,36), control (65,46) |
| 5 | (13,50) | (40,35) | (56,59) | (71,36) | (56,54) | (87,50) | (74,38) | (74,60) | (58,55) | (50,50) | Pass arrives in space (73,36); Qi closes |
| 6 | (14,50) | (42,36) | (59,57) | (74,36) | (58,54) | (86,50) | (78,40) | (77,58) | (60,55) | (52,50) | H-9 controlled (74,36) |
| 7 | (15,50) | (44,37) | (61,55) | (79,39) | (60,54) | (86,50) | (82,41) | (80,56) | (61,54) | (54,50) | H-9 controlled (79,39) |
| 8 | (16,50) | (46,38) | (63,53) | (85,42) | (62,54) | (94,48) | (86,38) | (84,54) | (63,54) | (56,50) | H-9 controlled (85,42) |
| 9 | (16,50) | (48,39) | (65,52) | (89,45) | (64,54) | (94,47) | (88,40) | (89,52) | (64,54) | (58,50) | H-9 controlled (89,45) |
| 10 | (16,50) | (50,40) | (68,50) | (93,48) | (66,54) | (94,49) | (90,43) | (91,52) | (65,54) | (60,50) | Shot in flight: (93,48) → (99,50) |
| 11 | (16,50) | (50,40) | (68,50) | (93,48) | (66,54) | (95,50) | (90,43) | (91,52) | (65,54) | (60,50) | Goal at (99,50) |

Motion intent: Gray carries with his head up and releases when Qi accelerates; Qi changes from a checking movement into a forward run and meets the pass without stopping; Stone and Reed retreat then close Qi from different angles, while Park and Cole press higher; the goalkeeper stays goal-side, tracks Qi along the goal line, faces the ball, and dives after the shot. A small arrow cues goalkeeper orientation. The page represents movement with markers and a 2D authored ball path, not skeletal animation, body pose, ball height, or optical tracking.
## Scenario B — Foul under pressure

**ID:** `foul` · **Duration:** 8 seconds · **Outcome:** The opening recovery is already complete at playback time zero; Vale carries from his first keyframe and Stone clips Vale's trailing lower leg while reaching across his path at `(71,38)`. The referee awards a direct free kick to Gray with no card shown; the scenario ends before the kick is taken. **Counts:** one trip, one direct free kick, zero shots.

In the current renderer, a controlled ball is attached to its owner's player keyframe. Vale is at `(42,30)` in frame zero, so that is the visible starting position even though the raw ball object also stores `(46,35)`. The page does not animate the approach to the loose ball.

| Second | H-GK | H-7 Vale | H-8 Gray | H-9 Qi | H-10 Silva | A-GK | A-4 Stone | A-6 Reed | A-8 Park | A-10 Cole | Ball |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | (8,50) | (42,30) | (32,70) | (62,50) | (48,50) | (92,50) | (70,30) | (70,70) | (52,50) | (36,50) | H-7 controlled at (42,30) |
| 1 | (9,50) | (49,31) | (35,68) | (64,48) | (49,50) | (91,50) | (68,32) | (68,68) | (53,51) | (38,50) | H-7 controlled at (49,31) |
| 2 | (10,50) | (56,33) | (39,66) | (66,46) | (51,50) | (91,50) | (66,34) | (66,66) | (54,52) | (40,50) | H-7 controlled at (56,33) |
| 3 | (11,50) | (63,35) | (43,64) | (68,44) | (53,50) | (90,50) | (67,35) | (64,64) | (55,53) | (42,50) | H-7 controlled at (63,35) |
| 4 | (12,50) | (68,37) | (47,62) | (70,42) | (55,49) | (89,50) | (69,37) | (62,62) | (56,54) | (44,50) | H-7 controlled at (68,37) |
| 5 | (12,50) | (71,38) | (50,60) | (72,40) | (57,48) | (88,50) | (71,38) | (61,60) | (57,55) | (46,50) | Stopped at (71,38); Vale/Stone contact |
| 6 | (12,50) | (71,38) | (52,59) | (72,40) | (59,47) | (88,50) | (71,38) | (60,59) | (58,55) | (48,50) | Stopped at (71,38) |
| 7 | (12,50) | (71,38) | (54,58) | (72,40) | (61,46) | (88,50) | (72,38) | (60,58) | (59,55) | (50,50) | Stopped at (71,38) |
| 8 | (12,50) | (71,38) | (54,58) | (72,40) | (61,46) | (88,50) | (72,38) | (60,58) | (59,55) | (50,50) | Stopped at (71,38) |

The current 5v5 version does not render a referee or calculate referee distance. Do not imply that distance is available. The foul's pulsing pitch marker opens an authored contact/ruling callout and links to the optional detail panel. Vale and Stone share the incident location in the scripted frame; no leg contact or fall animation is rendered. The breakthrough and corner also have shot/header markers at their authored key moments.

## Scenario C — Corner-kick assist

**ID:** `corner` · **Duration:** 5 seconds · **Outcome:** Both teams are set in a crowded goalmouth before Silva delivers a high curling cross. Qi holds the landing point and immediately contests the ball with Stone, then scores with a header. **Counts:** one corner, one aerial contest, one headed shot, one goal.

The box is already occupied at kickoff: Vale `(84,43)`, Gray `(82,58)`, Qi `(89,47)`, Stone `(88,45)`, Reed `(85,54)`, Park `(84,39)`, Cole `(80,50)`, and the away goalkeeper `(92,50)`. Silva starts at `(98,4)`. The attackers and defenders make only small positional adjustments while the delivery travels; Qi does not run in late from midfield.

| Second | H-GK | H-7 Vale | H-8 Gray | H-9 Qi | H-10 Silva | A-GK | A-4 Stone | A-6 Reed | A-8 Park | A-10 Cole | Ball |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | (8,50) | (84,43) | (82,58) | (89,47) | (98,4) | (92,50) | (88,45) | (85,54) | (84,39) | (80,50) | H-10 controls at corner; both teams set in the goalmouth |
| 1 | (8,50) | (84,43) | (82,58) | (89,47) | (98,4) | (92,50) | (88,45) | (85,54) | (84,39) | (80,50) | Curved delivery begins: `(98,4)` → `(89,47)`, control `(76,22)` |
| 2 | (8,50) | (84,42) | (82,58) | (89,47) | (94,9) | (91,50) | (88,45) | (85,54) | (84,39) | (80,50) | Qi and Stone contest at `(89,47)`; Qi gets first contact |
| 3 | (8,50) | (84,42) | (82,58) | (89,47) | (92,10) | (90,50) | (88,45) | (85,54) | (84,39) | (80,50) | Header flight: `(89,47)` → `(99,54)` |
| 4 | (8,50) | (84,42) | (82,58) | (90,48) | (92,10) | (96,53) | (89,45) | (85,54) | (84,39) | (80,50) | Goal at `(99,54)`; goalkeeper dives after the header |
| 5 | (8,50) | (84,42) | (82,58) | (90,48) | (92,10) | (95,53) | (89,45) | (85,54) | (84,39) | (80,50) | Goal; sequence complete |

The aerial contest is not a foul. The goalkeeper tracks the delivery and dives only after the header begins. Motion cues such as jumping and diving are story intent; the current page represents them through positional markers only.
## Deferred from the current 5v5 page

Referee rendering/distance, generated insight or forecast services, scenario-stat panels, persistent viewer profiles, multilingual output, and structured analyst output are not implemented in the standalone 5v5 page. The optional detail panel shows authored synthetic examples and must not be presented as AI output.


