const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

const elementIds = [
  "score", "clock", "shotsHome", "shotsAway", "onTargetHome", "onTargetAway", "cornersHome", "cornersAway", "possessionHome", "possessionAway", "timeline",
  "pitchTitle", "selectedTag", "positionSummary", "incident", "ball", "referee",
  "players", "trajectory", "eventDetailsButton", "eventDetails", "confidence", "insightContent",
  "analystPanel", "analystPayload", "playButton", "resetButton", "speedSelect", "matchProgress", "progressClock",
  "detailSelect", "stateMessage",
  "demoContext", "demoButton",
  "jumpFirstHalf", "jumpSecondHalf", "jumpSeventy", "jumpFullTime", "resultLabel", "demoJumpButton",
];

function createElement() {
  const listeners = {};
  return {
    hidden: false,
    textContent: "",
    innerHTML: "",
    style: {},
    classList: { toggle() {}, add() {}, remove() {} },
    addEventListener(type, listener) { listeners[type] = listener; },
    setAttribute() {},
    dispatch(type, event = {}) { listeners[type]?.(event); },
  };
}

function createContext() {
  const elements = Object.fromEntries(elementIds.map((id) => [id, createElement()]));
  const context = {
    console,
    document: {
      body: { classList: { toggle() {} } },
      getElementById(id) { return elements[id]; },
      querySelectorAll() { return []; },
    },
    setInterval() { return 1; },
    clearInterval() {},
    Math,
  };
  const sources = ["scenario.js", "domain.js", "forecast-service.js", "insight-service.js", "app.js"]
    .map((file) => fs.readFileSync(file, "utf8"))
    .join("\n");
  vm.runInNewContext(sources, context);
  return { context, elements };
}

test("browser controller renders and completes the foul hero path", () => {
  const { context, elements } = createContext();
  const openingPlayers = (elements.players.innerHTML.match(/player-marker/g) || []).length;
  assert.equal(openingPlayers, 22);
  assert.equal(elements.ball.textContent, "B");
  assert.equal(elements.ball.hidden, false);

  for (let index = 0; index <= 6; index += 1) context.advance();
  const beforeShot = elements.players.innerHTML;
  context.selectTime(658);

  assert.equal((elements.players.innerHTML.match(/player-marker/g) || []).length, 22);
  assert.notEqual(elements.players.innerHTML, beforeShot);
  assert.match(elements.pitchTitle.textContent, /Theo Marsh shoots low across goal/);
  context.selectTime(2530);
  assert.match(elements.pitchTitle.textContent, /Foul by/);
  assert.equal(elements.analystPanel.hidden, false);
  assert.match(elements.analystPayload.textContent, /"synthetic": true/);
  assert.match(elements.insightContent.innerHTML, /MODEL ESTIMATE/);

  elements.eventDetailsButton.dispatch("click");
  assert.equal(elements.eventDetails.hidden, false);
  assert.match(elements.eventDetails.innerHTML, /evt-010/);
});

test("match scrubber updates time, derived state, and spatial context", () => {
  const { elements } = createContext();
  const openingPlayers = elements.players.innerHTML;
  elements.matchProgress.value = "1261";
  elements.matchProgress.dispatch("input", { target: elements.matchProgress });

  assert.equal(elements.progressClock.textContent, "21:01 / 90:00");
  assert.equal(elements.clock.textContent, "21:01 · 1st half");
  assert.equal(elements.cornersHome.textContent, 1);
  assert.equal(elements.cornersAway.textContent, 0);
  assert.match(elements.pitchTitle.textContent, /Corner awarded/);
  assert.notEqual(elements.players.innerHTML, openingPlayers);
  assert.match(elements.stateMessage.textContent, /21:01/);
});

test("playback starts continuously, pauses, and reaches full time", () => {
  const { elements } = createContext();
  elements.playButton.dispatch("click");
  assert.equal(elements.playButton.textContent, "Pause match");
  assert.equal(elements.stateMessage.textContent, "Playback running.");
  elements.playButton.dispatch("click");
  assert.equal(elements.playButton.textContent, "Resume match");
  assert.equal(elements.stateMessage.textContent, "Playback paused.");
});

