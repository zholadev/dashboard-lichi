import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import SupplyKanbanLoading from "./SupplyKanbanLoading";
import {Badge} from "@/components/shared/shadcn/ui/badge";
import {NotData} from "@/components/shared/uikit/templates";
import {Button} from "@/components/shared/shadcn/ui/button";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {apiGetKanbanColumnData, apiUpdateSupplyKanbanData} from "@/components/shared/services/axios/clientRequests";
import SupplyKanbanColumnSheet from "@/components/pages/supply/ui/components/SupplyKanbanColumnSheet";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/shared/shadcn/ui/tooltip"
import {useAppSelector} from "@/components/entities/store/hooks/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @todo refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function SupplyKanbanContainer(props) {
    const {kanbanData, kanbanLoading, updateKanbanData} = props

    const events = useDispatchActionHandle()

    const {apiFetchHandler} = useApiRequest()

    const {
        supplyParamsNetworkId
    } = useAppSelector(state => state?.supply)

    const [animateUpdate, setAnimateUpdate] = useState(false)
    const [selectItem, setSelectItem] = useState({})

    const toggleHoverPut = () => setAnimateUpdate(!animateUpdate)

    const updateSupplyDataHandler = async (data) => {
        try {
            const id = data?.["id"]

            if (selectItem?.["data"]?.["id"] === id) {
                setAnimateUpdate(false)
                setSelectItem(false)
                return
            }

            if (Array.isArray(data?.["items"])) {
                const ids = data?.["items"]?.map(item => item.id)
                ids.push(selectItem?.["id"])
                await fetchUpdateSupplyItem(ids, id)
            } else {
                await fetchUpdateSupplyItem([selectItem?.["id"]], id)
            }
        } catch (error) {
            errorHandler("supplyKanbanContainer", "updateSupplyDataHandler", error)
        }
    }

    const fetchUpdateSupplyItem = async (data, id) => {
        await apiFetchHandler(
            apiUpdateSupplyKanbanData,
            [data, id],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        updateKanbanData(false, true)
                    }

                    setAnimateUpdate(false)
                    setSelectItem(false)
                }
            }
        )
    }

    const fetchGetKanbanColumnData = async (weekId) => {
        await apiFetchHandler(
            apiGetKanbanColumnData,
            [supplyParamsNetworkId, weekId],
            events.supplyKanbanColumnApiLoaderAction,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.supplyKanbanColumnDataAction(params.data?.["items"])
                    }
                }
            }
        )
    }

    if (kanbanLoading) {
        return <SupplyKanbanLoading loading={kanbanLoading}/>
    }

    if (Object.values(kanbanData?.["kanban"] || {}).length === 0) {
        return <NotData/>
    }

    return (
        <div className={cn("border mb-20 p-4 rounded mt-3")}>
            <div
                className={cn("grid gap-4 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 justify-start grid-cols-1 mb-5 items-end")}>
                {
                    Object.entries(kanbanData?.["kanban"] || {}).map(([key, value], index) => {
                        return (
                            <div key={index}
                                 className={
                                     cn("w-full border cursor-pointer z-10 relative rounded p-4 h-full hover:shadow-md transition-shadow duration-400 will-change-auto ease-in-out",
                                         animateUpdate ? "hover:scale-110 transition-all duration-300 ease-in-out" : ""
                                     )
                                 }
                                 onClick={() => {
                                     if (!animateUpdate) return
                                     updateSupplyDataHandler(value)
                                 }}
                            >
                                <div
                                    className={
                                        cn(
                                            "w-full h-full absolute flex items-center flex-col gap-8 justify-center top-0 left-0 hover:bg-white hover:bg-opacity-50 transition-all duration-100",
                                            animateUpdate ? "flex" : "hidden visible-hidden opacity-0"
                                        )
                                    }
                                >
                                    <Button
                                        size={'large'}
                                        className={cn("hidden")}>
                                        Бросить сюда
                                    </Button>

                                    <Button
                                        size={'large'}
                                        variant={"outline"}
                                        className={cn("hidden")}
                                        onClick={toggleHoverPut}>
                                        Отмена
                                    </Button>
                                </div>
                                <SupplyKanbanColumnSheet
                                    week={value?.sub_label}
                                    weekId={value?.id}
                                    year={value?.label}
                                >
                                    <div
                                        onClick={() => fetchGetKanbanColumnData(value?.id)}
                                        className={cn("flex items-center justify-between gap-10 mb-2 text-xs")}
                                    >
                                        <span
                                            className={cn("text-gray-500")}>
                                            {value?.label}
                                        </span>

                                        <span>{value?.sub_label}</span>
                                    </div>
                                </SupplyKanbanColumnSheet>
                                <div className={cn(`w-full h-[2px] mb-4`)}
                                     style={{backgroundColor: value.color}}></div>

                                {
                                    value?.items &&
                                    <div className={cn("flex items-center gap-3 flex-wrap")}>
                                        {
                                            value?.items.map((product, id) => {
                                                return (
                                                    <TooltipProvider key={id}>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <Badge
                                                                    className={cn("cursor-pointer select-none hover:scale-110 transition-transform duration-100 ease-in-out")}
                                                                    variant={"secondary"}
                                                                    onClick={() => {
                                                                        setSelectItem({
                                                                            "id": product.id,
                                                                            "data": value
                                                                        })
                                                                        toggleHoverPut()
                                                                    }}
                                                                >
                                                                    {product.label}
                                                                </Badge>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Нажмите чтобы переместить</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

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
    );
}

export default SupplyKanbanContainer;


// kanban_item_save
// {
//     "sk_id": "",
//     "sk_item_id": "sddsd",
//     "sk_network_id": "1",
//     "sk_week_id": "2024-05"
// }
