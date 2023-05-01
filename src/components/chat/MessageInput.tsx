import { useState } from "react"
import Button from "../buttons/Button"
import { api } from "~/utils/api"
import useStore from "~/store"
import { useSession } from "next-auth/react"

const MessageInput = () => {
    const [message, setMessage] = useState<string>('')


    const { data } = useSession()

    const query = api.useContext()

    const { selectedChat, setTopChat } = useStore(state => {
        return {

            selectedChat: state.selectedChat,
            setTopChat: state.setTopChat,
        }
    })

    const { mutateAsync } = api.chat.sendMessage.useMutation(({
        async onSuccess(input) {
            await query.chat.getChatMessages.invalidate()

        }
    }))


    async function sendMessage() {

        if (!message || !selectedChat) {
            return
        }

        setMessage('')

        const receiverId = data?.user.id == selectedChat.firstUserId
            ? selectedChat.secondUserId
            : selectedChat.firstUserId


        await mutateAsync({
            content: message,
            receiverId
        })

        //TODO: set top chat
        // setTopChat()

    }

    function sendMessageOnEnterPress(e: any) {
        if (e.key === 'Enter') {
            sendMessage()

        }


    }
    return (
        <div className="py-5">
            <div className="grid grid-cols-10 gap-2 items-center">
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full bg-gray-300 py-5 px-3 rounded-xl col-span-9"
                    type="text"
                    placeholder="type your message here..."
                    onKeyUp={sendMessageOnEnterPress}
                />
                <Button onClick={sendMessage} disabled={!message}>
                    Send
                </Button>
            </div>

        </div>
    )
}

export default MessageInput