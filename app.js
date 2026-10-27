const validation = validateScenario(scenario);
const events = scenario.events;
const timelineEvents = events.filter((event) => !["match_state", "period_start", "period_end"].includes(event.eventType));
const demoSequence = scenario.demoWindow.sequences[0];
const demoActions = demoSequence.actions;
const focusedDemoEndSeconds = 4685;
const state = { index: -1, timer: null, speed: 2, detail: "detailed", selectedIndex: -1, currentSeconds: 0, eventExpanded: false, demoMode: false, demoActionIndex: -1 };
const $ = (id) => document.getElementById(id);
const formatClock = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[character]));
const teamName = (teamId) => scenario.teams.find((team) => team.teamId === teamId)?.shortName || "Unknown team";
const personName = (personId) => scenario.people.find((person) => person.personId === personId)?.displayName || "Unknown player";
const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
function demoContextAt(seconds) {
  const window = scenario.demoWindow;
  if (!window || seconds < window.startSeconds || seconds >= window.endSeconds) return null;
  for (const sequence of window.sequences) {
    const action = sequence.actions.find((candidate) => seconds >= candidate.startSeconds && seconds < candidate.endSeconds);
    if (action) return { sequence, action };
  }
  return null;
}
function demoContextLabel(context) {
  if (!context) return "Outside detailed demo window · synthetic match replay";
  const { sequence, action } = context;
  const participants = [action.actorId, action.receiverId, ...(action.supportIds || []), ...(action.pressureIds || [])]
    .filter(Boolean)
    .map(personName);
  return `${sequence.label} · ${action.type.replaceAll("_", " ")} · ${participants.join(", ")}`;
}
function timelineDetail(event) {
  const detail = event.actionDetail;
  const participants = detail
    ? [detail.passerId, detail.receiverId, detail.shooterId, detail.goalkeeperId, detail.takerId, detail.scorerId, detail.assistId, detail.foulerId, detail.fouledPlayerId]
      .filter(Boolean).map(personName).join(", ")
    : "";
  const insight = event.eventType === "foul" ? buildEventInsight(scenario, event, reduceMatchState(scenario, events.indexOf(event) + 1)) : null;
  return `<div class="timeline-detail"><strong>${escapeHtml(detail?.action || event.eventType)}${detail?.technique ? ` · ${escapeHtml(detail.technique)}` : ""}</strong><span>${escapeHtml(detail?.outcomeDetail || event.description || event.outcome.replaceAll("_", " "))}</span>${participants ? `<small>Participants: ${escapeHtml(participants)}</small>` : ""}${insight?.available ? `<span class="timeline-insight"><b>Why it matters</b> ${escapeHtml(insight.explanation)}</span>` : ""}</div>`;
}
function renderTimeline() {
  if (state.demoMode) {
    $("timeline").innerHTML = demoActions.map((action, index) => {
      const selected = index === state.demoActionIndex;
      return `<button class="timeline-item ${selected ? "selected" : ""}" data-demo-index="${index}">
        <span class="event-time">${formatClock(action.startSeconds)}</span>
        <span class="event-icon ${action.type === "shot" ? "shot" : action.type === "receive" ? "pass" : "carry"}">${eventIcon(action.type === "shot" ? "shot" : action.type === "receive" ? "pass" : "carry")}</span>
        <span class="event-copy"><strong>${escapeHtml(action.type.replaceAll("_", " "))}</strong><small>${escapeHtml(scenario.teams.find((team) => team.teamId === demoSequence.teamId)?.name || teamName(demoSequence.teamId))}</small>${selected && state.eventExpanded ? timelineDetail(demoActionEvent(action)) : ""}</span>
      </button>`;
    }).join("");
    document.querySelectorAll(".timeline-item").forEach((item) => item.addEventListener("click", () => selectDemoAction(Number(item.dataset.demoIndex))));
    return;
  }
  $("timeline").innerHTML = timelineEvents.map((event) => {
    const index = events.indexOf(event);
    return `
    <button class="timeline-item ${index === state.selectedIndex ? "selected" : ""}" data-index="${index}">
      <span class="event-time">${formatClock(event.clockSeconds)}</span>
      <span class="event-icon ${event.eventType}">${eventIcon(event.eventType)}</span>
      <span class="event-copy"><strong>${escapeHtml(event.description || event.eventType)}</strong><small>${escapeHtml(eventSummary(event))}</small>${state.eventExpanded && index === state.selectedIndex ? timelineDetail(event) : ""}</span>
    </button>`;
  }).join("");
  document.querySelectorAll(".timeline-item").forEach((item) => item.addEventListener("click", () => selectEvent(Number(item.dataset.index))));
  const selectedItem = document.querySelectorAll(".timeline-item.selected")[0];
  if (selectedItem && typeof selectedItem.scrollIntoView === "function") {
    selectedItem.scrollIntoView({ block: "nearest" });
  }
  function demoActionEvent(action) {
    const event = events.find((candidate) => candidate.clockSeconds === action.startSeconds || candidate.clockSeconds === action.endSeconds);
    return {
      ...(event || {}),
      eventId: action.actionId,
      eventType: action.type,
      clockSeconds: action.startSeconds,
      teamId: demoSequence.teamId,
      primaryActorId: action.actorId,
      description: action.type.replaceAll("_", " "),
      outcome: "authored",
      actionDetail: {
        action: action.type,
        outcomeDetail: `${personName(action.actorId)} leads the sequence`,
        passerId: action.type === "pass" ? action.actorId : undefined,
        receiverId: action.receiverId,
        shooterId: action.type === "shot" ? action.actorId : undefined,
      },
    };
  }
}
function eventAtTime(seconds) {
  let index = -1;
  events.forEach((event, eventIndex) => { if (event.clockSeconds <= seconds) index = eventIndex; });
  return index;
}
function spatialEventAtTime(seconds) {
  const latestIndex = eventAtTime(seconds);
  const upcoming = events[Math.min(events.length - 1, latestIndex + 1)];
  const upcomingDuration = upcoming?.startLocation ? Math.max(1, Math.min(8, upcoming.clockSeconds - (events[Math.max(0, upcoming.sequence - 2)]?.clockSeconds || upcoming.clockSeconds))) : 0;
  if (upcoming?.startLocation && seconds >= upcoming.clockSeconds - upcomingDuration) return upcoming;
  const nextIndex = Math.max(0, latestIndex + 1);
  if (nextIndex >= events.length) return events[events.length - 1];
  const prior = events[Math.max(0, nextIndex - 1)];
  const next = events[Math.min(events.length - 1, nextIndex)];
  if (!prior || !next || prior === next || next.clockSeconds === prior.clockSeconds) return prior || events[0];
  const ratio = clamp((seconds - prior.clockSeconds) / (next.clockSeconds - prior.clockSeconds), 0, 1);
  return { ...prior, location: { x: prior.location.x + (next.location.x - prior.location.x) * ratio, y: prior.location.y + (next.location.y - prior.location.y) * ratio } };
}

