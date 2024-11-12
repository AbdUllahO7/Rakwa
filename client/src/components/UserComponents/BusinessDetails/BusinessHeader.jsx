import { Button } from "@/components/ui/button";
import { renderAverageStars } from "@/utils/Star";
import { MapPin, PhoneCall, QrCode, Save, Share, Star } from "lucide-react";
import PropTypes from "prop-types";

function BusinessHeader({
    averageOverallRating,
    averageCustomerServiceRating,
    averagePriceRating,
    title,
    category,
    country,
    state,
    images,
    fullAddress
}) {
    return (
        <>
            <div className="flex-col gap-1 flex-wrap items-center justify-center w-[500px] text-start">
                <h2 className="text-4xl font-bold text-secondary mb-1  ">{title}</h2>
                {category?.map((item, index) => (
                    <span
                        key={index}
                        className="bg-secondary text-primary font-bold mr-2 text-lg p-1 rounded-lg"
                    >
                        {item?.title}
                    </span>
                ))}
                <p className="text-black font-bold gap-2 text-lg dark:text-primary">
                    {country} <span> {state} </span>
                </p>
                <MapPin className="text-black dark:text-primary" />
                <p className="flex text-black font-bold gap-2 text-lg dark:text-primary">{fullAddress}</p>
                {/* Average Ratings Section */}
            </div>

            <div className="flex justify-center items-end gap-6 w-[600px] flex-wrap ">
                <img src={images} alt="" className="rounded-lg w-[200px]" />
                <div className="flex gap-2">
                    <Button className="bg-secondary rounded-lg hover:bg-green-900 duration-300"><Star /></Button>
                    <Button className="bg-secondary rounded-lg hover:bg-green-900 duration-300"><Share /></Button>
                    <Button className="bg-secondary rounded-lg hover:bg-green-900 duration-300"><Save /></Button>
                    <Button className="bg-secondary rounded-lg hover:bg-green-900 duration-300"><PhoneCall /></Button>
                    <Button className="bg-secondary rounded-lg hover:bg-green-900 duration-300"><QrCode /></Button>
                </div>
                <div className="flex gap-4 mt-6">
                    <div className="flex flex-col items-center">
                        <h2 className="text-lg font-bold">Overall Rating</h2>
                        <div className="flex gap-1">{renderAverageStars(averageOverallRating)}</div>
                        <span className="font-bold">{averageOverallRating.toFixed(1)} / 5</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="font-bold text-lg">Customer Service</h2>
                        <div className="flex gap-1">{renderAverageStars(averageCustomerServiceRating)}</div>
                        <span className="font-bold">{averageCustomerServiceRating.toFixed(1)} / 5</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="font-bold text-lg">Prices</h2>
                        <div className="flex gap-1">{renderAverageStars(averagePriceRating)}</div>
                        <span className="font-bold">{averagePriceRating.toFixed(1)} / 5</span>
                    </div>
                </div>
            </div>
        </>
    );
}

BusinessHeader.propTypes = {
    averageOverallRating: PropTypes.number.isRequired,
    averageCustomerServiceRating: PropTypes.number.isRequired,
    averagePriceRating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
        })
    ),
    country: PropTypes.string.isRequired,
    state: PropTypes.string,
    images: PropTypes.string,
    fullAddress: PropTypes.string.isRequired,
};

export default BusinessHeader;
