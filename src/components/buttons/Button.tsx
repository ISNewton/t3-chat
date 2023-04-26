interface props extends React.HTMLProps<HTMLButtonElement> {

}
export default (props:props) => {
    return (
        <button type="button" className="btn">{props.children}</button>
    )
}