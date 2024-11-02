import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isAuthenticated : false,
    isLoading : true,
    PricingPlanList : null

};

export const fetchAllPricingPlan = createAsyncThunk('/Admin/fetchAllPricingPlan' ,async () => {
    const result = await axios.get('http://localhost:5000/api/AdminPricingPlan/plans');
    return result?.data;
})

export const createPricingPlan = createAsyncThunk('/admin/createPricingPlan/' , 
    async(formData) => {
        console.log(formData)
        const response = await axios.post('http://localhost:5000/api/AdminPricingPlan/plans' , formData ,
            {
                withCredentials : true,
            }
        );
        return response.data;
    }
);


export const updatePricingPlan  = createAsyncThunk('/admin/updatePricingPlan/' , 
    async({id,formData}) => {
        const response = await axios.put(`http://localhost:5000/api/AdminPricingPlan/plans/${id}` , formData ,
            {
                withCredentials : true,
            }
        );
        return response.data;
    }
)

export const deletePricingPlan = createAsyncThunk('/admin/deleteCategory' ,async (id) => {
    console.log(id)
    const result = await axios.delete(`http://localhost:5000/api/AdminPricingPlan/plans/${id}`);
    return result?.data;
});




const adminPricingPlanSlice = createSlice(
    {
        name : 'adminPricingPlanSlice',
        initialState,
        reducers : {},
        extraReducers : (builder) => {
            builder.addCase(fetchAllPricingPlan.pending , (state) => {
                state.isLoading = true;
            }).addCase(fetchAllPricingPlan.fulfilled , (state , action) => {
                state.isLoading = false;
                state.PricingPlanList = action.payload.data;
            }).addCase(fetchAllPricingPlan.rejected , (state) => {
                state.isLoading = false;
                state.PricingPlanList = [];
            })
        }

    }
)

export default adminPricingPlanSlice.reducer;