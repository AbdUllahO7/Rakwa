import { useEffect, useState } from "react";
import ChoseCategory from "@/components/UserComponents/JobInfo/ChoseCategory";
import ChoseSubCategory from "@/components/UserComponents/JobInfo/ChoseSubCategory";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory, fetchAllSubCategory } from "@/store/adminSlice/AdminCategory";
import { JobDetails } from "@/components/UserComponents/JobInfo/JobDetails";

function JobInfoLayout() {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);
    const { CategoriesList } = useSelector((state) => state.CategoriesList);
    const { SubCategoriesList } = useSelector((state) => state.SubCategoriesList);
    const dispatch = useDispatch();

    const [currentIndex, setCurrentIndex] = useState(0);

    const components = [
        <ChoseCategory
            key="ChoseCategory"
            CategoriesList={CategoriesList}
            handleCardClick={handleChoseCategory}
            selectedCategoryIds={selectedCategoryIds} 
        />,
        <ChoseSubCategory 
            key="ChoseSubCategory" 
            SubCategoriesList={SubCategoriesList}
            selectedSubCategoryIds={selectedSubCategoryIds} 
            handleCardClick={handleChoseCategory}
        />,
        <JobDetails 
            key="JobDetails"
            selectedCategoryIds={selectedCategoryIds} 
            selectedSubCategoryIds = {selectedSubCategoryIds}
        />
    ];

    useEffect(() => {
        dispatch(fetchAllCategory());
        if (selectedCategoryIds.length > 0) {
            dispatch(fetchAllSubCategory({ ids: selectedCategoryIds.join(',') }));
        }
    }, [dispatch, selectedCategoryIds]);
    
    function handleChoseCategory(Category_id, type) {
        if (type === "Category") {
            setSelectedCategoryIds((prevSelected) =>
                prevSelected.includes(Category_id)
                    ? prevSelected.filter((id) => id !== Category_id) // Remove if already selected
                    : [...prevSelected, Category_id] // Add if not selected
            );
        } else {
            setSelectedSubCategoryIds((prevSelected) =>
                prevSelected.includes(Category_id)
                    ? prevSelected.filter((id) => id !== Category_id) // Remove if already selected
                    : [...prevSelected, Category_id] // Add if not selected
            );
        }
    }

    return (
        <div className="flex flex-col bg-white overflow-hidden justify-center items-center min-h-screen">
            {components[currentIndex]}
            {/* Only show buttons if not on the last component */}
            {currentIndex < components.length - 1 && (
                <div className="mt-4">
                    <Button
                        onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                        disabled={currentIndex === 0}
                        className="bg-secondary"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, components.length - 1))}
                        disabled={
                            (currentIndex === 0 && selectedCategoryIds.length === 0) || // Disable if on first component and no categories selected
                            (currentIndex === 1 && selectedSubCategoryIds.length === 0) // Disable if on second component and no subcategories selected
                        }
                        className="bg-secondary"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}

export default JobInfoLayout;
