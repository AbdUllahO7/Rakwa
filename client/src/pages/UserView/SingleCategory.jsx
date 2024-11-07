import Category from "@/components/common/Category";
import SideBarFilter from "@/components/common/SideBarFilter";
import SortByComponent from "@/components/common/SortByComponent";
import { fetchAllSubCategory } from "@/store/adminSlice/AdminCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { handleFilter  } from "@/utils/filterUtils";
import BusinessComponent from "@/components/UserComponents/BusinessComponent";

function SingleCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({}); 
    const { SubCategoriesList } = useSelector(state => state.SubCategoriesList);
    const dispatch = useDispatch();
    const [sort, setSort] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page on mount
        dispatch(fetchAllSubCategory({ ids : [id] }));
    }, [dispatch, id]);

    const handleCardCategoryClick = (Category_id) => {
        console.log(Category_id);
    };

    const applyFilter = (getSectionId, getCurrentOption) => {
        handleFilter(filters, getSectionId, getCurrentOption, setFilters);
    };

    const handleSort = (value) => {
        setSort(value); // Update sort state
    };


    console.log(SubCategoriesList)



    return (
        <section className='py-12'>
            <div className="container mx-auto px-4 ">
                {/* Sidebar Filter and Sort */}
                <div className="flex flex-wrap-reverse lg:flex-row gap-8">
                <aside className="w-full lg:w-1/4 space-y-6">
                    <SideBarFilter filters={filters} handleFilter={applyFilter} />
                </aside>

                {/* Categories Grid */}
                    <div className="flex-col w-[1000px] ">
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {SubCategoriesList && SubCategoriesList.length > 0 ? (
                            SubCategoriesList.map((productItem) => (
                                <Category 
                                    key={productItem._id} 
                                    Category={productItem} 
                                    handleCardClick={handleCardCategoryClick}
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

export default SingleCategory;
