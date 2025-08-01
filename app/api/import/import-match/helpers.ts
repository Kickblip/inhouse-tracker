import { Match, ParticipantPerformanceFull, Team } from "@/types/Match"
import clientPromise from "@/lib/mongodb"
import { Collection, Db } from "mongodb"
import { InhouseLeaguePlayer } from "@/types/Leaderboard"

/* eslint-disable @typescript-eslint/no-explicit-any */
const get = <T>(p: any, key: string, fallback: T): T => (p as any)[key] ?? p.challenges?.[key] ?? fallback

export function toParticipant(p: any, gameDuration: number): ParticipantPerformanceFull {
  return {
    puuid: get(p, "puuid", ""),
    participantId: get(p, "participantId", 0),
    summonerId: get(p, "summonerId", ""),
    summonerLevel: get(p, "summonerLevel", 0),
    teamId: get(p, "teamId", 0),
    win: get(p, "win", false),
    riotIdGameName: get(p, "riotIdGameName", ""),
    riotIdTagline: get(p, "riotIdTagline", ""),
    individualPosition: get(p, "individualPosition", ""),
    profileIcon: get(p, "profileIcon", 0),
    item0: get(p, "item0", 0),
    item1: get(p, "item1", 0),
    item2: get(p, "item2", 0),
    item3: get(p, "item3", 0),
    item4: get(p, "item4", 0),
    item5: get(p, "item5", 0),
    item6: get(p, "item6", 0),
    role: get(p, "role", ""),
    lane: get(p, "lane", ""),
    teamPosition: get(p, "teamPosition", ""),
    championName: get(p, "championName", ""),
    championLevel: get(p, "champLevel", 0),
    championId: get(p, "championId", 0),
    totalMinionsKilled: get(p, "totalMinionsKilled", 0),
    neutralMinionsKilled: get(p, "neutralMinionsKilled", 0),
    goldEarned: get(p, "goldEarned", 0),
    goldPerMinute: get(p, "goldPerMinute", 0),
    kills: get(p, "kills", 0),
    deaths: get(p, "deaths", 0),
    assists: get(p, "assists", 0),
    kda: get(p, "kda", 0),
    killParticipation: get(p, "killParticipation", 0),
    totalDamageDealtToChampions: get(p, "totalDamageDealtToChampions", 0),
    visionScore: get(p, "visionScore", 0),
    pings: {
      basicPings: get(p, "basicPings", 0),
      assistMePings: get(p, "assistMePings", 0),
      allInPings: get(p, "allInPings", 0),
      commandPings: get(p, "commandPings", 0),
      dangerPings: get(p, "dangerPings", 0),
      enemyMissingPings: get(p, "enemyMissingPings", 0),
      enemyVisionPings: get(p, "enemyVisionPings", 0),
      getBackPings: get(p, "getBackPings", 0),
      holdPings: get(p, "holdPings", 0),
      needVisionPings: get(p, "needVisionPings", 0),
      onMyWayPings: get(p, "onMyWayPings", 0),
      pushPings: get(p, "pushPings", 0),
      retreatPings: get(p, "retreatPings", 0),
      visionClearedPings: get(p, "visionClearedPings", 0),
    },
    fun: {
      abilityUses: get(p, "abilityUses", 0),
      blastConeOppositeOpponentCount: get(p, "blastConeOppositeOpponentCount", 0),
      dancedWithRiftHerald: get(p, "dancedWithRiftHerald", 0),
      fistBumpParticipation: get(p, "fistBumpParticipation", 0),
      mejaisFullStackInTime: get(p, "mejaisFullStackInTime", 0),
      largestCriticalStrike: get(p, "largestCriticalStrike", 0),
      totalTimeSpentDead: get(p, "totalTimeSpentDead", 0),
      spell1Casts: get(p, "spell1Casts", 0),
      spell2Casts: get(p, "spell2Casts", 0),
      spell3Casts: get(p, "spell3Casts", 0),
      spell4Casts: get(p, "spell4Casts", 0),
      summoner1Casts: get(p, "summoner1Casts", 0),
      summoner1Id: get(p, "summoner1Id", 0),
      summoner2Casts: get(p, "summoner2Casts", 0),
      summoner2Id: get(p, "summoner2Id", 0),
      longestTimeSpentLiving: get(p, "deaths", 0) === 0 ? gameDuration : get(p, "longestTimeSpentLiving", 0),
      buffsStolen: get(p, "buffsStolen", 0),
      controlWardsPlaced: get(p, "controlWardsPlaced", 0),
      skillshotsDodged: get(p, "skillshotsDodged", 0),
      skillshotsHit: get(p, "skillshotsHit", 0),
      takedownsInEnemyFountain: get(p, "takedownsInEnemyFountain", 0),
      consumablesPurchased: get(p, "consumablesPurchased", 0),
      survivedSingleDigitHpCount: get(p, "survivedSingleDigitHpCount", 0),
      dodgeSkillShotsSmallWindow: get(p, "dodgeSkillShotsSmallWindow", 0),
      timeCCingOthers: get(p, "timeCCingOthers", 0),
    },
    laning: {
      laneMinionsFirst10Minutes: get(p, "laneMinionsFirst10Minutes", 0),
      firstBloodAssist: get(p, "firstBloodAssist", false),
      firstBloodKill: get(p, "firstBloodKill", false),
      firstTowerAssist: get(p, "firstTowerAssist", false),
      firstTowerKill: get(p, "firstTowerKill", false),
      unseenRecalls: get(p, "unseenRecalls", 0),
      firstTurretKilled: get(p, "firstTurretKilled", 0),
      earlyLaningPhaseGoldExpAdvantage: get(p, "earlyLaningPhaseGoldExpAdvantage", 0),
      laningPhaseGoldExpAdvantage: get(p, "laningPhaseGoldExpAdvantage", 0),
      landSkillShotsEarlyGame: get(p, "landSkillShotsEarlyGame", 0),
      maxKillDeficit: get(p, "maxKillDeficit", 0),
      maxLevelLeadLaneOpponent: get(p, "maxLevelLeadLaneOpponent", 0),
      maxCsAdvantageOnLaneOpponent: get(p, "maxCsAdvantageOnLaneOpponent", 0),
      takedownsAfterGainingLevelAdvantage: get(p, "takedownsAfterGainingLevelAdvantage", 0),
      killsNearEnemyTurret: get(p, "killsNearEnemyTurret", 0),
      killsUnderOwnTurret: get(p, "killsUnderOwnTurret", 0),
    },
    utility: {
      visionScore: get(p, "visionScore", 0),
      visionWardsBoughtInGame: get(p, "visionWardsBoughtInGame", 0),
      wardsPlaced: get(p, "wardsPlaced", 0),
      wardTakedowns: get(p, "wardTakedowns", 0),
      wardsKilled: get(p, "wardsKilled", 0),
      wardTakedownsBefore20M: get(p, "wardTakedownsBefore20M", 0),
      wardsGuarded: get(p, "wardsGuarded", 0),
      visionScoreAdvantageLaneOpponent: get(p, "visionScoreAdvantageLaneOpponent", 0),
      visionScorePerMinute: get(p, "visionScorePerMinute", 0),
      twoWardsOneSweeperCount: get(p, "twoWardsOneSweeperCount", 0),
      detectorWardsPlaced: get(p, "detectorWardsPlaced", 0),
      highestWardKills: get(p, "highestWardKills", 0),
      stealthWardsPlaced: get(p, "stealthWardsPlaced", 0),
      knockEnemyIntoTeamAndKill: get(p, "knockEnemyIntoTeamAndKill", 0),
      totalHeal: get(p, "totalHeal", 0),
      totalHealsOnTeammates: get(p, "totalHealsOnTeammates", 0),
      saveAllyFromDeath: get(p, "saveAllyFromDeath", 0),
      enemyChampionImmobilizations: get(p, "enemyChampionImmobilizations", 0),
      effectiveHealAndShielding: get(p, "effectiveHealAndShielding", 0),
    },
    jungling: {
      killsOnLanersEarlyJungleAsJungler: get(p, "killsOnLanersEarlyJungleAsJungler", 0),
      jungleCsBefore10Minutes: get(p, "jungleCsBefore10Minutes", 0),
      junglerKillsEarlyJungle: get(p, "junglerKillsEarlyJungle", 0),
      damageDealtToObjectives: get(p, "damageDealtToObjectives", 0),
      totalAllyJungleMinionsKilled: get(p, "totalAllyJungleMinionsKilled", 0),
      totalEnemyJungleMinionsKilled: get(p, "totalEnemyJungleMinionsKilled", 0),
      baronKills: get(p, "baronKills", 0),
      baronTakedowns: get(p, "baronTakedowns", 0),
      teamBaronKills: get(p, "teamBaronKills", 0),
      riftHeraldTakedowns: get(p, "riftHeraldTakedowns", 0),
      scuttleCrabKills: get(p, "scuttleCrabKills", 0),
      dragonKills: get(p, "dragonKills", 0),
      dragonTakedowns: get(p, "dragonTakedowns", 0),
      perfectDragonSoulsTaken: get(p, "perfectDragonSoulsTaken", 0),
      objectivesStolen: get(p, "objectivesStolen", 0),
      objectivesStolenAssists: get(p, "objectivesStolenAssists", 0),
      epicMonsterKillsNearEnemyJungler: get(p, "epicMonsterKillsNearEnemyJungler", 0),
      epicMonsterKillsWithin30SecondsOfSpawn: get(p, "epicMonsterKillsWithin30SecondsOfSpawn", 0),
      epicMonsterSteals: get(p, "epicMonsterSteals", 0),
      epicMonsterStolenWithoutSmite: get(p, "epicMonsterStolenWithoutSmite", 0),
      initialBuffCount: get(p, "initialBuffCount", 0),
      initialCrabCount: get(p, "initialCrabCount", 0),
      teamElderDragonKills: get(p, "teamElderDragonKills", 0),
      teamRiftHeraldKills: get(p, "teamRiftHeraldKills", 0),
      soloBaronKills: get(p, "soloBaronKills", 0),
      elderDragonKillsWithOpposingSoul: get(p, "elderDragonKillsWithOpposingSoul", 0),
      earliestDragonTakedown: get(p, "earliestDragonTakedown", 0),
      takedownsBeforeJungleMinionSpawn: get(p, "takedownsBeforeJungleMinionSpawn", 0),
    },
    combat: {
      killAfterHiddenWithAlly: get(p, "killAfterHiddenWithAlly", 0),
      outnumberedKills: get(p, "outnumberedKills", 0),
      soloKills: get(p, "soloKills", 0),
      doubleKills: get(p, "doubleKills", 0),
      tripleKills: get(p, "tripleKills", 0),
      quadraKills: get(p, "quadraKills", 0),
      pentaKills: get(p, "pentaKills", 0),
      largestKillingSpree: get(p, "largestKillingSpree", 0),
      largestMultiKill: get(p, "largestMultiKill", 0),
      acesBefore15Minutes: get(p, "acesBefore15Minutes", 0),
    },
    structures: {
      damageDealtToTurrets: get(p, "damageDealtToTurrets", 0),
      turretKills: get(p, "turretKills", 0),
      turretTakedowns: get(p, "turretTakedowns", 0),
      turretsLost: get(p, "turretsLost", 0),
      inhibitorKills: get(p, "inhibitorKills", 0),
      inhibitorTakedowns: get(p, "inhibitorTakedowns", 0),
      inhibitorsLost: get(p, "inhibitorsLost", 0),
      turretPlatesTaken: get(p, "turretPlatesTaken", 0),
      turretsTakenWithRiftHerald: get(p, "turretsTakenWithRiftHerald", 0),
    },
    damage: {
      damagePerMinute: get(p, "damagePerMinute", 0),
      magicDamageDealt: get(p, "magicDamageDealt", 0),
      magicDamageDealtToChampions: get(p, "magicDamageDealtToChampions", 0),
      magicDamageTaken: get(p, "magicDamageTaken", 0),
      physicalDamageDealt: get(p, "physicalDamageDealt", 0),
      physicalDamageDealtToChampions: get(p, "physicalDamageDealtToChampions", 0),
      physicalDamageTaken: get(p, "physicalDamageTaken", 0),
      trueDamageDealt: get(p, "trueDamageDealt", 0),
      trueDamageDealtToChampions: get(p, "trueDamageDealtToChampions", 0),
      trueDamageTaken: get(p, "trueDamageTaken", 0),
      totalDamageDealt: get(p, "totalDamageDealt", 0),
      totalDamageDealtToChampions: get(p, "totalDamageDealtToChampions", 0),
      totalDamageShieldedOnTeammates: get(p, "totalDamageShieldedOnTeammates", 0),
      totalDamageTaken: get(p, "totalDamageTaken", 0),
      teamDamagePercentage: get(p, "teamDamagePercentage", 0),
      damageSelfMitigated: get(p, "damageSelfMitigated", 0),
    },
  }
}

