import { Card, CardHeader } from '@/components/ui/card';
import PropTypes from 'prop-types';

function Category({ Category, handleCardClick, isSelected , typeOfCategory }) {
    return (
        <Card
            onClick={() => handleCardClick(Category?._id , typeOfCategory)}
            className={`border border-gray-200 shadow-lg hover:shadow-xl transition-shadow 
                        ${isSelected ? 'bg-green-900' : 'bg-secondary'} 
                        text-primary font-bold mx-auto w-full max-w-xs h-[200px] 
                        flex items-center justify-center cursor-pointer 
                        hover:bg-green-900 duration-500 rounded-lg overflow-hidden border-0`}
        >
            <CardHeader className="flex flex-col justify-center items-center text-center p-4">
                {Category.image && (
                    <img
                        src={Category.image}
                        alt="Category Icon"
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover mb-3 transition-transform duration-200 hover:scale-105"
                    />
                )}
                <h2 className="text-lg md:text-xl sm:text-base text-primary font-semibold">{Category?.title}</h2>
            </CardHeader>
        </Card>
    );
}

Category.propTypes = {
    Category: PropTypes.object.isRequired,
    handleCardClick: PropTypes.func,
    isSelected: PropTypes.bool,
    typeOfCategory  : PropTypes.string
};

export default Category;
