import { redirect } from "next/navigation"

export default function LeaderboardsPage() {
  redirect("/leaderboards/kills")
  return null
}