export function toTeam(t: any): Team {
  return {
    bans: t.bans,
    objectives: {
      atakhan: {
        first: t.objectives.atakhan.first,
        kills: t.objectives.atakhan.kills,
      },
      baron: {
        first: t.objectives.baron.first,
        kills: t.objectives.baron.kills,
      },
      champion: {
        first: t.objectives.champion.first,
        kills: t.objectives.champion.kills,
      },
      dragon: {
        first: t.objectives.dragon.first,
        kills: t.objectives.dragon.kills,
      },
      horde: {
        first: t.objectives.horde.first,
        kills: t.objectives.horde.kills,
      },
      inhibitor: {
        first: t.objectives.inhibitor.first,
        kills: t.objectives.inhibitor.kills,
      },
      riftHerald: {
        first: t.objectives.riftHerald.first,
        kills: t.objectives.riftHerald.kills,
      },
      tower: {
        first: t.objectives.tower.first,
        kills: t.objectives.tower.kills,
      },
    },
    teamId: t.teamId,
    win: t.win,
  }
}

export function toMatch(raw: any): Match {
  const { metadata, info } = raw

  const participants = info.participants.map((p: any) => toParticipant(p, info.gameDuration))
  const teams = info.teams.map((t: any) => toTeam(t))

  return {
    dataVersion: metadata.dataVersion,
    gameEndedInEarlySurrender: info.participants[0].gameEndedInEarlySurrender,
    gameEndedInSurrender: info.participants[0].gameEndedInSurrender,
    gameMode: info.gameMode,
    gameName: info.gameName,
    gameType: info.gameType,
    gameVersion: info.gameVersion,
    matchId: metadata.matchId,
    participants,
    perfectGame: info.participants[0].challenges.perfectGame,
    timestamps: {
      gameCreation: info.gameCreation,
      gameDuration: info.gameDuration,
      gameStartTimestamp: info.gameStartTimestamp,
      gameEndTimestamp: info.gameEndTimestamp,
    },
    teams,
  }
}

