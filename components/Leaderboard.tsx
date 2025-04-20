"use client"

import { useEffect, useState, useMemo } from "react"
import { FaThList } from "react-icons/fa"
import { FaUser } from "react-icons/fa6"
import Link from "next/link"
import { useLeaderboardStore } from "@/stores/LeaderboardStore"
import { Player } from "@/types/lobby"

export default function Leaderboard() {
  const { players, loading, error, fetchLeaderboard } = useLeaderboardStore()

  const [sortColumn, setSortColumn] = useState<keyof Player>("kills")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  const handleSort = (column: keyof Player) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortOrder("desc")
    }
  }

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      const valA = a[sortColumn]
      const valB = b[sortColumn]

      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA
      } else if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA)
      }
      return 0
    })
  }, [players, sortColumn, sortOrder])

  const renderSortArrow = (column: keyof Player) => {
    if (sortColumn !== column) return null
    return sortOrder === "asc" ? "▲" : "▼"
  }

  if (loading) {
    return <div className="p-4">Loading leaderboard...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inhouse Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border">
              <th className="py-2 px-4 text-left">Rank</th>
              <th className="py-2 px-4 text-left">Username</th>
              <th
                className={`py-2 px-4 text-left cursor-pointer ${sortColumn === "kills" ? "text-pastel-orange" : ""}`}
                onClick={() => handleSort("kills")}
              >
                Kills <span className="text-xs">{renderSortArrow("kills")}</span>
              </th>
              <th
                className={`py-2 px-4 text-left cursor-pointer ${sortColumn === "deaths" ? "text-pastel-orange" : ""}`}
                onClick={() => handleSort("deaths")}
              >
                Deaths <span className="text-xs">{renderSortArrow("deaths")}</span>
              </th>
              <th
                className={`py-2 px-4 text-left cursor-pointer ${sortColumn === "assists" ? "text-pastel-orange" : ""}`}
                onClick={() => handleSort("assists")}
              >
                Assists <span className="text-xs">{renderSortArrow("assists")}</span>
              </th>
              <th
                className={`py-2 px-4 text-left cursor-pointer ${sortColumn === "damage" ? "text-pastel-orange" : ""}`}
                onClick={() => handleSort("damage")}
              >
                Damage <span className="text-xs">{renderSortArrow("damage")}</span>
              </th>
              <th className="py-2 px-4 text-left">Champion</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr key={player.username + index} className="border-b border-gray-600 hover:text-pastel-orange border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{player.username}</td>
                <td className={`py-2 px-4 ${sortColumn === "kills" ? "text-pastel-orange" : ""}`}>{player.kills}</td>
                <td className={`py-2 px-4 ${sortColumn === "deaths" ? "text-pastel-orange" : ""}`}>{player.deaths}</td>
                <td className={`py-2 px-4 ${sortColumn === "assists" ? "text-pastel-orange" : ""}`}>{player.assists}</td>
                <td className={`py-2 px-4 ${sortColumn === "damage" ? "text-pastel-orange" : ""}`}>{player.damage}</td>
                <td className="py-2 px-4">{player.champion}</td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/lobby/${player.lobby_id}`}
                      className="text-blue-500 transition duration-200 hover:text-blue-700"
                    >
                      <FaThList />
                    </Link>
                    <Link href={`/player/${player.slug}`} className="text-blue-500 transition duration-200 hover:text-blue-700">
                      <FaUser />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
