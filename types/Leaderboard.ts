export interface Leaderboards {
  kills: LeaderboardEntry[]
  assists: LeaderboardEntry[]
  deaths: LeaderboardEntry[]
}

export interface LeaderboardEntry {
  puuid: string
  matchId: string
  riotIdGameName: string
  riotIdTagline: string
  profileIcon: number
  championName: string
  summonerLevel: number
  createdAt: number
  value: number
}
