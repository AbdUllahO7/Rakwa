import stables from '@/constants/stables';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    blogs: [],
    blog: null,
    isLoading: false,
    isError: false,
    errorMessage: '',
};

// Thunks for async actions (API calls)
export const getAllBlogs = createAsyncThunk('blogs/getAllBlogs', async ({ page = 1, limit = 10, sort = 'createdAt' }) => {
    const response = await axios.get(`${stables.API_BASE_URL}Blogs`, { params: { page, limit, sort } });
    return response.data;
});

export const getBlog = createAsyncThunk('blogs/getBlog', async (slug) => {
    const response = await axios.get(`${stables.API_BASE_URL}Blogs/${slug}`);
    return response.data;
});

export const createBlog = createAsyncThunk('blogs/createBlog', async ({ userId }) => {
    const response = await axios.post(`${stables.API_BASE_URL}Blogs`, { userId });
    return response.data;
});


export const updateBlog = createAsyncThunk(
    "blogs/updateBlog",
    async ({ slug, updatedData }) => {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const response = await axios.put(
            `${stables.API_BASE_URL}Blogs/${slug}`,
            updatedData,
            config
        );
        return response.data;
    }
);


export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (slug) => {
    console.log(slug)
    const response=  await axios.delete(`${stables.API_BASE_URL}Blogs/${slug}`);
    return response?.data;
});

// Blog slice
const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get all blogs
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = action.payload.data;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
            
            // Get a single blog
            .addCase(getBlog.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blog = action.payload.data;
            })
            .addCase(getBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
            
            // Create a blog
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs.push(action.payload.data);
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
            
            // Update a blog
            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.blogs.findIndex(blog => blog.slug === action.payload.data.slug);
                if (index !== -1) {
                    state.blogs[index] = action.payload.data;
                }
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            })
            // Delete a blog
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.blogs = state.blogs.filter(blog => blog.slug !== action.meta.arg);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.error.message;
            });
    },
});

export default blogSlice.reducer;
