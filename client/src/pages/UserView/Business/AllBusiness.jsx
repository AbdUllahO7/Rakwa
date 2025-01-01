import BackButton from "@/components/common/BackButton";
import { SkeletonCard } from "@/components/common/CardSkeleton";
import FilterComponent from "@/components/common/FilterComponent";
import HeaderSectionTitle from "@/components/common/HeaderSectionTitle";
import Pagination from "@/components/common/Pagination";
import SortByComponent from "@/components/common/SortByComponent";
import { Button } from "@/components/ui/button";
import FilterBusinessSheet from "@/components/UserComponents/business/FilterBusinessSheet";
import BusinessesAndServices from "@/components/UserComponents/HomeSections/BusinessesAndServices";
import { fetchAllAcceptBusinesses } from "@/store/userSlice/businessServiceSlice";
import { Filter, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function AllBusiness() {
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const businessListPerPage = 6; // Define items per page
    const dispatch = useDispatch();
    const { businessList, isLoading } = useSelector((state) => state.businessList);

    const [sort, setSort] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState(() => Object.fromEntries(searchParams.entries()));
    const [openSheet, setOpenSheet] = useState(false); // State for FilterBusinessSheet



    // Fetch businesses when filters or sort changes
    useEffect(() => {
        window.scrollTo(0 , 0 )
        dispatch(
            fetchAllAcceptBusinesses({
                filterParams: filters,
                sort,
            })
        );
    }, [dispatch, filters, sort]);

    // Sync component state with URL parameters
    useEffect(() => {
        const urlFilters = Object.fromEntries(searchParams.entries());
        const urlSort = searchParams.get("sort");
        setFilters(urlFilters);
        setSort(urlSort);
    }, [searchParams]);

    // Pagination logic
    const paginatedBusinessList = useMemo(
        () =>
            businessList.slice(
                (currentPage - 1) * businessListPerPage,
                currentPage * businessListPerPage
            ),
        [businessList, currentPage]
    );

    // Apply filter
    const applyFilter = (getSectionId, getCurrentOption) => {
        const updatedFilters = { ...filters, [getSectionId]: getCurrentOption };
        setFilters(updatedFilters);
        setSearchParams({ ...updatedFilters, sort });
    };

    // Apply sort
    const handleSort = (value) => {
        setSort(value);
        setSearchParams({ ...filters, sort: value });
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({});
        setSort(null);
        setSearchParams({}); // Reset the URL search parameters
    };

 // Handle filter application
    const handleApplyFilters = (appliedFilters) => {
        const updatedFilters = { ...filters, ...appliedFilters };
        setFilters(updatedFilters);
        setSearchParams({ ...updatedFilters, sort });
    };


    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                {/* Header and Sort */}
                
                <div className="flex items-center gap-4 mb-6">
                    <BackButton />
                    <HeaderSectionTitle title="All Services" />
                    <SortByComponent sort={sort} handleSort={handleSort} />
                    <Button
                            onClick={() => setOpenSheet(true)} // Trigger openSheet state
                            className="bg-secondary hover:bg-hover text-title flex gap-2"
                        >
                            <Filter/>
                            Filter 
                        </Button>
                </div>

                {/* Main Content */}
                <div className="flex flex-wrap-reverse lg:flex-row gap-8">
                    {/* Sidebar Filter */}
                    <aside className="w-full lg:w-1/4 space-y-6">
                        <FilterComponent filters={filters} handleFilter={applyFilter} />
                        <button
                            onClick={resetFilters}
                            className="mt-4 bg-secondary px-4 py-2 rounded-lg text-title hover:bg-hover duration-300 flex items-center gap-2"
                        >
                            <RotateCcw />
                            Reset Filters
                        </button>
                
                    </aside>

                    {/* Business List */}
                    <div className="flex-1">
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3">
                            {isLoading ? (
                                // Render SkeletonCards during loading
                                Array(businessListPerPage)
                                    .fill(0)
                                    .map((_, index) => <SkeletonCard key={index} />)
                            ) : paginatedBusinessList && paginatedBusinessList.length > 0 ? (
                                // Render Businesses if available
                                paginatedBusinessList.map((business) => (
                                    <BusinessesAndServices
                                        key={business._id}
                                        product={business}
                                    />
                                ))
                            ) : (
                                // Show message if no businesses available
                                <p className="col-span-full text-center text-gray-600">
                                    No businesses found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={businessList.length}
                    itemsPerPage={businessListPerPage}
                    onPageChange={setCurrentPage}
                />

                {/* FilterBusinessSheet */}
                <FilterBusinessSheet
                    isOpen={openSheet}
                    onClose={() => setOpenSheet(false)} // Close FilterBusinessSheet
                    onApplyFilters={handleApplyFilters} // Apply filters
                    filters={filters} // Pass the current filters
                    resetFilters={resetFilters} // Pass the resetFilters function
                />
            </div>
        </section>
    );
}

export default AllBusiness;
