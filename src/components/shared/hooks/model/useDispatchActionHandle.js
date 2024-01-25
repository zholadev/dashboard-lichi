'use client'

import {useDispatch} from "react-redux";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {
    getCountryData,
    getDateKanbanData,
    toggleCountryDataLoader, toggleKanbanDataLoader
} from "@/components/entities/store/model/reducers/supply";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @returns {{supplyCountryDataHandle: (function(*): function(): void), supplyDateKanbanDataHandle: (function(*): function(): void)}}
 */
function useDispatchActionHandle() {
    const dispatch = useDispatch()

    const createDispatchHandler = (dispatch, action, name, value) => () => {
        try {
            dispatch(action(value))
        } catch (error) {
            errorHandler("useDispatchHandler", name, error)
        }
    };

    return {
        supplyCountryDataHandle: (data) => {
            dispatch(getCountryData(data))
            // createDispatchHandler(dispatch, getCountryData, "getCountryData", data)
        },
        supplyDateKanbanDataHandle: (data) => {
            dispatch(getDateKanbanData(data))
            // return createDispatchHandler(dispatch, getDateKanbanData, "getDateKanbanData", data)
        },
        supplyCountryLoader: (value) => {
            dispatch(toggleCountryDataLoader(value))
        },
        supplyKanbanLoader: (value) => {
            dispatch(toggleKanbanDataLoader(value))
        }
    }
}

export default useDispatchActionHandle;
