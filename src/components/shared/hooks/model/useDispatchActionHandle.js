'use client'

import {useDispatch} from "react-redux";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {
    getCountryData,
    getDateKanbanData,
    toggleCountryDataLoader,
    toggleKanbanDataLoader
} from "@/components/entities/store/model/reducers/supply";
import {
    getProductsData,
    productsApiLoaderReducer,
    productsArticleParamsReducer,
    productsCategoryParamsReducer,
    productsDetailByStoreReducer,
    productsDownloadParamsReducer,
    productsLimitParamsReducer,
    productsPageParamsReducer,
    productsReportParamsReducer,
    productsResetDataReducer
} from "@/components/entities/store/model/reducers/products";
import {
    getOfflinePlanCategoryParams,
    getOfflinePlanData,
    getOfflinePlanPlanDateParams,
    offlinePlanDataReducer,
    offPlanApiLoaderReducer,
    offPlanCategoryParamsReducer,
    offPlanDateParamsReducer,
    resetOfflinePlanReducer,
    toggleOfflinePlanApiLoader
} from "@/components/entities/store/model/reducers/offline_plan";
import {
    getOfflinePlanDetailCategoryParams,
    getOfflinePlanDetailData,
    getOfflinePlanPlanDetailDateParams,
    resetOfflinePlanDetailData,
    toggleOfflinePlanDetailApiLoader
} from "@/components/entities/store/model/reducers/offline_plan_detail";
import {
    getOffSchemaDataAction,
    getOffSchemaDataWithReportDataAction,
    getOffSchemaReportDataAction,
    offCategoryParamsReducer,
    offDateCalendarValueReducer,
    offDateGroupParamsReducer,
    offDateParamsReducer,
    offSchemaArticleParamsReducer,
    offSchemaCountryParamsReducer,
    offSchemaStoresDataReducer,
    offSchemaStoresParamsReducer,
    resetOffSchemaDataReducer,
    toggleOffSchemaApiLoaderAction,
    toggleOffSchemaRenderAction
} from "@/components/entities/store/model/reducers/offline";
import {
    stockApiLoaderReducer,
    stockGetDataReducer,
    stockParamsArticleReducer,
    stockParamsGuidCategoryReducer,
    stockParamsLimitReducer,
    stockParamsNameReducer,
    stockParamsPageReducer,
    stockParamsReportReducer,
    stockParamsSortDirectionReducer,
    stockParamsSortReducer,
    stockStateResetReducer
} from "@/components/entities/store/model/reducers/stock";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @returns {{supplyCountryDataHandle: (function(*): function(): void), supplyDateKanbanDataHandle: (function(*): function(): void)}}
 */
