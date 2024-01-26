import {createSlice} from '@reduxjs/toolkit';

export const offlinePlanDetailSlice = createSlice({
    name: 'offline_plan_detail',
    initialState: {
        offlinePlanDetailData: [],
        offPlanDetailApiLoader: false,
        offPlanDetailCategory: "",
        offPlanDetailDate: "",

    },
    reducers: {
        getOfflinePlanDetailData: (state, action) => {
            state.offlinePlanDetailData = action.payload;
        },
        toggleOfflinePlanDetailApiLoader: (state, action) => {
            state.offPlanDetailApiLoader = action.payload
        },
        getOfflinePlanDetailCategoryParams: (state, action) => {
            state.offPlanDetailCategory = action.payload;
        },
        getOfflinePlanPlanDetailDateParams: (state, action) => {
            state.offPlanDetailDate = action.payload.toString();
        },
        resetOfflinePlanDetailData: (state) => {
            state.offlinePlanDetailData = [];
            state.offPlanDetailApiLoader = false;
            state.offPlanDetailCategory = "";
            state.offPlanDetailDate = null;
        }
    },
});
export const {
    getOfflinePlanPlanDetailDateParams,
    getOfflinePlanDetailCategoryParams,
    toggleOfflinePlanDetailApiLoader,
    getOfflinePlanDetailData,
    resetOfflinePlanDetailData
} = offlinePlanDetailSlice.actions;
