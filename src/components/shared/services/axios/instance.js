import axios from "axios";
import {apiErrorHandler} from "./lib/apiErrorHandler";

/**
 * @author Zholaman Zhumanov
 * @description axios instance settings
 * @type {AxiosInstance}
 */
const AxiosInstance = axios.create({
    baseURL: 'https://dashboard.blackmonday.xyz/api/',
    withCredentials: true,
});

export const api_client_get = async (params = {}) => {
    try {
        let api_data = false;

        let response = await AxiosInstance.get('auth', {
            params: {
                ...params,
            }
        })

        if (response) {
            api_data = response
        } else {
            new Error('Error Getting Data.');
        }

        return api_data
    } catch (error) {
        return apiErrorHandler(error, method, params)
    }
}
