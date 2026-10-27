const scenario = {
  contractVersion: "1.0",
  match: {
    matchId: "match-demo-01",
    homeTeamId: "team-northbridge",
    awayTeamId: "team-harbor",
    status: "scheduled",
    period: 1,
    clockSeconds: 0,
    pitchLengthM: 105,
    pitchWidthM: 68,
    seed: "matchmind-demo-2026-01",
    dataMode: "synthetic",
    synthetic: true,
  },
  teams: [
    { teamId: "team-northbridge", name: "Northbridge United", shortName: "Northbridge", color: "#a4e66e" },
    { teamId: "team-harbor", name: "Harbor City", shortName: "Harbor City", color: "#73c4ff" },
  ],
  people: [
    { personId: "player-nb-01", role: "player", teamId: "team-northbridge", shirtNumber: 1, displayName: "Elias Ward", position: "GK", baselinePosition: { x: 6, y: 50 } },
    { personId: "player-nb-02", role: "player", teamId: "team-northbridge", shirtNumber: 2, displayName: "Jon Bell", position: "RB", baselinePosition: { x: 20, y: 18 } },
    { personId: "player-nb-03", role: "player", teamId: "team-northbridge", shirtNumber: 3, displayName: "Rafi Cole", position: "LB", baselinePosition: { x: 20, y: 82 } },
    { personId: "player-nb-04", role: "player", teamId: "team-northbridge", shirtNumber: 4, displayName: "Owen Price", position: "CB", baselinePosition: { x: 17, y: 40 } },
    { personId: "player-nb-05", role: "player", teamId: "team-northbridge", shirtNumber: 5, displayName: "Cal Reed", position: "CB", baselinePosition: { x: 17, y: 60 } },
    { personId: "player-nb-06", role: "player", teamId: "team-northbridge", shirtNumber: 6, displayName: "Milo Hart", position: "DM", baselinePosition: { x: 30, y: 50 } },
    { personId: "player-nb-07", role: "player", teamId: "team-northbridge", shirtNumber: 7, displayName: "Nico Vale", position: "RW", baselinePosition: { x: 43, y: 20 } },
    { personId: "player-nb-08", role: "player", teamId: "team-northbridge", shirtNumber: 8, displayName: "Tomas Gray", position: "CM", baselinePosition: { x: 37, y: 34 } },
    { personId: "player-nb-09", role: "player", teamId: "team-northbridge", shirtNumber: 9, displayName: "Quentin Qi", position: "ST", preferredFoot: "right", baselinePosition: { x: 45, y: 50 } },
    { personId: "player-nb-10", role: "player", teamId: "team-northbridge", shirtNumber: 10, displayName: "Ivo Silva", position: "CM", baselinePosition: { x: 37, y: 66 } },
    { personId: "player-nb-11", role: "player", teamId: "team-northbridge", shirtNumber: 11, displayName: "Arlo King", position: "LW", baselinePosition: { x: 43, y: 80 } },
    { personId: "player-hc-01", role: "player", teamId: "team-harbor", shirtNumber: 1, displayName: "Marcus Shaw", position: "GK", baselinePosition: { x: 94, y: 50 } },
    { personId: "player-hc-02", role: "player", teamId: "team-harbor", shirtNumber: 2, displayName: "Ben Fox", position: "RB", baselinePosition: { x: 80, y: 82 } },
    { personId: "player-hc-03", role: "player", teamId: "team-harbor", shirtNumber: 3, displayName: "Kian Brooks", position: "LB", baselinePosition: { x: 80, y: 18 } },
    { personId: "player-hc-04", role: "player", teamId: "team-harbor", shirtNumber: 4, displayName: "Evan Cole", position: "CB", baselinePosition: { x: 83, y: 60 } },
    { personId: "player-hc-05", role: "player", teamId: "team-harbor", shirtNumber: 5, displayName: "Samir Holt", position: "CB", baselinePosition: { x: 83, y: 40 } },
    { personId: "player-hc-06", role: "player", teamId: "team-harbor", shirtNumber: 6, displayName: "Finn Lowe", position: "DM", baselinePosition: { x: 70, y: 50 } },
    { personId: "player-hc-07", role: "player", teamId: "team-harbor", shirtNumber: 7, displayName: "Jude Lane", position: "RW", baselinePosition: { x: 57, y: 80 } },
    { personId: "player-hc-08", role: "player", teamId: "team-harbor", shirtNumber: 8, displayName: "Omar Bell", position: "CM", baselinePosition: { x: 63, y: 66 } },
    { personId: "player-hc-09", role: "player", teamId: "team-harbor", shirtNumber: 9, displayName: "Theo Marsh", position: "ST", baselinePosition: { x: 55, y: 50 } },
    { personId: "player-hc-10", role: "player", teamId: "team-harbor", shirtNumber: 10, displayName: "Leo Grant", position: "CM", baselinePosition: { x: 63, y: 34 } },
    { personId: "player-hc-11", role: "player", teamId: "team-harbor", shirtNumber: 11, displayName: "Sami Okafor", position: "LW", baselinePosition: { x: 57, y: 20 } },
    { personId: "referee-01", role: "referee", displayName: "Jordan Lee" },
  ],
  events: [
    { eventId: "evt-001", sequence: 1, period: 1, clockSeconds: 0, eventType: "period_start", teamId: null, primaryActorId: null, outcome: "started", location: { x: 50, y: 50 }, synthetic: true },
    { eventId: "evt-002", sequence: 2, period: 1, clockSeconds: 300, eventType: "possession_change", teamId: "team-northbridge", primaryActorId: null, outcome: "controlled", location: { x: 45, y: 50 }, synthetic: true, description: "Northbridge settle into possession" },
    { eventId: "evt-003", sequence: 3, period: 1, clockSeconds: 332, eventType: "pass", teamId: "team-northbridge", primaryActorId: "player-nb-10", outcome: "complete", location: { x: 47, y: 49 }, synthetic: true, description: "Northbridge build through midfield" },
    { eventId: "evt-004", sequence: 4, period: 1, clockSeconds: 600, eventType: "possession_change", teamId: "team-harbor", primaryActorId: null, outcome: "controlled", location: { x: 55, y: 48 }, synthetic: true, description: "Harbor City win the second ball" },
    { eventId: "evt-005", sequence: 5, period: 1, clockSeconds: 625, eventType: "offside", teamId: "team-harbor", primaryActorId: "player-hc-09", outcome: "flagged", location: { x: 68, y: 40 }, synthetic: true, description: "Harbor City run flagged offside" },
    { eventId: "evt-006", sequence: 6, period: 1, clockSeconds: 658, eventType: "shot", teamId: "team-harbor", primaryActorId: "player-hc-09", outcome: "saved", location: { x: 72, y: 42 }, startLocation: { x: 72, y: 42 }, endLocation: { x: 94, y: 44 }, relatedEventIds: ["evt-005"], trajectory: { type: "low", points: [{ x: 72, y: 42 }, { x: 83, y: 39 }, { x: 94, y: 44 }] }, synthetic: true, description: "Theo Marsh shoots low across goal" },
    { eventId: "evt-007", sequence: 7, period: 1, clockSeconds: 900, eventType: "possession_change", teamId: "team-northbridge", primaryActorId: null, outcome: "controlled", location: { x: 40, y: 52 }, synthetic: true, description: "Northbridge regain the ball" },
    { eventId: "evt-008", sequence: 8, period: 1, clockSeconds: 1261, eventType: "corner", teamId: "team-northbridge", primaryActorId: "player-nb-10", outcome: "awarded", location: { x: 5, y: 12 }, synthetic: true, description: "Corner awarded to Northbridge" },
    { eventId: "evt-030", sequence: 9, period: 1, clockSeconds: 1865, eventType: "shot", teamId: "team-northbridge", primaryActorId: "player-nb-07", outcome: "saved", location: { x: 70, y: 22 }, startLocation: { x: 70, y: 22 }, endLocation: { x: 94, y: 44 }, relatedEventIds: ["evt-008"], shotDetail: { bodyPart: "right foot", preferredFoot: "right", preferredFootUsed: true, technique: "near-post drive", shotSpeedKmh: 79 }, synthetic: true, description: "Nico Vale drives at the near post; Shaw saves" },
    { eventId: "evt-031", sequence: 10, period: 1, clockSeconds: 2044, eventType: "shot", teamId: "team-harbor", primaryActorId: "player-hc-07", outcome: "off_target", location: { x: 70, y: 78 }, startLocation: { x: 70, y: 78 }, endLocation: { x: 95, y: 70 }, relatedEventIds: ["evt-009"], shotDetail: { bodyPart: "left foot", preferredFoot: "right", preferredFootUsed: false, technique: "bending wide-footed effort", shotSpeedKmh: 74 }, synthetic: true, description: "Jude Lane cuts inside and bends wide" },
    { eventId: "evt-009", sequence: 11, period: 1, clockSeconds: 2100, eventType: "possession_change", teamId: "team-harbor", primaryActorId: null, outcome: "controlled", location: { x: 62, y: 44 }, synthetic: true, description: "Harbor City move the ball forward" },
    { eventId: "evt-010", sequence: 12, period: 1, clockSeconds: 2530, eventType: "foul", teamId: "team-northbridge", primaryActorId: "player-nb-06", relatedActorIds: ["player-hc-11"], outcome: "free_kick_awarded", location: { x: 78, y: 31 }, restartType: "direct_free_kick", synthetic: true, description: "Foul by #6 near the right touchline" },
    { eventId: "evt-011", sequence: 13, period: 1, clockSeconds: 2584, eventType: "shot", teamId: "team-harbor", primaryActorId: "player-hc-11", outcome: "off_target", location: { x: 83, y: 35 }, startLocation: { x: 78, y: 31 }, endLocation: { x: 95, y: 28 }, relatedEventIds: ["evt-010"], trajectory: { type: "cross", points: [{ x: 78, y: 31 }, { x: 87, y: 22 }, { x: 95, y: 28 }] }, shotDetail: { bodyPart: "right foot", preferredFoot: "right", preferredFootUsed: true, technique: "curled free kick", shotSpeedKmh: 78 }, synthetic: true, description: "Sami Okafor curls the free kick across goal" },
    { eventId: "evt-012", sequence: 14, period: 1, clockSeconds: 3840, eventType: "possession_change", teamId: "team-northbridge", primaryActorId: null, outcome: "controlled", location: { x: 52, y: 49 }, synthetic: true, description: "Northbridge start a quick transition" },
    { eventId: "evt-013", sequence: 15, period: 1, clockSeconds: 4650, eventType: "pass", teamId: "team-northbridge", primaryActorId: "player-nb-08", outcome: "complete", location: { x: 66, y: 50 }, startLocation: { x: 37, y: 34 }, endLocation: { x: 66, y: 50 }, synthetic: true, description: "Tomas Gray releases Silva into the channel" },
    { eventId: "evt-014", sequence: 16, period: 1, clockSeconds: 4680, eventType: "shot", teamId: "team-northbridge", primaryActorId: "player-nb-09", outcome: "goal", location: { x: 91, y: 54 }, startLocation: { x: 66, y: 50 }, endLocation: { x: 91, y: 54 }, relatedEventIds: ["evt-013"], assisterId: "player-nb-08", trajectory: { type: "curved", points: [{ x: 66, y: 50 }, { x: 78, y: 45 }, { x: 91, y: 54 }] }, shotDetail: { bodyPart: "right foot", preferredFoot: "right", preferredFootUsed: true, technique: "curling inside-foot finish", shotSpeedKmh: 92 }, synthetic: true, description: "Quentin Qi curls into the near post" },
    { eventId: "evt-015", sequence: 17, period: 1, clockSeconds: 4681, eventType: "goal", teamId: "team-northbridge", primaryActorId: "player-nb-09", outcome: "scored", location: { x: 91, y: 54 }, relatedEventIds: ["evt-014"], assisterId: "player-nb-08", celebration: { name: "The Compass", description: "Quentin points both hands toward the centre circle, then slides on his knees toward the Northbridge bench." }, synthetic: true, description: "Goal! Quentin Qi puts Northbridge ahead" },
    { eventId: "evt-019", sequence: 18, period: 2, clockSeconds: 4890, eventType: "shot", teamId: "team-harbor", primaryActorId: "player-hc-09", outcome: "goal", location: { x: 88, y: 48 }, startLocation: { x: 73, y: 49 }, endLocation: { x: 94, y: 48 }, relatedEventIds: ["evt-015"], assisterId: "player-hc-10", trajectory: { type: "low", points: [{ x: 73, y: 49 }, { x: 84, y: 47 }, { x: 94, y: 48 }] }, shotDetail: { bodyPart: "right foot", preferredFoot: "right", preferredFootUsed: true, technique: "low driven strike", shotSpeedKmh: 88 }, synthetic: true, description: "Theo Marsh finishes Harbor's late response" },
    { eventId: "evt-020", sequence: 19, period: 2, clockSeconds: 4891, eventType: "goal", teamId: "team-harbor", primaryActorId: "player-hc-09", outcome: "scored", location: { x: 94, y: 48 }, relatedEventIds: ["evt-019"], assisterId: "player-hc-10", celebration: { name: "The Harbor Salute", description: "Marsh cups his hands toward the Harbor supporters and points to Grant." }, synthetic: true, description: "Goal! Harbor City refuse to go quietly" },
    { eventId: "evt-021", sequence: 20, period: 2, clockSeconds: 5110, eventType: "pass", teamId: "team-northbridge", primaryActorId: "player-nb-08", relatedActorIds: ["player-nb-09"], outcome: "complete", location: { x: 76, y: 55 }, startLocation: { x: 55, y: 34 }, endLocation: { x: 76, y: 55 }, synthetic: true, description: "Gray finds Quentin Qi between two retreating defenders" },
    { eventId: "evt-022", sequence: 21, period: 2, clockSeconds: 5122, eventType: "shot", teamId: "team-northbridge", primaryActorId: "player-nb-09", outcome: "goal", location: { x: 95, y: 57 }, startLocation: { x: 76, y: 55 }, endLocation: { x: 95, y: 57 }, relatedEventIds: ["evt-021"], assisterId: "player-nb-08", trajectory: { type: "curved", points: [{ x: 76, y: 55 }, { x: 85, y: 50 }, { x: 95, y: 57 }] }, shotDetail: { bodyPart: "left foot", preferredFoot: "right", preferredFootUsed: false, technique: "first-time curled finish", shotSpeedKmh: 86 }, synthetic: true, description: "Quentin Qi bends a second finish beyond Shaw" },
    { eventId: "evt-023", sequence: 22, period: 2, clockSeconds: 5123, eventType: "goal", teamId: "team-northbridge", primaryActorId: "player-nb-09", outcome: "scored", location: { x: 95, y: 57 }, relatedEventIds: ["evt-022"], assisterId: "player-nb-08", celebration: { name: "The Calm", description: "Quentin raises one finger, exhales, and bows toward the travelling Northbridge supporters." }, synthetic: true, description: "Goal! Quentin Qi restores Northbridge's lead" },
    { eventId: "evt-024", sequence: 23, period: 2, clockSeconds: 5270, eventType: "shot", teamId: "team-harbor", primaryActorId: "player-hc-10", outcome: "goal", location: { x: 91, y: 38 }, startLocation: { x: 75, y: 44 }, endLocation: { x: 94, y: 38 }, relatedEventIds: ["evt-023"], assisterId: "player-hc-11", trajectory: { type: "curved", points: [{ x: 75, y: 44 }, { x: 84, y: 35 }, { x: 94, y: 38 }] }, shotDetail: { bodyPart: "left foot", preferredFoot: "left", preferredFootUsed: true, technique: "curling instep strike", shotSpeedKmh: 84 }, synthetic: true, description: "Leo Grant curls Harbor level again from the edge" },
    { eventId: "evt-025", sequence: 24, period: 2, clockSeconds: 5271, eventType: "goal", teamId: "team-harbor", primaryActorId: "player-hc-10", outcome: "scored", location: { x: 94, y: 38 }, relatedEventIds: ["evt-024"], assisterId: "player-hc-11", celebration: { name: "The Turn", description: "Grant spins away with both arms wide before being engulfed by the Harbor bench." }, synthetic: true, description: "Goal! Harbor City make it a grand-final finish" },
    { eventId: "evt-026", sequence: 25, period: 2, clockSeconds: 5375, eventType: "pass", teamId: "team-northbridge", primaryActorId: "player-nb-07", relatedActorIds: ["player-nb-09"], outcome: "complete", location: { x: 84, y: 64 }, startLocation: { x: 62, y: 20 }, endLocation: { x: 84, y: 64 }, synthetic: true, description: "Vale cuts back for Quentin Qi in stoppage-time space" },
    { eventId: "evt-027", sequence: 26, period: 2, clockSeconds: 5388, eventType: "shot", teamId: "team-northbridge", primaryActorId: "player-nb-09", outcome: "goal", location: { x: 95, y: 62 }, startLocation: { x: 84, y: 64 }, endLocation: { x: 95, y: 62 }, relatedEventIds: ["evt-026"], assisterId: "player-nb-07", trajectory: { type: "low", points: [{ x: 84, y: 64 }, { x: 90, y: 61 }, { x: 95, y: 62 }] }, shotDetail: { bodyPart: "right foot", preferredFoot: "right", preferredFootUsed: true, technique: "first-time low finish", shotSpeedKmh: 97 }, synthetic: true, description: "Quentin Qi completes his hat-trick in stoppage time" },
    { eventId: "evt-028", sequence: 27, period: 2, clockSeconds: 5389, eventType: "goal", teamId: "team-northbridge", primaryActorId: "player-nb-09", outcome: "scored", location: { x: 95, y: 62 }, relatedEventIds: ["evt-027"], assisterId: "player-nb-07", celebration: { name: "The Crown", description: "Quentin slides on his knees, taps the Northbridge crest, and is lifted by Vale and Gray." }, synthetic: true, description: "Goal! Quentin Qi wins the cup for Northbridge" },
    { eventId: "evt-029", sequence: 28, period: 2, clockSeconds: 5400, eventType: "period_end", teamId: null, primaryActorId: null, outcome: "ended", location: { x: 50, y: 50 }, synthetic: true, description: "Full time · Northbridge United win 3-2" },
  ],
  positionSamples: [
    { clockSeconds: 0, entityId: "player-nb-01", x: 6, y: 50 },
    { clockSeconds: 0, entityId: "player-nb-02", x: 20, y: 18 },
    { clockSeconds: 0, entityId: "player-nb-03", x: 20, y: 82 },
    { clockSeconds: 0, entityId: "player-nb-04", x: 17, y: 40 },
    { clockSeconds: 0, entityId: "player-nb-05", x: 17, y: 60 },
    { clockSeconds: 0, entityId: "player-nb-06", x: 30, y: 50 },
    { clockSeconds: 0, entityId: "player-nb-07", x: 42, y: 18 },
    { clockSeconds: 0, entityId: "player-nb-08", x: 37, y: 34 },
    { clockSeconds: 0, entityId: "player-nb-09", x: 45, y: 50 },
    { clockSeconds: 0, entityId: "player-nb-10", x: 37, y: 66 },
    { clockSeconds: 0, entityId: "player-nb-11", x: 42, y: 82 },
    { clockSeconds: 0, entityId: "player-hc-01", x: 94, y: 50 },
    { clockSeconds: 0, entityId: "player-hc-02", x: 80, y: 82 },
    { clockSeconds: 0, entityId: "player-hc-03", x: 80, y: 18 },
    { clockSeconds: 0, entityId: "player-hc-04", x: 83, y: 60 },
    { clockSeconds: 0, entityId: "player-hc-05", x: 83, y: 40 },
    { clockSeconds: 0, entityId: "player-hc-06", x: 70, y: 50 },
    { clockSeconds: 0, entityId: "player-hc-07", x: 58, y: 82 },
    { clockSeconds: 0, entityId: "player-hc-08", x: 63, y: 66 },
    { clockSeconds: 0, entityId: "player-hc-09", x: 55, y: 50 },
    { clockSeconds: 0, entityId: "player-hc-10", x: 63, y: 34 },
    { clockSeconds: 0, entityId: "player-hc-11", x: 58, y: 18 },
    { clockSeconds: 2518, entityId: "ball", x: 75, y: 29 },
    { clockSeconds: 2526, entityId: "player-nb-06", x: 77, y: 30 },
    { clockSeconds: 2530, entityId: "ball", x: 78, y: 31 },
    { clockSeconds: 2530, entityId: "player-nb-06", x: 78, y: 31 },
    { clockSeconds: 2530, entityId: "player-hc-11", x: 80, y: 29 },
    { clockSeconds: 2530, entityId: "referee-01", x: 65, y: 39 },
    { clockSeconds: 2538, entityId: "ball", x: 79, y: 31 },
    { clockSeconds: 1865, entityId: "ball", x: 70, y: 22 },
    { clockSeconds: 1865, entityId: "player-nb-07", x: 70, y: 22 },
    { clockSeconds: 1865, entityId: "player-hc-01", x: 94, y: 44 },
    { clockSeconds: 2044, entityId: "ball", x: 70, y: 78 },
    { clockSeconds: 4650, entityId: "ball", x: 66, y: 50 },
    { clockSeconds: 4680, entityId: "ball", x: 91, y: 54 },
    { clockSeconds: 4890, entityId: "ball", x: 94, y: 48 },
    { clockSeconds: 5122, entityId: "ball", x: 95, y: 57 },
    { clockSeconds: 5270, entityId: "ball", x: 94, y: 38 },
    { clockSeconds: 5388, entityId: "ball", x: 95, y: 62 },
  ],
};

