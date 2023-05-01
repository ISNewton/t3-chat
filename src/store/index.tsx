import { Chat, Message } from '@prisma/client'
import { create } from 'zustand'

  
type NullableChat = Omit<Chat, 'id'> & { id?: string }; 



interface storeState {
    selectedChat: NullableChat | null,
    setSelectedChat: (chat: NullableChat) => void
    selectedChatMessages: string[],
    appendMessageToSelectedChatMessages: (message: string[] | []) => void
}



const useStore = create<storeState>((set) => ({
    selectedChat: null,
    setSelectedChat: (chat: NullableChat) => {
        set((state) => ({ selectedChat: chat }))
    },
    selectedChatMessages: [],
    appendMessageToSelectedChatMessages(message: string[] | []) {

        set(state => {
            return {
                selectedChatMessages: [...(message as [])]
            }
        })

    }
}))

export default useStore
