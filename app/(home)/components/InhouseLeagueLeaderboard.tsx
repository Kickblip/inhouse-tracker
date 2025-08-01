import InhouseChampion from "./InhouseChampion"
import InhouseChallenger from "./InhouseChallenger"
import InhouseCompetitor from "./InhouseCompetitor"
import InhouseLeagueLeaderboardRow from "./InhouseLeagueLeaderboardRow"
import { getTopLeaguePlayers } from "../actions"
import Error from "@/app/shared/Error"

export default async function InhouseLeagueLeaderboard() {
  const players = await getTopLeaguePlayers(15)

  if (!players || players.length === 0) {
    return <Error error="No players found in the leaderboard." />
  }

  return (
    <div className="flex flex-col gap-4 z-10">
      <InhouseChampion
        playerName={players[0].riotIdGameName}
        gamesWon={players[0].gamesWon}
        gamesLost={players[0].gamesLost}
        points={players[0].pointHistory.reduce((acc, curr) => acc + curr, 0)}
      />
      <InhouseChallenger
        playerName={players[1].riotIdGameName}
        gamesWon={players[1].gamesWon}
        gamesLost={players[1].gamesLost}
        points={players[1].pointHistory.reduce((acc, curr) => acc + curr, 0)}
      />
      <InhouseCompetitor
        playerName={players[2].riotIdGameName}
        gamesWon={players[2].gamesWon}
        gamesLost={players[2].gamesLost}
        points={players[2].pointHistory.reduce((acc, curr) => acc + curr, 0)}
      />
      {players.slice(3).map((player, index) => (
        <InhouseLeagueLeaderboardRow
          key={player.puuid}
          rank={index + 4}
          playerName={player.riotIdGameName}
          mmr={player.pointHistory.reduce((acc, curr) => acc + curr, 0)}
          winrate={((player.gamesWon / (player.gamesWon + player.gamesLost)) * 100 || 0).toFixed(0)}
          gamesPlayed={player.gamesWon + player.gamesLost}
          champion={player.recentChampionNames[player.recentChampionNames.length - 1]}
        />
      ))}
    </div>
  )
}
