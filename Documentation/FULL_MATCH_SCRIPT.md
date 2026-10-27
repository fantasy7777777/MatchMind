# MatchMind synthetic 90-minute match script

> **Deferred reference:** Following the product decision to focus the MVP on short, self-contained 5v5 scenarios, this 90-minute 11-a-side script is retained as a possible future direction. It is not a requirement for the current prototype or hackathon demo. See [synthetic 5v5 scenario data](SYNTHETIC_MATCH_DATA.md).

## Purpose

This is the complete, original match script for the MatchMind competition demo. It is
fictional and provider-neutral. It is inspired by common football match patterns, not
copied from a real fixture, club, player, or provider feed.

The script is intentionally more detailed than the first MVP event list. It defines:

- Match clock and phases
- Team intent and formation
- Possession chains
- Passers, receivers, carries, pressure, tackles, and interceptions
- Corners, free kicks, shots, saves, goals, and assists
- Ball start/end locations and trajectories
- Shot foot, preferred-foot usage, technique, speed, and celebrations
- Player roles around each key action
- Decision context for passes, corners, defensive actions, and goalkeeper outcomes
- Viewer-facing intelligence opportunities

The implementation may interpolate between authored states, but it must not invent
scorers, passers, assists, locations, or outcomes that are not represented here.
Every executable event should expose an action summary where applicable: who made
the decision, who received or defended it, what technique was used, and what
actually happened next.

The current executable feed contains 144 chronologically ordered records,
including a state checkpoint at every minute from 00:00 through 90:00:

| Record type | Count |
| --- | ---: |
| Passes | 12 |
| Shots | 13 |
| Carries | 4 |
| Corners | 3 |
| Crosses | 2 |
| Interceptions | 2 |
| Tackles | 1 |
| Fouls and cards | 2 |
| Substitutions | 1 |
| Goal records | 5 (scoring result 3-2) |
| Minute state checkpoints | 91 |

The 13 shots include early saves and misses, not only the five scoring shots:
Northbridge finish with 5 shots and 5 on target; Harbor finish with 8 shots and
4 on target. The feed remains synthetic and event-based rather than continuous
optical tracking.

The minute checkpoints are not fabricated extra touches. They provide the
timeline with a complete 00:00, 01:00, ... 90:00 temporal spine containing the
current phase, possession estimate, score snapshot, and match-state description.
Exact-second action records remain separate, so a viewer can move from a
minute-level state to a pass, shot, save, corner, foul, or goal at its authored
second.

The executable scenario also includes a one-second tracking state for every
second from `00:00` through `90:00`:

- 5,401 snapshots
- 22 player records per snapshot
- Ball position, state, and owner when an authored action identifies one
- Referee position
- Possession team and phase
- Player speed, direction, active state, and current synthetic action

This tracking layer makes every player visible at every second. It is a
deterministic synthetic movement estimate, not a claim that real tracking data
was captured.

## Match identity

| Field | Value |
| --- | --- |
| Match | Northbridge United vs Harbor City |
| Competition | MatchMind Synthetic Cup |
| Venue | Northbridge Ground |
| Data mode | Synthetic |
| Duration | 90 minutes plus modeled stoppage time |
| Starting shape | Both teams 4-3-3 |
| Northbridge approach | Patient build-up, aggressive right-side transition |
| Harbor City approach | Mid-block, quick counterattacks, set-piece threat |
| Hero moment | 42:10 Northbridge foul and direct free kick |
| Headline moment | Quentin Qi's hat-trick; Harbor answer twice before a stoppage-time winner |

Coordinates use the application convention: `x: 0..100` from Northbridge's goal to
Harbor City's goal and `y: 0..100` from the top touchline to the bottom touchline.
Northbridge attacks toward increasing `x` in the first half. Teams switch ends at
half-time.

## Roster and roles

The existing fictional roster remains the source of names and shirt numbers. The
script assigns the following tactical roles:

