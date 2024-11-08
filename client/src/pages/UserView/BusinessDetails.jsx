import BusinessDetailsSkeleton from "@/components/common/BusinessDetailsSkeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import BusinessComponent from "@/components/UserComponents/BusinessComponent";
import { useToast } from "@/hooks/use-toast";
import { fetchBusinessById } from "@/store/userSlice/businessServiceSlice";
import { createCommentAndRating, getCommentsByBusiness } from "@/store/userSlice/commentAndRating";
import { Facebook, Instagram, MailIcon, MapPin, PhoneCall, PhoneCallIcon, PhoneForwarded, QrCode, Save, Share, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";


const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <Star
                key={i}
                size={20}
                className={i < rating ? "text-yellow-400" : "text-gray-300"}
            />
        );
    }
    return stars;
};
const renderAverageStars = (averageRating) => {
    const stars = [];
        for (let i = 0; i < 5; i++) {
        stars.push(
            <Star
            key={i}
            size={20}
            className={i < averageRating ? "text-yellow-400" : "text-gray-300"}
            />
        );
        }
        return stars;
    };

const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0; // Avoid division by zero
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length;
  };


function BusinessDetails() {
    const { id } = useParams();
    const { singleBusiness, isLoading } = useSelector(state => state.singleBusiness);
    const {comments} = useSelector(state=> state.comments); // this will return a data {userId, businessID, comment, overallRating, customerService, prices }
    const dispatch = useDispatch();
   // Define states for rating, comment, and additional fields as needed
    const [comment, setComment] = useState("");
    const [overallRating, setOverallRating] = useState("");
    const [customerServiceRating, setCustomerServiceRating] = useState("");
    const [priceRating, setPriceRating] = useState("");
    const {user} = useSelector(state => state.auth);
    const { toast } = useToast();
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

    console.log(customerServiceRating)

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
                        <>
                            <div className="flex-col gap-1  flex-wrap items-center justify-center w-[500px] text-start">
                                <h2 className="text-4xl font-bold text-secondary mb-1">{singleBusiness?.title}</h2>
                                {singleBusiness?.category?.map((item, index) => (
                                    <span key={index} className="bg-secondary text-primary font-bold mr-2 text-lg p-1 rounded-lg">{item?.title}</span>
                                ))}
                                <p className="text-black font-bold gap-2 text-lg">{singleBusiness?.country} <span> {singleBusiness?.state} </span></p>
                                <MapPin className="text-black"/>
                                <p className="flex text-black font-bold gap-2 text-lg">{singleBusiness?.fullAddress}</p>
                                  {/* Average Ratings Section */}
                                
                            </div>
                            <div className="flex justify-center items-end gap-6 w-[600px] flex-wrap">
                                <img src={singleBusiness?.images} alt="" className=" rounded-lg w-[200px]" />
                                <div className="flex gap-2 ">
                                    <Button className="bg-secondary rounded-lg hover:bg-green-900 duration-300"><Star /></Button>
                                    <Button className="bg-secondary rounded-lg hover:bg-green-900 duration-300"><Share /></Button>
                                    <Button className="bg-secondary rounded-lg hover:bg-green-900 duration-300"><Save /></Button>
                                    <Button className="bg-secondary rounded-lg hover:bg-green-900 duration-300"><PhoneCall /></Button>
                                    <Button className="bg-secondary rounded-lg hover:bg-green-900 duration-300"><QrCode /></Button>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <div className="flex flex-col items-center">
                                        <h2 className=" text-lg font-bold">Overall Rating</h2>
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
                    )}
                </div>
            </div>

            {/* Information Section */}
            <div className="flex justify-center items-start gap-10 flex-wrap w-full">

                <div className="flex flex-col mt-10 justify-center items-center w-full lg:max-w-[700px] ">
                    {/* Description */}
                    <div className="w-full">
                        <h1 className="font-bold text-2xl text-secondary">Description</h1>
                        <h2>{singleBusiness?.description}</h2>
                    </div>

                    {/* Features */}
                 {/* Features */}
                    <div className="w-full mt-10">
                        <h1 className="font-bold text-2xl text-secondary">Features</h1>
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
                                                <CardContent className="flex aspect-square items-center justify-center p-0 rounded-lg">
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
                    <div className="mb-10 w-full">
                        <h1 className="font-bold text-2xl text-secondary">Customer Reviews</h1>
                    
                        {/* Map through comments */}
                        <div className="flex flex-wrap w-full gap-7">
                        {comments && comments.length > 0 ? (
                                comments.slice(-6).map((commentItem, index) => (
                                <div key={index} className="flex flex-row gap-4 mt-5 flex-wrap w-[300px]">
                                    {/* User Avatar */}
                                    <div className="flex gap-4 items-center w-full">
                                            <Avatar className="bg-black">
                                                <AvatarFallback className="bg-secondary text-primary cursor-pointer font-extrabold">
                                                    {commentItem?.user?.userName?.[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex gap-1 flex-col">
                                                {/* Render star ratings for each category */}
                                                <div className="flex gap-2">
                                                    <span>Over All</span>
                                                    {renderStars(commentItem?.overallRating)}
                                                </div>
                                                <div className="flex gap-2">
                                                    customerService{renderStars(commentItem?.customerService)}
                                                </div>
                                                <div className="flex gap-2">
                                                    prices{renderStars(commentItem?.prices)}
                                                </div>
                                                  {/* Comment */}
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-black font-bold">{commentItem?.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                            {
                                comments && comments.length > 6 ? (
                                    <div className=" mx-auto">
                                <Button className="bg-secondary">Show More Reviews</Button>
                                </div>
                                ) : null
                            }
                        </div>
                    </div>


                    {/* Rating */}
                    <div className="w-full mb-10">
                        <h1 className="font-bold text-2xl text-secondary">Rating</h1>
                        <div className="flex flex-wrap w-full justify-center items-center gap-7">
                            <div>
                            <Select onValueChange={setOverallRating} value={overallRating || ""}>
                                <h2 className="font-bold mb-1 text-center">Overall Rating</h2>
                                <div>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Rate" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Overall Rating</SelectLabel>
                                    <SelectItem value="1">1 Star</SelectItem>
                                    <SelectItem value="2">2 Star</SelectItem>
                                    <SelectItem value="3">3 Star</SelectItem>
                                    <SelectItem value="4">4 Star</SelectItem>
                                    <SelectItem value="5">5 Star</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                                </div>
                            </Select>
                            </div>
                            <div>
                            <Select onValueChange = {setCustomerServiceRating} value={customerServiceRating || ""} >
                                <h2 className="font-bold mb-1 text-center">Customer Service</h2>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Rate" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Customer Service</SelectLabel>
                                    <SelectItem value="1">1 Star</SelectItem>
                                    <SelectItem value="2">2 Star</SelectItem>
                                    <SelectItem value="3">3 Star</SelectItem>
                                    <SelectItem value="4">4 Star</SelectItem>
                                    <SelectItem value="5">5 Star</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            </div>
                            <div>
                            <Select onValueChange={setPriceRating} value={priceRating || ""}>
                            <h2 className="font-bold mb-1 text-center">Prices</h2>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Rate" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Prices</SelectLabel>
                                <SelectItem value="1">1 Star</SelectItem>
                                <SelectItem value="2">2 Star</SelectItem>
                                <SelectItem value="3">3 Star</SelectItem>
                                <SelectItem value="4">4 Star</SelectItem>
                                <SelectItem value="5">5 Star</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                            </div>
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="mb-10 grid w-full gap-2">
                        <Textarea placeholder="Type your Comment here."                    
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}/>
                        <Button
                            onClick={() => handleSubmit(user?.id)}
                            className={`bg-secondary ${(!comment && !overallRating && !customerServiceRating && !priceRating) && "opacity-50 cursor-not-allowed"}`}
                            disabled={!comment && !overallRating && !customerServiceRating && !priceRating}
                        >
                            Send Comment
                        </Button>
                    </div>
                    {/* Share */}
                    <div className="mb-10 w-full">
                        <h1 className="font-bold text-2xl text-secondary">Share On : </h1>
                        <div className="flex gap-2">
                            <Button className="bg-blue-500">Facebook</Button>
                            <Button className="bg-red-300">Instagram</Button>
                            <Button className="bg-green-500">WhatsApp</Button>
                            <Button className="bg-yellow-500">SnapChat</Button>
                        </div>
                    
                    </div>

                    
                </div>

                {/* Map Section */}
                <div className="flex flex-col mt-10 justify-center items-center w-[600px]">
                    {singleBusiness?.map && (
                        <div className="">
                            <iframe src={singleBusiness?.map} 
                                width="400" height="300" style={{border: "0"}} allowFullScreen="" loading="lazy">
                            </iframe>
                        </div>
                    )}
                        {/* contact */}
                    <div className="mt-10 shadow-lg p-5 w-[400px] rounded-lg">
                        <div>
                            <h2 className="font-bold text-xl text-secondary">Contact</h2>
                        </div>
                        <div className="mt-5 flex-col flex gap-3">
                            <Link to = "" className="flex gap-5 items-center justify-start text-secondary font-semibold "><PhoneCallIcon size="20" className="text-yellow-900"/> {singleBusiness?.phone}</Link>
                            <Link to = "" className="flex gap-5 items-center justify-start  text-secondary font-semibold "><MailIcon size="20" className="text-orange-500"/> {singleBusiness?.email}</Link>
                            {singleBusiness?.facebook ?   <Link to = "" className="flex gap-5 items-center justify-start font-semibold  text-secondary"><Facebook size="20" className="text-blue-900"/> {singleBusiness?.facebook}</Link> : null}
                            {singleBusiness?.whatsapp ?   <Link to = "" className="flex gap-5 items-center justify-start font-semibold  text-secondary"><PhoneForwarded size="20" className="text-green-900"/> {singleBusiness?.whatsapp}</Link> : null}
                            {singleBusiness?.instagram ?   <Link to = "" className="flex gap-5 items-center justify-start font-semibold  text-secondary"><Instagram size="20" className="text-red-900"/> {singleBusiness?.instagram}</Link> : null}

                        </div>
                    </div>

                    {/* Message */}
                    <div className="mt-10 shadow-lg w-[400px] rounded-lg p-5">
                        <div>
                            <h2 className="font-bold text-xl text-secondary">Message</h2>
                        </div>
                        <div className="mt-5 flex-col flex gap-3">
                            <Input type="text" placeholder="Subject" />
                            <Textarea placeholder="Type your message here." />
                            <Button className="bg-secondary">Send</Button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="mx-auto w-full mb-10 mt-10">
                <h2 className="text-center text-2xl font-bold text-secondary">Similar Business</h2>
                <BusinessComponent/>
            </div>
            </div>

        </div>
    );
}

export default BusinessDetails;
