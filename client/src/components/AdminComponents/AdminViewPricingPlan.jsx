import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

function AdminViewPricingPlan({ PricingPlan, setCurrentEditId, setOpenCreateProductDialog, setFormData, handleDeleteCategory , isAdmin , handlePayment }) {
    const featuresArray = PricingPlan.features; // Already an array if stored correctly

    return (
        <div className="flex flex-col border border-gray-300 rounded-xl overflow-hidden dark:border-gray-700">
            <div className="text-center pt-10">
                <h5 className="text-xl font-semibold">{PricingPlan.title}</h5>
                <h2 className="text-5xl mt-8 mb-3 items-center align-middle">
                    <sup className="text-2xl align-middle">$</sup>{PricingPlan.price}
                </h2>
                <span>per user, per {PricingPlan.frequency}</span>
            </div>
            <div className="p-10">
                <ul className="mb-10 text-center">
                    {/* Map through features and render each one in its own line */}
                    {featuresArray.map((feature, index) => (
                        <li key={index} className="my-4 font-medium dark:text-gray-300">{feature}</li>
                    ))}
                </ul>
                
                <div className="flex justify-center">
                {
                        isAdmin ? (
                            <>
                        <Link
                        to="#"
                        className="py-3 px-6 font-medium border rounded-md dark:text-primary border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-500"
                        onClick={() => {
                            setCurrentEditId(PricingPlan._id);
                            setOpenCreateProductDialog(true);
                            setFormData(PricingPlan); // Set the form data to the current plan
                        }}
                    >
                        Edit Plan
                    </Link>
                    <Button
                        className="py-3 px-6 ml-4 font-medium border rounded-md border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-500"
                        onClick={() => handleDeleteCategory(PricingPlan._id)}
                    >
                        Delete Plan
                    </Button>
                            </>
                        ) : (
                        <Button 
                            onClick={()=> handlePayment(PricingPlan)}
                            className="bg-secondary py-3 px-6 font-medium border rounded-md border-secondary text-description hover:bg-hover  transition-all duration-500">
                            Get {PricingPlan.title}
                        </Button>
                        )
                    }
                
                </div>
            </div>
        </div>
    );
}

AdminViewPricingPlan.propTypes = {
    PricingPlan: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,  // Ensure this is a number
        frequency: PropTypes.string.isRequired,
        features: PropTypes.arrayOf(PropTypes.string).isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
    setCurrentEditId: PropTypes.func.isRequired,
    setOpenCreateProductDialog: PropTypes.func.isRequired,
    setFormData: PropTypes.func.isRequired,
    handleDeleteCategory: PropTypes.func.isRequired,
    isAdmin : PropTypes.bool,
    handlePayment : PropTypes.func,
};

export default AdminViewPricingPlan;
