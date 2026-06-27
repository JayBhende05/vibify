"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/websocket";
import toast from "react-hot-toast";
export default function RoomSocketListener({ roomId }: { roomId: string }) {
  useEffect(() => {
    const socket = getSocket();

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log(data);
      switch (data.type) {
        case "JOIN_ROOM_ACK":
          toast(`${data.userName}  has joined room`);
          break;

        case "ADD_SONG_ACK":
          toast(`${data.userName}  has Added Song ${data.songName}`);
          break;
        case "VOTE_SONG_ACK":
          toast(`${data.userName}  has Voted Song ${data.songName}`);
          break;
        case "REMOVE_SONG_ACK":
          toast(`${data.userName}  has Remove Song ${data.songName}`);
          break;

        
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [roomId]);

  return null;
}
