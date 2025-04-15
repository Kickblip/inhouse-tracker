export interface Player {
  username: string;
  team: 1 | 2;
  champion: string;
  level: number;
  kills: number;
  deaths: number;
  assists: number;
  damage: number;
  gold: number;
  gold_per_minute: number;
}

export interface Lobby {
  winning_team: 1 | 2;
  team_1_kills: number;
  team_1_deaths: number;
  team_1_assists: number;
  team_1_gold: number;
  team_2_kills: number;
  team_2_deaths: number;
  team_2_assists: number;
  team_2_gold: number;
  players: Player[];
}
