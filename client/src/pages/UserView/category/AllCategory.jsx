import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import SortByComponent from "@/components/common/SortByComponent";
import Category from "@/components/common/Category/Category";
import { fetchAllCategory } from "@/store/adminSlice/AdminCategory";
import FilterComponent from "@/components/common/Category/FilterComponent";
import BusinessComponent from "@/components/UserComponents/business/BusinessComponent";
import { fetchAllAcceptBusinesses } from "@/store/userSlice/businessServiceSlice";
import BackButton from "@/components/common/BackButton";
import { RotateCcw } from "lucide-react";

function AllCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { CategoriesList } = useSelector((state) => state.CategoriesList);
    const { businessList } = useSelector((state) => state.businessList);

    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize filters and sort state from URL
    const [filters, setFilters] = useState(() => {
        const urlFilters = Object.fromEntries(searchParams.entries());
        return urlFilters;
    });

    const [sort, setSort] = useState(() => searchParams.get("sort") || null);

    // Sync component state with URL parameters
    useEffect(() => {
        const urlFilters = Object.fromEntries(searchParams.entries());
        const urlSort = searchParams.get("sort");
        setFilters(urlFilters);
        setSort(urlSort);
    }, [searchParams]);

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
        setSearchParams({});
    };

    // Handle category card click
    const handleCardClick = (Category_id) => {
        navigate(`/SingleCategory/${Category_id}`);
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <BackButton link={'/'}/>
                <div className="flex flex-wrap-reverse lg:flex-row gap-8">
                    {/* Sidebar Filter */}
                    <aside className="w-full lg:w-1/4 space-y-6">
                        <FilterComponent filters={filters} handleFilter={applyFilter} />
                        <button
                            onClick={resetFilters}
                            className="mt-4 bg-secondary  px-4 py-2 rounded-lg text-title hover:bg-hover duration-300 flex gap-2"
                        >
                            <RotateCcw />
                            Reset Filters
                        </button>
                    </aside>

                    {/* Categories and Business Components */}
                    <div className="flex-1">
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3">
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
                        <BusinessComponent  businessList={businessList} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AllCategory;
