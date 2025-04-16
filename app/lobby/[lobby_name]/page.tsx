export default function LobbyPage({ params }: { params: { lobby_name: string } }) {
  return <>{params.lobby_name}</>
}
