'use client'

import {useEffect, useState} from 'react';

/**
 * @author Zholaman Zhumanov
 * @name useScrollAction
 * @description get scroll position
 * @param props
 * @returns {boolean}
 */
function useScrollAction({position}) {
    const [isScrolledDown, setScroll] = useState(false);

    useEffect(() => {
        const checkScrollPosition = () => {
            try {
                setScroll(window.scrollY > position);
            } catch (error) {
                console.error(`page: useScrollAction, event: useScrollAction, error: ${error}`);
            }
        }

        checkScrollPosition();
        window.addEventListener('scroll', checkScrollPosition, true);

        return () => {
            window.removeEventListener('scroll', checkScrollPosition, true);
            setScroll(false);
        };
    }, [position]);

    return isScrolledDown;
}

export default useScrollAction;
