'use client'

import React from 'react';
import {Button} from "@/components/shared/shadcn/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shared/shadcn/ui/select";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {cn} from "@/lib/utils";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function TableDataPagination({table, changePageHandle, pageValue, changeLimitHandle, hideLimitContent}) {
    const prevPage = () => {
        try {
            table.previousPage()
            if (changePageHandle) {
                changePageHandle(pageValue - 1)
            }
        } catch (error) {
            errorHandler("tablePageDataPagination", "prevPage", error)
        }
    }

    const nextPage = () => {
        try {
            table.nextPage()
            if (changePageHandle) {
                changePageHandle(pageValue + 1)
            }
        } catch (error) {
            errorHandler("tablePageDataPagination", "nextPage", error)
        }
    }

    const selectFirstPage = () => {
        try {
            table.setPageIndex(0)
            if (changePageHandle) {
                changePageHandle(1)
            }
        } catch (error) {
            errorHandler("tablePageDataPagination", "selectFirstPage", error)
        }
    }

    const selectLastPage = () => {
        try {
            table.setPageIndex(table.getPageCount() - 1)
            if (changePageHandle) {
                changePageHandle(table.getPageCount())
            }
        } catch (error) {
            errorHandler("tablePageDataPagination", "selectLastPage", error)
        }
    }

    const selectLimitPage = (value) => {
        try {
            table.setPageSize(Number(value))
            if (changeLimitHandle) {
                changeLimitHandle(value)
            }
        } catch (error) {
            errorHandler("tablePageDataPagination", "selectLastPage", error)
        }
    }

    return (
        <div className="flex md:items-center lg:flex-row flex-col justify-end px-2 py-4 border-t">
            {/*<div className="flex-1 text-sm text-muted-foreground">*/}
            {/*    {table?.getFilteredRowModel().rows.length}*/}
            {/*</div>*/}
            <div className="flex md:items-center md:flex-row flex-col gap-4">
                {
                    !hideLimitContent &&
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                selectLimitPage(Number(value))
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
                }

                <div className={cn("flex items-center flex-row gap-3")}>
                    <div className="flex w-[100px] items-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={selectFirstPage}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <DoubleArrowLeftIcon className="h-4 w-4"/>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={prevPage}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon className="h-4 w-4"/>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={nextPage}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon className="h-4 w-4"/>
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={selectLastPage}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <DoubleArrowRightIcon className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableDataPagination;
