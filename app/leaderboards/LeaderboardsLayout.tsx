"use client"

import { useMemo, useState } from "react"
import { Leaderboards } from "@/types/Leaderboard"
import Error from "../shared/Error"
import PodiumPosition from "./components/PodiumPosition"
import LeaderboardRow from "./components/LeaderboardRow"

export default function LeaderboardsLayout({ rankings }: { rankings: Leaderboards }) {
  const categories = useMemo(() => Object.keys(rankings) as (keyof Leaderboards)[], [rankings])

  const [activeTab, setActiveTab] = useState<keyof Leaderboards>(categories[0])

  const rows = rankings[activeTab]

  return (
    <div className="w-full grid grid-cols-[20%_80%] gap-2">
      <div className="w-full rounded-lg bg-slate-950/50 flex flex-col p-2 gap-1">
        <h1 className="font-semibold text-white/90 px-1 py-2">Leaderboards</h1>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(cat)}
            className={`text-sm w-full text-left px-4 py-2 font-semibold capitalize hover:bg-slate-950/70 transition duration-300 rounded-lg cursor-pointer ${
              activeTab === cat ? "bg-slate-950/70" : ""
            }`}
          >
            {cat.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <PodiumPosition rank={1} entry={rows[0]} statLabel={activeTab.replace(/_/g, " ")} />
          <PodiumPosition rank={2} entry={rows[1]} statLabel={activeTab.replace(/_/g, " ")} />
          <PodiumPosition rank={3} entry={rows[2]} statLabel={activeTab.replace(/_/g, " ")} />
        </div>

        <ul className="w-full flex flex-col gap-1.5">
          {rows.slice(3).map((entry, idx) => (
            <LeaderboardRow key={idx} rank={idx + 4} entry={entry} statLabel={activeTab.replace(/_/g, " ")} />
          ))}

          {rows.length === 0 && <Error error={null} />}
        </ul>
      </div>
    </div>
  )
}
