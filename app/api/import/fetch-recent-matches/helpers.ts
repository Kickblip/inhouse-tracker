import { MatchMetadata, ParticipantPerformancePreview } from "@/types/Match"

/* eslint-disable @typescript-eslint/no-explicit-any */
const get = <T>(p: any, key: string, fallback: T): T => (p as any)[key] ?? p.challenges?.[key] ?? fallback

export function toParticipant(p: any): ParticipantPerformancePreview {
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
    goldEarned: get(p, "goldEarned", 0),
    goldPerMinute: get(p, "goldPerMinute", 0),
    kills: get(p, "kills", 0),
    deaths: get(p, "deaths", 0),
    assists: get(p, "assists", 0),
    kda: get(p, "kda", 0),
    killParticipation: get(p, "killParticipation", 0),
    totalDamageDealtToChampions: get(p, "totalDamageDealtToChampions", 0),
    visionScore: get(p, "visionScore", 0),
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
/* eslint-enable @typescript-eslint/no-explicit-any */
