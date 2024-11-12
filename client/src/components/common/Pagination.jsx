// components/common/Pagination.js
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    return (
        <div className="flex justify-center items-center mt-5">
            <Button className="bg-secondary dark:text-primary" onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
            </Button>
            <span className="px-4">{`Page ${currentPage} of ${totalPages}`}</span>
            <Button className="bg-secondary dark:text-primary" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
            </Button>
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
