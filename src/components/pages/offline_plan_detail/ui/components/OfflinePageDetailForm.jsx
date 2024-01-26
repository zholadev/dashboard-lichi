'use client'

import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {CalendarIcon} from "lucide-react";
import {Button} from "@/components/shared/shadcn/ui/button";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {Calendar} from "@/components/shared/shadcn/ui/calendar";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/shadcn/ui/popover";
import {apiGetOfflinePlanDetailData} from "@/components/shared/services/axios/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageDetailForm(props) {
    const {id} = props

    const {apiFetchHandler} = useApiRequest()

    const events = useDispatchActionHandle()

    const {offPlanDetailApiLoader} = useAppSelector(state => state.offline_plan)

    const [date, setDate] = useState(null)

    const fetchOfflinePlan = async (e) => {
        if (e) e.preventDefault()
        await apiFetchHandler(
            apiGetOfflinePlanDetailData,
            [id, "03/2023"],
            events.offlinePlanDetailApiLoader,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.offlinePlanDetailGetData(params.data)
                    }
                }
            }
        )
    }

    useEffect(() => {
        fetchOfflinePlan()
    }, []);

    return (
        <form
            onSubmit={fetchOfflinePlan}
            className={cn("w-100 border 2xl:gap-10 gap-5 grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between items-center p-4 mb-10")}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "justify-start text-left font-normal col-span-2",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {date ? format(date, "yyyy-mm") : <span>Выберите дату</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        locale={ru}
                    />
                </PopoverContent>
            </Popover>

            <Button className={cn("col-span-1")}>
                <LoaderButton loading={offPlanDetailApiLoader}/>
                Показать
            </Button>
        </form>
    );
}

export default OfflinePageDetailForm;
