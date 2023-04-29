import { Chat, Message } from '@prisma/client'
import { create } from 'zustand'

interface storeState {
    selectedChat: Chat | null,
    setSelectedChat: (chat : Chat) => void
    selectedChatMessages: string[],
    appendMessageToSelectedChatMessages: (message:string[] | []) => void
}


const useStore = create<storeState>((set) => ({
    selectedChat: null,
    setSelectedChat: (chat:Chat) => {
        set((state) => ({ selectedChat: chat }))
    },
    selectedChatMessages: [],
    appendMessageToSelectedChatMessages(message:string[] | []) {
        
        set(state => {
            return {
                selectedChatMessages: [ ...(message as []) ]
            }
        })

    }
}))

export default useStore
