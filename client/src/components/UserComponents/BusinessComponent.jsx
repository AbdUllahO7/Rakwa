import { fetchAllBusinesses } from "@/store/userSlice/businessServiceSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BusinessAllUserCard from "./BusinessAllUserCard";
import Pagination from "../common/Pagination";

import PropTypes from 'prop-types';

function BusinessComponent({sort}) {
    const { businessList } = useSelector(state => state.businessList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllBusinesses({sort : sort}));
    }, [dispatch, sort]);

    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const businessListPerPage = 6; // Define how many messages to display per page

    const paginatedBusinessList = businessList.slice(
        (currentPage - 1) * businessListPerPage,
        currentPage * businessListPerPage
    );

    const businessCards = useMemo(() => (
        paginatedBusinessList
            .filter(business => business.Accept)  // Filter to include only businesses with Accept === true
            .map(business => (
                <BusinessAllUserCard
                    key={business._id}
                    business={business}
                />
            ))
    ), [paginatedBusinessList]);



    return (
        <div className="flex flex-wrap gap-10 mt-10 justify-center items-center ">
            {businessCards}
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
BusinessComponent.propTypes = {
    sort : PropTypes.string
};
export default BusinessComponent;