function actionProgress(event, seconds) {
  if (!event?.startLocation || !event?.endLocation) return 1;
  const duration = Math.max(1, Math.min(8, (event.clockSeconds - (events[Math.max(0, event.sequence - 2)]?.clockSeconds || event.clockSeconds))));
  return clamp((seconds - event.clockSeconds + duration) / duration, 0, 1);
}

function visibleState() {
  const asOfIndex = state.selectedIndex >= 0 ? state.selectedIndex : state.index;
  return reduceMatchState(scenario, asOfIndex + 1);
}

function render() {
  const current = state.selectedIndex >= 0 ? events[state.selectedIndex] : null;
  const derived = visibleState();
  const progress = $("matchProgress");
  const progressClock = $("progressClock");
  $("score").textContent = `${derived.score[0]} — ${derived.score[1]}`;
  $("clock").textContent = `${formatClock(state.currentSeconds)} · ${state.currentSeconds >= 2700 ? "2nd half" : "1st half"}`;
  $("resultLabel").textContent = state.currentSeconds >= 5400
    ? "Northbridge United win 3–2 · Quentin Qi hat-trick"
    : "Score · goals, not shots";
  $("shotsHome").textContent = derived.shots[0];
  $("shotsAway").textContent = derived.shots[1];
  $("onTargetHome").textContent = derived.onTarget[0];
  $("onTargetAway").textContent = derived.onTarget[1];
  $("cornersHome").textContent = derived.corners[0];
  $("cornersAway").textContent = derived.corners[1];
  $("possessionHome").textContent = `${derived.possession[0]}%`;
  $("possessionAway").textContent = `${derived.possession[1]}%`;
  progress.value = String(state.currentSeconds);
  progress.max = state.demoMode ? String(focusedDemoEndSeconds) : "5400";
  progressClock.textContent = state.demoMode
    ? `${formatClock(state.currentSeconds)} / 78:05 demo`
    : `${formatClock(state.currentSeconds)} / 90:00`;
  $("demoContext").textContent = demoContextLabel(demoContextAt(state.currentSeconds));
  renderTimeline();
  updatePitch(spatialEventAtTime(state.currentSeconds));
  updateEventDetails(current);
  renderInsight(current, derived);
  renderAnalyst(current, derived);
  document.body.classList.toggle("compact", state.detail === "compact");
}

