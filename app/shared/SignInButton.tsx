"use client"

import { SiRiotgames } from "react-icons/si"
import { useSignIn } from "@clerk/nextjs"
import { OAuthStrategy } from "@clerk/types"

export default function SignInButton() {
  const { signIn } = useSignIn()
  if (!signIn) return null

  const signInWith = (strategy: OAuthStrategy) => {
    return (
      signIn
        .authenticateWithRedirect({
          strategy,
          redirectUrl: "/sign-in/sso",
          redirectUrlComplete: "/",
        })
        .then((res) => {
          console.log(res)
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.log(err.errors)
          console.error(err, null, 2)
        })
    )
  }

  return (
    <button
      className="px-6 py-2 flex cursor-pointer text-white text-sm items-center rounded bg-gradient-to-br from-slate-950
      via-slate-950 to-blue-950 bg-[position:_40%_0%] bg-[size:_200%] hover:bg-[position:_100%_100%] transition-all duration-300"
      onClick={() => signInWith("oauth_custom_riot_games")}
    >
      <p>Sign in</p>
      <SiRiotgames className="ml-2" />
    </button>
  )
}