### Northbridge United

| Shirt | Player | Role |
| ---: | --- | --- |
| 1 | Elias Ward | Goalkeeper; short distributor |
| 2 | Jon Bell | Right-back; overlaps early |
| 3 | Rafi Cole | Left-back; conservative rest defence |
| 4 | Owen Price | Right centre-back |
| 5 | Cal Reed | Left centre-back |
| 6 | Milo Hart | Defensive midfielder; foul actor at 42:10 |
| 7 | Nico Vale | Right winger; transition outlet |
| 8 | Tomas Gray | Left central midfielder; primary assist provider |
| 9 | Quentin Qi | Centre-forward; decisive finisher |
| 10 | Ivo Silva | Right central midfielder; progression and assist provider |
| 11 | Arlo King | Left winger; corner target |

### Harbor City

| Shirt | Player | Role |
| ---: | --- | --- |
| 1 | Marcus Shaw | Goalkeeper |
| 2 | Ben Fox | Right-back |
| 3 | Kian Brooks | Left-back |
| 4 | Evan Cole | Right centre-back |
| 5 | Samir Holt | Left centre-back |
| 6 | Finn Lowe | Holding midfielder |
| 7 | Jude Lane | Right winger |
| 8 | Omar Bell | Central midfielder |
| 9 | Theo Marsh | Centre-forward; early shot |
| 10 | Leo Grant | Attacking midfielder |
| 11 | Sami Okafor | Left winger; free-kick target |

## Match arc

| Phase | Clock | Match story | Intelligence opportunity |
| --- | --- | --- | --- |
| Opening structure | 00:00-10:00 | Northbridge circulate safely; Harbor settle into a mid-block | Formation, possession, passing lanes |
| First pressure cycle | 10:00-25:00 | Harbor press one poor pass and create the first shot | Press trigger, goalkeeper evidence |
| Territory exchange | 25:00-40:00 | Northbridge use width; Harbor defend a corner and counter | Corner setup, defensive recovery |
| Hero foul | 40:00-45:00 | Northbridge foul Harbor near the right touchline | Referee distance, restart forecast |
| Second-half adjustment | 45:00-65:00 | Harbor push full-backs higher; Northbridge defend transitions | Shape change, counter risk |
| End-to-end phase | 65:00-77:00 | Both teams trade attacks and goalkeeper actions | Shot chains, saves, pressure |
| Decisive transition | 78:00-82:00 | Quentin Qi strikes first; Harbor answer immediately | Pass chains, assists, trajectories |
| Closing management | 82:00-90:00 | Quentin scores again, Harbor level, then Quentin completes his stoppage-time hat-trick | Game state, risk, match-winning action |

## Full chronological script

Each row is an authored match state. A detailed action must be represented as linked
events, not as one endpoint-only event. The table below records the narrative
anchors; the executable feed additionally contains 91 minute checkpoints and
exact-second action records between these anchors. Runtime `sequence` values are
assigned after all checkpoint and action records are sorted by match clock, so the
narrative sequence column is a script reference rather than a direct array index.

Every minute from `00:00` through `90:00` has a corresponding `match_state`
record with:

- Current match phase
- Possession estimate
- Score snapshot
- Tactical state description

The exact-second layer supplies the observable football actions. It is the layer
used for shot, corner, possession, and goal statistics.

