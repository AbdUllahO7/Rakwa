import Special from "@/components/UserComponents/HomeSections/Special"
import Category from "@/components/common/Category/Category"
import Hero from "@/components/UserComponents/HomeSections/Hero"
import { Bolt, Menu, Rss } from "lucide-react"
import { Button } from "@/components/ui/button";
import BusinessesAndServices from "@/components/UserComponents/HomeSections/BusinessesAndServices";
import LatestBusinessAndServices from "@/components/UserComponents/HomeSections/LatestBusinessAndServices";
import Blog from "@/components/UserComponents/HomeSections/Blog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategory } from "@/store/adminSlice/AdminCategory";
import { useNavigate } from "react-router-dom";
import { fetchAllAcceptBusinesses } from "@/store/userSlice/businessServiceSlice";
import { getAllBlogs } from "@/store/adminSlice/BlogsSlice";
import HeaderSectionTitle from "@/components/common/HeaderSectionTitle";

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



function Home() {
    const navigate = useNavigate()

    const {CategoriesList} = useSelector(state => state.CategoriesList);
    const {businessList} = useSelector(state => state.businessList);
    const { blogs } = useSelector((state) => state.blogs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategory())
        dispatch(fetchAllAcceptBusinesses({}))
        dispatch(getAllBlogs({}))
    } , [dispatch])

    
    function handleCardCategoryClick  (Category_id){
        navigate(`SingleCategory/${Category_id}`)
    }
    function handleBlogCardClick (slug){
        navigate(`/BlogDetails/${slug}`);
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
                    <HeaderSectionTitle title={"Special"}/>
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


            {/* i have a problem in the responsive  */}
              {/* Businesses And Services */}
                <section className='py-12'>
                    <div className="container mx-auto px-5 ">
                        <HeaderSectionTitle title={"Businesses And Services"}/>


                        <div className='grid justify-center  sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6'>
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
                        <Button className='mt-10 bg-secondary text-primary font-extrabold text-2xl w-[300px] flex gap-2 pt-6 pb-6'
                            onClick = {()=> navigate('/AllBusiness')}
                        >
                        <Bolt className="size-7"/>
                            All Services
                        </Button>
                    </div>
                    </div>
                </section>

            {/* Latest Business And Services */}
            <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <HeaderSectionTitle title={"Latest Business And Services"}/>
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
                    <Button className='mt-10 bg-secondary text-primary font-extrabold text-2xl w-[300px] flex gap-2 pt-6 pb-6'
                        onClick = {()=> navigate('/AllBusiness')}
                    >
                        <Bolt className="size-7"/>
                            All Services
                        </Button>
                    </div>
                
                </div>
            </section>

             {/* Blog */}
                <section className='py-12'>
                <div className='container mx-auto px-4'>
                    <HeaderSectionTitle title={"Blogs"}/>

                    <div className='grid  sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                        {blogs && blogs.length > 0 ? (
                            blogs.map(blog => (
                                <Blog 
                                    key={blog._id} 
                                    blog={blog} 
                                    handleCardClick = {handleBlogCardClick} 
                                />
                            ))
                        ) : null}
                    </div>
                    <div className='flex justify-center items-center mx-auto w-full mb-8 '>
                        <Button className='mt-10 bg-secondary text-primary font-extrabold text-2xl w-[200px] flex gap-2 pt-6 pb-6'
                    
                        onClick = {()=> navigate('/AllBlogs')}
                        >
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