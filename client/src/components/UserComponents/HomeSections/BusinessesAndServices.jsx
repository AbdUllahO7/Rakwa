import PropTypes from 'prop-types'; // Import PropTypes
import { Ban, CheckCheck, Codesandbox } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function BusinessesAndServices({ product }) {
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (product?.open) {
            navigate(`/BusinessDetails/${product?._id}`);
        }
    };


    return (
        <div onClick={handleNavigation}  className={`relative w-[300px] h-[300px] gap-10 flex flex-wrap   ${product?.open ? 'cursor-pointer' : 'cursor-not-allowed '}`}>
            <div className="w-full">
                <img
                    alt={product?.title} // Use the product title as alt text for better accessibility
                    className="block h-full w-full rounded-lg object-cover object-center"
                    src={product?.images} // Render the single image
                />
                {/* Overlay div for title and description */}
                <div className={`absolute inset-0 flex flex-col justify-center items-start gap-10 bg-secondary rounded-lg transform translate-x-0 translate-y-0 ${product?.open ? 'bg-opacity-50' : 'bg-opacity-90'}`}>
                    <div className="flex flex-col justify-start items-start ml-6">
                        <h3 className="text-3xl font-semibold text-white line-clamp-1">{product.title}</h3>
                        <div className="text-xl font-semibold text-white mt-3 flex gap-9">
                            <div className="flex items-center justify-center gap-2">
                                {product?.open ? <CheckCheck className="text-green-500" /> : <Ban className="text-red-800" />}
                                <p className={`${product?.open ? "text-green-500" : "text-red-800"}`}>{product?.open ? "Open" : "Close"}</p>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Codesandbox />
                                <p className='line-clamp-2'>
                                    {/* Check if category is an array or object */}
                                    {Array.isArray(product?.category)
                                        ? product?.category.map((cat) => cat.title).join(', ') // Render a comma-separated string
                                        : product?.category?.title || "No category"} {/* Render object property */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


BusinessesAndServices.propTypes = {
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        images: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        category: PropTypes.oneOfType([
            PropTypes.arrayOf(
                PropTypes.shape({
                    _id: PropTypes.string.isRequired,
                    title: PropTypes.string.isRequired,
                })
            ),
            PropTypes.shape({
                _id: PropTypes.string,
                title: PropTypes.string,
            }),
        ]),
    }).isRequired,
};

export default BusinessesAndServices;
