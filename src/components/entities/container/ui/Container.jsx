'use client'

import React from 'react';
import {cn} from "@/lib/utils";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Container(props) {
    const {children, cls} = props

    return (
        <div className={cn("py-4 md:px-7 px-2 mt-10 w-full", cls)}>
            {children}
        </div>
    );
}

export default Container;
