import {createSlice} from '@reduxjs/toolkit';

export const offlinePlanDetailSlice = createSlice({
    name: 'offline_plan_detail',
    initialState: {
        offPlanDetailData: [],
        offPlanDetailApiLoader: false,
        offPlanDetailDate: new Date(),
    },
    reducers: {
        offPlanDetailDataReducer: (state, action) => {
            state.offPlanDetailData = action.payload;
        },
        offPlanDetailApiLoaderReducer: (state, action) => {
            state.offPlanDetailApiLoader = action.payload
        },
        offPlanDetailDateReducer: (state, action) => {
            state.offPlanDetailDate = action.payload;
        },
        resetOfflinePlanDetailReducer: (state) => {
            state.offlinePlanDetailData = [];
            state.offPlanDetailApiLoader = false;
            state.offPlanDetailDate = null;
        }
    },
});
export const {
    offPlanDetailDateReducer,
    offPlanDetailApiLoaderReducer,
    offPlanDetailDataReducer,
    resetOfflinePlanDetailReducer
} = offlinePlanDetailSlice.actions;
