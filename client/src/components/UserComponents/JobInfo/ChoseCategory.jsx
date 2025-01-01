import PropTypes from 'prop-types';
import Category from "@/components/common/Category";
import { CircleArrowRight, MessageCircleWarningIcon } from "lucide-react";
import { useSelector } from 'react-redux';
import BackButton from '@/components/common/BackButton';

function ChoseCategory({ CategoriesList, handleCardClick, selectedCategoryIds }) {

    const {user} = useSelector(state=> state.auth);



    return (
        <section className="w-full py-12">
        <div className='container mx-auto'>
            <div className="mb-10 text-center text-2xl font-bold text-secondary flex justify-center items-center">
                <CircleArrowRight className="mt-1 mr-2 dark:text-primary" />
                <h2 className='dark:text-primary '>Choose your business type or category</h2>
            </div>
            {
                user && user.PlanType[0] && user.PlanType[0].title === "Basic" ? (
                    <div className='flex justify-center mb-10 gap-5'>
                        {/* Content to render if the user's PlanType title is "Basic" */}
                        <MessageCircleWarningIcon className='dark:text-yellow-500 text-yellow-800'/> 
                        <p className='text-center dark:text-yellow-500 font-bold text-yellow-800'>We have set your plan to Basic as the default plan.You Can Change from Account</p>
                    
                    </div>
                ) : null
            }
            <div className="container mx-auto px-4">
                <BackButton/>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-2">
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
