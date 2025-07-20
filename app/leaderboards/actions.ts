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
      $addFields: {
        kills: "$participants.kills",
        assists: "$participants.assists",
        damage: "$participants.totalDamageDealtToChampions",
        visionScore: "$participants.visionScore",
        missingPings: "$participants.pings.enemyMissingPings",
        cs: {
          $add: [{ $ifNull: ["$participants.totalMinionsKilled", 0] }, { $ifNull: ["$participants.neutralMinionsKilled", 0] }],
        },
        abilityUses: "$participants.fun.abilityUses",
        dancingWithShelly: "$participants.fun.dancedWithRiftHerald",
        largestCrit: "$participants.fun.largestCriticalStrike",
        longestTimeAlive: {
          $dateToString: {
            format: "%M:%S",
            date: {
              $dateAdd: {
                startDate: new Date(0),
                unit: "second",
                amount: "$participants.fun.longestTimeSpentLiving",
              },
            },
            timezone: "UTC",
          },
        },
        buffsStolen: "$participants.fun.buffsStolen",
        healsOnTeammates: "$participants.utility.totalHealsOnTeammates",
        selfMitigatedDamage: "$participants.damage.damageSelfMitigated",
        turretDamage: "$participants.structures.damageDealtToTurrets",
        turretPlates: "$participants.structures.turretPlatesTaken",

        puuid: "$participants.puuid",
        riotIdGameName: "$participants.riotIdGameName",
        riotIdTagline: "$participants.riotIdTagline",
        profileIcon: "$participants.profileIcon",
        championName: "$participants.championName",
        summonerLevel: "$participants.summonerLevel",
        matchId: "$matchId",
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

        damage: [
          { $sort: { damage: -1, createdAt: -1 } },
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
              value: "$damage",
            },
          },
        ],

        CS: [
          { $sort: { cs: -1, createdAt: -1 } },
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
              value: "$cs",
            },
          },
        ],

        vision_score: [
          { $sort: { visionScore: -1, createdAt: -1 } },
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
              value: "$visionScore",
            },
          },
        ],

        missing_pings: [
          { $sort: { missingPings: -1, createdAt: -1 } },
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
              value: "$missingPings",
            },
          },
        ],

        ability_uses: [
          { $sort: { abilityUses: -1, createdAt: -1 } },
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
              value: "$abilityUses",
            },
          },
        ],

        dancing_with_shelly: [
          { $sort: { dancingWithShelly: -1, createdAt: -1 } },
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
              value: "$dancingWithShelly",
            },
          },
        ],

        largest_crit: [
          { $sort: { largestCrit: -1, createdAt: -1 } },
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
              value: "$largestCrit",
            },
          },
        ],

        longest_time_alive: [
          { $sort: { longestTimeAlive: -1, createdAt: -1 } },
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
              value: "$longestTimeAlive",
            },
          },
        ],

        buffs_stolen: [
          { $sort: { buffsStolen: -1, createdAt: -1 } },
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
              value: "$buffsStolen",
            },
          },
        ],

        heals_on_teammates: [
          { $sort: { healsOnTeammates: -1, createdAt: -1 } },
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
              value: "$healsOnTeammates",
            },
          },
        ],

        self_mitigated_damage: [
          { $sort: { selfMitigatedDamage: -1, createdAt: -1 } },
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
              value: "$selfMitigatedDamage",
            },
          },
        ],

        turret_damage: [
          { $sort: { turretDamage: -1, createdAt: -1 } },
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
              value: "$turretDamage",
            },
          },
        ],

        turret_plates: [
          { $sort: { turretPlates: -1, createdAt: -1 } },
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
              value: "$turretPlates",
            },
          },
        ],
      },
    },
  ]

  const [result] = await matches.aggregate<Leaderboards>(pipeline).toArray()
  return (
    result ?? {
      kills: [],
      assists: [],
      damage: [],
      CS: [],
      vision_score: [],
      missing_pings: [],
      ability_uses: [],
      dancing_with_shelly: [],
      largest_crit: [],
      longest_time_alive: [],
      buffs_stolen: [],
      heals_on_teammates: [],
      self_mitigated_damage: [],
      turret_damage: [],
      turret_plates: [],
    }
  )
}
