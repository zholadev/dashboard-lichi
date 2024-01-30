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

/**
 * @author Zholaman Zhumanov
 * @created 29.01.2024
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

    const [sorting, setSorting] = useState()

    const events = useDispatchActionHandle()

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
                        )
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
                        )
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

    if (stockData.length === 0) {
        return null
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
            />
        </div>
    );
}

export default StockPageData;
