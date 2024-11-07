import SortByComponent from "@/components/common/SortByComponent";
import Category from "@/components/common/Category";
import { fetchAllCategory } from "@/store/adminSlice/AdminCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBarFilter from "@/components/common/SideBarFilter";
import { handleFilter } from "@/utils/filterUtils";
import BusinessComponent from "@/components/UserComponents/BusinessComponent";

function AllCategory() {
    const [sort, setSort] = useState(null);
    const navigate = useNavigate();
    const { CategoriesList } = useSelector((state) => state.CategoriesList);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page on mount
        dispatch(fetchAllCategory());
    }, [dispatch]);

    function handleSort(value) {
        setSort(value);
    }

    function handleCardClick(Category_id) {

        navigate(`/user/SingleCategory/${Category_id}`);
    }

    const applyFilter = (getSectionId, getCurrentOption) => {
        handleFilter(filters, getSectionId, getCurrentOption, setFilters);
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4 ">
                {/* Sidebar Filter and Sort */}
                <div className="flex flex-wrap-reverse  lg:flex-row gap-8">
                    <aside className="w-full lg:w-1/4 space-y-6">
                        <SideBarFilter filters={filters} handleFilter={applyFilter} />
                    </aside>

                {/* Categories Grid */}
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
                            <p className="col-span-full text-center text-gray-600">No categories available.</p>
                        )}
                    </div>
                <div className="mt-10 ">
                    <SortByComponent sort={sort} handleSort={handleSort} title="Latest works" />
                </div>
                    <BusinessComponent/>
                </div>
                </div>
            
            </div>
            
        </section>
    );
}

export default AllCategory;
