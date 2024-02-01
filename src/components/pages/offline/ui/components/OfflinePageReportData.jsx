import React, {useCallback, useState} from 'react';
import {cn} from "@/lib/utils";
import dynamic from "next/dynamic";
import {TableData} from "@/components/shared/uikit/table";
import {useCalcPercent, useChartApexOptions, useGetRandomColor} from "@/components/shared/hooks";
import {NotData} from "@/components/shared/uikit/templates";
import {offlineChartList} from "@/components/shared/data/charts";
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import Image from "next/image";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {Button} from "@/components/shared/shadcn/ui/button";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {Heading} from "@/components/shared/uikit/heading";
import {Badge} from "@/components/shared/shadcn/ui/badge";
import {imgUrl} from "@/components/shared/contants/links";

const ChartReact = dynamic(() => import("@/components/shared/uikit/chart/ui/ChartReact"), {ssr: false})


/**
 * @author Zholaman Zhumanov
 * @created 31.01.2024
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageReportData(props) {
    const {
        offEditBoard,
        offSchemaReportData,
        offBoardReportUseData,
        offSchemaReportApiLoader
    } = useAppSelector(state => state?.offline)

    const chartApexOptions = useChartApexOptions()

    const calcPercent = useCalcPercent()
    const getRandomColor = useGetRandomColor()

    const getColumnsProductTop = useCallback((type) => {
        try {
            return [
                {
                    "id": "photo",
                    "accessorKey": "photo",
                    cell: ({row}) => (
                        <div className={cn("w-[200px] flex justify-center items-center")}>
                            <Image
                                width={120}
                                height={140}
                                loading={"lazy"}
                                src={`${imgUrl}?art=${row?.original?.["photo"]}&size=xs`}
                                alt={'...'}
                            />
                        </div>
                    ),
                    "header": 'Фото',
                },
                {
                    "id": "article",
                    "accessorKey": "article",
                    "header": ({column}) => {
                        return (
                            <Button
                                variant="ghost"
                                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            >
                                Артикул
                                <CaretSortIcon className="ml-2 h-4 w-4"/>
                            </Button>
                        )
                    },
                },
                {
                    "id": type === 'product_top_return' ? "refund" : "sale",
                    "accessorKey": type === 'product_top_return' ? "refund" : "sale",
                    "header": ({column}) => {
                        return (
                            <Button
                                variant="ghost"
                                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            >
                                {type === 'product_top_return' ? "Возвратов" : "Продаж"}
                                <CaretSortIcon className="ml-2 h-4 w-4"/>
                            </Button>
                        )
                    },
                },
                {
                    "id": "chart",
                    "accessorKey": "chart",
                    "header": "",
                    cell: ({row}) => (
                        <ChartReact
                            optionsData={chartApexOptions(row?.original?.["chart"])?.options}
                            seriesData={chartApexOptions(row?.original?.["chart"])?.series}
                            type={chartApexOptions(row?.original?.["chart"])?.type}
                            height={chartApexOptions(row?.original?.["chart"])?.height}
                        />
                    )
                },
            ]
        } catch (error) {
            errorHandler("offPageReportData", "getTableColumns", error)
        }
    }, [offSchemaReportData])

    const getTableDataProductTop = useCallback((data, type) => {
        try {
            return Object.entries(data || {}).map(([key, value]) => {
                if (type === 'product_top_return') {
                    return {
                        "photo": key,
                        "article": key,
                        "refund": value?.["total"],
                        "chart": value?.["chart"],
                    }
                } else {
                    return {
                        "photo": key,
                        "article": key,
                        "sale": value?.["total"],
                        "chart": value?.["chart"],
                    }
                }

            })
        } catch (error) {
            errorHandler("offPageReportData", "useCallback/getTableDataProductTop", error)
        }
    }, [offSchemaReportData])

    const getTableColumns = useCallback((data, type, dataItems, dataBody) => {
        try {
            return Object.keys(data || {}).map((key) => {
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
                        "header": data?.[key]?.["label"],
                    }
                } else {
                    if (type === "stores") {
                        if (key === 'total') {
                            return {
                                "accessorKey": key,
                                "header": ({column}) => {
                                    return (
                                        <Button
                                            variant="ghost"
                                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                        >
                                            {data?.[key]?.["label"]}
                                            <CaretSortIcon className="ml-2 h-4 w-4"/>
                                        </Button>
                                    )
                                },
                                cell: ({row}) => (
                                    <div
                                        className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                        <div className={cn("absolute top-0 left-0 h-full")}
                                             style={{
                                                 backgroundColor: `${getRandomColor(dataItems, row?.["id"])}`,
                                                 width: `${calcPercent(row?.["original"]?.["total"], dataBody?.[0]?.["sale"])}%`
                                             }}/>
                                        <Heading type={"h4"}
                                                 cls={cn("mb-0 text-bold relative font-medium")}>{row?.["original"]?.["total"]}</Heading>
                                        <Badge
                                            className={cn("relative")}>{calcPercent(row?.["original"]?.["total"], dataBody?.[0]?.["sale"])} %</Badge>
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
                                            {data?.[key]?.["label"]}
                                            <CaretSortIcon className="ml-2 h-4 w-4"/>
                                        </Button>
                                    )
                                },
                                cell: ({row}) => (
                                    <div
                                        className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                        <div className={cn("absolute top-0 left-0 h-full")}
                                             style={{
                                                 backgroundColor: `${getRandomColor(dataItems, row?.["id"])}`,
                                                 width: `${calcPercent(row?.["original"]?.["sale"], dataBody?.[0]?.["sale"])}%`
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
                                            {data?.[key]?.["label"]}
                                            <CaretSortIcon className="ml-2 h-4 w-4"/>
                                        </Button>
                                    )
                                },
                                cell: ({row}) => (
                                    <div
                                        className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                        <div className={cn("absolute top-0 left-0 h-full")}
                                             style={{
                                                 backgroundColor: `${getRandomColor(dataItems, row?.["id"])}`,
                                                 width: `${calcPercent(row?.["original"]?.["refund"], dataBody?.[0]?.["sale"])}%`
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
                                            {data?.[key]?.["label"]}
                                            <CaretSortIcon className="ml-2 h-4 w-4"/>
                                        </Button>
                                    )
                                },

                            }
                        }
                    } else if (type === "stores_by_day") {
                        if (key === 'total') {
                            return {
                                "accessorKey": key,
                                "header": ({column}) => {
                                    return (
                                        <Button
                                            variant="ghost"
                                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                        >
                                            {data?.[key]?.["label"]}
                                            <CaretSortIcon className="ml-2 h-4 w-4"/>
                                        </Button>
                                    )
                                },
                                cell: ({row}) => (
                                    <div
                                        className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                        <div className={cn("absolute top-0 left-0 h-full")}
                                             style={{
                                                 backgroundColor: `${getRandomColor(dataItems, row?.["id"])}`,
                                                 width: `${calcPercent(row?.["original"]?.["total"], dataBody?.[0]?.["sale"])}%`
                                             }}/>
                                        <Heading type={"h4"}
                                                 cls={cn("mb-0 text-bold relative font-medium")}>{row?.["original"]?.["total"]}</Heading>
                                        <Badge
                                            className={cn("relative")}>{calcPercent(row?.["original"]?.["total"], dataBody?.[0]?.["sale"])} %</Badge>
                                    </div>
                                )
                            }
                        }
                        if (key === 'sale') {
                            return {
                                "accessorKey": key,
                                "header": ({column}) => {
                                    return (
                                        <Button
                                            variant="ghost"
                                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                        >
                                            {data?.[key]?.["label"]}
                                            <CaretSortIcon className="ml-2 h-4 w-4"/>
                                        </Button>
                                    )
                                },
                                cell: ({row}) => (
                                    <div
                                        className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                        <div className={cn("absolute top-0 left-0 h-full")}
                                             style={{
                                                 backgroundColor: `${getRandomColor(dataItems, row?.["id"])}`,
                                                 width: `${calcPercent(row?.["original"]?.["sale"], dataBody?.[0]?.["sale"])}%`
                                             }}/>
                                        <Heading type={"h4"}
                                                 cls={cn("mb-0 text-bold relative font-medium")}>{row?.["original"]?.["sale"]}</Heading>
                                        <Badge
                                            className={cn("relative")}>{Number(row?.["original"]?.["sale"]) - Number(row?.["original"]?.["sale_by_price"])}</Badge>
                                    </div>
                                )
                            }
                        }
                        if (key === 'refund') {
                            return {
                                "accessorKey": key,
                                "header": ({column}) => {
                                    return (
                                        <Button
                                            variant="ghost"
                                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                        >
                                            {data?.[key]?.["label"]}
                                            <CaretSortIcon className="ml-2 h-4 w-4"/>
                                        </Button>
                                    )
                                },
                                cell: ({row}) => (
                                    <div
                                        className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                        <div className={cn("absolute top-0 left-0 h-full")}
                                             style={{
                                                 backgroundColor: `${getRandomColor(dataItems, row?.["id"])}`,
                                                 width: `${calcPercent(row?.["original"]?.["refund"], dataBody?.[0]?.["sale"])}%`
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
                                            {data?.[key]?.["label"]}
                                            <CaretSortIcon className="ml-2 h-4 w-4"/>
                                        </Button>
                                    )
                                },

                            }
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
                                        {data?.[key]?.["label"]}
                                        <CaretSortIcon className="ml-2 h-4 w-4"/>
                                    </Button>
                                )
                            },

                        }
                    }
                }
            })
        } catch (error) {
            errorHandler("offPageReportData", "getTableColumns", error)
        }
    }, [offSchemaReportData, getRandomColor])

    if (offSchemaReportApiLoader) {
        return (
            <>
                <Skeleton className="w-[100%] h-[170px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[170px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[170px] rounded-2 mb-3"/>
            </>
        )
    }

    if (offSchemaReportData.length === 0) {
        return <NotData/>
    }

    return (
        offEditBoard ? null :
            <div className={cn("w-full border rounded p-5 will-change-auto")}>
                {
                    Object.values(offBoardReportUseData || {}).map((schemaData, schemaId) => {
                        const reportChart = schemaData?.["data"]?.["report"]?.["chart"]
                        const reportTable = schemaData?.["data"]?.["table"]
                        const getChartCurrentData = offlineChartList.filter((item) => item?.key === schemaData?.["key"])
                        return (
                            reportChart ? (
                                <div
                                    className={cn("mb-20 grid grid-cols-1 mt-5 gap-5")}
                                    key={schemaId}>
                                    <div className={"border rounded p-5"}>
                                        <ChartReact
                                            title={getChartCurrentData?.[0]?.title}
                                            optionsData={chartApexOptions(reportChart).options}
                                            seriesData={chartApexOptions(reportChart).series}
                                            type={chartApexOptions(reportChart).type}
                                            height={chartApexOptions(reportChart).height}
                                        />
                                    </div>
                                </div>
                            ) : reportTable ? (
                                <div>
                                    <Heading type={"h3"} cls={"mb-2 mt-4"}>{getChartCurrentData?.[0]?.title}</Heading>
                                    <TableData
                                        data={reportTable?.["data"]}
                                        columns={getTableColumns(reportTable?.["head"], schemaData?.["key"], reportTable?.["data"]?.length, reportTable?.["data"])}
                                        hidePagination={schemaData?.["key"] === 'stores'}
                                        hideLimitContent={schemaData?.["key"] === 'stores'}
                                        pageCount={reportTable?.["data"].length / 10}
                                        staticPagination={schemaData?.["key"] === 'stores_by_day'}
                                        staticLimit={schemaData?.["key"] === 'stores_by_day'}
                                        staticData={schemaData?.["key"] === 'stores_by_day'}
                                    />
                                </div>
                            ) : !reportChart ? (
                                <div>
                                    <Heading type={"h3"} cls={"mb-2 mt-4"}>{getChartCurrentData?.[0]?.title}</Heading>
                                    <TableData
                                        data={getTableDataProductTop(schemaData?.["data"]?.["report"])}
                                        columns={getColumnsProductTop(schemaData?.["data"]?.["report"],)}
                                        hidePagination
                                    />
                                </div>
                            ) : null
                        )
                    })
                }
            </div>
    );
}

export default OfflinePageReportData;
