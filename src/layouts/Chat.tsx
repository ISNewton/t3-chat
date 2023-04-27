import Message from "~/components/chat/Message"

export default () => {
    return (
        <div className="w-full px-5 flex flex-col justify-between">
            <div className="flex flex-col mt-5">
                <Message messageType="received" />
                <Message messageType="sent" />
                <Message messageType="received" />
                <Message messageType="sent" />
                <Message messageType="received" />
               
            </div> 
            <div className="py-5">
                <input
                    className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                    type="text"
                    placeholder="type your message here..."
                />
            </div>
        </div>
    )
}