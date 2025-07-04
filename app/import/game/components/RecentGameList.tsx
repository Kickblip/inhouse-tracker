"use client"

import ErrorComp from "@/app/shared/Error"
import Loading from "@/app/shared/Loading"
import { MatchMetadata } from "@/types/Match"
import { useState, useEffect } from "react"
import RecentGame from "./RecentGame"
import ImportMatchButton from "./ImportMatchButton"
import { useRouter } from "next/navigation"

export default function RecentGameList() {
  const [matches, setMatches] = useState<null | MatchMetadata[]>(null)
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(true)
  const [selectedMatchId, setSelectedMatchId] = useState<null | string>(null)

  const router = useRouter()

  useEffect(() => {
    async function loadGames() {
      try {
        const res = await fetch("/api/import/fetch-recent-matches")
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        setMatches(data.matches)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadGames()
  }, [])

  if (loading) return <Loading />
  if (error) return <ErrorComp error={error} />
  if (!matches?.length) return <ErrorComp error={error} />

  async function handleImport(matchId: string) {
    setLoading(true)
    try {
      const res = await fetch("/api/import/import-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId }),
      })
      if (!res.ok) throw new Error(`Import failed: ${res.status}`)

      router.push(`/m/${matchId}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      if (error) {
        setLoading(false)
      }
      setLoading(true)
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl mb-4 font-bold">Your recent games</h1>

      <ul className="space-y-2">
        {matches.map((match) => (
          <li key={match.matchId}>
            <RecentGame
              match={match}
              selected={match.matchId === selectedMatchId}
              onSelect={() => setSelectedMatchId((prev) => (prev === match.matchId ? null : match.matchId))}
            />
          </li>
        ))}
      </ul>

      {selectedMatchId && <ImportMatchButton matchId={selectedMatchId} onImport={(id) => handleImport(id)} />}
    </div>
  )
}
