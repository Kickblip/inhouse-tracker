import Image from "next/image"

import { ParticipantPerformanceFull } from "@/types/Match"

export default function ExpandedParticipant({ participant }: { participant: ParticipantPerformanceFull | null }) {
  if (!participant) {
    return (
      <div className="h-96 w-full bg-slate-950 rounded-lg flex flex-col gap-2 mx-auto justify-center items-center font-[family-name:var(--font-geist-sans)]">
        <Image src="/404.png" alt="" width={100} height={100} />
        <p className="text-xs opacity-70">Click a player above to get more info</p>
      </div>
    )
  }

  return (
    <div className="h-96 flex w-full bg-slate-950 rounded-lg">
      <div className="flex">
        <div className="relative">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/profileicon/${participant.profileIcon}.png`}
            alt=""
            width={80}
            height={80}
            className="rounded"
          />
          <div
            className="absolute bottom-0 -mb-1
                    w-5 h-5 flex items-center justify-center
                    text-xs font-bold text-white
                    bg-slate-950 rounded"
          >
            {participant.summonerLevel}
          </div>

          <h1 className="text-lg font-semibold text-white p-4">
            {participant.riotIdGameName} #{participant.riotIdTagline}
          </h1>
        </div>
      </div>
    </div>
  )
}
