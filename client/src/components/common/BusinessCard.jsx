import PropTypes from 'prop-types';
import { Separator } from '../ui/separator';
import { BadgeAlert, Check, CircleCheckBig, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { updateOpenValue } from '@/store/userSlice/businessServiceSlice';
import { useToast } from '@/hooks/use-toast';

function BusinessCard({ business, isAdmin }) {
    const navigate = useNavigate();
    const [isClose, setIsClose] = useState(business.open);
    const dispatch = useDispatch();
    const { toast } = useToast();

    // Handle toggle and update
    const handleToggle = async () => {
        const newOpenValue = !isClose; // Optimistically update state
        setIsClose(newOpenValue);
        try {
            const response = await dispatch(updateOpenValue({ id: business._id, open: newOpenValue }));
            if (response?.payload?.success) {
                toast({
                    title: `Your business is now ${newOpenValue ? 'OPEN' : 'CLOSED'}`,
                    variant: 'success',
                });
            } else {
                // If API call fails, rollback the local state
                setIsClose(!newOpenValue);
                toast({
                    title: 'Failed to update business status.',
                    variant: 'error',
                });
            }
        } catch (error) {
            // Rollback the local state on API error
            setIsClose(!newOpenValue);
            toast({
                title: 'An error occurred while updating.',
                variant: 'error',
            });
        }
    };

    return (
        <div className="max-w-full relative sm:max-w-sm md:max-w-md lg:max-w-lg w-[300px] bg-secondary  rounded-lg shadow">
            <div>
                <img
                    className="rounded-t-lg w-20 h-20 sm:w-28 sm:h-28 md:w-35 md:h-30 lg:w-30 lg:h-30 m-auto mt-5"
                    src={business?.images}
                    alt="Business"
                />
                <span
                    className={`${business?.Accept ? 'bg-hover' : 'bg-red-900'} absolute top-0 text-primary rounded-lg flex items-center gap-1 
                        text-xs w-fit p-1 text-center`}
                >
                    {business?.Accept ? <CircleCheckBig className="size-1" /> : <BadgeAlert className="size-3" />}
                    {business?.Accept ? 'Accept' : 'Not Accept'}
                </span>
                <span
                    className={`${business?.Accept ? 'bg-hover' : 'bg-red-900'} absolute top-0 right-0 text-primary rounded-lg flex items-center gap-1 
                        text-xs w-fit p-1 text-center`}
                >
                    {business.BusinessType}
                </span>
            </div>
            <div className="p-3">
                <h5 className="mb-1 text-lg sm:text-xl font-bold text-center overflow-clip text-title">
                    {business?.title}
                </h5>
                <p className="mb-1 font-normal w-full text-sm sm:text-base text-center overflow-clip line-clamp-2 text-description">
                    {business?.description}
                </p>
                <Separator />
                <div className="flex flex-col gap-1 mt-1">
                    <div>
                        <h2 className="font-bold text-title text-md sm:text-lg ">Categories </h2>
                        <div className="flex rounded-lg flex-wrap items-center gap-1 p-1">
                            {business?.category?.map((cat, index) => (
                                <div key={index} className="flex items-center mt-1">
                                    <span className="font-bold text-sm bg-hover p-1 rounded-md sm:text-base ">
                                        {cat?.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold text-title text-md sm:text-lg ">Sub Categories</h2>
                        <div className="flex rounded-lg flex-wrap items-center gap-1 p-1">
                            {business?.subCategoryDetails?.map((subCat, index) => (
                                <div key={index} className="flex items-center">
                                    <span className="font-bold text-sm bg-hover p-1 rounded-md sm:text-base">
                                        {subCat?.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {isAdmin ? (
                        <Button
                            onClick={() => navigate(`/admin/BusinessInfo/${business?._id}`)}
                            className="bg-hover mt-3 w-full sm:w-auto mx-auto "
                        >
                            <Info className="mr-2 dark:text-primary" /> Show All Details
                        </Button>
                    ) : (
                        <Button
                            onClick={() => navigate(`/userProfile/BusinessInfo/${business?._id}`)}
                            className="bg-hover mt-3 w-full sm:w-auto mx-auto dark:text-primary"
                        >
                            <Info className="mr-2 title-description" /> Show All Details
                        </Button>
                    )}
                </div>
                    {
                        isAdmin ? null : (
                            <div className='flex gap-5 justify-center items-center mt-5'>
                    
                            <div
                                onClick={handleToggle}
                                className={`w-14 h-8 flex items-center rounded-full cursor-pointer p-1 
                                        ${isClose ? 'bg-hover' : 'bg-red-900'}`}
                            >
                                <div
                                    className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 
                                            ${isClose ? 'translate-x-6' : 'translate-x-0'}`}
                                >
                                    {isClose ? (
                                        <Check className="w-5 h-5 text-gray-700 mx-auto mt-0.5" />
                                    ) : (
                                        <LockClosedIcon className="w-5 h-5 text-title mx-auto mt-0.5" />
                                    )}
                                </div>
                            </div>
                            <h2>{isClose ? 'OPEN' : 'CLOSED'}</h2>
                            </div>
                        ) 
                    }
                
            </div>
        </div>
    );
}

BusinessCard.propTypes = {
    business: PropTypes.object.isRequired,
    isAdmin: PropTypes.bool,
};

export default BusinessCard;
