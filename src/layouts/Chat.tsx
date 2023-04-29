import { useEffect } from "react"
import ChatContainer from "~/components/chat/ChatContainer"
import Message from "~/components/chat/Message"
import MessageInput from "~/components/chat/MessageInput"
import useStore from "~/store"
export default () => {

    const { selectedChat } = useStore(state => {
        return {
            selectedChat: state.selectedChat,
        }
    })




    return (
        <div className="w-full px-5 flex flex-col justify-between">
            {selectedChat?.id && <ChatContainer selectedChat={selectedChat}  />}
            {selectedChat && (
                <MessageInput />
            )}

        </div>
    )
}