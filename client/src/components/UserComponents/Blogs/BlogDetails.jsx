import { useParams } from "react-router-dom"
import BlogHeader from "./BlogHeader";
import { getBlog } from "@/store/adminSlice/BlogsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import stables from "@/constants/stables";
import { createCommentAndRating, getCommentsByBusiness } from "@/store/userSlice/commentAndRating";
import { calculateAverageRating } from "@/utils/Star";
import BusinessDetailsSkeleton from "@/components/common/BusinessDetailsSkeleton";
import Editor from "@/components/tiptap/Editor";
import ViewComments from "../BusinessDetails/ViewComments";
import CommentRatingForm from "../BusinessDetails/CommentRatingForm";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const BlogItems = 
    {
        id: 1,
        title: 'The Future of Smart Homes',
        author: 'John Doe',
        date: '2024-10-15',
        overAllRating : 5,
        category: [ {id : 1 , title : 'Technology'}], // Added category
        content: 'As technology continues to advance, smart homes are becoming increasingly popular. This blog explores the latest innovations in smart home technology and how they can enhance your daily life.',
        image: 'https://miro.medium.com/v2/resize:fit:1400/1*vA8Y91eY9LYE5ojG6xxxtQ.png',
    }



function BlogDetails() {

    const {slug} = useParams();
    const dispatch = useDispatch();
    const { blog, isLoading, isError } = useSelector((state) => state.blog);
    const [overallRating, setOverallRating] = useState("");
    const [reviewsToShow, setReviewsToShow] = useState(6);
    const [comment, setComment] = useState("");

    const {comments} = useSelector(state=> state.comments); 
    const overallRatings = Array.isArray(comments) ? comments.map((commentItem) => commentItem?.overallRating) : [];
    const averageOverallRating = calculateAverageRating(overallRatings);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
        dispatch(getBlog(slug));
        dispatch(getCommentsByBusiness(blog?._id))
    }, [blog?._id, dispatch, slug]);

      // Handle form submission
    const handleSubmit = (userId) => {
        const ratingData = {
            comment : comment,
            overallRating: overallRating,
            user:userId , 
            business : blog?._id
        };

        dispatch(createCommentAndRating({ formData: ratingData   }))
        .then((data) => {
            if (data?.payload?.success) {
                toast({
                    title: "Comment / Rating added successfully",
                    variant: "success",
                });
                dispatch(getBlog(slug));
                dispatch(getCommentsByBusiness(blog?._id))
                setComment('');
                setOverallRating(null);
            }
        });

        // Add logic here to send data to the backend if needed
    };


    return (
        <div className="relative">
            <div className="container mx-auto px-4">

                <div className="h-[50vh]">
                <div
                    className="absolute  inset-0 bg-contain bg-black bg-center filter blur-2xl h-[50vh] "
                    style={{
                        backgroundImage: `url(${blog?.photo ? stables.UPLOAD_FOLDER_BASE_URL + blog?.photo : stables.defaultImageBlog})`,
                    }}
                ></div>
                    <div className="relative  bg-opacity-80  w-full flex flex-wrap justify-center items-center h-full">
                    {isLoading ? (
                        <BusinessDetailsSkeleton />
                    ) : (
                            <BlogHeader 
                            averageOverallRating = {averageOverallRating}  // Ensure it's a number
                            title = {blog?.title}
                            tags={blog?.tags}
                            photo = {blog?.photo}
                            author = {blog?.owner}
                            date = {blog?.createdAt}
                            content = {blog?.content}
                        />
                    )}

                </div>

                </div>
                    {/* info */}
                <div  className="flex justify-center items-start gap-10 flex-wrap w-full">
                    <div className="flex flex-col mt-10 justify-center items-center w-full lg:max-w-[700px] ">
                        <div className="w-full mt-10">
                            <img src={blog?.photo ? stables.UPLOAD_FOLDER_BASE_URL + blog?.photo : stables.defaultImageBlog} alt="" />
                        </div>   
                        <div className="w-full mt-10">
                            <p>{BlogItems.content}</p>
                        </div>   
                        <div className="w-full mt-10">
                            <Editor editable={false} content={blog?.body} />
                        </div>   
                        <ViewComments 
                            comments = {comments}
                            reviewsToShow = {reviewsToShow}
                            setReviewsToShow = {setReviewsToShow}
                        />
                        {/* Rating */}{/* Comments */}
                        <CommentRatingForm
                            overallRating = {overallRating}
                            setOverallRating= {setOverallRating}
                            customerServiceRating = {null}
                            priceRating={null}
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
                                    href={`https://wa.me/?text=${encodeURIComponent(`Check out this business: ${blog?.title} - ${window.location.href}`)}`} 
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
                </div>


            </div>
        </div>
    )
}

export default BlogDetails
