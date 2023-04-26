
interface props extends React.HTMLProps<HTMLLabelElement> {

}
export default (props: props) => {
    return (
        <label className={`text-sm font-medium text-gray-700 tracking-wide ${props.className}`}>
            {props.children}
        </label>
    )
}