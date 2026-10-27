const fiveRoster = [
  { id: "home-gk", number: "1", name: "Keeper", role: "Goalkeeper", team: "home" },
  { id: "home-7", number: "7", name: "Vale", role: "Winger", team: "home" },
  { id: "home-8", number: "8", name: "Gray", role: "Midfielder", team: "home" },
  { id: "home-9", number: "9", name: "Qi", role: "Forward", team: "home" },
  { id: "home-10", number: "10", name: "Silva", role: "Winger", team: "home" },
  { id: "away-gk", number: "1", name: "Keeper", role: "Goalkeeper", team: "away" },
  { id: "away-4", number: "4", name: "Stone", role: "Defender", team: "away" },
  { id: "away-6", number: "6", name: "Reed", role: "Defender", team: "away" },
  { id: "away-8", number: "8", name: "Park", role: "Midfielder", team: "away" },
  { id: "away-10", number: "10", name: "Cole", role: "Forward", team: "away" },
];

const positions = (rows) => rows.map((row) => Object.fromEntries(row.map((point, index) => [fiveRoster[index].id, { x: point[0], y: point[1] }])));
const keyframes = (rows, balls) => positions(rows).map((players, index) => ({ second: index, players, ball: balls[index] }));

const fiveScenarios = {
  breakthrough: {
    title: "Long ball and breakthrough",
    pitchTitle: "Gray releases Qi behind the dropping line",
    explanation: "Qi checks into the far channel, then accelerates as Gray looks up. Two defenders recover toward the box while the others keep pressure around midfield. Gray releases a lofted diagonal into the space ahead of Qi while Qi remains behind the second-last defender; Qi gathers in stride and drives into the box.",
    duration: 11,
    actions: [
      { second: 0, label: "Gray starts the carry", detail: "No. 8 controls from the lower channel.", type: "carry", ownerId: "home-8" },
      { second: 1, label: "Gray carries forward", detail: "Stone begins closing while Qi checks the far channel.", type: "carry", ownerId: "home-8" },
      { second: 3, label: "Qi accelerates into the far channel", detail: "Qi breaks forward as Stone and Reed begin dropping toward the box.", type: "carry", ownerId: "home-8" },
      { second: 4, label: "Gray releases the long ball", detail: "Gray lifts a diagonal pass from (55,60) into space at (73,36); Qi is onside at release.", type: "pass", ownerId: null },
      { second: 5, label: "Pass reaches the space", detail: "Qi arrives as the ball drops, with Stone recovering from goal side.", type: "receive", ownerId: null },
      { second: 6, label: "Qi controls in stride", detail: "Qi gathers at (74,36) and turns directly toward goal.", type: "receive", ownerId: "home-9" },
      { second: 8, label: "Qi drives into the box", detail: "Stone closes from the inside while Reed covers the central lane.", type: "carry", ownerId: "home-9" },
      { second: 10, label: "Qi shoots", detail: "Qi strikes from (93,48) across the goalkeeper.", type: "shot", ownerId: null },
      { second: 11, label: "Qi scores", detail: "The ball crosses the line; sequence complete.", type: "goal", ownerId: null },
    ],
    frames: keyframes([
      [[8,50],[30,30],[32,70],[43,44],[48,50],[92,50],[70,30],[70,70],[52,50],[36,50]],
      [[9,50],[32,31],[39,68],[44,45],[49,51],[91,50],[68,32],[70,69],[53,51],[38,50]],
      [[10,50],[34,32],[45,65],[48,44],[50,52],[90,50],[66,35],[69,67],[54,52],[40,50]],
      [[11,50],[36,33],[51,62],[55,40],[52,53],[89,50],[66,38],[68,64],[55,53],[43,50]],
      [[12,50],[38,34],[55,60],[62,37],[54,53],[88,50],[69,39],[69,61],[56,54],[46,50]],
      [[13,50],[40,35],[56,59],[71,36],[56,54],[87,50],[74,38],[74,60],[58,55],[50,50]],
      [[14,50],[42,36],[59,57],[74,36],[58,54],[86,50],[78,40],[77,58],[60,55],[52,50]],
      [[15,50],[44,37],[61,55],[79,39],[60,54],[86,50],[82,41],[80,56],[61,54],[54,50]],
      [[16,50],[46,38],[63,53],[85,42],[62,54],[94,48],[86,38],[84,54],[63,54],[56,50]],
      [[16,50],[48,39],[65,52],[89,45],[64,54],[94,47],[88,40],[89,52],[64,54],[58,50]],
      [[16,50],[50,40],[68,50],[93,48],[66,54],[94,49],[90,43],[91,52],[65,54],[60,50]],
      [[16,50],[50,40],[68,50],[93,48],[66,54],[95,50],[90,43],[91,52],[65,54],[60,50]],
    ], [
      { x: 32, y: 70, ownerId: "home-8", state: "controlled" },
      { x: 39, y: 68, ownerId: "home-8", state: "controlled" },
      { x: 45, y: 65, ownerId: "home-8", state: "controlled" },
      { x: 51, y: 62, ownerId: "home-8", state: "controlled" },
      { x: 55, y: 60, endX: 73, endY: 36, controlX: 65, controlY: 46, state: "in_flight" },
      { x: 73, y: 36, state: "in_flight" },
      { x: 74, y: 36, ownerId: "home-9", state: "controlled" },
      { x: 79, y: 39, ownerId: "home-9", state: "controlled" },
      { x: 85, y: 42, ownerId: "home-9", state: "controlled" },
      { x: 89, y: 45, ownerId: "home-9", state: "controlled" },
      { x: 93, y: 48, endX: 99, endY: 50, state: "in_flight" },
      { x: 99, y: 50, state: "goal" },
    ]),
  },
  foul: {
    title: "Foul under pressure",
    pitchTitle: "Counter stopped illegally",
    explanation: "Vale carries into pressure; Stone's trip stops the counter. The referee awards a direct free kick to Gray, and the contact/ruling detail is available from the pitch marker.",
    duration: 8,
    actions: [
      { second: 0, label: "Vale wins the loose ball", detail: "No. 7 gains control and turns upfield.", type: "receive", ownerId: "home-7" },
      { second: 2, label: "Vale drives into space", detail: "Stone recovers while Gray and Qi fill support lanes.", type: "carry", ownerId: "home-7" },
      { second: 4, label: "Stone closes the runner", detail: "Vale changes direction near the attacking half.", type: "carry", ownerId: "home-7" },
      { second: 5, label: "Stone trips Vale", detail: "Careless leg contact; direct free kick to Gray, no card.", type: "foul", ownerId: null },
      { second: 6, label: "Restart shape", detail: "The referee holds position; no restart has been taken.", type: "restart", ownerId: null },
      { second: 8, label: "Sequence complete", detail: "The scenario ends before the free kick.", type: "complete", ownerId: null },
    ],
    frames: keyframes([
      [[8,50],[42,30],[32,70],[62,50],[48,50],[92,50],[70,30],[70,70],[52,50],[36,50]],
      [[9,50],[49,31],[35,68],[64,48],[49,50],[91,50],[68,32],[68,68],[53,51],[38,50]],
      [[10,50],[56,33],[39,66],[66,46],[51,50],[91,50],[66,34],[66,66],[54,52],[40,50]],
      [[11,50],[63,35],[43,64],[68,44],[53,50],[90,50],[67,35],[64,64],[55,53],[42,50]],
      [[12,50],[68,37],[47,62],[70,42],[55,49],[89,50],[69,37],[62,62],[56,54],[44,50]],
      [[12,50],[71,38],[50,60],[72,40],[57,48],[88,50],[71,38],[61,60],[57,55],[46,50]],
      [[12,50],[71,38],[52,59],[72,40],[59,47],[88,50],[71,38],[60,59],[58,55],[48,50]],
      [[12,50],[71,38],[54,58],[72,40],[61,46],[88,50],[72,38],[60,58],[59,55],[50,50]],
      [[12,50],[71,38],[54,58],[72,40],[61,46],[88,50],[72,38],[60,58],[59,55],[50,50]],
    ], [
      { x: 46, y: 35, ownerId: "home-7", state: "controlled" },
      { x: 49, y: 31, ownerId: "home-7", state: "controlled" },
      { x: 56, y: 33, ownerId: "home-7", state: "controlled" },
      { x: 63, y: 35, ownerId: "home-7", state: "controlled" },
      { x: 68, y: 37, ownerId: "home-7", state: "controlled" },
      { x: 71, y: 38, state: "stopped" },
      { x: 71, y: 38, state: "stopped" },
      { x: 71, y: 38, state: "stopped" },
      { x: 71, y: 38, state: "stopped" },
    ]),
  },
  corner: {
    title: "Corner-kick assist",
    pitchTitle: "Crowded box, immediate header",
    explanation: "Both teams set around the six-yard area before Silva delivers a high, curling cross over the crowd. Qi is already at the landing point and meets Stone in an immediate aerial contest.",
    duration: 5,
    actions: [
      { second: 0, label: "Players set for the corner", detail: "Attackers and defenders arrange around the goal before the delivery.", type: "corner_setup", ownerId: "home-10" },
      { second: 1, label: "Silva delivers over the crowd", detail: "The cross bends toward Qi, already holding position in front of goal.", type: "corner", ownerId: null },
      { second: 2, label: "Immediate aerial contest", detail: "Qi and Stone meet the dropping ball; Qi gets first contact.", type: "aerial_contest", ownerId: null },
      { second: 3, label: "Qi flicks the header", detail: "Qi redirects the delivery toward the far side.", type: "header", ownerId: null },
      { second: 4, label: "Qi scores", detail: "The headed ball crosses the line.", type: "goal", ownerId: null },
      { second: 5, label: "Sequence complete", detail: "No further play is implied.", type: "complete", ownerId: null },
    ],
    frames: keyframes([
      [[8,50],[84,43],[82,58],[89,47],[98,4],[92,50],[88,45],[85,54],[84,39],[80,50]],
      [[8,50],[84,43],[82,58],[89,47],[98,4],[92,50],[88,45],[85,54],[84,39],[80,50]],
      [[8,50],[84,42],[82,58],[89,47],[94,9],[91,50],[88,45],[85,54],[84,39],[80,50]],
      [[8,50],[84,42],[82,58],[89,47],[92,10],[90,50],[88,45],[85,54],[84,39],[80,50]],
      [[8,50],[84,42],[82,58],[90,48],[92,10],[96,53],[89,45],[85,54],[84,39],[80,50]],
      [[8,50],[84,42],[82,58],[90,48],[92,10],[95,53],[89,45],[85,54],[84,39],[80,50]],
    ], [
      { x: 98, y: 4, ownerId: "home-10", state: "controlled" },
      { x: 98, y: 4, endX: 89, endY: 47, controlX: 76, controlY: 22, state: "in_flight" },
      { x: 89, y: 47, state: "contested" },
      { x: 89, y: 47, endX: 99, endY: 54, state: "in_flight" },
      { x: 99, y: 54, state: "goal" },
      { x: 99, y: 54, state: "goal" },
    ]),
  },
};