scenario.events.push(
  { eventId: "evt-032", period: 1, clockSeconds: 420, eventType: "pass", teamId: "team-northbridge", primaryActorId: "player-nb-04", relatedActorIds: ["player-nb-01"], outcome: "complete", location: { x: 12, y: 43 }, startLocation: { x: 17, y: 40 }, endLocation: { x: 6, y: 50 }, synthetic: true, description: "Owen Price recycles to Ward under the first press" },
  { eventId: "evt-033", period: 1, clockSeconds: 512, eventType: "pass", teamId: "team-northbridge", primaryActorId: "player-nb-01", relatedActorIds: ["player-nb-02"], outcome: "complete", location: { x: 18, y: 28 }, startLocation: { x: 6, y: 50 }, endLocation: { x: 20, y: 18 }, synthetic: true, description: "Ward rolls to Bell to escape the front three" },
  { eventId: "evt-034", period: 1, clockSeconds: 620, eventType: "carry", teamId: "team-northbridge", primaryActorId: "player-nb-02", outcome: "progressed", location: { x: 29, y: 20 }, startLocation: { x: 20, y: 18 }, endLocation: { x: 29, y: 20 }, synthetic: true, description: "Bell carries beyond Okafor's first pressure" },
  { eventId: "evt-035", period: 1, clockSeconds: 742, eventType: "interception", teamId: "team-harbor", primaryActorId: "player-hc-03", relatedActorIds: ["player-nb-02"], outcome: "won", location: { x: 64, y: 26 }, synthetic: true, description: "Brooks steps in front of Bell's forward pass" },
  { eventId: "evt-036", period: 1, clockSeconds: 1010, eventType: "pass", teamId: "team-harbor", primaryActorId: "player-hc-03", relatedActorIds: ["player-hc-11"], outcome: "complete", location: { x: 58, y: 25 }, startLocation: { x: 64, y: 26 }, endLocation: { x: 58, y: 20 }, synthetic: true, description: "Brooks releases Okafor down the left" },
  { eventId: "evt-037", period: 1, clockSeconds: 1124, eventType: "carry", teamId: "team-harbor", primaryActorId: "player-hc-11", outcome: "progressed", location: { x: 66, y: 28 }, startLocation: { x: 58, y: 20 }, endLocation: { x: 66, y: 28 }, synthetic: true, description: "Okafor drives into the left channel" },
  { eventId: "evt-038", period: 1, clockSeconds: 1180, eventType: "pass", teamId: "team-harbor", primaryActorId: "player-hc-11", relatedActorIds: ["player-hc-10"], outcome: "complete", location: { x: 72, y: 39 }, startLocation: { x: 66, y: 28 }, endLocation: { x: 72, y: 39 }, synthetic: true, description: "Okafor cuts back for Grant at the edge of the box" },
  { eventId: "evt-039", period: 1, clockSeconds: 1750, eventType: "tackle", teamId: "team-northbridge", primaryActorId: "player-nb-06", relatedActorIds: ["player-hc-10"], outcome: "clean", location: { x: 51, y: 48 }, synthetic: true, description: "Hart times a clean tackle on Grant" },
  { eventId: "evt-040", period: 1, clockSeconds: 2220, eventType: "pass", teamId: "team-northbridge", primaryActorId: "player-nb-08", relatedActorIds: ["player-nb-10"], outcome: "complete", location: { x: 52, y: 55 }, startLocation: { x: 37, y: 34 }, endLocation: { x: 52, y: 55 }, synthetic: true, description: "Gray finds Silva between Harbor's lines" },
  { eventId: "evt-041", period: 1, clockSeconds: 2290, eventType: "carry", teamId: "team-northbridge", primaryActorId: "player-nb-10", outcome: "progressed", location: { x: 61, y: 55 }, startLocation: { x: 52, y: 55 }, endLocation: { x: 61, y: 55 }, synthetic: true, description: "Silva carries inside before releasing King wide" },
  { eventId: "evt-042", period: 1, clockSeconds: 2385, eventType: "cross", teamId: "team-northbridge", primaryActorId: "player-nb-11", relatedActorIds: ["player-nb-09"], outcome: "blocked", location: { x: 73, y: 71 }, startLocation: { x: 61, y: 80 }, endLocation: { x: 73, y: 71 }, synthetic: true, description: "King's early cross is blocked by Holt" },
  { eventId: "evt-043", period: 1, clockSeconds: 2760, eventType: "pass", teamId: "team-harbor", primaryActorId: "player-hc-10", relatedActorIds: ["player-hc-09"], outcome: "complete", location: { x: 68, y: 42 }, startLocation: { x: 63, y: 34 }, endLocation: { x: 68, y: 42 }, synthetic: true, description: "Grant slips Marsh into the channel after the free kick" },
  { eventId: "evt-044", period: 1, clockSeconds: 2825, eventType: "shot", teamId: "team-harbor", primaryActorId: "player-hc-09", outcome: "off_target", location: { x: 78, y: 43 }, startLocation: { x: 78, y: 43 }, endLocation: { x: 96, y: 36 }, relatedEventIds: ["evt-043"], shotDetail: { bodyPart: "head", preferredFoot: "right", preferredFootUsed: false, technique: "contested glancing header", shotSpeedKmh: 61 }, synthetic: true, description: "Marsh glances the free-kick header wide" },
  { eventId: "evt-045", period: 2, clockSeconds: 2910, eventType: "substitution", teamId: "team-harbor", primaryActorId: "player-hc-07", relatedActorIds: ["player-hc-02"], outcome: "replaced", location: { x: 8, y: 8 }, synthetic: true, description: "Harbor replace Lane with Fox to add pace on the right" },
  { eventId: "evt-046", period: 2, clockSeconds: 3015, eventType: "pass", teamId: "team-harbor", primaryActorId: "player-hc-02", relatedActorIds: ["player-hc-09"], outcome: "complete", location: { x: 67, y: 61 }, startLocation: { x: 80, y: 82 }, endLocation: { x: 67, y: 61 }, synthetic: true, description: "Fox finds Marsh after the halftime adjustment" },
  { eventId: "evt-047", period: 2, clockSeconds: 3120, eventType: "corner", teamId: "team-harbor", primaryActorId: "player-hc-11", outcome: "awarded", location: { x: 95, y: 18 }, synthetic: true, description: "Corner awarded to Harbor after Cole blocks the cross" },
  { eventId: "evt-048", period: 2, clockSeconds: 3150, eventType: "shot", teamId: "team-harbor", primaryActorId: "player-hc-08", outcome: "saved", location: { x: 84, y: 48 }, startLocation: { x: 84, y: 48 }, endLocation: { x: 6, y: 50 }, relatedEventIds: ["evt-047"], shotDetail: { bodyPart: "right foot", preferredFoot: "right", preferredFootUsed: true, technique: "first-time corner volley", shotSpeedKmh: 82 }, synthetic: true, description: "Bell meets the corner first time; Ward saves" },
  { eventId: "evt-049", period: 2, clockSeconds: 3260, eventType: "carry", teamId: "team-northbridge", primaryActorId: "player-nb-11", relatedActorIds: ["player-hc-02"], outcome: "progressed", location: { x: 68, y: 72 }, startLocation: { x: 48, y: 80 }, endLocation: { x: 68, y: 72 }, synthetic: true, description: "King beats Fox and cuts inside" },
  { eventId: "evt-050", period: 2, clockSeconds: 3330, eventType: "shot", teamId: "team-northbridge", primaryActorId: "player-nb-11", outcome: "saved", location: { x: 76, y: 61 }, startLocation: { x: 76, y: 61 }, endLocation: { x: 94, y: 52 }, relatedEventIds: ["evt-049"], shotDetail: { bodyPart: "left foot", preferredFoot: "left", preferredFootUsed: true, technique: "far-corner placed shot", shotSpeedKmh: 76 }, synthetic: true, description: "King bends toward the far corner; Shaw saves" },
  { eventId: "evt-051", period: 2, clockSeconds: 3550, eventType: "interception", teamId: "team-northbridge", primaryActorId: "player-nb-06", relatedActorIds: ["player-hc-10"], outcome: "won", location: { x: 57, y: 45 }, synthetic: true, description: "Hart reads Grant's pass toward Marsh" },
  { eventId: "evt-052", period: 2, clockSeconds: 3620, eventType: "pass", teamId: "team-northbridge", primaryActorId: "player-nb-06", relatedActorIds: ["player-nb-08"], outcome: "complete", location: { x: 62, y: 43 }, startLocation: { x: 57, y: 45 }, endLocation: { x: 62, y: 43 }, synthetic: true, description: "Hart carries beyond the first line and finds Gray" },
  { eventId: "evt-053", period: 2, clockSeconds: 3740, eventType: "cross", teamId: "team-northbridge", primaryActorId: "player-nb-02", relatedActorIds: ["player-nb-09"], outcome: "blocked", location: { x: 71, y: 24 }, startLocation: { x: 63, y: 20 }, endLocation: { x: 71, y: 24 }, synthetic: true, description: "Bell's cross is blocked by Brooks" },
  { eventId: "evt-054", period: 2, clockSeconds: 3820, eventType: "corner", teamId: "team-northbridge", primaryActorId: "player-nb-10", outcome: "awarded", location: { x: 5, y: 82 }, synthetic: true, description: "Corner awarded to Northbridge after the blocked cross" },
  { eventId: "evt-055", period: 2, clockSeconds: 4275, eventType: "shot", teamId: "team-harbor", primaryActorId: "player-hc-11", outcome: "off_target", location: { x: 76, y: 26 }, startLocation: { x: 76, y: 26 }, endLocation: { x: 94, y: 19 }, relatedEventIds: ["evt-054"], shotDetail: { bodyPart: "left foot", preferredFoot: "left", preferredFootUsed: true, technique: "bending far-post effort", shotSpeedKmh: 81 }, synthetic: true, description: "Okafor cuts inside and curls just wide" },
  { eventId: "evt-056", period: 2, clockSeconds: 4410, eventType: "yellow_card", teamId: "team-harbor", primaryActorId: "player-hc-06", outcome: "caution", location: { x: 47, y: 50 }, synthetic: true, description: "Lowe stops Vale's counter and is booked" },
);

