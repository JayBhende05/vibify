import { create } from "zustand";

interface SocketStore {
  socket: WebSocket | null;
  connect: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,

  connect: () => {
    const socket = new WebSocket("ws://localhost:8080");
    console.log("WEbsocket Connected from the FRontend 8080")
    set({ socket });
  },
}));