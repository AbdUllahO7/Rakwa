import Category from "@/components/common/Category";
import SortByComponent from "@/components/common/SortByComponent";
import { fetchAllSubCategory } from "@/store/adminSlice/AdminCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import BusinessComponent from "@/components/UserComponents/BusinessComponent";
import { fetchAllAcceptBusinesses } from "@/store/userSlice/businessServiceSlice";

function SingleCategory() {
    const { id } = useParams(); // Get the category id from the URL
    const { SubCategoriesList } = useSelector(state => state.SubCategoriesList);
    const { businessList } = useSelector(state => state.businessList);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();


    const [sort, setSort] = useState(() => {
        const savedSort = sessionStorage.getItem("sort");
        return searchParams.get("sort") || savedSort || null;
    });

    // Fetch subcategories and businesses when filters or sort change
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
        dispatch(fetchAllSubCategory({ ids: [id] })); // Fetch subcategories for the category
        dispatch(fetchAllAcceptBusinesses({
            sort,
        }));
    }, [dispatch, id, sort]);


    // Apply sort
    const handleSort = (value) => {
        setSort(value);
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap-reverse lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-col w-full">
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {SubCategoriesList?.length > 0 ? (
                                SubCategoriesList.map((subCategory) => (
                                    <Category
                                        key={subCategory._id}
                                        Category={subCategory}
                                        handleCardClick={() => {}}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-600">No subcategories available.</p>
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
                        <BusinessComponent businessList={businessList} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SingleCategory;
