import { NextResponse, NextRequest } from "next/server"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { Match } from "@/types/Match"
import { toMatch, fetchWithRetry } from "./helpers"

const RIOT_ROOT = "https://americas.api.riotgames.com/lol/rso-match/v1"

export async function POST(req: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { matchId } = await req.json()

  if (typeof matchId !== "string" || !matchId.trim()) {
    return NextResponse.json({ error: "Invalid matchId" }, { status: 400 })
  }

  const client = await clerkClient()

  const clerkResponse = await client.users.getUserOauthAccessToken(userId, "custom_riot_games")
  const accessToken = clerkResponse.data[0]?.token || ""

  const matchRes = await fetchWithRetry(`${RIOT_ROOT}/matches/${matchId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!matchRes.ok) {
    console.error("Failed to fetch match:", matchRes.status, await matchRes.text())
    return NextResponse.json({ error: "Could not fetch match" }, { status: matchRes.status })
  }
  const matchData = await matchRes.json()

  const formattedMatch: Match = toMatch(matchData)

  console.log(formattedMatch)

  return NextResponse.json({ status: 200 })
}
