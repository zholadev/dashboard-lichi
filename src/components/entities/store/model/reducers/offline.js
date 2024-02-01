import {createSlice} from '@reduxjs/toolkit';

export const offlineSlice = createSlice({
    name: 'offline',
    initialState: {
        offSchemaData: [],
        offSchemaApiLoader: false,
        offSchemaReportApiLoader: false,
        offSchemaReportData: [],
        offSchemaDataWithReport: [],
        offSchemaRender: false,
        offArticleParams: "",
        offDateParams: {from: "", to: new Date()},
        offCountryParams: "0KDQvtGB0YHQuNGP",
        offStoresParams: "",
        offDateGroupParams: "by_day",
        offCategoryParams: "",
        offDateCalendarValue: {from: "", to: new Date()},
        offStoresData: [],
        offChartWeekActivity: {},
        offEditBoard: false,
        offDragStartBoard: false,
        offBoardUseList: [],
        offBoardNotUseList: [],
        offBoardReportUseData: [],
        offSchemaContainerData: []
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
        toggleOffSchemaRenderAction: (state, action) => {
            state.offSchemaRender = action.payload
        },
        offSchemaArticleParamsReducer: (state, action) => {
            state.offArticleParams = action.payload
        },
        offDateParamsReducer: (state, action) => {
            state.offDateParams = action.payload
        },
        offSchemaCountryParamsReducer: (state, action) => {
            state.offCountryParams = action.payload
        },
        offDateCalendarValueReducer: (state, action) => {
            state.offDateCalendarValue = action.payload
        },
        offSchemaStoresParamsReducer: (state, action) => {
            state.offStoresParams = action.payload
        },
        offSchemaStoresDataReducer: (state, action) => {
            state.offStoresData = action.payload
        },
        offCategoryParamsReducer: (state, action) => {
            state.offCategoryParams = action.payload
        },
        offDateGroupParamsReducer: (state, action) => {
            state.offDateGroupParams = action.payload
        },
        offEditBoardReducer: (state, action) => {
            state.offEditBoard = action.payload
        },
        offDragStartBoardReducer: (state, action) => {
            state.offDragStartBoard = action.payload
        },
        offBoardUseListReducer: (state, action) => {
            state.offBoardUseList = action.payload
        },
        offBoardReportUseDataReducer: (state, action) => {
            state.offBoardReportUseData = action.payload
        },
        offBoardNotUseListReducer: (state, action) => {
            state.offBoardNotUseList = action.payload
        },
        offSchemaReportApiLoaderReducer: (state, action) => {
            state.offSchemaReportApiLoader = action.payload
        },
        offSchemaContainerDataReducer: (state, action) => {
            state.offSchemaContainerData = [...state.offSchemaContainerData, action.payload]
        },
        resetOffSchemaReportDataReducer: (state) => {
            state.offSchemaContainerData = []
        },
        resetOffSchemaDataReducer: (state) => {
            state.offSchemaData = []
            state.offSchemaApiLoader = false
            state.offSchemaReportApiLoader = false
            state.offSchemaReportData = []
            state.offSchemaDataWithReport = []
            state.offSchemaRender = false
            state.offArticleParams = ""
            state.offDateParams = {from: "", to: new Date()}
            state.offCountryParams = "0KDQvtGB0YHQuNGP"
            state.offStoresParams = ""
            state.offDateGroupParams = "by_day"
            state.offCategoryParams = ""
            state.offDateCalendarValue = {from: "", to: new Date()}
            state.offStoresData = []
            state.offBoardUseList = []
            state.offBoardNotUseList = []
            state.offSchemaContainerData = []
            state.offBoardReportUseData = []
            state.offEditBoard = false
            state.offDragStartBoard = false
        }
    },
});
export const {
    getOffSchemaDataAction,
    toggleOffSchemaApiLoaderAction,
    getOffSchemaReportDataAction,
    getOffSchemaDataWithReportDataAction,
    toggleOffSchemaRenderAction,
    offSchemaCountryParamsReducer,
    offSchemaStoresDataReducer,
    offDateParamsReducer,
    resetOffSchemaDataReducer,
    offSchemaStoresParamsReducer,
    offCategoryParamsReducer,
    offSchemaArticleParamsReducer,
    offDateGroupParamsReducer,
    offDateCalendarValueReducer,
    offEditBoardReducer,
    offDragStartBoardReducer,
    offBoardUseListReducer,
    offBoardNotUseListReducer,
    offBoardReportUseDataReducer,
    offSchemaReportApiLoaderReducer,
    offSchemaContainerDataReducer,
    resetOffSchemaReportDataReducer
} = offlineSlice.actions;
