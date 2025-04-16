"use client"

import { useEffect, useState, useMemo } from "react"

interface Player {
  username: string
  team: number
  champion: string
  level: number
  kills: number
  deaths: number
  assists: number
  damage: number
  gold: number
  gold_per_minute: number
}

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [sortColumn, setSortColumn] = useState<keyof Player>("kills")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/get-stats/all")
        if (!res.ok) {
          throw new Error("Failed to fetch leaderboard data")
        }
        const data = await res.json()
        setPlayers(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("An unknown error occurred")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

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
      }

      if (typeof valA === "string" && typeof valB === "string") {
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
                className={`py-2 px-4 text-left cursor-pointer ${sortColumn === "kills" ? "text-[#fca874]" : ""}`}
                onClick={() => handleSort("kills")}
              >
                Kills <span className="text-xs">{renderSortArrow("kills")}</span>
              </th>
              <th
                className={`py-2 px-4 text-left cursor-pointer ${sortColumn === "deaths" ? "text-[#fca874]" : ""}`}
                onClick={() => handleSort("deaths")}
              >
                Deaths <span className="text-xs">{renderSortArrow("deaths")}</span>
              </th>
              <th
                className={`py-2 px-4 text-left cursor-pointer ${sortColumn === "assists" ? "text-[#fca874]" : ""}`}
                onClick={() => handleSort("assists")}
              >
                Assists <span className="text-xs">{renderSortArrow("assists")}</span>
              </th>
              <th
                className={`py-2 px-4 text-left cursor-pointer ${sortColumn === "damage" ? "text-[#fca874]" : ""}`}
                onClick={() => handleSort("damage")}
              >
                Damage <span className="text-xs">{renderSortArrow("damage")}</span>
              </th>
              <th className="py-2 px-4 text-left">Champion</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr key={player.username + index} className="border-b hover:text-[#fca874] border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{player.username}</td>
                <td className={`py-2 px-4 ${sortColumn === "kills" ? "text-[#fca874]" : ""}`}>{player.kills}</td>
                <td className={`py-2 px-4 ${sortColumn === "deaths" ? "text-[#fca874]" : ""}`}>{player.deaths}</td>
                <td className={`py-2 px-4 ${sortColumn === "assists" ? "text-[#fca874]" : ""}`}>{player.assists}</td>
                <td className={`py-2 px-4 ${sortColumn === "damage" ? "text-[#fca874]" : ""}`}>{player.damage}</td>
                <td className="py-2 px-4">{player.champion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
