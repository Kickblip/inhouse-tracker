import Link from "next/link"
import { getPlayer, getPlayerSlugs } from "./actions"
import { notFound } from "next/navigation"
import Header from "./Header"
import Stats from "./Stats"
import MatchHistoryList from "./MatchHistoryList"
import { MatchHistoryRecord } from "@/types/profile"

export async function generateStaticParams() {
  const response = await getPlayerSlugs()

  if (!response.success || !response.data) {
    return []
  }

  const players = response.data
  return players.map((player) => ({
    player_name: player.slug,
  }))
}

export default async function PlayerPage({ params }: { params: Promise<{ player_name: string }> }) {
  const { player_name } = await params
  const response = await getPlayer(player_name)
  const match_history = response.data as MatchHistoryRecord[]

  if (!response.success || !match_history) {
    notFound()
  }

  // console.log("Match History:", match_history)

  const username = match_history[0].player.username
  const totalMatches = match_history.length
  const totalWins = match_history.reduce((acc, match) => acc + (match.player.team === match.lobby.winning_team ? 1 : 0), 0)
  const winratePercentage = Math.round((totalWins / totalMatches) * 100)

  const totalKills = match_history.reduce((acc, match) => acc + match.player.kills, 0)
  const totalDeaths = match_history.reduce((acc, match) => acc + match.player.deaths, 0)
  const totalAssists = match_history.reduce((acc, match) => acc + match.player.assists, 0)
  const totalDamage = match_history.reduce((acc, match) => acc + match.player.damage, 0)

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-4 font-mono">
      <Link href="/" className="text-blue-500 hover:underline inline-block mb-4">
        Go to Home Page
      </Link>

      <Header username={username} />

      <div className="grid grid-cols-12 gap-4 mt-2">
        <div className="col-span-12 md:col-span-3">
          <Stats
            totalKills={totalKills}
            totalDeaths={totalDeaths}
            totalAssists={totalAssists}
            totalDamage={totalDamage}
            winratePercentage={winratePercentage}
          />
        </div>

        <div className="col-span-12 md:col-span-9">
          <MatchHistoryList matchHistory={match_history} />
        </div>
      </div>
    </div>
  )
}