const matchPhases = [
  [0, "opening structure", "Northbridge circulate from the back while Harbor hold a compact mid-block."],
  [10, "first pressure cycle", "Harbor press higher and both teams attack the spaces behind the full-backs."],
  [25, "territory exchange", "Northbridge use width; Harbor threaten from second balls and set pieces."],
  [40, "hero-foul pressure", "The match becomes more physical around the right touchline and restart zones."],
  [45, "halftime adjustment", "Harbor raise the full-backs and Northbridge prepare a quicker transition."],
  [60, "transition battle", "Both sides trade counters, with goalkeepers tested after turnovers."],
  [75, "final pressure", "Northbridge find Quentin between the lines while Harbor commit runners forward."],
  [85, "stoppage-time risk", "The score is level again; both teams attack with reduced defensive cover."],
];
const phaseAtMinute = (minute) => {
  let selected = matchPhases[0];
  for (const phase of matchPhases) if (minute >= phase[0]) selected = phase;
  return selected;
};
const teamLabel = (teamId) => teamId === scenario.match.homeTeamId ? "Northbridge" : "Harbor City";
for (let minute = 0; minute <= 90; minute += 1) {
  const clockSeconds = minute * 60;
  const priorGoals = scenario.events.filter((event) => event.eventType === "goal" && event.clockSeconds <= clockSeconds);
  const score = [
    priorGoals.filter((event) => event.teamId === scenario.match.homeTeamId).length,
    priorGoals.filter((event) => event.teamId === scenario.match.awayTeamId).length,
  ];
  const possessionTeamId = minute < 10 || minute % 4 < 2
    ? scenario.match.homeTeamId
    : scenario.match.awayTeamId;
  const phase = phaseAtMinute(minute);
  scenario.events.push({
    eventId: `minute-${String(minute).padStart(2, "0")}`,
    period: minute < 45 ? 1 : 2,
    clockSeconds,
    eventType: "match_state",
    teamId: null,
    primaryActorId: null,
    outcome: "observed",
    location: { x: 50, y: 50 },
    synthetic: true,
    description: `${String(minute).padStart(2, "0")}:00 state · ${phase[1]}`,
    actionDetail: {
      action: "match_state",
      phase: phase[1],
      possession: teamLabel(possessionTeamId),
      scoreSnapshot: `${score[0]}-${score[1]}`,
      outcomeDetail: phase[2],
    },
  });
}

