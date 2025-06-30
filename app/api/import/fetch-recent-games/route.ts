import { NextResponse } from "next/server"
import { currentUser, auth, clerkClient } from "@clerk/nextjs/server"

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }
  const user = await currentUser()

  const client = await clerkClient()

  // Not sure why .getUserOauthAccessToken() is marked as deprecated as it seems to still be the only way
  const clerkResponse = await client.users.getUserOauthAccessToken(userId, "custom_riot_games")
  const accessToken = clerkResponse.data[0]?.token || ""

  console.log("Access Token:", accessToken)

  const idsRes = await fetch(`https://americas.api.riotgames.com/lol/rso-match/v1/matches/ids?start=0&count=5`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!idsRes.ok) {
    console.error("Failed to fetch match IDs:", idsRes.status, await idsRes.text())
    return NextResponse.json({ error: "Could not fetch match IDs" }, { status: idsRes.status })
  }
  const matchIds: string[] = await idsRes.json()

  const matches = await Promise.all(
    matchIds.map((id) =>
      fetch(`https://americas.api.riotgames.com/lol/rso-match/v1/matches/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((r) => (r.ok ? r.json() : null)),
    ),
  )

  return NextResponse.json({ matches }, { status: 200 })
}
