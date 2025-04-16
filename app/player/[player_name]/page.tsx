import Link from "next/link"

export default function PlayerPage({ params }: { params: { player_name: string } }) {
  return (
    <div className="flex flex-col">
      <Link href="/" className="text-blue-500 hover:underline">
        Go to Home Page
      </Link>
      <h1 className="text-2xl font-bold mt-4">Player: {params.player_name}</h1>
    </div>
  )
}
