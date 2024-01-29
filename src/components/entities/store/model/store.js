import {supplySlice} from "./reducers/supply";
import {configureStore} from '@reduxjs/toolkit'
import {productsSlice} from "./reducers/products";
import {offlinePlanSlice} from "./reducers/offline_plan";
import {offlinePlanDetailSlice} from "./reducers/offline_plan_detail";
import {offlineSlice} from "@/components/entities/store/model/reducers/offline";
import {stockSlice} from "@/components/entities/store/model/reducers/stock";

export const makeStore = () => {
    return configureStore({
        reducer: {
            supply: supplySlice.reducer,
            products: productsSlice.reducer,
            offline_plan: offlinePlanSlice.reducer,
            offline_plan_detail: offlinePlanDetailSlice.reducer,
            offline: offlineSlice.reducer,
            stock: stockSlice.reducer
        }
    })
}