function eventIcon(type) {
  return { pass: "↗", shot: "↯", corner: "◢", foul: "!", goal: "●", offside: "∥", possession_change: "⇄", period_start: "▶", match_state: "·" }[type] || "•";
}

function eventSummary(event) {
  return event.teamId ? (scenario.teams.find((team) => team.teamId === event.teamId)?.name || teamName(event.teamId)) : "Match";
}

function eventStaging(event) {
  const positions = {};
  let ball = null;
  let referee = null;
  let label = "";
  if (event.eventType === "corner") {
    const home = event.teamId === scenario.match.homeTeamId;
    const taker = event.primaryActorId;
    positions[taker] = { x: home ? 7 : 93, y: event.location.y };
    positions[home ? "player-nb-09" : "player-hc-09"] = { x: home ? 25 : 75, y: 50 };
    positions[home ? "player-nb-11" : "player-hc-11"] = { x: home ? 31 : 69, y: 35 };
    positions[home ? "player-nb-07" : "player-hc-07"] = { x: home ? 31 : 69, y: 65 };
    positions[home ? "player-hc-01" : "player-nb-01"] = { x: home ? 5 : 95, y: 50 };
    ball = { x: home ? 7 : 93, y: event.location.y };
    referee = { x: home ? 18 : 82, y: 48 };
    label = `Corner setup · ${personName(taker)} taking · runners attacking the box`;
  } else if (event.eventType === "shot") {
    const home = event.teamId === scenario.match.homeTeamId;
    const shooter = event.primaryActorId;
    positions[shooter] = { x: event.startLocation?.x || event.location.x, y: event.startLocation?.y || event.location.y };
    positions[home ? "player-hc-01" : "player-nb-01"] = { x: home ? 94 : 6, y: event.location.y };
    ball = { x: event.startLocation?.x || event.location.x, y: event.startLocation?.y || event.location.y };
    referee = { x: clamp(event.location.x - (home ? 14 : -14), 8, 92), y: clamp(event.location.y + 10, 8, 92) };
    label = `Shot action · ${personName(shooter)} striking · goalkeeper set`;
  }
  return { positions, ball, referee, label };
}

