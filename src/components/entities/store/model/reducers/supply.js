import {createSlice} from '@reduxjs/toolkit';

export const supplySlice = createSlice({
    name: 'supply',
    initialState: {
        countryData: [],
        kanbanData: [],
        countryDataLoader: false,
        kanbanDataLoader: false
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
        resetData: (state) => {
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
    resetData,
    toggleCountryDataLoader,
    toggleKanbanDataLoader
} = supplySlice.actions;
