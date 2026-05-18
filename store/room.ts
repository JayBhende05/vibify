import {create} from "zustand"

interface RoomDetailsState {
  roomDetails : any,
  setRoomDetails :(data : object) => void;
}
export const useRoomDetails = create<RoomDetailsState>((set)=>({
 roomDetails : null,
 setRoomDetails : (data : object) => set({roomDetails : data})
}))