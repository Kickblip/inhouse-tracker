import Image from "next/image"
import { ParticipantPerformanceFull } from "@/types/Match"
import PingsWidget, { PingStat } from "./PingsWidget"
import SpellCastsWidget from "./SpellCastsWidget"
import KillStreakWidget from "./KillStreakWidget"
import DamageBarWidget from "./DamageBarWidget"
import { FaCoins } from "react-icons/fa6"

export default function ExpandedParticipant({ participant }: { participant: ParticipantPerformanceFull | null }) {
  if (!participant) {
    return (
      <div className="h-96 w-full bg-slate-950 rounded-lg flex flex-col gap-2 mx-auto justify-center items-center font-[family-name:var(--font-geist-sans)]">
        <Image src="/404.png" alt="" width={100} height={100} />
        <p className="text-xs opacity-70">Click a player above to get more info</p>
      </div>
    )
  }
  const stats: { label: string; value: number | string }[] = [
    { label: "Largest Killing Spree", value: participant.combat.largestKillingSpree || "--" },
    { label: "Danced with Shelly", value: participant.fun.dancedWithRiftHerald || "--" },
    { label: "Fist Bump Participation", value: participant.fun.fistBumpParticipation || "--" },
    {
      label: "Longest Time Spent Living",
      value: new Date(participant.fun.longestTimeSpentLiving * 1000).toISOString().substring(14, 19),
    },

    {
      label: "Total Time Spent Dead",
      value: new Date(participant.fun.totalTimeSpentDead * 1000).toISOString().substring(14, 19),
    },

    { label: "Skillshots Dodged", value: participant.fun.skillshotsDodged || "--" },
    { label: "Total CC Time Applied", value: participant.fun.timeCCingOthers || "--" },
    { label: "Max CS Advantage", value: participant.laning.maxCsAdvantageOnLaneOpponent.toFixed(0) || "--" },
    { label: "Kills Near Enemy Turret", value: participant.laning.killsNearEnemyTurret || "--" },
    { label: "Largest Critical Strike", value: participant.fun.largestCriticalStrike || "--" },

    { label: "Wards Placed", value: participant.utility.wardsPlaced || "--" },
    { label: "Wards Destroyed", value: participant.utility.wardTakedowns || "--" },
    { label: "Vision Score", value: participant.visionScore || "--" },
    {
      label: "Effective Heal + Shield",
      value:
        participant.utility.effectiveHealAndShielding.toFixed(0) === "0"
          ? "--"
          : participant.utility.effectiveHealAndShielding.toFixed(0),
    },

    { label: "Epic Monster Steals", value: participant.jungling.epicMonsterSteals || "--" },
    {
      label: "Earliest Dragon",
      value: new Date(participant.jungling.earliestDragonTakedown * 1000).toISOString().substring(14, 19) || "--",
    },
    {
      label: "Early Gank Kills",
      value: participant.jungling.killsOnLanersEarlyJungleAsJungler || "--",
    },
    { label: "Enemy Jungle Monsters Stolen", value: participant.jungling.totalEnemyJungleMinionsKilled || "--" },
    { label: "Buffs Stolen", value: participant.fun.buffsStolen || "--" },

    { label: "Damage to Turrets", value: participant.structures.damageDealtToTurrets || "--" },
    { label: "Inhibitors Destroyed", value: participant.structures.inhibitorTakedowns || "--" },
    { label: "Turrets Destroyed", value: participant.structures.turretTakedowns || "--" },
    { label: "Turret Plates Taken", value: participant.structures.turretPlatesTaken || "--" },
    { label: "Damage Self Mitigated", value: participant.damage.damageSelfMitigated || "--" },
  ]

  const pingStats: PingStat[] = [
    {
      icon: "/game-resources/pings/Generic_ping.webp",
      count: participant.pings.basicPings,
    },
    {
      icon: "/game-resources/pings/Retreat_ping.webp",
      count: participant.pings.dangerPings,
    },
    {
      icon: "/game-resources/pings/Push_ping.webp",
      count: participant.pings.pushPings,
    },
    {
      icon: "/game-resources/pings/On_My_Way_ping.webp",
      count: participant.pings.onMyWayPings,
    },
    {
      icon: "/game-resources/pings/All_In_ping.webp",
      count: participant.pings.allInPings,
    },
    {
      icon: "/game-resources/pings/Assist_Me_ping.webp",
      count: participant.pings.assistMePings,
    },
    {
      icon: "/game-resources/pings/Need_Vision_ping.webp",
      count: participant.pings.needVisionPings,
    },
    {
      icon: "/game-resources/pings/Enemy_Missing_ping.webp",
      count: participant.pings.enemyMissingPings,
    },
    {
      icon: "/game-resources/pings/Enemy_Vision_ping.webp",
      count: participant.pings.enemyVisionPings,
    },
  ]

  return (
    <div className="relative h-96 flex w-full bg-slate-950 rounded-lg py-2 px-4">
      <div className="absolute inset-y-0 w-2/5 z-0 left-0 [mask-image:linear-gradient(to_right,black_0%,black_0%,transparent_100%)]">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${participant.championName}_0.jpg`}
          alt=""
          fill
          priority
          className="object-cover select-none pointer-events-none"
        />
      </div>
      <div className="grid grid-cols-4 w-full z-10">
        <div className="col-span-1 flex flex-col justify-between pb-6">
          <div className="flex gap-2">
            <div className="relative">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_PATCH_VERSION}/img/profileicon/${participant.profileIcon}.png`}
                alt=""
                width={80}
                height={80}
                className="rounded"
              />
              <div
                className="
                  absolute bottom-0 left-1/2
                  -translate-x-1/2 translate-y-1/2
                  px-3 py-0.5 flex items-center justify-center
                  text-xs font-bold text-white
                  bg-slate-950 rounded shadow
                "
              >
                {participant.summonerLevel}
              </div>
            </div>
            <div className="flex flex-col items-start">
              <p className="font-semibold text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1.0)]">{participant.riotIdGameName}</p>
              <p className="text-sm opacity-70 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1.0)]">#{participant.riotIdTagline}</p>
            </div>
          </div>
          <KillStreakWidget
            doubles={participant.combat.doubleKills}
            triples={participant.combat.tripleKills}
            quadras={participant.combat.quadraKills}
            pentas={participant.combat.pentaKills}
          />

          <div className="flex items-center justify-between bg-slate-950 rounded px-2 py-1 w-48 text-yellow-300">
            <div className="flex items-center gap-2">
              <FaCoins className="w-3 h-3" />
              <span className="font-semibold text-sm">{participant.goldEarned}</span>
            </div>
            <p className="font-medium opacity-70 text-white text-xs">({participant.goldPerMinute.toFixed(1)}) /min</p>
          </div>
        </div>

        <div className="col-span-2 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-3 gap-2 text-xs text-white">
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className={`flex justify-between p-2 rounded w-full bg-gradient-to-br from-slate-950 via-slate-950 to-blue-950
                bg-[position:_40%_0%] bg-[size:_200%]`}
              >
                <span className="opacity-70">{label}</span>
                <span className="font-medium">{value ?? "--"}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <PingsWidget items={pingStats} />
            <SpellCastsWidget
              casts={[
                participant.fun.abilityUses,
                participant.fun.spell1Casts,
                participant.fun.spell2Casts,
                participant.fun.spell3Casts,
                participant.fun.spell4Casts,
              ]}
            />
          </div>
          <div className="flex flex-col items-center gap-6 mt-6 w-full">
            <div className="flex flex-col w-full gap-1">
              <DamageBarWidget
                magicDamage={participant.damage.magicDamageDealtToChampions}
                physicalDamage={participant.damage.physicalDamageDealtToChampions}
                trueDamage={participant.damage.trueDamageDealtToChampions}
              />
              <p className="text-xs font-semibold opacity-70">
                Total Damage Dealt: {participant.damage.totalDamageDealtToChampions}
              </p>
            </div>
            <div className="flex flex-col w-full gap-1">
              <DamageBarWidget
                magicDamage={participant.damage.magicDamageTaken}
                physicalDamage={participant.damage.physicalDamageTaken}
                trueDamage={participant.damage.trueDamageTaken}
              />
              <p className="text-xs font-semibold opacity-70">Total Damage Taken: {participant.damage.totalDamageTaken}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
