import { MatchMetadata, ParticipantPerformancePreview } from "@/types/Match"

export default function RecentGame({ match }: { match: MatchMetadata }) {
  const secondsToDurationString = (raw: number) => {
    const m = Math.floor(raw / 60)
    const s = raw % 60
    return `${m}:${s.toString().padStart(2, "0")}`
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

  const gameDate = timeAgo(match.timestamps.gameStartTimestamp)

  const teams: Record<number, ParticipantPerformancePreview[]> = match.participants.reduce((acc, p) => {
    ;(acc[p.teamId] = acc[p.teamId] || []).push(p)
    return acc
  }, {} as Record<number, ParticipantPerformancePreview[]>)

  return (
    <div
      className="
        relative w-full rounded-lg bg-slate-900/50
        before:absolute before:inset-y-0 before:left-0 before:w-2
        before:rounded-l before:bg-blue-500 before:content-['']
        after:absolute after:inset-y-0 after:right-0 after:w-2
        after:rounded-r after:bg-red-500 after:content-['']
        "
    >
      <div className="p-6 flex flex-col gap-2">
        <div className="mb-4 flex flex-col gap-1 flex-row items-center justify-between">
          <div>
            <h2 className="font-semibold">{match.gameMode}</h2>
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-400">{gameDate}</p>
              {match.gameEndedInSurrender && (
                <span className="rounded bg-yellow-600/20 px-2 text-xs font-medium text-yellow-300">Surrender</span>
              )}
            </div>
          </div>
          <div>
            <h2 className="font-semibold">{secondsToDurationString(match.timestamps.gameDuration)}</h2>
            <p className="text-xs text-slate-400">Duration</p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2">
          {Object.entries(teams).map(([teamId, players]) => (
            <div key={teamId}>
              <div className="space-y-1">
                {players.map((p) => (
                  <div key={p.participantId} className="flex items-center justify-between rounded bg-slate-800 px-2 py-1 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-bold">{p.riotIdGameName}</span>
                      <span className="opacity-70">{p.championName}</span>
                    </div>

                    <div className="flex gap-3">
                      <span className="font-bold">
                        {p.kills}/{p.deaths}/{p.assists}
                      </span>
                      <span className="opacity-70">{p.totalMinionsKilled} CS</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
