"use client"

import { useMemo, useState } from "react"
import { LeaderboardEntry, Leaderboards } from "@/types/Leaderboard"
import Image from "next/image"
import Error from "../shared/Error"

export default function LeaderboardsLayout({ rankings }: { rankings: Leaderboards }) {
  const categories = useMemo(() => Object.keys(rankings) as (keyof Leaderboards)[], [rankings])

  const [activeTab, setActiveTab] = useState<keyof Leaderboards>(categories[0])

  const rows = rankings[activeTab]

  return (
    <div className="w-full grid grid-cols-[1fr_2fr]">
      <div className="w-full rounded-lg bg-slate-950 flex flex-col">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(cat)}
            className={`text-sm font-medium capitalize ${activeTab === cat ? "text-blue-600" : "text-gray-500"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <PodiumPosition rank={1} entry={rows[0]} statLabel={activeTab} />
          <PodiumPosition rank={2} entry={rows[1]} statLabel={activeTab} />
          <PodiumPosition rank={3} entry={rows[2]} statLabel={activeTab} />
        </div>

        <ul className="w-full flex flex-col gap-1.5">
          {rows.slice(3).map((entry, idx) => (
            <LeaderboardRow key={idx} rank={idx + 4} entry={entry} statLabel={activeTab} />
          ))}

          {rows.length === 0 && <Error error={null} />}
        </ul>
      </div>
    </div>
  )
}

function PodiumPosition({ rank, entry, statLabel }: { rank: number; entry: LeaderboardEntry; statLabel: string }) {
  return (
    <div
      className="flex flex-col w-full h-96 relative rounded-lg
        bg-gradient-to-br from-slate-950 via-slate-950 to-orange-800 bg-[position:_40%_0%]
        hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-300 hover:scale-102"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${entry.championName}_0.jpg`}
          alt=""
          fill
          priority
          className="object-cover select-none pointer-events-none rounded-lg opacity-60"
        />
      </div>
      <h1 className="z-10 text-transparent font-bold font-sans text-9xl bg-white/20 bg-clip-text px-4">{rank}</h1>

      <div className="flex flex-col absolute bottom-0 left-0 p-4">
        <h2 className="text-lg text-white/70 font-semibold">
          {entry.value} {statLabel}
        </h2>
        <h1 className="text-4xl font-semibold">{entry.riotIdGameName}</h1>
      </div>
    </div>
  )
}

function LeaderboardRow({ rank, entry, statLabel }: { rank: number; entry: LeaderboardEntry; statLabel: string }) {
  return (
    <div
      className="flex items-center justify-between py-2 px-16 w-full rounded-lg bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950
                bg-[position:_40%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <p className="font-semibold w-6">{rank}</p>

        <div className="relative">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/profileicon/${entry.profileIcon}.png`}
            alt=""
            width={32}
            height={32}
            className="rounded-lg"
          />
          <div className="absolute bottom-0 -mb-1 left-0 -ml-1 text-xs font-bold px-0.5 bg-slate-950 rounded">
            {entry.summonerLevel}
          </div>
        </div>

        <p className="truncate font-medium">
          {entry.riotIdGameName}
          <span className="text-gray-400">#{entry.riotIdTagline}</span>
        </p>
      </div>

      <p className="font-semibold">{entry.value.toLocaleString()}</p>
    </div>
  )
}
