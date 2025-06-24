import Image from "next/image";
import Link from "next/link";

export default function InhouseChampion() {
  return (
    <div
      className="relative w-full h-[350px] rounded-lg 
        bg-gradient-to-br from-slate-950 via-slate-950 to-sky-800 bg-[position:_40%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%] transition-all duration-300
        group hover:scale-102
    "
    >
      <span
        className="absolute inset-y-0 left-6 flex items-center
          text-[22rem] leading-none font-extrabold text-sky-500/30
          pointer-events-none select-none z-0 translate-y-[5%]"
      >
        1
      </span>

      <Link href="/ionia">
        <Image
          src="/ionia-bg.jpg"
          alt=""
          fill
          className="object-cover select-none pointer-events-none opacity-40 rounded-lg"
          priority
        />

        <Image
          src="/riven.png"
          alt=""
          width={1191 * 0.6}
          height={670 * 0.6}
          className="absolute bottom-0 right-0 translate-x-[20%] pointer-events-none select-none z-20 
            [mask-image:linear-gradient(to_right,transparent_0%,black_40%,black_100%)]
            [--webkit-mask-image:linear-gradient(to_right,transparent_0%,black_40%,black_100%)]
            group-hover:scale-103 transition-transform duration-300"
          priority
        />

        <div className="absolute top-0 left-0 py-6 px-8 text-left text-indigo-100 select-none">
          <div className="flex gap-8 items-center">
            <div className="flex flex-col space-y-1">
              <p className="opacity-70 font-bold">Winrate</p>
              <h2 className="text-5xl font-extrabold">72%</h2>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="opacity-70 font-bold">Played</p>
              <h2 className="text-5xl font-extrabold">52</h2>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="opacity-70 font-bold">Leaderboards</p>
              <h2 className="text-5xl font-extrabold">3</h2>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-20 py-6 px-8 font-[family-name:var(--font-geist-sans)] text-left select-none">
          <h2 className="opacity-70 text-xl font-bold ml-1">
            Inhouse Champion
          </h2>
          <h3 className="text-8xl font-extrabold">SAIGO</h3>
        </div>
      </Link>
    </div>
  );
}
