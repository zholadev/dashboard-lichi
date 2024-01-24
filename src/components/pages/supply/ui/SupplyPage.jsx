'use client'

import React, {useState} from 'react';
import {Heading} from "@/components/shared/uikit/heading";
import {cn} from "@/lib/utils";
import {addDays, format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Label} from "@/components/shared/ui/label";
import {Button} from "@/components/shared/ui/button";
import {Badge} from "@/components/shared/ui/badge"
import {Calendar} from "@/components/shared/ui/calendar";
import {kanbanData} from "@/components/shared/data/kanban";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shared/ui/select";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @todo refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function SupplyPage(props) {
    const [date, setDate] = useState({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    return (
        <>
            <Heading type={"h1"}>Поставки</Heading>

            <div className={cn("border mb-20 p-4 rounded mt-3")}>
                <form className={cn("grid gap-10 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-5 items-end")}>
                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Сеть</Label>
                        <Select>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder="Выберите"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ru">Россия</SelectItem>
                                <SelectItem value="kz">Казахстан</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Выберите начало и конец</Label>
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

                    <Button className={cn("w-full")}>Сформировать</Button>
                </form>
            </div>

            <div className={cn("border mb-20 p-4 rounded mt-3")}>
                <div
                    className={cn("grid gap-4 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 justify-start grid-cols-1 mb-5 items-end")}>
                    {
                        Object.entries(kanbanData || {}).map(([key, value], index) => {
                            return (
                                <div key={index} className={cn("w-full border rounded p-4 h-full hover:shadow-md transition-shadow duration-400 will-change-auto ease-in-out")}>
                                    <div className={cn("flex items-center justify-between gap-10 mb-2 text-xs")}>
                                        <span className={cn("text-gray-500")}>{value?.label}</span>
                                        <span>{value?.sub_label}</span>
                                    </div>
                                    <div className={cn(`w-full h-[2px] mb-4`)} style={{backgroundColor: value.color}}></div>

                                    {
                                        value?.items &&
                                        <div className={cn("flex items-center gap-3 flex-wrap")}>
                                            {
                                                value?.items.map((product, id) => {
                                                    return (
                                                        <Badge className={cn("cursor-pointer select-none")} key={id} variant={"secondary"}>{product.label}</Badge>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default SupplyPage;
