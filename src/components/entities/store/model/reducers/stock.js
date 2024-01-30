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
            state.stockLimitParams = action.payload
        },
        stockParamsGuidCategoryReducer: (state, action) => {
            state.stockGuidCategoryParams = action.payload
        },
        stockParamsNameReducer: (state, action) => {
            state.stockNameParams = action.payload
        },
        stockParamsReportReducer: (state, action) => {
            state.stockReportParams = action.payload
        },
        stockParamsSortReducer: (state, action) => {
            state.stockSortParams = action.payload
        },
        stockParamsSortDirectionReducer: (state, action) => {
            state.stockSortDirection = action.payload
        },
        stockParamsArticleReducer: (state, action) => {
            state.stockArticleParams = action.payload
        },
        stockStateResetReducer: (state) => {
            state.stockData = [];
            state.stockApiLoader = false;
        }
    },
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
    stockParamsArticleReducer
} = stockSlice.actions;
