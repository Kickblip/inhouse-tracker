import Image from "next/image"

export default function Error({ error }: { error: string | null }) {
  return (
    <div className="flex flex-col gap-2 p-4 mx-auto items-center font-[family-name:var(--font-geist-sans)]">
      <Image src="/404.png" alt="" width={150} height={150} />
      <h1 className="text-lg font-bold">Something went wrong</h1>
      <p className="text-sm text-red-600">{error ?? "An unknown error occurred"}</p>
    </div>
  )
}
