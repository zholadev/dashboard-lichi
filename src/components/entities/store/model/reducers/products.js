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
        productsArticleParams: "",
        productsParamsTriggerApi: "",
        productParamsSortName: "",
        productParamsSortDirection: -1,
        productParamsStores: []
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
            state.productsPageParams = 1
            state.productsReportParams = action.payload;
        },
        productsDownloadParamsReducer: (state, action) => {
            state.productsDownloadParams = action.payload;
        },
        productsCategoryParamsReducer: (state, action) => {
            state.productsPageParams = 1
            state.productsCategoryParams = action.payload;
        },
        productsLimitParamsReducer: (state, action) => {
            state.productsPageParams = 1
            state.productsLimitParams = action.payload;
        },
        productsDetailByStoreReducer: (state, action) => {
            state.productParamsStores = []
            state.productsPageParams = 1
            state.productsDetailByStore = action.payload;
        },
        productsArticleParamsReducer: (state, action) => {
            state.productsPageParams = 1
            state.productsArticleParams = action.payload;
        },
        productParamsSortNameReducer: (state, action) => {
            state.productsPageParams = 1
            state.productParamsSortName = action.payload;
        },
        productParamsSortDirectionReducer: (state, action) => {
            state.productsPageParams = 1
            state.productParamsSortDirection = action.payload;
        },
        productParamsStoresReducer: (state, action) => {
            state.productsPageParams = 1
            state.productParamsStores = action.payload;
        },
        productsParamsTriggerApiReducer: (state, action) => {
            state.productsParamsTriggerApi = action.payload;
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
            state.productParamsStores = []
            state.productParamsSortDirection = -1
            state.productParamsSortName = ""
            state.productsParamsTriggerApi = ""
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
    productsArticleParamsReducer,
    productParamsSortNameReducer,
    productParamsSortDirectionReducer,
    productParamsStoresReducer,
    productsParamsTriggerApiReducer
} = productsSlice.actions;
