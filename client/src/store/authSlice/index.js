import stables from "@/constants/stables";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isAuthenticated : false,
    isLoading : true,
    user : null
};


export const registerUser = createAsyncThunk('/auth/register/' , 
    async(formData) => {
        const response = await axios.post(`${stables.API_BASE_URL}auth/register` , formData ,
            {
                withCredentials : true,
            }
        );
        return response.data;
    }
)

export const loginUser = createAsyncThunk('auth/loginUser' , 
    async(formData) => {
        const res = await axios.post(`${stables.API_BASE_URL}auth/login`,formData , {
            withCredentials : true
        })
        return res.data;
})


export const checkAuth = createAsyncThunk('auth/checkAuth/' , 

    async() => {
        const res = await axios.get(`${stables.API_BASE_URL}auth/check-auth` , {
            withCredentials : true,
            header : {
                'Cache-Control' : 'no-store , no-cache , must-revalidate : proxy-revalidate',
            }
        })
        return res.data;
    }
)

export const logoutUser = createAsyncThunk('/auth/logout/' , 
    async() => {
        const response = await axios.post(`${stables.API_BASE_URL}auth/logout` ,{} ,
            {
                withCredentials : true,
            }
        );
        return response.data;
    }
)



const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {
        setUserInfo : (state , action ) => {
        }
    },
    extraReducers : (builder) => {
        builder.addCase(registerUser.pending , (state) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled , (state ) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = null;
        }).addCase(registerUser.rejected , (state ) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(loginUser.pending , (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled , (state , action) => {
            state.isLoading = false;
            state.isAuthenticated = action.payload.success;
            state.user = action.payload.success ?  action.payload.user : null;
            console.log(action.payload.user)
        }).addCase(loginUser.rejected , (state ) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(checkAuth.pending , (state) => {
            state.isLoading = true;
        }).addCase(checkAuth.fulfilled , (state , action) => {
            state.isLoading = false;
            state.isAuthenticated = action.payload.success;
            state.user = action.payload.success ?  action.payload.user : null;
        }).addCase(checkAuth.rejected , (state ) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        }).addCase(logoutUser.fulfilled , (state ) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
    }
})


export const {setUser } = authSlice.actions;
export default authSlice.reducer;