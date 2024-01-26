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






