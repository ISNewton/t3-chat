import { create } from 'zustand'

interface storeState {
    selectedChat: string,
    setSelectedChat: (id: string) => void
}


const useStore = create<storeState>((set) => ({
    selectedChat: 'sdf',
    setSelectedChat: (id) => {
        set((state) => ({ selectedChat: id }))
    },
}))

export default useStore
