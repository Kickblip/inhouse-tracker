import { GiSkullCrack, GiDesertSkull, GiDaemonSkull, GiCrownedSkull } from "react-icons/gi"

export default function KillStreakWidget({
  doubles,
  triples,
  quadras,
  pentas,
}: {
  doubles: number
  triples: number
  quadras: number
  pentas: number
}) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-1 bg-slate-950 rounded px-4 py-1">
        <GiSkullCrack className="" /> <p className="font-semibold text-sm">{doubles}</p>
      </div>

      <div className="flex items-center gap-1 bg-slate-950 rounded px-4 py-1">
        <GiDesertSkull className="" /> <p className="font-semibold text-sm">{triples}</p>
      </div>

      <div className="flex items-center gap-1 bg-slate-950 rounded px-4 py-1">
        <GiDaemonSkull className="" /> <p className="font-semibold text-sm">{quadras}</p>
      </div>

      <div className="flex items-center gap-1 bg-slate-950 rounded px-4 py-1">
        <GiCrownedSkull className="" /> <p className="font-semibold text-sm">{pentas}</p>
      </div>
    </div>
  )
}
