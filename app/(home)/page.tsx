import RecentlyAddedGame from "./components/RecentlyAddedGame"
import InhouseChampion from "./components/InhouseChampion"
import InhouseChallenger from "./components/InhouseChallenger"
import InhouseCompetitor from "./components/InhouseCompetitor"
import InhouseLeagueLeaderboardRow from "./components/InhouseLeagueLeaderboardRow"

export default function Home() {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4 max-w-7xl w-full mx-auto font-[family-name:var(--font-geist-sans)] min-h-screen">
      <div className="flex flex-col gap-4 z-10">
        <InhouseChampion />
        <InhouseChallenger />
        <InhouseCompetitor />
        <InhouseLeagueLeaderboardRow
          rank={4}
          playerName="Player"
          mmr={1000}
          winrate={50}
          gamesPlayed={100}
          championIcon="Annie"
        />
        <InhouseLeagueLeaderboardRow rank={5} playerName="Player" mmr={900} winrate={45} gamesPlayed={90} championIcon="Annie" />
        <InhouseLeagueLeaderboardRow rank={6} playerName="Player" mmr={800} winrate={40} gamesPlayed={80} championIcon="Annie" />
        <InhouseLeagueLeaderboardRow rank={8} playerName="Player" mmr={700} winrate={35} gamesPlayed={70} championIcon="Annie" />
        <InhouseLeagueLeaderboardRow rank={9} playerName="Player" mmr={600} winrate={30} gamesPlayed={60} championIcon="Annie" />
        <InhouseLeagueLeaderboardRow rank={10} playerName="Player" mmr={500} winrate={25} gamesPlayed={50} championIcon="Annie" />
        <InhouseLeagueLeaderboardRow rank={11} playerName="Player" mmr={400} winrate={20} gamesPlayed={40} championIcon="Annie" />
        <InhouseLeagueLeaderboardRow rank={12} playerName="Player" mmr={200} winrate={15} gamesPlayed={30} championIcon="Annie" />
        <InhouseLeagueLeaderboardRow rank={13} playerName="Player" mmr={200} winrate={15} gamesPlayed={30} championIcon="Annie" />
        <InhouseLeagueLeaderboardRow rank={14} playerName="Player" mmr={100} winrate={10} gamesPlayed={20} championIcon="Annie" />
        <InhouseLeagueLeaderboardRow rank={15} playerName="Player" mmr={100} winrate={10} gamesPlayed={20} championIcon="Annie" />
      </div>

      <div className="flex flex-col gap-4">
        <RecentlyAddedGame />
        <RecentlyAddedGame />
        <RecentlyAddedGame />
        <RecentlyAddedGame />
      </div>
    </div>
  )
}
