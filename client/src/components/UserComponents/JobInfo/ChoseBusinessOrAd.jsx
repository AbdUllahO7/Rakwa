import BackButton from "@/components/common/BackButton";
import { Card, CardHeader } from "@/components/ui/card";
import { CircleArrowRight } from "lucide-react";
import PropTypes from 'prop-types';

function ChoseBusinessOrAd({
    selectedBusinessOrAd,
    setSelectedBusinessOrAd,
}) {
    return (
        <section className="w-full py-12">
            <div className='container mx-auto'>
                <BackButton/>
                <div className="mb-10 text-center text-2xl font-bold text-secondary flex justify-center items-center">
                    <CircleArrowRight className="mt-1 mr-2 dark:text-primary" />
                    <h2 className='dark:text-primary'>Choose What Type of your Business</h2>
                </div>
                <div className="flex justify-center items-center w-full gap-5 flex-wrap">
                    {/* Card for "ads" */}
                    <Card
                        onClick={() => {
                            setSelectedBusinessOrAd(selectedBusinessOrAd === 'ads' ? '' : 'ads');
                        }}
                        className={`border border-gray-200 shadow-lg  
                            ${selectedBusinessOrAd === 'ads' ? 'bg-hover' : 'bg-secondary'} 
                            text-primary font-bold w-[300px] max-w-xs h-[200px] 
                            flex items-center justify-center cursor-pointer 
                            hover:bg-hover duration-200 rounded-lg overflow-hidden border-0`}
                    >
                        <CardHeader className="flex flex-col justify-center items-center text-center p-4">
                            <img
                                src="https://www.svgrepo.com/show/324135/target-goal-marketing-advertising.svg"
                                alt="Category Icon"
                                className="md:w-16 md:h-16 w-[100px] h-[100px] object-cover mb-3 transition-transform duration-200 hover:scale-105"
                            />
                            <h2 className="text-lg md:text-xl sm:text-base text-primary font-semibold">
                                Advertisement
                            </h2>
                        </CardHeader>
                    </Card>
                    
                    {/* Card for "job" */}
                    <Card
                        onClick={() => {
                            setSelectedBusinessOrAd(selectedBusinessOrAd === 'job' ? '' : 'job');
                        }}
                        className={`border border-gray-200 shadow-lg  
                            ${selectedBusinessOrAd === 'job' ? 'bg-hover' : 'bg-secondary'} 
                            text-primary font-bold w-[300px] max-w-xs h-[200px] 
                            flex items-center justify-center cursor-pointer 
                            hover:bg-hover duration-200 rounded-lg overflow-hidden border-0`}
                    >
                        <CardHeader className="flex flex-col justify-center items-center text-center p-4">
                            <img
                                src="https://cdn-icons-png.freepik.com/512/4926/4926177.png"
                                alt="Category Icon"
                                className="md:w-16 md:h-16 w-[100px] h-[100px] object-cover mb-3 transition-transform duration-200 hover:scale-105"
                            />
                            <h2 className="text-lg md:text-xl sm:text-base text-primary font-semibold">
                                Job
                            </h2>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </section>
    );
}

// Define prop types for validation
ChoseBusinessOrAd.propTypes = {
    selectedBusinessOrAd: PropTypes.string.isRequired,
    setSelectedBusinessOrAd: PropTypes.func.isRequired,
};

export default ChoseBusinessOrAd;
