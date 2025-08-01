// keys are written with snake_case to make parsing them into the navbar easier

export interface Leaderboards {
  kills: LeaderboardEntry[]
  assists: LeaderboardEntry[]
  damage: LeaderboardEntry[]
  CS: LeaderboardEntry[]
  vision_score: LeaderboardEntry[]
  missing_pings: LeaderboardEntry[]
  ability_uses: LeaderboardEntry[]
  dancing_with_shelly: LeaderboardEntry[]
  largest_crit: LeaderboardEntry[]
  longest_time_alive: LeaderboardEntry[]
  buffs_stolen: LeaderboardEntry[]
  heals_on_teammates: LeaderboardEntry[]
  self_mitigated_damage: LeaderboardEntry[]
  turret_damage: LeaderboardEntry[]
  turret_plates: LeaderboardEntry[]
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
  value: number | string
}

export interface InhouseLeaguePlayer {
  puuid: string
  riotIdGameName: string
  riotIdTagline: string
  pointHistory: number[]
  gamesPlayed: number
  gamesWon: number
  gamesLost: number
  recentChampionNames: string[]
  recentMatches: string[]
  lastPlayedAt: Date
}
