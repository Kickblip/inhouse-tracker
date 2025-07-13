export default function SpellCastsWidget({ casts }: { casts: number[] }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-semibold opacity-70">Total Casts: {casts[0]}</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col items-center rounded-lg w-14 h-14 flex items-center justify-center bg-slate-900">
          <p className="text-lg font-semibold">Q</p>
          <p className="text-sm">{casts[1]}</p>
        </div>
        <div className="flex flex-col items-center rounded-lg w-14 h-14 flex items-center justify-center bg-slate-900">
          <p className="text-lg font-semibold">W</p>
          <p className="text-sm">{casts[2]}</p>
        </div>
        <div className="flex flex-col items-center rounded-lg w-14 h-14 flex items-center justify-center bg-slate-900">
          <p className="text-lg font-semibold">E</p>
          <p className="text-sm">{casts[3]}</p>
        </div>
        <div className="flex flex-col items-center rounded-lg w-14 h-14 flex items-center justify-center bg-slate-900">
          <p className="text-lg font-semibold">R</p>
          <p className="text-sm">{casts[4]}</p>
        </div>
      </div>
    </div>
  )
}
