// components/UserComponents/AllCategory.js
import SortByComponent from "@/components/common/SortByComponent";
import Category from "@/components/common/Category";
import { fetchAllCategory } from "@/store/adminSlice/AdminCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterComponent from "@/components/common/FilterComponent"; // Import the new FilterComponent
import BusinessComponent from "@/components/UserComponents/BusinessComponent";
import { fetchAllAcceptBusinesses } from "@/store/userSlice/businessServiceSlice";

function AllCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { CategoriesList } = useSelector((state) => state.CategoriesList);
    const { businessList } = useSelector((state) => state.businessList);

    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize filters and sort state
    const [filters, setFilters] = useState(() => {
        const savedFilters = sessionStorage.getItem("filters");
        const urlFilters = Object.fromEntries(searchParams.entries());
        return Object.keys(urlFilters).length > 0
            ? JSON.parse(JSON.stringify(urlFilters))
            : savedFilters
            ? JSON.parse(savedFilters)
            : {};
    });

    const [sort, setSort] = useState(() => {
        const savedSort = sessionStorage.getItem("sort");
        return searchParams.get("sort") || savedSort || null;
    });

    // Sync filters and sort with URL and sessionStorage
    useEffect(() => {
        sessionStorage.setItem("filters", JSON.stringify(filters));
        sessionStorage.setItem("sort", sort);

        setSearchParams({
            ...filters,
            sort,
        });
    }, [filters, sort, setSearchParams]);

    // Fetch data when filters or sort change
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
        dispatch(fetchAllCategory());
        dispatch(fetchAllAcceptBusinesses({
            filterParams: filters,
            sort,
        }));
    }, [dispatch, filters, sort]);

    // Apply filter
    const applyFilter = (getSectionId, getCurrentOption) => {
        const updatedFilters = { ...filters, [getSectionId]: getCurrentOption };
        setFilters(updatedFilters); // Update state
    };

    // Apply sort
    const handleSort = (value) => {
        setSort(value);
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({});
        setSort(null);
        sessionStorage.removeItem("filters");
        sessionStorage.removeItem("sort");
        setSearchParams({});
    };

    // Handle category card click
    const handleCardClick = (Category_id) => {
        navigate(`/SingleCategory/${Category_id}`);
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap-reverse lg:flex-row gap-8">
                    {/* Sidebar Filter */}
                    <aside className="w-full lg:w-1/4 space-y-6">
                        <FilterComponent filters={filters} handleFilter={applyFilter} />
                        <button
                            onClick={resetFilters}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Reset Filters
                        </button>
                    </aside>

                    {/* Categories and Business Components */}
                    <div className="flex-col w-[1000px]">
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {CategoriesList && CategoriesList.length > 0 ? (
                                CategoriesList.map((productItem) => (
                                    <Category
                                        key={productItem._id}
                                        Category={productItem}
                                        handleCardClick={handleCardClick}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-600">
                                    No categories available.
                                </p>
                            )}
                        </div>

                        {/* Sort Component */}
                        <div className="mt-10">
                            <SortByComponent
                                sort={sort}
                                handleSort={handleSort}
                                title="Latest works"
                            />
                        </div>

                        {/* Business Component */}
                        <BusinessComponent sort={sort} businessList={businessList} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AllCategory;
