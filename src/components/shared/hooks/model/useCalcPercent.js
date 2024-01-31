import React, {useCallback} from 'react';
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";

function useCalcPercent(props) {
    return useCallback((value, max) => {
        try {
            return Math.floor((Math.floor(value) / Math.floor(max)) * 100);
        } catch (error) {
            errorHandler("useCalcPercent", "func/useCalcPercent", error)
        }
    }, [])
}

export default useCalcPercent;
