import { Match } from "@/types/Match"
import { secondsToDurationString } from "../actions"
import Image from "next/image"

export default function TeamHeader({ match, orientation }: { match: Match; orientation: "left" | "right" }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className={`text-2xl font-semibold ${match.participants[0].win ? "text-blue-400" : "text-red-400"}`}>
        {match.participants[0].win ? "Victory" : "Defeat"}{" "}
        <span className="text-white text-sm font-medium opacity-80">({orientation === "left" ? "Blue" : "Red"} Side)</span>
      </h2>
      <div className="flex items-center gap-1">
        <Image src="/game-resources/objectives/atakhan.png" alt="" className="invert" width={20} height={20} />
        <Image src="/game-resources/objectives/baron.png" alt="" className="invert" width={20} height={20} />
        <Image src="/game-resources/objectives/grub.png" alt="" className="invert" width={20} height={20} />
        <Image src="/game-resources/objectives/herald.png" alt="" className="invert" width={20} height={20} />
        <Image src="/game-resources/objectives/inhibitor.png" alt="" className="invert" width={20} height={20} />
        <Image src="/game-resources/objectives/tower.png" alt="" className="invert" width={20} height={20} />
        <Image src="/game-resources/objectives/dragon.png" alt="" className="invert" width={20} height={20} />
        <Image src="/game-resources/objectives/elder.png" alt="" className="invert" width={20} height={20} />
      </div>
      {orientation === "right" && (
        <h3 className="text-2xl font-semibold">{secondsToDurationString(match.timestamps.gameDuration)}</h3>
      )}
    </div>
  )
}
