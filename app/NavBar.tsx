import Image from "next/image"
import Link from "next/link"
import { SiRiotgames } from "react-icons/si"

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto font-bold text-md">
      <div className="flex items-center gap-12">
        <Image src="/logo.png" alt="Logo" width={46} height={46} />

        <Link href="/" className="opacity-80 hover:opacity-100 transition-all duration-200">
          Leaderboards
        </Link>
        <Link href="/about" className="opacity-80 hover:opacity-100 transition-all duration-200">
          Club Stats
        </Link>
        <Link href="/contact" className="opacity-80 hover:opacity-100 transition-all duration-200">
          Players
        </Link>
      </div>
      <Link
        href="/signin"
        className="px-6 py-2 flex items-center bg-indigo-800 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
      >
        <p>Sign in</p>
        <SiRiotgames className="ml-2" />
      </Link>
    </nav>
  )
}
