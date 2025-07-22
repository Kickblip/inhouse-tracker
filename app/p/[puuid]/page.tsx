import { PlayerProfile } from "@/types/Player"
import { getProfile, getProfileSlugs } from "./actions"
import { notFound } from "next/navigation"
import Image from "next/image"
import ProfileMatchesRow from "./components/ProfileMatchesRow"

export async function generateStaticParams() {
  const response = await getProfileSlugs()

  if (!response.success || !response.data) {
    return []
  }

  const profiles = response.data
  return profiles.map((profile) => ({
    puuid: profile.puuid,
  }))
}

export default async function MatchPage({ params }: { params: Promise<{ puuid: string }> }) {
  const { puuid } = await params
  const response = await getProfile(puuid)
  const profile = response.data as PlayerProfile

  if (!response.success || !profile) {
    notFound()
  }

  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto font-[family-name:var(--font-geist-sans)] gap-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/profileicon/${profile.profileIcon}.png`}
            alt=""
            width={80}
            height={80}
            className="rounded-lg"
          />
          <div
            className="
              absolute bottom-0 left-1/2
              -translate-x-1/2 translate-y-1/2
              px-3 py-0.5 flex items-center justify-center
              text-xs font-bold text-white
              bg-slate-950 rounded shadow
            "
          >
            {profile.summonerLevel}
          </div>
        </div>
        <h2 className="text-4xl font-semibold">
          {profile.riotIdGameName} <span className="text-xl font-semibold text-white/80">#{profile.riotIdTagline}</span>
        </h2>
      </div>
      <div className="flex gap-4">
        <div className="w-1/4 bg-slate-800 rounded-lg p-4"></div>
        <div className="w-3/4 rounded-lg flex flex-col gap-2 bg-slate-950 py-2 px-4">
          {profile.matches.map((match, idx) => (
            <ProfileMatchesRow key={idx} match={match} />
          ))}
        </div>
      </div>
    </div>
  )
}
