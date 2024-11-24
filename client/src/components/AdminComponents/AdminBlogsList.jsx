import React, { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getAllBlogs } from '@/store/adminSlice/BlogsSlice';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import stables from '@/constants/stables';

function AdminBlogsList() {
    const { blogs} = useSelector((state) => state.blogs);
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate =useNavigate();

    useEffect(() => {
        dispatch(getAllBlogs({}));
    }, [dispatch]);



    const handleBlogDelete = async (slug) => {
        dispatch(deleteBlog(slug)).then((data) => {
            if (data?.payload?.success) {
                // toast not work ! 
                toast({
                    title: "Blog deleted successfully",
                    variant: 'success',
                });
                dispatch(getAllBlogs({}))
            }
        }).catch((error) => {
            console.error('Delete failed:', error);
        });
    };


        console.log(blogs[0]?.photo)
        console.log(stables.UPLOAD_FOLDER_BASE_URL + blogs[0]?.photo);

    
    return (
        <div className='w-full'>

        <Table className="w-full" >
        <TableHeader>
            <TableRow>
                <TableHead>photo</TableHead>
                <TableHead>title</TableHead>
                <TableHead>categories</TableHead>
                <TableHead>created At</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead ><span className="sr-only">Details</span></TableHead>
            </TableRow>
            </TableHeader>
                {
                blogs && blogs.length > 0 ?
                blogs.map(blog => (
                        <TableBody key={blog?._id}>
                            <TableRow>
                                <TableCell>
                                <img
                                        className="w-12 h-12 rounded-lg"
                                        src={blog.photo ? stables.UPLOAD_FOLDER_BASE_URL + blog.photo : stables.defaultImageBlog}
                                        alt={blog?.title || "Blog Image"}
                                    />
                                </TableCell>
                                <TableCell>{blog?.title}</TableCell>
                                <TableCell>{blog?.categories}</TableCell>
                                <TableCell>{blog?.createdAt}</TableCell>
                                <TableCell>{blog?.Tags}</TableCell>
                                <TableCell className="flex gap-3">
                                    <Button className="bg-secondary text-title" onClick={()=> navigate(`/admin/editBlog/${blog?.slug}`)}>Edit</Button>
                                    <Button className="bg-red-900 text-title" onClick = {()=> handleBlogDelete(blog?.slug)}>Delete</Button>
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    )) : null
                }
            </Table>

        </div>
    )
}

export default AdminBlogsList
