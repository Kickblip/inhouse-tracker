export interface Match {
  metadata: MatchMetadata
  participants: ParticipantPerformanceFull[]
}

export interface MatchMetadata {
  dataVersion: string
  gameEndedInEarlySurrender: boolean
  gameEndedInSurrender: boolean
  gameMode: string
  gameName: string
  gameType: string
  gameVersion: string
  matchId: string
  participants: ParticipantPerformancePreview[]
  perfectGame: number
  timestamps: {
    gameCreation: number
    gameDuration: number
    gameStartTimestamp: number
    gameEndTimestamp: number
  }
}

export interface ParticipantPerformancePreview {
  puuid: string
  participantId: number
  summonerId: string
  summonerLevel: number
  teamId: number
  win: boolean
  riotIdGameName: string
  riotIdTagline: string
  individualPosition: string
  role: string
  lane: string
  teamPosition: string
  championName: string
  championLevel: number
  championId: number
  totalMinionsKilled: number
  goldEarned: number
  goldPerMinute: number
  kills: number
  deaths: number
  assists: number
  kda: number
  killParticipation: number
  totalDamageDealtToChampions: number
  visionScore: number
}

export interface ParticipantPerformanceFull extends ParticipantPerformancePreview {
  pings: {
    basicPings: number
    assistMePings: number
    allInPings: number
    commandPings: number
    dangerPings: number
    enemyMissingPings: number
    enemyVisionPings: number
    getBackPings: number
    holdPings: number
    needVisionPings: number
    onMyWayPings: number
    pushPings: number
    retreatPings: number
    visionClearedPings: number
  }
  fun: {
    abilityUses: number
    blastConeOppositeOpponentCount: number
    dancedWithRiftHerald: number
    fistBumpParticipation: number
    mejaisFullStackInTime: number
    largestCriticalStrike: number
    totalTimeSpentDead: number
    spell1Casts: number
    spell2Casts: number
    spell3Casts: number
    spell4Casts: number
    summoner1Casts: number
    summoner1Id: number
    summoner2Casts: number
    summoner2Id: number
    longestTimeSpentLiving: number
    buffsStolen: number
    controlWardsPlaced: number
    skillshotsDodged: number
    skillshotsHit: number
    takedownsInEnemyFountain: number
    consumablesPurchased: number
    survivedSingleDigitHpCount: number
    dodgeSkillShotsSmallWindow: number
    timeCCingOthers: number
  }
  laning: {
    laneMinionsFirst10Minutes: number
    firstBloodAssist: boolean
    firstBloodKill: boolean
    firstTowerAssist: boolean
    firstTowerKill: boolean
    unseenRecalls: number
    firstTurretKilled: number
    earlyLaningPhaseGoldExpAdvantage: number
    laningPhaseGoldExpAdvantage: number
    landSkillShotsEarlyGame: number
    maxKillDeficit: number
    maxLevelLeadLaneOpponent: number
    maxCsAdvantageOnLaneOpponent: number
    takedownsAfterGainingLevelAdvantage: number
    killsNearEnemyTurret: number
    killsUnderOwnTurret: number
  }
  utility: {
    visionScore: number
    visionWardsBoughtInGame: number
    wardsPlaced: number
    wardTakedowns: number
    wardsKilled: number
    wardTakedownsBefore20M: number
    wardsGuarded: number
    visionScoreAdvantageLaneOpponent: number
    visionScorePerMinute: number
    twoWardsOneSweeperCount: number
    detectorWardsPlaced: number
    highestWardKills: number
    stealthWardsPlaced: number
    knockEnemyIntoTeamAndKill: number
    totalHeal: number
    totalHealsOnTeammates: number
    saveAllyFromDeath: number
    enemyChampionImmobilizations: number
    effectiveHealAndShielding: number
  }
  jungling: {
    killsOnLanersEarlyJungleAsJungler: number
    jungleCsBefore10Minutes: number
    junglerKillsEarlyJungle: number
    damageDealtToObjectives: number
    totalAllyJungleMinionsKilled: number
    totalEnemyJungleMinionsKilled: number
    neutralMinionsKilled: number
    baronKills: number
    baronTakedowns: number
    teamBaronKills: number
    riftHeraldTakedowns: number
    scuttleCrabKills: number
    dragonKills: number
    dragonTakedowns: number
    perfectDragonSoulsTaken: number
    objectivesStolen: number
    objectivesStolenAssists: number
    epicMonsterKillsNearEnemyJungler: number
    epicMonsterKillsWithin30SecondsOfSpawn: number
    epicMonsterSteals: number
    epicMonsterStolenWithoutSmite: number
    initialBuffCount: number
    initialCrabCount: number
    teamElderDragonKills: number
    teamRiftHeraldKills: number
    soloBaronKills: number
    elderDragonKillsWithOpposingSoul: number
    earliestDragonTakedown: number
    takedownsBeforeJungleMinionSpawn: number
  }
  combat: {
    killAfterHiddenWithAlly: number
    outnumberedKills: number
    soloKills: number
    doubleKills: number
    tripleKills: number
    quadraKills: number
    pentaKills: number
    largestKillingSpree: number
    largestMultiKill: number
    acesBefore15Minutes: number
  }
  structures: {
    damageDealtToTurrets: number
    turretKills: number
    turretTakedowns: number
    turretsLost: number
    inhibitorKills: number
    inhibitorTakedowns: number
    inhibitorsLost: number
    turretPlatesTaken: number
    turretsTakenWithRiftHerald: number
  }
  damage: {
    damagePerMinute: number
    magicDamageDealt: number
    magicDamageDealtToChampions: number
    magicDamageTaken: number
    physicalDamageDealt: number
    physicalDamageDealtToChampions: number
    physicalDamageTaken: number
    trueDamageDealt: number
    trueDamageDealtToChampions: number
    trueDamageTaken: number
    totalDamageDealt: number
    totalDamageDealtToChampions: number
    totalDamageShieldedOnTeammates: number
    totalDamageTaken: number
    teamDamagePercentage: number
    damageSelfMitigated: number
  }
}
