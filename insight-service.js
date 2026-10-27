function buildEventInsight(input, event, matchState) {
  if (!event || event.eventType !== "foul") {
    return {
      available: false,
      reason: "This event does not have a configured insight.",
      synthetic: true,
    };
  }

  const samples = samplesForEvent(input, event);
  const referee = samples.find((sample) => sample.entityId === "referee-01");
  const affectedActorId = event.relatedActorIds?.[0];
  const affectedActor = input.people.find((person) => person.personId === affectedActorId);
  const foulingActor = input.people.find((person) => person.personId === event.primaryActorId);
  const restartTeam = input.teams.find((team) => team.teamId === affectedActor?.teamId);
  const distance = referee
    ? Math.round(Math.hypot(
      (event.location.x - referee.x) * input.match.pitchLengthM / 100,
      (event.location.y - referee.y) * input.match.pitchWidthM / 100,
    ))
    : null;

  const confidence = samples.length >= 3 && distance !== null ? 0.9 : samples.length > 0 ? 0.55 : 0;
  if (!foulingActor || !affectedActor || !restartTeam || confidence === 0) {
    return {
      available: false,
      reason: "Insufficient validated context to explain this foul.",
      synthetic: true,
    };
  }

  return {
    available: true,
    insightId: `insight-${event.eventId}`,
    matchId: input.match.matchId,
    eventId: event.eventId,
    asOfSequence: event.sequence,
    kind: "foul_context",
    headline: "Foul stops an attacking move",
    explanation: `${restartTeam.shortName}'s attack is stopped by ${foulingActor.displayName} near the right touchline. ${affectedActor.displayName} has a direct free kick, creating an opportunity to deliver or recycle possession.`,
    evidenceEventIds: [event.eventId, "evt-008"],
    evidenceMetrics: {
      refereeDistanceM: distance,
      positionSampleCount: samples.length,
      possession: matchState.possession,
    },
    confidence,
    generatedAt: "2026-10-22T00:00:00.000Z",
    language: "en",
    synthetic: true,
  };
}
