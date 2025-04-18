import { Lobby, Player } from "@/types/lobby"
import { neon } from "@neondatabase/serverless"

export async function getPlayerSlugs() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    const player_slugs = await sql`SELECT DISTINCT slug FROM players`

    if (!player_slugs || player_slugs.length === 0) {
      return { success: false, error: "No player slugs found" }
    }

    return { success: true, data: player_slugs }
  } catch (error) {
    let errorMessage = "An unknown error occurred"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return { success: false, error: errorMessage }
  }
}

export async function getPlayer(player_slug: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    const player_data = (await sql`SELECT * FROM players WHERE slug = ${player_slug}`) as Player[]

    if (!player_data || player_data.length === 0) {
      return { success: false, error: "Player not found" }
    }

    const lobbyIds = [...new Set(player_data.map((row: Player) => row.lobby_id))]

    // Get match history for the player
    const lobbies_data = (await sql`
      SELECT * 
      FROM lobbies 
      WHERE id = ANY(${lobbyIds})
    `) as Lobby[]

    // Get data from the other players that were in those lobbies
    const all_players_in_lobbies = (await sql`
      SELECT *
      FROM players
      WHERE lobby_id = ANY(${lobbyIds})
    `) as Player[]

    const all_lobbies = lobbies_data.map((lobby: Lobby) => {
      const players_for_lobby = all_players_in_lobbies.filter((player: Player) => player.lobby_id === lobby.id)
      return {
        ...lobby,
        players: players_for_lobby,
      }
    })

    const match_history = player_data.map((player: Player) => {
      const lobby = all_lobbies.find((lobby: Lobby) => lobby.id === player.lobby_id)
      return {
        player,
        lobby,
      }
    })

    return { success: true, data: match_history }
  } catch (error) {
    let errorMessage = "An unknown error occurred"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return { success: false, error: errorMessage }
  }
}
