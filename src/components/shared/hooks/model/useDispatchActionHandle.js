'use client'

import {useDispatch} from "react-redux";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {
    getCountryData,
    getDateKanbanData,
    supplyKanbanColumnApiLoaderReducer,
    supplyKanbanColumnDataReducer,
    supplyParamsColumnWeekIdReducer,
    supplyParamsDateEndDataReducer,
    supplyParamsDateEndReducer,
    supplyParamsDateReducer,
    supplyParamsDateStartDataReducer,
    supplyParamsDateStartReducer,
    supplyParamsNetworkIdReducer,
    supplyResetDataReducer,
    supplySheetToggleReducer,
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
    offlinePlanDataReducer,
    offPlanApiLoaderReducer,
    offPlanCategoryParamsReducer,
    offPlanDateParamsReducer,
    resetOfflinePlanReducer
} from "@/components/entities/store/model/reducers/offline_plan";
import {
    offPlanDetailApiLoaderReducer,
    offPlanDetailDataReducer,
    offPlanDetailDateReducer,
    resetOfflinePlanDetailReducer
} from "@/components/entities/store/model/reducers/offline_plan_detail";
import {
    getOffSchemaDataAction,
    getOffSchemaDataWithReportDataAction,
    getOffSchemaReportDataAction,
    offBoardNotUseListReducer,
    offBoardReportUseDataReducer,
    offBoardUseListReducer,
    offCategoryParamsReducer,
    offDateCalendarValueReducer,
    offDateGroupParamsReducer,
    offDateParamsReducer,
    offDragStartBoardReducer,
    offEditBoardReducer,
    offSchemaArticleParamsReducer,
    offSchemaContainerDataReducer,
    offSchemaCountryParamsReducer,
    offSchemaReportApiLoaderReducer,
    offSchemaStoresDataReducer,
    offSchemaStoresParamsReducer,
    resetOffSchemaDataReducer,
    resetOffSchemaReportDataReducer,
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
import {
    eventsApiLoaderReducer,
    eventsDataReducer,
    eventsParamsPageReducer,
    resetEventsDataReducer
} from "@/components/entities/store/model/reducers/annotations";

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
        supplyKanbanColumnDataAction: (data) => dispatch(supplyKanbanColumnDataReducer(data)),
        supplySheetToggleAction: (value) => dispatch(supplySheetToggleReducer(value)),
        supplyParamsNetworkIdAction: (value) => dispatch(supplyParamsNetworkIdReducer(value)),
        supplyParamsDateAction: (value) => dispatch(supplyParamsDateReducer(value)),
        supplyKanbanColumnApiLoaderAction: (value) => dispatch(supplyKanbanColumnApiLoaderReducer(value)),
        supplyParamsColumnWeekIdAction: (value) => dispatch(supplyParamsColumnWeekIdReducer(value)),
        supplyParamsDateStartDataAction: (value) => dispatch(supplyParamsDateStartDataReducer(value)),
        supplyParamsDateEndDataAction: (value) => dispatch(supplyParamsDateEndDataReducer(value)),
        supplyParamsDateStartAction: (data) => dispatch(supplyParamsDateStartReducer(data)),
        supplyParamsDateEndAction: (data) => dispatch(supplyParamsDateEndReducer(data)),

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
        offPlanApiLoaderReducerAction: (value) => dispatch(offPlanApiLoaderReducer(value)),

        // Offline Plan Detail actions
        offPlanDetailDataAction: (data) => dispatch(offPlanDetailDataReducer(data)),
        offPlanDetailDateAction: (value) => dispatch(offPlanDetailDateReducer(value)),
        offPlanDetailApiLoaderAction: (value) => dispatch(offPlanDetailApiLoaderReducer(value)),

        // Offline schema actions
        offSchemaGetData: (data) => dispatch(getOffSchemaDataAction(data)),
        offSchemaReportGetData: (data) => dispatch(getOffSchemaReportDataAction(data)),
        offSchemaDataWithReportGetData: (data) => dispatch(getOffSchemaDataWithReportDataAction(data)),
        offSchemaRenderToggle: (data) => dispatch(toggleOffSchemaRenderAction(data)),
        offSchemaApiLoader: (value) => dispatch(toggleOffSchemaApiLoaderAction(value)),
        offSchemaReportApiLoaderAction: (value) => dispatch(offSchemaReportApiLoaderReducer(value)),
        offSchemaCountryParamsAction: (value) => dispatch(offSchemaCountryParamsReducer(value)),
        offDateParamsReducerAction: (value) => dispatch(offDateParamsReducer(value)),
        offSchemaStoresDataAction: (data) => dispatch(offSchemaStoresDataReducer(data)),
        offSchemaStoresParamsAction: (value) => dispatch(offSchemaStoresParamsReducer(value)),
        offSchemaArticleParamsAction: (value) => dispatch(offSchemaArticleParamsReducer(value)),
        offCategoryParamsReducerAction: (value) => dispatch(offCategoryParamsReducer(value)),
        offDateGroupParamsReducerAction: (value) => dispatch(offDateGroupParamsReducer(value)),
        offDateCalendarValueAction: (value) => dispatch(offDateCalendarValueReducer(value)),
        offEditBoardAction: (value) => dispatch(offEditBoardReducer(value)),
        offDragStartBoardAction: (value) => dispatch(offDragStartBoardReducer(value)),
        offBoardUseListAction: (data) => dispatch(offBoardUseListReducer(data)),
        offBoardNotUseListAction: (data) => dispatch(offBoardNotUseListReducer(data)),
        offBoardReportUseDataAction: (data) => dispatch(offBoardReportUseDataReducer(data)),
        offSchemaContainerDataAction: (data) => dispatch(offSchemaContainerDataReducer(data)),
        resetOffSchemaReportDataAction: () => dispatch(resetOffSchemaReportDataReducer()),

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
        stockParamsArticleAction: (value) => dispatch(stockParamsArticleReducer(value)),

        // Events
        eventsDataAction: (data) => dispatch(eventsDataReducer(data)),
        eventsApiLoaderAction: (value) => dispatch(eventsApiLoaderReducer(value)),
        eventsParamsPageAction: (value) => dispatch(eventsParamsPageReducer(value)),

        // Reset actions
        productsResetDataAction: createDispatchHandler(dispatch, productsResetDataReducer, "productsResetData"),
        resetOfflinePlanAction: createDispatchHandler(dispatch, resetOfflinePlanReducer, "resetOfflinePlanReducer"),
        resetOfflinePlanDetailAction: createDispatchHandler(dispatch, resetOfflinePlanDetailReducer, "resetOfflinePlanDetailReducer"),
        stockStateResetAction: createDispatchHandler(dispatch, stockStateResetReducer, "stockStateResetAction"),
        resetOffSchemaDataAction: createDispatchHandler(dispatch, resetOffSchemaDataReducer, "resetOffSchemaDataAction"),
        resetEventsDataAction: createDispatchHandler(dispatch, resetEventsDataReducer, "resetEventsDataReducer"),
        supplyResetDataAction: createDispatchHandler(dispatch, supplyResetDataReducer, "supplyResetDataReducer"),
    }
}

export default useDispatchActionHandle;
