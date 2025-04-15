import { create } from "zustand";
import { Lobby } from "@/types/lobby";

interface LobbyState {
  lobby: Lobby | null;
  setLobby: (data: Lobby) => void;
}

export const useLobbyStore = create<LobbyState>((set) => ({
  lobby: null,
  setLobby: (data) => set(() => ({ lobby: data })),
}));
