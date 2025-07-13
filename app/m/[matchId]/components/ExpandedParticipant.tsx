import Image from "next/image"
import { ParticipantPerformanceFull } from "@/types/Match"
import PingsWidget, { PingStat } from "./PingsWidget"
import SpellCastsWidget from "./SpellCastsWidget"
import KillStreakWidget from "./KillStreakWidget"
import DamageBarWidget from "./DamageBarWidget"

export default function ExpandedParticipant({ participant }: { participant: ParticipantPerformanceFull | null }) {
  if (!participant) {
    return (
      <div className="h-96 w-full bg-slate-950 rounded-lg flex flex-col gap-2 mx-auto justify-center items-center font-[family-name:var(--font-geist-sans)]">
        <Image src="/404.png" alt="" width={100} height={100} />
        <p className="text-xs opacity-70">Click a player above to get more info</p>
      </div>
    )
  }
  const stats: { label: string; value: number | string | undefined }[] = [
    { label: "Gold Earned", value: participant.goldEarned },
    { label: "Gold / Min", value: participant.goldPerMinute.toFixed(1) },
    { label: "Vision Score", value: participant.visionScore },
    { label: "Vision Score / Min", value: participant.utility.visionScorePerMinute.toFixed(2) },
    { label: "Effective Heal + Shield", value: participant.utility.effectiveHealAndShielding },
    { label: "Control Wards", value: participant.fun.controlWardsPlaced },
    { label: "Stealth Wards", value: participant.utility.stealthWardsPlaced },
    { label: "Wards Placed", value: participant.utility.wardsPlaced },
    { label: "Wards Taken", value: participant.utility.wardTakedowns },
    { label: "Wards Guarded", value: participant.utility.wardsGuarded },
    { label: "Time CCing Others", value: participant.fun.timeCCingOthers },
    { label: "Longest Alive (s)", value: participant.fun.longestTimeSpentLiving },
    { label: "Largest Spree", value: participant.combat.largestKillingSpree },
    { label: "Dmg Self Mitigated", value: participant.damage.damageSelfMitigated },
    { label: "% Team Damage", value: (participant.damage.teamDamagePercentage * 100).toFixed(1) + "%" },
    { label: "Damage To Turrets", value: participant.structures.damageDealtToTurrets },
    { label: "Turret Takedowns", value: participant.structures.turretTakedowns },
    { label: "Inhib Takedowns", value: participant.structures.inhibitorTakedowns },
    { label: "Turret Plates", value: participant.structures.turretPlatesTaken },
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
    <div className="relative h-96 flex w-full bg-slate-950 rounded-lg p-2">
      <div className="absolute inset-y-0 w-3/5 z-0 left-0">
        <Image
          src={`/champion-resources/splash/${participant.championName}.webp`}
          alt=""
          fill
          priority
          className="object-cover select-none pointer-events-none [transform:scaleX(-1)]"
        />
        <div className="bg-gradient-to-r absolute inset-0 from-transparent via-slate-950/90 to-slate-950 w-full" />
      </div>
      <div className="grid grid-cols-4 w-full z-10">
        <div className="col-span-1 flex flex-col gap-8">
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
              <p className="font-semibold text-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1.0)]">{participant.riotIdGameName}</p>
              <p className="text-xs opacity-70 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1.0)]">#{participant.riotIdTagline}</p>
            </div>
          </div>
          <KillStreakWidget
            doubles={participant.combat.doubleKills}
            triples={participant.combat.tripleKills}
            quadras={participant.combat.quadraKills}
            pentas={participant.combat.pentaKills}
          />
        </div>

        <div className="col-span-2 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-3 gap-2 text-xs text-white">
            {stats.map(({ label, value }) => (
              <div key={label} className="flex justify-between bg-slate-950 p-2 rounded">
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
          <div className="flex flex-col items-center gap-2 mt-4 w-full">
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
