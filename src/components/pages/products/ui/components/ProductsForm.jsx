'use client'

import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {Label} from "@/components/shared/shadcn/ui/label";
import {Input} from "@/components/shared/shadcn/ui/input";
import {Button} from "@/components/shared/shadcn/ui/button";
import {Switch} from "@/components/shared/shadcn/ui/switch";
import {CalendarIcon, DownloadIcon} from '@radix-ui/react-icons'
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
import MultiSelect from "@/components/shared/uikit/multiselect/ui/MultiSelect";
import {apiGetProductsListData} from "@/components/shared/services/axios/clientRequests";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/shadcn/ui/popover";
import {useApiRequest, useDispatchActionHandle, useGetDomain, usePreviousFriday} from "@/components/shared/hooks";
import {storesStaticData} from "@/components/shared/data/stores";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @last-updated 03.02.2024
 * @update-description multi select and refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function ProductsForm(props) {
    const events = useDispatchActionHandle()

    const lastFriday = usePreviousFriday();
    const domain = useGetDomain()

    const {apiFetchHandler} = useApiRequest()

    const {
        productsReportParams,
        productParamsSortName,
        productsCategoryParams,
        productsPageParams,
        productsDetailByStore,
        productsLimitParams,
        productsData,
        productsApiLoader,
        productsArticleParams,
        productsDownloadParams,
        productParamsSortDirection,
        productParamsStores,
        productsParamsTriggerApi
    } = useAppSelector(state => state.products)

    const [date, setDate] = useState({
        from: lastFriday(),
        to: new Date(),
    })

    const fetchProductsData = async (e, download) => {
        if (e) e.preventDefault()

        let apiParams = {
            category: productsCategoryParams,
            date: {
                start: format(date.from, "dd/MM/yyyy"), end: format(date.to, "dd/MM/yyyy")
            },
            download: download || productsDownloadParams || 0,
            limit: productsLimitParams,
            detail_by_store: productsDetailByStore ? "1" : "0",
            page: parseInt(productsPageParams) ?? 1,
            report: productsReportParams,
            sort_direction: productParamsSortDirection
        }

        if (productParamsStores && productsDetailByStore) {
            apiParams['stores'] = [...productParamsStores]
        }

        if (productParamsSortName) {
            apiParams['sort'] = productParamsSortName
        }

        await apiFetchHandler(
            apiGetProductsListData,
            [apiParams],
            events.productsApiLoaderAction,
            {
                onGetData: (params) => {
                    if (download || productsDownloadParams) {
                        const url = `${domain}/products/`
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = params.data?.['download_file']
                        link.click();
                        return
                    }
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
    }, [productsParamsTriggerApi]);

    useEffect(() => {
        return () => {
            events.productsResetDataAction()
        }
    }, []);

    return (
        <div className={cn("w-100 border mb-20 p-4 rounded mt-3")}>
            <form
                className={cn("grid gap-10 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-10 items-center")}>

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
                </div>


                <div className={cn("w-full flex flex-col gap-3")}>
                    <Label>Отчет</Label>
                    <Select onValueChange={value => events.productsReportParamsAction(value)}>
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
                </div>

                <div className={cn("w-full flex flex-col gap-3")}>
                    <Label>Категория товара</Label>
                    <Select onValueChange={value => events.productsCategoryParamsAction(value)}>
                        <SelectTrigger className="w-100">
                            <SelectValue placeholder="Категория товара"/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categories.map((categoryItem, index) => {
                                    return (
                                        categoryItem?.["is_submenu"] ? (
                                            <SelectGroup className={cn("mb-3")} key={index}>
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
                                                key={index}
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
                    <Label>Артикул</Label>
                    <Input
                        id={'article'}
                        name={'article'}
                        type={'text'}
                        defaultValue={productsArticleParams}
                        onChange={event => events.productsArticleParamsReducerAction(event.target.value)}
                    />
                </div>

                {
                    productsDetailByStore &&
                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Выберите магазины</Label>
                        <MultiSelect data={storesStaticData} getValueSelected={events.productParamsStoresAction}/>
                    </div>
                }

            </form>

            <div className={cn("flex items-center flex-wrap gap-10")}>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="airplane-mode"
                        onCheckedChange={(value) => events.productsDetailByStoreParamsAction(value)}
                    />
                    <Label htmlFor="airplane-mode">Группировка по магазинам</Label>
                </div>

                <Button
                    type={"submit"}
                    className={cn("md:w-[400px] w-full")}
                    onClick={e => fetchProductsData(e)}
                >
                    <LoaderButton loading={productsApiLoader}/>
                    Сформировать
                </Button>

                <Button
                    type={"button"}
                    variant={'secondary'}
                    className={cn("w-full md:max-w-[120px]")}
                    onClick={e => fetchProductsData(e, 1)}
                >
                    <LoaderButton loading={productsApiLoader}/>
                    <DownloadIcon/>
                </Button>
            </div>

        </div>

    );
}

export default ProductsForm;
