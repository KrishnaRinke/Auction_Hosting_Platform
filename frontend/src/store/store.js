import {configureStore} from "@reduxjs/toolkit";
import commissionReducer from "./slices/commissionSlice"
import userReducer from "./slices/userSlice"
import auctionReducer from "./slices/auctionSlice"
import bidReducer from "./slices/bidSlice"
import superAdminReducer from "./slices/superAdminSlice"
export const store = configureStore({
    reducer:{
        user : userReducer,
        commission : commissionReducer,
        auction: auctionReducer,
        bid:bidReducer,
        superAdmin:superAdminReducer,  
    },
})