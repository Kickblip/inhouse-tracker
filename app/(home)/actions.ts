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
