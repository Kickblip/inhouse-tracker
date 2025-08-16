import Image from "next/image"
import Link from "next/link"

export default function InhouseLeagueLeaderboardRow({
  puuid,
  rank,
  playerName,
  mmr,
  winrate,
  gamesPlayed,
  champion,
}: {
  puuid: string
  rank: number
  playerName: string
  mmr: number
  winrate: string
  gamesPlayed: number
  champion: string
}) {
  return (
    <Link
      href={`/p/${puuid.substring(0, 14)}`}
      className="w-full rounded-lg bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950
                bg-[position:_40%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-300
                flex items-center justify-between py-3 px-4"
    >
      <div className="flex items-center gap-4">
        <p className="opacity-60 font-bold text-md md:text-xl">{rank}</p>
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/champion/${champion}.png`}
          alt=""
          width={35}
          height={35}
          className="rounded-lg"
        />
        <h2 className="font-semibold text-sm md:text-lg truncate">{playerName}</h2>
      </div>
      <div className="flex items-center gap-6">
        <p className="hidden md:block font-bold text-xs md:text-lg">
          {gamesPlayed}
          <span className="opacity-60 font-semibold text-sm ml-1">PLAYED</span>
        </p>

        <p className="font-bold text-xs md:text-lg">
          {winrate}% <span className="opacity-60 font-semibold text-sm">WR</span>
        </p>

        <p className="font-bold text-xs md:text-lg">
          {mmr} <span className="opacity-60 font-semibold text-sm">MMR</span>
        </p>
      </div>
    </Link>
  )
}
