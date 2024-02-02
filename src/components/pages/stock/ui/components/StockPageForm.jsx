'use client'

import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Label} from "@/components/shared/shadcn/ui/label";
import {Input} from "@/components/shared/shadcn/ui/input";
import {Button} from "@/components/shared/shadcn/ui/button";
import {Calendar} from "@/components/shared/shadcn/ui/calendar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/shared/shadcn/ui/select";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {categories} from "@/components/shared/data/categories";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {apiGetStockData} from "@/components/shared/services/axios/clientRequests";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/shadcn/ui/popover";
import {useApiRequest, useDispatchActionHandle, usePreviousFriday} from "@/components/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 29.01.2024
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function StockPageForm(props) {
    const {apiFetchHandler} = useApiRequest()

    const lastFriday = usePreviousFriday()

    const events = useDispatchActionHandle()

    const {
        stockData,
        stockApiLoader,
        stockPageParams,
        stockLimitParams,
        stockGuidCategoryParams,
        stockNameParams,
        stockReportParams,
        stockSortParams,
        stockSortDirection,
        stockArticleParams,
    } = useAppSelector(state => state.stock)

    const [date, setDate] = useState({
        from: lastFriday(),
        to: new Date(),
    })

    const fetchStockData = async (e) => {
        if (e) e.preventDefault()

        let apiDataParams = {
            date: {start: format(date.from, "dd/MM/yyyy"), end: format(date.to, "dd/MM/yyyy")},
            guid_category: stockGuidCategoryParams,
            limit: stockLimitParams,
            name: stockNameParams,
            page: stockPageParams ?? 1,
            report: stockReportParams,
            sort: stockSortParams,
            sort_direction: stockSortDirection,
        }

        await apiFetchHandler(
            apiGetStockData,
            [apiDataParams],
            events.stockApiLoaderAction,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.stockGetDataAction(params.data)
                    }
                }
            }
        )
    }

    useEffect(() => {
        if (stockData.length === 0) return
        fetchStockData()
    }, [stockPageParams, stockLimitParams, stockSortParams, stockSortDirection]);

    return (
        <>
            <div className={cn("border mb-20 p-4 rounded mt-3")}>
                <form onSubmit={fetchStockData}
                      className={cn("grid gap-10 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 mb-5 items-end")}>

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Режим</Label>
                        <Select onValueChange={value => events.stockParamsReportAction(value)}>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder="Выберите"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="group_by_size">Группировка по размеру</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Дата создание и конец</Label>
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
                        <Label>Категория товара</Label>
                        <Select onValueChange={value => events.stockParamsGuidCategoryAction(value)}>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder="Выберите категорию"/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    categories.map((categoryItem) => {
                                        return (
                                            categoryItem?.["is_submenu"] ? (
                                                <SelectGroup className={cn("mb-3")} key={categoryItem.id}>
                                                    <SelectLabel
                                                        className={cn("mb-2 text-lg")}>{categoryItem.title}</SelectLabel>
                                                    {
                                                        categoryItem.items.map((childCategory) => {
                                                            return (
                                                                <SelectItem
                                                                    key={childCategory.id}
                                                                    value={childCategory.category}>
                                                                    {childCategory.title}
                                                                </SelectItem>
                                                            )
                                                        })
                                                    }
                                                </SelectGroup>
                                            ) : (
                                                <SelectItem
                                                    key={categoryItem.id}
                                                    value={categoryItem.category}
                                                >
                                                    {categoryItem.title}
                                                </SelectItem>
                                            )
                                        )
                                    })
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Наименование</Label>
                        <Input
                            id={'name'}
                            name={'name'}
                            defaultValue={stockNameParams}
                            onChange={event => events.stockParamsNameAction(event.target.value)}
                        />
                    </div>


                    <div className={cn("w-full flex flex-col gap-3 md:col-span-2")}>
                        <Label>Артикул</Label>
                        <Input
                            id={'article'}
                            name={'article'}
                            defaultValue={stockArticleParams}
                            onChange={event => events.stockParamsArticleAction(event.target.value)}
                        />
                    </div>

                    <Button className={cn("w-full")}>
                        <LoaderButton loading={stockApiLoader}/>
                        Сформировать
                    </Button>
                </form>
            </div>
        </>
    );
}

export default StockPageForm;
