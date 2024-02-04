'use client'

import React, {useEffect} from 'react';
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {ru} from 'date-fns/locale'
import {CalendarIcon} from "lucide-react";
import {Button} from "@/components/shared/shadcn/ui/button";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {Calendar} from "@/components/shared/shadcn/ui/calendar";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {useApiRequest, useDispatchActionHandle, useToastMessage} from "@/components/shared/hooks";
import {apiGetOfflinePlanData} from "@/components/shared/services/axios/clientRequests";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/shadcn/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/shared/shadcn/ui/select";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @last-updated 30.01.2024 - Zholaman Zhumanov
 * @update-description loader actions is added and store updated
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePlanPageForm(props) {
    const {apiFetchHandler} = useApiRequest()

    const toastMessage = useToastMessage()
    const events = useDispatchActionHandle()

    const {offPlanApiLoader, offPlanCategoryParams, offPlanDateParams} = useAppSelector(state => state.offline_plan)

    const fetchOfflinePlan = async (e) => {
        if (e) e.preventDefault()

        if (!offPlanCategoryParams || !offPlanDateParams) {
            toastMessage("Заполните данные", "error")
            return
        }

        await apiFetchHandler(
            apiGetOfflinePlanData,
            [offPlanCategoryParams, format(offPlanDateParams, 'MM/yyyy')],
            events.offPlanApiLoaderReducerAction,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.offlinePlanDataAction(params.data)
                    }
                }
            }
        )
    }

    useEffect(() => {
        return () => {
            events.resetOfflinePlanAction()
        }
    }, []);

    return (
        <form
            onSubmit={fetchOfflinePlan}
            className={cn("w-100 border 2xl:gap-10 gap-5 grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between items-center p-4 mb-10")}>
            <Select onValueChange={value => events.offPlanCategoryParamsAction(value)}>
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
                            !offPlanDateParams && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {offPlanDateParams ? format(offPlanDateParams, "yyyy-MM") : <span>Выберите дату</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={offPlanDateParams}
                        onSelect={value => events.offPlanDateParamsAction(value)}
                        initialFocus
                        locale={ru}
                    />
                </PopoverContent>
            </Popover>

            <Button>
                <LoaderButton loading={offPlanApiLoader}/>
                Показать
            </Button>
        </form>
    );
}

export default OfflinePlanPageForm;
