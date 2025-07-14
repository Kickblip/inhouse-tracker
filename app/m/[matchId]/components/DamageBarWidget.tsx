const defaultColors = ["bg-blue-900", "bg-red-900", "bg-zinc-100"]

export default function SplitBar({
  magicDamage,
  physicalDamage,
  trueDamage,
}: {
  magicDamage: number
  physicalDamage: number
  trueDamage: number
}) {
  const total = magicDamage + physicalDamage + trueDamage
  const safeTotal = total === 0 ? 1 : total // avoid divide-by-zero

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm font-medium">
        <div className="flex items-center space-x-1">
          <span className={`inline-block h-3 w-3 rounded-sm ${defaultColors[0]}`} />
          <span>{magicDamage}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className={`inline-block h-3 w-3 rounded-sm ${defaultColors[1]}`} />
          <span>{physicalDamage}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className={`inline-block h-3 w-3 rounded-sm ${defaultColors[2]}`} />
          <span>{trueDamage}</span>
        </div>
      </div>

      <div className="flex h-3 w-full overflow-hidden rounded">
        {[magicDamage, physicalDamage, trueDamage].map((v, i) => (
          <div
            key={i}
            className={`${defaultColors[i]} transition-all duration-300`}
            style={{ width: `${(v / safeTotal) * 100}%` }}
          />
        ))}
      </div>
    </div>
  )
}
