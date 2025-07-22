export interface PlayerMatchSummary {
  matchId: string
  gameMode: string
  gameCreation: number
  gameDuration: number
  win: boolean
  kills: number
  deaths: number
  assists: number
  kda: number
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  championName: string
  championLevel: number
  totalMinionsKilled: number
  neutralMinionsKilled: number
  totalDamageDealtToChampions: number
  visionScore: number
  summoner1Id: number
  summoner2Id: number
  trueDamageDealtToChampions: number
  magicDamageDealtToChampions: number
  physicalDamageDealtToChampions: number
}

export interface PlayerProfile {
  puuid: string
  riotIdGameName: string
  riotIdTagline: string
  summonerLevel: number
  profileIcon: number
  matches: PlayerMatchSummary[]
}
