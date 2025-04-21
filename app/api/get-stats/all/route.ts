import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    const players = await sql`
      SELECT *
      FROM players
    `

    return NextResponse.json(players, { status: 200 })
  } catch (error) {
    console.error("leaderboard GET error:", error)
    return NextResponse.json({ error: "Unable to fetch leaderboard" }, { status: 500 })
  }
}
