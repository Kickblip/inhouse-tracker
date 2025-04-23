import Leaderboard from "@/components/Leaderboard"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen w-full font-mono">
      <div className="w-full max-w-5xl mx-auto p-4 flex flex-col items-center">
        <Leaderboard />
      </div>
      {/* <Link href="/upload" className="text-blue-500 mt-4 mb-8 hover:underline">
        Go to Upload Page
      </Link> */}
    </main>
  )
}
