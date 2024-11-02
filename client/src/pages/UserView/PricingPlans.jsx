import { fetchAllPricingPlan } from "@/store/adminSlice/AdminPricingPlan";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PricingPlans() {
    const dispatch = useDispatch();
    const { PricingPlanList } = useSelector((state) => state.PricingPlanList);

    useEffect(() => {
        dispatch(fetchAllPricingPlan());
    }, [dispatch]);

    return (
        <section className="py-12">
            <div className="container mx-auto px-4 ">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="font-medium text-gray-400 tracking-widest">our price</span>
                    <h2 className="md:text-5xl text-3xl font-medium tracking-tight mt-7">Price Plans</h2>
                    <div className="w-10 mx-auto mt-5 bg-gradient-to-r from-cyan-500 to-blue-500 h-[2px]"></div>
                    <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
                        Choose the plan that suits your needs best and enjoy the creative process of brainstorming your new project.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 2xl:px-28 mt-20">
                    {PricingPlanList && PricingPlanList.length > 0 ? (
                        PricingPlanList.map((PricingPlan) => {
                            // Check if features is an array or a string
                            const featuresArray = Array.isArray(PricingPlan.features) 
                                ? PricingPlan.features 
                                : PricingPlan.features.split(','); // Split only if it's a string

                            return (
                                <div key={PricingPlan._id} className="flex flex-col border border-gray-300 rounded-xl overflow-hidden dark:border-gray-700">
                                    <div className="text-center pt-10">
                                        <h5 className="text-xl font-semibold">{PricingPlan.title}</h5>
                                        <h2 className="text-5xl mt-8 mb-3 items-center align-middle">
                                            <sup className="text-2xl align-middle">$</sup>{Number(PricingPlan.price).toFixed(2)} {/* Ensure price is a number */}
                                        </h2>
                                        <span>per user, per {PricingPlan.frequency}</span>
                                    </div>
                                    <div className="p-10">
                                        <ul className="mb-10 text-center">
                                            {/* Map through features and render each one in its own line */}
                                            {featuresArray.map((feature, index) => (
                                                <li key={index} className="my-4 font-medium dark:text-gray-300">{feature.trim()}</li>
                                            ))}
                                        </ul>
                                        <div className="flex justify-center">
                                            <Link to = "/user/JobInfo"  className="py-3 px-6 font-medium border rounded-md border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-500">
                                                Get {PricingPlan.title}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-gray-500">No pricing plans available</div>
                    )}
                </div>
                <h5 className="text-center font-medium mt-14">Interested in a custom plan? <a href="#" className="text-purple-500">Get in touch</a></h5>
            </div>
        </section>
    );
}

export default PricingPlans;
