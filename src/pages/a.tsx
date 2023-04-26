import useStore from "~/store";

const A = () => {
    const selectedChat = useStore(state => state.selectedChat)
    console.log(selectedChat);
    
    return (
        <div></div>
    )
}
export default A