| Clock | Sequence | Action | Actors and spatial requirement | Outcome |
| --- | ---: | --- | --- | --- |
| 00:00 | 1 | Kickoff | Ball at centre; Silva taps to Gray; both teams in 4-3-3 | Northbridge possession |
| 01:12 | 2 | Centre-back recycle | Price passes back to Ward; Harbor front three hold shape | Complete |
| 03:40 | 3 | Right build-up | Ward to Bell; Bell carries 8m; Vale checks toward touchline | Complete |
| 05:05 | 4 | Switch of play | Bell switches to Cole; pass travels across the back line | Complete |
| 06:22 | 5 | Midfield receive | Gray receives between Harbor's midfield and attack lines | Turn and carry |
| 07:10 | 6 | First pressure event | Lowe closes Gray; Gray releases to Hart before contact | Complete under pressure |
| 08:45 | 7 | Harbor regain | Bell's forward pass is intercepted by Brooks | Harbor possession |
| 10:18 | 8 | Counter build | Brooks to Okafor; Okafor carries down the left | Progression |
| 11:02 | 9 | Cutback pass | Okafor cuts back toward Grant at the top of the box | Complete |
| 11:08 | 10 | First shot | Grant shoots from 20m; Ward saves low to his right | Saved; first shot |
| 12:20 | 11 | Goalkeeper distribution | Ward rolls to Price; Northbridge reset rather than counter | Complete |
| 14:36 | 12 | Northbridge overload | Bell and Vale combine on the right; Vale beats Brooks' first pressure | Carry |
| 15:02 | 13 | Cross blocked | Vale crosses toward Quentin Qi; Holt blocks behind | Corner awarded |
| 15:30 | 14 | Corner routine one | Silva takes; King attacks near zone; Quentin screens Cole | Cleared by Harbor |
| 17:44 | 15 | Second ball | Hart wins the clearance and returns it to Gray | Northbridge retain |
| 19:15 | 16 | Harbor counter | Marsh drops, lays off to Lane, then spins behind Reed | Pass and run |
| 20:02 | 17 | Defensive recovery | Reed tracks Marsh; Price steps across to block Lane's through ball | Interception |
| 22:40 | 18 | Northbridge progression | Gray to Silva; Silva carries inside and releases King wide | Complete |
| 24:10 | 19 | Offside trap | King crosses early; Quentin is flagged offside on the attempted run | Offside |
| 26:05 | 20 | Harbor build | Lowe receives from Holt; Bell presses from the side | Harbor retain |
| 27:12 | 21 | Tackle | Hart tackles Grant cleanly near the centre circle | Northbridge regain |
| 29:18 | 22 | Long possession chain | Ward, Price, Hart, Gray, Bell, Vale complete six passes | Territorial control |
| 31:05 | 23 | Northbridge shot | Nico Vale drives at the near post after the corner recycle; Shaw saves low | Saved |
| 33:20 | 24 | Harbor response | Shaw releases quickly to Fox; Lane carries into space | Counterattack |
| 34:04 | 25 | Harbor shot | Jude Lane cuts inside onto his weaker left foot | Wide |
| 34:30 | 26 | Corner routine two | Okafor takes; Cole attacks the near post; Ward punches clear | Cleared |
| 36:44 | 27 | Northbridge transition | Gray wins the second ball and sends Vale into the right channel | Advantage |
| 37:08 | 28 | Dribble and foul | Vale carries past Brooks; Brooks clips him outside the box | Free kick Northbridge |
| 37:40 | 29 | Free-kick delivery | Silva delivers toward Reed; Holt heads away | Cleared |
| 39:55 | 30 | Harbor pressure | Grant presses Ward's short pass; Ward clears long under pressure | Harbor recover |
| 42:10 | 31 | **Hero foul** | Hart arrives late on Okafor near the right touchline; referee Lee is 9m away | Direct free kick Harbor |
| 42:16 | 32 | Restart setup | Okafor stands over the ball; Marsh and Cole attack the box; Harbor line moves up | Set-piece state |
| 42:28 | 33 | Free-kick trajectory | Okafor bends a cross toward the penalty spot; Ward tracks the flight | Delivered |
| 42:34 | 34 | Free-kick shot | Marsh attacks the delivery and heads wide under pressure | Shot off target |
| 44:20 | 35 | Northbridge reset | Ward restarts short; Hart drops between centre-backs | Half-time control |
| 45:00 | 36 | Half-time | Teams switch attacking direction; Harbor full-backs begin higher | 0-0 |
| 47:10 | 37 | Harbor adjustment | Fox overlaps Lane; Lane receives into the channel | Progression |
| 48:02 | 38 | Defensive cover | Cole shifts across; Cole blocks Lane's cross | Corner Harbor |
| 48:30 | 39 | Corner delivery | Okafor takes toward the six-yard area; Ward catches | Claimed |
| 51:18 | 40 | Northbridge response | King receives a diagonal from Price and attacks Fox one-versus-one | Carry |
| 52:00 | 41 | Dribble past defender | King beats Fox and cuts inside; Lowe recovers to delay | Chance created |
| 52:14 | 42 | Shot saved | King shoots toward the far corner; Shaw makes a two-handed save | Saved |
| 55:26 | 43 | Midfield steal | Silva presses Bell after a loose touch and wins the ball | Northbridge regain |
| 56:05 | 44 | Through pass | Silva sends Quentin behind Cole; Shaw leaves his line | Chance |
| 56:22 | 45 | Goalkeeper save | Shaw blocks Quentin's low finish with his legs | Saved |
| 59:40 | 48 | Harbor counter | Shaw's release finds Grant; Grant switches to Okafor | Counter |
| 60:18 | 49 | Cross | Okafor crosses toward Marsh; Reed clears at the near post | Cleared |
| 62:05 | 50 | Substitution | Harbor replace Lane with a faster wide runner; synthetic bench event | Tactical change |
| 64:30 | 51 | Shape response | Northbridge full-backs hold deeper; Vale stays available for outlet | Game-state adjustment |
| 66:12 | 52 | Interception | Hart reads Grant's pass toward Marsh and intercepts | Northbridge regain |
| 68:20 | 53 | Blocked cross | Gray releases Bell; Bell's cross is blocked by Brooks | Corner Northbridge |
| 71:15 | 54 | Harbor shot | Okafor cuts inside from the left and curls toward the far post | Wide |
| 73:00 | 55 | Foul and card | Harbor's Lowe stops Vale's counter with a tactical foul | Yellow card |
| 78:00 | 56 | **Quentin goal one** | Gray finds Quentin in the right half-space; Quentin curls past Shaw | Northbridge 1-0 |
| 81:30 | 57 | **Harbor goal one** | Grant slips Marsh behind the line; Marsh finishes low across Ward | Northbridge 1-1 |
| 85:22 | 58 | **Quentin goal two** | Gray finds Quentin between two defenders; Quentin bends a second finish | Northbridge 2-1 |
| 87:50 | 59 | **Harbor goal two** | Grant curls Harbor level again from the edge of the box | Northbridge 2-2 |
| 89:48 | 60 | **Quentin stoppage-time winner** | Vale cuts back; Quentin completes his hat-trick | Northbridge 3-2 |
| 90:00 | 61 | Full time | Referee ends an extraordinary final | Northbridge 3-2 Harbor City |

