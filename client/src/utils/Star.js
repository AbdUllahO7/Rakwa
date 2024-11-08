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