const insightCatalog = {
  breakthrough: {
    0: {
      story: "Gray starts in possession in the lower channel while Qi offers a far-side option.",
      tactics: "The opening shape gives Gray a forward lane and keeps Qi separated from the ball-side pressure.",
    },
    8: {
      story: "Qi has controlled the long pass and is driving into the box as Stone recovers and Reed covers inside.",
      tactics: "Gray released into space while Qi was behind the second-last defender. Stone and Reed retreated to protect the box; Park and Cole stayed higher to press the ball side. Gray and Silva trail the attack, so neither is an immediate pass option near Qi.",
      nextMove: [ ["Shoot across goal", 61], ["Take one touch to draw the goalkeeper, then finish", 24], ["Cut toward the central lane for a closer shot", 15] ],
    },
    10: {
      story: "Qi releases a low, curling finish toward the far side after driving into the box.",
      tactics: "The long diagonal pass pulled Qi beyond the retreating line; he gets the shot away before Stone can close the angle.",
      technique: "Low, curling strike across the goalkeeper from the right side of the box.",
      footSpeed: "Left foot. Qi's preferred foot is right, so this is the non-dominant side. Approx. 79 km/h (authored synthetic estimate).",
      xg: "0.42 illustrative xG estimate for this authored chance. This is not an official or calibrated model output.",
      keeper: "The keeper stays goal-side, shifts along the goal line to track Qi, and turns toward the ball. After the strike, he dives across goal but cannot reach the far-side finish. This response is authored and synthetic.",
    },
    11: {
      recap: "Gray carried beyond halfway, Qi timed a run behind the retreating line, and Gray's lofted diagonal found him in stride. Qi drove into the box and finished across the goalkeeper.",
      story: "Qi's run and finish complete Gray's long-ball attack.",
    },
  },
  foul: {
    0: {
      story: "Vale has recovered the loose ball and turns into the open channel.",
      tactics: "Gray and Qi begin moving into support lanes as Blue's defenders recover.",
    },
    5: {
      story: "Stone stops Vale's forward carry with a foul; Gray is awarded a free kick.",
      tactics: "Vale had support in the inside lane, but Stone's recovery challenge ends the transition before a shot develops.",
      contact: "As Vale pushes the ball ahead from (68,37) toward (71,38), Stone reaches across his path from the goal side and clips Vale's trailing lower leg. Vale stumbles and loses control; the ball stops at the incident spot. Authored as a careless trip, with no reckless force or dangerous high contact shown.",
      ruling: "The referee whistles for a direct free kick to Gray at (71,38). No card is shown in this scenario. The incident is outside the penalty area, so it is not a penalty; the kick is not taken before the sequence ends.",
      recap: "Vale carries into pressure, Stone commits the foul, and play stops before the free kick is taken.",
    },
  },
  corner: {
    0: {
      story: "Silva is set over the corner while both teams hold their positions in front of goal.",
      tactics: "Qi is already at the intended contact point with Stone marking him; the cross will meet a set-piece crowd.",
    },
    1: {
      story: "Silva sends a high curling delivery over the set-piece crowd toward Qi.",
      tactics: "Qi holds the near-goal contact point while Stone marks him; the delivery reaches the target without a late run-in.",
      nextMove: [ ["Qi attacks the header", 58], ["Qi knocks the ball down", 27], ["Defender clears", 15] ],
    },
    2: {
      story: "Qi and Stone meet the dropping cross at the planned contact point; Qi gets first touch.",
      tactics: "Qi's starting position lets him contest immediately instead of chasing the ball from midfield.",
      nextMove: [ ["Header toward far side", 58], ["Knockdown to a teammate", 27], ["Defensive clearance", 15] ],
    },
    3: {
      story: "Qi redirects the corner with a header toward the far side.",
      tactics: "The first contact changes the delivery's direction and forces the goalkeeper to adjust across goal.",
      technique: "Aerial header redirected toward the far side; a foot is not involved.",
      xg: "0.38 illustrative xG estimate for this authored header. This is not an official or calibrated model output.",
      keeper: "The goalkeeper reacts to the redirection and dives across goal; the header passes beyond the reach shown in the sequence. Reaction timing is synthetic.",
    },
    4: {
      recap: "Silva delivers over the crowd, Qi wins the immediate aerial contest with Stone, and his far-side header beats the goalkeeper.",
      story: "Qi turns Silva's corner delivery into the winning touch and goal.",
    },
  },
};

