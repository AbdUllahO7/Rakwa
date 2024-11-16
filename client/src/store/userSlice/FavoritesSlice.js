import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    favorites: [],
    isLoading: false,
    error: null
};

// Async thunk to create or update a favorite
export const createFavorite = createAsyncThunk(
    'favorites/createFavorite',
    async ({ userId, businessIds }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/FavoritesRouter/favorites', { userId, businessIds });
            return response.data.data; // Extract the updated favorite data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to fetch all favorite businesses for a user
export const getFavorites = createAsyncThunk(
    'favorites/getFavorites',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/FavoritesRouter/favorites/${userId}`);
            return response.data; // Extract the list of businesses
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a specific business from the user's favorites
export const deleteFavorite = createAsyncThunk(
    'favorites/deleteFavorite',
    async ({ userId, businessId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/FavoritesRouter/favorites/${userId}/${businessId}`);
            return response.data.data; // Extract updated favorite data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload.data;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFavorite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createFavorite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites.push(action.payload.data);
            })
            .addCase(createFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || action.error.message;
            })
            .addCase(getFavorites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites = action.payload.data;
            })
            .addCase(getFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || action.error.message;
            })
            .addCase(deleteFavorite.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteFavorite.fulfilled, (state, action) => {
                state.isLoading = false;
                state.favorites = state.favorites.filter(business => business._id !== action.meta.arg.businessId);
            })
            .addCase(deleteFavorite.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || action.error.message;
            });
    }
});

export default favoritesSlice.reducer;
