import { create } from "zustand";
import { Lobby, Player } from "@/types/lobby";

interface LobbyState {
  lobby: Lobby | null;
  setLobby: (data: Lobby) => void;

  updatePlayerStat: (
    username: string,
    field: keyof Player,
    value: number | string
  ) => void;
}

export const useLobbyStore = create<LobbyState>((set) => ({
  lobby: null,
  setLobby: (data) => set(() => ({ lobby: data })),

  updatePlayerStat: (username, field, value) =>
    set((state) => {
      if (!state.lobby) return {};

      const updatedPlayers = state.lobby.players.map((player) => {
        if (player.username === username) {
          return {
            ...player,
            [field]: value,
          };
        }
        return player;
      });

      return {
        lobby: {
          ...state.lobby,
          players: updatedPlayers,
        },
      };
    }),
}));
