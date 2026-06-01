// import { string } from "zod"
import {create} from "zustand"

interface roomStore {
  users : string[],
  setUser : (users :string[] )=> void
}

export const useRoomStore = create<roomStore>((set) =>({
  users : [],

  setUser : (users) => set({ users})


} ))