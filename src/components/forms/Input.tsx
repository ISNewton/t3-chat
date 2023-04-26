import { InputHTMLAttributes } from "react"


export default (props: React.HTMLProps<HTMLInputElement>) => {

    return (
        <input type={props.type} placeholder="Type here" className={`input input-bordered w-full max-w-xs ${props.className}`} />
    )
}