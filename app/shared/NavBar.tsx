import Image from "next/image"
import Link from "next/link"
import SignInButton from "./SignInButton"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import ImportGameButton from "./ImportGameButton"
import SearchButton from "./SearchButton"
import clientPromise from "@/lib/mongodb"
import { DbMatch } from "@/types/Match"

const getUsers = async () => {
  "use server"

  const mongodb = await clientPromise
  const collection = mongodb.db("match_service").collection<DbMatch>("matches")

  const pipeline = [
    { $unwind: "$participants" },
    {
      $group: {
        _id: "$participants.puuid",
        gameName: { $first: "$participants.riotIdGameName" },
        tagline: { $first: "$participants.riotIdTagline" },
      },
    },
    {
      $project: {
        _id: 0,
        puuid: "$_id",
        gameName: { $concat: ["$gameName", "#", "$tagline"] },
      },
    },
    { $sort: { gameName: 1 } },
  ]

  return collection.aggregate<{ gameName: string; puuid: string }>(pipeline).toArray()
}

export default async function NavBar() {
  const players = await getUsers()
  return (
    <nav className="flex items-center justify-between p-1 max-w-7xl w-full mx-auto font-bold text-md font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-4 select-none">
          <Image src="/logo.png" alt="Logo" width={70} height={70} />
          {/* <h1 className="text-2xl font-extrabold">Inhouse Tracker</h1> */}
        </Link>

        <Link href="/leaderboards" className="opacity-90 hover:opacity-100 transition-all duration-200">
          Leaderboards
        </Link>
        {/* <Link href="/club/stats" className="opacity-90 hover:opacity-100 transition-all duration-200">
          Club Stats
        </Link> */}
        <Link
          href="https://guesser.inhousetracker.com"
          className="opacity-90 hover:opacity-100 transition-all duration-200"
          target="_blank"
        >
          LoL Guesser
        </Link>
        {/* <Link href="/docs" className="opacity-90 hover:opacity-100 transition-all duration-200">
          Docs
        </Link> */}
      </div>
      <div className="flex items-center gap-4">
        <SearchButton players={players} />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <ImportGameButton />
        </SignedIn>
      </div>
    </nav>
  )
}
