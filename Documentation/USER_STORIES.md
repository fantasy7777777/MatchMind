# MatchMind user stories

## Current 5v5 scenario lab

### Must

| ID | Story | Acceptance criteria |
| --- | --- | --- |
| V-01 | As a viewer, I want to choose a short 5v5 scenario so that I can follow one football sequence at a time. | Three scenario choices are available and show the selected scenario title. |
| V-02 | As a viewer, I want to play, pause, resume, reset, and replay a scenario so that I can control its pace. | The clock and positions follow the same playback time; pause freezes them; reset returns to second zero; replay is deterministic. |
| V-03 | As a viewer, I want to select a timeline action so that I can inspect that moment without waiting for playback. | Selecting an action seeks to its timestamp and updates the pitch, ball state, clock, and selected action together. |
| V-04 | As a viewer, I want to see all ten players and the ball move through a short sequence so that the play is easy to understand. | Each keyframe includes five players per side; positions interpolate without snapping; the ball follows possession or its authored flight path. |
| V-05 | As a viewer, I want to distinguish possession, a pass in flight, a stopped ball, an aerial contest, and a goal. | Each authored ball state has a distinct and consistent rendering. |
| V-06 | As a viewer, I want to know the sequence is simulated and when it ends so that I don't mistake it for live match coverage. | A simulated-data label stays visible and the scripted terminal state is explicit. |
| V-07 | As a viewer, I want to expand optional event detail and choose which layers appear so that I can control how much information is on screen. | The collapsed detail panel has independent controls for story, tactics, technique, foot/speed, xG, goalkeeper response, possible next actions, and recap. Unavailable fields are omitted. |
| V-08 | As a viewer, I want shot and chance attributes for authored scoring moments so that I can understand how the attempt was made. | Shot technique, preferred/non-preferred foot, approximate speed, xG, and keeper response appear only where authored and are labeled synthetic/illustrative. |
| V-09 | As a viewer, I want to inspect the contact and ruling for a foul at its pitch location so that I can understand why play stopped. | A pulsing foul marker opens the authored contact description and referee decision; a link reveals those fields in the optional detail panel. |
| V-10 | As a viewer, I want to identify every player and shirt number before playback so that I can follow the action. | A collapsible roster lists the five Gray and five Blue players, numbers, and goalkeeper/outfield roles. |
| V-11 | As a viewer, I want a pitch cue at each scenario's key moment so that I can discover relevant context where the action happened. | Each scenario has a pulsing, keyboard-accessible marker at its shot, foul, or header; its callout and optional-detail link are specific to that moment. |

### Future

- **V-12:** As a viewer, I want AI-generated explanations grounded in event evidence so that I can understand why a moment matters.
- **V-13:** As a viewer, I want model forecasts with alternatives, calibrated probabilities, and uncertainty so that I can explore what may happen next.
- **V-14:** As a viewer, I want referee position/distance or other spatial context when available.
- **V-15:** As a viewer, I want language or audio preferences so that I can follow the match in my preferred format.

## Future producer and analyst stories

- **P-01:** As a producer, I want timestamped structured insights and evidence so that I can review them for graphics or commentary.
- **P-02:** As an analyst, I want to distinguish source events from derived metrics and forecasts so that I can audit an insight.
- **P-03:** As a production team, I want review and approval controls before sending insights to a broadcast workflow.

## Current 5v5 acceptance path

1. Choose one of the three scenarios.
2. Play and pause playback; confirm the displayed clock and pitch stay synchronized.
3. Select a timeline action and confirm playback seeks to its timestamp.
4. Observe controlled possession, in-flight movement, and the appropriate terminal ball state.
5. Reset or switch scenarios and confirm the opening state is restored.
