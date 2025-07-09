import { Match } from "@/types/Match"
import { secondsToDurationString } from "../actions"

export default function TeamHeader({ match }: { match: Match }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className={`text-2xl font-semibold ${match.participants[0].win ? "text-blue-400" : "text-red-400"}`}>
        {match.participants[0].win ? "Victory" : "Defeat"}{" "}
        <span className="text-white text-sm font-medium opacity-80">(Blue Side)</span>
      </h2>
      <h3 className="text-2xl font-semibold">{secondsToDurationString(match.timestamps.gameDuration)}</h3>
    </div>
  )
}
