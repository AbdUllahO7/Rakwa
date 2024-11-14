import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

function UserPricingPlan() {

    const {user} = useSelector(state=> state.auth);

    return (
        <div className="flex justify-center flex-col items-center gap-10">
            <h2 className="text-xl font-bold ">Your Current Plan</h2>
        {user.PlanType && user.PlanType.length > 0 ? (
            user.PlanType.map((PricingPlan) => {
                // Check if features is an array or a string
                const featuresArray = Array.isArray(PricingPlan.features) 
                    ? PricingPlan.features 
                    : PricingPlan.features.split(','); // Split only if it's a string
                return (
                    <div key={PricingPlan._id} className="flex flex-col border border-gray-300 rounded-xl overflow-hidden dark:border-gray-700 w-[500px]">
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
                                <Link to = "/user/PricingPlans"  className="dark:text-primary py-3 px-6 font-medium border rounded-md border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-500">
                                    Upgrade Your Plan {PricingPlan.title}
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
    )
}

export default UserPricingPlan
