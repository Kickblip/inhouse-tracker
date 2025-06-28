import Image from "next/image"

export function MatchupLine({
  BluePlayer,
  RedPlayer,
  BluePlayerKDA,
  RedPlayerKDA,
  BlueChampion,
  RedChampion,
}: {
  BluePlayer: string
  RedPlayer: string
  BluePlayerKDA: number[]
  RedPlayerKDA: number[]
  BlueChampion: string
  RedChampion: string
}) {
  return (
    <div className="flex h-1/5 items-center text-sm">
      <div className="flex flex-1 flex-col text-right pr-3">
        <p className="font-semibold truncate">{BluePlayer}</p>
        <p className="opacity-80">{BluePlayerKDA.join("/")}</p>
      </div>
      <div className="flex items-center gap-2 flex-none">
        <Image src={`/champion-resources/squares/${BlueChampion}Square.webp`} alt="" width={40} height={40} />
        <Image src={`/champion-resources/squares/${RedChampion}Square.webp`} alt="" width={40} height={40} />
      </div>
      <div className="flex flex-1 flex-col text-left pl-3">
        <p className="font-semibold truncate">{RedPlayer}</p>
        <p className="opacity-80">{RedPlayerKDA.join("/")}</p>
      </div>
    </div>
  )
}

export default function RecentlyAddedGame() {
  return (
    <div
      className="
        relative w-full h-80 rounded-lg bg-slate-900/50
        before:absolute before:inset-y-0 before:left-0 before:w-2
        before:rounded-l before:bg-blue-500 before:content-['']
        after:absolute after:inset-y-0 after:right-0 after:w-2
        after:rounded-r after:bg-red-500 after:content-['']
       
       
        "
    >
      <div className="py-3 px-6 flex flex-col gap-2 h-full">
        <div className="flex item-center justify-between text-sm">
          <h2 className="font-bold">Recent Game</h2>
          <p className="opacity-80">2 hours ago</p>
        </div>
        <div className="h-full">
          <MatchupLine
            BluePlayer="Player1"
            RedPlayer="Player2"
            BluePlayerKDA={[10, 12, 2]}
            RedPlayerKDA={[4, 2, 4]}
            BlueChampion="Aatrox"
            RedChampion="Ahri"
          />
          <MatchupLine
            BluePlayer="Player3"
            RedPlayer="Player4"
            BluePlayerKDA={[8, 1, 1]}
            RedPlayerKDA={[5, 3, 2]}
            BlueChampion="Akali"
            RedChampion="Akshan"
          />
          <MatchupLine
            BluePlayer="Player5"
            RedPlayer="Player6"
            BluePlayerKDA={[3, 2, 1]}
            RedPlayerKDA={[3, 5, 2]}
            BlueChampion="Alistar"
            RedChampion="Ambessa"
          />
          <MatchupLine
            BluePlayer="Player7"
            RedPlayer="Player8"
            BluePlayerKDA={[15, 0, 0]}
            RedPlayerKDA={[15, 5, 0]}
            BlueChampion="Amumu"
            RedChampion="Anivia"
          />
          <MatchupLine
            BluePlayer="Player9"
            RedPlayer="Player10"
            BluePlayerKDA={[15, 0, 0]}
            RedPlayerKDA={[15, 5, 0]}
            BlueChampion="Annie"
            RedChampion="Aphelios"
          />
        </div>
      </div>
    </div>
  )
}
