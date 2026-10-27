const FORECAST_MODEL_VERSION = "baseline-free-kick-v1";

function normalizeForecastAlternatives(alternatives) {
  if (!Array.isArray(alternatives) || alternatives.length === 0) {
    throw new Error("Forecast requires at least one alternative.");
  }

  const total = alternatives.reduce((sum, alternative) => sum + alternative.probability, 0);
  if (!Number.isFinite(total) || total <= 0) {
    throw new Error("Forecast probabilities must have a positive total.");
  }

  const normalized = alternatives.map((alternative) => ({
    ...alternative,
    probability: (alternative.probability / total) * 100,
  }));
  const roundedTotal = normalized.slice(0, -1).reduce((sum, alternative) => sum + Math.round(alternative.probability), 0);
  normalized[normalized.length - 1].probability = 100 - roundedTotal;
  return normalized;
}

function buildForecast(event) {
  if (!event || event.eventType !== "foul" || event.restartType !== "direct_free_kick") {
    return {
      available: false,
      reason: "A direct free-kick context is required for this forecast.",
      synthetic: true,
    };
  }

  const alternatives = normalizeForecastAlternatives([
    { action: "Direct delivery", probability: 52, rationale: "The restart location supports an immediate attacking delivery." },
    { action: "Short recycled pass", probability: 28, rationale: "A short option can retain possession if the delivery is not on." },
    { action: "Cross / attacking ball", probability: 20, rationale: "Nearby attacking support leaves a second-ball option." },
  ]);

  return {
    available: true,
    forecastId: `forecast-${event.eventId}`,
    eventId: event.eventId,
    asOfSequence: event.sequence,
    horizonSeconds: 8,
    alternatives,
    modelVersion: FORECAST_MODEL_VERSION,
    confidence: 0.72,
    synthetic: true,
  };
}
