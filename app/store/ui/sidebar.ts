import {create} from 'zustand'
interface useActiveTabViewType {
  activeTab : string,
  setActiveTab :  (arg: string) => void
}

 const useActiveTabView = create<useActiveTabViewType>((set)=>({
  activeTab : "Create Room",
  setActiveTab : (val)=>set({activeTab : val})
}))


export default useActiveTabView;