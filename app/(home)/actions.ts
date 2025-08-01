"use server"

import clientPromise from "@/lib/mongodb"
import { DbMatch, Match } from "@/types/Match"

export async function getRecentMatches() {
  try {
    const mongodb = await clientPromise
    const collection = mongodb.db("match_service").collection<DbMatch>("matches")

    const matches = (await collection
      .find({}, { projection: { _id: 0, __v: 0 } })
      .sort({ "timestamps.gameCreation": -1 })
      .limit(5)
      .toArray()) as Match[]

    if (!matches || matches.length === 0) {
      return { success: false, error: "Matches not found" }
    }
    return { success: true, data: matches }
  } catch (error) {
    let errorMessage = "An unknown error occurred"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return { success: false, error: errorMessage }
  }
}

import { InhouseLeaguePlayer } from "@/types/Leaderboard"

export async function getTopLeaguePlayers(limit = 15): Promise<InhouseLeaguePlayer[]> {
  const client = await clientPromise

  const collection = client.db("match_service").collection<InhouseLeaguePlayer>("league")

  const top = await collection
    .aggregate<InhouseLeaguePlayer>([
      {
        $project: {
          _id: 0,
          puuid: 1,
          riotIdGameName: 1,
          riotIdTagline: 1,
          pointHistory: 1,
          gamesPlayed: 1,
          gamesWon: 1,
          gamesLost: 1,
          lastPlayedAt: 1,
          recentChampionNames: 1,
          totalPoints: { $sum: "$pointHistory" },
        },
      },
      { $sort: { totalPoints: -1, lastPlayedAt: 1 } },
      { $limit: limit },
    ])
    .toArray()

  return top
}
