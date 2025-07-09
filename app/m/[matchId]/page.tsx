import { Match } from "@/types/Match"
import { getMatch, getMatchSlugs } from "./actions"
import { notFound } from "next/navigation"
import Participant from "./components/Participant"
import TeamHeader from "./components/TeamHeader"
import ExpandedParticipant from "./components/ExpandedParticipant"

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

export default async function MatchPage({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params
  const response = await getMatch(matchId)
  const match = response.data as Match

  if (!response.success || !match) {
    notFound()
  }

  const team1 = match.participants.slice(0, match.participants.length / 2)
  const team2 = match.participants.slice(match.participants.length / 2)

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-cols-2 gap-1">
        <div className="flex flex-col gap-1">
          <TeamHeader match={match} />
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
          <TeamHeader match={match} />
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
      <div className="mt-1">
        <ExpandedParticipant participant={match.participants[0]} />
      </div>
    </div>
  )
}
