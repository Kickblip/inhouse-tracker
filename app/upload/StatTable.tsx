"use client";

import React from "react";
import { useLobbyStore } from "@/stores/useLobbyStore";
import { EditableCell } from "./EditableCell";

export default function StatTable() {
  const lobby = useLobbyStore((state) => state.lobby);
  const updatePlayerStat = useLobbyStore((state) => state.updatePlayerStat);

  if (!lobby) {
    return (
      <div className="p-4 border border-gray-700 rounded-md text-gray-300 bg-gray-800">
        No lobby data available.
      </div>
    );
  }

  return (
    <div className="p-4 border border-gray-700 rounded-md bg-gray-800 text-gray-100 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Post-Game Lobby</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-900 rounded">
          <h3 className="text-lg font-semibold mb-1">Team 1</h3>
          <p className="mb-1">
            <span className="font-medium">Kills/Deaths/Assists:</span>{" "}
            {lobby.team_1_kills}/{lobby.team_1_deaths}/{lobby.team_1_assists}
          </p>
          <p>
            <span className="font-medium">Gold:</span> {lobby.team_1_gold}
          </p>
        </div>
        <div className="p-4 bg-red-900 rounded">
          <h3 className="text-lg font-semibold mb-1">Team 2</h3>
          <p className="mb-1">
            <span className="font-medium">Kills/Deaths/Assists:</span>{" "}
            {lobby.team_2_kills}/{lobby.team_2_deaths}/{lobby.team_2_assists}
          </p>
          <p>
            <span className="font-medium">Gold:</span> {lobby.team_2_gold}
          </p>
        </div>
      </div>

      <p className="mb-6 font-semibold">
        Winning Team:{" "}
        <span className="text-green-400">Team {lobby.winning_team}</span>
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] border border-gray-700 divide-y divide-gray-700 text-sm">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-200">
                Summoner
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-200">
                Team
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-200">
                Champion
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-200">
                Level
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-200">
                K
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-200">
                D
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-200">
                A
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-200">
                Damage
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {lobby.players.map((player) => {
              const isWinningTeam = player.team === lobby.winning_team;
              return (
                <tr
                  key={player.username}
                  className={isWinningTeam ? "bg-green-800" : ""}
                >
                  <td className="px-4 py-2 font-semibold text-gray-100">
                    <EditableCell
                      initialValue={player.username}
                      onUpdate={(val) =>
                        updatePlayerStat(player.username, "username", val)
                      }
                    />
                  </td>

                  <td className="px-4 py-2">
                    <EditableCell
                      initialValue={player.team}
                      onUpdate={(val) =>
                        updatePlayerStat(
                          player.username,
                          "team",
                          Number(val) || 1
                        )
                      }
                    />
                  </td>

                  <td className="px-4 py-2 text-gray-100">
                    <EditableCell
                      initialValue={player.champion}
                      onUpdate={(val) =>
                        updatePlayerStat(player.username, "champion", val)
                      }
                    />
                  </td>

                  <td className="px-4 py-2 text-center text-gray-100">
                    <EditableCell
                      initialValue={player.level}
                      onUpdate={(val) =>
                        updatePlayerStat(
                          player.username,
                          "level",
                          Number(val) || 1
                        )
                      }
                    />
                  </td>

                  <td className="px-4 py-2 text-center text-gray-100">
                    <EditableCell
                      initialValue={player.kills}
                      onUpdate={(val) =>
                        updatePlayerStat(
                          player.username,
                          "kills",
                          Number(val) || 0
                        )
                      }
                    />
                  </td>

                  <td className="px-4 py-2 text-center text-gray-100">
                    <EditableCell
                      initialValue={player.deaths}
                      onUpdate={(val) =>
                        updatePlayerStat(
                          player.username,
                          "deaths",
                          Number(val) || 0
                        )
                      }
                    />
                  </td>

                  <td className="px-4 py-2 text-center text-gray-100">
                    <EditableCell
                      initialValue={player.assists}
                      onUpdate={(val) =>
                        updatePlayerStat(
                          player.username,
                          "assists",
                          Number(val) || 0
                        )
                      }
                    />
                  </td>

                  <td className="px-4 py-2 text-center text-gray-100">
                    <EditableCell
                      initialValue={player.damage}
                      onUpdate={(val) =>
                        updatePlayerStat(
                          player.username,
                          "damage",
                          Number(val) || 0
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
