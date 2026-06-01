import { useRoomStore } from "@/store/useRoomStore"
import { useEffect } from "react";

export const useRoomSocket =  ( userId :string , roomId: string )=>{

  const setUsers = useRoomStore((state) => state.setUser);

  useEffect(()=>{
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!);

    ws.onopen =()=>{
      ws.send( 
        JSON.stringify({
          type : "JOIN_ROOM",
          userId,
          roomId
        })
      )


       ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "ROOM_USERS":
          setUsers(message.users);
          break;
      }
    };

    return () => {
      ws.close();
    };
  }, [roomId, userId, setUsers]);
}