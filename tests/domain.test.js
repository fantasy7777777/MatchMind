const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const vm = require("node:vm");

const scenarioSource = fs.readFileSync("scenario.js", "utf8");
const domainSource = fs.readFileSync("domain.js", "utf8");
const forecastSource = fs.readFileSync("forecast-service.js", "utf8");
const insightSource = fs.readFileSync("insight-service.js", "utf8");
const context = {};
vm.runInNewContext(`${scenarioSource}\n${domainSource}\n${forecastSource}\n${insightSource}\nthis.api = { scenario, validateScenario, reduceMatchState, buildForecast, buildEventInsight };`, context);
const localize = (value) => JSON.parse(JSON.stringify(value));

test("the seeded scenario satisfies the contract", () => {
  const result = context.api.validateScenario(context.api.scenario);
  assert.deepEqual(localize(result), { valid: true, errors: [] });
  const players = context.api.scenario.people.filter((person) => person.role === "player");
  assert.equal(players.length, 22);
  assert.equal(context.api.scenario.positionSamples.filter((sample) => sample.clockSeconds === 0).length, 22);
  for (const player of players) {
    assert.ok(player.baselinePosition.x >= 0 && player.baselinePosition.x <= 100);
    assert.ok(player.baselinePosition.y >= 0 && player.baselinePosition.y <= 100);
    if (player.teamId === context.api.scenario.match.homeTeamId) assert.ok(player.baselinePosition.x <= 50);
    if (player.teamId === context.api.scenario.match.awayTeamId) assert.ok(player.baselinePosition.x >= 50);
  }
  const minuteStates = context.api.scenario.events.filter((event) => event.eventType === "match_state");
  assert.equal(minuteStates.length, 91);
  assert.deepEqual(localize(minuteStates.map((event) => event.clockSeconds)), Array.from({ length: 91 }, (_, minute) => minute * 60));
  assert.equal(context.api.scenario.trackingSnapshots.length, 5401);
  assert.equal(context.api.scenario.trackingSnapshots.every((snapshot) => snapshot.players.length === 22), true);
  assert.deepEqual(localize(context.api.scenario.demoWindow.sequences.map((sequence) => sequence.sequenceId)), [
    "demo-nb-first-goal",
    "demo-harbor-equalizer",
    "demo-nb-second-goal",
  ]);
  const demoSnapshots = context.api.scenario.trackingSnapshots.filter((snapshot) => snapshot.clockSeconds >= 4560 && snapshot.clockSeconds < 5160);
  assert.equal(demoSnapshots.length, 600);
  assert.ok(demoSnapshots.some((snapshot) => snapshot.players.some((player) => player.action === "pressing")));
  assert.ok(demoSnapshots.some((snapshot) => snapshot.players.some((player) => player.action === "supporting")));
  assert.ok(demoSnapshots.some((snapshot) => snapshot.ball.state === "in_flight"));
  for (const playerId of ["player-nb-07", "player-nb-08"]) {
    const beforeBoundary = context.api.scenario.trackingSnapshots.find((snapshot) => snapshot.clockSeconds === 4619).players.find((player) => player.entityId === playerId);
    const afterBoundary = context.api.scenario.trackingSnapshots.find((snapshot) => snapshot.clockSeconds === 4620).players.find((player) => player.entityId === playerId);
    assert.ok(Math.hypot(afterBoundary.x - beforeBoundary.x, afterBoundary.y - beforeBoundary.y) < 5);
  }
  for (let index = 4561; index <= 5160; index += 1) {
    const previous = context.api.scenario.trackingSnapshots[index - 1];
    const current = context.api.scenario.trackingSnapshots[index];
    for (const player of current.players) {
      const prior = previous.players.find((item) => item.entityId === player.entityId);
      assert.ok(Math.hypot(player.x - prior.x, player.y - prior.y) <= 4.01);
    }
  }
  const snapshotAt = (clockSeconds) => context.api.scenario.trackingSnapshots[clockSeconds].players;
  const positionAt = (clockSeconds, playerId) => snapshotAt(clockSeconds).find((player) => player.entityId === playerId);
  const grayAtReceive = positionAt(4580, "player-nb-08");
  const grayAfterPass = positionAt(4665, "player-nb-08");
  const silvaBeforePass = positionAt(4635, "player-nb-10");
  const qiOnRun = positionAt(4665, "player-nb-09");
  const qiAtFinish = positionAt(4679, "player-nb-09");
  assert.ok(grayAfterPass.x >= grayAtReceive.x - 2, "No. 8 should support the attack instead of retreating.");
  assert.ok(silvaBeforePass.x > 55, "No. 10 should carry into the attacking channel.");
  assert.ok(qiAtFinish.x > qiOnRun.x && qiAtFinish.x > 75, "Quentin should visibly attack the penalty area.");
});

