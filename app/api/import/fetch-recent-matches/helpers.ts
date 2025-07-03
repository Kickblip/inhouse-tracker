import { MatchMetadata, ParticipantPerformancePreview } from "@/types/Match"

export function toParticipant(p: any): ParticipantPerformancePreview {
  return {
    puuid: p.puuid,
    participantId: p.participantId,
    summonerId: p.summonerId,
    summonerLevel: p.summonerLevel,
    teamId: p.teamId,
    win: p.win,
    riotIdGameName: p.riotIdGameName,
    riotIdTagline: p.riotIdTagline,
    individualPosition: p.individualPosition,
    role: p.role,
    lane: p.lane,
    teamPosition: p.teamPosition,
    championName: p.championName,
    championLevel: p.championLevel,
    championId: p.championId,
    totalMinionsKilled: p.totalMinionsKilled,
    goldEarned: p.goldEarned,
    goldPerMinute: p.challenges.goldPerMinute,
    kills: p.kills,
    deaths: p.deaths,
    assists: p.assists,
    kda: p.kda,
    killParticipation: p.challenges.killParticipation,
    totalDamageDealtToChampions: p.totalDamageDealtToChampions,
    visionScore: p.visionScore,
  }
}

export function toMatchMetadata(raw: any): MatchMetadata {
  const { metadata, info } = raw

  const participants = info.participants.map((p: any) => toParticipant(p))

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
    perfectGame: info.participants[0].perfectGame,
    timestamps: {
      gameCreation: info.gameCreation,
      gameDuration: info.gameDuration,
      gameStartTimestamp: info.gameStartTimestamp,
      gameEndTimestamp: info.gameEndTimestamp,
    },
  }
}
