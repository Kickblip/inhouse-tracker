import { Leaderboards } from "@/types/Leaderboard"
import { getRankings } from "../actions"
import PodiumPosition from "../components/PodiumPosition"
import LeaderboardRow from "../components/LeaderboardRow"
import Error from "../../shared/Error"
import Link from "next/link"

export async function generateStaticParams() {
  const rankings = (await getRankings()) as Leaderboards
  return Object.keys(rankings).map((category) => ({ category }))
}

export default async function Leaderboard({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const rankings = (await getRankings()) as Leaderboards
  const categories = Object.keys(rankings) as (keyof Leaderboards)[]
  const current = category as keyof Leaderboards
  const rows = rankings[current] ?? []

  return (
    <div className="max-w-7xl w-full mx-auto font-[family-name:var(--font-geist-sans)] min-h-screen">
      <div className="w-full grid grid-cols-[20%_80%] gap-2">
        <div className="w-full rounded-lg bg-slate-950/50 flex flex-col p-2 gap-1">
          <h1 className="font-semibold text-white/90 px-1 py-2">Leaderboards</h1>
          {categories.map((cat, idx) => (
            <Link
              href={`/leaderboards/${cat}`}
              key={idx}
              className={`text-sm w-full text-left px-4 py-2 font-semibold capitalize hover:bg-slate-950/70 transition duration-300 rounded-lg cursor-pointer ${
                category === cat ? "bg-slate-950/70" : ""
              }`}
            >
              {cat.replace(/_/g, " ")}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <PodiumPosition rank={1} entry={rows[0]} statLabel={category.replace(/_/g, " ")} />
            <PodiumPosition rank={2} entry={rows[1]} statLabel={category.replace(/_/g, " ")} />
            <PodiumPosition rank={3} entry={rows[2]} statLabel={category.replace(/_/g, " ")} />
          </div>

          <ul className="w-full flex flex-col gap-1.5">
            {rows.slice(3).map((entry, idx) => (
              <LeaderboardRow key={idx} rank={idx + 4} entry={entry} statLabel={category.replace(/_/g, " ")} />
            ))}

            {rows.length === 0 && <Error error={null} />}
          </ul>
        </div>
      </div>
    </div>
  )
}
