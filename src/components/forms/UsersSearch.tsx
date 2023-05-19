import { Chat, User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import useStore from "~/store"
import { api } from "~/utils/api"

const UsersSearch = () => {
    const [search, setSearch] = useState<string>('')
    const setSelectedChat = useStore(store => store.setSelectedChat)
    const session = useSession()
    

    const { data, isLoading, } = api.users.search.useQuery(search,{
        enabled: !!search
    })

    function openChat(user: User) {
        const chat = {
            firstUserId: session.data?.user.id,
            secondUserId: user.id,
        } as Chat
        setSelectedChat(chat)
        setSearch('')
    }
    return (

        <div className="w-1/2">
            <input
                type="text"
                placeholder="Search Username"
                className="rounded-2xl outline-none focus:outline-none  bg-gray-100 py-3 px-5 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {data && data?.length > 0 && search && (
                <div  className="absolute z-10 w-1/4 border divide-y shadow max-h-72 overflow-y-auto bg-white">
                    {data.map(user => (
                        <div key={user.id} onClick={() => openChat(user)} className="block p-2 hover:bg-indigo-50 cursor-pointer">{user.username}</div>
                    ))}
                </div>

            )}
        </div>
    )

}
export default UsersSearch
