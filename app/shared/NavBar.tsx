import Image from "next/image"
import Link from "next/link"
import SignInButton from "./SignInButton"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import ImportGameButton from "./ImportGameButton"

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 max-w-7xl w-full mx-auto font-bold text-md font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-4 select-none">
          <Image src="/logo.png" alt="Logo" width={46} height={46} />
          <h1 className="text-2xl font-extrabold">Inhouse Tracker</h1>
        </Link>

        <Link href="/" className="opacity-90 hover:opacity-100 transition-all duration-200">
          Leaderboards
        </Link>
        <Link href="/club/stats" className="opacity-90 hover:opacity-100 transition-all duration-200">
          Club Stats
        </Link>
        <Link href="/contact" className="opacity-90 hover:opacity-100 transition-all duration-200">
          Tournaments
        </Link>
      </div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <ImportGameButton />
      </SignedIn>
    </nav>
  )
}
