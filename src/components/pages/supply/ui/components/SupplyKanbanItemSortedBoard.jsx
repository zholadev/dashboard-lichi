'use client'

import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {MoveIcon} from "@radix-ui/react-icons";
import {Heading} from '@/components/shared/uikit/heading'
import {NotData} from "@/components/shared/uikit/templates";
import {Button} from "@/components/shared/shadcn/ui/button";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {useApiRequest, useToastMessage} from "@/components/shared/hooks";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {apiSupplyKanbanSortItems} from "@/components/shared/services/axios/clientRequests";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/shared/shadcn/ui/dialog";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 04.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function SupplyKanbanItemSortedBoard(props) {
    const {data = [], open, onOpenChange, weekId, updateKanbanData} = props

    const {
        supplyParamsNetworkId
    } = useAppSelector(state => state?.supply)

    const toastMessage = useToastMessage()
    const {apiFetchHandler, loading} = useApiRequest()

    const [sortedData, setSortedData] = useState([...data])

    console.log("data", data)
    console.log("sortedData", sortedData)

    /**
     * @author Zholaman Zhumanov
     * @created 04.02.2024
     * @description Функция выполняет форматирование уже сортированную данных в нужный формат и отправляет в Api запрос
     * @description пример форматирование {34: 1, 35: 2, 45: 3}
     * @returns {Promise<void>}
     */
    const sortedIsSetHandle = async () => {
        const goods = [...sortedData]

        const newGoods = goods.reduce((acc, cur, index) => {
            acc[cur?.sk_id] = index + 1;
            return acc;
        }, {});

        await fetchSaveSortedData(newGoods)
    }

    const fetchSaveSortedData = async (sort) => {
        await apiFetchHandler(
            apiSupplyKanbanSortItems,
            [supplyParamsNetworkId, weekId, sort],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        setSortedData([])
                        onOpenChange()
                        updateKanbanData()
                    }
                }
            }
        )
    }

    useEffect(() => {
        setSortedData(data)
    }, [data]);

    /**
     * @author Zholaman Zhumanov
     * @createdf 04.02.2024
     * @description Функция выполняет сортировку перемещение между товарами
     * @param res
     */
    const onDragEnd = (res) => {
        try {
            console.log('res', res)
            if (res.destination) {
                const draggableId = res?.draggableId
                const droppableIndex = res?.destination?.index
                const droppableIdSourceIndex = res?.source?.index

                const getCurrentItem = Object.values(data || {})?.findIndex(item => item?.sk_id === parseInt(draggableId))

                if (getCurrentItem === -1) {
                    toastMessage("Id не найден, обратитесь разработчику", "error")
                    return
                }

                const newGoods = [...data]

                if (getCurrentItem !== -1) {
                    const item = newGoods[droppableIdSourceIndex];
                    newGoods.splice(droppableIdSourceIndex, 1);
                    newGoods.splice(droppableIndex, 0, item);
                }

                setSortedData(newGoods)
            }
        } catch (error) {
            errorHandler("kanbanSortedSupply", "onDragEnd", error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={cn("overflow-hidden")}>
                <DialogHeader>
                    <DialogTitle className={cn("mb-3")}>Сортировать товар</DialogTitle>
                </DialogHeader>

                <div className={cn("overflow-y-auto overflow-x-hidden")}>
                    {
                        Object.values(data || {}).length === 0 ? (
                            <NotData/>
                        ) : (
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="goods_sorted" type={"vertical"}>
                                    {(provided, snapshot) => (
                                        <ul className={cn("max-w-[700px] overflow-auto")}
                                            style={{
                                                maxHeight: Object.values(data || {}).length === 7 ? 'calc(100% - 10%)' : 'h-full'
                                            }}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}>
                                            {
                                                Object.values(sortedData || {}).map((goods, id) => {
                                                    return (
                                                        <Draggable
                                                            key={id}
                                                            draggableId={goods?.sk_id?.toString()}
                                                            index={id}
                                                        >
                                                            {
                                                                (provided, snapshot) => (
                                                                    <li key={id}
                                                                        className={cn("border select-none rounded mb-5 p-4 flex items-center gap-5", snapshot?.isDragging ? "bg-green-300" : "")}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        ref={provided.innerRef}>
                                                                        <MoveIcon/>
                                                                        <div className={cn("flex flex-col gap-1")}>
                                                                            <Heading
                                                                                type={'h5'} cls={cn("mb-0")}>
                                                                                {goods?.["sk_item_id"]}
                                                                            </Heading>
                                                                        </div>
                                                                    </li>
                                                                )
                                                            }

                                                        </Draggable>
                                                    )
                                                })
                                            }
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>

                                <div className={cn("w-full flex flex-row flex-wrap gap-4 mt-4")}>
                                    <Button variant={"outline"} onClick={onOpenChange}>Отменить</Button>
                                    <Button className={cn("flex items-center gap-3")} onClick={sortedIsSetHandle}>
                                        <LoaderButton loading={loading}/>
                                        Сохранить
                                    </Button>
                                </div>
                            </DragDropContext>
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SupplyKanbanItemSortedBoard;
