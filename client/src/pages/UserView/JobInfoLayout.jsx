import { useEffect, useState } from "react";
import ChoseCategory from "@/components/UserComponents/JobInfo/ChoseCategory";
import ChoseSubCategory from "@/components/UserComponents/JobInfo/ChoseSubCategory";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory, fetchAllSubCategory } from "@/store/adminSlice/AdminCategory";
import { JobDetails } from "@/components/UserComponents/JobInfo/JobDetails";
import ChoseBusinessOrAd from "@/components/UserComponents/JobInfo/ChoseBusinessOrAd";

function JobInfoLayout() {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);
    const [selectedBusinessOrAd, setSelectedBusinessOrAd] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const { CategoriesList } = useSelector((state) => state.CategoriesList);
    const { SubCategoriesList } = useSelector((state) => state.SubCategoriesList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategory());
        if (selectedCategoryIds.length > 0) {
            dispatch(fetchAllSubCategory({ ids: selectedCategoryIds }));
        }
    }, [dispatch, selectedCategoryIds]);

    function handleChoseCategory(Category_id, type) {
        if (type === "Category") {
            setSelectedCategoryIds((prevSelected) =>
                prevSelected.includes(Category_id)
                    ? prevSelected.filter((id) => id !== Category_id)
                    : [...prevSelected, Category_id]
            );
        } else {
            setSelectedSubCategoryIds((prevSelected) =>
                prevSelected.includes(Category_id)
                    ? prevSelected.filter((id) => id !== Category_id)
                    : [...prevSelected, Category_id]
            );
        }
    }

    // Define conditions to enable the "Next" button
    const isNextButtonDisabled = () => {
        if (currentIndex === 0 && selectedBusinessOrAd === '') return true;
        if (currentIndex === 1 && selectedCategoryIds.length === 0) return true;
        if (currentIndex === 2 && selectedSubCategoryIds.length === 0) return true;
        return false;
    };

    const components = [
        <ChoseBusinessOrAd
            key="ChoseBusinessOrAd"
            selectedBusinessOrAd={selectedBusinessOrAd}
            setSelectedBusinessOrAd={setSelectedBusinessOrAd}
        />,
        <ChoseCategory
            key="ChoseCategory"
            CategoriesList={CategoriesList}
            handleCardClick={(id) => handleChoseCategory(id, "Category")}
            selectedCategoryIds={selectedCategoryIds}
        />,
        <ChoseSubCategory
            key="ChoseSubCategory"
            SubCategoriesList={SubCategoriesList}
            handleCardClick={(id) => handleChoseCategory(id, "SubCategory")}
            selectedSubCategoryIds={selectedSubCategoryIds}
        />,
        <JobDetails
            key="JobDetails"
            selectedCategoryIds={selectedCategoryIds}
            selectedSubCategoryIds={selectedSubCategoryIds}
            selectedBusinessOrAd={selectedBusinessOrAd}
        />
    ];

    return (
        <div className="flex flex-col bg-white dark:bg-black overflow-hidden justify-center items-center min-h-screen">
            {components[currentIndex]}
            {currentIndex < components.length - 1 && (
                <div className="mt-4 mb-4">
                    <Button
                        onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                        disabled={currentIndex === 0}
                        className="bg-secondary dark:text-primary"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, components.length - 1))}
                        disabled={isNextButtonDisabled()}
                        className="bg-secondary dark:text-primary"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}

export default JobInfoLayout;
