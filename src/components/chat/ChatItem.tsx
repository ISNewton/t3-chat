import { Chat, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import useStore from "~/store";

interface Props {
    chat: Chat & { firstUser: User, secondUser: User }
}
export default ({ chat }: Props) => {

    const { selectedChat, setSelectedChat } = useStore()

    const session = useSession()

    const receiverUser = chat.firstUserId == session.data?.user.id ? chat.secondUser : chat.firstUser



    return (
        <div onClick={() => setSelectedChat(chat)} className={`flex flex-row py-4 px-2 items-center
         ${selectedChat?.id == chat.id ? 'border-l-4 border-blue-400' : 'border-b-2'}  `}>
            <div className="w-1/4">
                {receiverUser.image ? (
                    <Image
                        width='48'
                        height='48'
                        src={`public/avatars/${receiverUser.image}`}
                        className="object-cover h-12 w-12 rounded-full"
                        alt="avatar"
                    />
                ) : (
                    <div className="bg-red-500 object-cover h-12 w-12 rounded-full flex font-bold justify-center items-center">
                        <p className="text-white">{receiverUser.username?.slice(0, 2).toUpperCase()}</p>
                    </div>
                )
                }


            </div>
            <div className="w-full">
                <div className="text-lg font-semibold">
                    {receiverUser.username}
                </div>
                <span className="text-gray-500">Hi Sam, Welcome</span>
            </div>
        </div>
    )
}