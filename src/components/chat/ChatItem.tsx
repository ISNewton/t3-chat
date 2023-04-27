import { Chat } from "@prisma/client";

interface Props {
    chat:Chat
}
export default (props:Props) => {
    console.log(3);
    console.log(props);
    
    return (
        <div className="flex flex-row py-4 px-2 items-center border-b-2">
                <div className="w-1/4">
                    <img
                        src="https://source.unsplash.com/otT2199XwI8/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                    />
                </div>
                <div className="w-full">
                    <div className="text-lg font-semibold">Everest Trip 2021</div>
                    <span className="text-gray-500">Hi Sam, Welcome</span>
                </div>
            </div>
    )
}