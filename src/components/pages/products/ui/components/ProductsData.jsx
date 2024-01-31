'use client'

import React, {useMemo} from 'react';
import {cn} from "@/lib/utils";
import Image from 'next/image'
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {useColorWithOpacity, useDispatchActionHandle} from "@/components/shared/hooks";
import {TableData} from "@/components/shared/uikit/table";
import {NotData} from "@/components/shared/uikit/templates";
import {Heading} from "@/components/shared/uikit/heading";
import {Button} from "@/components/shared/shadcn/ui/button";
import {CaretSortIcon} from "@radix-ui/react-icons";

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

    const colorWithOpacity = useColorWithOpacity()
    const events = useDispatchActionHandle()

    const getTableColumns = useMemo(() => {
        try {
            return Object.keys(productsData?.table?.head || {}).map((key) => {
                if (key === 'photo') {
                    return {
                        "accessorKey": key,
                        cell: ({row}) => (
                            <div className={cn("w-[200px] flex justify-center items-center")}>
                                <Image
                                    width={60}
                                    height={90}
                                    src={row.original[key]}
                                    alt={'...'}
                                />
                            </div>
                        ),
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
                        "header": productsData?.["table"]?.["head"]?.[key]?.["label"],
                    }
                } else if (productsReportParams === 'by_colors' && productsDetailByStore && key !== 'store' && key !== 'total') {
                    return {
                        "accessorKey": key,
                        "header": ({column}) => {
                            return (
                                <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                >
                                    {productsData?.["table"]?.["head"]?.[key]?.["label"]}
                                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            )
                        },
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

    if (productsData.length === 0) {
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
            />
        </div>
    );
}

export default ProductsData;
