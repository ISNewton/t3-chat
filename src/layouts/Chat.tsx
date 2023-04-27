import { useEffect } from "react"
import Message from "~/components/chat/Message"
import MessageInput from "~/components/chat/MessageInput"
import useStore from "~/store"
import { api } from "~/utils/api"

export default () => {

    const { selectedChat, appendMessageToSelectedChatMessages } = useStore()



    const { data } = api.chat.getChatMessages.useQuery('clgy21lpq00048ztepdoue599')
    console.log(data, 121212);

    if (data) {
        data.map(message => {
            appendMessageToSelectedChatMessages(message)
        })

    }

    return (
        <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
                {data?.map(message => (
                    <Message messageType="received" message={message} />
                ))}

            </div>
            {selectedChat && (
                <MessageInput />
            )}

        </div>
    )
}