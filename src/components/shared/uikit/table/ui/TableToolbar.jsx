'use client'

import React from 'react';
import TableViewOptions from "./TableViewOptions";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function TableToolbar(props) {
    const {table, column} = props

    return (
        <div className="flex items-center justify-between">
            <TableViewOptions table={table}/>
        </div>
    );
}

export default TableToolbar;
