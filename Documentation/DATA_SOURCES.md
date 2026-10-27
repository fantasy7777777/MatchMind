# Data sources and API options

## Decision for this hackathon build

Use **synthetic, football-realistic data** as the default and build the demo around a local, seeded event scenario. The supplied official rules explicitly say projects must use synthetic football-realistic data. Do not make a live-data vendor a dependency for the submission. If considering real match data for any hackathon-facing feature, request clarification from the organizer first and check the provider's license and the latest rules.

The synthetic feed can include event locations, selected player/ball position samples, and referee coordinates. This gives MatchMind enough material to demonstrate trajectories and optional spatial detail without requiring footage or a live tracking feed.

## Real-data providers to evaluate for a future version

| Provider | What the current public documentation indicates | Fit and caveat |
| --- | --- | --- |
| [API-FOOTBALL / API-Sports](https://www.api-football.com/documentation-v3) | Their current guides describe live fixtures, event feeds, lineups, and match statistics; some live endpoints are described as updating about every 15 seconds. | Could be a practical developer prototype source if its coverage, plan limits, latency, and usage rights fit. Event feeds/statistics should not be assumed to include continuous player tracking or referee coordinates. Confirm current plan and licensing directly. |
| [Sportradar Soccer API](https://developer.sportradar.com/soccer/docs/soccer-ig-api-basics) | B2B REST API with live timelines, statistics, tiered competition coverage, and separate extended stats. Sportradar documentation also describes live ball-spotting event x/y data for some coverage. | Stronger enterprise/broadcast candidate; commercial access and exact coverage/package need to be confirmed. Event coordinates are not the same as full player tracking. |
| [Stats Perform / Opta](https://www.statsperform.com/products/opta-data/) | Offers live football data, analytics, and integrations for media/broadcast use cases. | Enterprise-grade option; access is sales/licensing based. Confirm which endpoints, detail, latency, and redistribution rights are included. |
| [football-data.org](https://www.football-data.org/documentation/api) | Public API documentation covers competitions, matches, teams, standings, and related football data. Its pricing page distinguishes delayed scores from a paid live-score tier. | Useful for fixtures and basic scores; likely insufficient by itself for spatial trajectories, nearby player positions, or detailed live event storytelling. Check current coverage and terms. |

## What MatchMind needs from a provider

Before selecting an API, check:

- Coverage for the intended competitions and whether the provider is authorized to distribute that data.
- Live update latency, rate limits, outages, and correction behavior.
- Event types and identity fields: pass, shot, foul, restart, actors, clock, outcome.
- Whether coordinates mean event locations, ball locations, or full player tracking. These are different products.
- Access to referee and player coordinates, sampling rate, coordinate conventions, and historical replay rights.
- Rights to store, transform, display, cache, and redistribute data in a public demo or commercial product.
- Cost, trial eligibility, geographic restrictions, and attribution requirements.

## Practical recommendation

For now, create a deterministic synthetic scenario and an internal provider-neutral schema. Later, evaluate API-FOOTBALL for a small integration experiment if licensing and coverage work; evaluate Sportradar or Stats Perform/Opta if the target is a production broadcast-grade feed. Keep the source adapter replaceable.

## Research links

- [API-FOOTBALL guide to live endpoints](https://www.api-football.com/news/post/fifa-world-cup-2026-guide-to-using-api-sports)
- [Sportradar Soccer API basics](https://developer.sportradar.com/soccer/docs/soccer-ig-api-basics)
- [Sportradar Soccer API overview](https://developer.sportradar.com/soccer/reference/soccer-overview)
- [Stats Perform Opta data](https://www.statsperform.com/products/opta-data/)
- [football-data.org API reference](https://www.football-data.org/documentation/api)
- [football-data.org pricing and coverage tiers](https://www.football-data.org/pricing)
