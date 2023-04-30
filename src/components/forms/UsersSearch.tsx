import { useEffect, useState } from "react"
import { api } from "~/utils/api"

const UsersSearch = () => {
    const [search, setSearch] = useState<string>('')

    const { data, isLoading } = api.users.search.useQuery(search)
    return (

        <div className="w-1/2">
            <input
                type="text"
                name=""
                id=""
                placeholder="Search Username"
                className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {data && search && (
                <div className="absolute z-10 w-1/4 border divide-y shadow max-h-72 overflow-y-auto bg-white">
                    {data.map(user => (
                        <div className="block p-2 hover:bg-indigo-50 cursor-pointer">{user.username}</div>
                    ))}
                </div>

            )}
        </div>
    )

}
export default UsersSearch