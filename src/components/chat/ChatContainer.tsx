import useStore from "~/store"
import { api } from "~/utils/api"
import Message from "./Message"
import { Chat } from "@prisma/client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

type props = {
    selectedChat: NullableChat
}

type NullableChat = Omit<Chat, 'id'> & { id?: string };


const ChatContainer = (props: props) => {

    const session = useSession()


    const receiverId = props.selectedChat.firstUserId == session.data?.user.id ? props.selectedChat.secondUserId : props.selectedChat.firstUserId

    const { data, isSuccess, isLoading } = api.chat.getChatMessages.useQuery({
        receiverId: receiverId

    })

    const { data: user } = api.users.getUser.useQuery(receiverId)

    if (!isSuccess) {
        return <h1>No messages yet</h1>
    }

    if (isLoading) {
        return <h1>Loading</h1>
    }
    return (
        <div className="flex flex-col mt-5 overflow-scroll">
            {data?.map((message) => (
                <Message sender={message.sender} key={message.id} messageType="received" message={message.content} />
            ))}
        </div>
    )
}

export default ChatContainer