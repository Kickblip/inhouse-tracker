import Link from "next/link"
import { SiRiotgames } from "react-icons/si"

export default function SignInButton() {
  return (
    <Link
      href="/signin"
      className="px-6 py-2 flex items-center bg-indigo-800 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
    >
      <p>Sign in</p>
      <SiRiotgames className="ml-2" />
    </Link>
  )
}
