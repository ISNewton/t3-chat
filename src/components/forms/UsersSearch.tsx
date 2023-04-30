import { useEffect, useState } from "react"

const UsersSearch = () => {
    const [search  , setSearch ] = useState<string>('')

    useEffect(() => {
        console.log('searching...');
        
        
        
    },[search])
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
        <div className="absolute z-10 w-1/4 border divide-y shadow max-h-72 overflow-y-auto bg-white">
            <a className="block p-2 hover:bg-indigo-50 ..." href="#">Tailwind</a>
            <a className="block p-2 hover:bg-indigo-50 ..." href="#">Bootstrap</a>
        </div>
    </div>
    )

}
export default UsersSearch