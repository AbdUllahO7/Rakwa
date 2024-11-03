import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusinessCard from "@/components/common/BusinessCard";

import { 
    fetchBusinessByUserId, 
} from "@/store/userSlice/businessServiceSlice";

function UserBusiness() {
    const dispatch = useDispatch();
    const { businessList } = useSelector((state) => state.businessList);
    const { user } = useSelector(state => state.auth);

    // Effects
    useEffect(() => {
        if (user?.id) {
            dispatch(fetchBusinessByUserId(user.id));
        }
    }, [dispatch, user?.id]);


    // Memoized components
    const businessCards = useMemo(() => (
        businessList.map(business => (
            <BusinessCard
                key={business._id}
                business={business}
            />
        ))
    ), [businessList]);


    return (
        <div className="flex justify-center gap-10 flex-wrap">
            {businessCards}
        </div>
    );
}

export default UserBusiness;