scenario.events.sort((left, right) => left.clockSeconds - right.clockSeconds || left.eventId.localeCompare(right.eventId));
scenario.events.forEach((event, index) => { event.sequence = index + 1; });

const playerPreferredFeet = {
  "player-nb-01": "right", "player-nb-02": "right", "player-nb-03": "left",
  "player-nb-04": "right", "player-nb-05": "left", "player-nb-06": "right",
  "player-nb-07": "right", "player-nb-08": "left", "player-nb-09": "right",
  "player-nb-10": "right", "player-nb-11": "left",
  "player-hc-01": "right", "player-hc-02": "right", "player-hc-03": "left",
  "player-hc-04": "right", "player-hc-05": "left", "player-hc-06": "right",
  "player-hc-07": "right", "player-hc-08": "right", "player-hc-09": "right",
  "player-hc-10": "left", "player-hc-11": "left",
};

scenario.people.forEach((person) => {
  if (person.role === "player") person.preferredFoot = playerPreferredFeet[person.personId];
});

const authoredActionDetails = {
  "evt-002": { action: "settle", phase: "build-up", participants: ["team-northbridge"], decision: "Northbridge slow the tempo and create a safe passing angle.", outcomeDetail: "controlled possession" },
  "evt-003": { action: "pass", passerId: "player-nb-10", receiverId: "player-nb-08", bodyPart: "right foot", technique: "firm inside-foot pass", outcomeDetail: "completed between the lines" },
  "evt-004": { action: "regain", phase: "second ball", participants: ["team-harbor"], decision: "Harbor step into the loose ball instead of retreating.", outcomeDetail: "Harbor possession" },
  "evt-005": { action: "run", runnerId: "player-hc-09", decision: "Marsh attacks the shoulder before the pass is released.", outcomeDetail: "offside; attack stopped" },
  "evt-006": { action: "shot", shooterId: "player-hc-09", goalkeeperId: "player-nb-01", bodyPart: "right foot", technique: "low across-goal strike", outcomeDetail: "Ward gets down and saves to his right" },
  "evt-007": { action: "regain", phase: "transition", participants: ["team-northbridge"], decision: "Northbridge counter-press after losing the ball.", outcomeDetail: "possession recovered" },
  "evt-008": { action: "corner", takerId: "player-nb-10", targetId: "player-nb-11", delivery: "inswinging", bodyPart: "right foot", outcomeDetail: "corner awarded; attack loads the near zone" },
  "evt-009": { action: "progression", phase: "counterattack", participants: ["team-harbor"], decision: "Harbor move forward before Northbridge can reset.", outcomeDetail: "territory gained" },
  "evt-010": { action: "foul", foulerId: "player-nb-06", fouledPlayerId: "player-hc-11", decision: "Hart arrives late while Okafor receives wide.", outcomeDetail: "direct free kick to Harbor" },
  "evt-030": { action: "shot", shooterId: "player-nb-07", goalkeeperId: "player-hc-01", bodyPart: "right foot", technique: "near-post drive", outcomeDetail: "Shaw saves low at the near post" },
  "evt-031": { action: "shot", shooterId: "player-hc-07", goalkeeperId: "player-nb-01", bodyPart: "left foot", technique: "bending wide-footed effort", outcomeDetail: "shot misses the far post" },
  "evt-012": { action: "transition", phase: "counter-press", participants: ["team-northbridge"], decision: "Northbridge attack immediately after the regain.", outcomeDetail: "forward possession" },
  "evt-013": { action: "pass", passerId: "player-nb-08", receiverId: "player-nb-10", bodyPart: "left foot", technique: "diagonal split pass", outcomeDetail: "Silva receives in the channel" },
  "evt-014": { action: "shot", shooterId: "player-nb-09", goalkeeperId: "player-hc-01", bodyPart: "right foot", technique: "curling inside-foot finish", outcomeDetail: "shot beats Shaw at the near post" },
  "evt-015": { action: "goal", scorerId: "player-nb-09", assistId: "player-nb-08", outcomeDetail: "Northbridge lead 1-0" },
  "evt-019": { action: "shot", shooterId: "player-hc-09", goalkeeperId: "player-nb-01", bodyPart: "right foot", technique: "low driven strike", outcomeDetail: "shot crosses Ward before he can set" },
  "evt-020": { action: "goal", scorerId: "player-hc-09", assistId: "player-hc-10", outcomeDetail: "Harbor equalize 1-1" },
  "evt-021": { action: "pass", passerId: "player-nb-08", receiverId: "player-nb-09", bodyPart: "left foot", technique: "threaded through pass", outcomeDetail: "Quentin receives between two defenders" },
  "evt-022": { action: "shot", shooterId: "player-nb-09", goalkeeperId: "player-hc-01", bodyPart: "left foot", technique: "first-time curled finish", outcomeDetail: "weak-foot finish bends beyond Shaw" },
  "evt-023": { action: "goal", scorerId: "player-nb-09", assistId: "player-nb-08", outcomeDetail: "Northbridge lead 2-1" },
  "evt-024": { action: "shot", shooterId: "player-hc-10", goalkeeperId: "player-nb-01", bodyPart: "left foot", technique: "curling instep strike", outcomeDetail: "Grant finds the far corner" },
  "evt-025": { action: "goal", scorerId: "player-hc-10", assistId: "player-hc-11", outcomeDetail: "Harbor equalize 2-2" },
  "evt-026": { action: "pass", passerId: "player-nb-07", receiverId: "player-nb-09", bodyPart: "right foot", technique: "low cutback", outcomeDetail: "Quentin attacks the penalty spot in stoppage time" },
  "evt-027": { action: "shot", shooterId: "player-nb-09", goalkeeperId: "player-hc-01", bodyPart: "right foot", technique: "first-time low finish", outcomeDetail: "winner flashes inside the far post" },
  "evt-028": { action: "goal", scorerId: "player-nb-09", assistId: "player-nb-07", outcomeDetail: "Northbridge win 3-2; Quentin completes his hat-trick" },
  "evt-029": { action: "full_time", outcomeDetail: "Northbridge United win the Synthetic Cup final 3-2" },
};

