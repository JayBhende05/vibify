import { create } from "zustand";

interface userSessionType{
  userId : string,
  setUserId : (val : string) => void
}

const useUserSession = create<userSessionType>((set) => ({
  userId : "",
  setUserId : (value) => set({userId : value}),

}))

export default useUserSession;