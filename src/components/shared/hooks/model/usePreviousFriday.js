import {useEffect, useState} from 'react';

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @returns {undefined}
 */
function usePreviousFriday() {
    const [previousFriday, setPreviousFriday] = useState();

    useEffect(() => {
        const today = new Date();
        const dayOfWeek = today.getDay();

        let lastFriday;

        // Если сегодня пятница
        if (dayOfWeek === 5) {
            lastFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        } else {
            // Если сегодня не пятница
            const diff = dayOfWeek >= 5 ? dayOfWeek - 5 : 5 + (7 - dayOfWeek);
            lastFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - diff);
        }

        setPreviousFriday(lastFriday);
    }, []);

    return previousFriday;
}

export default usePreviousFriday;
