export default function WinrateWheel({
  win,
  lose,
  size = 50,
  strokeWidth = 10,
  winColor = "#3B82F6",
  loseColor = "#EF4444",
}: {
  win: number
  lose: number
  size?: number
  strokeWidth?: number
  winColor?: string
  loseColor?: string
}) {
  const total = win + lose
  const winPct = total ? win / total : 0
  const radius = (size - strokeWidth) / 2
  const dash = 2 * Math.PI * radius
  const offset = dash * (1 - winPct)

  return (
    <svg width={size} height={size} className="-rotate-90" style={{ overflow: "visible" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke={loseColor} strokeWidth={strokeWidth} fill="none" />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={winColor}
        strokeWidth={strokeWidth}
        strokeDasharray={dash}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
