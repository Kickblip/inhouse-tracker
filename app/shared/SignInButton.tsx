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
      className="px-6 py-2 flex cursor-pointer text-white text-sm items-center rounded bg-gradient-to-br from-slate-950
      via-slate-950 to-blue-950 bg-[position:_40%_0%] bg-[size:_200%] hover:bg-[position:_100%_100%] transition-all duration-300"
      onClick={handleClick}
    >
      <p>Sign in</p>
      <SiRiotgames className="ml-2" />
    </button>
  )
}
