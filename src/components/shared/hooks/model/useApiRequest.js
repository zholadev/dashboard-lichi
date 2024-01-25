'use client'
import {useState} from 'react';
import useToastMessage from "./useToastMessage";

/**
 * @author Zholaman Zhumanov
 * @name useApiRequest
 * @created 25.01.2024
 * @returns {{apiFetchHandler: ((function(*, []=, *, *): Promise<void>)|*), loading: boolean}}
 */
function useApiRequest() {
    const [loading, setLoading] = useState(false)
    const toastMessage = useToastMessage()

    const handleErrorMessage = (messages, exceptions, options) => {
        if (!options?.onDisabledMessage) {
            if (messages) {
                messages.map((item) => toastMessage(item?.["text"], item?.["type"]));
            }
            if (exceptions) {
                exceptions.map((item) => toastMessage(item?.["message"]));
            }
        }
    }

    const handleSuccessfulCase = (options, success) => {
        if (success) {
            if (options.onSuccessCallbackFunc) {
                options.onSuccessCallbackFunc()
            }
        }
    }

    const apiFetchHandler = async (apiFetchFunc, params = [], loader, options) => {
        try {
            setLoading(true)
            loader && loader(true)

            await apiFetchFunc(...params).then(res => {
                const totalData = res
                const resData = res?.["data"]

                const data = resData?.["data"]
                const messages = resData?.["messages"]
                const exceptions = resData?.["api_exception"]
                const success = resData?.["ok"]
                const errorFields = resData?.["error_fields"]

                handleErrorMessage(messages, exceptions, options)

                options?.onGetData?.({data, errorFields, success, messages, totalData});

                handleSuccessfulCase(options, success);

            }).catch(error => {
                console.log(`page: useApiRequest, event: ${options.name ?? "apiFetchFunc"}, error: ${error}`)
            })
            setLoading(false)
            if (!options.disableLoading) {
                loader && loader(false)
            }
        } catch (error) {
            console.log(`page: useApiRequest, event: useApiRequest, error: ${error}`)
        }
    }
    return {apiFetchHandler, loading}
}

export default useApiRequest;
