"use client"

import ErrorComp from "@/app/shared/Error"
import Loading from "@/app/shared/Loading"
import { MatchMetadata } from "@/types/Match"
import { useState, useEffect } from "react"

export default function RecentGameList() {
  const [matches, setMatches] = useState<null | MatchMetadata[]>(null)
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGames() {
      try {
        const res = await fetch("/api/import/fetch-recent-games")
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        console.log("Fetched matches:", data)
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

  return (
    <div>
      <ul className="space-y-2">
        {matches.map((match) => match && <div className="w-full rounded-lg h-15 bg-slate-900"></div>)}
      </ul>
    </div>
  )
}
