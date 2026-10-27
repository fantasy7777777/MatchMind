const EVENT_TYPES = new Set(["pass", "shot", "goal", "foul", "corner", "cross", "carry", "match_state", "offside", "tackle", "interception", "possession_change", "save", "substitution", "yellow_card", "red_card", "period_start", "period_end"]);

function validationError(path, message) {
  return { path, message };
}

function validateScenario(input) {
  const errors = [];
  if (!input || typeof input !== "object") return { valid: false, errors: [validationError("scenario", "Scenario must be an object.")] };
  if (typeof input.contractVersion !== "string") errors.push(validationError("contractVersion", "Contract version is required."));
  const match = input.match;
  if (!match || match.dataMode !== "synthetic" || match.synthetic !== true) errors.push(validationError("match.dataMode", "The MVP match must be explicitly synthetic."));
  if (!Array.isArray(input.teams) || input.teams.length === 0) errors.push(validationError("teams", "At least one team is required."));
  if (!Array.isArray(input.people)) errors.push(validationError("people", "People must be an array."));
  if (!Array.isArray(input.events) || input.events.length === 0) errors.push(validationError("events", "At least one event is required."));
  if (!Array.isArray(input.positionSamples)) errors.push(validationError("positionSamples", "Position samples must be an array."));
  if (!Array.isArray(input.trackingSnapshots)) errors.push(validationError("trackingSnapshots", "Per-second tracking snapshots must be an array."));
  const teamIds = new Set((input.teams || []).map((team) => team.teamId));
  const personIds = new Set((input.people || []).map((person) => person.personId));
  const eventIds = new Set();
  if (!teamIds.has(match?.homeTeamId)) errors.push(validationError("match.homeTeamId", "Home team does not exist."));
  if (!teamIds.has(match?.awayTeamId)) errors.push(validationError("match.awayTeamId", "Away team does not exist."));
  let previousClock = -1;
  let previousSequence = 0;
  for (const event of input.events || []) {
    const path = `events[${event.sequence}]`;
    if (typeof event.eventId !== "string" || event.eventId.length === 0) errors.push(validationError(`${path}.eventId`, "Event ID is required."));
    if (eventIds.has(event.eventId)) errors.push(validationError(`${path}.eventId`, "Event IDs must be unique."));
    eventIds.add(event.eventId);
    if (!Number.isInteger(event.sequence) || event.sequence <= previousSequence) errors.push(validationError(`${path}.sequence`, "Event sequences must be unique and strictly increasing."));
    if (!Number.isFinite(event.clockSeconds) || event.clockSeconds < 0) errors.push(validationError(`${path}.clockSeconds`, "Event clock must be a non-negative number."));
    if (event.clockSeconds < previousClock) errors.push(validationError(`${path}.clockSeconds`, "Event clock must be monotonic."));
    if (typeof event.eventType !== "string" || !EVENT_TYPES.has(event.eventType)) errors.push(validationError(`${path}.eventType`, "Event type is not in the controlled vocabulary."));
    if (event.teamId !== null && event.teamId !== undefined && !teamIds.has(event.teamId)) errors.push(validationError(`${path}.teamId`, "Referenced team does not exist."));
    const actors = [event.primaryActorId, ...(event.relatedActorIds || [])].filter(Boolean);
    actors.forEach((actorId) => { if (!personIds.has(actorId)) errors.push(validationError(`${path}.actor`, `Referenced person ${actorId} does not exist.`)); });
    if (!event.location || !Number.isFinite(event.location.x) || !Number.isFinite(event.location.y) || event.location.x < 0 || event.location.x > 100 || event.location.y < 0 || event.location.y > 100) errors.push(validationError(`${path}.location`, "Event coordinates must be finite numbers between 0 and 100."));
    if (event.synthetic !== true) errors.push(validationError(`${path}.synthetic`, "Every prototype event must be synthetic."));
    if (event.shotDetail) {
      const detail = event.shotDetail;
      if (!["left foot", "right foot", "head", "left knee", "right knee"].includes(detail.bodyPart)) errors.push(validationError(`${path}.shotDetail.bodyPart`, "Shot body part is not supported."));
      if (!["left", "right"].includes(detail.preferredFoot)) errors.push(validationError(`${path}.shotDetail.preferredFoot`, "Preferred foot must be left or right."));
      if (typeof detail.preferredFootUsed !== "boolean") errors.push(validationError(`${path}.shotDetail.preferredFootUsed`, "Preferred-foot usage must be boolean."));
      if (typeof detail.technique !== "string" || detail.technique.length === 0) errors.push(validationError(`${path}.shotDetail.technique`, "Shot technique is required."));
      if (!Number.isFinite(detail.shotSpeedKmh) || detail.shotSpeedKmh <= 0) errors.push(validationError(`${path}.shotDetail.shotSpeedKmh`, "Shot speed must be positive."));
    }
    if (event.actionDetail) {
      const detail = event.actionDetail;
      for (const field of ["passerId", "receiverId", "shooterId", "goalkeeperId", "takerId", "targetId", "foulerId", "fouledPlayerId", "scorerId", "assistId"]) {
        if (detail[field] && !personIds.has(detail[field])) errors.push(validationError(`${path}.actionDetail.${field}`, `Referenced person ${detail[field]} does not exist.`));
      }
      if (typeof detail.action !== "string" || detail.action.length === 0) errors.push(validationError(`${path}.actionDetail.action`, "Action type is required."));
      if (typeof detail.outcomeDetail !== "string" || detail.outcomeDetail.length === 0) errors.push(validationError(`${path}.actionDetail.outcomeDetail`, "Action outcome detail is required."));
    }
    previousClock = event.clockSeconds;
    previousSequence = event.sequence;
  }
  for (const sample of input.positionSamples || []) {
    if (!Number.isFinite(sample.x) || !Number.isFinite(sample.y) || sample.x < 0 || sample.x > 100 || sample.y < 0 || sample.y > 100) errors.push(validationError("positionSamples", "Position coordinates must be finite numbers between 0 and 100."));
    if (!personIds.has(sample.entityId) && !["ball"].includes(sample.entityId)) errors.push(validationError("positionSamples.entityId", `Position entity ${sample.entityId} does not exist.`));
  }
  const expectedPlayers = (input.people || []).filter((person) => person.role === "player").length;
  let previousTrackingClock = -1;
  for (const snapshot of input.trackingSnapshots || []) {
    if (!Number.isInteger(snapshot.clockSeconds) || snapshot.clockSeconds < 0 || snapshot.clockSeconds > 5400) errors.push(validationError("trackingSnapshots.clockSeconds", "Tracking clock must be an integer between 0 and 5400."));
    if (snapshot.clockSeconds <= previousTrackingClock) errors.push(validationError("trackingSnapshots.clockSeconds", "Tracking clocks must be strictly increasing."));
    if (!Array.isArray(snapshot.players) || snapshot.players.length !== expectedPlayers) errors.push(validationError(`trackingSnapshots[${snapshot.clockSeconds}].players`, "Every tracking snapshot must contain every player."));
    for (const player of snapshot.players || []) {
      if (!personIds.has(player.entityId)) errors.push(validationError(`trackingSnapshots[${snapshot.clockSeconds}].players`, `Unknown tracking entity ${player.entityId}.`));
      if (!Number.isFinite(player.x) || !Number.isFinite(player.y) || player.x < 0 || player.x > 100 || player.y < 0 || player.y > 100) errors.push(validationError(`trackingSnapshots[${snapshot.clockSeconds}].players`, "Player tracking coordinates must be between 0 and 100."));
    }
    if (!snapshot.ball || !Number.isFinite(snapshot.ball.x) || !Number.isFinite(snapshot.ball.y)) errors.push(validationError(`trackingSnapshots[${snapshot.clockSeconds}].ball`, "Ball tracking position is required."));
    if (!snapshot.referee || !Number.isFinite(snapshot.referee.x) || !Number.isFinite(snapshot.referee.y)) errors.push(validationError(`trackingSnapshots[${snapshot.clockSeconds}].referee`, "Referee tracking position is required."));
    previousTrackingClock = snapshot.clockSeconds;
  }
  const demoWindow = input.demoWindow;
  if (demoWindow) {
    if (!Number.isInteger(demoWindow.startSeconds) || !Number.isInteger(demoWindow.endSeconds) || demoWindow.startSeconds < 0 || demoWindow.endSeconds > 5400 || demoWindow.startSeconds >= demoWindow.endSeconds) {
      errors.push(validationError("demoWindow", "Demo window must have valid match-second bounds."));
    }
    if (!Array.isArray(demoWindow.sequences) || demoWindow.sequences.length === 0) {
      errors.push(validationError("demoWindow.sequences", "Demo window must contain at least one authored sequence."));
    }
    for (const sequence of demoWindow.sequences || []) {
      if (!sequence.sequenceId || !Number.isInteger(sequence.startSeconds) || !Number.isInteger(sequence.endSeconds) || sequence.startSeconds >= sequence.endSeconds) {
        errors.push(validationError(`demoWindow.sequences.${sequence.sequenceId || "unknown"}`, "Demo sequence must have an ID and valid bounds."));
      }
      if (!Array.isArray(sequence.actions) || sequence.actions.length === 0) {
        errors.push(validationError(`demoWindow.sequences.${sequence.sequenceId || "unknown"}.actions`, "Demo sequence must contain authored actions."));
      }
      let previousActionEnd = sequence.startSeconds;
      for (const action of sequence.actions || []) {
        if (!Number.isInteger(action.startSeconds) || !Number.isInteger(action.endSeconds) || action.startSeconds < sequence.startSeconds || action.endSeconds > sequence.endSeconds || action.startSeconds >= action.endSeconds || action.startSeconds < previousActionEnd) {
          errors.push(validationError(`demoWindow.sequences.${sequence.sequenceId || "unknown"}.actions`, "Demo actions must be ordered, bounded, and non-overlapping."));
        }
        for (const actorId of [action.actorId, action.receiverId, ...(action.supportIds || []), ...(action.pressureIds || [])].filter(Boolean)) {
          if (!personIds.has(actorId)) errors.push(validationError(`demoWindow.sequences.${sequence.sequenceId || "unknown"}.actions`, `Referenced person ${actorId} does not exist.`));
        }
        for (const point of [action.ballStart, action.ballEnd]) {
          if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y) || point.x < 0 || point.x > 100 || point.y < 0 || point.y > 100) {
            errors.push(validationError(`demoWindow.sequences.${sequence.sequenceId || "unknown"}.actions`, "Demo ball endpoints must be bounded coordinates."));
          }
        }
        previousActionEnd = action.endSeconds;
      }
    }
  }
  for (const goal of (input.events || []).filter((event) => event.eventType === "goal")) {
    if (!(goal.relatedEventIds || []).some((id) => input.events.some((event) => event.eventId === id && event.eventType === "shot"))) errors.push(validationError(`events[${goal.sequence}].relatedEventIds`, "Goal must link to a shot event."));
  }
  return { valid: errors.length === 0, errors };
}

