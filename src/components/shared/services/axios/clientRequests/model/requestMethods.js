import {sendApiPostRequest} from "@/components/shared/services/axios/instance";

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
