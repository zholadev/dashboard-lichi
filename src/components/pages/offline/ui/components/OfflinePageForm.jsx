'use client'

import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import {addDays, format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Input} from "@/components/shared/shadcn/ui/input";
import {Label} from "@/components/shared/shadcn/ui/label";
import {Button} from "@/components/shared/shadcn/ui/button";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {Calendar} from "@/components/shared/shadcn/ui/calendar";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {apiGetOfflineSchemaDetail} from "@/components/shared/services/axios/clientRequests";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/shadcn/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shared/shadcn/ui/select";

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

    const {apiFetchHandler, loading} = useApiRequest()

    const {offSchemaData, offSchemaReportData, offSchemaApiLoader} = useAppSelector(state => state?.offline)

    const [date, setDate] = useState({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    const fetchGetAllSchemaReportData = async (e) => {
        if (e) e.preventDefault()

        Object.values(offSchemaData?.["schema"] || {}).map((schema, index) => {
            const timer = 400 * index
            Object.values(schema?.["content"] || {}).map((content) => {
                setTimeout(() => {
                    fetchOfflineSchema(e, content, content)
                }, timer)
            })
        })
    }

    const fetchOfflineSchema = async (e, schema_type, name) => {
        if (e) e.preventDefault()

        await apiFetchHandler(
            apiGetOfflineSchemaDetail,
            [schema_type],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.offSchemaReportGetData(params.data)
                    }
                }
            }
        )
    }

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
                            <SelectItem value="by_day">По дням</SelectItem>
                            <SelectItem value="by_month">По месяцам</SelectItem>
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
                    <Select disabled={true}>
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

                <Button
                    disabled={offSchemaApiLoader || loading}
                    className={cn("w-full")}>
                    <LoaderButton loading={offSchemaApiLoader || loading}/>
                    Сформировать
                </Button>
            </form>
        </div>
    );
}

export default OfflinePageForm;
