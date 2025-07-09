import Link from "next/link"

export default function ImportGameButton() {
  return (
    <Link
      href="/import/game"
      className="px-6 py-2 flex items-center bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors duration-200"
    >
      <p>Import Game</p>
    </Link>
  )
}
