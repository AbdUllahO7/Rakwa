import BusinessDetailsSkeleton from "@/components/common/BusinessDetailsSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import BusinessComponent from "@/components/UserComponents/BusinessComponent";
import BusinessContact from "@/components/UserComponents/BusinessDetails/BusinessContact";
import BusinessHeader from "@/components/UserComponents/BusinessDetails/BusinessHeader";
import CommentRatingForm from "@/components/UserComponents/BusinessDetails/CommentRatingForm";
import ViewComments from "@/components/UserComponents/BusinessDetails/ViewComments";
import { useToast } from "@/hooks/use-toast";
import { fetchBusinessById } from "@/store/userSlice/businessServiceSlice";
import { createCommentAndRating, getCommentsByBusiness } from "@/store/userSlice/commentAndRating";
import { calculateAverageRating } from "@/utils/Star";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";







function BusinessDetails() {
    const { id } = useParams();
    const { singleBusiness, isLoading } = useSelector(state => state.singleBusiness);
    const {comments} = useSelector(state=> state.comments); 
    const dispatch = useDispatch();
   // Define states for rating, comment, and additional fields as needed
    const [comment, setComment] = useState("");
    const [overallRating, setOverallRating] = useState("");
    const [customerServiceRating, setCustomerServiceRating] = useState("");
    const [priceRating, setPriceRating] = useState("");
    const { toast } = useToast();
    const [reviewsToShow, setReviewsToShow] = useState(6);


  // Extract ratings for calculating averages
    const overallRatings = Array.isArray(comments) ? comments.map((commentItem) => commentItem?.overallRating) : [];
    const customerServiceRatings = Array.isArray(comments) ? comments.map((commentItem) => commentItem?.customerService) : [];
    const priceRatings = Array.isArray(comments) ? comments.map((commentItem) => commentItem?.prices) : [];

    // Calculate average ratings
    const averageOverallRating = calculateAverageRating(overallRatings);
    
    const averageCustomerServiceRating = calculateAverageRating(customerServiceRatings);
    const averagePriceRating = calculateAverageRating(priceRatings);
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page on mount
        dispatch(fetchBusinessById(id));
        dispatch(getCommentsByBusiness(id))
    }, [dispatch, id]);

    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);



    // Predefined list of image URLs
    const imageList = [
        "https://picsum.photos/500/300?image=1", 
        "https://picsum.photos/500/300?image=2", 
        "https://picsum.photos/500/300?image=3", 
        "https://picsum.photos/500/300?image=4", 
        "https://picsum.photos/500/300?image=5"
    ];

      // Handle form submission
    const handleSubmit = (userId) => {
        const ratingData = {
            comment : comment,
            overallRating: overallRating,
            customerService: customerServiceRating,
            prices: priceRating,
            user:userId , 
            business : id
        };

        dispatch(createCommentAndRating({ formData: ratingData   }))
        .then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Comment / Rating added successfully",
                    variant: "success",
                });
                dispatch(fetchBusinessById(id));
                dispatch(getCommentsByBusiness(id))
                setComment('');
                setCustomerServiceRating(null);
                setOverallRating(null);
                setPriceRating(null);
            }
        });

        // Add logic here to send data to the backend if needed
    };




    return (
        <div className="relative">
            
            <div className="container mx-auto px-4">
            <div className="h-[50vh]">
                {/* Blurred Background Image */}
                <div
                    className="absolute  inset-0 bg-contain bg-black bg-center filter blur-2xl h-[50vh] "
                    style={{
                        backgroundImage: `url(${singleBusiness?.images})`,
                    }}
                ></div>

                {/* Content on Top */}
                <div className="relative  bg-opacity-80  w-full flex flex-wrap justify-center items-center h-full">
                    {isLoading ? (
                        <BusinessDetailsSkeleton />
                    ) : (
                            <BusinessHeader 
                                averageOverallRating = {averageOverallRating}
                                averageCustomerServiceRating = {averageCustomerServiceRating}
                                averagePriceRating = {averagePriceRating}
                                title = {singleBusiness?.title}
                                category={singleBusiness?.category}
                                state = {singleBusiness?.state}
                                images = {singleBusiness?.images}
                                country = {singleBusiness?.country}
                                fullAddress = {singleBusiness?.fullAddress}
                                subCategory = {singleBusiness?.subCategoryDetails}
                            />
                    )}
                </div>
            </div>

                {/* Information Section */}
                <div className="flex justify-center items-start gap-10 flex-wrap w-full">

                    <div className="flex flex-col mt-10 justify-center items-center w-full lg:max-w-[700px] ">
                        {/* Description */}
                        <div className="w-full">
                            <h1 className="font-bold text-2xl ">Description</h1>
                            <h2>{singleBusiness?.description}</h2>
                        </div>

                        {/* Features */}
                        <div className="w-full mt-10">
                            <h1 className="font-bold text-2xl ">Features</h1>
                            <ul className="list-disc ml-10">
                                {singleBusiness?.features?.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Carousel with List of Images */}
                        <div className="w-full rounded-lg">
                            <Carousel className="w-full ">
                                <CarouselContent className="">
                                    {imageList.map((image, index) => (
                                        <CarouselItem key={index} className="">
                                            <div className="">
                                                <Card className="h-fit  border-none">
                                                    <CardContent className="flex aspect-square items-center justify-center p-0 rounded-lg dark:bg-black">
                                                        <img src={image} alt={`Carousel image ${index + 1}`} className="w-full rounded-lg" />
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>


                    {/* Show Comments and Ratings */}
                        <ViewComments 
                            comments = {comments}
                            reviewsToShow = {reviewsToShow}
                            setReviewsToShow = {setReviewsToShow}
                        />

                        {/* Rating */}{/* Comments */}
                        <CommentRatingForm
                            overallRating = {overallRating}
                            setOverallRating= {setOverallRating}
                            customerServiceRating= {customerServiceRating}
                            setCustomerServiceRating= {setCustomerServiceRating}
                            priceRating= {priceRating}
                            setPriceRating = {setPriceRating}
                            comment = {comment}
                            setComment={setComment}
                            handleSubmit = {handleSubmit}
                        />
                        {/* Share */}
                        <div className="mb-10 w-full">
                            <h1 className="font-bold text-2xl ">Share On:</h1>
                            <div className="flex gap-2 flex-wrap">
                                {/* Facebook Share */}
                                <a 
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Button className="bg-blue-500">Facebook</Button>
                                </a>

                                {/* Instagram (Placeholder - Sharing via Instagram is app-based) */}
                                <a 
                                    href={`https://www.instagram.com`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Button className="bg-red-300">Instagram</Button>
                                </a>

                                {/* WhatsApp Share */}
                                <a 
                                    href={`https://wa.me/?text=${encodeURIComponent(`Check out this business: ${singleBusiness?.title} - ${window.location.href}`)}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Button className="bg-green-500">WhatsApp</Button>
                                </a>

                                {/* Snapchat (Redirect to the app link page) */}
                                <a 
                                    href={`https://www.snapchat.com/add`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Button className="bg-yellow-500">SnapChat</Button>
                                </a>
                            </div>
                        </div>


                    </div>
                    {/* Map Section */}
                    <BusinessContact singleBusiness = {singleBusiness}/>
                </div>

            <div className="mx-auto w-full mb-10 mt-10">
                <h2 className="text-center text-2xl font-bold">Similar Business</h2>
                <BusinessComponent/>
            </div>

            </div>

        </div>
    );
}

export default BusinessDetails;
