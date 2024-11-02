import PropTypes from 'prop-types';
import { Separator } from '../ui/separator';
import { BadgeAlert, CircleCheckBig, UserRound } from 'lucide-react';

function BusinessCard({ business, handleGetBusinessDetails  }) {
    return (
        <div className="max-w-sm w-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#" onClick={() => handleGetBusinessDetails(business?._id)}>
                <img className="rounded-t-lg w-[200px] h-[200px] m-auto mt-5" src={business?.images} alt="Business" />
            </a>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {business?.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {business?.description}
                </p>
                <Separator/>
                <div className="flex gap-1 flex-col mt-2">
                                <div>
                                {business?.category?.map((cat, index) => (
                                        <div key={index} className='inline-flex flex-wrap items-center gap-2 bg-primary rounded-lg '>
                                            <img src={cat?.image} alt="" className='w-8 h-8 ' />
                                            <span className='font-bold p-1   mr-1' >{cat?.title}{index < business.category.length - 1 ? '' : ''}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                {business?.subCategoryDetails?.map((subCat, index) => (
                                        <div key={index} className='inline-flex flex-wrap items-center gap-3 bg-primary rounded-lg'>
                                            <img src={subCat?.image} alt="" className='w-6 h-6' />
                                            <span className='font-bold text-sm p-1 bg-primary rounded-lg mr-1' key={index}>{subCat?.title}{index < business.subCategoryDetails.length - 1 ? '' : ''}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex mt-5 gap-4'>
                                    <span className='mb-5 p-1 bg-primary rounded-lg mr-1 flex gap-2 font-bold text-md w-fit'> <UserRound /> {business?.owner?.userName || 'N/A'}</span>
                                    <span  className={`${business?.Accept ? 'bg-green-700': 'bg-red-900 '} text-primary mb-5 p-1  rounded-lg mr-1 flex gap-2 font-bold text-md w-[130px]`}> {business?.Accept ? <CircleCheckBig /> : <BadgeAlert />} {business?.Accept ? 'Accept' : 'Not Accept'}</span>
                                </div>
                            </div>
            </div>
        
        </div>
    );
}

BusinessCard.propTypes = {
    business: PropTypes.object.isRequired,
    handleGetBusinessDetails: PropTypes.func.isRequired,
};

export default BusinessCard;
