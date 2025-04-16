import { create } from "zustand"
import { Player } from "@/types/lobby"

interface LeaderboardStore {
  players: Player[]
  loading: boolean
  error: string | null
  fetchLeaderboard: () => Promise<void>
}

export const useLeaderboardStore = create<LeaderboardStore>((set, get) => ({
  players: [],
  loading: true,
  error: null,
  fetchLeaderboard: async () => {
    if (get().players.length > 0) {
      return
    }
    set({ loading: true, error: null })
    try {
      const res = await fetch("/api/get-stats/all")
      if (!res.ok) {
        throw new Error("Failed to fetch leaderboard data")
      }
      const data = await res.json()
      set({ players: data })
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message })
      } else {
        set({ error: "An unknown error occurred" })
      }
    } finally {
      set({ loading: false })
    }
  },
}))
