import {create} from "zustand"
export const useRoomDetails = create((set)=>({
 roomDetails : null,
 setRoomDetails : (data : object) => set({roomDetails : data})
}))