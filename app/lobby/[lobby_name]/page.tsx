import Link from "next/link"
import { notFound } from "next/navigation"
import { getLobbySlugs, getLobby } from "./actions"
import { Lobby } from "@/types/lobby"
import TeamTable from "./TeamTable"

export async function generateStaticParams() {
  const response = await getLobbySlugs()

  if (!response.success || !response.data) {
    return []
  }

  const lobbies = response.data
  return lobbies.map((lobby) => ({
    lobby_name: lobby.id,
  }))
}

export default async function LobbyPage({ params }: { params: Promise<{ lobby_name: string }> }) {
  const { lobby_name } = await params
  const response = await getLobby(lobby_name)
  const lobby = response.data as Lobby

  const team1Players = lobby.players.filter((p) => p.team === 1)
  const team2Players = lobby.players.filter((p) => p.team === 2)

  if (!response.success || !lobby) {
    notFound()
  }
  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto p-4 font-mono">
      <Link href="/" className="text-blue-500 hover:underline">
        Go to Home Page
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-2">Lobby Scoreboard</h1>

      {/* TEAM 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-1">
          Team 1 {lobby.winning_team === 1 && <span className="text-green-600">(WINNER)</span>}
        </h2>
        <div className="flex items-center gap-6 mb-2">
          <div>Kills: {lobby.team_1_kills}</div>
          <div>Deaths: {lobby.team_1_deaths}</div>
          <div>Assists: {lobby.team_1_assists}</div>
          <div>Gold: {lobby.team_1_gold}</div>
        </div>
        <TeamTable players={team1Players} />
      </section>

      {/* TEAM 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-1">
          Team 2 {lobby.winning_team === 2 && <span className="text-green-600">(WINNER)</span>}
        </h2>
        <div className="flex items-center gap-6 mb-2">
          <div>Kills: {lobby.team_2_kills}</div>
          <div>Deaths: {lobby.team_2_deaths}</div>
          <div>Assists: {lobby.team_2_assists}</div>
          <div>Gold: {lobby.team_2_gold}</div>
        </div>
        <TeamTable players={team2Players} />
      </section>
    </div>
  )
}
