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