const scenarioMoments = {
  breakthrough: {
    second: 10, x: 93, y: 48, marker: "i", title: "Shot detail", players: ["home-9"],
    summary: "Qi reaches the box and strikes low with his non-dominant left foot, curling the ball across goal at an authored estimate of 79 km/h.",
    outcomeLabel: "Goalkeeper response",
    outcome: "The keeper stays goal-side, tracks Qi, and dives after the shot, but cannot reach the far side.",
    reveal: ["story", "tactics", "technique", "footSpeed", "xg", "keeper"],
  },
  foul: {
    second: 5, x: 71, y: 38, marker: "!", title: "Foul detail", players: ["away-4", "home-7"], separator: " on ",
    summary: insightCatalog.foul[5].contact,
    outcomeLabel: "Referee ruling",
    outcome: insightCatalog.foul[5].ruling,
    reveal: ["story", "tactics", "contact", "ruling", "recap"],
  },
  corner: {
    second: 3, x: 89, y: 47, marker: "i", title: "Corner header", players: ["home-9"],
    summary: "Silva's curved delivery reaches the crowded goalmouth. Qi and Stone contest at the planned contact point; Qi gets first contact and redirects the ball toward the far side.",
    outcomeLabel: "Goalkeeper response",
    outcome: "The goalkeeper adjusts to the header and dives across goal, but the ball passes beyond his reach.",
    reveal: ["story", "tactics", "technique", "xg", "keeper", "recap"],
  },
};

