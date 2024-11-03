import BusinessCard from "@/components/common/BusinessCard";
import { fetchAllBusinesses } from "@/store/userSlice/businessServiceSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminUserBusiness() {
    const dispatch = useDispatch();
    const { businessList } = useSelector((state) => state.businessList);

    useEffect(() => {
        dispatch(fetchAllBusinesses());
    }, [dispatch]);


    return (
        <div className="flex justify-center gap-10">
            {businessList && businessList.length > 0
                ? businessList.map(item => (
                    <BusinessCard
                        key={item?._id}
                        business={item}
                        isAdmin = {true}
                    />
                ))
                : null}
        
        </div>
    );
}

export default AdminUserBusiness;



