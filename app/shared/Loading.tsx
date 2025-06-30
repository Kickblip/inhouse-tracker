import Image from "next/image"

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 p-4 mx-auto items-center font-[family-name:var(--font-geist-sans)]">
      <Image src="/loading.gif" alt="" width={100} height={100} />
      <h1 className="text-lg font-bold">Loading...</h1>
    </div>
  )
}
