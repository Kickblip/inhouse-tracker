import Image from "next/image"

export interface PingStat {
  icon: string
  count: number
}

const RADIUS_PX = 60

export default function PingsWidget({ items }: { items: PingStat[] }) {
  const outerTransform = (index: number, total: number) => {
    const angle = (index / total) * 360
    return `translate(-50%, -50%) rotate(${angle}deg) translate(0, -${RADIUS_PX}px) rotate(-${angle}deg)`
  }

  return (
    <div className="relative flex h-45 w-45 items-center justify-center rounded-full border-2 border-blue-950">
      {/* <div className="absolute inset-1 rounded-full border-1 border-slate-800" /> */}

      <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-950/30 flex items-center justify-center">
        <div className="flex select-none flex-col items-center text-white">
          <Image src={items[0].icon} alt="" width={28} height={28} />
          <span className="text-sm">{items[0].count}</span>
        </div>
      </div>

      {items.slice(1).map((item, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 flex flex-col items-center text-white"
          style={{ transform: outerTransform(i, items.length - 1) }}
        >
          <Image src={item.icon} alt="" width={24} height={24} />
          <span className="text-sm">{item.count}</span>
        </div>
      ))}
    </div>
  )
}
