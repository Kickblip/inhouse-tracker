import RecentlyAddedGame from "./components/RecentlyAddedGame"
import { getRecentMatches } from "./actions"
import Error from "@/app/shared/Error"
import InhouseLeagueLeaderboard from "./components/InhouseLeagueLeaderboard"

export default async function Home() {
  const recentMatches = await getRecentMatches()

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4 max-w-7xl w-full mx-auto font-[family-name:var(--font-geist-sans)] min-h-screen">
      <InhouseLeagueLeaderboard />

      <div className="flex flex-col gap-4">
        {recentMatches.data && recentMatches.data.length > 0 ? (
          recentMatches.data.map((match, index) => <RecentlyAddedGame key={index} match={match} />)
        ) : (
          <Error error={recentMatches.error || null} />
        )}
      </div>
    </div>
  )
}
