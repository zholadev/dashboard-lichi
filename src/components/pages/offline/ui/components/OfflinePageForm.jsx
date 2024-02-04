'use client'

import React, {useEffect} from 'react';
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Input} from "@/components/shared/shadcn/ui/input";
import {Label} from "@/components/shared/shadcn/ui/label";
import {Button} from "@/components/shared/shadcn/ui/button";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {FormSelectCategories} from "@/components/shared/form";
import {Calendar} from "@/components/shared/shadcn/ui/calendar";
import {offlineChartList} from "@/components/shared/data/charts";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/shadcn/ui/popover";
import {useApiRequest, useDispatchActionHandle, usePreviousFriday} from "@/components/shared/hooks";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shared/shadcn/ui/select";
import {apiGetOfflineCountryData, apiGetOfflineSchemaDetail} from "@/components/shared/services/axios/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageForm(props) {
    const events = useDispatchActionHandle()

    const lastFriday = usePreviousFriday()

    const {apiFetchHandler, loading} = useApiRequest()

    const {
        offSchemaData,
        offSchemaReportData,
        offSchemaApiLoader,
        offArticleParams,
        offCountryParams,
        offStoresParams,
        offStoresData,
        offDateGroupParams,
        offCategoryParams,
        offDateParams,
        offDateCalendarValue
    } = useAppSelector(state => state?.offline)

    const fetchGetAllSchemaReportData = async (e) => {
        if (e) e.preventDefault()
        events.offSchemaReportApiLoaderAction(true)

        Object.values(offlineChartList || {}).map((schema, index) => {
            const timer = 400 * index
            setTimeout(() => {
                fetchOfflineSchema(e, schema?.key, index)
            }, timer)
        })

        events.offSchemaRenderToggle(true)
        events.offSchemaReportApiLoaderAction(false)
    }

    const fetchOfflineSchema = async (e, schema_type, index) => {
        if (e) e.preventDefault()

        let apiParams = {
            "date": {"start": format(offDateParams.from, "dd/MM/yyyy"), "end": format(offDateParams.to, "dd/MM/yyyy")},
            "date_group": offDateGroupParams,
            "country": offCountryParams,
            "category": offCategoryParams,
        }

        if (offArticleParams) {
            apiParams['article'] = offArticleParams
        }

        if (offStoresParams) {
            apiParams['store'] = [offStoresParams]
        }

        await apiFetchHandler(
            apiGetOfflineSchemaDetail,
            [schema_type, apiParams],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.offSchemaReportGetData({"key": schema_type, "data": params.data, "id": index})
                    }
                }
            }
        )
    }

    const fetchOffSchemaStoreData = async (id) => {
        await apiFetchHandler(
            apiGetOfflineCountryData,
            [id || offCountryParams],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.offSchemaStoresDataAction(params.data?.["stores"])
                    }
                }
            }
        )
    }

    useEffect(() => {
        events.offDateParamsReducerAction({
            from: lastFriday(),
            to: new Date()
        })
    }, []);

    useEffect(() => {
        return () => {
            events.resetOffSchemaDataAction()
        }
    }, []);

    return (
        <div className={cn("border mb-20 p-4 rounded mt-3")}>
            <form onSubmit={fetchGetAllSchemaReportData}
                  className={cn("grid gap-10 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mb-5 items-end")}>
                <div className={cn("w-full flex flex-col gap-3")}>
                    <Label>Отчетный период</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "justify-start text-left font-normal",
                                    !offDateCalendarValue && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {offDateCalendarValue?.from ? (
                                    offDateCalendarValue.to ? (
                                        <>
                                            {format(offDateCalendarValue.from, "LLL dd, y")} -{" "}
                                            {format(offDateCalendarValue.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(offDateCalendarValue.from, "LLL dd, y")
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
                                defaultMonth={offDateCalendarValue?.from}
                                selected={offDateCalendarValue}
                                onSelect={value => {
                                    events.offDateCalendarValueAction(value)
                                    events.offDateParamsReducerAction({
                                        from: value.from,
                                        to: value.to
                                    })
                                }}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className={cn("w-full flex flex-col gap-3")}>
                    <Label>Агрегация</Label>
                    <Select onValueChange={value => events.offDateGroupParamsReducerAction(value)}>
                        <SelectTrigger className="w-100">
                            <SelectValue placeholder="Агрегация"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="by_day">По дням</SelectItem>
                            <SelectItem value="by_month">По месяцам</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


                <div className={cn("w-full flex flex-col gap-3")}>
                    <Label>Страна</Label>
                    <Select onValueChange={async value => {
                        events.offSchemaCountryParamsAction(value)
                        await fetchOffSchemaStoreData(value)
                    }}>
                        <SelectTrigger className="w-100">
                            <SelectValue placeholder="Выберите страну"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0KDQvtGB0YHQuNGP">Россия</SelectItem>
                            <SelectItem value="0JrQsNC30LDRhdGB0YLQsNC9">Казахстан</SelectItem>
                            <SelectItem value="VUFF">UAE</SelectItem>
                            <SelectItem value="QvtC70YzRiNCw">Польша</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className={cn("w-full flex flex-col gap-3")}>
                    <Label>Магазин</Label>
                    <Select
                        disabled={offStoresData.length === 0}
                        onValueChange={(value) => {
                            events.offSchemaStoresParamsAction(value)
                        }}
                    >
                        <SelectTrigger className="w-100">
                            <SelectValue placeholder="Выберите магазин"/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                offStoresData.map((storeItem) => (
                                    <SelectItem
                                        value={storeItem?.["key"]}
                                        key={storeItem?.["key"]}>
                                        {storeItem?.["value"]}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                <FormSelectCategories onValueChange={events.offCategoryParamsReducerAction}/>

                <div className={cn("w-full flex flex-col gap-3 md:col-span-2")}>
                    <Label>Артикул</Label>
                    <Input
                        id={"article"}
                        name={"article"}
                        type={"text"}
                        defaultValue={offArticleParams}
                        onChange={event => events.offSchemaArticleParamsAction(event.target.value)}
                    />
                </div>

                <Button
                    disabled={offSchemaApiLoader || loading}
                    className={cn("w-full")}
                    onClick={() => {
                        if (Object.values(offSchemaReportData || {}).length > 0) events.resetOffSchemaReportDataAction()
                    }}
                >
                    <LoaderButton loading={offSchemaApiLoader || loading}/>
                    Сформировать
                </Button>
            </form>
        </div>
    );
}

export default OfflinePageForm;
