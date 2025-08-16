import Image from "next/image"
import { LeaderboardEntry } from "@/types/Leaderboard"
import Link from "next/link"

export default function PodiumPosition({ rank, entry, statLabel }: { rank: number; entry: LeaderboardEntry; statLabel: string }) {
  return (
    <div
      className={`flex flex-col h-32 md:h-96 relative rounded-lg bg-gradient-to-br from-slate-950 via-slate-950
        to-orange-800 bg-[position:_40%_0%] bg-gradient-to-br from-yellow-700 to-yellow-800
        hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-300 hover:scale-102
        ${rank === 1 ? "w-full md:w-2/4 " : "w-full md:w-1/4"}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${entry.championName}_0.jpg`}
          alt=""
          fill
          priority
          className="object-cover select-none pointer-events-none rounded-lg opacity-70"
        />
      </div>
      <h1 className="z-10 text-transparent font-extrabold font-sans text-9xl bg-white/20 bg-clip-text px-4">{rank}</h1>

      <div className="flex w-full flex-col absolute bottom-0 left-0 p-4">
        <h2 className="text-lg text-white/70 font-semibold">
          {entry.value.toLocaleString("en-US")} {statLabel}
        </h2>
        <Link
          href={`/p/${entry.puuid.substring(0, 14)}`}
          className={`font-bold text-wrap break-words ${rank === 1 ? "text-5xl md:text-7xl " : "text-2xl"}`}
        >
          {entry.riotIdGameName}
        </Link>
      </div>
    </div>
  )
}
