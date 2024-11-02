import UserSideBar from "@/components/UserComponents/Profile/UserSideBar"
import { useState } from "react"
import { Outlet } from "react-router-dom"

function ProfileLayout() {
    const [openSideBar, setOpenSideBar] = useState(false)

    return (
        <div className="flex min-h-screen w-full">
                {/* User sidebar */}
            <UserSideBar open= {openSideBar} setOpen={setOpenSideBar}/>
        <div className="flex flex-1 flex-col w-full">

                <main className="flex-col flex-1 bg-muted/40 p-4 md:p-6 w-full">
                    <Outlet/>
                </main>

        </div>
    </div>
    )
}

export default ProfileLayout
