import PropTypes from 'prop-types';
import { Separator } from '../ui/separator';
import { useNavigate } from 'react-router-dom';

function BusinessAllUserCard({ business  }) {

    const navigate = useNavigate();



    return (
        <div className="max-w-full relative sm:max-w-sm md:max-w-md lg:max-w-lg w-[300px] bg-white border h-[390px] border-gray-200 rounded-xl
            shadow-xl hover:bg-gray-100 hover:-translate-y-1 duration-200 cursor-pointer" onClick={()=> navigate(`/user/BusinessDetails/${business?._id}`)}>
        <div className=''>
                <img 
                    className="rounded-t-lg w-full h-full" 
                    src={business?.images} 
                    alt="Business" 
                />
            </div>
            <div className="p-3">
                    <h5 className="mb-1 text-lg sm:text-xl font-bold  text-start  overflow-clip">
                            {business?.title}
                        </h5>
                        <p className="mb-1 font-normal w-full text-sm sm:text-base text-start  overflow-clip line-clamp-2">
                            {business?.description}
                        </p>
                <div className="flex flex-col gap-1 mt-1">
                
                    <Separator />
                        {
                        business.BusinessType === "Location" ?
                        <div className='flex justify-between mt-2'>
                            <span className=' text-secondary p-1 text-sm rounded-lg border border-secondary'>{business?.open ? "Open Now" : "Close"}</span>
                            <span className=' text-secondary p-1 text-sm rounded-lg border border-secondary '>{business?.open ? "Open Until 10:00" : "Close"}</span>
                        </div> : <div className='flex justify-between mt-2'>
                            <span className=' text-secondary p-1 text-sm rounded-lg border border-secondary'>{business?.open ? "Open Now" : "Close"}</span>
                            <span 
                            className={`${business?.Accept ? 'bg-green-700' : 'bg-black text-white '}  text-primary  rounded-lg flex items-center gap-1 
                                text-xs w-fit p-1 text-center`}
                        >
                            {business.BusinessType}
                </span>
                        </div>
                        }
                    {
                        business.BusinessType === "Location" ?
                        <div className='mt-2 flex justify-between mb-2'>
                            <span className=' text-secondary p-1 text-sm rounded-lg'>{business?.city}</span>
                            <span className=' text-secondary p-1 text-sm rounded-lg'>{business?.country}</span>
                    </div> : null
                    }
            

                        
                </div>
            </div>
        </div>
    );
}

BusinessAllUserCard.propTypes = {
    business: PropTypes.object.isRequired,
    isAdmin : PropTypes.bool,
};

export default BusinessAllUserCard;
