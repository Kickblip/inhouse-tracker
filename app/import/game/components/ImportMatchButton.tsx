import { FaTriangleExclamation } from "react-icons/fa6"

export default function ImportMatchButton({ matchId, onImport }: { matchId: string; onImport: (id: string) => void }) {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center">
      <div className="relative w-full max-w-3xl px-2 py-4 space-y-3">
        <div className="shadow-lg flex items-start gap-3 rounded bg-slate-900 p-3 font-medium text-yellow-500 text-sm">
          <FaTriangleExclamation className="h-4 w-4 mt-0.5" />
          <div>
            <p>This action is irreversible.</p>
            <p className="text-white">
              By clicking Finalize Import, you will upload and publish this custom match to the public view.
            </p>
          </div>
        </div>

        <button
          className="shadow-lg w-full py-3 rounded bg-indigo-800 text-white font-semibold
                    hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
          onClick={() => onImport(matchId)}
        >
          Finalize Import
        </button>
      </div>
    </div>
  )
}