scenario.events.forEach((event) => {
  if (authoredActionDetails[event.eventId]) event.actionDetail = authoredActionDetails[event.eventId];
  if (!event.actionDetail) {
    const detail = { action: event.eventType, outcomeDetail: event.description || event.outcome.replaceAll("_", " ") };
    if (event.eventType === "pass" || event.eventType === "cross") {
      detail.passerId = event.primaryActorId;
      detail.receiverId = event.relatedActorIds?.[0];
      detail.technique = event.eventType === "cross" ? "cross into the attacking lane" : "progressive pass";
    }
    if (event.eventType === "carry") detail.carrierId = event.primaryActorId;
    if (event.eventType === "shot") {
      detail.shooterId = event.primaryActorId;
      detail.goalkeeperId = event.teamId === scenario.match.homeTeamId ? "player-hc-01" : "player-nb-01";
      detail.technique = event.shotDetail?.technique || "open-play attempt";
    }
    if (event.eventType === "corner") detail.takerId = event.primaryActorId;
    if (event.eventType === "tackle" || event.eventType === "interception") detail.defenderId = event.primaryActorId;
    if (event.eventType === "foul" || event.eventType === "yellow_card") detail.foulerId = event.primaryActorId;
    event.actionDetail = detail;
  }
});

scenario.demoWindow = {
  startSeconds: 4560,
  endSeconds: 5160,
  fidelity: "authored_action_chain",
  sequences: [
    {
      sequenceId: "demo-nb-first-goal",
      startSeconds: 4560,
      endSeconds: 4681,
      teamId: "team-northbridge",
      label: "Northbridge overload the right half-space",
      actions: [
        { actionId: "demo-7600", startSeconds: 4560, endSeconds: 4592, type: "receive", actorId: "player-nb-08", supportIds: ["player-nb-10", "player-nb-07"], pressureIds: ["player-hc-06", "player-hc-10"], ballStart: { x: 51, y: 48 }, ballEnd: { x: 58, y: 42 } },
        { actionId: "demo-7632", startSeconds: 4592, endSeconds: 4620, type: "carry", actorId: "player-nb-10", supportIds: ["player-nb-08", "player-nb-07"], pressureIds: ["player-hc-06", "player-hc-08"], ballStart: { x: 58, y: 42 }, ballEnd: { x: 64, y: 48 } },
        { actionId: "demo-7700", startSeconds: 4620, endSeconds: 4650, type: "pass", actorId: "player-nb-10", receiverId: "player-nb-09", supportIds: ["player-nb-08", "player-nb-07"], pressureIds: ["player-hc-06", "player-hc-04"], ballStart: { x: 64, y: 48 }, ballEnd: { x: 72, y: 50 } },
        { actionId: "demo-7720", startSeconds: 4650, endSeconds: 4680, type: "run_and_receive", actorId: "player-nb-09", supportIds: ["player-nb-07", "player-nb-10"], pressureIds: ["player-hc-04", "player-hc-05"], ballStart: { x: 72, y: 50 }, ballEnd: { x: 82, y: 53 } },
        { actionId: "demo-7800", startSeconds: 4680, endSeconds: 4681, type: "shot", actorId: "player-nb-09", receiverId: "player-hc-01", supportIds: ["player-nb-07", "player-nb-10"], pressureIds: ["player-hc-04", "player-hc-05"], ballStart: { x: 82, y: 53 }, ballEnd: { x: 91, y: 54 } },
      ],
    },
    {
      sequenceId: "demo-harbor-equalizer",
      startSeconds: 4682,
      endSeconds: 4891,
      teamId: "team-harbor",
      label: "Harbor raise the press after conceding",
      actions: [
        { actionId: "demo-7802", startSeconds: 4682, endSeconds: 4740, type: "kickoff", actorId: "player-hc-08", supportIds: ["player-hc-10", "player-hc-07"], pressureIds: ["player-nb-06", "player-nb-08"], ballStart: { x: 50, y: 50 }, ballEnd: { x: 60, y: 49 } },
        { actionId: "demo-7900", startSeconds: 4740, endSeconds: 4810, type: "progression", actorId: "player-hc-10", supportIds: ["player-hc-11", "player-hc-09"], pressureIds: ["player-nb-06", "player-nb-10"], ballStart: { x: 60, y: 49 }, ballEnd: { x: 73, y: 49 } },
        { actionId: "demo-8010", startSeconds: 4810, endSeconds: 4890, type: "pass_and_run", actorId: "player-hc-10", receiverId: "player-hc-09", supportIds: ["player-hc-11", "player-hc-07"], pressureIds: ["player-nb-04", "player-nb-05"], ballStart: { x: 73, y: 49 }, ballEnd: { x: 88, y: 48 } },
        { actionId: "demo-8130", startSeconds: 4890, endSeconds: 4891, type: "shot", actorId: "player-hc-09", receiverId: "player-nb-01", supportIds: ["player-hc-10", "player-hc-11"], pressureIds: ["player-nb-04", "player-nb-05"], ballStart: { x: 73, y: 49 }, ballEnd: { x: 94, y: 48 } },
      ],
    },
    {
      sequenceId: "demo-nb-second-goal",
      startSeconds: 4892,
      endSeconds: 5123,
      teamId: "team-northbridge",
      label: "Northbridge exploit the space behind Harbor's high line",
      actions: [
        { actionId: "demo-8132", startSeconds: 4892, endSeconds: 4970, type: "kickoff", actorId: "player-nb-08", supportIds: ["player-nb-06", "player-nb-10"], pressureIds: ["player-hc-06", "player-hc-10"], ballStart: { x: 50, y: 50 }, ballEnd: { x: 59, y: 45 } },
        { actionId: "demo-8250", startSeconds: 4970, endSeconds: 5050, type: "supporting_run", actorId: "player-nb-09", supportIds: ["player-nb-07", "player-nb-08"], pressureIds: ["player-hc-04", "player-hc-05"], ballStart: { x: 59, y: 45 }, ballEnd: { x: 76, y: 55 } },
        { actionId: "demo-8310", startSeconds: 5050, endSeconds: 5110, type: "pass", actorId: "player-nb-08", receiverId: "player-nb-09", supportIds: ["player-nb-07", "player-nb-10"], pressureIds: ["player-hc-04", "player-hc-05"], ballStart: { x: 55, y: 34 }, ballEnd: { x: 76, y: 55 } },
        { actionId: "demo-8522", startSeconds: 5110, endSeconds: 5122, type: "run_and_shot", actorId: "player-nb-09", receiverId: "player-hc-01", supportIds: ["player-nb-07", "player-nb-08"], pressureIds: ["player-hc-04", "player-hc-05"], ballStart: { x: 76, y: 55 }, ballEnd: { x: 95, y: 57 } },
        { actionId: "demo-8523", startSeconds: 5122, endSeconds: 5123, type: "goal", actorId: "player-nb-09", supportIds: ["player-nb-07", "player-nb-08"], pressureIds: ["player-hc-04", "player-hc-05"], ballStart: { x: 95, y: 57 }, ballEnd: { x: 95, y: 57 } },
      ],
    },
  ],
};

