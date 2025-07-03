import RecentGameList from "./components/RecentGameList"

export default function ImportGame() {
  return (
    <div className="max-w-4xl w-full mx-auto font-[family-name:var(--font-geist-sans)] min-h-screen">
      <div className="flex flex-col items-center p-4">
        <RecentGameList />
      </div>
    </div>
  )
}
