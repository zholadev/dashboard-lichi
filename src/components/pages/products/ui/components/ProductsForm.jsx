'use client'

import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {CalendarIcon} from '@radix-ui/react-icons'
import {Label} from "@/components/shared/shadcn/ui/label";
import {Input} from "@/components/shared/shadcn/ui/input";
import {Button} from "@/components/shared/shadcn/ui/button";
import {Switch} from "@/components/shared/shadcn/ui/switch";
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
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {apiGetProductsListData} from "@/components/shared/services/axios/clientRequests";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/shadcn/ui/popover";
import {useApiRequest, useDispatchActionHandle, usePreviousFriday} from "@/components/shared/hooks";
import {categories} from "@/components/shared/data/categories";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function ProductsForm(props) {

    const events = useDispatchActionHandle()

    const {apiFetchHandler, loading} = useApiRequest()
    const lastFriday = usePreviousFriday();

    const {report, category, page, detail_by_store, limit, productsData} = useAppSelector(state => state.products)

    const [date, setDate] = useState({
        from: lastFriday(),
        to: new Date(),
    })

    const fetchProductsData = async (e) => {
        if (e) e.preventDefault()

        let apiParams = {
            category: category,
            date: {
                start: format(date.from, "dd/MM/yyyy"), end: format(date.to, "dd/MM/yyyy")
            },
            download: 0,
            limit: limit,
            detail_by_store: detail_by_store ? "1" : "0",
            page: parseInt(page) ?? 1,
            report: report,
            sort_direction: -1
        }

        await apiFetchHandler(
            apiGetProductsListData,
            [apiParams],
            events.productsApiLoader,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.productsGetProductsData(params.data)
                    }
                }
            }
        )
    }

    useEffect(() => {
        if (productsData.length === 0) return
        fetchProductsData()
    }, [limit, page]);

    useEffect(() => {
        return () => {
            events.productsResetData()
        }
    }, []);

    return (
        <div className={cn("w-100 border mb-20 p-4 rounded mt-3")}>
            <form onSubmit={fetchProductsData}
                  className={cn("grid gap-10 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-10 items-center")}>
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
                                <span>Выберите дату</span>
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
                            locate={ru}
                        />
                    </PopoverContent>
                </Popover>

                <Select onValueChange={value => events.productsReportParams(value)}>
                    <SelectTrigger className="w-100">
                        <SelectValue placeholder="Отчет"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="by_articles">По артикулам</SelectItem>
                        <SelectItem value="by_colors">По цветам</SelectItem>
                        <SelectItem value="by_sizes">По размерам</SelectItem>
                        <SelectItem value="by_sizes2">По размерам [Test2]</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={value => events.productsCategoryParams(value)}>
                    <SelectTrigger className="w-100">
                        <SelectValue placeholder="Категория товара"/>
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

                <Input defaultValue={'Артикул'}/>

                {
                    detail_by_store &&
                    <Select>
                        <SelectTrigger className="w-100">
                            <SelectValue placeholder="Выберите магазины"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ru">Астана</SelectItem>
                            <SelectItem value="kz">Павло</SelectItem>
                            <SelectItem value="uae">Алматы</SelectItem>
                        </SelectContent>
                    </Select>
                }

                <div className={cn("flex items-center flex-wrap gap-10 justify-between")}>
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode"
                                onCheckedChange={(value) => events.productsDetailByStoreParams(value)}/>
                        <Label htmlFor="airplane-mode">Группировка по магазинам</Label>
                    </div>

                    <Button
                        type={"submit"}
                        className={cn("2xl:w-[230px] w-[100%]")}>
                        <LoaderButton loading={loading}/>
                        Сформировать
                    </Button>
                </div>
            </form>
        </div>

    );
}

export default ProductsForm;
