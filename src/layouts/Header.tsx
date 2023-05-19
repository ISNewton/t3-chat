import { User } from "@prisma/client"
import { signOut, useSession } from "next-auth/react"
import Button from "~/components/buttons/Button"
import UserAvatar from "~/components/chat/UserAvatar"
import UsersSearch from "~/components/forms/UsersSearch"
import { api } from "~/utils/api"

export default () => {
    const session = useSession()
    const {data , isSuccess , mutateAsync} = api.room.add.useMutation()

    function test() {
        mutateAsync({text:'testing...'})
        console.log(isSuccess)
    }

    return (
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
            <div className="font-semibold text-2xl">GoingChat , {session.data?.user.username}</div>

            <UsersSearch />
            <Button onClick={test}>
                {/* <Button onClick={() => signOut()}> */}
                Log out
            </Button>
            {/* <div
                className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
            >
                RA
            </div> */}
            {session.status == 'authenticated' && <UserAvatar user={session.data?.user as User} />}


        </div>
    )
}