const scenarioRatingUpdates = {
  breakthrough: [
    { second: 3, playerId: "home-9", rating: 6.4, reason: "Times the run behind the line" },
    { second: 4, playerId: "home-8", rating: 7.0, reason: "Delivers the lofted pass into space" },
    { second: 6, playerId: "home-9", rating: 7.1, reason: "Controls the pass in stride" },
    { second: 8, playerId: "away-4", rating: 5.8, reason: "Qi carries beyond the first challenge" },
    { second: 8, playerId: "away-6", rating: 5.8, reason: "Recovery cover is still in progress" },
    { second: 11, playerId: "home-9", rating: 8.4, reason: "Scores the decisive finish" },
    { second: 11, playerId: "home-8", rating: 7.5, reason: "Creates the scoring chance with the assist" },
    { second: 11, playerId: "away-gk", rating: 5.5, reason: "Beaten by the far-side finish" },
  ],
  foul: [
    { second: 2, playerId: "home-7", rating: 6.5, reason: "Wins possession and carries forward" },
    { second: 3, playerId: "home-8", rating: 6.2, reason: "Moves into a supporting lane" },
    { second: 3, playerId: "home-9", rating: 6.2, reason: "Offers an inside support option" },
    { second: 5, playerId: "home-7", rating: 6.9, reason: "Wins a dangerous free kick" },
    { second: 5, playerId: "away-4", rating: 5.3, reason: "Careless trip concedes a free kick" },
  ],
  corner: [
    { second: 1, playerId: "home-10", rating: 6.8, reason: "Delivers a curling corner into the crowd" },
    { second: 2, playerId: "home-9", rating: 7.1, reason: "Holds position and wins first contact" },
    { second: 3, playerId: "away-4", rating: 5.6, reason: "Loses the immediate aerial contest" },
    { second: 4, playerId: "home-9", rating: 8.3, reason: "Scores with the header" },
    { second: 4, playerId: "home-10", rating: 7.3, reason: "Creates the goal with the delivery" },
    { second: 4, playerId: "away-gk", rating: 5.5, reason: "Cannot reach the redirected header" },
  ],
};

