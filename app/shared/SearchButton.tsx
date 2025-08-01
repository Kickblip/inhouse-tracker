"use client"

import { FaMagnifyingGlass } from "react-icons/fa6"
import { useState, useMemo } from "react"

export default function SearchButton({ players }: { players: { gameName: string; puuid: string }[] }) {
  const [open, setOpen] = useState(false)
  const [term, setTerm] = useState("")

  const matches = useMemo(() => {
    const q = term.trim().toLowerCase()
    if (q.length < 2) return []
    return players.filter((p) => p.gameName.toLowerCase().includes(q)).slice(0, 10)
  }, [term, players])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-4 flex items-center rounded cursor-pointer
                   bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950
                   bg-[position:_40%_0%] bg-[size:_200%]
                   hover:bg-[position:_100%_100%] transition-all duration-300"
      >
        <FaMagnifyingGlass className="w-3 h-3" />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center pt-40
                     backdrop-blur-sm bg-slate-950/50"
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-xl bg-slate-900/90 px-4 py-2">
            <div className="flex items-center gap-3">
              <FaMagnifyingGlass className="w-4 h-4 text-slate-400" />
              <input
                autoFocus
                placeholder="Search players…"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white
                           font-medium placeholder:text-slate-500"
              />
            </div>

            {matches.length > 0 && (
              <ul className="mt-4 max-h-72 overflow-y-auto divide-y divide-slate-700">
                {matches.map((p) => (
                  <li
                    key={p.puuid}
                    onClick={() => {
                      window.location.href = `/p/${p.puuid.substring(0, 14)}`
                      setOpen(false)
                    }}
                    className="p-2 rounded cursor-pointer font-medium text-sm
                               text-slate-200 hover:bg-slate-700/40"
                  >
                    {p.gameName}
                  </li>
                ))}
              </ul>
            )}
            {term.length >= 2 && matches.length === 0 && (
              <p className="mt-4 mb-2 text-center font-medium text-sm text-slate-500">No matches</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
