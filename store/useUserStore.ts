import { create } from "zustand";


interface userSessionType{
  userId : string,
  role : string,
  setUserId : (val : string) => void
  setUserRole : (val : string) => void
}

const useUserStore = create<userSessionType>((set) => ({
  userId : "",
  role : "USER",
  setUserId : (value) => set({userId : value}),
  setUserRole : (value) => set({role : value})

}))

export default useUserStore;