let currentScenario = "breakthrough";
let playbackSeconds = 0;
let timer = null;
let lastRatingsSignature = "";
const $ = (id) => document.getElementById(id);
if ($("viewerDetails")) $("viewerDetails").open = false;
const scenario = () => fiveScenarios[currentScenario];
const nearestAction = (seconds) => [...scenario().actions].reverse().find((item) => seconds >= item.second) || scenario().actions[0];
const formatSeekTime = (seconds) => `00:${String(Math.floor(seconds)).padStart(2, "0")}`;
const playerContext = (playerId) => {
  const player = fiveRoster.find((person) => person.id === playerId);
  const teamName = player.team === "home" ? "Gray team" : "Blue team";
  return `${player.name} (${teamName} · #${player.number} · ${player.role})`;
};

function frameAt(seconds) {
  const frames = scenario().frames;
  const lower = Math.min(frames.length - 1, Math.floor(seconds));
  const upper = Math.min(frames.length - 1, lower + 1);
  const progress = upper === lower ? 0 : seconds - lower;
  const players = Object.fromEntries(fiveRoster.map((person) => {
    const from = frames[lower].players[person.id];
    const to = frames[upper].players[person.id];
    return [person.id, { x: from.x + (to.x - from.x) * progress, y: from.y + (to.y - from.y) * progress }];
  }));
  const fromBall = frames[lower].ball;
  const toBall = frames[upper].ball;
  const targetBall = fromBall.endX
    ? { x: fromBall.endX, y: fromBall.endY }
    : { x: toBall.x, y: toBall.y };
  const curve = fromBall.controlX === undefined ? null : { x: fromBall.controlX, y: fromBall.controlY };
  const pointOnBallPath = (t) => curve
    ? { x: (1 - t) ** 2 * fromBall.x + 2 * (1 - t) * t * curve.x + t ** 2 * targetBall.x, y: (1 - t) ** 2 * fromBall.y + 2 * (1 - t) * t * curve.y + t ** 2 * targetBall.y }
    : { x: fromBall.x + (targetBall.x - fromBall.x) * t, y: fromBall.y + (targetBall.y - fromBall.y) * t };
  const pathPoint = pointOnBallPath(progress);
  const ball = {
    x: pathPoint.x,
    y: pathPoint.y,
    state: fromBall.state,
    ownerId: fromBall.ownerId,
  };
  if (ball.ownerId && players[ball.ownerId]) {
    ball.x = players[ball.ownerId].x;
    ball.y = players[ball.ownerId].y;
  }
  if (upper === lower) {
    ball.x = fromBall.endX || fromBall.x;
    ball.y = fromBall.endY || fromBall.y;
  }
  return { players, ball };
}

