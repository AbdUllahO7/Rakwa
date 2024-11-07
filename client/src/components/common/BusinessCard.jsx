import PropTypes from 'prop-types';
import { Separator } from '../ui/separator';
import { BadgeAlert, CircleCheckBig, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

function BusinessCard({ business , isAdmin }) {

    const navigate = useNavigate();


    return (
        <div className="max-w-full relative sm:max-w-sm md:max-w-md lg:max-w-lg w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className=''>
                <img 
                    className="rounded-t-lg w-20 h-20 sm:w-28 sm:h-28 md:w-35 md:h-30 lg:w-30 lg:h-30 m-auto mt-5" 
                    src={business?.images} 
                    alt="Business" 
                />
                <span 
                    className={`${business?.Accept ? 'bg-green-700' : 'bg-red-900'} absolute top-0 text-primary  rounded-lg flex items-center gap-1 
                        text-xs w-fit p-1 text-center`}
                >
                    {business?.Accept ? <CircleCheckBig className='size-1'/> : <BadgeAlert className='size-3'/>} {business?.Accept ? 'Accept' : 'Not Accept'}
                </span>
                <span 
                    className={`${business?.Accept ? 'bg-green-700' : 'bg-red-900'} absolute top-0 right-0 text-primary  rounded-lg flex items-center gap-1 
                        text-xs w-fit p-1 text-center`}
                >
                    {business.BusinessType}
                </span>
            </div>
            <div className="p-3">
                    <h5 className="mb-1 text-lg sm:text-xl font-bold  text-center  overflow-clip">
                            {business?.title}
                        </h5>
                        <p className="mb-1 font-normal w-full text-sm sm:text-base text-center  overflow-clip  line-clamp-2">
                            {business?.description}
                        </p>
                <Separator />
                <div className="flex flex-col gap-1 mt-1">
                    <div>
                        <h2 className="font-bold text-secondary text-md sm:text-lg">Categories </h2>
                        <div className="flex  rounded-lg flex-wrap items-center gap-1 p-1">
                            {business?.category?.map((cat, index) => (
                                <div key={index} className="flex items-center mt-1">
                                    <span className="font-bold text-sm bg-primary p-1 rounded-md sm:text-base">{cat?.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="font-bold text-secondary text-md sm:text-lg">Sub Categories</h2>
                        <div className="flex  rounded-lg flex-wrap items-center gap-1 p-1">
                            {business?.subCategoryDetails?.map((subCat, index) => (
                                <div key={index} className="flex items-center">
                                    <span className="font-bold text-sm bg-primary p-1 rounded-md sm:text-base">{subCat?.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {
                        isAdmin ?
                                <Button onClick = {()=> navigate(`/admin/BusinessInfo/${business?._id}`)} className="bg-secondary mt-3 w-full sm:w-auto mx-auto">
                                    <Info className="mr-2" /> Show All Details
                                </Button> 
                                : 
                                <Button onClick = {()=> navigate(`/user/userProfile/BusinessInfo/${business?._id}`)} className="bg-secondary mt-3 w-full sm:w-auto mx-auto">
                                    <Info className="mr-2" /> Show All Details
                                </Button>
                    }
            
                </div>
            </div>
        </div>
    );
}

BusinessCard.propTypes = {
    business: PropTypes.object.isRequired,
    isAdmin : PropTypes.bool,
};

export default BusinessCard;
