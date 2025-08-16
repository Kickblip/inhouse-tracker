import { PlayerProfile } from "@/types/Player"
import { getProfile, getProfileSlugs } from "./actions"
import { notFound } from "next/navigation"
import Image from "next/image"
import ProfileMatchesRow from "./components/ProfileMatchesRow"
import { Metadata } from "next"
import ProfileOverview from "./components/ProfileOverview"

export async function generateMetadata({ params }: { params: Promise<{ puuid: string }> }): Promise<Metadata> {
  const { puuid } = await params
  const response = await getProfile(puuid)
  const profile = response.data

  if (!response.success || !profile) {
    return {
      title: "Profile not found",
    }
  }

  return {
    title: `${profile.riotIdGameName} | Inhouse Tracker`,
    description: `${profile.riotIdGameName} profile`,
  }
}

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
    <div className="flex flex-col max-w-5xl w-full mx-auto font-[family-name:var(--font-geist-sans)] gap-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/profileicon/${profile.profileIcon}.png`}
            alt=""
            width={80}
            height={80}
            className="hidden md:block rounded-lg"
          />
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/profileicon/${profile.profileIcon}.png`}
            alt=""
            width={55}
            height={55}
            className="md:hidden rounded-lg"
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
        <h2 className="text-xl md:text-4xl font-semibold">
          {profile.riotIdGameName} <span className="text-xl font-semibold text-white/80">#{profile.riotIdTagline}</span>
        </h2>
      </div>
      <div className="min-h-[70vh] flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-1/4">
          <ProfileOverview profile={profile} />
        </div>
        <div className="w-full md:w-3/4 flex flex-col gap-2">
          {profile.matches.map((match, idx) => (
            <ProfileMatchesRow key={idx} match={match} />
          ))}
        </div>
      </div>
    </div>
  )
}
