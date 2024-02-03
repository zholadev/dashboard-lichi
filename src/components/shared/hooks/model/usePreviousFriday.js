'use client'

import {useCallback} from "react";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @returns {undefined}
 */
function usePreviousFriday() {
    return useCallback(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();

        let lastFriday;

        // Если сегодня пятница
        // if (dayOfWeek === 5) {
            // Устанавливаем дату на прошлую пятницу (7 дней назад)
            lastFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
        // } else {
        //     // Если сегодня не пятница
        //     const diff = dayOfWeek >= 5 ? dayOfWeek - 5 : 5 + (7 - dayOfWeek);
        //     lastFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - diff);
        // }

        return lastFriday;
    }, []);
}

export default usePreviousFriday;
