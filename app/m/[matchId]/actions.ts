import clientPromise from "@/lib/mongodb"
import { DbMatch } from "@/types/Match"

export async function getMatchSlugs() {
  try {
    const mongodb = await clientPromise
    const collection = mongodb.db("match_service").collection<DbMatch>("matches")

    const match_ids = await collection.find({}, { projection: { matchId: 1 } }).toArray()

    if (!match_ids || match_ids.length === 0) {
      return { success: false, error: "No matches found" }
    }

    return { success: true, data: match_ids }
  } catch (error) {
    let errorMessage = "An unknown error occurred"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return { success: false, error: errorMessage }
  }
}

export async function getMatch(match_id: string) {
  try {
    const mongodb = await clientPromise
    const collection = mongodb.db("match_service").collection<DbMatch>("matches")

    const match = await collection.findOne({ matchId: match_id })

    if (!match) {
      return { success: false, error: "Match not found" }
    }
    return { success: true, data: match }
  } catch (error) {
    let errorMessage = "An unknown error occurred"
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return { success: false, error: errorMessage }
  }
}
