import { loadStripe } from "@stripe/stripe-js";
import { StripePublishableKey } from "@/config/keys"; // Adjust if needed


export const makePayment = async (SelectedPlan, user) => {
    if (!user) {
        console.error("User is not authenticated.");
        return;
    }


    try {
        const stripe = await loadStripe(StripePublishableKey);

        const body = {
            plan: SelectedPlan,
            userId: user?._id, // Pass the user's ID
        };

        const headers = {
            "Content-Type": "application/json",
        };

        const res = await fetch("http://localhost:5000/api/stripe/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });

        const session = await res.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error("Stripe Checkout error:", result.error);
        }


    } catch (error) {
        console.error("Error initiating payment:", error);
    }
};
