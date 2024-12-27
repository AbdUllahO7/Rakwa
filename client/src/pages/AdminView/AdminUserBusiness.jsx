import BusinessCard from "@/components/UserComponents/business/BusinessCard";
import Pagination from "@/components/common/Pagination";
import { fetchAllBusinesses } from "@/store/userSlice/businessServiceSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminUserBusiness() {
    const dispatch = useDispatch();
    const { businessList } = useSelector((state) => state.businessList);

    useEffect(() => {
        dispatch(fetchAllBusinesses({}));
    }, [dispatch]);

    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const businessListPerPage = 8; // Define how many messages to display per page

    const paginatedBusinessList = businessList.slice(
        (currentPage - 1) * businessListPerPage,
        currentPage * businessListPerPage
    );
    return (
        <div className="flex justify-center gap-10 flex-wrap">
            <div className="w-full">
            </div>
            {paginatedBusinessList && paginatedBusinessList.length > 0
                ? paginatedBusinessList.map(item => (
                    <BusinessCard
                        key={item?._id}
                        business={item}
                        isAdmin = {true}
                    />
                ))
                : null}
        {/* Pagination Component */}
        <Pagination
                    currentPage={currentPage}
                    totalItems={businessList.length}
                    itemsPerPage={businessListPerPage}
                    onPageChange={setCurrentPage}
                />
        </div>
    );
}

export default AdminUserBusiness;



