import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: true,
    businessList: [],
    singleBusiness: null,
    error: null,
};

// Async Thunks for BusinessAndService routes
export const fetchAllBusinesses = createAsyncThunk('/BusinessAndService/fetchAll', async ({ sort , search, page = 1, limit = 100 }) => {
    const query = new URLSearchParams({
        sort: sort || null,
        search: search ||'', // Add the search parameter
        page: page,
        limit: limit,
    }).toString(); // Convert query parameters to a string


    const response = await axios.get(`http://localhost:5000/api/BusinessAndService?${query}`);
    return response.data;
});

export const fetchAllAcceptBusinesses = createAsyncThunk('/BusinessAndService/fetchAllAcceptBusinesses', async ({filterParams = null , sort , search, page = 1, limit = 100 }) => {
    const query = new URLSearchParams({
        ...filterParams,
        sort: sort || null,
        search: search ||'', // Add the search parameter
        page: page,
        limit: limit,
    }).toString(); // Convert query parameters to a string


    const response = await axios.get(`http://localhost:5000/api/BusinessAndService/Accept?${query}`);
    return response.data;
});


export const fetchBusinessById = createAsyncThunk('/BusinessAndService/fetchById', async (id) => {
    const response = await axios.get(`http://localhost:5000/api/BusinessAndService/${id}`);
    return response.data;
});

export const createBusiness = createAsyncThunk('/BusinessAndService/create', async ({ formData, selectedCategoryIds  , selectedSubCategoryIds}) => {
    const response = await axios.post('http://localhost:5000/api/BusinessAndService', { 
        ...formData, 
        category: selectedCategoryIds,
        subCategory : selectedSubCategoryIds // Adding selected categories here
    }, {
        withCredentials: true,
    });
    return response.data;
});

export const updateBusiness = createAsyncThunk('/BusinessAndService/update', async ({ id, formData, selectedCategoryIds  , selectedSubCategoryIds}) => {
    console.log(formData)
    const response = await axios.put(`http://localhost:5000/api/BusinessAndService/${id}`, {
        ...formData, 
        category: selectedCategoryIds,  // Adding selected categories for the update
        subCategory : selectedSubCategoryIds // Adding selected categories here

    }, {
        withCredentials: true,
    });
    return response.data;
});


export const deleteBusiness = createAsyncThunk('/BusinessAndService/delete', async (id) => {
    const response = await axios.delete(`http://localhost:5000/api/BusinessAndService/${id}`, {
        withCredentials: true,
    });
    return response.data;
});

export const fetchBusinessByUserId = createAsyncThunk('/BusinessAndService/fetchBusinessByUserId', async (userId) => {
    const response = await axios.get(`http://localhost:5000/api/BusinessAndService/getBusinessesByUserId/${userId}`);
    return response.data;
});

// Async thunk to update 'open' value
export const updateOpenValue = createAsyncThunk(
    'business/updateOpenValue',
    async ({ id, open }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/BusinessAndService/${id}/open`, { open });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const businessServiceSlice = createSlice({
    name: 'businessService',
    initialState,
    reducers: {
        setDetails : (state) => {
            state.productDetails =null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Businesses
            .addCase(fetchAllBusinesses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllBusinesses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.businessList = action.payload.data;
            })
            .addCase(fetchAllBusinesses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllAcceptBusinesses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllAcceptBusinesses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.businessList = action.payload.data;
            })
            .addCase(fetchAllAcceptBusinesses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Fetch Business by ID
            .addCase(fetchBusinessById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBusinessById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.singleBusiness = action.payload.data;
            })
            .addCase(fetchBusinessById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Create Business
            .addCase(createBusiness.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createBusiness.fulfilled, (state, action) => {
                state.isLoading = false;
                state.businessList.push(action.payload.data);
            })
            .addCase(createBusiness.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Update Business
            .addCase(updateBusiness.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateBusiness.fulfilled, (state, action) => {
                state.isLoading = false;
                state.businessList = state.businessList.map(business => 
                    business._id === action.payload.data._id ? action.payload.data : business
                );
            })
            .addCase(updateBusiness.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Delete Business
            .addCase(deleteBusiness.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteBusiness.fulfilled, (state, action) => {
                state.isLoading = false;
                state.businessList = state.businessList.filter(business => business._id !== action.meta.arg);
            })
            .addCase(deleteBusiness.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })     
            // Fetch Business by UserId
            .addCase(fetchBusinessByUserId.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBusinessByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.businessList = action.payload.data;
            })
            .addCase(fetchBusinessByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
            
    },
});



export const { setDetails } = businessServiceSlice.actions;

export default businessServiceSlice.reducer;
