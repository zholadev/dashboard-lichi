import {supplySlice} from "./reducers/supply";
import {configureStore} from '@reduxjs/toolkit'
import {productsSlice} from "./reducers/products";
import {offlinePlanSlice} from "./reducers/offline_plan";
import {offlinePlanDetailSlice} from "./reducers/offline_plan_detail";

export const makeStore = () => {
    return configureStore({
        reducer: {
            supply: supplySlice.reducer,
            products: productsSlice.reducer,
            offline_plan: offlinePlanSlice.reducer,
            offline_plan_detail: offlinePlanDetailSlice.reducer,
        }
    })
}
