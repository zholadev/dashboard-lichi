'use client'

import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import TableViewOptions from "@/components/shared/uikit/table/ui/TableViewOptions";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/shared/shadcn/ui/table";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {Heading} from "@/components/shared/uikit/heading";
import TableDataPagination from "@/components/shared/uikit/table/ui/TableDataPagination";

/**
 * @author Zholaman Zhumanov
 * @created 29.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function TableDataTest({pageValue, changePageHandle, columns, pageCount, pageIndex, pageSize, data}) {

    const [sorting, setSorting] = useState([])
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})

    const table = useReactTable({
        "data": data,
        "columns": columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: pageCount ?? 1,
        state: {
            pagination: {
                pageIndex: pageIndex - 1 ?? 0,
                pageSize: pageSize,
            },
            sorting: sorting,
        },
        // onPaginationChange: events.stockParamsPageAction,
        manualPagination: true,
        onSortingChange: (newSorting) => {
            setSorting(newSorting)
        },
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="space-y-4">
            <div className={cn("py-4 px-3")}>
                <TableViewOptions table={table}/>
            </div>
            <Table>
                <TableHeader className={cn("bg-secondary")}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className={cn("first:position-sticky first:left-1")}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className={cn("text-center")}>
                                        {header.isPlaceholder
                                            ? null
                                            : (
                                                flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            return (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id} className={cn("text-center")}>
                                                <Heading
                                                    type={'h5'}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Heading>
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns?.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TableDataPagination
                table={table}
                pageValue={pageValue}
                changePageHandle={changePageHandle}
            />
        </div>
    );
}

export default TableDataTest;
