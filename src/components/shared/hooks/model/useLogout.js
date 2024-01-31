'use client'

import Cookie from "js-cookie";
import {useRouter} from "next/navigation";
import {routerPagesList} from "@/components/entities/router";

/**
 * @author Zholaman Zhumanov
 * @created 31.01.2024
 * @returns {function(): void}
 */
function useLogout() {
    const router = useRouter()

    return () => {
        Cookie.remove("dashboard-token")
        router.push(routerPagesList.login)
    }
}

export default useLogout;