function useDispatchActionHandle() {
    const dispatch = useDispatch()

    const createDispatchHandler = (dispatch, action, name) => () => {
        try {
            dispatch(action())
        } catch (error) {
            errorHandler("useDispatchHandler", name, error)
        }
    };

    return {
        // Supply actions
        supplyCountryDataHandle: (data) => dispatch(getCountryData(data)),
        supplyDateKanbanDataHandle: (data) => dispatch(getDateKanbanData(data)),
        supplyCountryLoader: (value) => dispatch(toggleCountryDataLoader(value)),
        supplyKanbanLoader: (value) => dispatch(toggleKanbanDataLoader(value)),

        // Products actions
        productsApiLoaderAction: (value) => dispatch(productsApiLoaderReducer(value)),
        productsPageParamsAction: (value) => dispatch(productsPageParamsReducer(value)),
        productsReportParamsAction: (value) => dispatch(productsReportParamsReducer(value)),
        productsCategoryParamsAction: (value) => dispatch(productsCategoryParamsReducer(value)),
        productsLimitParamsAction: (value) => dispatch(productsLimitParamsReducer(value)),
        productsDetailByStoreParamsAction: (value) => dispatch(productsDetailByStoreReducer(value)),
        productsGetProductsData: (data) => dispatch(getProductsData(data)),
        productsDownloadParamsAction: (value) => dispatch(productsDownloadParamsReducer(value)),
        productsArticleParamsReducerAction: (value) => dispatch(productsArticleParamsReducer(value)),


        // Offline actions
        offlinePlanDataAction: (data) => dispatch(offlinePlanDataReducer(data)),
        offPlanCategoryParamsAction: (value) => dispatch(offPlanCategoryParamsReducer(value)),
        offPlanDateParamsAction: (value) => dispatch(offPlanDateParamsReducer(value)),
        offlinePlanDetailGetData: (data) => dispatch(getOfflinePlanDetailData(data)),
        offPlanApiLoaderReducerAction: (value) => dispatch(offPlanApiLoaderReducer(value)),

        // Offline Plan Detail actions
        offlinePlanDetailCategoryParams: (value) => dispatch(getOfflinePlanDetailCategoryParams(value)),
        offlinePlanDetailDateParams: (value) => dispatch(getOfflinePlanPlanDetailDateParams(value)),
        offlinePlanDetailApiLoader: (value) => dispatch(toggleOfflinePlanDetailApiLoader(value)),

        // Offline schema actions
        offSchemaGetData: (data) => dispatch(getOffSchemaDataAction(data)),
        offSchemaReportGetData: (data) => dispatch(getOffSchemaReportDataAction(data)),
        offSchemaDataWithReportGetData: (data) => dispatch(getOffSchemaDataWithReportDataAction(data)),
        offSchemaRenderToggle: (data) => dispatch(toggleOffSchemaRenderAction(data)),
        offSchemaApiLoader: (value) => dispatch(toggleOffSchemaApiLoaderAction(value)),
        offSchemaCountryParamsAction: (value) => dispatch(offSchemaCountryParamsReducer(value)),
        offDateParamsReducerAction: (value) => dispatch(offDateParamsReducer(value)),
        offSchemaStoresDataAction: (data) => dispatch(offSchemaStoresDataReducer(data)),
        offSchemaStoresParamsAction: (value) => dispatch(offSchemaStoresParamsReducer(value)),
        offSchemaArticleParamsAction: (value) => dispatch(offSchemaArticleParamsReducer(value)),
        offCategoryParamsReducerAction: (value) => dispatch(offCategoryParamsReducer(value)),
        offDateGroupParamsReducerAction: (value) => dispatch(offDateGroupParamsReducer(value)),
        offDateCalendarValueAction: (value) => dispatch(offDateCalendarValueReducer(value)),

        // Stock actions
        stockGetDataAction: (data) => dispatch(stockGetDataReducer(data)),
        stockApiLoaderAction: (value) => dispatch(stockApiLoaderReducer(value)),
        stockParamsPageAction: (value) => dispatch(stockParamsPageReducer(value)),
        stockParamsLimitAction: (value) => dispatch(stockParamsLimitReducer(value)),
        stockParamsGuidCategoryAction: (value) => dispatch(stockParamsGuidCategoryReducer(value)),
        stockParamsNameAction: (value) => dispatch(stockParamsNameReducer(value)),
        stockParamsReportAction: (value) => dispatch(stockParamsReportReducer(value)),
        stockParamsSortAction: (value) => dispatch(stockParamsSortReducer(value)),
        stockParamsSortDirectionAction: (value) => dispatch(stockParamsSortDirectionReducer(value)),

        // Reset actions
        stockParamsArticleAction: (value) => dispatch(stockParamsArticleReducer(value)),
        productsResetDataAction: createDispatchHandler(dispatch, productsResetDataReducer, "productsResetData"),
        resetOfflinePlanAction: createDispatchHandler(dispatch, resetOfflinePlanReducer, "resetOfflinePlanReducer"),
        offlinePlanDetailResetData: createDispatchHandler(dispatch, resetOfflinePlanDetailData, "resetOfflinePlanDetailData"),
        stockStateResetAction: createDispatchHandler(dispatch, stockStateResetReducer, "stockStateResetAction"),
        resetOffSchemaDataAction: createDispatchHandler(dispatch, resetOffSchemaDataReducer, "resetOffSchemaDataAction"),
    }
}

export default useDispatchActionHandle;
