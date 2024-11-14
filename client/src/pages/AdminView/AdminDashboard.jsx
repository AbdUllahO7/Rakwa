import { fetchAllBusinesses } from "@/store/userSlice/businessServiceSlice";
import { Check, ClockAlert } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {

    const { businessList } = useSelector((state) => state.businessList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllBusinesses({}));
    }, [dispatch]);

    
    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-center gap-7 items-center flex-wrap ">
                    <div className = {` bg-primary dark:bg-secondary w-[250px] rounded-lg flex justify-evenly h-[100px]  items-center border border-r-2 text-secondary   border-r-secondary `}>
                        <div className="text-center">
                            <h2 className="text-secondary font-bold dark:text-primary">Total Pending Business</h2>
                            <span className="text-secondary font-bold dark:text-primary">
                                {businessList ? businessList.filter(business => !business.Accept).length : 0}
                            </span>

                        </div>
                        <ClockAlert className="dark:text-primary"/>
                    </div>
                    <div className = {` bg-primary dark:bg-secondary w-[250px] rounded-lg flex justify-evenly h-[100px]  items-center border border-r-2 text-secondary   border-r-secondary `}>
                        <div className="text-center">
                            <h2 className="text-secondary font-bold dark:text-primary">Total Accept Business</h2>
                            <span className="text-secondary font-bold dark:text-primary">
                                {businessList ? businessList.filter(business => business.Accept).length : 0}
                            </span>

                        </div>
                        <Check className="dark:text-primary"/>
                    </div>
                
                </div>
            </div>
                
        </div>
    )
}

export default AdminDashboard