test("the reducer derives the expected final statistics", () => {
  const state = context.api.reduceMatchState(context.api.scenario, context.api.scenario.events.length);
  assert.deepEqual(localize(state.score), [3, 2]);
  assert.deepEqual(localize(state.shots), [5, 8]);
  assert.deepEqual(localize(state.onTarget), [5, 4]);
  assert.deepEqual(localize(state.corners), [2, 1]);
  assert.deepEqual(localize(state.offsides), [0, 1]);
  assert.deepEqual(localize(state.possessionChanges), [3, 2]);
  assert.deepEqual(localize(state.possession), [60, 40]);
  assert.equal(state.score[0] + state.score[1], 5);
  assert.notEqual(state.shots[0] + state.shots[1], state.score[0] + state.score[1]);
});

test("invalid coordinates are rejected before playback", () => {
  const invalid = structuredClone(context.api.scenario);
  invalid.events[3].location.x = 101;
  const result = context.api.validateScenario(invalid);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.path === "events[4].location"));
});

test("malformed required collections and event locations are rejected", () => {
  const invalid = structuredClone(context.api.scenario);
  invalid.events[2].location = undefined;
  invalid.positionSamples = undefined;
  const result = context.api.validateScenario(invalid);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.path === "events[3].location"));
  assert.ok(result.errors.some((error) => error.path === "positionSamples"));
});

test("the foul insight is grounded in structured evidence", () => {
  const event = context.api.scenario.events.find((item) => item.eventType === "foul");
  const state = context.api.reduceMatchState(context.api.scenario, context.api.scenario.events.indexOf(event) + 1);
  const insight = context.api.buildEventInsight(context.api.scenario, event, state);
  assert.equal(insight.available, true);
  assert.equal(insight.eventId, event.eventId);
  assert.equal(insight.asOfSequence, event.sequence);
  assert.ok(insight.evidenceEventIds.includes(event.eventId));
  assert.equal(insight.synthetic, true);
});

test("forecast alternatives are normalized to 100 percent", () => {
  const event = context.api.scenario.events.find((item) => item.eventType === "foul");
  const forecast = context.api.buildForecast(event);
  const total = forecast.alternatives.reduce((sum, alternative) => sum + alternative.probability, 0);
  assert.equal(forecast.available, true);
  assert.equal(total, 100);
  assert.equal(forecast.asOfSequence, event.sequence);
  assert.equal(forecast.synthetic, true);
});

test("unsupported events return an explicit unavailable forecast", () => {
  const event = context.api.scenario.events.find((item) => item.eventType === "pass");
  const forecast = context.api.buildForecast(event);
  assert.equal(forecast.available, false);
  assert.match(forecast.reason, /direct free-kick context/i);
});

test("missing referee evidence leaves the distance explicitly unavailable", () => {
  const input = structuredClone(context.api.scenario);
  input.positionSamples = input.positionSamples.filter((sample) => sample.entityId !== "referee-01");
  const event = input.events.find((item) => item.eventType === "foul");
  const state = context.api.reduceMatchState(input, input.events.indexOf(event) + 1);
  const insight = context.api.buildEventInsight(input, event, state);
  assert.equal(insight.available, true);
  assert.equal(insight.evidenceMetrics.refereeDistanceM, null);
  assert.equal(insight.confidence, 0.55);
});
