import {  useMemo, useState } from "react";
import Pagination from "../common/Pagination";

import PropTypes from 'prop-types';
import BusinessAllUserCard from "./BusinessAllUserCard";

function BusinessComponent({ businessList = [] }) {
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const businessListPerPage = 6; // Define items per page

    // Paginate the business list
    const paginatedBusinessList = useMemo(() => (
        businessList.slice(
            (currentPage - 1) * businessListPerPage,
            currentPage * businessListPerPage
        )
    ), [businessList, currentPage]);

    // Generate filtered and paginated business cards
    const businessCards = useMemo(() => (
        paginatedBusinessList.map(business => (
            <BusinessAllUserCard
                key={business._id}
                business={business}
            />
        ))
    ), [paginatedBusinessList]);

    return (
        <div className="flex flex-wrap gap-10 mt-10 justify-center items-center">
            {businessCards.length > 0 ? businessCards : (
                <p className="text-gray-600 text-center">No businesses available.</p>
            )}
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
    businessList: PropTypes.array.isRequired,
};

export default BusinessComponent;
