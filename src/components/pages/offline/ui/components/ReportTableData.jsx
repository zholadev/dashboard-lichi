import React, {useMemo} from 'react';
import {cn} from "@/lib/utils";
import Image from "next/image";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {Badge} from "@/components/shared/shadcn/ui/badge";
import {Heading} from "@/components/shared/uikit/heading";
import {TableData} from "@/components/shared/uikit/table";
import {Button} from "@/components/shared/shadcn/ui/button";
import {ContainerBox} from "@/components/entities/container";
import {useCalcPercent, useGetRandomColor} from "@/components/shared/hooks";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 02.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function ReportTableData(props) {
    const {tableData, title, tableHead, tableBody, componentType} = props

    const calcPercent = useCalcPercent()
    const getRandomColor = useGetRandomColor()

    const storesColumns = useMemo(() => {
        try {
            return Object.keys(tableHead || {}).map((key) => {
                if (key === 'photo') {
                    return {
                        "accessorKey": key,
                        cell: ({row}) => (
                            <div className={cn("min-w-[200px] flex justify-center items-center")}>
                                <Image
                                    width={60}
                                    height={90}
                                    src={row.original[key]}
                                    alt={'...'}
                                />
                            </div>
                        ),
                        "header": tableHead?.[key]?.["label"],
                    }
                } else if (key === 'total') {
                    return {
                        "accessorKey": key,
                        "header": ({column}) => {
                            return (
                                <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                >
                                    {tableHead?.[key]?.["label"]}
                                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            )
                        },
                        cell: ({row}) => (
                            <div
                                className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                <div className={cn("absolute top-0 left-0 h-full")}
                                     style={{
                                         backgroundColor: `${getRandomColor(tableData?.length, row?.["id"])}`,
                                         width: `${calcPercent(row?.["original"]?.["total"], tableBody?.[0]?.["sale"])}%`
                                     }}/>
                                <Heading type={"h4"}
                                         cls={cn("mb-0 text-bold relative font-medium")}>{row?.["original"]?.["total"]}</Heading>
                                <Badge
                                    className={cn("relative")}>{calcPercent(row?.["original"]?.["total"], tableBody?.[0]?.["sale"])} %</Badge>
                            </div>
                        )
                    }
                } else if (key === 'sale') {
                    return {
                        "accessorKey": key,
                        "header": ({column}) => {
                            return (
                                <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                >
                                    {tableHead?.[key]?.["label"]}
                                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            )
                        },
                        cell: ({row}) => (
                            <div
                                className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                <div className={cn("absolute top-0 left-0 h-full")}
                                     style={{
                                         backgroundColor: `${getRandomColor(tableData?.length, row?.["id"])}`,
                                         width: `${calcPercent(row?.["original"]?.["sale"], tableBody?.[0]?.["sale"])}%`
                                     }}/>
                                <Heading type={"h4"}
                                         cls={cn("mb-0 text-bold relative font-medium")}>{row?.["original"]?.["sale"]}</Heading>
                                <Badge
                                    className={cn("relative")}>{Number(row?.["original"]?.["sale"]) - Number(row?.["original"]?.["sale_by_price"])}</Badge>
                            </div>
                        )
                    }
                } else if (key === 'refund') {
                    return {
                        "accessorKey": key,
                        "header": ({column}) => {
                            return (
                                <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                >
                                    {tableHead?.[key]?.["label"]}
                                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            )
                        },
                        cell: ({row}) => (
                            <div
                                className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                <div className={cn("absolute top-0 left-0 h-full")}
                                     style={{
                                         backgroundColor: `${getRandomColor(tableData?.length, row?.["id"])}`,
                                         width: `${calcPercent(row?.["original"]?.["refund"], tableBody?.[0]?.["sale"])}%`
                                     }}/>
                                <Heading type={"h4"}
                                         cls={cn("mb-0 text-bold relative font-medium")}>{row?.["original"]?.["refund"]}</Heading>
                                <Badge
                                    className={cn("relative")}>{Number(row?.["original"]?.["refund"]) - Number(row?.["original"]?.["refund_by_price"])}</Badge>
                            </div>
                        )
                    }
                } else {
                    return {
                        "accessorKey": key,
                        "header": ({column}) => {
                            return (
                                <Button
                                    variant="ghost"
                                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                >
                                    {tableHead?.[key]?.["label"]}
                                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                                </Button>
                            )
                        },

                    }
                }
            })
        } catch (error) {
            errorHandler("reportTableData", "memo/storesColumns", error)
        }
    }, [tableData, tableHead, tableBody, componentType])

    const storesByDayColumns = useMemo(() => {
        try {
            return Object.keys(tableHead || {}).map((key) => {
                if (key === 'photo') {
                    return {
                        "accessorKey": key,
                        cell: ({row}) => (
                            <div>
                                <Image
                                    width={60}
                                    height={90}
                                    src={row.original[key]}
                                    alt={'...'}
                                />
                            </div>
                        ),
                        "header": tableHead?.[key]?.["label"],
                    }
                } else {
                    if (key === 'total') {
                        return {
                            "accessorKey": key,
                            "header": ({column}) => {
                                return (
                                    <Button
                                        variant="ghost"
                                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                    >
                                        {tableHead?.[key]?.["label"]}
                                        <CaretSortIcon className="ml-2 h-4 w-4"/>
                                    </Button>
                                )
                            },
                            cell: ({row}) => (
                                <div
                                    className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                    <div className={cn("absolute top-0 left-0 h-full")}
                                         style={{
                                             backgroundColor: `${getRandomColor(tableData?.length, row?.["id"])}`,
                                             width: `${calcPercent(row?.["original"]?.["total"], tableBody?.[0]?.["sale"])}%`
                                         }}/>
                                    <Heading type={"h4"}
                                             cls={cn("mb-0 text-bold relative font-medium")}>{row?.["original"]?.["total"]}</Heading>
                                    <Badge
                                        className={cn("relative")}>{calcPercent(row?.["original"]?.["total"], tableBody?.[0]?.["sale"])} %</Badge>
                                </div>
                            )
                        }
                    } else if (key === 'sale') {
                        return {
                            "accessorKey": key,
                            "header": ({column}) => {
                                return (
                                    <Button
                                        variant="ghost"
                                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                    >
                                        {tableHead?.[key]?.["label"]}
                                        <CaretSortIcon className="ml-2 h-4 w-4"/>
                                    </Button>
                                )
                            },
                            cell: ({row}) => (
                                <div
                                    className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                    <div className={cn("absolute top-0 left-0 h-full")}
                                         style={{
                                             backgroundColor: `${getRandomColor(tableData?.length, row?.["id"])}`,
                                             width: `${calcPercent(row?.["original"]?.["sale"], tableBody?.[0]?.["sale"])}%`
                                         }}/>
                                    <Heading type={"h4"}
                                             cls={cn("mb-0 text-bold relative font-medium")}>{row?.["original"]?.["sale"]}</Heading>
                                    <Badge
                                        className={cn("relative")}>{Number(row?.["original"]?.["sale"]) - Number(row?.["original"]?.["sale_by_price"])}</Badge>
                                </div>
                            )
                        }
                    } else if (key === 'refund') {
                        return {
                            "accessorKey": key,
                            "header": ({column}) => {
                                return (
                                    <Button
                                        variant="ghost"
                                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                    >
                                        {tableHead?.[key]?.["label"]}
                                        <CaretSortIcon className="ml-2 h-4 w-4"/>
                                    </Button>
                                )
                            },
                            cell: ({row}) => (
                                <div
                                    className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                    <div className={cn("absolute top-0 left-0 h-full")}
                                         style={{
                                             backgroundColor: `${getRandomColor(tableData?.length, row?.["id"])}`,
                                             width: `${calcPercent(row?.["original"]?.["refund"], tableBody?.[0]?.["sale"])}%`
                                         }}/>
                                    <Heading type={"h4"}
                                             cls={cn("mb-0 text-bold relative font-medium")}>{row?.["original"]?.["refund"]}</Heading>
                                    <Badge
                                        className={cn("relative")}>{Number(row?.["original"]?.["refund"]) - Number(row?.["original"]?.["refund_by_price"])}</Badge>
                                </div>
                            )
                        }
                    } else {
                        return {
                            "accessorKey": key,
                            "header": ({column}) => {
                                return (
                                    <Button
                                        variant="ghost"
                                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                    >
                                        {tableHead?.[key]?.["label"]}
                                        <CaretSortIcon className="ml-2 h-4 w-4"/>
                                    </Button>
                                )
                            },

                        }
                    }
                }
            })
        } catch (error) {
            errorHandler("reportTableData", "memo/storesByDayColumns", error)
        }
    }, [tableData, tableHead, tableBody, componentType])

    return (
        <ContainerBox>
            <Heading type={"h3"} cls={"mb-2 mt-4"}>{title}</Heading>
            <TableData
                data={tableBody}
                columns={componentType === 'stores' ? storesColumns : storesByDayColumns}
                hidePagination={tableData?.["key"] === 'stores'}
                hideLimitContent={tableData?.["key"] === 'stores'}
                pageCount={tableBody.length / 10}
                staticPagination={tableData?.["key"] === 'stores_by_day'}
                staticLimit={tableData?.["key"] === 'stores_by_day'}
                staticData={tableData?.["key"] === 'stores_by_day'}
            />
        </ContainerBox>
    );
}

export default ReportTableData;
