import RecentlyAddedGame from "./components/RecentlyAddedGame"
// import InhouseChampion from "./components/InhouseChampion"
// import InhouseChallenger from "./components/InhouseChallenger"
// import InhouseCompetitor from "./components/InhouseCompetitor"
// import InhouseLeagueLeaderboardRow from "./components/InhouseLeagueLeaderboardRow"
import { getRecentMatches } from "./actions"
import Error from "@/app/shared/Error"
import ComingSoon from "./components/ComingSoon"

export default async function Home() {
  const recentMatches = await getRecentMatches()

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4 max-w-7xl w-full mx-auto font-[family-name:var(--font-geist-sans)] min-h-screen">
      <div className="flex flex-col gap-4 z-10">
        <ComingSoon />

        {/* <InhouseChampion />
        <InhouseChallenger />
        <InhouseCompetitor /> */}
        {/* <InhouseLeagueLeaderboardRow
          rank={4}
          playerName="Player"
          mmr={1000}
          winrate={50}
          gamesPlayed={100}
          championIcon="Annie"
        /> */}
      </div>

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