function updatePitch(event) {
  const [x, y] = [event.location.x, event.location.y];
  const sample = samplesForEvent(scenario, event);
  const tracking = scenario.trackingSnapshots?.[Math.max(0, Math.min(5400, Math.round(state.currentSeconds)))];
  const staging = eventStaging(event);
  const progress = actionProgress(event, state.currentSeconds);
  const actionBall = event.startLocation && event.endLocation
    ? {
      x: event.startLocation.x + (event.endLocation.x - event.startLocation.x) * progress,
      y: event.startLocation.y + (event.endLocation.y - event.startLocation.y) * progress,
    }
    : null;
  const transitionMs = state.index <= 0 ? 0 : Math.max(350, (1800 / state.speed) - 80);
  const ball = actionBall || staging.ball || tracking?.ball || sample.find((item) => item.entityId === "ball") || { x, y };
  const referee = staging.referee || tracking?.referee || sample.find((item) => item.entityId === "referee-01") || {
    x: clamp(x - (event.teamId === scenario.match.homeTeamId ? 12 : -12), 8, 92),
    y: clamp(y + (y < 50 ? 8 : -8), 8, 92),
  };
  const trackedPlayers = scenario.people
    .filter((person) => person.role === "player")
    .map((person) => {
      const staged = staging.positions[person.personId];
      const observed = sample.find((item) => item.entityId === person.personId);
      const tracked = tracking?.players.find((item) => item.entityId === person.personId);
      if (staged) {
        if (event.eventType === "shot" && person.personId === event.primaryActorId && event.endLocation) {
          return { ...person, x: staged.x + (event.endLocation.x - staged.x) * progress * 0.25, y: staged.y + (event.endLocation.y - staged.y) * progress * 0.25 };
        }
        return { ...person, ...staged };
      }
      if (tracked) return { ...person, ...tracked };
      if (observed) return { ...person, ...observed };
      if (person.personId === event.primaryActorId && ["corner", "shot", "foul"].includes(event.eventType)) {
        return {
          ...person,
          x: clamp(x + (event.eventType === "corner" ? 4 : 0), 4, 96),
          y: clamp(y, 5, 95),
        };
      }
      const isSameTeam = person.teamId === event.teamId;
      const movementScale = isSameTeam ? 0.14 : 0.06;
      const forwardBias = person.teamId === scenario.match.homeTeamId ? 1 : -1;
      const baseline = person.baselinePosition || { x: 50, y: 50 };
      return {
        ...person,
        x: clamp(baseline.x + clamp((x - baseline.x) * movementScale + forwardBias * (isSameTeam ? 2 : 0), -7, 7), 4, 96),
        y: clamp(baseline.y + clamp((y - baseline.y) * movementScale * 0.7, -5, 5), 5, 95),
      };
    });
  $("incident").style.left = `calc(${x}% - 17px)`;
  $("incident").style.top = `calc(${y}% - 17px)`;
  $("incident").style.transition = `left ${transitionMs}ms linear, top ${transitionMs}ms linear`;
  $("ball").style.left = `calc(${ball.x}% - 11px)`;
  $("ball").style.top = `calc(${ball.y}% - 11px)`;
  $("ball").style.transition = `left ${transitionMs}ms linear, top ${transitionMs}ms linear`;
  const owner = tracking?.ball?.ownerId ? scenario.people.find((person) => person.personId === tracking.ball.ownerId) : null;
  $("ball").textContent = "B";
  $("ball").title = owner ? `Ball controlled by #${owner.shirtNumber} ${owner.displayName}` : "Ball in motion or unclaimed";
  $("ball").hidden = Boolean(owner);
  $("ball").classList.toggle("in-motion", !owner);
  $("referee").style.left = `calc(${referee.x}% - 11px)`;
  $("referee").style.top = `calc(${referee.y}% - 11px)`;
  $("referee").style.transition = `left ${transitionMs}ms linear, top ${transitionMs}ms linear`;
  const trajectory = $("trajectory");
  const actionTrajectory = event.trajectory || (event.relatedEventIds || [])
    .map((id) => scenario.events.find((candidate) => candidate.eventId === id)?.trajectory)
    .find(Boolean);
  if (actionTrajectory?.points?.length >= 2) {
    const start = actionTrajectory.points[0];
    const end = actionTrajectory.points[actionTrajectory.points.length - 1];
    const width = Math.hypot(end.x - start.x, end.y - start.y);
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
    trajectory.hidden = false;
    trajectory.style.left = `${start.x}%`;
    trajectory.style.top = `${start.y}%`;
    trajectory.style.width = `${width}%`;
    trajectory.style.transform = `rotate(${angle}deg)`;
  } else {
    trajectory.hidden = true;
  }
  $("players").innerHTML = trackedPlayers.map((player) => {
    const teamClass = player.teamId === scenario.match.awayTeamId ? "away" : "home";
    const possessionClass = owner?.personId === player.personId ? "possessing" : "";
    return `<span class="marker player-marker ${teamClass} ${possessionClass}" style="left:calc(${player.x}% - 12.5px);top:calc(${player.y}% - 12.5px);transition: left ${transitionMs}ms linear, top ${transitionMs}ms linear" title="${escapeHtml(player.displayName)}" tabindex="0"><b>#${escapeHtml(player.shirtNumber)}</b><em>${escapeHtml(player.displayName)}</em></span>`;
  }).join("");
  $("pitchTitle").textContent = event.eventId === "evt-001" ? "Match positioning" : (event.description || event.eventType);
  $("selectedTag").textContent = event.eventId === "evt-001" ? "READY" : event.eventId;
  const demoContext = demoContextAt(state.currentSeconds);
  const trackingLabel = demoContext ? `authored ${demoContext.action.type.replaceAll("_", " ")} chain` : "synthetic 4-3-3 movement estimate";
  $("positionSummary").textContent = `${trackedPlayers.length} players · ${staging.label || trackingLabel} · action ${Math.round(progress * 100)}% · ${sample.length} focused samples`;
}

