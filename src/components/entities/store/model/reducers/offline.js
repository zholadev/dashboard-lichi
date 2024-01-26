import {createSlice} from '@reduxjs/toolkit';

export const offlineSlice = createSlice({
    name: 'offline',
    initialState: {
        offSchemaData: [],
        offSchemaApiLoader: false,
        offSchemaReportData: [],
        offSchemaDataWithReport: [],
        offPlanDetailApiLoader: false,
        offPlanDetailCategory: "",
        offPlanDetailDate: "",
    },
    reducers: {
        getOffSchemaDataAction: (state, action) => {
            state.offSchemaData = action.payload;
        },
        toggleOffSchemaApiLoaderAction: (state, action) => {
            state.offSchemaApiLoader = action.payload
        },
        getOffSchemaReportDataAction: (state, action) => {
            state.offSchemaReportData = [...state.offSchemaReportData, action.payload]
        },
        getOffSchemaDataWithReportDataAction: (state, action) => {
            state.offSchemaDataWithReport = action.payload
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
    getOffSchemaDataAction,
    toggleOffSchemaApiLoaderAction,
    getOffSchemaReportDataAction,
    getOffSchemaDataWithReportDataAction,
} = offlineSlice.actions;
