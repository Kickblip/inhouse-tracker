export const maxDuration = 30 // Vercel maximum execution time setting (overrides default of 15s)

import StatTable from "./StatTable"
import UploadZone from "./UploadZone"
import SaveToDBButton from "./SaveToDBButton"
import Link from "next/link"

export default function UploadPage() {
  return (
    <div>
      <Link href="/" className="text-blue-500 hover:underline">
        Go to Home Page
      </Link>
      <div className="flex items-center mb-4">
        <UploadZone />
        <SaveToDBButton />
      </div>
      <StatTable />
    </div>
  )
}
