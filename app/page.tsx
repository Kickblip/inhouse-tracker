import RecentGame from "./RecentGame";
import InhouseChampion from "./InhouseChampion";
import InhouseChallenger from "./InhouseChallenger";
import InhouseCompetitor from "./InhouseCompetitor";
import InhouseLeagueLeaderboardRow from "./InhouseLeagueLeaderboardRow";

export default function Home() {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-4 min-h-screen max-w-7xl w-full mx-auto font-[family-name:var(--font-geist-sans)]">
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
        <RecentGame />
        <RecentGame />
        <RecentGame />
        <RecentGame />
      </div>
    </div>
  );
}