const trackingRoleOffsets = {
  GK: { x: 0, y: 0 },
  RB: { x: 10, y: -16 },
  LB: { x: 10, y: 16 },
  CB: { x: 7, y: -7 },
  DM: { x: 17, y: 0 },
  CM: { x: 24, y: -9 },
  RW: { x: 34, y: -18 },
  LW: { x: 34, y: 18 },
  ST: { x: 39, y: 0 },
};

const trackingPhase = (seconds) => {
  if (seconds < 600) return "opening_structure";
  if (seconds < 1500) return "first_pressure_cycle";
  if (seconds < 2400) return "territory_exchange";
  if (seconds < 2700) return "hero_foul";
  if (seconds < 3900) return "second_half_adjustment";
  if (seconds < 4680) return "end_to_end";
  if (seconds < 5100) return "decisive_transition";
  return "closing_management";
};

const authoredActionAt = (seconds) => scenario.events
  .filter((event) => !["match_state", "period_start", "period_end"].includes(event.eventType))
  .map((event) => ({ event, distance: Math.abs(event.clockSeconds - seconds) }))
  .sort((left, right) => left.distance - right.distance)[0];

const demoActionAt = (seconds) => scenario.demoWindow.sequences
  .flatMap((sequence) => sequence.actions)
  .find((action) => seconds >= action.startSeconds && seconds < action.endSeconds);

