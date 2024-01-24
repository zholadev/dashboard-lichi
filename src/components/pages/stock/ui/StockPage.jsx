'use client'

import React, {useState} from 'react';
import {Heading} from "@/components/shared/uikit/heading";
import {TableData} from "@/components/shared/uikit/table";
import {cn} from "@/lib/utils";
import {Label} from "@/components/shared/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/ui/popover";
import {Button} from "@/components/shared/ui/button";
import {CalendarIcon} from "lucide-react";
import {addDays, format} from "date-fns";
import {Calendar} from "@/components/shared/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shared/ui/select";
import {Input} from "@/components/shared/ui/input";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @todo refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function StockPage({data}) {
    const [date, setDate] = useState({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    return (
        <>
            <Heading type={"h2"}>Состояние склада</Heading>
            <div className={cn("border mb-20 p-4 rounded mt-3")}>
                <form className={cn("grid gap-10 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 mb-5 items-end")}>
                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Режим</Label>
                        <Select>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder="Выберите"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ru">Группировка по размеру</SelectItem>
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

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Наименование</Label>
                        <Input defaultValue={'Наименование'}/>
                    </div>


                    <div className={cn("w-full flex flex-col gap-3 col-span-2")}>
                        <Label>Артикул</Label>
                        <Input defaultValue={'Артикул'}/>
                    </div>

                    <Button className={cn("w-full")}>Сформировать</Button>
                </form>
            </div>
            <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
                {/*<TableData data={data}/>*/}
            </div>
        </>
    );
}

export default StockPage;
