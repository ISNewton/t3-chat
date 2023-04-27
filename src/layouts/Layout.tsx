import { ReactNode } from "react";
import Header from "./Header"
import Sidebar from "./Sidebar"

interface WithChildren {
    children: React.ReactNode;
}

const Layout:React.FC<WithChildren>  = (props) => {
    return (
        <>
            <div className="container mx-auto shadow-lg rounded-lg">
                <Header />

                <div style={{ height:'45rem' }} className="flex flex-row justify-between bg-white">
                    <Sidebar />

                    { props.children}

                </div>
            </div>
        </>

    )
}

export default Layout