import {createSlice} from '@reduxjs/toolkit';

export const annotationsSupply = createSlice({
    name: 'annotations',
    initialState: {
        eventsData: [],
        eventsApiLoader: false,
        eventsParamsPage: 1
    },
    reducers: {
        eventsDataReducer: (state, action) => {
            state.eventsData = action.payload;
        },
        eventsApiLoaderReducer: (state, action) => {
            state.eventsApiLoader = action.payload;
        },
        eventsParamsPageReducer: (state, action) => {
            state.eventsParamsPage = action.payload;
        },
        resetEventsDataReducer: (state) => {
            state.eventsData = [];
            state.eventsApiLoader = false;
            state.eventsParamsPage = 1
        }
    },
});
export const {
    eventsDataReducer,
    eventsApiLoaderReducer,
    eventsParamsPageReducer,
    resetEventsDataReducer
} = annotationsSupply.actions;
