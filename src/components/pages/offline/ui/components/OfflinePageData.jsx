'use client'

import React, {Suspense, useCallback, useEffect, useMemo} from 'react';
import {cn} from "@/lib/utils";
import dynamic from "next/dynamic";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {apiGetOfflineSchemaData} from "@/components/shared/services/axios/clientRequests";

const ChartReact = dynamic(() => import("@/components/shared/uikit/chart/ui/ChartReact"), {ssr: false})


/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageData(props) {

    const events = useDispatchActionHandle()

    const {apiFetchHandler} = useApiRequest()

    const {offSchemaData, offSchemaReportData, offSchemaRender} = useAppSelector(state => state?.offline)

    const getChartDataSet = useCallback((data, index) => {
        try {
            return {
                "options": {...data, "series": [], "chart": {...data?.["chart"], id: "chart" + index}, yaxis: {"title": ""}},
                "series": data?.["series"],
                "chart": data?.["chart"]
            }
        } catch (error) {
            errorHandler("offlinePageData", "getChartDataSet", error)
        }
    }, [offSchemaReportData, offSchemaData])

    const schemaDoneData = useMemo(() => {
        try {
            return offSchemaReportData
        } catch (error) {
            errorHandler("offlinePageData", "schemaDoneData", error)
        }
    }, [offSchemaReportData])

    const calculatePercentTotal = useCallback((total, sale) => {
        try {
            return Math.floor((Math.floor(total) / Math.floor(sale)) * 100);
        } catch (error) {
            errorHandler("offlinePageData", "func/calculatePercent", error)
        }
    }, [])

    const calculateTotalSales = useCallback((total, refund) => {
        try {
            return Math.floor((Math.floor(total) - Math.floor(refund)));
        } catch (error) {
            errorHandler("offlinePageData", "func/calculateTotalSales", error)
        }
    }, [])

    const fetchOfflineSchema = async () => {
        await apiFetchHandler(
            apiGetOfflineSchemaData,
            [],
            events.offSchemaApiLoader,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.offSchemaGetData(params.data)
                    }
                }
            }
        )
    }

    const setSchemaDataWithReport = () => {
        let dataIndex = 0;
        const result = Object.entries(offSchemaData?.["schema"] || {}).map(item => {
            console.log(item)
            // const elements = offSchemaReportData?.slice(dataIndex, dataIndex + item.cols.length);
            // dataIndex += item.cols.length;
            // return elements;
        });

        // console.log(result)
    }

    // useEffect(() => {
    //     if (offSchemaReportData.length > 0) {
    //         setSchemaDataWithReport()
    //     }
    // }, [offSchemaReportData]);

    useEffect(() => {
        fetchOfflineSchema()
    }, []);

    if (offSchemaData.length === 0) {
        return null
    }

    return (
        <>
            {/*<div>*/}
            {/*    {*/}
            {/*        Object.entries(offSchemaData || {}).map(([key, schema], id) => {*/}
            {/*            return (*/}
            {/*                <div key={id}>*/}
            {/*                    {*/}
            {/*                        schema?.map((schemaItem, schemaId) => {*/}
            {/*                            return (*/}
            {/*                                <div*/}
            {/*                                    key={schemaId}*/}
            {/*                                    className={cn(`mb-20 grid 2xl:grid-cols-${schemaItem?.["cols"].length} grid-cols-1 mt-5 gap-5`)}>*/}
            {/*                                    {*/}
            {/*                                        Object.entries(offSchemaReportData || {}).map(([reportKey, report], reportId) => {*/}
            {/*                                            // console.log(report, reportKey)*/}
            {/*                                            return (*/}
            {/*                                                <div key={reportId}*/}
            {/*                                                     className={"border rounded p-5"}></div>*/}
            {/*                                            )*/}
            {/*                                        })*/}
            {/*                                    }*/}
            {/*                                </div>*/}
            {/*                            )*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                </div>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</div>*/}

            <div className={cn("w-full")}>
                {
                    Object.values(schemaDoneData || {}).map((schemaData, schemaId) => {
                        return (
                            schemaData?.["report"] ? (
                                <div className={cn("mb-20 grid 2xl:grid-cols-1 grid-cols-1 mt-5 gap-5")} key={schemaId}>
                                    <div className={"border rounded p-5"}>
                                        <Suspense fallback={"...loading"}>
                                            <ChartReact
                                                title={schemaData?.["report"]?.["yaxis"]?.[0]?.["title"]}
                                                optionsData={getChartDataSet(schemaData?.["report"], schemaId).options}
                                                seriesData={getChartDataSet(schemaData?.["report"], schemaId).series}
                                                type={getChartDataSet(schemaData?.["report"], schemaId).chart?.["type"]}
                                                height={getChartDataSet(schemaData?.["report"], schemaId).chart?.["height"]}
                                            />
                                        </Suspense>
                                    </div>
                                </div>
                            ) : null
                        )
                    })
                }
            </div>

            {/*<div className={"border rounded mb-20 grid mt-10 gap-5 p-4"}>*/}
            {/*    <Table className={cn("mb-3")}>*/}
            {/*        <TableHeader>*/}
            {/*            <TableRow>*/}
            {/*                {*/}
            {/*                    Object.entries(schemaData?.["table"]?.["head"] || {}).map(([key, value], index) => {*/}
            {/*                        return (*/}
            {/*                            <TableHead key={index}>*/}
            {/*                                <Heading*/}
            {/*                                    type={"h4"}*/}
            {/*                                    dangerouslySetInnerHTML={{__html: value?.label}}*/}
            {/*                                />*/}
            {/*                            </TableHead>*/}
            {/*                        )*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </TableRow>*/}
            {/*        </TableHeader>*/}
            {/*        <TableBody>*/}
            {/*            {*/}
            {/*                Object.entries(schemaData?.["table"]?.["data"] || {}).map(([key, value], index) => {*/}
            {/*                    const refundTotalCount = calculateTotalSales(value?.["sale"], value?.["total"])*/}
            {/*                    const totalCount = calculatePercentTotal(value?.["total"], value?.["sale"])*/}

            {/*                    return (*/}
            {/*                        <TableRow key={index}>*/}
            {/*                            <TableCell>*/}
            {/*                                <Heading type={"h4"}>{value?.store}</Heading>*/}
            {/*                            </TableCell>*/}
            {/*                            <TableCell className="font-light w-[230px]">*/}
            {/*                                /!*<Heading type={"h4"}>{value?.total}</Heading>*!/*/}
            {/*                                <div*/}
            {/*                                    className={cn("w-full flex items-center md:flex-row flex-col justify-between mb-2")}>*/}
            {/*                                    <Heading*/}
            {/*                                        type={"h4"}>{value?.["total"]}</Heading>*/}
            {/*                                    <Badge>{totalCount} %</Badge>*/}
            {/*                                </div>*/}
            {/*                                <Progress className={cn("bg-red-500]")}*/}
            {/*                                          value={totalCount}/>*/}
            {/*                            </TableCell>*/}
            {/*                            <TableCell className="font-light">*/}
            {/*                                <div*/}
            {/*                                    className={cn("w-full flex items-center flex-col justify-between mb-2")}>*/}
            {/*                                    <Heading*/}
            {/*                                        type={"h4"}*/}
            {/*                                        cls={cn("mb-0")}*/}
            {/*                                    >*/}
            {/*                                        {value?.["sale"]}*/}
            {/*                                    </Heading>*/}
            {/*                                    <Badge*/}
            {/*                                        variant={'destructive'}>{-refundTotalCount}</Badge>*/}
            {/*                                </div>*/}
            {/*                                /!*<Progress className={cn("bg-red-500]")} value={percent}/>*!/*/}
            {/*                            </TableCell>*/}
            {/*                            <TableCell className="font-light">*/}
            {/*                                <Heading type={"h4"}>{value?.refund}</Heading>*/}
            {/*                            </TableCell>*/}
            {/*                        </TableRow>*/}
            {/*                    )*/}
            {/*                })*/}
            {/*            }*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</div>*/}

            {/*<div className={"border rounded mb-20 grid mt-10 gap-5 p-4"}>*/}
            {/*    <Heading type={"h3"}>Магазины</Heading>*/}
            {/*    <Table className={cn("mb-3")}>*/}
            {/*        <TableHeader>*/}
            {/*            <TableRow>*/}
            {/*                {*/}
            {/*                    Object.entries(chartStores.head || {}).map(([key, value], index) => {*/}
            {/*                        return (*/}
            {/*                            <TableHead key={index}>*/}
            {/*                                <Heading*/}
            {/*                                    type={"h4"}*/}
            {/*                                    cls={`${value?.row_class}`}*/}
            {/*                                    dangerouslySetInnerHTML={{__html: value?.label}}*/}
            {/*                                />*/}
            {/*                            </TableHead>*/}
            {/*                        )*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </TableRow>*/}
            {/*        </TableHeader>*/}
            {/*        <TableBody>*/}
            {/*            {*/}
            {/*                Object.entries(chartStores.data || {}).map(([key, value], index) => {*/}
            {/*                    return (*/}
            {/*                        <TableRow key={index}>*/}
            {/*                            <TableCell>*/}
            {/*                                <Heading type={"h4"}>{value?.store}</Heading>*/}
            {/*                            </TableCell>*/}
            {/*                            <TableCell className="font-light w-[230px]">*/}
            {/*                                <Heading type={"h4"}>{value?.total}</Heading>*/}
            {/*                            </TableCell>*/}
            {/*                            <TableCell className="font-light">*/}
            {/*                                <Heading type={"h4"}>{value?.sale}</Heading>*/}
            {/*                            </TableCell>*/}
            {/*                            <TableCell className="font-light">*/}
            {/*                                <Heading type={"h4"}>{value?.refund}</Heading>*/}
            {/*                            </TableCell>*/}
            {/*                            <TableCell className="font-light">*/}
            {/*                                <ChartReact*/}
            {/*                                    optionsData={value.chart}*/}
            {/*                                    seriesData={value.chart.series}*/}
            {/*                                    type={value.chart.chart.type}*/}
            {/*                                    height={value.chart.chart.height}*/}
            {/*                                />*/}
            {/*                            </TableCell>*/}
            {/*                        </TableRow>*/}
            {/*                    )*/}
            {/*                })*/}
            {/*            }*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</div>*/}

            {/*<div className={cn("mb-20 grid 2xl:grid-cols-2 grid-cols-1 mt-5 gap-5")}>*/}
            {/*    <div className={"border rounded p-5"}>*/}
            {/*        <ChartReact*/}
            {/*            title={"Динамика продаж"}*/}
            {/*            optionsData={chartSalesDynamic}*/}
            {/*            seriesData={chartSalesDynamic.series}*/}
            {/*            type={chartSalesDynamic.chart.type}*/}
            {/*            height={chartSalesDynamic.chart.height}*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className={"border rounded p-5"}>*/}
            {/*        <ChartReact*/}
            {/*            title={"Сегмент номенклатуры"}*/}
            {/*            optionsData={chartSegment}*/}
            {/*            seriesData={chartSegment.series}*/}
            {/*            type={chartSegment.chart.type}*/}
            {/*            height={chartSegment.chart.height}*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className={"border rounded p-5"}>*/}
            {/*        <ChartReact*/}
            {/*            title={"Активность"}*/}
            {/*            optionsData={chartActive}*/}
            {/*            seriesData={chartActive.series}*/}
            {/*            type={chartActive.chart.type}*/}
            {/*            height={chartActive.chart.height}*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className={"border rounded p-5"}>*/}
            {/*        <Heading type={"h3"}>Товары - ТОП 10 по продажам</Heading>*/}
            {/*        <Table className={cn("mb-3")}>*/}
            {/*            <TableHeader>*/}
            {/*                <TableRow>*/}
            {/*                    {*/}
            {/*                        Object.entries(chartTopSales || {}).map(([key, value], index) => {*/}
            {/*                            return (*/}
            {/*                                <TableHead key={index}>*/}
            {/*                                    <h4 dangerouslySetInnerHTML={{__html: value?.label}}/>*/}
            {/*                                </TableHead>*/}
            {/*                            )*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                </TableRow>*/}
            {/*            </TableHeader>*/}
            {/*            <TableBody>*/}
            {/*                {*/}
            {/*                    Object.entries(chartTopSales || {}).map(([key, value], index) => {*/}
            {/*                        return (*/}
            {/*                            <TableRow key={index}>*/}
            {/*                                <TableCell>*/}
            {/*                                    <Image*/}
            {/*                                        width={60}*/}
            {/*                                        height={90}*/}
            {/*                                        src={'https://app3.lichishop.com/add-ons/get_image_by_art/?art=dr04795&size=xs'}*/}
            {/*                                        alt={value?.category}*/}
            {/*                                    />*/}
            {/*                                </TableCell>*/}
            {/*                                <TableCell className="font-light w-[230px]">*/}
            {/*                                    <Heading type={"h4"}>{value?.article}</Heading>*/}
            {/*                                </TableCell>*/}
            {/*                                <TableCell className="font-light">*/}
            {/*                                    <Heading type={"h4"}>{value?.sale}</Heading>*/}
            {/*                                </TableCell>*/}
            {/*                                <TableCell className="font-light">*/}
            {/*                                    <Heading type={"h4"}>{value?.refund}</Heading>*/}
            {/*                                </TableCell>*/}
            {/*                                <TableCell className="font-light">*/}
            {/*                                    <ChartReact*/}
            {/*                                        optionsData={value.chart}*/}
            {/*                                        seriesData={value.chart.series}*/}
            {/*                                        type={value.chart.chart.type}*/}
            {/*                                        height={value.chart.chart.height}*/}
            {/*                                    />*/}
            {/*                                </TableCell>*/}
            {/*                            </TableRow>*/}
            {/*                        )*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </TableBody>*/}
            {/*        </Table>*/}
            {/*    </div>*/}

            {/*    <div className={"border rounded p-5"}>*/}
            {/*        <Heading type={"h3"}>Товары - ТОП 10 по возврату</Heading>*/}
            {/*        <Table className={cn("mb-3")}>*/}
            {/*            <TableHeader>*/}
            {/*                <TableRow>*/}
            {/*                    {*/}
            {/*                        Object.entries(chartTopRefund || {}).map(([key, value], index) => {*/}
            {/*                            return (*/}
            {/*                                <TableHead key={index}>*/}
            {/*                                    <h4 dangerouslySetInnerHTML={{__html: value?.label}}/>*/}
            {/*                                </TableHead>*/}
            {/*                            )*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                </TableRow>*/}
            {/*            </TableHeader>*/}
            {/*            <TableBody>*/}
            {/*                {*/}
            {/*                    Object.entries(chartTopRefund || {}).map(([key, value], index) => {*/}
            {/*                        return (*/}
            {/*                            <TableRow key={index}>*/}
            {/*                                <TableCell>*/}
            {/*                                    <Image*/}
            {/*                                        width={60}*/}
            {/*                                        height={90}*/}
            {/*                                        src={'https://app3.lichishop.com/add-ons/get_image_by_art/?art=dr04795&size=xs'}*/}
            {/*                                        alt={value?.category}*/}
            {/*                                    />*/}
            {/*                                </TableCell>*/}
            {/*                                <TableCell className="font-light w-[230px]">*/}
            {/*                                    <Heading type={"h4"}>{value?.article}</Heading>*/}
            {/*                                </TableCell>*/}
            {/*                                <TableCell className="font-light">*/}
            {/*                                    <Heading type={"h4"}>{value?.sale}</Heading>*/}
            {/*                                </TableCell>*/}
            {/*                                <TableCell className="font-light">*/}
            {/*                                    <Heading type={"h4"}>{value?.refund}</Heading>*/}
            {/*                                </TableCell>*/}
            {/*                                <TableCell className="font-light">*/}
            {/*                                    <ChartReact*/}
            {/*                                        optionsData={value.chart}*/}
            {/*                                        seriesData={value.chart.series}*/}
            {/*                                        type={value.chart.chart.type}*/}
            {/*                                        height={value.chart.chart.height}*/}
            {/*                                    />*/}
            {/*                                </TableCell>*/}
            {/*                            </TableRow>*/}
            {/*                        )*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </TableBody>*/}
            {/*        </Table>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}

export default React.memo(OfflinePageData);
