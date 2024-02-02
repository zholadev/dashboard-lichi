import React, {useMemo, useState} from 'react';
import {useDispatchActionHandle} from "@/components/shared/hooks";
import Image from "next/image";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";
import {Heading} from "@/components/shared/uikit/heading";
import {Button} from "@/components/shared/shadcn/ui/button";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {TableData} from "@/components/shared/uikit/table";
import {NotData} from "@/components/shared/uikit/templates";

/**
 * @author Zholaman Zhumanov
 * @created 29.01.2024
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function StockPageData(props) {
    const {
        stockData,
        stockApiLoader,
        stockPageParams,
        stockLimitParams
    } = useAppSelector(state => state.stock)

    const events = useDispatchActionHandle()

    const sortHandler = (type, value) => {
        try {
            const sortItem = stockData?.table?.head?.[type]
            events.stockParamsSortAction(type)
            events.stockParamsSortDirectionAction(sortItem?.sort !== 1 ? 1 : -1)
        } catch (error) {
            errorHandler("stockPageData", "sortHandler")
        }
    }

    const getTableColumns = useMemo(() => {
        try {
            return Object.keys(stockData?.table?.head || {}).map((key) => {
                if (key === 'photo') {
                    return {
                        accessorKey: key,
                        cell: ({row}) => (
                            <div className={cn("flex justify-center items-center")}>
                                <Image
                                    width={60}
                                    height={90}
                                    src={row.original[key]}
                                    alt={'...'}
                                />
                            </div>
                        ),
                        enableSorting: false,
                        "header": ({column}) => {
                            return (
                                <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                >
                                    {stockData?.table?.head?.[key]?.label}
                                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            )
                        },
                    };
                } else if (key === "created_utc") {
                    return {
                        "accessorKey": key,
                        "header": ({column}) => {
                            return (
                                <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                >
                                    {stockData?.table?.head?.[key]?.label}
                                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            )
                        },
                        cell: ({row}) => (
                            <Heading type={'h5'}>{row.original?.["date"]}</Heading>
                        ),
                        "sort": stockData?.table?.head?.[key]?.sort
                    }
                } else if (key === "amount") {
                    return {
                        "accessorKey": key,
                        "header": ({column}) => {
                            return (
                                <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                >
                                    {stockData?.table?.head?.[key]?.label}
                                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            )
                        },
                        cell: ({row}) => (
                            <div className={cn("flex flex-col items-center justify-center")}>
                                <Heading type={'h5'}>{row.original?.["amount"]}</Heading>
                                <Heading cls={cn("text-cyan-400")}
                                         type={'h5'}>{row.original?.["amount_visible"]}</Heading>
                            </div>
                        ),
                        "sort": stockData?.table?.head?.[key]?.sort
                    }
                } else {
                    return {
                        accessorKey: key,
                        "header": ({column}) => {
                            return (
                                <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                >
                                    {stockData?.table?.head?.[key]?.label}
                                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            )
                        },
                    }
                }
            })
        } catch (error) {
            errorHandler("stockData", "", error)
        }
    }, [stockData, stockApiLoader])

    if (stockApiLoader) {
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

    if (Object.values(stockData?.["table"]?.["data"] || {}).length === 0) {
        return <NotData/>
    }

    return (
        <div className="rounded-md border">
            <TableData
                data={stockData?.["table"]?.["data"]}
                columns={getTableColumns}
                pageCount={stockData?.["paging"]?.["max_page"]}
                pageIndex={stockPageParams}
                pageSize={stockLimitParams}
                pageValue={stockPageParams}
                changePageHandle={events.stockParamsPageAction}
                sortToolbar
                sortData={stockData?.table?.head}
                sortSelectHandler={sortHandler}
            />
        </div>
    );
}

export default StockPageData;
