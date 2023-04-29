
interface Props extends React.ComponentProps<'input'> {
    touched?: boolean;
    error?: string;
    label?: string;
}

const FileInput = (props: Props) => {
    return (
        <>

            <input
                {...props}
                id='email'
                type="file" className="file-input file-input-bordered w-full max-w-xs" />

            <div className="label-text-alt text-red-500">{props.error}</div>

        </>

    )
}

export default FileInput