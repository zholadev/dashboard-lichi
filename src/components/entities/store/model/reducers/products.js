import {createSlice} from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        formData: {},
        productsData: [],
        apiLoader: false,
        page: 1,
        report: "by_articles",
        download: 0,
        limit: 10,
        category: "",
        detail_by_store: false,
    },
    reducers: {
        getProductsData: (state, action) => {
            state.productsData = action.payload;
        },
        toggleApiLoader: (state, action) => {
            state.apiLoader = action.payload
        },
        getPageParams: (state, action) => {
            state.page = action.payload;
        },
        getReportParams: (state, action) => {
            state.report = action.payload;
        },
        getCategoryParams: (state, action) => {
            state.category = action.payload;
        },
        getLimitParams: (state, action) => {
            state.limit = action.payload;
        },
        getDetailByStoreParams: (state, action) => {
            state.detail_by_store = action.payload;
        },
        resetData: (state) => {
            state.formData = {};
            state.productsData = [];
            state.apiLoader = false;
            state.page = 1;
            state.report = "by_articles";
            state.download = false;
            state.category = "";
            state.detail_by_store = "";
        }
    },
});
export const {
    toggleApiLoader,
    getProductsData,
    resetData,
    getPageParams,
    getReportParams,
    getCategoryParams,
    getDetailByStoreParams,
    getLimitParams,
} = productsSlice.actions;
