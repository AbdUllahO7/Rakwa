import PropTypes from 'prop-types';
import Category from "@/components/common/Category";
import { CircleArrowRight } from "lucide-react";
import BackButton from '@/components/common/BackButton';

function ChoseSubCategory({ SubCategoriesList, handleCardClick , selectedSubCategoryIds }) {



    return (
        <section className="w-full py-12">
            <div className="mb-10 text-center text-2xl font-bold text-secondary dark:text-primary flex justify-center items-center">
                <CircleArrowRight className="mt-1 mr-2" />
                <h2>Choose your business type or category</h2>
            </div>
            <div className="container mx-auto px-4">
                <BackButton/>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-2">
                    {SubCategoriesList && SubCategoriesList.length > 0 ? (
                        SubCategoriesList.map((productItem) => (
                            <Category
                                key={productItem._id}
                                Category={productItem}
                                handleCardClick={handleCardClick}
                                isSelected={selectedSubCategoryIds.includes(productItem._id)}
                                typeOfCategory="SubCategory"
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-600 dark:text-primary">No categories available.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

ChoseSubCategory.propTypes = {
    SubCategoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleCardClick: PropTypes.func.isRequired,
    selectedSubCategoryIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ChoseSubCategory;
