import Link from "next/link"

export default function ImportGameButton() {
  return (
    <Link
      href="/import/game"
      className="px-6 py-2 flex items-center bg-indigo-800 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
    >
      <p>Import Game</p>
    </Link>
  )
}
