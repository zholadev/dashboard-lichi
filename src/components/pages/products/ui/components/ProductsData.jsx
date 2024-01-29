'use client'

import React, {useMemo} from 'react';
import {cn} from "@/lib/utils";
import Image from 'next/image'
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/shared/shadcn/ui/table";
import {flexRender, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {Button} from "@/components/shared/shadcn/ui/button";
import {ChevronLeftIcon, ChevronRightIcon} from "@radix-ui/react-icons";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shared/shadcn/ui/select";
import {useDispatchActionHandle} from "@/components/shared/hooks";
import {Heading} from "@/components/shared/uikit/heading";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function ProductsData() {
    const {productsData, apiLoader} = useAppSelector(state => state.products)

    const {report, category, page, detail_by_store, limit} = useAppSelector(state => state.products)

    const events = useDispatchActionHandle()

    const getTableColumns = useMemo(() => {
        try {
            return Object.keys(productsData?.table?.head || {}).map((key) => {
                console.log(key)
                if (key === 'photo') {
                    return {
                        "accessorKey": key,
                        Cell: (row) => {
                            return <Image
                                width={60}
                                height={90}
                                src={row?.["original"]?.["photo"]}
                                alt={'...'}
                            />
                        },
                        // "accessorKey": <Image
                        //     width={60}
                        //     height={90}
                        //     src={cell?.["row"]?.["original"]?.["photo"]}
                        //     alt={'...'}
                        // />,
                        "header": productsData?.["table"]?.["head"]?.[key]?.["label"],
                    }
                } else {
                    return {
                        "accessorKey": key,
                        "header": productsData?.["table"]?.["head"]?.[key]?.["label"],
                    }

                }
            })
        } catch (error) {
            errorHandler("productsData", "", error)
        }
    }, [productsData, apiLoader])

    const table = useReactTable({
        "data": productsData?.["table"]?.["data"],
        "columns": getTableColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: productsData?.["paging"]?.["max_page"] ?? 1,
        state: {
            pagination: {
                pageIndex: page ?? 0,
                pageSize: limit,
            },
        },
        // onPaginationChange: events.productsPageParams,
        manualPagination: true,
    })

    if (apiLoader) {
        return <div className={cn("w-full flex justify-center items-center my-4")}>
            <div className={cn("w-full flex flex-row flex-wrap md:gap-3 gap-1 items-center")}>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
            </div>
        </div>
    }

    if (productsData.length === 0) {
        return null
    }

    return (
        <>
            <div className="rounded-md border">
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
                                                    <h5 dangerouslySetInnerHTML={{
                                                        __html: flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                    }}></h5>
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
                                                    {/*{*/}
                                                    {/*    cell?.["row"]?.["original"]?.["photo"] ? (*/}
                                                    {/*        <Image*/}
                                                    {/*            width={60}*/}
                                                    {/*            height={90}*/}
                                                    {/*            src={cell?.["row"]?.["original"]?.["photo"]}*/}
                                                    {/*            alt={'...'}*/}
                                                    {/*        />*/}
                                                    {/*    ) : (*/}
                                                    {/*        flexRender(cell.column.columnDef.cell, cell.getContext())*/}
                                                    {/*    )*/}
                                                    {/*}*/}
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
                                <TableCell colSpan={getTableColumns?.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center lg:flex-row flex-col justify-between px-2 py-4 border-t">
                    <div className="flex-1 text-sm text-muted-foreground">
                        Выбрано {table.getFilteredSelectedRowModel().rows.length} из{" "}
                        {table.getFilteredRowModel().rows.length} строк.
                    </div>
                    <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium">Строков на странице</p>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value))
                                    events.productsLimitParams(value)
                                }}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue placeholder={table.getState().pagination.pageSize}/>
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                            Стрц {table.getState().pagination.pageIndex + 1} из{" "}
                            {table.getPageCount()}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                    table.previousPage()
                                    events.productsPageParams(page - 1)
                                }}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">Go to previous page</span>
                                <ChevronLeftIcon className="h-4 w-4"/>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => {
                                    table.nextPage()
                                    events.productsPageParams(page + 1)
                                }}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <ChevronRightIcon className="h-4 w-4"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className={cn("w-100 border rounded mt-3")}>*/}
            {/*    <Table className={cn("mb-3")}>*/}
            {/*        <TableHeader>*/}
            {/*            <TableRow>*/}
            {/*                {Object.keys(productsData?.table?.head || {}).map((key) => (*/}
            {/*                    <TableHead key={key}>*/}
            {/*                        <h4 dangerouslySetInnerHTML={{__html: productsData?.table?.head[key].label}}></h4>*/}
            {/*                    </TableHead>*/}
            {/*                ))}*/}
            {/*            </TableRow>*/}
            {/*        </TableHeader>*/}
            {/*        <TableBody>*/}
            {/*            {Object.values(productsData?.table?.data || {}).map((rowData) => {*/}
            {/*                return (*/}
            {/*                    <TableRow key={rowData._id}>*/}
            {/*                        {Object.keys(productsData?.table?.head || {}).map((key) => {*/}
            {/*                            return (*/}
            {/*                                <TableCell key={key}>*/}
            {/*                                    {*/}
            {/*                                        key === 'photo' ? (*/}
            {/*                                            <Image*/}
            {/*                                                width={60}*/}
            {/*                                                height={90}*/}
            {/*                                                src={rowData[key]}*/}
            {/*                                                alt={'...'}*/}
            {/*                                            />*/}
            {/*                                        ) : (*/}
            {/*                                            <Heading type={"h4"}>{rowData[key]}</Heading>*/}
            {/*                                        )*/}
            {/*                                    }*/}
            {/*                                </TableCell>*/}
            {/*                            )*/}
            {/*                        })}*/}
            {/*                    </TableRow>*/}
            {/*                )*/}
            {/*            })}*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</div>*/}
        </>

    );
}

export default ProductsData;
