'use client'

import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import dynamic from "next/dynamic";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {useApiRequest, useChartApexOptions, useDispatchActionHandle, useToastMessage} from "@/components/shared/hooks";
import {apiGetOfflineSchemaData} from "@/components/shared/services/axios/clientRequests";
import {offlineChartList} from "@/components/shared/data/charts";
import {NotData} from "@/components/shared/uikit/templates";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {MoveIcon} from "@radix-ui/react-icons";


const ChartReact = dynamic(() => import("@/components/shared/uikit/chart/ui/ChartReact"), {ssr: false})


/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageData(props) {

    const toastMessage = useToastMessage()
    const events = useDispatchActionHandle()

    const {apiFetchHandler} = useApiRequest()

    const {offSchemaData, offSchemaReportData, offSchemaRender} = useAppSelector(state => state?.offline)

    const [boardList, setBoardList] = useState([])
    const [boardReportData, setBoardReportData] = useState([])

    const chartApexOptions = useChartApexOptions()

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

    useEffect(() => {
        fetchOfflineSchema()
    }, []);

    // React DND

    const checkListIncludes = (result) => {
        const getItem = boardList.filter((item) => item?.key == result?.draggableId)
        if (getItem.length > 0) return true
    }


    const onDragEnd = (result) => {
        if (!result.destination) return;
        console.log('result', result)
        if (checkListIncludes(result)) {
            toastMessage('Отчет уже есть в списке', 'info')
            return;
        }

        const items = Array.from(offlineChartList);
        console.log(items)
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const itemsFilter = offlineChartList.filter((item) => item?.key == result?.draggableId)

        setBoardList([...boardList, ...itemsFilter])

        setTimeout(() => {
            const getCurrentData = Object.values(offSchemaReportData || {}).filter(item => {
                return boardList.some(board => board?.key === item?.key)
            })

            setBoardReportData([...getCurrentData])
        }, 1000)
        // Обновите state с новым порядком элементов
    };

    // console.log('boardList', boardList)
    // console.log('boardReportData', boardReportData)


    if (offSchemaData.length === 0) {
        return <NotData/>
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable>
                    {(provided) => (
                        <ul className="w-full border p-4 my-5 flex items-center rounded content-stretch justify-between gap-5"
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {offlineChartList.map((item, index) => (
                                <Draggable key={item?.key} draggableId={item?.key?.toString()} index={index}>
                                    {(provided) => (
                                        <li className="flex-1 h-full border rounded p-5 cursor-pointer flex items-center gap-3 text-xs"
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}>
                                            <MoveIcon/>
                                            {item.title}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                <Droppable droppableId="droppable2">
                    {(provided) => (
                        <ul className="w-full border p-4 my-5 space-y-3"
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {boardList.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided) => (
                                        <li className="flex-1 border rounded p-5 cursor-pointer text-xs"
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}>
                                            {item.title}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

            {/*<ul className={cn("w-full border p-4 my-5 flex items-center rounded justify-between gap-5")}>*/}
            {/*    {*/}
            {/*        offlineChartList.map((item) => (*/}
            {/*            <li key={item.id} className={cn("flex-1 border rounded p-5 cursor-pointer text-xs")}>{item.title}</li>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</ul>*/}

            {/*<div>*/}
            {/*    <Button onClick={() => events.offSchemaRenderToggle(!offSchemaRender)}>*/}
            {/*        Render Charts*/}
            {/*    </Button>*/}
            {/*</div>*/}
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
                    offSchemaRender ?
                        Object.values(boardReportData || {}).map((schemaData, schemaId) => {
                            const reportData = schemaData?.["data"]?.["report"]
                            return (
                                reportData ? (
                                    <div
                                        className={cn("mb-20 grid 2xl:grid-cols-1 grid-cols-1 mt-5 gap-5")}
                                        key={schemaId}>
                                        <div className={"border rounded p-5"}>
                                            <ChartReact
                                                title={""}
                                                optionsData={chartApexOptions(reportData).options}
                                                seriesData={chartApexOptions(reportData).series}
                                                type={chartApexOptions(reportData).type}
                                                height={chartApexOptions(reportData).height}
                                            />
                                        </div>
                                    </div>
                                ) : null
                            )
                        })
                        :
                        null
                }
            </div>

            {/*<div className={"border rounded p-5"}>*/}
            {/*    {*/}
            {/*        offSchemaReportData?.length > 0 &&*/}
            {/*        <ChartReact*/}
            {/*            title={schemaDoneData?.["yaxis"]?.[0]?.["title"]}*/}
            {/*            optionsData={getChartDataSet(schemaDoneData)}*/}
            {/*            seriesData={getChartDataSet(schemaDoneData)?.series}*/}
            {/*            type={getChartDataSet(schemaDoneData)?.chart?.["type"]}*/}
            {/*            height={getChartDataSet(schemaDoneData)?.chart?.["height"]}*/}
            {/*        />*/}
            {/*    }*/}
            {/*</div>*/}

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

            {/*{*/}
            {/*    offSchemaRender ?*/}
            {/*        <>*/}
            {/*            <div className={"border rounded p-5"}>*/}
            {/*                <ChartReact*/}
            {/*                    title={"Динамика продаж"}*/}
            {/*                    optionsData={chartSalesDynamic}*/}
            {/*                    seriesData={chartSalesDynamic.series}*/}
            {/*                    type={chartSalesDynamic.chart.type}*/}
            {/*                    height={chartSalesDynamic.chart.height}*/}
            {/*                />*/}
            {/*            </div>*/}

            {/*            <div className={"border rounded p-5"}>*/}
            {/*                <ChartReact*/}
            {/*                    title={"Сегмент номенклатуры"}*/}
            {/*                    optionsData={chartSegment}*/}
            {/*                    seriesData={chartSegment.series}*/}
            {/*                    type={chartSegment.chart.type}*/}
            {/*                    height={chartSegment.chart.height}*/}
            {/*                />*/}
            {/*            </div>*/}

            {/*            <div className={"border rounded p-5"}>*/}
            {/*                <ChartReact*/}
            {/*                    title={"Сегмент номенклатуры"}*/}
            {/*                    optionsData={chartAvg}*/}
            {/*                    seriesData={chartAvg.series}*/}
            {/*                    type={chartAvg.chart.type}*/}
            {/*                    height={chartAvg.chart.height}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </>*/}
            {/*        : null*/}
            {/*}*/}


            {/*<div className={"border rounded p-5"}>*/}
            {/*    <ChartReact*/}
            {/*        title={"Активность"}*/}
            {/*        optionsData={activeData}*/}
            {/*        seriesData={activeData?.series}*/}
            {/*        type={activeData?.chart?.type}*/}
            {/*        height={activeData?.chart?.height}*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div className={"border rounded p-5"}>*/}
            {/*        <ChartReact*/}
            {/*            title={"Активность"}*/}
            {/*            optionsData={weekActivity}*/}
            {/*            seriesData={weekActivity.series}*/}
            {/*            type={weekActivity.chart.type}*/}
            {/*            height={weekActivity.chart.height}*/}
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

export default OfflinePageData;
