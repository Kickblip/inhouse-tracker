import { getRankings } from "./actions"
import LeaderboardsLayout from "./LeaderboardsLayout"

export default async function LeaderboardsPage() {
  const rankings = await getRankings()
  return (
    <div className="max-w-7xl w-full mx-auto font-[family-name:var(--font-geist-sans)] min-h-screen">
      <LeaderboardsLayout rankings={rankings} />
    </div>
  )
}
