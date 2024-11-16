import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast';
import { createFavorite, getFavorites } from '@/store/userSlice/FavoritesSlice';
import { Ban, CheckCheck, Heart } from 'lucide-react'
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LatestBusinessAndServices({ product }) {
    const {user , isAuthenticated} = useSelector((state)=> state.auth);
    const {toast} = useToast();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const renderCategory = () => {
        if (Array.isArray(product?.category)) {
        // Map through the array and join category titles with a comma
        return product.category.map((cat) => cat.title).join(', ');
        } else if (product?.category?.title) {
        // Render the title if it's a single object
        return product.category.title;
        }
        return 'Unknown Category'; // Fallback if category is undefined or invalid
    };

    const handleNavigation = () => {
        if (product?.open) {
            navigate(`/BusinessDetails/${product?._id}`);
        }
    };

    useEffect(()=> {
        dispatch(getFavorites(user.id))
    } ,[dispatch, user.id])

    const handleHeartClick = (event) => {
        event.stopPropagation(); // This will stop the event from bubbling up to the Card onClick
        dispatch(createFavorite({ userId : user?.id , businessIds : [product?._id] }))
        .then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "favorites updated Successfully",
                    variant: "success",
                });

            }

        })

    };

return (
    <Card  onClick={handleNavigation} className={`w-full max-w-sm mx-auto duration-500 hover:bg-gray-100 dark:hover:bg-secondary 
        shadow-lg hover:-translate-y-3 cursor-pointer mb-2 ${product?.open ? 'cursor-pointer ' : 'cursor-not-allowed ' } `}>
    <div className="">
        <div className="relative">
        <img
            src={product?.images}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
        />
        <Badge onClick={handleHeartClick} className="absolute bottom-2 left-2 bg-secondary flex gap-3 group">
            <Heart  className="text-primary w-5 h-5 group-hover:text-secondary" />
        </Badge>
        </div>
        <CardContent className="p-4">
        <h2 className="text-xl text-secondary dark:text-primary font-bold mb-2">
            {product?.title}
        </h2>
        </CardContent>
        <CardFooter className="flex justify-between border-t mt-1 pt-3">
        <div className="flex justify-between items-center mb-2">
            <span className="text-md text-secondary font-bold dark:text-primary">
            {renderCategory()}
            </span>
        </div>
        <div className="flex justify-between items-center gap-3 mb-2">
            {product?.open ? (
            <CheckCheck className="text-green-500 size-5" />
            ) : (
            <Ban className="text-red-800 size-5" />
            )}
            <span
            className={`${
                product?.open ? 'text-secondary dark:text-primary' : 'text-red-500'
            }`}
            >
            {product?.open ? 'Open' : 'Close'}
            </span>
        </div>
        </CardFooter>
    </div>
    </Card>
);
}

LatestBusinessAndServices.propTypes = {
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

export default LatestBusinessAndServices;
