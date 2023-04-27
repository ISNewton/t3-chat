import { useEffect } from "react"
import Message from "~/components/chat/Message"
import useStore from "~/store"
import { api } from "~/utils/api"

export default () => {

    const { selectedChat } = useStore()

    const { data } = api.chat.getChatMessages.useQuery('clgy21lpq00048ztepdoue599')
    console.log(selectedChat,121212);
    

    return (
        <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
                {data?.map(message => (
                    <Message messageType="received" message={message} />
                ))}

            </div>
            {selectedChat && (
                <div className="py-5">
                    <input
                        className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                        type="text"
                        placeholder="type your message here..."
                    />
                </div>
            )}

        </div>
    )
}