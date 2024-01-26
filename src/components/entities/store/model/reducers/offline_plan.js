import {createSlice} from '@reduxjs/toolkit';

export const offlinePlanSlice = createSlice({
    name: 'offline_plan',
    initialState: {
        offlinePlanData: [],
        apiLoader: false,
        category: "",
        planDate: null,
    },
    reducers: {
        getOfflinePlanData: (state, action) => {
            state.offlinePlanData = action.payload;
        },
        toggleOfflinePlanApiLoader: (state, action) => {
            state.apiLoader = action.payload
        },
        getOfflinePlanCategoryParams: (state, action) => {
            state.category = action.payload;
        },
        getOfflinePlanPlanDateParams: (state, action) => {
            state.planDate = action.payload.toString();
        },
        resetOfflinePlanData: (state) => {
            state.offlinePlanData = [];
            state.apiLoader = false;
            state.category = "";
            state.planDate = null;
        }
    },
});
export const {
    getOfflinePlanPlanDateParams,
    getOfflinePlanCategoryParams,
    getOfflinePlanData,
    resetOfflinePlanData,
    toggleOfflinePlanApiLoader
} = offlinePlanSlice.actions;
