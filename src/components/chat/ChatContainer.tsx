import useStore from "~/store"
import { api } from "~/utils/api"
import Message from "./Message"
import { Chat } from "@prisma/client"
import { useEffect, useState } from "react"

type props = {
    selectedChat: Chat
}

const ChatContainer = (props: props) => {


    const { data, isSuccess, isLoading } = api.chat.getChatMessages.useQuery({
        chatId: props.selectedChat.id,
    })

    if (isLoading) {
        return <h1>Loading</h1>
    }

    if (!isSuccess) {
        return <h1>Failed to load data</h1>
    }

    return (
        <div className="flex flex-col mt-5 overflow-scroll">
            {data.map((message, index) => (
                <Message key={index} messageType="received" message={message.content} />
            ))}
        </div>
    )
}

export default ChatContainer