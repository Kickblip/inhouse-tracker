export default function Stats({
  totalKills,
  totalDeaths,
  totalAssists,
  totalDamage,
  winratePercentage,
}: {
  totalKills: number
  totalDeaths: number
  totalAssists: number
  totalDamage: number
  winratePercentage: number
}) {
  return (
    <div className="pr-2">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold mb-2">Stats</h2>
        {/* Win Rate */}
        <div className="border p-4 flex items-center justify-between group">
          <div className="border-white border-l-2 pl-2 text-sm group-hover:border-pastel-orange">Win Rate</div>
          <div className="font-bold group-hover:text-pastel-orange">{winratePercentage}%</div>
        </div>

        {/* Kills */}
        <div className="border p-4 flex items-center justify-between group">
          <div className="border-white border-l-2 pl-2 text-sm group-hover:border-pastel-orange">Total Kills</div>
          <div className="font-bold group-hover:text-pastel-orange">{totalKills}</div>
        </div>

        {/* Deaths */}
        <div className="border p-4 flex items-center justify-between group">
          <div className="border-white border-l-2 pl-2 text-sm group-hover:border-pastel-orange">Total Deaths</div>
          <div className="font-bold group-hover:text-pastel-orange">{totalDeaths}</div>
        </div>

        {/* Assists */}
        <div className="border p-4 flex items-center justify-between group">
          <div className="border-white border-l-2 pl-2 text-sm group-hover:border-pastel-orange">Total Assists</div>
          <div className="font-bold group-hover:text-pastel-orange">{totalAssists}</div>
        </div>

        {/* Damage */}
        <div className="border p-4 flex items-center justify-between group">
          <div className="border-white border-l-2 pl-2 text-sm group-hover:border-pastel-orange">Total Damage</div>
          <div className="font-bold group-hover:text-pastel-orange">{totalDamage}</div>
        </div>
      </div>
    </div>
  )
}
