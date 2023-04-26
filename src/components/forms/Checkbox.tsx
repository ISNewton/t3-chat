
interface props extends React.HTMLProps<HTMLInputElement> {

}
export default (props: props) => {
    return (
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Remember me</span>
                <input type="checkbox" checked className="checkbox" />
            </label>
        </div>
        // <input type="checkbox" className={`text-sm font-medium text-gray-700 tracking-wide ${props.className}`} />
    )
}