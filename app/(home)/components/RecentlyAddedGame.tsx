import { Match } from "@/types/Match"
import Image from "next/image"
import Link from "next/link"

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
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/champion/${BlueChampion}.png`}
          alt={BlueChampion}
          width={40}
          height={40}
        />
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/champion/${RedChampion}.png`}
          alt={RedChampion}
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-1 flex-col text-left pl-3">
        <p className="font-semibold truncate">{RedPlayer}</p>
        <p className="opacity-80">{RedPlayerKDA.join("/")}</p>
      </div>
    </div>
  )
}

function timeAgo(msSinceEpoch: number): string {
  const diffMs = Date.now() - msSinceEpoch

  const seconds = Math.floor(diffMs / 1_000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })

  if (days) return rtf.format(-days, "day") // “2 days ago”
  if (hours) return rtf.format(-hours, "hour") // “an hour ago”
  if (minutes) return rtf.format(-minutes, "minute")
  return rtf.format(-seconds, "second") // “just now”
}

export default function RecentlyAddedGame({ match }: { match: Match }) {
  const team1 = match.participants.slice(0, match.participants.length / 2)
  const team2 = match.participants.slice(match.participants.length / 2)

  return (
    <Link href={`/m/${match.matchId}`} className="cursor-pointer">
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
            <p className="opacity-80">{timeAgo(match.timestamps.gameEndTimestamp)}</p>
          </div>
          <div className="h-full">
            {team1.map((_, idx) => (
              <MatchupLine
                key={idx}
                BluePlayer={team1[idx].riotIdGameName}
                RedPlayer={team2[idx].riotIdGameName}
                BluePlayerKDA={[team1[idx].kills, team1[idx].deaths, team1[idx].assists]}
                RedPlayerKDA={[team2[idx].kills, team2[idx].deaths, team2[idx].assists]}
                BlueChampion={team1[idx].championName}
                RedChampion={team2[idx].championName}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
