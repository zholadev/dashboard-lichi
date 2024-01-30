import {createSlice} from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        productsData: [],
        productsApiLoader: false,
        productsPageParams: 1,
        productsReportParams: "by_articles",
        productsDownloadParams: 0,
        productsLimitParams: 10,
        productsCategoryParams: "",
        productsDetailByStore: false,
        productsArticleParams: ""
    },
    reducers: {
        getProductsData: (state, action) => {
            state.productsData = action.payload;
        },
        productsApiLoaderReducer: (state, action) => {
            state.productsApiLoader = action.payload
        },
        productsPageParamsReducer: (state, action) => {
            state.productsPageParams = action.payload;
        },
        productsReportParamsReducer: (state, action) => {
            state.productsReportParams = action.payload;
        },
        productsDownloadParamsReducer: (state, action) => {
            state.productsDownloadParams = action.payload;
        },
        productsCategoryParamsReducer: (state, action) => {
            state.productsCategoryParams = action.payload;
        },
        productsLimitParamsReducer: (state, action) => {
            state.productsLimitParams = action.payload;
        },
        productsDetailByStoreReducer: (state, action) => {
            state.productsDetailByStore = action.payload;
        },
        productsArticleParamsReducer: (state, action) => {
            state.productsArticleParams = action.payload;
        },
        productsResetDataReducer: (state) => {
            state.productsData = [];
            state.productsApiLoader = false;
            state.productsPageParams = 1;
            state.productsReportParams = "by_articles";
            state.productsDownloadParams = 0;
            state.productsCategoryParams = "";
            state.productsDetailByStore = "";
            state.productsArticleParams = ""
        }
    },
});
export const {
    productsApiLoaderReducer,
    getProductsData,
    productsResetDataReducer,
    productsPageParamsReducer,
    productsReportParamsReducer,
    productsCategoryParamsReducer,
    productsDetailByStoreReducer,
    productsLimitParamsReducer,
    productsDownloadParamsReducer,
    productsArticleParamsReducer
} = productsSlice.actions;
