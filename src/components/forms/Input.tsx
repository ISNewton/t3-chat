import { InputHTMLAttributes } from "react"

interface Props extends React.ComponentProps<'input'> {
    touched?: boolean;
    error?: string;
    label?: string;
}
export default (props: Props) => {

    return (
        <input
         type={props.type} 
        className={`input input-bordered w-full max-w-xs ${props.className}`}
        {...props}

         />
    )
}