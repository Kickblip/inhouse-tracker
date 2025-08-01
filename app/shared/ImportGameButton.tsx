import Link from "next/link"

export default function ImportGameButton() {
  return (
    <Link
      href="/import/game"
      className="px-6 py-3 flex cursor-pointer text-white text-sm items-center rounded bg-gradient-to-br from-slate-950
      via-slate-950 to-blue-950 bg-[position:_40%_0%] bg-[size:_200%] hover:bg-[position:_100%_100%] transition-all duration-300"
    >
      <p>Import Game</p>
    </Link>
  )
}
