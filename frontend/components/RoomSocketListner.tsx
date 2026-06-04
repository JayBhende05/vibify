"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/websocket";
import toast from "react-hot-toast";
export default function RoomSocketListener({
  roomId,
}: {
  roomId: string;
}) {
  useEffect(() => {
    const socket = getSocket();

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log(data)
      switch (data.type) {
        case "JOIN_ROOM_ACK":
            // alert(`${data.userName} user has joined room`);
toast(`${data.userName} user has joined room`)
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