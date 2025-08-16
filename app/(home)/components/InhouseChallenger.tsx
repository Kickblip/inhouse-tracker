import Image from "next/image"
import Link from "next/link"

export default function InhouseChallenger({
  puuid,
  playerName,
  gamesWon,
  gamesLost,
  points,
}: {
  puuid: string
  playerName: string
  gamesWon: number
  gamesLost: number
  points: number
}) {
  return (
    <div
      className="relative w-full h-[180px] md:h-[200px] rounded-lg 
        bg-gradient-to-bl from-slate-950 via-slate-950 to-emerald-800 bg-[position:_100%_100%] hover:bg-[position:_0%_0%] bg-[size:_200%] transition-all duration-300
        group hover:scale-102
    "
    >
      <span
        className="absolute inset-y-0 right-6 flex items-center
          text-[12rem] leading-none font-extrabold text-emerald-500/30
          pointer-events-none select-none z-0 translate-y-[5%]"
      >
        2
      </span>

      <Link href={`/p/${puuid.substring(0, 14)}`}>
        <Image
          src="/champion-resources/regions/jungle-generic.png"
          alt=""
          fill
          className="object-cover select-none pointer-events-none opacity-40 rounded-lg"
          priority
        />

        <Image
          src="/champion-resources/renders/caitlyn.png"
          alt=""
          width={1600 * 0.25}
          height={900 * 0.25}
          className="hidden md:block absolute bottom-0 left-0 pointer-events-none select-none z-20 
            [mask-image:linear-gradient(to_left,transparent_0%,black_40%,black_100%)]
            [--webkit-mask-image:linear-gradient(to_left,transparent_0%,black_40%,black_100%)]
            group-hover:scale-103 transition-transform duration-300"
          priority
        />

        <div className="absolute top-0 right-0 py-3 px-8 text-right text-white select-none">
          <div className="flex gap-8 items-center">
            <div className="flex flex-col">
              <p className="opacity-70 text-sm font-bold">MMR</p>
              <h2 className="text-2xl font-extrabold">{points}</h2>
            </div>
            <div className="flex flex-col">
              <p className="opacity-70 text-sm font-bold">Winrate</p>
              <h2 className="text-2xl font-extrabold">{((gamesWon / (gamesWon + gamesLost)) * 100 || 0).toFixed(0)}%</h2>
            </div>
            <div className="flex flex-col">
              <p className="opacity-70 text-sm font-bold">Played</p>
              <h2 className="text-2xl font-extrabold">{gamesWon + gamesLost}</h2>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 py-3 px-8 font-[family-name:var(--font-geist-sans)] text-right select-none">
          <h2 className="opacity-70 text-lg font-bold">Inhouse Challenger</h2>
          <h3 className="text-3xl md:text-7xl font-extrabold">{playerName}</h3>
        </div>
      </Link>
    </div>
  )
}
