'use client'

import React, {useMemo} from 'react';
import {cn} from "@/lib/utils";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {Heading} from "@/components/shared/uikit/heading";
import {TableData} from "@/components/shared/uikit/table";
import {NotData} from "@/components/shared/uikit/templates";
import {Button} from "@/components/shared/shadcn/ui/button";
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {useColorWithOpacity, useDispatchActionHandle} from "@/components/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @todo refactoring
 * @returns {Element}
 * @constructor
 */
function ProductsData() {
    const {
        productsData,
        productsApiLoader,
        productsPageParams,
        productsLimitParams,
        productsReportParams,
        productsDetailByStore
    } = useAppSelector(state => state.products)

    const events = useDispatchActionHandle()
    const colorWithOpacity = useColorWithOpacity()

    const sortHandler = (type) => {
        try {
            const sortItem = productsData?.table?.head?.[type]
            events.productParamsSortNameAction(type)
            events.productParamsSortDirectionAction(sortItem?.sort !== 1 ? 1 : -1)
        } catch (error) {
            errorHandler("stockPageData", "sortHandler")
        }
    }

    const getTableColumns = useMemo(() => {
        try {
            return Object.keys(productsData?.table?.head || {}).map((key) => {
                if (key === 'photo') {
                    return {
                        "accessorKey": key,
                        cell: ({row}) => (
                            <div className={cn("min-w-[200px] flex justify-center items-center")}>
                                <img
                                    width={90}
                                    height={120}
                                    src={row.original[key]}
                                    alt={'...'}
                                />
                            </div>
                        ),
                        enableSorting: false,
                        "header": productsData?.["table"]?.["head"]?.[key]?.["label"],
                    }
                } else if (key === 'name') {
                    return {
                        "accessorKey": key,
                        cell: ({row}) => (
                            <div>
                                <Heading type={'h4'} cls={cn("mb-1")}>{row?.["original"]?.["category"]}</Heading>
                                <Heading type={'h4'}>{row?.["original"]?.["article"]}</Heading>
                            </div>
                        ),
                        enableSorting: !!(productsData?.["table"]?.["head"]?.[key]?.["sort"]),
                        "header": ({column}) => {
                            return (
                                <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                >

                                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            )
                        },
                    }
                } else if (productsReportParams === 'by_colors' || productsReportParams === 'by_sizes' && productsDetailByStore && key !== 'store' || key !== 'total') {
                    return {
                        "accessorKey": key,
                        "header": <h4
                            dangerouslySetInnerHTML={{__html: productsData?.["table"]?.["head"]?.[key]?.["label"]}}></h4>,
                        cell: ({row}) => {
                            return (
                                <div className={cn("w-full h-full relative")}>
                                    <div className={cn("w-full h-full absolute top-0 left-0")}
                                         style={{
                                             backgroundColor: colorWithOpacity(row?.original, productsData?.["table"]?.["head"]?.[key]?.["label"])
                                         }}
                                    />
                                    {row?.original?.[key] ?? 0}
                                </div>
                            )
                        },
                        enableSorting: !!(productsData?.["table"]?.["head"]?.[key]?.["sort"]),
                    }
                } else {
                    return {
                        "accessorKey": key,
                        enableSorting: !!(productsData?.["table"]?.["head"]?.[key]?.["sort"]),
                        "header": ({column}) => {
                            return (
                                <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                >
                                    <h4 dangerouslySetInnerHTML={{__html: productsData?.["table"]?.["head"]?.[key]?.["label"]}}></h4>
                                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            )
                        },
                    }
                }
            })
        } catch (error) {
            errorHandler("productsData", "", error)
        }
    }, [productsData, productsApiLoader, productsPageParams, productsReportParams, productsDetailByStore])

    if (productsApiLoader) {
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

    if (productsData.length === 0 || productsData?.["table"]?.["data"]?.length === 0) {
        return <NotData/>
    }

    return (
        <div className="rounded-md border">
            <TableData
                data={productsData?.["table"]?.["data"]}
                columns={getTableColumns}
                pageCount={productsData?.["paging"]?.["max_page"]}
                pageIndex={productsPageParams}
                pageSize={productsLimitParams}
                pageValue={productsPageParams}
                changeLimitHandle={events.productsLimitParamsAction}
                changePageHandle={events.productsPageParamsAction}
                sortToolbar
                sortData={productsData?.["table"]?.["head"]}
                sortSelectHandler={sortHandler}
            />
        </div>
    );
}

export default ProductsData;
