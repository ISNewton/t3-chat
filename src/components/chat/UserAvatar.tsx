import { User } from "@prisma/client"
import Image from "next/image"

type Props = {
    user: User
}

const UserAvatar = ({ user }: Props) => {
    return (
        <>

            {user.image ? (
                <Image
                    width='48'
                    height='48'
                    src={`/avatars/${user.image}`}
                    className="object-cover h-12 w-12 rounded-full"
                    alt="avatar"
                />
            ) : (
                <div className="bg-red-500 object-cover h-12 w-12 rounded-full flex font-bold justify-center items-center">
                    <p className="text-white">{user.username?.slice(0, 2).toUpperCase()}</p>
                </div>
            )
            }
        </>

    )
}

export default UserAvatar