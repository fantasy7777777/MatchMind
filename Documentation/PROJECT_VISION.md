# MatchMind project vision

## One-line idea

MatchMind turns a live football event stream into a vivid, explainable, and viewer-controlled match experience.

## Product promise

**See what happened, understand why it mattered, and explore what might happen next.**

MatchMind should make rich match context available without forcing every viewer to consume it. A viewer can follow a clean live feed, then reveal more detail whenever they choose.

## Audience and jobs to be done

### Primary: viewers

Viewers may watch, listen to, or read the match experience. They want to:

- Understand important events beyond the scoreline.
- Follow players, ball movement, match patterns, and live statistics.
- Choose their own depth of detail, language, favorite club/player, and presentation style.
- Get useful context quickly without losing the flow of the match.

### Secondary: broadcast and streaming production teams

Producers need timely, trustworthy, structured insights they can review and turn into graphics, commentary prompts, or companion experiences. They need to know when an insight occurred, what data supports it, and how certain it is.

## Experience concept

The first prototype is a scenario lab for short, self-contained 5v5 football sequences, rather than a complete 90-minute match simulation. A viewer chooses an attacking play, a foul under pressure, or a corner-kick assist, then plays and replays the sequence. The experience combines a short event timeline, pitch visualization, sequence-level indicators, and optional insight cards.

Each event begins with a concise summary. The viewer can expand it to reveal involved players, nearby positions, ball path, referee location, tactical context, or a forecast of possible next actions. For example, on a foul, optional detail can show the referee's position and approximate distance from the incident alongside the preceding ball movement and likely restart.

## Product principles

1. **Progressive detail:** keep the default view clear; make deeper information one interaction away.
2. **Viewer control:** allow persistent preferences and quick per-event controls.
3. **Explain the evidence:** connect an insight to the events or positions that support it.
4. **Be honest about uncertainty:** forecasts are probabilities, not promises.
5. **Keep the match moving:** insights should arrive promptly and remain concise.
6. **Reuse one intelligence layer:** different audience modes should be different renderings of the same underlying facts.
7. **Design for accessibility and global audiences:** support readable language, low-clutter layouts, and future audio/multilingual output.

## Hackathon fit

The supplied rules call for synthetic, football-realistic events transformed into explainable match intelligence, narratives, and personalized experiences. MatchMind's differentiator is an integrated viewer experience that connects event-level context, spatial storytelling, and optional depth, while exposing structured outputs that could support broadcast workflows.

## Success for the first demo

A judge should be able to choose and play a short synthetic 5v5 sequence, understand an event insight, inspect movement evidence on the pitch, and control the level of detail. Scenario statistics must be labeled as sequence-level, not as full-match statistics. The demo should make clear what is simulated and what a future real-data integration would require.
