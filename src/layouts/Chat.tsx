import ChatContainer from "~/components/chat/ChatContainer"
import MessageInput from "~/components/chat/MessageInput"
import useStore from "~/store"
export default () => {

    const selectedChat = useStore(state => state.selectedChat)

    console.log(selectedChat)
    return (
        <div className="w-full px-5 flex flex-col justify-between">
            {selectedChat && <ChatContainer selectedChat={selectedChat} />}
            {selectedChat && (
                <MessageInput />
            )}

        </div>
    )
}
