'use client'

import {Slide, toast} from "react-toastify";

/**
 * @author Zholaman Zhumanov
 * @name useToastMessage
 * @description toast message global options
 * @returns {(function(*): void)|*}
 */
function useToastMessage() {
    return (message, type) => {
        if (type) {
            toast[type](message, {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                transition: Slide,
            })
        } else {
            toast(message, {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                transition: Slide,
            })
        }

    }
}

export default useToastMessage;
