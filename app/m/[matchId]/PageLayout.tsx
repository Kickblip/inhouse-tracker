"use client"

import { Match, ParticipantPerformanceFull } from "@/types/Match"
import Participant from "./components/Participant"
import TeamHeader from "./components/TeamHeader"
import ExpandedParticipant from "./components/ExpandedParticipant"
import { useState } from "react"

export default function PageLayout({ match }: { match: Match }) {
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantPerformanceFull | null>(null)

  const team1 = match.participants.slice(0, match.participants.length / 2)
  const team2 = match.participants.slice(match.participants.length / 2)

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-cols-2 gap-1">
        <div className="flex flex-col gap-1">
          <TeamHeader match={match} orientation="left" />
          {team1.map((participant) => (
            <div key={participant.participantId} onClick={() => setSelectedParticipant(participant)} className="cursor-pointer">
              <Participant participant={participant} gameLength={match.timestamps.gameDuration} orientation="left" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <TeamHeader match={match} orientation="right" />
          {team2.map((participant) => (
            <div key={participant.participantId} onClick={() => setSelectedParticipant(participant)} className="cursor-pointer">
              <Participant participant={participant} gameLength={match.timestamps.gameDuration} orientation="right" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <ExpandedParticipant participant={selectedParticipant} />
      </div>
    </div>
  )
}
