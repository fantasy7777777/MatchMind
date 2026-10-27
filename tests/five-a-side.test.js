const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

function createScenarioContext() {
  const source = fs.readFileSync("five-a-side.js", "utf8");
  const context = { console, setInterval: () => 1, clearInterval() {}, Math };
  const listeners = {};
  const element = () => ({ textContent: "", innerHTML: "", hidden: false, style: {}, classList: { add() {}, remove() {}, toggle() {} }, addEventListener(type, listener) { listeners[type] = listener; } });
  const elements = {};
  ["scenarioClock", "scenarioType", "scenarioTitle", "pitchTitle", "explanation", "scenarioTimeline", "fivePlayers", "fiveBall", "fiveTrajectory", "possessionLabel", "actionLabel", "actionProgress", "fivePlay", "fiveReset"].forEach((id) => { elements[id] = element(); });
  context.document = { getElementById: (id) => elements[id], querySelectorAll: () => [] };
  vm.runInNewContext(`${source}; this.testApi = { fiveScenarios, frameAt, render, setScenario: (key) => { currentScenario = key; playbackSeconds = 0; render(); }, setTime: (seconds) => { playbackSeconds = seconds; renderPitch(); } };`, context);
  return { context, elements };
}

test("5v5 scenario page contains three standalone authored sequences", () => {
  const { elements } = createScenarioContext();
  assert.match(elements.scenarioType.textContent, /Pass and breakthrough/);
  assert.match(elements.scenarioTimeline.innerHTML, /Gray starts the carry/);
  assert.match(elements.fivePlayers.innerHTML, /#9/);
  assert.equal(elements.fiveBall.hidden, true);
});

test("5v5 keyframes keep ball transitions continuous and explicit", () => {
  const { context } = createScenarioContext();
  const breakthrough = context.testApi.fiveScenarios.breakthrough;
  const atStart = context.testApi.frameAt.call(null, 0.9);
  assert.ok(atStart.ball.x > 32 && atStart.ball.x < 39);
  assert.equal(context.testApi.frameAt(5).ball.state, "in_flight");
  assert.equal(context.testApi.frameAt(6).ball.ownerId, "home-9");
  assert.equal(breakthrough.frames.at(-1).ball.state, "goal");
  context.testApi.setScenario("corner");
  const cornerSetup = context.testApi.frameAt(0.5);
  assert.equal(cornerSetup.ball.ownerId, "home-10");
  assert.equal(cornerSetup.ball.x, cornerSetup.players["home-10"].x);
  assert.equal(cornerSetup.ball.y, cornerSetup.players["home-10"].y);
  assert.equal(cornerSetup.ball.state, "controlled");
});

test("5v5 scenario selector resets each authored scenario to its own opening state", () => {
  const { context, elements } = createScenarioContext();
  for (const key of ["foul", "corner"]) {
    context.testApi.setScenario(key);
    assert.equal(elements.scenarioClock.textContent, "00:00");
    assert.equal(elements.actionProgress.textContent, "0%");
    assert.match(elements.scenarioType.textContent, key === "foul" ? /Foul/ : /Corner/);
  }
});
