import {configureStore} from '@reduxjs/toolkit'
import {supplySlice} from "./reducers/supply";

export const makeStore = () => {
    return configureStore({
        reducer: {
            supply: supplySlice.reducer
        }
    })
}
