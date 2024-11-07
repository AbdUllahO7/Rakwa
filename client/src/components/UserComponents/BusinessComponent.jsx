import { fetchAllBusinesses } from "@/store/userSlice/businessServiceSlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusinessAllUserCard from "./BusinessAllUserCard";

function BusinessComponent() {
    const { businessList } = useSelector(state => state.businessList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllBusinesses());
    }, [dispatch]);

    const businessCards = useMemo(() => (
        businessList
            .filter(business => business.Accept)  // Filter to include only businesses with Accept === true
            .map(business => (
                <BusinessAllUserCard
                    key={business._id}
                    business={business}
                />
            ))
    ), [businessList]);

    return (
        <div className="flex flex-wrap gap-10 mt-10 justify-center items-center">
            {businessCards}
        </div>
    );
}

export default BusinessComponent;
