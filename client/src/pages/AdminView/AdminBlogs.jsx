import AdminBlogsList from "@/components/AdminComponents/AdminBlogsList";
import { Button } from "@/components/ui/button"
import { createBlog } from "@/store/adminSlice/BlogsSlice";
import { checkAuth } from "@/store/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"


function AdminBlogs() {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);


    const handleCreatePost = () => {
        dispatch(createBlog({ userId: user?._id }));
    };
    

    return (
        <div>
                <div className="mb-5 flex justify-end w-full">
                    <Button className="bg-secondary dark:text-primary" onClick={handleCreatePost}>Add New Blog</Button>
                </div>
                <section className='py-12  dark:bg- '>
                <div className='container mx-auto px-4 animate-fade-in-left'>
                    <div className="flex flex-wrap justify-evenly items-center gap-5 ">
                        <AdminBlogsList/>
                    
                    </div>
                </div>
            </section>


        

        </div>
    )
}

export default AdminBlogs
