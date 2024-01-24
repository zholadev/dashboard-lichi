'use client'

import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import { format } from "date-fns"
import {CalendarIcon} from "lucide-react";
import {Button} from "@/components/shared/ui/button";
import {Calendar} from "@/components/shared/ui/calendar";
import {Heading} from "@/components/shared/uikit/heading";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/shared/ui/select"


/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function OfflinePlanPage(props) {
    const [date, setDate] = useState()

    return (
        <>
            <div className={"w-100"}>
                <Heading type={"h1"}>План продаж</Heading>

                <form className={cn("w-100 border 2xl:gap-10 gap-5 grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between items-center p-4")}>
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

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {date ? format(date, "PPP") : <span>Выберите дату</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    <Button>Показать</Button>
                </form>
            </div>
        </>
    );
}

export default OfflinePlanPage;
