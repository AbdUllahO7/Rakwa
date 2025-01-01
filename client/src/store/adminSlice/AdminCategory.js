import stables from "@/constants/stables";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    isAuthenticated : false,
    isLoading : true,
    CategoriesList : null,
    SubCategoriesList : null

};

export const fetchAllCategory = createAsyncThunk('/Admin/fetchAllCategory' ,async () => {
    const result = await axios.get(`${stables.API_BASE_URL}AdminCategories/getAllCategories`);
    return result?.data;
})

export const createCategory = createAsyncThunk('/admin/createCategory/' , 
    async(formData) => {
        const response = await axios.post('http://localhost:5000/api/AdminCategories/createCategory' , formData ,
            {
                withCredentials : true,
            }
        );
        return response.data;
    }
);


export const updateCategory = createAsyncThunk('/admin/updateCategory/' , 
    async({id,formData}) => {
        const response = await axios.put(`${stables.API_BASE_URL}AdminCategories/updateCategory/${id}` , formData ,
            {
                withCredentials : true,
            }
        );
        return response.data;
    }
)

export const deleteCategory = createAsyncThunk('/admin/deleteCategory' ,async (id) => {
    const result = await axios.delete(`${stables.API_BASE_URL}AdminCategories/deleteCategory/${id}`);
    return result?.data;
});


// Sub Categories 

export const fetchAllSubCategory = createAsyncThunk('/Admin/fetchAllSubCategory', async ({ ids }) => {
    const result = await axios.get(`${stables.API_BASE_URL}AdminCategories/subcategories`, {
        params: { categoryIds: ids.join(',') } // Convert array to a comma-separated string
    });
    return result?.data;
});



export const createSubCategory = createAsyncThunk('/admin/createSubCategory/', 
    async ({ formData, id }) => {
        const response = await axios.post(
            `${stables.API_BASE_URL}AdminCategories/categories/${id}/subcategories`, 
            formData, 
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
);


export const deleteSubCategory = createAsyncThunk(
    '/admin/deleteSubCategory/',
    async ({ categoryId, subCategoryId }) => {
        const response = await axios.delete(
            `${stables.API_BASE_URL}AdminCategories/categories/${categoryId}/subcategories/${subCategoryId}`,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
);



const adminCategorySlice = createSlice(
    {
        name : 'adminCategorySlice',
        initialState,
        reducers : {},
        extraReducers : (builder) => {
            builder.addCase(fetchAllCategory.pending , (state) => {
                state.isLoading = true;
            }).addCase(fetchAllCategory.fulfilled , (state , action) => {
                state.isLoading = false;
                state.CategoriesList = action.payload.data;
            }).addCase(fetchAllCategory.rejected , (state) => {
                state.isLoading = false;
                state.CategoriesList = [];
            }).addCase(fetchAllSubCategory.pending , (state) => {
                state.isLoading = true;
            }).addCase(fetchAllSubCategory.fulfilled , (state , action) => {
                state.isLoading = false;
                state.SubCategoriesList = action.payload.data;
            }).addCase(fetchAllSubCategory.rejected , (state) => {
                state.isLoading = false;
                state.SubCategoriesList = [];
            })
        }
    }
)

export default adminCategorySlice.reducer;