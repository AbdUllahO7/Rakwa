import { configureStore } from "@reduxjs/toolkit";


import authReducer from './authSlice'
import adminCategorySlice from './adminSlice/AdminCategory'
import adminPricingPlanSlice from './adminSlice/AdminPricingPlan'
import userBusinessServiceSlice from './userSlice/businessServiceSlice'
import commentAndRatingReducer  from './userSlice/commentAndRating'
import MessageReducer  from './userSlice/MessageSlice'
import favoritesReducer from './userSlice/FavoritesSlice'
const store = configureStore({
    reducer : {
        auth : authReducer,
        CategoriesList : adminCategorySlice,
        SubCategoriesList :  adminCategorySlice,
        PricingPlanList: adminPricingPlanSlice,
        businessList  : userBusinessServiceSlice,
        singleBusiness : userBusinessServiceSlice,
        comments: commentAndRatingReducer,
        messages : MessageReducer,
        favorites  :favoritesReducer
    }
});

export default store;