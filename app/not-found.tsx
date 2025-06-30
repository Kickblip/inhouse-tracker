import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="flex flex-col gap-6 mx-auto items-center font-[family-name:var(--font-geist-sans)]">
      <Image src="/404.png" alt="" width={250} height={250} />
      <h1 className="text-7xl font-bold">404</h1>
      <p className="text-xl opacity-70">Page Not Found</p>

      <Link
        href="/"
        className="px-6 py-2 flex items-center bg-indigo-800 font-bold rounded hover:bg-indigo-700 transition-colors duration-200"
      >
        Back to safety
      </Link>
    </div>
  )
}
