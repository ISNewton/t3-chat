import { Message } from '@prisma/client'
import { create } from 'zustand'

interface storeState {
    selectedChat: string,
    setSelectedChat: (id: string) => void
    selectedChatMessages: Message[],
    appendMessageToSelectedChatMessages: (...message:Message[]) => void
}


const useStore = create<storeState>((set) => ({
    selectedChat: '',
    setSelectedChat: (id) => {
        set((state) => ({ selectedChat: id }))
    },
    selectedChatMessages: [],
    appendMessageToSelectedChatMessages(...message:Message[]) {
        set(state => {
            return {
                selectedChatMessages: [...state.selectedChatMessages  , ...message]
            }
        })

    }
}))

export default useStore
