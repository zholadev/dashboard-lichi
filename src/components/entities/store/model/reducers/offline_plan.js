import {createSlice} from '@reduxjs/toolkit';

export const offlinePlanSlice = createSlice({
    name: 'offline_plan',
    initialState: {
        offlinePlanData: [],
        offPlanApiLoader: false,
        offPlanCategoryParams: "",
        offPlanDateParams: new Date(),
    },
    reducers: {
        offlinePlanDataReducer: (state, action) => {
            state.offlinePlanData = action.payload;
        },
        offPlanApiLoaderReducer: (state, action) => {
            state.offPlanApiLoader = action.payload
        },
        offPlanCategoryParamsReducer: (state, action) => {
            state.offPlanCategoryParams = action.payload;
        },
        offPlanDateParamsReducer: (state, action) => {
            state.offPlanDateParams = action.payload;
        },
        resetOfflinePlanReducer: (state) => {
            state.offlinePlanData = [];
            state.offPlanApiLoader = false;
            state.offPlanCategoryParams = "";
            state.offPlanDateParams = new Date();
        }
    },
});
export const {
    offPlanDateParamsReducer,
    offPlanCategoryParamsReducer,
    offlinePlanDataReducer,
    resetOfflinePlanReducer,
    offPlanApiLoaderReducer
} = offlinePlanSlice.actions;
