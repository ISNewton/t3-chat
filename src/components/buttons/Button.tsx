
interface props extends React.HTMLProps<HTMLButtonElement> {

}
export default (props:React.ComponentProps<'button'>) => {
    return (
        <button type={props.type ?? "button"} className={`btn ${props.className}`} {...props} >{props.children}</button>
    )
}