'use client'

import {useEffect, useState} from 'react';
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 31.01.2024
 * @returns {Element}
 */
function useGetDomain() {
    const [domain, setDomain] = useState()

    useEffect(() => {
        try {
            // Это может быть внутри useEffect или любого другого обработчика life-cycle на клиенте
            if (typeof window !== 'undefined') {
                const {protocol, host} = window.location;
                const domain = `${protocol}//${host}`;
                // `domain` теперь содержит текущий домен, например: "http://localhost:3000" или "https://mywebsite.com"

                setDomain(domain)
            }
        } catch (error) {
            errorHandler("get_domain", "func/get_domain", error)
        }
    }, []);

    return domain
}

export default useGetDomain;
