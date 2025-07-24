import { ParticipantPerformanceFull } from "@/types/Match"
import Image from "next/image"
import { FaCoins } from "react-icons/fa6"

export default function Participant({
  participant,
  gameLength,
  orientation,
}: {
  participant: ParticipantPerformanceFull
  gameLength: number
  orientation: "left" | "right"
}) {
  // https://ddragon.leagueoflegends.com/cdn/{VERSION}/img/profileicon/{ID}.png
  // https://ddragon.leagueoflegends.com/cdn/{VERSION}/img/item/{ID}.png
  // https://ddragon.leagueoflegends.com/cdn/{VERSION}/img/champion/{NAME}.png

  const items = [
    participant.item0,
    participant.item1,
    participant.item2,
    // participant.item6,
    participant.item3,
    participant.item4,
    participant.item5,
  ]
  const summonerSpells = [participant.fun.summoner1Id, participant.fun.summoner2Id]

  return (
    <section className="relative flex w-full overflow-hidden bg-slate-950 rounded-lg">
      <div className={`absolute inset-y-0 w-3/5 z-0 ${orientation === "left" ? "left-0" : "right-0"}`}>
        <Image
          src={`/champion-resources/splash-banner/${participant.championName}.webp`}
          alt=""
          fill
          priority
          className={`${orientation === "left" ? "[transform:scaleX(-1)]" : ""}
            object-cover object-center select-none pointer-events-none`}
        />
        <div
          className={`${orientation === "left" ? "bg-gradient-to-r" : "bg-gradient-to-l"}
            absolute inset-0 from-transparent via-slate-950/40 to-slate-950`}
        />
      </div>
      <div className="flex items-center p-4 w-full z-10">
        <div className={`grid grid-cols-8 w-full items-center ${orientation === "left" ? "" : "[direction:rtl]"}`}>
          {/* Player Icon */}
          <div className="relative">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/profileicon/${participant.profileIcon}.png`}
              alt={`${participant.championName}`}
              width={40}
              height={40}
              className="rounded"
            />
            <div
              className={`absolute bottom-0 -mb-1 ${orientation === "left" ? "left-0 -ml-1" : "right-0 -mr-1"}
                  w-5 h-5 flex items-center justify-center
                  text-xs font-bold text-white
                  bg-slate-950 rounded`}
            >
              {participant.championLevel}
            </div>
          </div>

          {/* Player Name */}
          <div className="col-span-2 flex">
            <div className="flex flex-col items-start">
              <p className="font-semibold text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1.0)]">{participant.riotIdGameName}</p>
              <p className="text-xs opacity-70 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1.0)] [direction:ltr]">
                #{participant.riotIdTagline}
              </p>
            </div>
          </div>

          {/* KDA */}
          <div className="flex flex-col items-center [direction:ltr]">
            <p className="font-semibold">
              {participant.kills} / {participant.deaths} / {participant.assists}
            </p>
            <p className="text-xs opacity-70">{participant.kda.toFixed(1)} KDA</p>
          </div>

          {/* CS */}
          <div className="flex flex-col items-center [direction:ltr]">
            <p className="font-semibold flex items-center">
              {participant.totalMinionsKilled + participant.neutralMinionsKilled} <FaCoins className="w-3 h-3 ml-1" />
            </p>
            <p className="text-xs opacity-70">
              {((participant.totalMinionsKilled + participant.neutralMinionsKilled) / (gameLength / 60)).toFixed(1)} CS/min
            </p>
          </div>

          {/* Damage */}
          <div className="flex flex-col items-center [direction:ltr]">
            <p className="font-semibold">
              {participant.totalDamageDealtToChampions.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p className="text-xs opacity-70">{participant.damage.damagePerMinute.toFixed(1)} /min</p>
          </div>

          <div className="flex items-center mx-auto col-span-2">
            {/* Summoner Spells */}
            <div className="flex flex-col items-center">
              {summonerSpells.map((spell, index) => (
                <Image
                  key={index}
                  src={spell !== 0 ? `/champion-resources/summoner-spells/${spell}.png` : "/"}
                  alt=""
                  width={30}
                  height={30}
                  className="rounded border border-slate-700 bg-slate-900"
                />
              ))}
            </div>

            <div className="w-0.5 rounded-lg bg-slate-700 h-10 mx-2"></div>

            {/* Items */}
            <div className="grid grid-cols-3 [direction:ltr]">
              {items.map((item, index) => (
                <Image
                  key={index}
                  src={
                    item !== 0
                      ? `https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/item/${item}.png`
                      : "/"
                  }
                  alt=""
                  width={30}
                  height={30}
                  className="rounded border border-slate-700 bg-slate-900"
                />
              ))}
            </div>

            {/* Ward Type */}
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/item/${participant.item6}.png`}
              alt=""
              width={35}
              height={35}
              className={`rounded border border-slate-700 bg-slate-900 ${orientation === "left" ? "ml-2" : "mr-2"}`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