## Required action-chain records

The following moments must be represented by linked records rather than a single
generic event:

### 11:08 Harbor shot saved

```text
Okafor cross/cutback
→ Grant receives
→ Grant shot from 20m
→ Ward moves across goal
→ low save to the right
```

Required fields:

- `primaryActorId`: Leo Grant
- `goalkeeperId`: Elias Ward
- `startLocation`, `endLocation`
- `trajectory.type`: `low`
- `outcome`: `saved`
- `relatedEventIds`: preceding cutback and save

### 15:30 Northbridge corner

```text
Vale cross blocked
→ corner awarded
→ Silva takes
→ King attacks near zone
→ Quentin screens
→ Harbor clears
```

Required fields:

- `primaryActorId`: Ivo Silva
- `relatedActorIds`: Arlo King, Luca Moss, Harbor defender
- `restartType`: `corner`
- `deliveryTargetId`: Arlo King
- `trajectory.type`: `inswinging` or `outgoing`

### 42:10 hero foul

```text
Okafor receives wide
→ Hart arrives late
→ referee observes from 9m
→ direct free kick
→ Okafor delivery
→ Marsh header wide
```

Required fields:

- Fouler and affected player
- Referee position sample
- Restart type
- Follow-up delivery and shot link
- Evidence IDs and approximate distance

