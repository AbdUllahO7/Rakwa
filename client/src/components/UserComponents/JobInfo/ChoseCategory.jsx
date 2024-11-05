import PropTypes from 'prop-types';
import Category from "@/components/common/Category";
import { CircleArrowRight } from "lucide-react";

function ChoseCategory({ CategoriesList, handleCardClick, selectedCategoryIds }) {
    return (
        <section className="w-full py-12">
        <div className='container mx-auto'>
            <div className="mb-10 text-center text-2xl font-bold text-secondary flex justify-center items-center">
                <CircleArrowRight className="mt-1 mr-2" />
                <h2 className=' '>Choose your business type or category</h2>
            </div>
            <div className="container mx-auto px-4">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {CategoriesList && CategoriesList.length > 0 ? (
                        CategoriesList.map((productItem) => (
                            <Category
                                key={productItem._id}
                                Category={productItem}
                                handleCardClick={handleCardClick}
                                isSelected={selectedCategoryIds.includes(productItem._id)}
                                typeOfCategory="Category"
                            />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-600">No categories available.</p>
                    )}
                </div>
            </div>
        </div>
        </section>
    );
}

ChoseCategory.propTypes = {
    CategoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleCardClick: PropTypes.func.isRequired,
    selectedCategoryIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ChoseCategory;
