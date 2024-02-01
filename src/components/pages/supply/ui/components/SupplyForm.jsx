'use client'

import React, {useEffect} from 'react';
import {cn} from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/shared/shadcn/ui/select";
import {Label} from "@/components/shared/shadcn/ui/label";
import {Button} from "@/components/shared/shadcn/ui/button";
import SupplyKanbanContainer from "./SupplyKanbanContainer";
import {LoaderButton} from "@/components/shared/uikit/loader";
import useYearWeeks from "@/components/pages/supply/lib/useYearWeeks";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {apiGetSupplyKanbanData, apiGetSupplyNetworkData} from "@/components/shared/services/axios/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @todo refactoring
 * @todo state get by redux
 * @returns {JSX.Element}
 * @constructor
 */
function SupplyForm() {

    const events = useDispatchActionHandle()

    const {apiFetchHandler} = useApiRequest()

    const yearWeakData = useYearWeeks(new Date().getFullYear())

    const {
        kanbanData,
        countryData,
        kanbanDataLoader,
        supplySheetToggle,
        supplyParamsColumnWeekId,
        supplyParamsNetworkId,
        supplyKanbanColumnData,
        supplyParamsDateStartData,
        supplyParamsDateEndData,
        supplyParamsDateStart,
        supplyParamsDateEnd
    } = useAppSelector(state => state.supply)
    const fetchSupplyCountryData = async () => {
        await apiFetchHandler(
            apiGetSupplyNetworkData,
            [],
            events.supplyCountryLoader,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.supplyCountryDataHandle(params.data?.["list"])
                    }
                }
            }
        )
    }

    const fetchSupplyKanbanData = async (event, disabledLoader) => {
        if (event) event?.preventDefault()

        await apiFetchHandler(
            apiGetSupplyKanbanData,
            [
                supplyParamsNetworkId?.toString(),
                {
                    start: supplyParamsDateStart,
                    end: supplyParamsDateEnd
                }
            ],
            events.supplyKanbanLoader,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.supplyDateKanbanDataHandle(params.data)
                    }
                },
                disableLoading: false,
                offLoader: disabledLoader
            }
        )
    }

    useEffect(() => {
        try {
            if (Object.values(yearWeakData || {}).length > 0) {
                events.supplyParamsDateStartDataAction([...yearWeakData?.past, ...yearWeakData?.now])
                events.supplyParamsDateEndDataAction([...yearWeakData?.now, ...yearWeakData?.next])
            }
        } catch (error) {
            errorHandler("supplyForm", "effect", error)
        }
    }, [yearWeakData]);

    useEffect(() => {
        if (countryData.length === 0) {
            fetchSupplyCountryData()
        }
    }, [countryData]);

    return (
        <>
            <div className={cn("border mb-20 p-4 rounded mt-3")}>
                <form
                    onSubmit={event => fetchSupplyKanbanData(event)}
                    className={cn("grid gap-10 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 mb-5 items-end")}>
                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Сеть</Label>
                        <Select
                            onValueChange={(value) => events.supplyParamsNetworkIdAction(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={"Выберите страну"}/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    Object.values(countryData || {}).map((country, id) => {
                                        return (
                                            <SelectItem
                                                key={country?.["key"]}
                                                value={country?.["key"]}
                                            >
                                                {country?.["value"]}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Начало</Label>
                        <Select onValueChange={value => events.supplyParamsDateStartAction(value)}>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder={"Выберите"}/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    Object.values(supplyParamsDateStartData || {})?.map((item, id) => (
                                        <SelectGroup key={id}>
                                            <SelectLabel className={"mb-2 text-lg"}>{item?.["month"]}</SelectLabel>
                                            {
                                                item?.["weeks"]?.map((week, weekId) => {
                                                    return (
                                                        <SelectItem key={weekId} value={week}>{week}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Конец</Label>
                        <Select onValueChange={value => events.supplyParamsDateEndAction(value)}>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder={"Выберите"}/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    Object.values(supplyParamsDateEndData || {})?.map((item, id) => (
                                        <SelectGroup key={id}>
                                            <SelectLabel className={"mb-2 text-lg"}>{item?.["month"]}</SelectLabel>
                                            {
                                                item?.["weeks"]?.map((week, weekId) => {
                                                    return (
                                                        <SelectItem key={weekId} value={week}>{week}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        type={"submit"}
                        className={cn("w-full")}
                    >
                        <LoaderButton loading={kanbanDataLoader}/>
                        Сформировать
                    </Button>
                </form>
            </div>

            <SupplyKanbanContainer
                kanbanData={kanbanData}
                kanbanLoading={kanbanDataLoader}
                updateKanbanData={fetchSupplyKanbanData}
            />
        </>
    );
}

export default SupplyForm;
