import { fetchBusinessByUserId } from "@/store/userSlice/businessServiceSlice";
import { ClockAlert, FolderKanban, Rss, UserRoundPlus } from "lucide-react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
function UserDashBoard() {

    const {businessList} = useSelector(state => state.businessList);
    const {user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchBusinessByUserId(user?.id))
    } , [dispatch, user?.id])


    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-center gap-7 items-center flex-wrap ">
                    <div className = {` bg-primary w-[250px] rounded-lg flex justify-evenly h-[100px]  items-center border border-r-2 text-secondary   border-r-secondary `}>
                        <div className="text-center">
                            <h2 className="text-secondary font-bold ">Pending Business</h2>
                            <span className="text-secondary font-bold">
                                {businessList ? businessList.filter(business => !business.Accept).length : 0}
                            </span>

                        </div>
                        <ClockAlert />
                    </div>
                    <div className="bg-primary w-[250px] rounded-lg flex justify-evenly h-[100px] items-center border border-r-2  border-r-secondary ">
                        <div className="text-center">
                            <h2 className="text-secondary font-bold">Accept Business</h2>
                            <span className="text-secondary font-bold">
                                {businessList ? businessList.filter(business => business.Accept).length : 0}
                            </span>

                        </div>
                        <ClockAlert />
                    </div>
                    <div className="bg-primary w-[250px] rounded-lg flex justify-evenly h-[100px] items-center border border-r-2  border-r-secondary ">
                        <div className="text-center">
                            <h2 className="text-secondary font-bold">All Business</h2>
                            <span className="text-secondary font-bold">{businessList.length}</span>
                        </div>
                        <FolderKanban />

                    </div>
                    <div className="bg-primary w-[250px] rounded-lg flex justify-evenly h-[100px] items-center border border-r-2  border-r-secondary ">
                        <div className="text-center">
                            <h2 className="text-secondary font-bold">All followers</h2>
                            <span className="text-secondary font-bold">{  user?.followers   }</span>
                        </div>
                        <UserRoundPlus />
                    </div>
                    <div className="bg-primary w-[250px] rounded-lg flex justify-evenly h-[100px] items-center border border-r-2  border-r-secondary ">
                        <div className="text-center">
                            <h2 className="text-secondary font-bold">All following</h2>
                            <span className="text-secondary font-bold">{user?.following}</span>
                        </div>
                        <Rss />
                    </div>
                    
                </div>
            </div>
                
        </div>
    )
}

export default UserDashBoard
