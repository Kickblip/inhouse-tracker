import { Player } from "@/types/lobby"
import { FaUser } from "react-icons/fa6"
import Link from "next/link"

export default function TeamTable({ players }: { players: Player[] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border">
          <th className="py-2 px-4 text-left">Username</th>
          <th className="py-2 px-4 text-left">Champion</th>
          <th className="py-2 px-4 text-left">Level</th>
          <th className="py-2 px-4 text-left">KDA</th>
          <th className="py-2 px-4 text-left">Damage</th>
          <th className="py-2 px-4 text-left"></th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.slug} className="border-b border-gray-600 hover:text-pastel-orange">
            <td className="py-2 px-4">{player.username}</td>
            <td className="py-2 px-4">{player.champion}</td>
            <td className="py-2 px-4">{player.level}</td>
            <td className="py-2 px-4">
              {player.kills}/{player.deaths}/{player.assists}
            </td>
            <td className="py-2 px-4">{player.damage}</td>
            <td className="py-2 px-4">
              <Link href={`/player/${player.slug}`} className="text-blue-500 transition duration-200 hover:text-blue-700">
                <FaUser />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