function updateEventDetails(event) {
  const button = $("eventDetailsButton");
  const details = $("eventDetails");
  if (!event) {
    button.hidden = true;
    details.hidden = true;
    return;
  }
  button.hidden = false;
  button.textContent = state.eventExpanded ? "Collapse event" : "Expand event";
  button.setAttribute("aria-expanded", String(state.eventExpanded));
  details.hidden = !state.eventExpanded;
  if (state.eventExpanded) {
    const actors = [event.primaryActorId, ...(event.relatedActorIds || [])].filter(Boolean).map(personName);
    const linkedTrajectory = event.trajectory || (event.relatedEventIds || [])
      .map((id) => scenario.events.find((candidate) => candidate.eventId === id)?.trajectory)
      .find(Boolean);
    const shotEvent = event.eventType === "shot" ? event : scenario.events.find((candidate) => event.relatedEventIds?.includes(candidate.eventId) && candidate.eventType === "shot");
    const shotDetail = shotEvent?.shotDetail;
    const actionDetail = event.actionDetail;
    const actionContext = actionDetail
      ? `<br>Action: ${escapeHtml(actionDetail.action || "unavailable")} · ${escapeHtml(actionDetail.delivery || actionDetail.technique || "")} · ${escapeHtml(actionDetail.outcomeDetail || "outcome unavailable")}<br>Participants: ${escapeHtml([actionDetail.passerId, actionDetail.receiverId, actionDetail.shooterId, actionDetail.goalkeeperId, actionDetail.takerId, actionDetail.targetId, actionDetail.foulerId, actionDetail.fouledPlayerId].filter(Boolean).map(personName).join(", ") || "Unavailable")}`
      : "";
    const action = event.eventType === "goal" || event.eventType === "shot"
      ? `<br>Scorer/shooter: ${escapeHtml(personName(event.primaryActorId))}<br>Assist: ${escapeHtml(personName(event.assisterId))}<br>Trajectory: ${escapeHtml(linkedTrajectory?.type || "Unavailable")}<br>Shot: ${escapeHtml(shotDetail ? `${shotDetail.bodyPart}, ${shotDetail.technique}, ${shotDetail.shotSpeedKmh} km/h` : "Unavailable")}<br>Preferred foot: ${escapeHtml(shotDetail ? `${shotDetail.preferredFoot}${shotDetail.preferredFootUsed ? " (used)" : " (not used)"}` : "Unavailable")}${event.celebration ? `<br>Celebration: ${escapeHtml(event.celebration.name)} — ${escapeHtml(event.celebration.description)}` : ""}`
      : "";
    details.innerHTML = `<strong>${escapeHtml(event.eventId)}</strong> · ${escapeHtml(event.eventType)} · ${formatClock(event.clockSeconds)}<br>Players: ${escapeHtml(actors.join(", ") || "Unavailable")}<br>Location: (${event.location.x}, ${event.location.y}) · Outcome: ${escapeHtml(event.outcome.replaceAll("_", " "))}${actionContext}${action}`;
  }
}

