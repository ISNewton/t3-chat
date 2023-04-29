interface Props extends React.ComponentProps<'input'> {
    touched?: boolean;
    error?: string;
    label?: string;
}
export default (props: Props) => {
    
    return (
        <>
        <input
        className={`input input-bordered w-full max-w-xs ${props.error && 'border-red-500'} ${props.className}`}
        {...props}

         />
         <div className="label-text-alt text-red-500">{props.error}</div>
        </>

    )
}