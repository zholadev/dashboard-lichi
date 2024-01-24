'use client'

import React, {Suspense, useState} from 'react';
import {cn} from "@/lib/utils";
import dynamic from "next/dynamic";
import {addDays, format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Input} from "@/components/shared/ui/input";
import {Label} from "@/components/shared/ui/label";
import {Button} from "@/components/shared/ui/button";
import {Heading} from '@/components/shared/uikit/heading'
import {Calendar} from "@/components/shared/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shared/ui/select";
import {Skeleton} from "@/components/shared/ui/skeleton";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/shared/ui/table";
import Image from "next/image";
import {
    chartActive,
    chartAvg,
    chartSalesDynamic,
    chartSegment,
    chartStores,
    chartTopRefund,
    chartTopSales
} from "@/components/shared/data/charts";

const ChartReact = dynamic(() => import("@/components/shared/uikit/chart/ui/ChartReact"), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function OfflinePage(props) {
    const [date, setDate] = useState({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    const SkeletonLoading = () => (
        <Skeleton className="w-[100%] h-[340px] rounded-2"/>
    )

    return (
        <div className={cn("w-full")}>
            <Heading type={"h1"}>Розница</Heading>

            <div className={cn("border mb-20 p-4 rounded mt-3")}>
                <form className={cn("grid gap-10 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 mb-5 items-end")}>
                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Отчетный период</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "LLL dd, y")} -{" "}
                                                {format(date.to, "LLL dd, y")}
                                            </>
                                        ) : (
                                            format(date.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Агрегация</Label>
                        <Select>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder="Агрегация"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ru">По дням</SelectItem>
                                <SelectItem value="kz">По часам</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Страна</Label>
                        <Select>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder="Выберите страну"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ru">Россия</SelectItem>
                                <SelectItem value="kz">Казахстан</SelectItem>
                                <SelectItem value="uae">UAE</SelectItem>
                                <SelectItem value="pol">Польша</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Магазин</Label>
                        <Select>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder="Выберите магазин"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ru">Россия</SelectItem>
                                <SelectItem value="kz">Казахстан</SelectItem>
                                <SelectItem value="uae">UAE</SelectItem>
                                <SelectItem value="pol">Польша</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Категория товара</Label>
                        <Select>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder="Выберите"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ru">Россия</SelectItem>
                                <SelectItem value="kz">Казахстан</SelectItem>
                                <SelectItem value="uae">UAE</SelectItem>
                                <SelectItem value="pol">Польша</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={cn("w-full flex flex-col gap-3 col-span-2")}>
                        <Label>Артикул</Label>
                        <Input defaultValue={'Артикул'}/>
                    </div>

                    <Button className={cn("w-full")}>Сформировать</Button>
                </form>
            </div>

            <div className={"border rounded mb-20 grid mt-10 gap-5 p-4"}>
                <Heading type={"h3"}>Магазины</Heading>
                <Table className={cn("mb-3")}>
                    <TableHeader>
                        <TableRow>
                            {
                                Object.entries(chartStores.head || {}).map(([key, value], index) => {
                                    return (
                                        <TableHead key={index}>
                                            <Heading
                                                type={"h4"}
                                                cls={`${value?.row_class}`}
                                                dangerouslySetInnerHTML={{__html: value?.label}}
                                            />
                                        </TableHead>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            Object.entries(chartStores.data || {}).map(([key, value], index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Heading type={"h4"}>{value?.store}</Heading>
                                        </TableCell>
                                        <TableCell className="font-light w-[230px]">
                                            <Heading type={"h4"}>{value?.total}</Heading>
                                        </TableCell>
                                        <TableCell className="font-light">
                                            <Heading type={"h4"}>{value?.sale}</Heading>
                                        </TableCell>
                                        <TableCell className="font-light">
                                            <Heading type={"h4"}>{value?.refund}</Heading>
                                        </TableCell>
                                        <TableCell className="font-light">
                                            {/*<ChartReact*/}
                                            {/*    optionsData={value.chart}*/}
                                            {/*    seriesData={value.chart.series}*/}
                                            {/*    type={value.chart.chart.type}*/}
                                            {/*    height={value.chart.chart.height}*/}
                                            {/*/>*/}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>

            <div className={cn("mb-20 grid 2xl:grid-cols-2 grid-cols-1 mt-5 gap-5")}>
                <div className={"border rounded p-5"}>
                    <Suspense fallback={<SkeletonLoading/>}>
                        <ChartReact
                            title={"Динамика продаж"}
                            optionsData={chartSalesDynamic}
                            seriesData={chartSalesDynamic.series}
                            type={chartSalesDynamic.chart.type}
                            height={chartSalesDynamic.chart.height}
                        />
                    </Suspense>
                </div>

                <div className={"border rounded p-5"}>
                    <Suspense fallback={<SkeletonLoading/>}>
                        <ChartReact
                            title={"Средний чек"}
                            optionsData={chartAvg}
                            seriesData={chartAvg.series}
                            type={chartAvg.chart.type}
                            height={chartAvg.chart.height}
                        />
                    </Suspense>
                </div>

                <div className={"border rounded p-5"}>
                    <Suspense fallback={<SkeletonLoading/>}>
                        <ChartReact
                            title={"Сегмент номенклатуры"}
                            optionsData={chartSegment}
                            seriesData={chartSegment.series}
                            type={chartSegment.chart.type}
                            height={chartSegment.chart.height}
                        />
                    </Suspense>
                </div>

                <div className={"border rounded p-5"}>
                    <Suspense fallback={<SkeletonLoading/>}>
                        <ChartReact
                            title={"Активность"}
                            optionsData={chartActive}
                            seriesData={chartActive.series}
                            type={chartActive.chart.type}
                            height={chartActive.chart.height}
                        />
                    </Suspense>
                </div>

                <div className={"border rounded p-5"}>
                    <Heading type={"h3"}>Товары - ТОП 10 по продажам</Heading>
                    <Table className={cn("mb-3")}>
                        <TableHeader>
                            <TableRow>
                                {
                                    Object.entries(chartTopSales || {}).map(([key, value], index) => {
                                        return (
                                            <TableHead key={index}>
                                                <h4 dangerouslySetInnerHTML={{__html: value?.label}}/>
                                            </TableHead>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                Object.entries(chartTopSales || {}).map(([key, value], index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Image
                                                    width={60}
                                                    height={90}
                                                    src={'https://app3.lichishop.com/add-ons/get_image_by_art/?art=dr04795&size=xs'}
                                                    alt={value?.category}
                                                />
                                            </TableCell>
                                            <TableCell className="font-light w-[230px]">
                                                <Heading type={"h4"}>{value?.article}</Heading>
                                            </TableCell>
                                            <TableCell className="font-light">
                                                <Heading type={"h4"}>{value?.sale}</Heading>
                                            </TableCell>
                                            <TableCell className="font-light">
                                                <Heading type={"h4"}>{value?.refund}</Heading>
                                            </TableCell>
                                            <TableCell className="font-light">
                                                <ChartReact
                                                    optionsData={value.chart}
                                                    seriesData={value.chart.series}
                                                    type={value.chart.chart.type}
                                                    height={value.chart.chart.height}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>

                <div className={"border rounded p-5"}>
                    <Heading type={"h3"}>Товары - ТОП 10 по возврату</Heading>
                    <Table className={cn("mb-3")}>
                        <TableHeader>
                            <TableRow>
                                {
                                    Object.entries(chartTopRefund || {}).map(([key, value], index) => {
                                        return (
                                            <TableHead key={index}>
                                                <h4 dangerouslySetInnerHTML={{__html: value?.label}}/>
                                            </TableHead>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                Object.entries(chartTopRefund || {}).map(([key, value], index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Image
                                                    width={60}
                                                    height={90}
                                                    src={'https://app3.lichishop.com/add-ons/get_image_by_art/?art=dr04795&size=xs'}
                                                    alt={value?.category}
                                                />
                                            </TableCell>
                                            <TableCell className="font-light w-[230px]">
                                                <Heading type={"h4"}>{value?.article}</Heading>
                                            </TableCell>
                                            <TableCell className="font-light">
                                                <Heading type={"h4"}>{value?.sale}</Heading>
                                            </TableCell>
                                            <TableCell className="font-light">
                                                <Heading type={"h4"}>{value?.refund}</Heading>
                                            </TableCell>
                                            <TableCell className="font-light">
                                                <ChartReact
                                                    optionsData={value.chart}
                                                    seriesData={value.chart.series}
                                                    type={value.chart.chart.type}
                                                    height={value.chart.chart.height}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default OfflinePage;
