import { create } from 'zustand'

interface storeState {
    selectedChat: string,
    setSelectedChat: (id: string) => void
    selectedChatMessages: string[],
    appendMessageToSelectedChatMessages: (message: string) => void
}


const useStore = create<storeState>((set) => ({
    selectedChat: '',
    setSelectedChat: (id) => {
        set((state) => ({ selectedChat: id }))
    },
    selectedChatMessages: [],
    appendMessageToSelectedChatMessages(message: string) {
        set(state => {
            return {
                selectedChatMessages: [...state.selectedChatMessages  , message]
            }
        })

    }
}))

export default useStore
