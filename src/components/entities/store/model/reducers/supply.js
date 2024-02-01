import {createSlice} from '@reduxjs/toolkit';

export const supplySlice = createSlice({
    name: 'supply',
    initialState: {
        countryData: [],
        kanbanData: [],
        countryDataLoader: false,
        kanbanDataLoader: false,
        supplyKanbanColumnData: [],
        supplyKanbanColumnApiLoader: false,
        supplyParamsDateStartData: [],
        supplyParamsDateEndData: [],
        supplyParamsDateStart: "",
        supplyParamsDateEnd: "",
        supplyParamsNetworkId: 1,
        supplyCreateKanbanData: {},
        supplySheetToggle: false,
        supplyParamsColumnWeekId: '2023-45'
    },
    reducers: {
        getCountryData: (state, action) => {
            state.countryData = action.payload;
        },
        getDateKanbanData: (state, action) => {
            state.kanbanData = action.payload;
        },
        toggleCountryDataLoader: (state, action) => {
            state.countryDataLoader = action.payload
        },
        toggleKanbanDataLoader: (state, action) => {
            state.kanbanDataLoader = action.payload
        },
        supplyKanbanColumnDataReducer: (state, action) => {
            state.supplyKanbanColumnData = action.payload
        },
        supplySheetToggleReducer: (state, action) => {
            state.supplySheetToggle = action.payload
        },
        supplyParamsNetworkIdReducer: (state, action) => {
            state.supplyParamsNetworkId = action.payload
        },
        supplyParamsDateReducer: (state, action) => {
            state.supplyParamsDate = action.payload
        },
        supplyKanbanColumnApiLoaderReducer: (state, action) => {
            state.supplyKanbanColumnApiLoader = action.payload
        },
        supplyParamsColumnWeekIdReducer: (state, action) => {
            state.supplyParamsColumnWeekId = action.payload
        },
        supplyParamsDateStartDataReducer: (state, action) => {
            state.supplyParamsDateStartData = action.payload
        },
        supplyParamsDateEndDataReducer: (state, action) => {
            state.supplyParamsDateEndData = action.payload
        },
        supplyParamsDateStartReducer: (state, action) => {
            state.supplyParamsDateStart = action.payload
        },
        supplyParamsDateEndReducer: (state, action) => {
            state.supplyParamsDateEnd = action.payload
        },
        supplyResetDataReducer: (state) => {
            state.countryData = [];
            state.kanbanData = [];
            state.countryDataLoader = false;
            state.kanbanDataLoader = false;
        }
    },
});
export const {
    getCountryData,
    getDateKanbanData,
    supplyResetDataReducer,
    toggleCountryDataLoader,
    toggleKanbanDataLoader,
    supplyKanbanColumnDataReducer,
    supplySheetToggleReducer,
    supplyParamsNetworkIdReducer,
    supplyParamsDateReducer,
    supplyKanbanColumnApiLoaderReducer,
    supplyParamsColumnWeekIdReducer,
    supplyParamsDateStartDataReducer,
    supplyParamsDateEndDataReducer,
    supplyParamsDateStartReducer,
    supplyParamsDateEndReducer
} = supplySlice.actions;
