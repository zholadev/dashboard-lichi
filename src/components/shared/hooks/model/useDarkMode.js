'use client'

import {useEffect, useState} from 'react';
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 04.02.2024
 * @returns {boolean}
 * @constructor
 */
function useDarkMode() {
    const [isDark, setIsDark] = useState(false)

    const getKeyLocalStorage = typeof window !== 'undefined' ? localStorage.getItem("theme") : false

    const checkDarkMode = () => {
        try {
            if (getKeyLocalStorage === 'dark') {
                setIsDark(true)
            } else {
                setIsDark(false)
            }
        } catch (error) {
            errorHandler("useDarkMode", "checkDarkMode", error)
        }
    }

    useEffect(() => {
        checkDarkMode()
    }, [getKeyLocalStorage]);

    console.log("dark mode is: ", isDark)

    return isDark;
}

export default useDarkMode;