function renderInsight(event, matchState) {
  if (!event || event.eventType !== "foul") {
    $("confidence").textContent = event ? "EVENT CONTEXT" : "—";
    $("insightContent").innerHTML = `<p class="empty-state">${event ? "Select the foul moment to inspect grounded context, evidence, and a forecast." : "Start the match to build the live context."}</p>`;
    return;
  }

  const insight = buildEventInsight(scenario, event, matchState);
  const forecast = buildForecast(event);
  if (!insight.available || !forecast.available) {
    $("confidence").textContent = "UNAVAILABLE";
    $("insightContent").innerHTML = `<p class="empty-state">${insight.reason || forecast.reason}</p>`;
    return;
  }
  const distance = insight.evidenceMetrics.refereeDistanceM;
  const actor = personName(event.primaryActorId);
  const affected = personName(event.relatedActorIds?.[0]);
  $("confidence").textContent = insight.confidence >= 0.8 ? "HIGH CONFIDENCE" : "LOW CONFIDENCE";
  $("insightContent").innerHTML = `
    <div class="insight-block"><h3>EVIDENCE-BACKED INSIGHT</h3><p>${escapeHtml(insight.explanation)}</p></div>
    <div class="insight-block context"><div class="insight-row"><span>Event</span><span>${escapeHtml(event.eventId)} · ${formatClock(event.clockSeconds)}</span></div><div class="insight-row"><span>Players</span><span>${escapeHtml(actor)} · ${escapeHtml(affected)}</span></div><div class="insight-row"><span>Distance</span><span>${distance === null ? "Unavailable" : `≈ ${distance} m · calculated`}</span></div></div>
    <div class="insight-block"><h3>NEXT-ACTION FORECAST <small>(MODEL ESTIMATE)</small></h3><div class="forecast">${forecast.alternatives.map((alternative) => forecastRow(alternative.action, alternative.probability, alternative.rationale)).join("")}</div></div>
    <div class="insight-block evidence-block"><h3>EVIDENCE</h3><p class="evidence">Source: ${insight.evidenceEventIds.map(escapeHtml).join(", ")}, ${insight.evidenceMetrics.positionSampleCount} position samples. Model: ${escapeHtml(forecast.modelVersion)} · horizon: ${forecast.horizonSeconds} seconds.</p></div>`;
}

function renderAnalyst(event, matchState) {
  if (!event || event.eventType !== "foul") {
    $("analystPanel").hidden = true;
    return;
  }
  const insight = buildEventInsight(scenario, event, matchState);
  const forecast = buildForecast(event);
  $("analystPanel").hidden = false;
  $("analystPayload").textContent = JSON.stringify({
    synthetic: true,
    asOfSequence: event.sequence,
    event,
    insight,
    forecast,
  }, null, 2);
}

function forecastRow(label, value, rationale) {
  const safeValue = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  return `<div class="forecast-row"><div class="forecast-label"><span>${escapeHtml(label)}</span><span>${safeValue}%</span></div><div class="bar"><i style="width:${safeValue}%"></i></div><small class="forecast-rationale">${escapeHtml(rationale || "Estimate based on the selected event context.")}</small></div>`;
}

function selectEvent(index) {
  state.demoMode = false;
  state.demoActionIndex = -1;
  const nextIndex = Math.max(-1, Math.min(events.length - 1, index));
  const sameEvent = state.selectedIndex === nextIndex;
  state.index = nextIndex;
  state.selectedIndex = state.index;
  state.currentSeconds = events[state.index]?.clockSeconds || 0;
  state.eventExpanded = sameEvent ? !state.eventExpanded : true;
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
    $("playButton").textContent = state.demoMode ? "Resume demo" : "Resume match";
    $("playButton").classList.add("paused");
  }
  $("stateMessage").textContent = `Viewing ${events[state.index]?.description || "kickoff"} · selected time`;
  render();
}
function selectDemoAction(index) {
  const action = demoActions[index];
  if (!action) return;
  const sameAction = state.demoActionIndex === index;
  state.demoMode = true;
  state.demoActionIndex = index;
  state.currentSeconds = action.startSeconds;
  state.index = eventAtTime(state.currentSeconds);
  state.selectedIndex = state.index;
  state.eventExpanded = sameAction ? !state.eventExpanded : true;
  render();
}
function selectTime(seconds) {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
    $("playButton").textContent = state.demoMode ? "Resume demo" : "Resume match";
    $("playButton").classList.add("paused");
  }
  state.demoMode = false;
  state.demoActionIndex = -1;
  state.currentSeconds = Math.max(0, Math.min(5400, seconds));
  state.index = eventAtTime(state.currentSeconds);
  state.selectedIndex = state.index;
  state.eventExpanded = false;
  $("stateMessage").textContent = `Viewing ${formatClock(state.currentSeconds)} · use play to continue`;
  render();
}

