import RecentlyAddedGame from "./components/RecentlyAddedGame"
import InhouseChampion from "./components/InhouseChampion"
import InhouseChallenger from "./components/InhouseChallenger"
import InhouseCompetitor from "./components/InhouseCompetitor"
import InhouseLeagueLeaderboardRow from "./components/InhouseLeagueLeaderboardRow"

export default function Home() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 -z-10
                    bg-[url(/champion-resources/regions/targon-gate.jpg)]
                    h-[80vh] bg-cover bg-center opacity-50
                    [mask-image:linear-gradient(to_bottom,black_20%,transparent)]
                    [webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent)]"
      />
      <div className="grid grid-cols-[2fr_1fr] gap-4 max-w-7xl w-full mx-auto font-[family-name:var(--font-geist-sans)] min-h-screen">
        <div className="flex flex-col gap-4 z-10">
          <InhouseChampion />
          <InhouseChallenger />
          <InhouseCompetitor />
          <InhouseLeagueLeaderboardRow />
          <InhouseLeagueLeaderboardRow />
          <InhouseLeagueLeaderboardRow />
          <InhouseLeagueLeaderboardRow />
          <InhouseLeagueLeaderboardRow />
          <InhouseLeagueLeaderboardRow />
          <InhouseLeagueLeaderboardRow />
          <InhouseLeagueLeaderboardRow />
        </div>

        <div className="flex flex-col gap-4">
          <RecentlyAddedGame />
          <RecentlyAddedGame />
          <RecentlyAddedGame />
          <RecentlyAddedGame />
        </div>
      </div>
    </>
  )
}
