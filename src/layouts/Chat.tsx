import { useEffect } from "react"
import Message from "~/components/chat/Message"
import MessageInput from "~/components/chat/MessageInput"
import useStore from "~/store"
import { api } from "~/utils/api"

export default () => {

    const { selectedChat, appendMessageToSelectedChatMessages } = useStore(state => {
        return {
            selectedChat: state.selectedChat,
            appendMessageToSelectedChatMessages: state.appendMessageToSelectedChatMessages,
        }
    })


    const {data} = api.chat.getChatMessages.useQuery(selectedChat?.id ?? null)


    return (
        <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
                {data?.map(message => (
                    <Message key={message.id} messageType="received" message={message} />
                ))}

            </div>
            {selectedChat && (
                <MessageInput />
            )}

        </div>
    )
}