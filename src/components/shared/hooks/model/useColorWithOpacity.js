import {useCallback} from 'react';
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {number} from "zod";

/**
 * @author Zholaman Zhumanov
 * @created 31.01.2024
 * @returns {Function}
 */
function useColorWithOpacity() {
    return useCallback((colors, index, rgb = '0, 143, 251') => {
        try {
            const filterColorsValue = Object.values(colors).filter((item) => typeof item === "number")

            const maxVal = Math.max(...Object.values(filterColorsValue));
            const normalizedVal = colors[index] / maxVal;
            return `rgba(${rgb}, ${normalizedVal})`
        } catch (error) {
            errorHandler("useColorWithOpacity", "func/useColorWithOpacity", error)
        }
    }, [])
}

export default useColorWithOpacity;
