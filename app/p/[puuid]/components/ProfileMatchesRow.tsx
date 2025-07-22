import DamageBarWidget from "@/app/m/[matchId]/components/DamageBarWidget"
import { PlayerMatchSummary } from "@/types/Player"
import Image from "next/image"

function timeAgo(msSinceEpoch: number): string {
  const diffMs = Date.now() - msSinceEpoch

  const seconds = Math.floor(diffMs / 1_000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })

  if (days) return rtf.format(-days, "day") // “2 days ago”
  if (hours) return rtf.format(-hours, "hour") // “an hour ago”
  if (minutes) return rtf.format(-minutes, "minute")
  return rtf.format(-seconds, "second") // “just now”
}

export const secondsToDurationString = (raw: number) => {
  const m = Math.floor(raw / 60)
  const s = raw % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function ProfileMatchesRow({ match }: { match: PlayerMatchSummary }) {
  const items = [match.item0, match.item1, match.item2, match.item3, match.item4, match.item5]

  const summonerSpells = [match.summoner1Id, match.summoner2Id]

  return (
    <div
      className={`flex items-center px-4 py-2 w-full overflow-hidden rounded-lg ${
        match.win ? "bg-blue-950/80" : "bg-red-950/80"
      }`}
    >
      <div className="grid grid-cols-8 w-full items-center">
        {/* Game Info */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-semibold">
            {match.gameMode.toLowerCase().charAt(0).toUpperCase() + match.gameMode.toLowerCase().slice(1)}
          </p>
          <p className="text-xs opacity-70">{timeAgo(match.gameCreation)}</p>
          <p className="text-xs mt-1 font-semibold">
            <span className={`${match.win ? "text-blue-500" : "text-red-500"} font-bold`}>{match.win ? "WIN" : "LOSS"}</span> -{" "}
            {secondsToDurationString(match.gameDuration)}
          </p>
        </div>
        {/* Player Icon */}
        <div className="relative">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/champion/${match.championName}.png`}
            alt=""
            width={40}
            height={40}
            className="rounded"
          />
          <div
            className="absolute bottom-0 -mb-1 left-0 -ml-1 w-5 h-5 flex items-center justify-center
                  text-xs font-bold text-white bg-slate-950 rounded"
          >
            {match.championLevel}
          </div>
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

          <div className="relative">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/item/${match.item6}.png`}
              alt=""
              width={35}
              height={35}
              className="rounded border border-slate-700 bg-slate-900 ml-2"
            />
            <div className="absolute bottom-0 -mb-1 translate-x-1/2 right-0 py-0.5 px-1 flex items-center justify-center text-xs font-bold text-white bg-slate-950 rounded">
              {match.visionScore}
            </div>
          </div>
        </div>

        {/* KDA */}
        <div className="flex flex-col items-center [direction:ltr]">
          <p className="font-semibold">
            {match.kills} / {match.deaths} / {match.assists}
          </p>
          <p className="text-xs opacity-70">{match.kda.toFixed(1)} KDA</p>
        </div>

        {/* CS */}
        <div className="flex flex-col items-center [direction:ltr]">
          <p className="font-semibold">{match.totalMinionsKilled + match.neutralMinionsKilled}</p>
          <p className="text-xs opacity-70">
            {((match.totalMinionsKilled + match.neutralMinionsKilled) / (match.gameDuration / 60)).toFixed(1)} CS/min
          </p>
        </div>

        {/* Damage */}
        <div className="flex flex-col items-center [direction:ltr]">
          <p className="font-semibold">{match.totalDamageDealtToChampions.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          <p className="text-xs opacity-70">{(match.totalDamageDealtToChampions / (match.gameDuration / 60)).toFixed(1)} /min</p>
        </div>

        <DamageBarWidget
          magicDamage={match.magicDamageDealtToChampions}
          physicalDamage={match.physicalDamageDealtToChampions}
          trueDamage={match.trueDamageDealtToChampions}
        />
      </div>
    </div>
  )
}
