// commentAndRatingSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the comments and ratings slice
const initialState = {
    comments: [],
    isLoading: false,
    error: null,
};

// Async thunk for creating a new comment and rating
export const createCommentAndRating = createAsyncThunk(
    'commentAndRating/create',
    async ({formData}) => {
        const response = await axios.post('http://localhost:5000/api/CommentAndRatingRouter/', formData, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Async thunk for fetching all comments for a specific business
export const getCommentsByBusiness = createAsyncThunk(
    'commentAndRating/getByBusiness',
    async (businessId) => {
        const response = await axios.get(`http://localhost:5000/api/CommentAndRatingRouter/business/${businessId}`, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Async thunk for fetching all comments by a specific user
export const getCommentsByUser = createAsyncThunk(
    'commentAndRating/getByUser',
    async (userId) => {
        const response = await axios.get(`http://localhost:5000/api/CommentAndRatingRouter/user/${userId}`, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Async thunk for updating a comment and rating
export const updateCommentAndRating = createAsyncThunk(
    'commentAndRating/update',
    async ({ id, formData }) => {
        const response = await axios.put(`http://localhost:5000/api/CommentAndRatingRouter/${id}`, formData, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Async thunk for deleting a comment and rating
export const deleteCommentAndRating = createAsyncThunk(
    'commentAndRating/delete',
    async (id) => {
        const response = await axios.delete(`http://localhost:5000/api/CommentAndRatingRouter/${id}`, {
            withCredentials: true,
        });
        return response.data;
    }
);


const commentAndRatingSlice = createSlice({
    name: 'commentAndRating',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle creating a comment and rating
            .addCase(createCommentAndRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCommentAndRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = action.payload.data;
            }) 
            .addCase(createCommentAndRating.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Handle fetching comments by business
            .addCase(getCommentsByBusiness.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCommentsByBusiness.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = action.payload.data;
            })
            .addCase(getCommentsByBusiness.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Handle fetching comments by user
            .addCase(getCommentsByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCommentsByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = action.payload.data;
            })
            .addCase(getCommentsByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Handle updating a comment and rating
            .addCase(updateCommentAndRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCommentAndRating.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.comments.findIndex(comment => comment._id === action.payload._id);
                if (index !== -1) {
                    state.comments[index] = action.payload.data;
                }
            })
            .addCase(updateCommentAndRating.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Handle deleting a comment and rating
            .addCase(deleteCommentAndRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCommentAndRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = state.comments.filter(comment => comment._id !== action.meta.arg);
            })
            .addCase(deleteCommentAndRating.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default commentAndRatingSlice.reducer;
