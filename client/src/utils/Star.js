import { Star } from "lucide-react";
import React from "react";

export const renderAverageStars = (averageRating) => {
    return Array.from({ length: 5 }, (_, i) => {
        return React.createElement(Star, {
            key: i,
            size: 20,
            className: i < averageRating ? "text-yellow-400" : "text-gray-300",
        });
    });
};

export const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
        return React.createElement(Star, {
            key: i,
            size: 20,
            className: i < rating ? "text-yellow-400" : "text-gray-300",
        });
    });
};


export const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0; // Avoid division by zero
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length;
    };

export  const showMoreReviews = (setReviewsToShow) => {
    setReviewsToShow(prev => prev + 4); // Increase the number of reviews displayed by 6
};