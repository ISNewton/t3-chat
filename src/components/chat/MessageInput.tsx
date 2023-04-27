import { useState } from "react"
import Button from "../buttons/Button"
import { api } from "~/utils/api"
import useStore from "~/store"
import { useSession } from "next-auth/react"

const MessageInput = () => {
    const [message, setMessage] = useState<string>('')

    const { data } = useSession()

    const { appendMessageToSelectedChatMessages, selectedChatMessages, selectedChat }
        = useStore(state => {
            return {
                appendMessageToSelectedChatMessages: state.appendMessageToSelectedChatMessages,
                selectedChatMessages: state.selectedChatMessages,
                selectedChat: state.selectedChat,
            }
        })

    const { mutateAsync } = api.chat.sendMessage.useMutation()


    async function sendMessage() {

        if (!message || !selectedChat) {
            return
        }

        //how to append the message to the rest of messages?

        appendMessageToSelectedChatMessages(message)


        setMessage('')

        const receiverId = data?.user.id == selectedChat.firstUserId
            ? selectedChat.secondUserId
            : selectedChat.firstUserId


        const result = await mutateAsync({
            content: message,
            receiverId
        })

        console.log(selectedChatMessages)
        console.log(22222)
        console.log(result)

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
                />
                <Button onKeyUp={sendMessage} onClick={sendMessage} disabled={!message}>
                    Send
                </Button>
            </div>

        </div>
    )
}

export default MessageInput