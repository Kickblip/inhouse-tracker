import { neon } from "@neondatabase/serverless"

export async function getLobbySlugs() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    const lobby_ids = await sql`SELECT id FROM lobbies`

    if (!lobby_ids || lobby_ids.length === 0) {
      return { success: false, error: "No lobbies found" }
    }

    return { success: true, data: lobby_ids }
  } catch (error) {
    let errorMessage = "An unknown error occurred"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return { success: false, error: errorMessage }
  }
}

export async function getLobby(lobby_id: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    const lobby = await sql`SELECT * FROM lobbies WHERE id = ${lobby_id}`
    const players = await sql`SELECT * FROM players WHERE lobby_id = ${lobby_id}`

    if (!lobby || lobby.length === 0) {
      return { success: false, error: "Lobby not found" }
    }
    if (!players || players.length === 0) {
      return { success: false, error: "No players found for this lobby" }
    }

    const lobbyData = {
      ...lobby[0],
      players: players,
    }
    return { success: true, data: lobbyData }
  } catch (error) {
    let errorMessage = "An unknown error occurred"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return { success: false, error: errorMessage }
  }
}
