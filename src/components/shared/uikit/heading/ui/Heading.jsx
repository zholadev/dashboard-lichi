'use client'

import React from 'react';
import {cn} from "@/lib/utils";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @param props
 * @returns {JSX.Element|null}
 * @constructor
 */
function Heading(props) {
    const {type = "h2", children, cls} = props

    const HeadingTypes = {
        "h1": <h1 className={cn("md:text-3xl text-2xl text-primary mb-6", cls)}>{children}</h1>,
        "h2": <h2 className={cn("md:text-2xl text-xl text-primary mb-5", cls)}>{children}</h2>,
        "h3": <h3 className={cn("text-xl text-primary mb-5", cls)}>{children}</h3>,
        "h4": <h4 className={cn("text-sm text-primary mb-4", cls)}>{children}</h4>,
        "h5": <h5 className={cn("text-xs text-primary mb-4", cls)}>{children}</h5>,
    }[type]

    if (!type) {
        return null
    }

    return HeadingTypes
}

export default Heading;
