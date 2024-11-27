import BackButton from "@/components/common/BackButton";
import { SkeletonCard } from "@/components/common/CardSkeleton";
import HeaderSectionTitle from "@/components/common/HeaderSectionTitle";
import Pagination from "@/components/common/Pagination";
import SortByComponent from "@/components/common/SortByComponent";
import Blog from "@/components/UserComponents/HomeSections/Blog";
import { getAllBlogs } from "@/store/adminSlice/BlogsSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AllBlogs() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const businessListPerPage = 5; // Define items per page

    const dispatch = useDispatch();
    const { blogs, isLoading } = useSelector((state) => state.blogs);
    const [sort, setSort] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
        dispatch(getAllBlogs({
            sort : sort
        }));
    }, [dispatch, sort]);

    const paginatedBusinessList = useMemo(() => (
        blogs.slice(
            (currentPage - 1) * businessListPerPage,
            currentPage * businessListPerPage
        )
    ), [blogs, currentPage]);

    function handleCardClick(slug) {
        navigate(`/BlogDetails/${slug}`);
    }

        // Apply sort
        const handleSort = (value) => {
            setSort(value);
        };

    return (
        <section className='py-12'>
            <div className='container mx-auto px-4'>
                <div className="flex">
                    <BackButton/>

                    <HeaderSectionTitle title={"All Blogs"}/>
                    <SortByComponent sort={sort} handleSort={handleSort} />

                </div>
                {isLoading ? (
                    <div className='grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                        {/* Render SkeletonCards based on the paginatedBusinessList length */}
                        {Array(businessListPerPage)
                            .fill(0)
                            .map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                    </div>
                ) : (
                    <div className='grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6'>
                        {paginatedBusinessList && paginatedBusinessList.length > 0 ? (
                            paginatedBusinessList.map(blog => (
                                <Blog
                                    key={blog._id}
                                    blog={blog}
                                    handleCardClick={handleCardClick}
                                />
                            ))
                        ) : null}
                    </div>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalItems={blogs.length}
                    itemsPerPage={businessListPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </section>
    );
}

export default AllBlogs;