### 78:00 Northbridge goal

```text
Price header
→ Hart wins second ball
→ Gray turns and carries
→ Gray passes diagonally to Silva
→ Quentin Qi carries into right half-space
→ Quentin Qi curls shot
→ Shaw dives
→ goal
```

Required fields:

- Passer IDs and receiver IDs
- Carry start/end locations
- Shooter/scorer ID
- `primaryActorId`: Quentin Qi
- `assisterId`: Tomas Gray
- Shot start/end locations
- Curved trajectory points
- Goalkeeper action
- Linked pass, shot, and goal events
- `shotDetail`: right foot, preferred foot used, curling inside-foot finish, 92 km/h
- Celebration: “The Compass” — points toward the centre circle, then knee-slides to the bench

### 81:30 Harbor response

```text
Grant slips Marsh behind the line
→ Marsh receives in the right channel
→ Marsh shoots low across Ward
→ goal, match level at 1-1
```

Required fields:

- `primaryActorId`: Theo Marsh
- `assisterId`: Leo Grant
- `goalkeeperId`: Elias Ward
- Shot start/end locations
- Low trajectory points
- Linked shot and goal events
- `shotDetail`: right foot, preferred foot used, low driven strike, 88 km/h
- Celebration: “The Harbor Salute” — cups hands toward supporters and points to Grant

### Quentin's hat-trick details

| Goal | Body part | Preferred foot used? | Technique | Speed | Celebration |
| --- | --- | --- | --- | ---: | --- |
| 78:00 | Right foot | Yes | Curling inside-foot finish | 92 km/h | The Compass |
| 85:22 | Left foot | No; right is preferred | First-time curled finish | 86 km/h | The Calm |
| 89:48 | Right foot | Yes | First-time low finish | 97 km/h | The Crown |

## Expected match totals

These are target values for the completed authored feed, not facts to be silently
forced by the reducer:

| Metric | Northbridge | Harbor City |
| --- | ---: | ---: |
| Goals | 3 | 2 |
| Shots | 5 | 8 |
| Shots on target | 5 | 4 |
| Corners | 2 | 1 |
| Offsides | 1 | 1 |
| Yellow cards | 0 | 1 |
| Possession | 53% | 47% |

The implementation should derive totals from the event records. If the authored
chain changes, the expected totals and the tests must change together.

## Viewer and producer acceptance

### Viewer

- Scrubbing to any time updates the clock, event prefix, player state, and ball state.
- Selecting 15:30 shows a corner taker, target runners, defenders, and delivery path.
- Selecting 11:08 shows the shooter, goalkeeper, shot path, and save outcome.
- Selecting 42:10 shows the foul actors, referee evidence, and free-kick follow-up.
- Selecting 78:00 shows passer, assister, scorer, goalkeeper, and curved shot path.
- Selecting 89:48 shows Quentin's hat-trick winner and the final 3-2 score.
- Timeline text identifies the meaningful action, not only the event type.

### Producer/analyst

- Every key action has stable IDs and linked evidence events.
- An event payload distinguishes observation, derived metric, and model estimate.
- Missing optional tracking data produces an unavailable state, not an invented
  player identity or action.
- Synthetic interpolation is labeled and never presented as official provider data.

## Implementation order

1. Convert the current scenario event list to the sequence above.
2. Add event fields and validation for action chains.
3. Add position snapshots at kickoff, each key moment, and each restart.
4. Add interpolation between authored snapshots.
5. Add event-specific staging for corners, shots, saves, and goals.
6. Add derived action summaries and evidence payloads.
7. Add browser tests for scrubbing, intermediate movement, and action identity.
8. Reconcile reducer totals with the expected totals table.
