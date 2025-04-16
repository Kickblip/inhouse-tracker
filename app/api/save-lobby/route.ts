import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { v4 as uuidv4 } from "uuid"
import { type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()

  const {
    winning_team,
    team_1_kills,
    team_1_deaths,
    team_1_assists,
    team_1_gold,
    team_2_kills,
    team_2_deaths,
    team_2_assists,
    team_2_gold,
    players,
  } = body

  if (!players || !Array.isArray(players)) {
    return NextResponse.json({ message: "Players array is missing or invalid." }, { status: 400 })
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)

    const newLobbyId = uuidv4()

    await sql`
      INSERT INTO lobbies (
        id,
        created_at,
        winning_team,
        team_1_kills,
        team_1_deaths,
        team_1_assists,
        team_1_gold,
        team_2_kills,
        team_2_deaths,
        team_2_assists,
        team_2_gold
      ) VALUES (
        ${newLobbyId},
        NOW(),
        ${winning_team},
        ${team_1_kills},
        ${team_1_deaths},
        ${team_1_assists},
        ${team_1_gold},
        ${team_2_kills},
        ${team_2_deaths},
        ${team_2_assists},
        ${team_2_gold}
      )
    `

    for (const p of players) {
      const slug = p.username
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
      await sql`
        INSERT INTO players (
          id,
          lobby_id,
          username,
          slug,
          team,
          champion,
          level,
          kills,
          deaths,
          assists,
          damage,
          gold,
          gold_per_minute
        ) VALUES (
          ${uuidv4()},
          ${newLobbyId},
          ${p.username},
          ${slug},
          ${p.team},
          ${p.champion},
          ${p.level},
          ${p.kills},
          ${p.deaths},
          ${p.assists},
          ${p.damage},
          ${p.gold},
          ${p.gold_per_minute}
        )
      `
    }

    return NextResponse.json({ message: "Lobby saved", lobbyId: newLobbyId }, { status: 200 })
  } catch (error) {
    console.error("save-lobby error:", error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
