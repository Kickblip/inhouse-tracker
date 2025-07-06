import { Match } from "@/types/Match"
import { getMatch, getMatchSlugs } from "./actions"
import { notFound } from "next/navigation"
import Participant from "./components/Participant"

export async function generateStaticParams() {
  const response = await getMatchSlugs()

  if (!response.success || !response.data) {
    return []
  }

  const matches = response.data
  return matches.map((match) => ({
    matchId: match.matchId,
  }))
}

const secondsToDurationString = (raw: number) => {
  const m = Math.floor(raw / 60)
  const s = raw % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default async function MatchPage({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params
  const response = await getMatch(matchId)
  const match = response.data as Match

  if (!response.success || !match) {
    notFound()
  }

  const team1 = match.participants.slice(0, match.participants.length / 2)
  const team2 = match.participants.slice(match.participants.length / 2)

  // <div className="flex items-center justify-between">
  //         <h2 className={`text-2xl font-semibold ${match.participants[0].win ? "text-blue-400" : "text-red-400"}`}>
  //           {match.participants[0].win ? "Victory" : "Defeat"}{" "}
  //           <span className="text-white text-sm font-medium opacity-80">(Blue Side)</span>
  //         </h2>
  //         <h3 className="text-2xl font-semibold">{secondsToDurationString(match.timestamps.gameDuration)}</h3>
  //       </div>

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto font-[family-name:var(--font-geist-sans)] grid grid-cols-2 gap-1">
      <div className="flex flex-col gap-1">
        {team1.map((participant) => (
          <Participant
            key={participant.participantId}
            participant={participant}
            gameLength={match.timestamps.gameDuration}
            orientation="left"
          />
        ))}
      </div>

      <div className="flex flex-col gap-1">
        {team2.map((participant) => (
          <Participant
            key={participant.participantId}
            participant={participant}
            gameLength={match.timestamps.gameDuration}
            orientation="right"
          />
        ))}
      </div>
    </div>
  )
}
