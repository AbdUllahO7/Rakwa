import { configureStore } from "@reduxjs/toolkit";


import authReducer from './authSlice'
import adminCategorySlice from './adminSlice/AdminCategory'
import adminPricingPlanSlice from './adminSlice/AdminPricingPlan'
import userBusinessServiceSlice from './userSlice/businessServiceSlice'

const store = configureStore({
    reducer : {
        auth : authReducer,
        CategoriesList : adminCategorySlice,
        SubCategoriesList :  adminCategorySlice,
        PricingPlanList: adminPricingPlanSlice,
        businessList  : userBusinessServiceSlice,
        singleBusiness : userBusinessServiceSlice,
    }
});

export default store;