function playbackTick() {
  if (!validation.valid) {
    $("stateMessage").textContent = `Scenario invalid: ${validation.errors[0].message}`;
    clearInterval(state.timer);
    state.timer = null;
    return;
  }
  const endSeconds = state.demoMode ? focusedDemoEndSeconds : 5400;
  state.currentSeconds = Math.min(endSeconds, state.currentSeconds + state.speed);
  state.index = eventAtTime(state.currentSeconds);
  state.selectedIndex = state.index;
  render();
  if (state.currentSeconds >= endSeconds) {
    clearInterval(state.timer);
    state.timer = null;
    $("playButton").textContent = state.demoMode ? "Replay demo" : "Replay match";
    $("playButton").classList.remove("paused");
    $("stateMessage").textContent = "Match replay complete.";
  }
}

function advance() {
  playbackTick();
}

function reset() {
  clearInterval(state.timer); state.timer = null; state.index = -1; state.selectedIndex = -1; state.currentSeconds = 0; state.eventExpanded = false; state.demoMode = false; state.demoActionIndex = -1;
  $("playButton").textContent = "Start match"; $("playButton").classList.remove("paused"); $("stateMessage").textContent = validation.valid ? "Ready to replay the seeded scenario." : `Scenario invalid: ${validation.errors[0].message}`; render();
}

$("playButton").addEventListener("click", () => {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
    $("playButton").textContent = state.demoMode ? "Resume demo" : "Resume match";
    $("playButton").classList.add("paused");
    $("stateMessage").textContent = "Playback paused.";
    return;
  }
  if (state.demoMode && state.currentSeconds >= focusedDemoEndSeconds) loadFocusedDemo(false);
  if (!state.demoMode && state.currentSeconds >= 5400) reset();
  $("playButton").textContent = state.demoMode ? "Pause demo" : "Pause match";
  $("playButton").classList.remove("paused");
  $("stateMessage").textContent = "Playback running.";
  state.timer = setInterval(playbackTick, 100);
});
$("resetButton").addEventListener("click", reset);
$("matchProgress").addEventListener("input", (event) => selectTime(Number(event.target.value)));
function loadFocusedDemo(startPlayback = false) {
  state.demoMode = true;
  state.demoActionIndex = 0;
  state.currentSeconds = scenario.demoWindow.startSeconds;
  state.index = eventAtTime(state.currentSeconds);
  state.selectedIndex = state.index;
  state.eventExpanded = true;
  $("stateMessage").textContent = "Focused demo ready · 76:00–78:05.";
  render();
  if (startPlayback && !state.timer) {
    $("playButton").textContent = "Pause demo";
    $("playButton").classList.remove("paused");
    $("stateMessage").textContent = "Focused demo playing · 76:00–78:05.";
    state.timer = setInterval(playbackTick, 100);
  }
}
$("demoButton").addEventListener("click", () => loadFocusedDemo(false));
$("demoJumpButton").addEventListener("click", () => loadFocusedDemo(false));
$("jumpFirstHalf").addEventListener("click", () => selectTime(0));
$("jumpSecondHalf").addEventListener("click", () => selectTime(2700));
$("jumpSeventy").addEventListener("click", () => selectTime(4200));
$("jumpFullTime").addEventListener("click", () => { state.demoMode = false; selectTime(5400); });
$("speedSelect").addEventListener("change", (event) => { state.speed = Number(event.target.value); });
$("detailSelect").addEventListener("change", (event) => { state.detail = event.target.value; render(); });
$("eventDetailsButton").addEventListener("click", () => { state.eventExpanded = !state.eventExpanded; render(); });
render();
