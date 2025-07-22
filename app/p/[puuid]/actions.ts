"use server"

import clientPromise from "@/lib/mongodb"
import { DbMatch, ParticipantPerformanceFull } from "@/types/Match"
import { PlayerProfile, PlayerMatchSummary } from "@/types/Player"

export async function getProfileSlugs() {
  try {
    const mongodb = await clientPromise
    const collection = mongodb.db("match_service").collection<DbMatch>("matches")

    const puuids: string[] = await collection.distinct("participants.puuid")

    if (puuids.length === 0) {
      return { success: false, error: "No players found" }
    }

    const slugs = puuids.map((p) => ({ puuid: p }))

    return { success: true, data: slugs }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function getProfile(puuid: string) {
  try {
    const mongodb = await clientPromise
    const collection = mongodb.db("match_service").collection<DbMatch>("matches")

    const matches = await collection
      .find({ "participants.puuid": puuid })
      .sort({ "timestamps.gameCreation": -1 })
      .project({
        _id: 0,
        matchId: 1,
        gameMode: 1,
        "timestamps.gameCreation": 1,
        "timestamps.gameDuration": 1,
        participants: 1,
      })
      .toArray()

    if (matches.length === 0) {
      return { success: false, error: "No matches for that player" }
    }

    const me = matches[0].participants.find((p: ParticipantPerformanceFull) => p.puuid === puuid) as ParticipantPerformanceFull

    const matchSummaries: PlayerMatchSummary[] = matches.map((m) => {
      const p = (m.participants as ParticipantPerformanceFull[]).find((pp) => pp.puuid === puuid)!
      return {
        matchId: m.matchId,
        gameMode: m.gameMode,
        gameCreation: m.timestamps.gameCreation,
        gameDuration: m.timestamps.gameDuration,
        win: p.win,
        kills: p.kills,
        deaths: p.deaths,
        assists: p.assists,
        kda: p.kda,
        item0: p.item0,
        item1: p.item1,
        item2: p.item2,
        item3: p.item3,
        item4: p.item4,
        item5: p.item5,
        item6: p.item6,
        championName: p.championName,
        championLevel: p.championLevel,
        totalMinionsKilled: p.totalMinionsKilled,
        neutralMinionsKilled: p.neutralMinionsKilled,
        totalDamageDealtToChampions: p.totalDamageDealtToChampions,
        visionScore: p.visionScore,
        summoner1Id: p.fun.summoner1Id,
        summoner2Id: p.fun.summoner2Id,
        trueDamageDealtToChampions: p.damage.trueDamageDealtToChampions,
        magicDamageDealtToChampions: p.damage.magicDamageDealtToChampions,
        physicalDamageDealtToChampions: p.damage.physicalDamageDealtToChampions,
      }
    })

    const profile: PlayerProfile = {
      puuid,
      riotIdGameName: me.riotIdGameName,
      riotIdTagline: me.riotIdTagline,
      summonerLevel: me.summonerLevel,
      profileIcon: me.profileIcon,
      matches: matchSummaries,
    }

    return { success: true, data: profile }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
