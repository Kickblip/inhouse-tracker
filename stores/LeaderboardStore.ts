import { create } from "zustand"
import { Player } from "@/types/lobby"

type SearchableUser = { username: string; slug: string }

interface LeaderboardStore {
  players: Player[]
  searchableUsers: SearchableUser[]
  loading: boolean
  error: string | null
  fetchLeaderboard: () => Promise<void>
}

export const useLeaderboardStore = create<LeaderboardStore>((set, get) => ({
  players: [],
  searchableUsers: [],
  loading: true,
  error: null,

  fetchLeaderboard: async () => {
    if (get().players.length) return

    set({ loading: true, error: null })
    try {
      const res = await fetch("/api/get-stats/all")
      if (!res.ok) throw new Error("Failed to fetch leaderboard data")
      const data: Player[] = await res.json()

      const uniq = new Map<string, SearchableUser>()
      data.forEach((p) => {
        const slug = p.slug ?? p.username.toLowerCase().replace(/\s+/g, "-")
        if (!uniq.has(slug)) uniq.set(slug, { username: p.username, slug })
      })

      set({ players: data, searchableUsers: [...uniq.values()] })
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Unknown error" })
    } finally {
      set({ loading: false })
    }
  },
}))
