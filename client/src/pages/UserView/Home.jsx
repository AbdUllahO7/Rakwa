import Special from "@/components/UserComponents/HomeSections/Special"
import Category from "@/components/common/Category"
import Hero from "@/components/UserComponents/HomeSections/Hero"
import { Bolt, Menu, Rss, StarIcon } from "lucide-react"
import { Button } from "@/components/ui/button";
import BusinessesAndServices from "@/components/UserComponents/HomeSections/BusinessesAndServices";
import LatestBusinessAndServices from "@/components/UserComponents/HomeSections/LatestBusinessAndServices";
import Blog from "@/components/UserComponents/HomeSections/Blog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategory } from "@/store/adminSlice/AdminCategory";
import { useNavigate } from "react-router-dom";
import { fetchAllBusinesses } from "@/store/userSlice/businessServiceSlice";

const SpecialProducts = [
    {
        id : '1',
        image : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        title : 'Apple',
        category : 'accessories',

    },
    {
        id : '2',
        image : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        title : 'Apple',
        category : 'accessories',

    },
    {
        id : '3',
        image : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        title : 'Apple',
        category : 'accessories',

    },
    {
        id : '4',
        image : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        title : 'Apple',
        category : 'accessories',

    },
    {
        id : '5',
        image : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        title : 'Apple',
        category : 'accessories',

    },
];

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
];




function Home() {
    const navigate = useNavigate()

    const {CategoriesList} = useSelector(state => state.CategoriesList);
    const {businessList} = useSelector(state => state.businessList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategory())
        dispatch(fetchAllBusinesses({}))
    } , [dispatch])

    
    function handleCardCategoryClick  (Category_id){
        navigate(`SingleCategory/${Category_id}`)
    }

    const sortedBusinessList = [...businessList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero section  */}
                <Hero/>
            {/* category section */}
            <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <div className='grid  sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6 '>
                    {CategoriesList && CategoriesList.length > 0 ? (
                        CategoriesList.slice(0, 5).map((productItem) => (
                            <Category 
                                key={productItem._id} 
                                Category={productItem}
                                handleCardClick={handleCardCategoryClick} 
                            />
                        ))
                    ) : null}

                    </div>
                    <div className='flex justify-center items-center mx-auto w-full mb-8 '>
                        <Button className='mt-10 bg-secondary text-primary font-extrabold text-2xl w-[300px] flex gap-2 pt-6 pb-6' 
                            onClick = {()=> navigate('/AllCategory')}
                        >
                        <Menu className="size-7"/>
                            All Category
                        </Button>
                    </div>
                </div>
                
            </section>

            {/* activities */}
            <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <div className='flex justify-center items-center mx-auto w-full mb-8'>
                        <StarIcon className='text-yellow-600 mr-4' />
                        <h2 className='text-3xl font-bold text-center'>Special</h2>
                    </div>
                    <div className='grid  sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                        {SpecialProducts && SpecialProducts.length > 0 ? (
                            SpecialProducts.map(productItem => (
                                <Special 
                                    key={productItem.id} 
                                    product={productItem} 
                                />
                            ))
                        ) : null}
                    </div>
                    
                </div>
            </section>

              {/* Businesses And Services */}
                <section className='py-12'>
                    <div className="container mx-auto px-5 ">
                        <div className='flex justify-center items-center mx-auto w-full mb-8'>
                            <StarIcon className='text-yellow-600 mr-4' />
                            <h2 className='text-3xl font-bold text-center'>Businesses And Services</h2>
                        </div>
                        <div className='grid  sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                            {businessList && businessList.length > 0 ? (
                                businessList.slice(0, 5).map(productItem => (
                                    <BusinessesAndServices 
                                        key={productItem._id} 
                                        product={productItem} 
                                    />
                                ))
                            ) : null}
                        </div>
                        <div className='flex justify-center items-center mx-auto w-full mb-8 '>
                        <Button className='mt-10 bg-secondary text-primary font-extrabold text-2xl w-[300px] flex gap-2 pt-6 pb-6'>
                        <Bolt className="size-7"/>
                            All Services
                        </Button>
                    </div>
                    </div>
                </section>

            {/* Latest Business And Services */}
            <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <div className='flex justify-center items-center mx-auto w-full mb-8'>
                        <StarIcon className='text-yellow-600 mr-4' />
                        <h2 className='text-3xl font-bold text-center'>Latest Business And Services</h2>
                    </div>
                    <div className="grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {sortedBusinessList && sortedBusinessList.length > 0 ? (
                            sortedBusinessList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

                            .slice(0, 5) // Take only the first 5 items
                            .map(productItem => (
                                <LatestBusinessAndServices 
                                key={productItem._id} 
                                product={productItem} 
                                />
                            ))
                        ) : (
                            <p>No businesses found</p>
                        )}
                        </div>

                    <div className='flex justify-center items-center mx-auto w-full mb-8 '>
                    <Button className='mt-10 bg-secondary text-primary font-extrabold text-2xl w-[300px] flex gap-2 pt-6 pb-6'>
                        <Bolt className="size-7"/>
                            All Services
                        </Button>
                    </div>
                   
                </div>
            </section>

             {/* Blog */}
                <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <div className='flex justify-center items-center mx-auto w-full mb-8'>
                        <StarIcon className='text-yellow-600 mr-4' />
                        <h2 className='text-3xl font-bold text-center'>Blogs</h2>
                    </div>
                    <div className='grid  sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                        {BlogItems && BlogItems.length > 0 ? (
                            BlogItems.map(productItem => (
                                <Blog 
                                    key={productItem.id} 
                                    product={productItem} 
                                />
                            ))
                        ) : null}
                    </div>
                    <div className='flex justify-center items-center mx-auto w-full mb-8 '>
                        <Button className='mt-10 bg-secondary text-primary font-extrabold text-2xl w-[200px] flex gap-2 pt-6 pb-6'>
                        <Rss className="size-7"/>
                            All Blogs
                        </Button>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default Home