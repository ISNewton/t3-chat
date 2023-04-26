import Header from "./Header"
import Sidebar from "./Sidebar"

export default ({children}:any) => {
    return (
        <>
            <div className="container mx-auto shadow-lg rounded-lg">
                <Header />

                <div className="flex flex-row justify-between bg-white">
                    <Sidebar />

                    {children}

                </div>
            </div>
        </>

    )
}