import React from 'react';
import {ReloadIcon} from "@radix-ui/react-icons";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function LoaderButton(props) {
    const {loading} = props

    if (!loading) {
        return null
    }

    return <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
}

export default LoaderButton;
