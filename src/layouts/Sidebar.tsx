import ChatItem from "~/components/chat/ChatItem"
import useStore from "~/store"
import { api } from "~/utils/api"

export default () => {

    const {data} = api.chat.getAllChats.useQuery()
    console.log(data,12121122);

    
    
    return (
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
            <div className="border-b-2 py-4 px-2">
                <input
                    type="text"
                    placeholder="search chatting"
                    className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                />
            </div>
            {data?.map(chat => (
            <ChatItem key={chat.id} chat={chat} />
            ))}
        </div>
    )
}