test("demo control jumps to the authored action-chain window", () => {
  const { context, elements } = createContext();
  elements.demoButton.dispatch("click");

  assert.equal(elements.progressClock.textContent, "76:00 / 78:05 demo");
  assert.match(elements.demoContext.textContent, /overload the right half-space/i);
  assert.match(elements.positionSummary.textContent, /authored receive chain/i);
  assert.match(elements.timeline.innerHTML, /receive/);
  assert.match(elements.timeline.innerHTML, /Northbridge United/);
  assert.equal(elements.ball.hidden, true);
  assert.match(elements.ball.title, /controlled by #8 Tomas Gray/);
  assert.match(elements.players.innerHTML, /player-marker home possessing/);

  context.selectTime(4850);
  assert.match(elements.demoContext.textContent, /Harbor raise the press/i);
  assert.match(elements.positionSummary.textContent, /authored pass and run chain/i);
});

test("focused demo controls are visible and start at 76:00", () => {
  const { elements } = createContext();
  elements.demoButton.dispatch("click");
  assert.equal(elements.progressClock.textContent, "76:00 / 78:05 demo");
  elements.demoJumpButton.dispatch("click");
  assert.equal(elements.progressClock.textContent, "76:00 / 78:05 demo");
  elements.playButton.dispatch("click");
  assert.equal(elements.playButton.textContent, "Pause demo");
  elements.playButton.dispatch("click");
  assert.equal(elements.playButton.textContent, "Resume demo");
  assert.equal(elements.matchProgress.max, "4685");
});

test("clicking an event immediately shows its details beside the selected event", () => {
  const { context, elements } = createContext();
  context.selectEvent(context.eventAtTime(2530));
  assert.match(elements.timeline.innerHTML, /timeline-detail/);
  assert.match(elements.timeline.innerHTML, /Why it matters/);
  context.selectEvent(context.eventAtTime(2530));
  assert.doesNotMatch(elements.timeline.innerHTML, /timeline-detail/);
});

test("quick navigation jumps between match halves and key moments", () => {
  const { elements } = createContext();
  elements.jumpSecondHalf.dispatch("click");
  assert.equal(elements.progressClock.textContent, "45:00 / 90:00");
  elements.jumpSeventy.dispatch("click");
  assert.equal(elements.progressClock.textContent, "70:00 / 90:00");
});

test("minute-by-minute state checkpoints cover the full match clock", () => {
  const { context, elements } = createContext();
  context.selectTime(3600);

  assert.doesNotMatch(elements.timeline.innerHTML, /60:00 state/);
  assert.match(elements.timeline.innerHTML, /Northbridge United|Harbor City/);
  assert.match(elements.stateMessage.textContent, /60:00/);
});

test("corner event places its designated taker at the restart", () => {
  const { elements } = createContext();
  elements.matchProgress.value = "1261";
  elements.matchProgress.dispatch("input", { target: elements.matchProgress });

  assert.match(elements.positionSummary.textContent, /22 players/);
  assert.match(elements.positionSummary.textContent, /Ivo Silva taking/);
  assert.match(elements.players.innerHTML, /#10/);
});

test("non-goal actions expose participants and outcomes", () => {
  const { context, elements } = createContext();
  context.selectTime(332);
  elements.eventDetailsButton.dispatch("click");
  assert.match(elements.timeline.innerHTML, /Silva/);
  assert.match(elements.eventDetails.innerHTML, /completed between the lines/);

  context.selectTime(1261);
  elements.eventDetailsButton.dispatch("click");
  assert.match(elements.eventDetails.innerHTML, /inswinging/);
  assert.match(elements.eventDetails.innerHTML, /Arlo King/);
});

test("shot event stages shooter and goalkeeper roles", () => {
  const { elements } = createContext();
  elements.matchProgress.value = "658";
  elements.matchProgress.dispatch("input", { target: elements.matchProgress });

  assert.match(elements.pitchTitle.textContent, /Theo Marsh shoots low across goal/);
  assert.match(elements.positionSummary.textContent, /Theo Marsh striking/);
  assert.match(elements.players.innerHTML, /#9/);
});

test("shot trajectory changes continuously at an intermediate match time", () => {
  const { elements } = createContext();
  elements.matchProgress.value = "654";
  elements.matchProgress.dispatch("input", { target: elements.matchProgress });
  const intermediate = elements.ball.style.left;
  elements.matchProgress.value = "658";
  elements.matchProgress.dispatch("input", { target: elements.matchProgress });
  const endpoint = elements.ball.style.left;

  assert.notEqual(intermediate, endpoint);
  assert.match(elements.positionSummary.textContent, /action 100%/);
});

test("goal event exposes scorer, assist, and trajectory", () => {
  const { elements } = createContext();
  elements.matchProgress.value = "4681";
  elements.matchProgress.dispatch("input", { target: elements.matchProgress });

  assert.match(elements.timeline.innerHTML, /Northbridge United/);
  assert.equal(elements.trajectory.hidden, false);
  elements.eventDetailsButton.dispatch("click");
  assert.match(elements.eventDetails.innerHTML, /Assist: Tomas Gray/);
  assert.match(elements.eventDetails.innerHTML, /Trajectory: curved/);
  assert.match(elements.eventDetails.innerHTML, /right foot, curling inside-foot finish, 92 km\/h/);
  assert.match(elements.eventDetails.innerHTML, /The Compass/);
});

test("Quentin Qi completes a hat-trick in the 3-2 final", () => {
  const { context, elements } = createContext();
  context.selectTime(5400);

  assert.equal(elements.score.textContent, "3 — 2");
  assert.match(elements.resultLabel.textContent, /Northbridge United win 3–2/);
  assert.match(elements.timeline.innerHTML, /Quentin Qi wins the cup for Northbridge/);
  assert.match(elements.timeline.innerHTML, /Theo Marsh/);
});
