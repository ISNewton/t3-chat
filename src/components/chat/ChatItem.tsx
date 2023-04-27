import { Chat } from "@prisma/client";
import { useSession } from "next-auth/react";
import useStore from "~/store";

interface Props {
    chat:Chat
}
export default ({chat}:Props) => {

    const {selectedChat , setSelectedChat} = useStore()

    const session = useSession()
    

    
    return (
        <div onClick={() => setSelectedChat(chat.id)}  className={`flex flex-row py-4 px-2 items-center
         ${selectedChat == chat.id ? 'border-l-4 border-blue-400' : 'border-b-2'}  `}>
                <div className="w-1/4">
                    <img
                        src="https://source.unsplash.com/otT2199XwI8/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                    />
                </div>
                <div className="w-full">
                    <div className="text-lg font-semibold">
                        {chat.firstUserId != session.data?.user.id ? chat. firstUserId : chat.secondUserId }
                        </div>
                    <span className="text-gray-500">Hi Sam, Welcome</span>
                </div>
            </div>
    )
}