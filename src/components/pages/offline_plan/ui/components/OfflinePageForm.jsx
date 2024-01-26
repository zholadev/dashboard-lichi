'use client'

import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {ru} from 'date-fns/locale'
import {CalendarIcon} from "lucide-react";
import {Button} from "@/components/shared/shadcn/ui/button";
import {Calendar} from "@/components/shared/shadcn/ui/calendar";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {apiGetOfflinePlanData} from "@/components/shared/services/axios/clientRequests";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/shadcn/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shared/shadcn/ui/select";
import {LoaderButton} from "@/components/shared/uikit/loader";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @todo refactoring
 * @todo loader for actions
 * @todo getOfflinePlanPlanDateParams
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageForm(props) {
    const {apiFetchHandler} = useApiRequest()

    const events = useDispatchActionHandle()

    const {apiLoader, category, planDate} = useAppSelector(state => state.offline_plan)

    const [date, setDate] = useState(null)

    const fetchOfflinePlan = async (e) => {
        if (e) e.preventDefault()
        await apiFetchHandler(
            apiGetOfflinePlanData,
            [category, format(date, 'MM/yyyy')],
            events.offlinePlanApiLoader,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.offlinePlanGetData(params.data)
                    }
                }
            }
        )
    }

    return (
        <form
            onSubmit={fetchOfflinePlan}
            className={cn("w-100 border 2xl:gap-10 gap-5 grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between items-center p-4 mb-10")}>
            <Select onValueChange={value => events.offlineCategoryParams(value)}>
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

            <Button>
                <LoaderButton loading={apiLoader}/>
                Показать
            </Button>
        </form>
    );
}

export default OfflinePageForm;
