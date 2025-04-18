import Link from "next/link"
import { MatchHistoryRecord } from "@/types/profile"
import { FaThList } from "react-icons/fa"

export default function MatchHistoryList({ matchHistory }: { matchHistory: MatchHistoryRecord[] }) {
  return (
    <div className="pl-2">
      <h2 className="text-xl font-semibold mb-2">Match History</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border">
              <th className="py-2 px-4 text-left">Result</th>
              <th className="py-2 px-4 text-left">Champion</th>
              <th className="py-2 px-4 text-left">Level</th>
              <th className="py-2 px-4 text-left">KDA</th>
              <th className="py-2 px-4 text-left">Damage</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {matchHistory.map((match, index) => {
              const isWin = match.player.team === match.lobby.winning_team
              return (
                <tr key={index} className="border-b border-gray-200 transition-colors duration-150">
                  <td className="py-2 px-4 text-xs font-black">
                    <div className={`rounded p-1 flex item-center justify-center ${isWin ? "bg-green-600" : "bg-red-600"}`}>
                      {isWin ? "WIN" : "LOSS"}
                    </div>
                  </td>
                  <td className="py-2 px-4">{match.player.champion}</td>
                  <td className="py-2 px-4">{match.player.level}</td>
                  <td className="py-2 px-4">
                    {match.player.kills}/{match.player.deaths}/{match.player.assists}
                  </td>
                  <td className="py-2 px-4">{match.player.damage}</td>
                  <td className="py-2">
                    <Link
                      href={`/lobby/${match.player.lobby_id}`}
                      className="text-blue-500 transition duration-200 hover:text-blue-700"
                    >
                      <FaThList />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
