import Image from "next/image"
import { LeaderboardEntry } from "@/types/Leaderboard"

export default function LeaderboardRow({ rank, entry, statLabel }: { rank: number; entry: LeaderboardEntry; statLabel: string }) {
  return (
    <div
      className="flex items-center justify-between py-2 px-16 w-full rounded-lg bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950
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

        <p className="truncate">
          {entry.riotIdGameName}
          <span className="ml-0.5 text-gray-400 text-xs">#{entry.riotIdTagline}</span>
        </p>
      </div>

      <div className="flex items-center gap-12">
        <p className="font-medium">
          {entry.value.toLocaleString("en-US")} <span className="text-white/60 text-sm">{statLabel}</span>
        </p>
        <p className="text-white/60 text-sm">
          {new Date(entry.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  )
}
