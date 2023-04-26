import { InputHTMLAttributes } from "react"

interface props extends React.HTMLProps<HTMLInputElement> {
}
export default (props: props) => {
    return (
        <input type={props.type} placeholder="Type here" className={
            `input w-full max-w-xs ${props.className}`
        } />
    )
}