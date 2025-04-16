import { Player } from "@/types/lobby"

export default function TeamTable({ players }: { players: Player[] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border">
          <th className="py-2 px-4 text-left">Username</th>
          <th className="py-2 px-4 text-left">Champion</th>
          <th className="py-2 px-4 text-left">Level</th>
          <th className="py-2 px-4 text-left">Kills</th>
          <th className="py-2 px-4 text-left">Deaths</th>
          <th className="py-2 px-4 text-left">Assists</th>
          <th className="py-2 px-4 text-left">Damage</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.slug} className="border-b border-gray-200 hover:text-pastel-orange">
            <td className="py-2 px-4">{player.username}</td>
            <td className="py-2 px-4">{player.champion}</td>
            <td className="py-2 px-4">{player.level}</td>
            <td className="py-2 px-4">{player.kills}</td>
            <td className="py-2 px-4">{player.deaths}</td>
            <td className="py-2 px-4">{player.assists}</td>
            <td className="py-2 px-4">{player.damage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
