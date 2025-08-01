import { buildInhouseLeaguePlayers } from "./actions"

export default function Testing() {
  async function buildLeaderboard() {
    "use server"

    await buildInhouseLeaguePlayers()
  }

  return (
    <form action={buildLeaderboard}>
      <button type="submit" className="btn btn-primary">
        Build Inhouse League Players
      </button>
    </form>
  )
}
