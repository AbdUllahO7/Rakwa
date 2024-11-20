// components/common/FilterComponent.js
import { Fragment, useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory, fetchAllSubCategory } from "@/store/adminSlice/AdminCategory";
import PropTypes from "prop-types";

function FilterComponent({ filters, handleFilter }) {
    const { CategoriesList } = useSelector((state) => state.CategoriesList);
    const { SubCategoriesList } = useSelector((state) => state.SubCategoriesList);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const dispatch = useDispatch();

    // Fetch categories and subcategories on component mount or when category changes
    useEffect(() => {
        dispatch(fetchAllCategory());
    }, [dispatch]);

    useEffect(() => {
        if (selectedCategoryId !== null) {
            dispatch(fetchAllSubCategory({ ids: [selectedCategoryId] }));
        }
    }, [selectedCategoryId, dispatch]);

    // Handle checkbox change for category
    const handleCheckboxChange = (categoryId, categoryTitle) => {
        const newCategoryFilter = filters.category === categoryTitle ? null : categoryTitle;

        // Reset subCategory unconditionally when category changes
        if (filters.category !== categoryTitle) {
            handleFilter("subCategory", null); // Reset subCategory filter
        }

        setSelectedCategoryId(newCategoryFilter ? categoryId : null); // Update selected category
        handleFilter("category", newCategoryFilter); // Update category filter
    };

    // Handle checkbox change for subcategories
    const handleCheckboxChangeSub = (subCategoryTitle) => {
        const newSubCategoryFilter = filters.subCategory === subCategoryTitle ? null : subCategoryTitle;
        handleFilter("subCategory", newSubCategoryFilter);
    };

    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-extrabold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {CategoriesList && CategoriesList.length > 0 && (
                    <Fragment>
                        <div>
                            <h3 className="text-base font-bold">Categories</h3>
                            <div className="grid gap-2 mt-2">
                                {CategoriesList.map((category) => (
                                    <label
                                        key={category._id}
                                        className="flex items-center gap-2 font-medium"
                                    >
                                        <Checkbox
                                            onCheckedChange={() => {
                                                handleCheckboxChange(category._id, category.title);
                                            }}
                                            checked={filters && filters.category === category.title}
                                        />
                                        {category.title}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <Separator />
                    </Fragment>
                )}

                {SubCategoriesList && SubCategoriesList.length > 0 && selectedCategoryId && (
                    <Fragment>
                        <div>
                            <h3 className="text-base font-bold">Sub Categories</h3>
                            <div className="grid gap-2 mt-2">
                                {SubCategoriesList.map((subCategory) => (
                                    <label
                                        key={subCategory._id}
                                        className="flex items-center gap-2 font-medium"
                                    >
                                        <Checkbox
                                            onCheckedChange={() => {
                                                handleCheckboxChangeSub(subCategory.title);
                                            }}
                                            checked={filters && filters.subCategory === subCategory.title}
                                        />
                                        {subCategory.title}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <Separator />
                    </Fragment>
                )}
            </div>
        </div>
    );
}

FilterComponent.propTypes = {
    filters: PropTypes.shape({
        category: PropTypes.string, // Selected category
        subCategory: PropTypes.string, // Selected subcategory
    }),
    handleFilter: PropTypes.func, // Function to handle filter changes
};

export default FilterComponent;
