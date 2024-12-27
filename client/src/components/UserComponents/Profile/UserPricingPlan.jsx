import AdminViewPricingPlan from "@/components/AdminComponents/AdminViewPricingPlan";
import { fetchAllPricingPlan } from "@/store/adminSlice/AdminPricingPlan";
import { makePayment } from "@/utils/Payment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


function UserPricingPlan() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { PricingPlanList } = useSelector((state) => state.PricingPlanList);

    useEffect(() => {
        dispatch(fetchAllPricingPlan());
    }, [dispatch]);


    // Call makePayment with selected plan and user
    const handlePayment = (SelectedPlan) => {
        makePayment(SelectedPlan, user);
    };

    return (
        <div className="flex justify-center flex-col items-center gap-10">
            <h2 className="text-xl font-bold">Your Current Plan</h2>
            {user.PlanType ? (
                // Display user's current plan details
                <div className="flex flex-col border border-gray-300 rounded-xl overflow-hidden dark:border-gray-700 w-[500px]">
                    <div className="text-center pt-10">
                        <h5 className="text-xl font-semibold">{user.PlanType.title}</h5>
                        <h2 className="text-5xl mt-8 mb-3 items-center align-middle">
                            <sup className="text-2xl align-middle">$</sup>
                            {Number(user.PlanType.price).toFixed(2)} {/* Ensure price is a number */}
                        </h2>
                        <span>per user, per {user.PlanType.frequency}</span>
                    </div>
                    <div className="p-10">
                        <ul className="mb-10 text-center">
                            {Array.isArray(user.PlanType.features)
                                ? user.PlanType.features.map((feature, index) => (
                                        <li key={index} className="my-4 font-medium dark:text-gray-300">
                                            {feature.trim()}
                                        </li>
                                    ))
                                    : user.PlanType.features.split(",").map((feature, index) => (
                                        <li key={index} className="my-4 font-medium dark:text-gray-300">
                                            {feature.trim()}
                                        </li>
                                    ))}
                        </ul>
                        <div className="flex justify-center">
                            <Link
                                to="/PricingPlans"
                                className=" bg-hover text-title py-3 px-6 font-medium border rounded-md border-secondary  transition-all duration-500"
                            >
                                Upgrade Your Plan
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                // Display list of available plans
                <div className="flex flex-wrap justify-evenly items-center gap-5">
                    {PricingPlanList && PricingPlanList.length > 0 ? (
                        PricingPlanList.map((plan) => (
                            <AdminViewPricingPlan
                                PricingPlan={{
                                    ...plan,
                                    price: Number(plan.price), // Convert price to number
                                }}
                                key={plan._id}
                                handlePayment={handlePayment}
                            />
                        ))
                    ) : (
                        <p>No pricing plans available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserPricingPlan;