export async function fetchWithRetry(url: string, opts: RequestInit, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, opts)
    if (res.status !== 429) return res // success or other error

    // 429 – read how long to wait (falls back to 1 s)
    const sleep = Number(res.headers.get("retry-after") ?? "1") * 1_000
    await new Promise((r) => setTimeout(r, sleep))
  }
  throw new Error("Exceeded retry budget (429)")
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function basePoints(p: ParticipantPerformanceFull) {
  return 5 + (p.win ? 3 : 0)
}

function milestonePoints(p: ParticipantPerformanceFull, minutes: number) {
  let m = 0
  if (p.utility.visionScore >= 60) m++
  if (p.utility.visionScorePerMinute >= 1.5) m++
  if (p.utility.wardsPlaced + p.utility.wardsKilled >= 30) m++
  if (p.utility.saveAllyFromDeath >= 1) m++
  if (p.assists >= 25) m++
  if (p.fun.controlWardsPlaced >= 5) m++

  if (p.jungling.riftHeraldTakedowns >= 1) m++
  if (p.jungling.initialBuffCount >= 3) m++
  if (p.jungling.scuttleCrabKills >= 4) m++
  if (p.jungling.objectivesStolen >= 1 || p.jungling.epicMonsterSteals >= 1) m++

  if (p.structures.turretPlatesTaken >= 3) m++

  if (p.kda >= 5) m++
  if (p.deaths <= 1) m++
  if (p.combat.pentaKills >= 1) m++
  if (p.combat.soloKills >= 2) m++
  if ((p.totalMinionsKilled + p.neutralMinionsKilled) / minutes >= 8) m++
  if (p.laning.firstBloodKill || p.laning.firstBloodAssist) m++
  return m
}

export async function upsertLeagueForMatch(match: Match) {
  const client = await clientPromise
  const db: Db = client.db("match_service")
  const league: Collection<InhouseLeaguePlayer> = db.collection("league")

  const minutes = match.timestamps.gameDuration / 60
  const matchId = match.matchId
  const endedAt = new Date(match.timestamps.gameEndTimestamp ?? match.timestamps.gameCreation)

  for (const p of match.participants as ParticipantPerformanceFull[]) {
    const pointsEarned = (basePoints(p) + milestonePoints(p, minutes)) * 10

    await league.updateOne(
      { puuid: p.puuid },
      {
        $set: {
          puuid: p.puuid,
          riotIdGameName: p.riotIdGameName,
          riotIdTagline: p.riotIdTagline,
          lastPlayedAt: endedAt,
        },
        $push: {
          pointHistory: pointsEarned,
          recentMatches: matchId,
          recentChampionNames: p.championName,
        },
        $inc: {
          gamesPlayed: 1,
          gamesWon: p.win ? 1 : 0,
          gamesLost: p.win ? 0 : 1,
        },
      },
      { upsert: true },
    )
  }
}