function renderTimeline() {
  $("scenarioTimeline").innerHTML = scenario().actions.map((item, index) => `<button class="five-action ${item.second === nearestAction(playbackSeconds).second ? "selected" : ""}" data-index="${index}" type="button"><time>00:${String(item.second).padStart(2, "0")}</time><span class="event-icon ${item.type}">${item.type === "goal" ? "●" : item.type === "foul" ? "!" : item.type === "shot" || item.type === "header" ? "↯" : item.type.includes("corner") ? "◢" : "↗"}</span><span><b>${item.label}</b><small>${item.detail}</small></span></button>`).join("");
  document.querySelectorAll(".five-action").forEach((button) => button.addEventListener("click", () => { playbackSeconds = scenario().actions[Number(button.dataset.index)].second; stop(); render(); }));
}

function renderRoster() {
  const rosterContent = $("rosterContent");
  if (!rosterContent) return;
  rosterContent.innerHTML = ["home", "away"].map((team) => {
    const players = fiveRoster.filter((player) => player.team === team);
    const teamName = team === "home" ? "Gray team" : "Blue team";
    const kitName = team === "home" ? "Green markers" : "Blue markers";
    return `<section class="roster-team ${team}" aria-label="${teamName} roster"><h3><i class="legend-dot ${team}-dot"></i>${teamName}<small>${kitName} · 1 goalkeeper + 4 outfield</small></h3>${players.map((player) => `<div class="roster-player"><span class="roster-shirt">#${player.number}</span><b>${player.name}</b><small>${player.role}</small></div>`).join("")}</section>`;
  }).join("");
}

function renderPitch() {
  const current = frameAt(playbackSeconds);
  const item = nearestAction(playbackSeconds);
  const owner = current.ball.ownerId ? fiveRoster.find((person) => person.id === current.ball.ownerId) : null;
  $("fivePlayers").innerHTML = fiveRoster.map((player) => {
    const point = current.players[player.id];
    const possession = owner?.id === player.id ? "possessing" : "";
    const goalkeeper = player.id.endsWith("-gk");
    const facingAngle = Math.atan2(current.ball.y - point.y, current.ball.x - point.x) * 180 / Math.PI + 90;
    return `<span class="marker player-marker ${player.team} ${possession} ${goalkeeper ? "goalkeeper" : ""}" style="left:calc(${point.x}% - 12.5px);top:calc(${point.y}% - 12.5px);--facing-angle:${facingAngle}deg" title="${player.name} #${player.number}${goalkeeper ? " · faces ball" : ""}"><b>#${player.number}</b></span>`;
  }).join("");
  $("fiveBall").hidden = Boolean(owner) || ["stopped", "goal", "contested"].includes(current.ball.state);
  $("fiveBall").style.left = `calc(${current.ball.x}% - 11px)`;
  $("fiveBall").style.top = `calc(${current.ball.y}% - 11px)`;
  $("fiveBall").classList.toggle("in-motion", current.ball.state === "in_flight");
  const scenarioMoment = scenarioMoments[currentScenario];
  const momentAvailable = playbackSeconds >= scenarioMoment.second;
  const momentDot = $("scenarioInsightDot");
  const momentPopover = $("scenarioInsightPopover");
  if (momentDot && momentPopover) {
    momentDot.hidden = !momentAvailable;
    if (!momentAvailable) {
      momentPopover.hidden = true;
      momentDot.setAttribute("aria-expanded", "false");
    } else {
      momentDot.style.setProperty("--moment-x", `${scenarioMoment.x}%`);
      momentDot.style.setProperty("--moment-y", `${scenarioMoment.y}%`);
      momentDot.textContent = scenarioMoment.marker;
      momentDot.setAttribute("aria-label", `Open ${scenarioMoment.title.toLowerCase()}`);
      momentPopover.style.setProperty("--moment-x", `${scenarioMoment.x}%`);
      momentPopover.style.setProperty("--moment-y", `${scenarioMoment.y}%`);
      const playerNames = scenarioMoment.players.map(playerContext).join(scenarioMoment.separator || " · ");
      $("scenarioPopoverTitle").textContent = `${scenarioMoment.title} · ${playerNames} · simulated`;
      $("scenarioMomentSummary").textContent = scenarioMoment.summary;
      $("scenarioOutcomeHeading").textContent = scenarioMoment.outcomeLabel;
      $("scenarioOutcomeText").textContent = scenarioMoment.outcome;
      momentDot.setAttribute("aria-expanded", String(!momentPopover.hidden));
    }
  }
  const trajectory = $("fiveTrajectory");
  const showTrajectory = ["in_flight", "goal"].includes(current.ball.state);
  trajectory.hidden = !showTrajectory;
  if (showTrajectory) {
    const frame = scenario().frames[Math.min(scenario().frames.length - 1, Math.floor(playbackSeconds))].ball;
    const endX = frame.endX ?? frame.x;
    const endY = frame.endY ?? frame.y;
    const path = frame.controlX === undefined
      ? `M ${frame.x} ${frame.y} L ${endX} ${endY}`
      : `M ${frame.x} ${frame.y} Q ${frame.controlX} ${frame.controlY} ${endX} ${endY}`;
    $("ballTrajectoryPath").setAttribute("d", path);
    $("ballTrajectoryPath").setAttribute("marker-end", "url(#ballPathArrow)");
  } else {
    $("ballTrajectoryPath").removeAttribute("d");
    $("ballTrajectoryPath").removeAttribute("marker-end");
  }
  $("possessionLabel").textContent = owner ? `Possession · #${owner.number}` : current.ball.state === "stopped" ? "Whistle · foul" : current.ball.state === "contested" ? "Aerial contest" : current.ball.state === "goal" ? "Goal · Qi" : "Ball in motion";
  $("actionLabel").textContent = item.label;
  $("actionProgress").textContent = `${Math.round((playbackSeconds / scenario().duration) * 100)}%`;
  $("scenarioSeek").max = scenario().duration;
  $("scenarioSeek").value = playbackSeconds;
  $("scenarioSeek").setAttribute("aria-valuetext", `${formatSeekTime(playbackSeconds)} of ${formatSeekTime(scenario().duration)}`);
  $("seekTime").textContent = `${formatSeekTime(playbackSeconds)} / ${formatSeekTime(scenario().duration)}`;
  renderInsights(item);
  renderPlayerRatings();
}

