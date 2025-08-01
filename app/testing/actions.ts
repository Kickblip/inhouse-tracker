import clientPromise from "@/lib/mongodb"
import { Collection, Db, WithId } from "mongodb"
import { DbMatch, ParticipantPerformanceFull } from "@/types/Match"
import { InhouseLeaguePlayer } from "@/types/Leaderboard"

const DB_NAME = "match_service"
const MATCHES_COL = "matches"
const PLAYERS_COL = "league"

function basePoints(p: ParticipantPerformanceFull) {
  return 5 + (p.win ? 3 : 0)
}

function milestonePoints(p: ParticipantPerformanceFull, minutes: number) {
  let m = 0
  if (p.utility.visionScore >= 60) m++
  if (p.utility.visionScorePerMinute >= 1.5) m++
  if (p.utility.wardsPlaced + p.utility.wardsKilled >= 30) m++
  if (p.utility.saveAllyFromDeath >= 1) m++
  if (p.assists >= 25) m++
  if (p.fun.controlWardsPlaced >= 5) m++

  if (p.jungling.riftHeraldTakedowns >= 1) m++
  if (p.jungling.initialBuffCount >= 3) m++
  if (p.jungling.scuttleCrabKills >= 4) m++
  if (p.jungling.objectivesStolen >= 1 || p.jungling.epicMonsterSteals >= 1) m++

  if (p.structures.turretPlatesTaken >= 3) m++

  if (p.kda >= 5) m++
  if (p.deaths <= 1) m++
  if (p.combat.pentaKills >= 1) m++
  if (p.combat.soloKills >= 2) m++
  if ((p.totalMinionsKilled + p.neutralMinionsKilled) / minutes >= 8) m++
  if (p.laning.firstBloodKill || p.laning.firstBloodAssist) m++
  return m
}

export async function buildInhouseLeaguePlayers() {
  const client = await clientPromise
  const db: Db = client.db(DB_NAME)

  const matches: Collection<DbMatch> = db.collection(MATCHES_COL)
  const players: Collection<InhouseLeaguePlayer> = db.collection(PLAYERS_COL)

  const cursor = matches.find<WithId<DbMatch>>({}, { projection: { _id: 0 } })

  let processed = 0
  while (await cursor.hasNext()) {
    const match = await cursor.next()
    if (!match) continue

    const matchId = match.matchId
    const endDate = new Date(match.timestamps.gameEndTimestamp ?? match.timestamps.gameCreation)
    const minutes = match.timestamps.gameDuration / 60

    for (const p of match.participants as ParticipantPerformanceFull[]) {
      const pointsEarned = (basePoints(p) + milestonePoints(p, minutes)) * 10

      await players.updateOne(
        { puuid: p.puuid },
        [
          {
            $set: {
              puuid: p.puuid,
              riotIdGameName: p.riotIdGameName,
              riotIdTagline: p.riotIdTagline,
            },
          },

          {
            $set: {
              pointHistory: {
                $concatArrays: [{ $ifNull: ["$pointHistory", []] }, [pointsEarned]],
              },
              recentMatches: {
                $concatArrays: [{ $ifNull: ["$recentMatches", []] }, [matchId]],
              },
              recentChampionNames: {
                $concatArrays: [{ $ifNull: ["$recentChampionNames", []] }, [p.championName]],
              },
            },
          },

          {
            $set: {
              gamesPlayed: { $add: [{ $ifNull: ["$gamesPlayed", 0] }, 1] },
              gamesWon: { $add: [{ $ifNull: ["$gamesWon", 0] }, p.win ? 1 : 0] },
              gamesLost: { $add: [{ $ifNull: ["$gamesLost", 0] }, p.win ? 0 : 1] },
              lastPlayedAt: endDate,
            },
          },
        ],
        { upsert: true },
      )
    }

    if (++processed % 500 === 0) console.log(`Processed ${processed} matches…`)
  }

  console.log(`✅ Done - processed ${processed} matches.`)
  await client.close()
}