const demoActionParticipant = (action, personId) => {
  if (!action) return null;
  if (action.actorId === personId) return action.type === "shot" || action.type === "run_and_shot" || action.type === "goal" ? "finishing" : action.type;
  if (action.receiverId === personId) return "receiving";
  if ((action.supportIds || []).includes(personId)) return "supporting";
  if ((action.pressureIds || []).includes(personId)) return "pressing";
  return null;
};

const demoPossessionOwner = (action, progress) => {
  if (!action || ["shot", "run_and_shot", "goal"].includes(action.type)) return null;
  if (action.receiverId && ["pass", "pass_and_run"].includes(action.type) && progress >= 0.85) return action.receiverId;
  return action.actorId || action.receiverId || null;
};

const demoActionAnchors = new Map();
for (const person of scenario.people.filter((item) => item.role === "player")) {
  let current = { ...(person.baselinePosition || { x: 50, y: 50 }) };
  const anchors = new Map();
  for (const action of scenario.demoWindow.sequences[0].actions) {
    const participantAction = demoActionParticipant(action, person.personId);
    if (!participantAction) {
      anchors.set(action.actionId, { start: { ...current }, end: { ...current } });
      continue;
    }
    const target = action.receiverId === person.personId
      || (action.actorId === person.personId && ["receive", "run_and_receive", "supporting_run", "run_and_shot"].includes(action.type))
      ? action.ballEnd
      : action.actorId === person.personId && ["pass", "pass_and_run"].includes(action.type)
        ? action.ballStart
        : action.ballEnd;
    const movementStrength = participantAction === "receiving" || participantAction === "pass" ? 0.78 : 0.62;
    const roleShift = participantAction === "pressing"
      ? (person.teamId === scenario.match.homeTeamId ? 3 : -3)
      : participantAction === "supporting"
        ? (person.teamId === scenario.match.homeTeamId ? 2 : -2)
        : 0;
    const end = {
      x: current.x + ((target?.x || current.x) - current.x) * movementStrength + roleShift,
      y: current.y + ((target?.y || current.y) - current.y) * movementStrength + (participantAction === "supporting" ? (person.teamId === scenario.match.homeTeamId ? -3 : 3) : 0),
    };
    anchors.set(action.actionId, { start: current, end });
    current = end;
  }
  demoActionAnchors.set(person.personId, anchors);
}