function renderPlayerRatings() {
  const content = $("playerRatingsContent");
  if (!content) return;
  const signature = `${currentScenario}:${Math.floor(playbackSeconds)}`;
  if (signature === lastRatingsSignature) return;
  lastRatingsSignature = signature;
  const currentRatings = Object.fromEntries(fiveRoster.map((player) => [player.id, { value: 6.0, reason: "No key contribution recorded yet" }]));
  scenarioRatingUpdates[currentScenario]
    .filter((update) => update.second <= playbackSeconds)
    .forEach((update) => { currentRatings[update.playerId] = { value: update.rating, reason: update.reason }; });
  content.innerHTML = ["home", "away"].map((team) => {
    const teamName = team === "home" ? "Gray team" : "Blue team";
    const players = fiveRoster.filter((player) => player.team === team);
    return `<section class="player-rating-team ${team}"><h3><i class="legend-dot ${team}-dot"></i>${teamName}</h3>${players.map((player) => {
      const current = currentRatings[player.id];
      const formatted = current.value.toFixed(1);
      return `<div class="player-rating-row"><span class="rating-shirt">#${player.number}</span><span class="rating-player"><b>${player.name}</b><small>${current.reason}</small></span><span class="rating-value" aria-label="${formatted} out of 10">${formatted}</span><span class="rating-meter" aria-hidden="true"><i style="width:${current.value * 10}%"></i></span></div>`;
    }).join("")}</section>`;
  }).join("");
}

function renderInsights(item) {
  const card = $("insightCard");
  if (!card) return;
  const insight = insightCatalog[currentScenario]?.[item.second] || (currentScenario === "foul" && playbackSeconds >= 5 ? insightCatalog.foul[5] : {});
  const selected = [...document.querySelectorAll("[data-insight]:checked")].map((input) => input.dataset.insight);
  const blocks = [];
  const add = (key, title, value, wide = false) => {
    if (selected.includes(key) && value) blocks.push(`<section class="insight-item ${wide ? "wide" : ""}"><strong>${title}</strong><p>${value}</p></section>`);
  };
  add("story", "Moment story", insight.story, true);
  add("tactics", "Tactical context", insight.tactics, true);
  add("technique", "Technique", insight.technique);
  add("footSpeed", "Foot and speed", insight.footSpeed);
  add("xg", "Chance estimate", insight.xg);
  add("keeper", "Goalkeeper response", insight.keeper, true);
  add("contact", "Foul contact · authored scenario detail", insight.contact, true);
  add("ruling", "Referee ruling · authored scenario detail", insight.ruling, true);
  if (selected.includes("nextMove") && insight.nextMove) {
    const rows = insight.nextMove.map(([label, probability]) => `<div class="next-action-row"><span>${label}</span><span>${probability}%</span></div>`).join("");
    blocks.push(`<section class="insight-item wide"><strong>Possible next actions · illustrative probabilities</strong>${rows}<p>Scenario-authored possibilities, not a live predictive model.</p></section>`);
  }
  add("recap", "Sequence recap", insight.recap, true);
  card.innerHTML = blocks.length ? blocks.join("") : `<p class="detail-hint">No selected detail is authored for “${item.label}” yet.</p>`;
}

function render() {
  const item = nearestAction(playbackSeconds);
  $("scenarioClock").textContent = `00:${String(Math.floor(playbackSeconds)).padStart(2, "0")}`;
  $("scenarioType").textContent = scenario().title;
  $("scenarioTitle").textContent = scenario().title;
  $("pitchTitle").textContent = scenario().pitchTitle;
  $("explanation").textContent = scenario().explanation;
  renderTimeline();
  renderPitch();
  document.querySelectorAll(".scenario-button").forEach((button) => button.classList.toggle("selected", button.dataset.scenario === currentScenario));
  $("fivePlay").textContent = playbackSeconds >= scenario().duration ? "Replay scenario" : timer ? "Pause scenario" : "Play scenario";
}

function stop() { if (timer) clearInterval(timer); timer = null; render(); }
function tick() {
  playbackSeconds = Math.min(scenario().duration, playbackSeconds + 0.1);
  renderPitch();
  $("scenarioClock").textContent = `00:${String(Math.floor(playbackSeconds)).padStart(2, "0")}`;
  if (playbackSeconds >= scenario().duration) stop();
}
$("fivePlay").addEventListener("click", () => {
  if (timer) { stop(); $("fivePlay").textContent = "Resume scenario"; return; }
  if (playbackSeconds >= scenario().duration) playbackSeconds = 0;
  timer = setInterval(tick, 100);
  render();
});
$("fiveReset").addEventListener("click", () => { playbackSeconds = 0; stop(); });
$("scenarioSeek").addEventListener("input", (event) => {
  if (timer) clearInterval(timer);
  timer = null;
  playbackSeconds = Number(event.currentTarget.value);
  render();
});
document.querySelectorAll("[data-insight]").forEach((input) => input.addEventListener("change", () => renderInsights(nearestAction(playbackSeconds))));
if ($("scenarioInsightDot")) $("scenarioInsightDot").addEventListener("click", () => {
  const popover = $("scenarioInsightPopover");
  popover.hidden = !popover.hidden;
  $("scenarioInsightDot").setAttribute("aria-expanded", String(!popover.hidden));
});
if ($("scenarioPopoverClose")) $("scenarioPopoverClose").addEventListener("click", () => {
  $("scenarioInsightPopover").hidden = true;
  $("scenarioInsightDot").setAttribute("aria-expanded", "false");
});
if ($("scenarioOpenDetails")) $("scenarioOpenDetails").addEventListener("click", () => {
  $("viewerDetails").open = true;
  const revealLayers = scenarioMoments[currentScenario].reveal;
  document.querySelectorAll("[data-insight]").forEach((input) => {
    if (revealLayers.includes(input.dataset.insight)) input.checked = true;
  });
  renderInsights(nearestAction(playbackSeconds));
});
document.querySelectorAll(".scenario-button").forEach((button) => button.addEventListener("click", () => {
  currentScenario = button.dataset.scenario;
  playbackSeconds = 0;
  const trajectory = $("fiveTrajectory");
  trajectory.hidden = true;
  $("ballTrajectoryPath").removeAttribute("d");
  $("ballTrajectoryPath").removeAttribute("marker-end");
  stop();
}));
renderRoster();
render();
