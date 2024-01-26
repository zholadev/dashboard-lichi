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
    getCategoryParams,
    getDetailByStoreParams,
    getPageParams,
    getProductsData,
    getReportParams,
    resetData,
    toggleApiLoader
} from "@/components/entities/store/model/reducers/products";
import {
    getOfflinePlanCategoryParams,
    getOfflinePlanData,
    getOfflinePlanPlanDateParams,
    resetOfflinePlanData,
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
    toggleOffSchemaApiLoaderAction
} from "@/components/entities/store/model/reducers/offline";

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
        supplyCountryDataHandle: (data) => dispatch(getCountryData(data)),
        supplyDateKanbanDataHandle: (data) => dispatch(getDateKanbanData(data)),
        supplyCountryLoader: (value) => dispatch(toggleCountryDataLoader(value)),
        supplyKanbanLoader: (value) => dispatch(toggleKanbanDataLoader(value)),
        productsApiLoader: (value) => dispatch(toggleApiLoader(value)),
        productsPageParams: (value) => dispatch(getPageParams(value)),
        productsReportParams: (value) => dispatch(getReportParams(value)),
        productsCategoryParams: (value) => dispatch(getCategoryParams(value)),
        productsDetailByStoreParams: (value) => dispatch(getDetailByStoreParams(value)),
        productsGetProductsData: (data) => dispatch(getProductsData(data)),
        offlinePlanGetData: (data) => dispatch(getOfflinePlanData(data)),
        offlineCategoryParams: (value) => dispatch(getOfflinePlanCategoryParams(value)),
        offlinePlanDateParams: (value) => dispatch(getOfflinePlanPlanDateParams(value)),
        offlinePlanApiLoader: (value) => dispatch(toggleOfflinePlanApiLoader(value)),
        offlinePlanDetailGetData: (data) => dispatch(getOfflinePlanDetailData(data)),
        offSchemaGetData: (data) => dispatch(getOffSchemaDataAction(data)),
        offSchemaReportGetData: (data) => dispatch(getOffSchemaReportDataAction(data)),
        offSchemaDataWithReportGetData: (data) => dispatch(getOffSchemaDataWithReportDataAction(data)),
        offlinePlanDetailCategoryParams: (value) => dispatch(getOfflinePlanDetailCategoryParams(value)),
        offlinePlanDetailDateParams: (value) => dispatch(getOfflinePlanPlanDetailDateParams(value)),
        offlinePlanDetailApiLoader: (value) => dispatch(toggleOfflinePlanDetailApiLoader(value)),
        offSchemaApiLoader: (value) => dispatch(toggleOffSchemaApiLoaderAction(value)),
        productsResetData: createDispatchHandler(dispatch, resetData, "resetProductsData"),
        offlinePlanResetData: createDispatchHandler(dispatch, resetOfflinePlanData, "resetOfflineData"),
        offlinePlanDetailResetData: createDispatchHandler(dispatch, resetOfflinePlanDetailData, "resetOfflinePlanDetailData"),
    }
}

export default useDispatchActionHandle;
