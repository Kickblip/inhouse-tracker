import Image from "next/image"
import Link from "next/link"

export default function InhouseCompetitor({
  playerName,
  gamesWon,
  gamesLost,
  points,
}: {
  playerName: string
  gamesWon: number
  gamesLost: number
  points: number
}) {
  return (
    <div
      className="relative w-full h-[200px] rounded-lg 
        bg-gradient-to-br from-slate-950 via-slate-950 to-orange-800 bg-[position:_40%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-300
        group hover:scale-102"
    >
      <span
        className="absolute inset-y-0 left-6 flex items-center
          text-[12rem] leading-none font-extrabold text-orange-500/30
          pointer-events-none select-none z-0 translate-y-[5%]"
      >
        3
      </span>

      <Link href="/ionia">
        <Image
          src="/champion-resources/regions/noxus-city.png"
          alt=""
          fill
          className="object-cover select-none pointer-events-none opacity-40 rounded-lg"
          priority
        />

        <Image
          src="/champion-resources/renders/rengar.png"
          alt=""
          width={640 * 0.7}
          height={378 * 0.7}
          className="absolute bottom-0 right-0 pointer-events-none select-none z-20 
            [mask-image:linear-gradient(to_right,transparent_0%,black_40%,black_100%)]
            [--webkit-mask-image:linear-gradient(to_right,transparent_0%,black_40%,black_100%)]
            group-hover:scale-103 transition-transform duration-300"
          priority
        />

        <div className="absolute top-0 left-0 py-3 px-8 text-left text-white select-none">
          <div className="flex gap-8 items-center ml-1">
            <div className="flex flex-col">
              <p className="opacity-70 text-sm font-bold">Winrate</p>
              <h2 className="text-2xl font-extrabold">{((gamesWon / (gamesWon + gamesLost)) * 100 || 0).toFixed(0)}%</h2>
            </div>
            <div className="flex flex-col">
              <p className="opacity-70 text-sm font-bold">Played</p>
              <h2 className="text-2xl font-extrabold">{gamesWon + gamesLost}</h2>
            </div>
            <div className="flex flex-col">
              <p className="opacity-70 text-sm font-bold">MMR</p>
              <h2 className="text-2xl font-extrabold">{points}</h2>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 py-3 px-8 font-[family-name:var(--font-geist-sans)] text-left select-none">
          <h2 className="opacity-70 text-lg font-bold ml-1">Inhouse Competitor</h2>
          <h3 className="text-7xl font-extrabold">{playerName}</h3>
        </div>
      </Link>
    </div>
  )
}
