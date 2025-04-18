export default function Header({ username }: { username: string }) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold mb-1">{username}</h1>
      <p className="text-sm text-gray-500"></p>
    </div>
  )
}
