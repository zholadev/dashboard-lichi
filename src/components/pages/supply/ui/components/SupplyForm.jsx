'use client'

import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {apiGetSupplyKanbanData, apiGetSupplyNetworkData} from "@/components/shared/services/axios/clientRequests";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {LoaderButton} from "@/components/shared/uikit/loader";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @todo refactoring
 * @todo state get by redux
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function SupplyForm(props) {
    const {} = props

    const events = useDispatchActionHandle()

    const {apiFetchHandler} = useApiRequest()

    const kanbanData = useAppSelector(state => state.supply.kanbanData)
    const countryData = useAppSelector(state => state.supply.countryData)
    const kanbanDataLoader = useAppSelector(state => state.supply.kanbanDataLoader)
    const countryDataLoader = useAppSelector(state => state.supply.countryDataLoader)

    const [countryValue, setCountryValue] = useState(2)
    const [dateValue, setDateValue] = useState("2023-1")
    const [dateEndValue, setDateEndValue] = useState("2024-21")

    const getCurrentNetworkData = useMemo(() => {
        try {
            return countryData.filter((item) => item?.["key"] === kanbanData?.["network_id"])
        } catch (error) {
            errorHandler("supplyForm", "func/getCurrentNetworkData", error)
        }
    }, [kanbanData, countryData])

    const getSelectNetworkData = useCallback((value) => {
        try {
            const current = countryData.filter((item) => item?.["value"] === value)
            setCountryValue(current?.[0]?.["key"])
        } catch (error) {
            errorHandler("supplyForm", "func/getCurrentNetworkData", error)
        }
    }, [kanbanData, countryData])

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
        if (event) {
            event?.preventDefault()
        }

        await apiFetchHandler(
            apiGetSupplyKanbanData,
            [
                countryValue.toString(),
                {
                    start: dateValue,
                    end: dateEndValue
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
        if (countryData.length === 0) {
            fetchSupplyCountryData()
        }
    }, [countryData]);

    useEffect(() => {
        if (kanbanData.length === 0 && countryData.length > 0) {
            fetchSupplyKanbanData()
        }
    }, [kanbanData, countryData]);

    return (
        <>
            <div className={cn("border mb-20 p-4 rounded mt-3")}>
                <form
                    onSubmit={event => fetchSupplyKanbanData(event)}
                    className={cn("grid gap-10 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 mb-5 items-end")}>
                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Сеть</Label>
                        <Select
                            defaultValue={getCurrentNetworkData?.[0]}
                            onValueChange={(value) => getSelectNetworkData(value)}>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder={"Выберите"}/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    countryData.map((country) => (
                                        <SelectItem
                                            key={country?.["key"]}
                                            value={country?.["value"]}
                                        >
                                            {country?.["value"]}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Начало</Label>
                        <Select onValueChange={value => setDateValue(value)}>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder={"Выберите"}/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    Object.entries(kanbanData?.["kanban"] || {})?.map(([key, value], id) => (
                                        <SelectGroup key={id}>
                                            <SelectLabel>{value?.["sub_label"]}</SelectLabel>
                                            <SelectItem
                                                value={key}
                                            >
                                                {key}
                                            </SelectItem>
                                        </SelectGroup>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={cn("w-full flex flex-col gap-3")}>
                        <Label>Конец</Label>
                        <Select onValueChange={value => setDateEndValue(value)}>
                            <SelectTrigger className="w-100">
                                <SelectValue placeholder={"Выберите"}/>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    Object.entries(kanbanData?.["kanban"] || {})?.map(([key, value], id) => {
                                        return (
                                            <SelectGroup key={id}>
                                                <SelectLabel>{value?.["sub_label"]}</SelectLabel>
                                                <SelectItem
                                                    value={key}
                                                >
                                                    {key}
                                                </SelectItem>
                                            </SelectGroup>
                                        )
                                    })
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        type={"submit"}
                        className={cn("w-full")}
                    >
                        <LoaderButton loading={kanbanDataLoader} />
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
