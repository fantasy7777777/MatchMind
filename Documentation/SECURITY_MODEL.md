# MatchMind security and trust model

## Scope

This model covers the synthetic hackathon prototype and identifies controls required before connecting licensed data or an AI service. It is intentionally proportional to the MVP.

## Trust boundaries

```text
Local synthetic scenario
        ↓
Validation and simulation state
        ↓
Deterministic statistics, insight, and forecast logic
        ↓
Viewer and analyst presentation
```

Any future external provider or AI service is a separate trust boundary. Its data must be validated and grounded before it reaches the internal state or UI.

## Assets to protect

- API keys, service credentials, and deployment secrets.
- Licensed provider data and usage rights.
- Integrity of event history, statistics, evidence, and forecasts.
- Any future user preferences or producer-only output.
- Availability and predictable behavior of the demo.

## Prototype controls

### Data and integrity

- Use fictional identities and synthetic data only for the hackathon scenario.
- Validate event sequence, match clock, event type, team/player references, coordinate bounds, and position windows.
- Reject malformed records explicitly; do not silently coerce invalid facts into a successful state.
- Treat the validated event log as the source of truth. Derive score, possession, counts, evidence, and forecasts from it.
- Bound probabilities to 0-100 and normalize forecast alternatives before display.
- Mark approximate referee distance and model forecasts clearly; never present them as official measurements or facts.

### Secrets and dependencies

- Do not place API keys or secrets in browser code, synthetic fixtures, documentation, or source control.
- Do not add a live provider dependency to the hackathon MVP.
- Review third-party packages, APIs, fonts, images, marks, and licenses before use.
- Keep future provider adapters isolated from viewer components.

### AI safety and grounding

- Deterministic logic owns facts, metrics, evidence selection, coordinate calculations, and probability normalization.
- If an AI model is added, send only the minimum grounded context needed for phrasing or personalization.
- Treat event fields and provider text as untrusted data, not instructions. Ignore prompt-injection content in data fields.
- Constrain generated output to the supplied facts and validate the returned structure before rendering.
- Provide a deterministic fallback or an explicit unavailable state when the AI service fails or lacks context; do not fabricate a success-shaped insight.

### UI and operational behavior

- Escape or safely render event descriptions and player/team names.
- Show readable loading, paused, end, error, and insufficient-context states.
- Avoid logging secrets or unnecessary user data.
- Record enough local diagnostic context to identify invalid scenario data without exposing credentials.

## Future production controls

Before using real data or producer workflows, add:

- Server-side secret management and outbound API controls.
- Authentication and role-based authorization for producer/analyst surfaces.
- Provider license, retention, caching, and redistribution review.
- Rate limiting, timeout, retry, and circuit-breaker behavior for external services.
- Audit records for edited, approved, and published insights.
- Privacy review for any user profile, preference, or account data.
- Dependency scanning, security testing, and incident response procedures.

## Security acceptance checks

- A malformed event cannot alter the match state or produce an unvalidated insight.
- Out-of-range coordinates and probabilities are rejected or shown as unavailable.
- No secret is required to run the local MVP.
- AI-generated language cannot introduce unsupported events or override deterministic statistics.
- Synthetic data and uncertainty labels remain visible in the viewer and demo output.
