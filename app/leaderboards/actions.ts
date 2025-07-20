"use server"

import { DbMatch } from "@/types/Match"
import { Leaderboards } from "@/types/Leaderboard"
import clientPromise from "@/lib/mongodb"

/**
 * Builds leaderboards.
 * @param limitPerBoard  How many rows to keep for each board (default 15).
 */
export async function getRankings(limitPerBoard = 15): Promise<Leaderboards> {
  const mongodb = await clientPromise
  const matches = mongodb.db("match_service").collection<DbMatch>("matches")

  const pipeline = [
    { $unwind: "$participants" },

    {
      $project: {
        puuid: "$participants.puuid",
        matchId: "$matchId",
        riotIdGameName: "$participants.riotIdGameName",
        riotIdTagline: "$participants.riotIdTagline",
        profileIcon: "$participants.profileIcon",
        championName: "$participants.championName",
        summonerLevel: "$participants.summonerLevel",
        kills: "$participants.kills",
        deaths: "$participants.deaths",
        assists: "$participants.assists",
        createdAt: "$timestamps.gameEndTimestamp",
      },
    },

    {
      $facet: {
        kills: [
          { $sort: { kills: -1, createdAt: -1 } },
          { $limit: limitPerBoard },
          {
            $project: {
              _id: 0,
              puuid: 1,
              matchId: 1,
              riotIdGameName: 1,
              riotIdTagline: 1,
              profileIcon: 1,
              championName: 1,
              summonerLevel: 1,
              createdAt: 1,
              value: "$kills",
            },
          },
        ],
        deaths: [
          { $sort: { deaths: -1, createdAt: -1 } },
          { $limit: limitPerBoard },
          {
            $project: {
              _id: 0,
              puuid: 1,
              matchId: 1,
              riotIdGameName: 1,
              riotIdTagline: 1,
              profileIcon: 1,
              championName: 1,
              summonerLevel: 1,
              createdAt: 1,
              value: "$deaths",
            },
          },
        ],
        assists: [
          { $sort: { assists: -1, createdAt: -1 } },
          { $limit: limitPerBoard },
          {
            $project: {
              _id: 0,
              puuid: 1,
              matchId: 1,
              riotIdGameName: 1,
              riotIdTagline: 1,
              profileIcon: 1,
              championName: 1,
              summonerLevel: 1,
              createdAt: 1,
              value: "$assists",
            },
          },
        ],
      },
    },
  ]

  const [result] = await matches.aggregate<Leaderboards>(pipeline).toArray()
  return result ?? { kills: [], deaths: [], assists: [] }
}
