import Pagination from "@/components/common/Pagination";
import Blog from "@/components/UserComponents/HomeSections/Blog";
import { getAllBlogs } from "@/store/adminSlice/BlogsSlice";
import {  StarIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const BlogItems = [
    {
        id: 1,
        title: 'The Future of Smart Homes',
        author: 'John Doe',
        date: '2024-10-15',
        category: 'Technology', // Added category
        content: 'As technology continues to advance, smart homes are becoming increasingly popular. This blog explores the latest innovations in smart home technology and how they can enhance your daily life.',
        image: 'https://miro.medium.com/v2/resize:fit:1400/1*vA8Y91eY9LYE5ojG6xxxtQ.png',
    },
    {
        id: 2,
        title: 'Eco-Friendly Living: Tips for a Sustainable Lifestyle',
        author: 'Jane Smith',
        date: '2024-10-20',
        category: 'Lifestyle', // Added category
        content: 'In this blog, we discuss simple ways to incorporate eco-friendly practices into your daily routine, from reducing plastic use to choosing sustainable products.',
        image: 'https://www.purecult.in/cdn/shop/articles/What_does_it_mean_to_live_an_eco-friendly_life.png?v=1582390129',
    },
    {
        id: 3,
        title: 'Tech Support: Common Issues and Solutions',
        author: 'Mike Johnson',
        date: '2024-10-25',
        category: 'Tech Support', // Added category
        content: 'This article provides insights into common tech issues faced by users and offers practical solutions to troubleshoot them effectively.',
        image: 'https://www.beacontelecom.com/wp-content/uploads/2020/07/TechSupportImage.jpeg',
    },
    {
        id: 4,
        title: 'The Importance of Nutrition in Fitness',
        author: 'Emily Brown',
        date: '2024-10-30',
        category: 'Health & Fitness', // Added category
        content: 'Nutrition plays a crucial role in achieving fitness goals. In this post, we discuss the best dietary practices for optimal performance and recovery.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6OshO7MCH8nxwbNJPwlmf8LsqH39sF8iBuw&s',
    },
    {
        id: 5,
        title: 'Event Planning Made Easy: A Step-by-Step Guide',
        author: 'Sarah Davis',
        date: '2024-11-05',
        category: 'Event Planning', // Added category
        content: 'Planning an event can be overwhelming. This blog breaks down the event planning process into manageable steps to help you organize a successful event.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuPyDmLwUY2pSAdAafVoL-g7VBjXGNO5fqCA&s',
    },
    {
        id: 5,
        title: 'Event Planning Made Easy: A Step-by-Step Guide',
        author: 'Sarah Davis',
        date: '2024-11-05',
        category: 'Event Planning', // Added category
        content: 'Planning an event can be overwhelming. This blog breaks down the event planning process into manageable steps to help you organize a successful event.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuPyDmLwUY2pSAdAafVoL-g7VBjXGNO5fqCA&s',
    },
];

function AllBlogs() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const businessListPerPage = 5; // Define items per page

    const dispatch = useDispatch();
    const { blogs, isLoading, isError } = useSelector((state) => state.blogs);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
        dispatch(getAllBlogs({}));
    }, [dispatch]);

    const paginatedBusinessList = useMemo(() => (
        blogs.slice(
            (currentPage - 1) * businessListPerPage,
            currentPage * businessListPerPage
        )
    ), [blogs, currentPage]);

    function handleCardClick (slug){
        navigate(`/BlogDetails/${slug}`);
    }



    return (
        <section className='py-12'>
        <div className='container mx-auto px-4'>
            <div className='flex justify-center items-center mx-auto w-full mb-8'>
                <StarIcon className='text-yellow-600 mr-4' />
                <h2 className='text-3xl font-bold text-center'>All Blogs</h2>
            </div>
            <div className='grid  sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                {paginatedBusinessList && paginatedBusinessList.length > 0 ? (
                    paginatedBusinessList.map(blog => (
                        <Blog 
                            key={blog._id} 
                            blog={blog} 
                            handleCardClick = {handleCardClick}
                        />
                    ))
                ) : null}
            </div>
            <Pagination
                currentPage={currentPage}
                totalItems={BlogItems.length}
                itemsPerPage={businessListPerPage}
                onPageChange={setCurrentPage}
            />
        </div>
    </section>
    
    )
}

export default AllBlogs
