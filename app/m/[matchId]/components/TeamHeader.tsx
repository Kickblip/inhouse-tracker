import { Match } from "@/types/Match"
import Image from "next/image"

export const secondsToDurationString = (raw: number) => {
  const m = Math.floor(raw / 60)
  const s = raw % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function TeamHeader({ match, orientation }: { match: Match; orientation: "left" | "right" }) {
  const objectives = orientation === "left" ? match.teams[0].objectives : match.teams[1].objectives
  const objectivesList = [
    { icon: "/game-resources/objectives/tower.png", count: objectives.tower.kills },
    { icon: "/game-resources/objectives/inhibitor.png", count: objectives.inhibitor.kills },
    { icon: "/game-resources/objectives/grub.png", count: objectives.horde.kills },
    { icon: "/game-resources/objectives/herald.png", count: objectives.riftHerald.kills },
    { icon: "/game-resources/objectives/dragon.png", count: objectives.dragon.kills },
    { icon: "/game-resources/objectives/atakhan.png", count: objectives.atakhan.kills },
    { icon: "/game-resources/objectives/baron.png", count: objectives.baron.kills },
  ]
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4">
        <h2
          className={`text-2xl font-semibold ${
            orientation === "left"
              ? match.teams[0].win
                ? "text-blue-400"
                : "text-red-400"
              : match.teams[1].win
              ? "text-blue-400"
              : "text-red-400"
          }`}
        >
          {orientation === "left" ? (match.teams[0].win ? "Victory" : "Defeat") : match.teams[1].win ? "Victory" : "Defeat"}{" "}
          <span className="text-white text-sm font-medium opacity-80">({orientation === "left" ? "Blue" : "Red"} Side)</span>
        </h2>

        <div className="flex items-center gap-3">
          {objectivesList.map((objective, index) => (
            <div key={index} className="flex items-center gap-1">
              <Image src={objective.icon} alt="" className="invert" width={18} height={18} />
              <span className="text-sm font-semibold">{objective.count}</span>
            </div>
          ))}
        </div>
      </div>
      {orientation === "right" && (
        <h3 className="text-2xl font-semibold">{secondsToDurationString(match.timestamps.gameDuration)}</h3>
      )}

      {(orientation === "right" && match.gameEndedInSurrender) ||
        (match.gameEndedInSurrender && (
          <div className="text-xs font-semibold rounded bg-yellow-700 px-2 py-1 text-white mr-2">Ended in Surrender</div>
        ))}
    </div>
  )
}
