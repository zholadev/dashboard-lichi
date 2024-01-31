import {useCallback} from 'react';
import {hl_get_random_colors} from "@/lib/random_colors";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";

function useGetRandomColor(props) {
    return useCallback((length, index) => {
        try {
            return hl_get_random_colors(length)?.[index]
        } catch (error) {
            errorHandler("useGetRandomColor", "func/useCallback", error)
        }
    }, [])
}

export default useGetRandomColor;
