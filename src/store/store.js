import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../store/features/currency/currencySlice";

export default configureStore({
    reducer: {
        currency: currencyReducer
    }
})