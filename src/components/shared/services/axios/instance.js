import axios from "axios";
import Cookie from 'js-cookie'
import {apiErrorHandler} from "./lib/apiErrorHandler";

/**
 * @author Zholaman Zhumanov
 * @description axios instance settings
 * @type {AxiosInstance}
 */
const AxiosInstance = axios.create({
    baseURL: 'https://dashboard.blackmonday.xyz/api/',
    withCredentials: true
});

const getAuthHeaders = (isToken) => {
    let headers = {}
    if (isToken) {
        headers["Authorization"] = `Bearer ${Cookie.get("token")}`
    }
    return headers
}

export const sendApiPostRequest = async (params = {}, isToken) => {
    try {
        const headers = getAuthHeaders(isToken)
        const response = await AxiosInstance.post('', params, {headers})
        return response
    } catch (error) {
        return apiErrorHandler(error, params)
    }
}
