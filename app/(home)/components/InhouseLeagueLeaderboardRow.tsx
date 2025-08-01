import Image from "next/image"

export default function InhouseLeagueLeaderboardRow({
  rank,
  playerName,
  mmr,
  winrate,
  gamesPlayed,
  champion,
}: {
  rank: number
  playerName: string
  mmr: number
  winrate: string
  gamesPlayed: number
  champion: string
}) {
  return (
    <div
      className="w-full rounded-lg bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950
                bg-[position:_40%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-300"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <p className="opacity-60 font-bold text-xl">{rank}</p>
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/champion/${champion}.png`}
            alt=""
            width={35}
            height={35}
            className="rounded-lg"
          />
          <h2 className="font-bold text-lg truncate">{playerName}</h2>
        </div>
        <div className="flex items-center gap-6">
          <p className="font-bold text-lg">
            {gamesPlayed}
            <span className="opacity-60 font-semibold text-sm ml-1">PLAYED</span>
          </p>

          <p className="font-bold text-lg">
            {winrate}% <span className="opacity-60 font-semibold text-sm">WR</span>
          </p>

          <p className="font-bold text-lg">
            {mmr} <span className="opacity-60 font-semibold text-sm">MMR</span>
          </p>
        </div>
      </div>
    </div>
  )
}
