import { useState } from "react"
import Button from "../buttons/Button"

const MessageInput = () => {
    const [message, setMessage] = useState<string>('')
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
                <Button>
                    Send
                </Button>
            </div>

        </div>
    )
}

export default MessageInput