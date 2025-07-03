import { NextResponse } from "next/server"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { MatchMetadata } from "@/types/Match"
import { toMatchMetadata } from "./helpers"
import { fetchWithRetry } from "../import-match/helpers"

const RIOT_ROOT = "https://americas.api.riotgames.com/lol/rso-match/v1"

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const client = await clerkClient()

  const clerkResponse = await client.users.getUserOauthAccessToken(userId, "custom_riot_games")
  const accessToken = clerkResponse.data[0]?.token || ""

  const idsRes = await fetchWithRetry(`${RIOT_ROOT}/matches/ids?start=0&count=5`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!idsRes.ok) {
    console.error("Failed to fetch match IDs:", idsRes.status, await idsRes.text())
    return NextResponse.json({ error: "Could not fetch match IDs" }, { status: idsRes.status })
  }
  const matchIds: string[] = await idsRes.json()

  const rawMatches = await Promise.all(
    matchIds.map((id) =>
      fetchWithRetry(`${RIOT_ROOT}/matches/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((r) => (r.ok ? r.json() : null)),
    ),
  )

  const formatted: MatchMetadata[] = rawMatches.filter(Boolean).map(toMatchMetadata)

  return NextResponse.json({ matches: formatted }, { status: 200 })
}
