import { Match } from "@/types/Match"
import { getMatch, getMatchSlugs } from "./actions"
import { notFound } from "next/navigation"
import PageLayout from "./PageLayout"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ matchId: string }> }): Promise<Metadata> {
  const { matchId } = await params
  const response = await getMatch(matchId)
  const match = response.data

  if (!response.success || !match) {
    return {
      title: "Match not found",
    }
  }

  return {
    title: `${match.gameName} | Inhouse Tracker`,
    description: `${match.gameMode} match played on ${new Date(match.timestamps.gameCreation).toLocaleDateString()}`,
  }
}

export async function generateStaticParams() {
  const response = await getMatchSlugs()

  if (!response.success || !response.data) {
    return []
  }

  const matches = response.data
  return matches.map((match) => ({
    matchId: match.matchId,
  }))
}

export default async function MatchPage({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params
  const response = await getMatch(matchId)
  const match = response.data as Match

  if (!response.success || !match) {
    notFound()
  }

  return <PageLayout match={match} />
}
