import { useState } from "react"
import Button from "../buttons/Button"
import { api } from "~/utils/api"
import useStore from "~/store"

const MessageInput = () => {
    const [message, setMessage] = useState<string>('')
 
    const {appendMessageToSelectedChatMessages , selectedChatMessages} = useStore()

    
    

    function sendMessage(e:any) {
        if(e.key === 'Enter') {
                alert(23)
        }
        if(!message) {
            return 
        }

        //how to append the message to the rest of messages?

        appendMessageToSelectedChatMessages(message)


        setMessage('')
        
        console.log(selectedChatMessages)

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