function reduceMatchState(input, visibleCount) {
  const events = input.events.slice(0, Math.max(0, visibleCount));
  const state = { score: [0, 0], shots: [0, 0], onTarget: [0, 0], corners: [0, 0], offsides: [0, 0], possessionChanges: [0, 0], possession: [50, 50], currentTeamId: null };
  const sideFor = (teamId) => teamId === input.match.homeTeamId ? 0 : teamId === input.match.awayTeamId ? 1 : -1;
  const possessionTimeline = [{ clockSeconds: 0, teamId: null }];
  for (const event of events) {
    const side = sideFor(event.teamId);
    if (event.eventType === "shot" && side >= 0) { state.shots[side] += 1; if (["saved", "goal"].includes(event.outcome)) state.onTarget[side] += 1; }
    if (event.eventType === "goal" && side >= 0 && event.outcome === "scored") state.score[side] += 1;
    if (event.eventType === "corner" && side >= 0 && event.outcome === "awarded") state.corners[side] += 1;
    if (event.eventType === "offside" && side >= 0) state.offsides[side] += 1;
    if (event.eventType === "possession_change" && side >= 0) { state.possessionChanges[side] += 1; state.currentTeamId = event.teamId; possessionTimeline.push({ clockSeconds: event.clockSeconds, teamId: event.teamId }); }
  }
  const currentClock = events.length ? events[events.length - 1].clockSeconds : 0;
  const elapsed = [0, 0];
  for (let index = 1; index < possessionTimeline.length; index += 1) {
    const prior = possessionTimeline[index - 1];
    const next = possessionTimeline[index];
    const side = sideFor(prior.teamId);
    if (side >= 0) elapsed[side] += next.clockSeconds - prior.clockSeconds;
  }
  const last = possessionTimeline[possessionTimeline.length - 1];
  const lastSide = sideFor(last.teamId);
  if (lastSide >= 0) elapsed[lastSide] += currentClock - last.clockSeconds;
  const total = elapsed[0] + elapsed[1];
  if (total > 0) state.possession = [Math.round((elapsed[0] / total) * 100), Math.round((elapsed[1] / total) * 100)];
  return state;
}

function samplesForEvent(input, event) {
  return input.positionSamples.filter((sample) => Math.abs(sample.clockSeconds - event.clockSeconds) <= 12);
}