const interpolatePoint = (start, end, progress) => ({
  x: start.x + (end.x - start.x) * progress,
  y: start.y + (end.y - start.y) * progress,
});

const trackingPosition = (person, seconds, action, demoAction) => {
  const home = person.teamId === scenario.match.homeTeamId;
  const direction = home ? 1 : -1;
  const base = person.baselinePosition || { x: 50, y: 50 };
  const offset = trackingRoleOffsets[person.position] || { x: 0, y: 0 };
  const phasePush = trackingPhase(seconds) === "closing_management" ? 3 : 0;
  const wave = Math.sin(seconds / 17 + person.shirtNumber) * 2.4;
  const lateral = Math.cos(seconds / 23 + person.shirtNumber) * 3.2;
  const actionPull = action?.event.teamId === person.teamId
    ? Math.min(8, action.distance < 12 ? 5 : 2)
    : 0;
  const participantAction = demoActionParticipant(demoAction, person.personId);
  const demoProgress = demoAction ? (seconds - demoAction.startSeconds) / Math.max(1, demoAction.endSeconds - demoAction.startSeconds) : 0;
  const anchor = demoAction ? demoActionAnchors.get(person.personId)?.get(demoAction.actionId) : null;
  const x = anchor
    ? (anchor?.start.x || base.x) + ((anchor?.end.x || base.x) - (anchor?.start.x || base.x)) * Math.min(1, Math.max(0, demoProgress))
    : base.x + direction * (offset.x * 0.12 + phasePush + actionPull) + wave;
  const y = anchor
    ? (anchor?.start.y || base.y) + ((anchor?.end.y || base.y) - (anchor?.start.y || base.y)) * Math.min(1, Math.max(0, demoProgress))
    : base.y + offset.y * 0.08 + lateral;
  return {
    x: Math.max(4, Math.min(96, Number(x.toFixed(2)))),
    y: Math.max(4, Math.min(96, Number(y.toFixed(2)))),
  };
};

const trackingSnapshots = [];
for (let clockSeconds = 0; clockSeconds <= 5400; clockSeconds += 1) {
  const action = authoredActionAt(clockSeconds);
  const demoAction = clockSeconds >= scenario.demoWindow.startSeconds && clockSeconds <= scenario.demoWindow.endSeconds
    ? demoActionAt(clockSeconds)
    : null;
  const players = scenario.people
    .filter((person) => person.role === "player")
    .map((person) => {
      const position = trackingPosition(person, clockSeconds, action, demoAction);
      const participantAction = demoActionParticipant(demoAction, person.personId);
      return {
        entityId: person.personId,
        x: position.x,
        y: position.y,
        speedMps: Number((1.2 + Math.abs(Math.sin(clockSeconds / 11 + person.shirtNumber)) * 3.8).toFixed(2)),
        directionDegrees: Math.round((person.teamId === scenario.match.homeTeamId ? 0 : 180) + Math.sin(clockSeconds / 19 + person.shirtNumber) * 28),
        action: participantAction || (action?.distance <= 3 && action.event.primaryActorId === person.personId ? action.event.eventType : "repositioning"),
        active: true,
      };
    });
  const nearestEvent = action?.event;
  const demoProgress = demoAction ? (clockSeconds - demoAction.startSeconds) / Math.max(1, demoAction.endSeconds - demoAction.startSeconds) : 0;
  const ballPosition = demoAction
    ? interpolatePoint(demoAction.ballStart, demoAction.ballEnd, Math.min(1, Math.max(0, demoProgress)))
    : nearestEvent?.location || { x: 50 + Math.sin(clockSeconds / 21) * 18, y: 50 + Math.cos(clockSeconds / 27) * 18 };
  const demoOwner = demoPossessionOwner(demoAction, demoProgress);
  trackingSnapshots.push({
    clockSeconds,
    phase: trackingPhase(clockSeconds),
    possessionTeamId: demoAction ? scenario.demoWindow.sequences.find((sequence) => sequence.actions.includes(demoAction)).teamId : nearestEvent?.teamId || (clockSeconds % 9 < 5 ? scenario.match.homeTeamId : scenario.match.awayTeamId),
    ball: {
      x: Number(Math.max(2, Math.min(98, ballPosition.x)).toFixed(2)),
      y: Number(Math.max(2, Math.min(98, ballPosition.y)).toFixed(2)),
      ownerId: demoAction?.type === "shot" || demoAction?.type === "run_and_shot" ? null : demoOwner || nearestEvent?.primaryActorId || null,
      state: demoAction?.type === "shot" || demoAction?.type === "run_and_shot" ? "in_flight" : nearestEvent?.eventType === "shot" ? "in_flight" : "controlled",
    },
    referee: {
      x: Number((50 + Math.sin(clockSeconds / 31) * 22).toFixed(2)),
      y: Number((50 + Math.cos(clockSeconds / 37) * 24).toFixed(2)),
    },
    players,
    linkedEventId: nearestEvent?.eventId || null,
    synthetic: true,
  });
}
for (let index = scenario.demoWindow.startSeconds + 1; index <= scenario.demoWindow.endSeconds; index += 1) {
  const previous = trackingSnapshots[index - 1];
  const current = trackingSnapshots[index];
  for (const player of current.players) {
    const prior = previous.players.find((item) => item.entityId === player.entityId);
    const dx = player.x - prior.x;
    const dy = player.y - prior.y;
    const distance = Math.hypot(dx, dy);
    const maximumStep = 4;
    if (distance > maximumStep) {
      const scale = maximumStep / distance;
      player.x = Number((prior.x + dx * scale).toFixed(2));
      player.y = Number((prior.y + dy * scale).toFixed(2));
    }
  }
}
scenario.trackingSnapshots = trackingSnapshots;
