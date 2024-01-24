import {api_client_get} from "@/components/shared/services/axios/instance";

export const apiLogin = async (login, password) => {
    return await api_client_get(
        {
            "method": "get",
            "object": "auth",
            "params": {
                "u_login": login,
                "u_password": password
            }
        })
}
