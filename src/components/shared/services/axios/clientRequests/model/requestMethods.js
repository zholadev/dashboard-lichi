import {sendApiPostRequest} from "@/components/shared/services/axios/instance";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @param login
 * @param password
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiLogin = async (login, password) => {
    return await sendApiPostRequest(
        {
            "method": "auth",
            "object": "login",
            "params": {
                "u_login": login,
                "u_password": password,
            }
        })
}

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @param page
 * @returns {Promise<AxiosResponse<any>|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetEventsData = async (page = 1) => {
    return await sendApiPostRequest({
            method: "get_annotations",
            object: "events",
            params: {
                page: page
            }
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @param id
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiRemoveEventItem = async (id) => {
    return await sendApiPostRequest({
            method: "rm",
            object: "events",
            params: {
                id: id
            }
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @param data
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiAddEventItem = async (data) => {
    return await sendApiPostRequest({
            method: "save",
            object: "events",
            params: {
                event: data
            }
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @param data
 * @param id
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiEditEventItem = async (data, id) => {
    return await sendApiPostRequest({
            method: "save",
            object: "events",
            params: {
                event: data
            }
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetSupplyNetworkData = async () => {
    return await sendApiPostRequest({
            method: "get_network_list",
            object: "supply",
            params: {}
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @param network_id
 * @param date
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetSupplyKanbanData = async (network_id = 1, date = {}) => {
    return await sendApiPostRequest({
            method: "kanban_get",
            object: "supply",
            params: {
                "network_id": network_id,
                "date": date
            }
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 * @param data
 * @param id
 */
export const apiUpdateSupplyKanbanData = async (data = {}, id) => {
    return await sendApiPostRequest({
            method: "kanban_update",
            object: "supply",
            params: {
                "data": {
                    [id]: data
                }
            }
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @param network_id
 * @param id
 * @returns {Promise<AxiosResponse<any>|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetKanbanColumnData = async (network_id = 1, id = {}) => {
    return await sendApiPostRequest({
            method: "kanban_get_column",
            object: "supply",
            params: {
                "network_id": network_id,
                "id": id
            }
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @param data
 * @returns {Promise<AxiosResponse<any>|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiCreateKanbanColumn = async (data) => {
    return await sendApiPostRequest({
            method: "kanban_item_save",
            object: "supply",
            params: {...data}
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @param article
 * @returns {Promise<AxiosResponse<any>|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetItemSizes = async (article) => {
    return await sendApiPostRequest({
            method: "get_item_sizes",
            object: "supply",
            params: {
                article: article
            }
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 04.02.2024
 * @param id
 * @param network_id
 * @param week_id
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetKanbanRemoveItem = async (id, network_id, week_id) => {
    return await sendApiPostRequest({
            method: "kanban_item_remove",
            object: "supply",
            params: {
                id: id,
                network_id: network_id,
                week_id: week_id
            }
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 04.02.2024
 * @param id
 * @param network_id
 * @param week_id
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetSupplyKanbanItem = async (id, network_id, week_id) => {
    return await sendApiPostRequest({
            method: "kanban_item_get",
            object: "supply",
            params: {
                id: id,
                network_id: network_id,
                week_id: week_id
            }
        },
        true
    )
}


/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetOfflineSchemaData = async () => {
    return await sendApiPostRequest({
            method: "schema_get",
            object: "offline",
            params: {}
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param schema_type
 * @param data
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetOfflineSchemaDetail = async (schema_type, data) => {
    return await sendApiPostRequest({
            method: `report_${schema_type}`,
            object: "offline",
            params: {...data}
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 30.01.2024
 * @param id
 * @returns {Promise<AxiosResponse<any>|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetOfflineCountryData = async (id) => {
    return await sendApiPostRequest({
            method: "get_stores",
            object: "offline",
            params: {id: id}
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @returns {Promise<AxiosResponse<any>|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 * @param data
 */
export const apiGetProductsListData = async (data) => {
    return await sendApiPostRequest({
            method: "get",
            object: "products",
            params: {
                ...data
            }
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param country
 * @param startDate
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetOfflinePlanData = async (country, startDate) => {
    return await sendApiPostRequest({
            method: "status",
            object: "offline_plan",
            params: {country: country, date: {start: startDate}}
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param store
 * @param date
 * @returns {Promise<AxiosResponse<any>|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetOfflinePlanDetailData = async (store, date) => {
    return await sendApiPostRequest({
            method: "detail",
            object: "offline_plan",
            params: {
                date: date,
                store: store
            }
        },
        true
    )
}

/**
 * @author Zholaman Zhumanov
 * @param data
 * @returns {Promise<*|{data: *, success: boolean, message_fail: string}|{data: *, success: boolean, message_fail: string, error: *}|undefined>}
 */
export const apiGetStockData = async (data) => {
    return await sendApiPostRequest({
            method: "get",
            object: "stock",
            params: data
        },
        true
    )
}





