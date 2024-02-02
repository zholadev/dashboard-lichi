'use client'

import React from 'react';
import TableViewOptions from "./TableViewOptions";
import TableSortToolbar from "@/components/shared/uikit/table/ui/TableSortToolbar";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function TableToolbar(props) {
    const {table, sortToolbar, sortSelectHandler, sortData} = props

    return (
        <div className="flex items-center w-full justify-end gap-3">
            <TableViewOptions table={table}/>
            <TableSortToolbar
                table={table}
                sortData={sortData}
                sortToolbar={sortToolbar}
                sortSelectHandler={sortSelectHandler}
            />
        </div>
    );
}

export default TableToolbar;
