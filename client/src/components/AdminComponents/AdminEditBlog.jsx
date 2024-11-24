import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { HiOutlineCamera } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getBlog, updateBlog } from "@/store/adminSlice/BlogsSlice";
import stables from "@/constants/stables";
import Editor from "../tiptap/Editor";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const AdminEditBlog = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const { blog, isLoading, isError } = useSelector((state) => state.blog);

    const [initialPhoto, setInitialPhoto] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [body, setBody] = useState("");
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [postSlug, setPostSlug] = useState(slug);
    const [caption, setCaption] = useState("");

    useEffect(() => {
        dispatch(getBlog(slug));
    }, [dispatch, slug]);

    useEffect(() => {
        if (blog) {
            setTitle(blog?.title);
            setCaption(blog?.caption);
            setPostSlug(blog?.slug);
            setBody(blog?.body || "");
            setCategories(blog.categories || []);
            setTags(blog.tags?.join(", ") || "");
            setInitialPhoto(blog?.photo || null);
        }
    }, [blog]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleUpdatePost = async () => {
        let updatedData = new FormData();
    
        try {
            // Handle file upload
            if (photo) {
                updatedData.append("blogPicture", photo);
            } else if (initialPhoto) {
                const urlToObject = async (url) => {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return new File([blob], "initialPhoto.jpg", { type: blob.type });
                };
                const picture = await urlToObject(
                    stables.UPLOAD_FOLDER_BASE_URL + initialPhoto
                );
                updatedData.append("blogPicture", picture);
            }
    
            // Append other form data
            updatedData.append(
                "document",
                JSON.stringify({
                    body,
                    categories,
                    title,
                    tags: tags.split(",").map((tag) => tag.trim()),
                    slug: postSlug,
                    caption,
                })
            );
    
            // Dispatch the update action
            dispatch(updateBlog({ slug, updatedData }));
            console.log([...updatedData.entries()]);

        } catch (error) {
            console.error("Error updating post:", error);
        }
    };
    

    const handleDeleteImage = () => {
        if (window.confirm("Do you want to delete your Post picture?")) {
            setInitialPhoto(null);
            setPhoto(null);
        }
    };

    const isPostDataLoaded = !isLoading && !isError;

    return (
        <div>
            <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                <article className="flex-1">
                    <label htmlFor="postPicture" className="w-full cursor-pointer">
                        {photo ? (
                            <img
                                src={blog.photo ? stables.UPLOAD_FOLDER_BASE_URL + blog.photo : stables.defaultImageBlog }
                                alt={blog?.title}
                                className="rounded-xl w-full"
                            />
                        ) : initialPhoto ? (
                            <img
                                src={stables.UPLOAD_FOLDER_BASE_URL + initialPhoto}
                                alt={blog?.title}
                                className="rounded-xl w-full"
                            />
                        ) : (
                            <div className="w-full min-h-[200px] bg-blue-50/50 flex justify-center items-center">
                                <HiOutlineCamera className="w-7 h-auto text-primary" />
                            </div>
                        )}
                    </label>
                    <input
                        type="file"
                        className="sr-only"
                        id="postPicture"
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        onClick={handleDeleteImage}
                        className="w-fit bg-red-500 text-sm text-white font-semibold rounded-lg px-2 py-1 mt-5"
                    >
                        Delete Image
                    </button>
                    <div className="d-form-control w-full">
                        <label className="d-label" htmlFor="title">
                            <span className="d-label-text">Title</span>
                        </label>
                        <Input
                            id="title"
                            value={title}
                            className="d-input d-input-bordered border-slate-300"
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                    </div>
                    <div className="d-form-control w-full">
                        <Label className="d-label" htmlFor="caption">
                            <span className="d-label-text">Caption</span>
                        </Label>
                        <Input
                            id="caption"
                            value={caption}
                            className="d-input d-input-bordered border-slate-300"
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Caption"
                        />
                    </div>
                    <div className="d-form-control w-full">
                        <Label className="d-label" htmlFor="slug">
                            <span className="d-label-text">Slug</span>
                        </Label>
                        <Input
                            id="slug"
                            value={postSlug}
                            className="d-input d-input-bordered border-slate-300"
                            onChange={(e) =>
                                setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
                            }
                            placeholder="Post Slug"
                        />
                    </div>
                    <div className="d-form-control w-full">
                        <Label className="d-label">
                            <span className="d-label-text">Tags</span>
                        </Label>
                        <Input
                            value={tags}
                            className="d-input d-input-bordered border-slate-300"
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Comma-separated tags"
                        />
                    </div>
                    <div className="w-full mt-10">
                        {isPostDataLoaded && (
                            <Editor
                                content={body}
                                editable={true}
                                onDataChange={(data) => setBody(data)}
                            />
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handleUpdatePost}
                        className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        Update Post
                    </button>
                </article>
            </section>
        </div>
    );
};

export default AdminEditBlog;
