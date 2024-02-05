import {createSlice} from '@reduxjs/toolkit';

export const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        stockData: [],
        stockApiLoader: false,
        stockPageParams: 1,
        stockLimitParams: 10,
        stockGuidCategoryParams: "",
        stockNameParams: "",
        stockReportParams: "group_by_size",
        stockSortParams: "name",
        stockSortDirection: -1,
        stockTriggerApiData: "",
        stockArticleParams: ""
    },
    reducers: {
        stockGetDataReducer: (state, action) => {
            state.stockData = action.payload;
        },
        stockApiLoaderReducer: (state, action) => {
            state.stockApiLoader = action.payload
        },
        stockParamsPageReducer: (state, action) => {
            state.stockPageParams = action.payload
        },
        stockParamsLimitReducer: (state, action) => {
            state.stockPageParams = 1
            state.stockLimitParams = action.payload
        },
        stockParamsGuidCategoryReducer: (state, action) => {
            state.stockPageParams = 1
            state.stockGuidCategoryParams = action.payload
        },
        stockParamsNameReducer: (state, action) => {
            state.stockPageParams = 1
            state.stockNameParams = action.payload
        },
        stockParamsReportReducer: (state, action) => {
            state.stockPageParams = 1
            state.stockReportParams = action.payload
        },
        stockParamsSortReducer: (state, action) => {
            state.stockPageParams = 1
            state.stockSortParams = action.payload
        },
        stockParamsSortDirectionReducer: (state, action) => {
            state.stockPageParams = 1
            state.stockSortDirection = action.payload
        },
        stockParamsArticleReducer: (state, action) => {
            state.stockPageParams = 1
            state.stockArticleParams = action.payload
        },
        stockTriggerApiDataReducer: (state, action) => {
            state.stockTriggerApiData = action.payload
        },
        stockStateResetReducer: (state) => {
            state.stockData = []
            state.stockApiLoader = false
            state.stockPageParams = 1
            state.stockLimitParams = 10
            state.stockGuidCategoryParams = ""
            state.stockNameParams = ""
            state.stockReportParams = "group_by_size"
            state.stockSortParams = "name"
            state.stockSortDirection = -1
            state.stockTriggerApiData = ""
            state.stockArticleParams = ""
        }
    }
});
export const {
    stockGetDataReducer,
    stockApiLoaderReducer,
    stockStateResetReducer,
    stockParamsSortDirectionReducer,
    stockParamsGuidCategoryReducer,
    stockParamsSortReducer,
    stockParamsNameReducer,
    stockParamsPageReducer,
    stockParamsReportReducer,
    stockParamsLimitReducer,
    stockParamsArticleReducer,
    stockTriggerApiDataReducer
} = stockSlice.actions;
