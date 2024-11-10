// messageSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the message slice
const initialState = {
    messages: [],
    isLoading: false,
    error: null,
};

// Async thunk for creating a new message
export const createMessage = createAsyncThunk(
    'message/create',
    async ({ formData }) => {
        const response = await axios.post('http://localhost:5000/api/MessageRouter/create', formData, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Async thunk for fetching all messages for a specific business
export const getMessagesByBusiness = createAsyncThunk(
    'message/getByBusiness',
    async (businessId) => {
        const response = await axios.get(`http://localhost:5000/api/MessageRouter/business/${businessId}`, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Async thunk for fetching all messages by a specific user
export const getMessagesByUser = createAsyncThunk(
    'message/getByUser',
    async (userId) => {
        const response = await axios.get(`http://localhost:5000/api/MessageRouter/user/${userId}`, {
            withCredentials: true,
        });
        return response.data;
    }
);

// Async thunk for updating a message (subject or rating)
export const updateMessage = createAsyncThunk(
    'message/update',
    async ({ messageId, formData }) => {
        const response = await axios.put(`http://localhost:5000/api/MessageRouter/update/${messageId}`, formData, {
            withCredentials: true,
        });
        return response.data;
    }
);


// Async thunk for deleting a message
export const deleteMessage = createAsyncThunk(
    'message/delete',
    async (messageId) => {
        const response = await axios.delete(`http://localhost:5000/api/MessageRouter/delete/${messageId}`, {
            withCredentials: true,
        });
        return response.data;
    }
);

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle creating a message
            .addCase(createMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload.data;  // Add new message to the state
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Handle fetching messages by business
            .addCase(getMessagesByBusiness.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMessagesByBusiness.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload.data;  // Replace messages with the new data
            })
            .addCase(getMessagesByBusiness.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Handle fetching messages by user
            .addCase(getMessagesByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMessagesByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload.data;  // Replace messages with the new data
            })
            .addCase(getMessagesByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Handle updating a message
            .addCase(updateMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.messages.findIndex((message) => message._id === action.payload._id);
                if (index !== -1) {
                    state.messages[index] = action.payload.data;  // Update the specific message in state
                }
            })
            .addCase(updateMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Handle deleting a message
            .addCase(deleteMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMessage.fulfilled, (state) => {
                state.isLoading = false;
                state.messages = [];  // Remove deleted message from state
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default messageSlice.reducer;
