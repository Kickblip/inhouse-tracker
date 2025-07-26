import { PlayerProfile } from "@/types/Player"
import Image from "next/image"
import WinrateWheel from "./WinrateWheel"

export function OverviewCell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="w-full bg-slate-950/50 rounded-lg p-2">
      <h3 className="font-semibold text-sm">{label}</h3>
      <div className="mt-2 mb-3">{children}</div>
    </div>
  )
}

export default function ProfileOverview({ profile }: { profile: PlayerProfile }) {
  const matches = profile.matches
  const totalMatches = matches.length

  const totalWins = matches.filter((m) => m.win).length
  const winRate = totalMatches ? (totalWins / totalMatches) * 100 : 0

  // aggreagating KDA stats
  const totals = matches.reduce(
    (acc, m) => {
      acc.kills += m.kills
      acc.deaths += m.deaths
      acc.assists += m.assists
      acc.kdaSum += m.kda
      return acc
    },
    { kills: 0, deaths: 0, assists: 0, kdaSum: 0 },
  )
  const avgKills = totalMatches ? totals.kills / totalMatches : 0
  const avgDeaths = totalMatches ? totals.deaths / totalMatches : 0
  const avgAssists = totalMatches ? totals.assists / totalMatches : 0
  const avgKda = totalMatches ? totals.kdaSum / totalMatches : 0

  // win rate by champion
  const championStats = matches.reduce<Record<string, { wins: number; games: number }>>((acc, m) => {
    if (!acc[m.championName]) {
      acc[m.championName] = { wins: 0, games: 0 }
    }
    acc[m.championName].games += 1
    if (m.win) acc[m.championName].wins += 1
    return acc
  }, {})

  const championEntries = Object.entries(championStats).map(([champion, stats]) => ({
    champion,
    games: stats.games,
    winRate: (stats.wins / stats.games) * 100,
  }))

  return (
    <div className="flex flex-col gap-2">
      <OverviewCell label={`Total Matches: ${totalMatches}`}>
        <div className="flex items-center gap-4">
          <WinrateWheel win={totalWins} lose={totalMatches - totalWins} />
          <div className="flex flex-col">
            <p className="font-semibold">{winRate.toFixed(1)}%</p>
            <p className="text-xs text-white/70">
              {totalWins}/{totalMatches}
            </p>
          </div>
        </div>
      </OverviewCell>

      <OverviewCell label="Average KDA">
        <div className="flex flex-col items-center">
          <p className="font-semibold">{avgKda.toFixed(2)} KDA</p>
          <p className="text-sm text-white/70">
            {avgKills.toFixed(1)}/{avgDeaths.toFixed(1)}/{avgAssists.toFixed(1)}
          </p>
        </div>
      </OverviewCell>

      <OverviewCell label="Win Rate by Champion">
        <ul className="flex flex-col gap-1">
          {championEntries
            .sort((a, b) => b.games - a.games)
            .map(({ champion, games, winRate }) => (
              <li key={champion} className="flex items-center justify-between">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/champion/${champion}.png`}
                  alt=""
                  width={35}
                  height={35}
                  className="rounded"
                />
                <p className="font-medium text-sm">
                  {winRate.toFixed(1)}%{" "}
                  <span className="text-xs text-white/70">
                    ({games} game{games !== 1 ? "s" : ""})
                  </span>
                </p>
              </li>
            ))}
        </ul>
      </OverviewCell>
    </div>
  )
}
