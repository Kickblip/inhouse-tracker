import Link from "next/link"

export default async function PlayerPage({ params }: { params: Promise<{ player_name: string }> }) {
  const { player_name } = await params

  return (
    <div className="flex flex-col">
      <Link href="/" className="text-blue-500 hover:underline">
        Go to Home Page
      </Link>
      <h1 className="text-2xl font-bold mt-4">Player: {player_name}</h1>
    </div>
  )
}
