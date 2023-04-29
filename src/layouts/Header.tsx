import { signOut, useSession } from "next-auth/react"
import Button from "~/components/buttons/Button"

export default () => {
    const session = useSession()    
    

    return (
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
            <div className="font-semibold text-2xl">GoingChat , {session.data?.user.username}</div>
        
            <div className="w-1/2">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="search IRL"
                    className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
                />
            </div>
                <Button onClick={() => signOut()}>
                    Log out
                </Button>
            <div
                className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
            >
                RA
            </div>
        </div>
    )
}