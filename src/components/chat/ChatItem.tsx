import { Chat, Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import useStore from "~/store";
import UserAvatar from "./UserAvatar";
import { api } from "~/utils/api";

interface Props {
    chat: Chat & { firstUser: User, secondUser: User, messages: Message[] }
    // chat: any
}
export default ({ chat }: Props) => {

    const { selectedChat, setSelectedChat, selectedChatMessages } = useStore()

    const session = useSession()




    const receiverUser = chat.firstUserId == session.data?.user.id ? chat.secondUser : chat.firstUser


    const { data } = api.chat.getChatMessages.useQuery({
        receiverId: receiverUser.id
    })

    const isSelectedChat =
        (selectedChat?.firstUserId == chat.firstUserId &&
            selectedChat.secondUserId == chat.secondUserId)
        ||
        (selectedChat?.secondUserId == chat.firstUserId &&
            selectedChat.firstUserId == chat.secondUserId)

    return (
        <div onClick={() => setSelectedChat(chat)} className={`flex flex-row py-4 px-2 items-center border-l-4 border-b-2 transition-all duration-200 ease-in
         ${isSelectedChat ? ' border-b-gray-200 border-blue-400' : 'border-b-2'}  `}>
            <div className="w-1/4">
                <UserAvatar user={receiverUser} />


            </div>
            <div className="w-full">
                <div className="text-lg font-semibold">
                    {receiverUser.username}
                </div>
                <span className="text-gray-500">{selectedChat?.id == chat.id ? (data[data?.length - 1]?.content ?? '') : chat.messages[0]?.content}</span>
            </div>
        </div>
    )
}