"use client"

import { SiRiotgames } from "react-icons/si"
import { useSignIn } from "@clerk/nextjs"

export default function SignInButton() {
  const { signIn } = useSignIn()
  if (!signIn) return null

  const handleClick = async () => {
    await signIn.authenticateWithRedirect({
      strategy: "oauth_custom_riot_games",
      redirectUrl: "/",
      redirectUrlComplete: "/",
    })
  }

  return (
    <button
      className="px-6 py-2 flex cursor-pointer items-center bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors duration-200"
      onClick={handleClick}
    >
      <p>Sign in</p>
      <SiRiotgames className="ml-2" />
    </button>
  )
}
