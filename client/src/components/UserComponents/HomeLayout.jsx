import { Outlet } from "react-router-dom"
import Header from "../../components/UserComponents/HomeSections/Header"
import Footer from "./HomeSections/Footer"

function HomeLayout() {
    return (
        <div className="flex flex-col bg-white dark:bg-black overflow-hidden justify-start items-start min-h-screen ">
            <Header />
            <main className=" w-full">
                <Outlet />
            </main>
            <Footer/>

        </div>
    )
}

export default HomeLayout