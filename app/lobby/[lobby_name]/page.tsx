import Link from "next/link"

export default function LobbyPage({ params }: { params: { lobby_name: string } }) {
  return (
    <div className="flex flex-col">
      <Link href="/" className="text-blue-500 hover:underline">
        Go to Home Page
      </Link>
      <h1 className="text-2xl font-bold mt-4">Lobby: {params.lobby_name}</h1>
    </div>
  )
}
