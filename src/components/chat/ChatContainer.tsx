import useStore from "~/store"
import { api } from "~/utils/api"
import Message from "./Message"
import { Chat } from "@prisma/client"
import { useEffect, useState } from "react"

type props = {
    selectedChat: NullableChat
}

type NullableChat = Omit<Chat, 'id'> & { id?: string }; 


const ChatContainer = (props: props) => {


    const { data, isSuccess, isLoading } = api.chat.getChatMessages.useQuery({
        chatId: props.selectedChat.id,
        
    },{enabled:!!props.selectedChat.id})

  

    if (!isSuccess) {
        return <h1>No messages yet</h1>
    }

      if (isLoading) {
        return <h1>Loading</h1>
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