import { fetchBusinessByUserId } from "@/store/userSlice/businessServiceSlice";
import { ClockAlert, FolderKanban, MessageCircle, Rss, UserRoundPlus } from "lucide-react"
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
                    <div className = {` bg-primary dark:bg-secondary w-[250px] rounded-lg flex justify-evenly h-[100px]  items-center border border-r-2 text-secondary   border-r-secondary `}>
                        <div className="text-center">
                            <h2 className="text-secondary font-bold dark:text-primary">Pending Business</h2>
                            <span className="text-secondary font-bold dark:text-primary">
                                {businessList ? businessList.filter(business => !business.Accept).length : 0}
                            </span>

                        </div>
                        <ClockAlert className="dark:text-primary"/>
                    </div>
                    <div className="bg-primary dark:bg-secondary w-[250px] rounded-lg flex justify-evenly h-[100px] items-center border border-r-2  border-r-secondary ">
                        <div className="text-center">
                            <h2 className="text-secondary dark:text-primary font-bold">Accept Business</h2>
                            <span className="text-secondary font-bold dark:text-primary">
                                {businessList ? businessList.filter(business => business.Accept).length : 0}
                            </span>

                        </div>
                        <ClockAlert className="dark:text-primary"/>
                    </div>
                    <div className="bg-primary  dark:bg-secondary w-[250px] rounded-lg flex justify-evenly h-[100px] items-center border border-r-2  border-r-secondary ">
                        <div className="text-center">
                            <h2 className="text-secondary font-bold dark:text-primary ">All Business</h2>
                            <span className="text-secondary font-bold dark:text-primary">{businessList.length}</span>
                        </div>
                        <FolderKanban />

                    </div>
                    <div className="bg-primary dark:bg-secondary w-[250px] rounded-lg flex justify-evenly h-[100px] items-center border border-r-2  border-r-secondary ">
                        <div className="text-center">
                            <h2 className="text-secondary font-bold dark:text-primary">All followers</h2>
                            <span className="text-secondary font-bold dark:text-primary">{  user?.followers   }</span>
                        </div>
                        <UserRoundPlus />
                    </div>
                    <div className="bg-primary dark:bg-secondary w-[250px] rounded-lg flex justify-evenly h-[100px] items-center border border-r-2  border-r-secondary ">
                        <div className="text-center">
                            <h2 className="text-secondary font-bold dark:text-primary">All following</h2>
                            <span className="text-secondary font-bold dark:text-primary">{user?.following}</span>
                        </div>
                        <Rss />
                    </div>
                
                </div>
            </div>
                
        </div>
    )
}

export default UserDashBoard
