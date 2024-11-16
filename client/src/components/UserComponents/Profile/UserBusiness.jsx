import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusinessCard from "@/components/common/BusinessCard";
import Pagination from "@/components/common/Pagination";
import { fetchBusinessByUserId } from "@/store/userSlice/businessServiceSlice";

function UserBusiness() {
    const dispatch = useDispatch();
    const { businessList } = useSelector((state) => state.businessList);
    const { user } = useSelector(state => state.auth);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1; // Number of items per page

    // Effects
    useEffect(() => {
        if (user?.id) {
            dispatch(fetchBusinessByUserId(user.id));
        }
    }, [dispatch, user?.id]);

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Get current business items for the page
    const paginatedBusinessList = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return businessList.slice(startIndex, endIndex);
    }, [businessList, currentPage, itemsPerPage]);

    // Memoized components
    const businessCards = useMemo(() => (
        paginatedBusinessList.map(business => (
            <BusinessCard
                key={business._id}
                business={business}
            />
        ))
    ), [paginatedBusinessList]);

    return (
        <div className="flex flex-col items-center gap-10">
            <div className="flex justify-center gap-10 flex-wrap">
                {businessCards}
            </div>
            <Pagination
                currentPage={currentPage}
                totalItems={businessList.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default UserBusiness;
