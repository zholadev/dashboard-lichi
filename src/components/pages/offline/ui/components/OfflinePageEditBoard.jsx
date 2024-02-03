import React, {useCallback, useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {Button} from "@/components/shared/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/shared/shadcn/ui/dropdown-menu";
import {offlineChartList} from "@/components/shared/data/charts";
import {MoveIcon, PlusIcon, TrashIcon} from "@radix-ui/react-icons";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {useDispatchActionHandle, useToastMessage} from "@/components/shared/hooks";
import OfflinePageEditToolbar from "@/components/pages/offline/ui/components/OfflinePageEditToolbar";

/**
 * @author Zholaman Zhumanov
 * @created 31.01.2024
 * @returns {Element}
 * @constructor
 */
function OfflinePageEditBoard() {
    const toastMessage = useToastMessage()
    const events = useDispatchActionHandle()

    const {
        offEditBoard,
        offSchemaData,
        offBoardUseList,
        offDragStartBoard,
        offBoardNotUseList,
        offSchemaReportData,
        offBoardReportUseData,
        offSchemaContainerData
    } = useAppSelector(state => state?.offline)

    const [useListBoard, setUseListBoard] = useState({})

    const toggleDrag = (value) => events.offDragStartBoardAction(value)

    const onDragStart = () => toggleDrag(true)

    const schemaHideSavesLocalStorage = localStorage.getItem("schema_hide_reports_saves")
    const schemaShowSavesLocalStorage = localStorage.getItem("schema_show_reports_saves")

    const saveSchemaHandle = () => {
        localStorage.setItem("schema_hide_reports_saves", JSON.stringify(offBoardNotUseList))
        localStorage.setItem("schema_show_reports_saves", JSON.stringify(useListBoard))
    }

    const checkListIncludes = (result) => {
        const getItem = offBoardUseList.filter((item) => item?.key == result?.draggableId)
        if (getItem.length > 0) return true
    }

    const findItemData = (obj) => {
        if (obj.hasOwnProperty('data')) {
            return obj.data;
        }
        for (let key in obj) {
            if (typeof (obj[key]) === 'object') {
                let foundData = findItemData(obj[key]);
                if (foundData) return foundData;
            }
        }
        return null;
    }

    /**
     * @author Zholaman Zhumanov
     * @created 02.02.2024
     * @description Удаление перемещенного элемента с не используемых
     * @param dropId
     */
    const cutOffUnnecessaryElements = (dropId) => {
        try {
            const cutOffUnnecessaryElements = Object.values(offBoardNotUseList || {}).filter((item) => item?.key !== dropId)
            events.offBoardNotUseListAction([...cutOffUnnecessaryElements])
        } catch (error) {
            errorHandler("offlinePageEditBoard", "func/cutOffUnnecessaryElements", `__error: ${error}`)
        }
    }

    /**
     * @author Zholaman Zhumanov
     * @created 02.02.2024
     * @description Перемещение в не используемых компонентов и удаление и активного
     * @param fromContainerId
     * @param itemType
     * @param containerIsRemoved
     */
    const moveElementToNotUsed = (fromContainerId, itemType, containerIsRemoved) => {
        const useElements = useListBoard

        // Верните ключи для fromContainer using Array.prototype.find
        const fromKey = Object.keys(useElements).find(key => useElements[key].container === fromContainerId);

        // Проверяем, не является ли индекс недействительным
        if (!fromKey) {
            toastMessage("Invalid container ID", "error");
            return;
        }

        const fromContainer = useElements[fromKey];
        const itemKey = Object.keys(fromContainer.items).find(key => fromContainer.items[key].type === itemType);

        if (!itemKey) {
            toastMessage(`No item of type "${itemType}" found in container ${fromContainerId}`, "error");
            return;
        }

        // save the moved item and remove it from the fromContainer
        const movedItem = fromContainer.items[itemKey];
        delete fromContainer.items[itemKey];

        // Push the movedItem to notUseElements in correct format
        events.offBoardNotUseListAction(
            [
                ...offBoardNotUseList,
                {
                    id: movedItem.data.id,
                    title: movedItem.data.title,
                    key: movedItem.data.key
                }
            ]
        );

        if (!containerIsRemoved) {
            setUseListBoard(prevState => ({
                ...prevState,
                [fromKey]: fromContainer
            }));
        } else {
            const getOtherElements = Object.values(useListBoard || {}).filter((item) => item?.container !== fromContainerId)
            setUseListBoard(getOtherElements)
        }
    }

    /**
     * @author Zholaman Zhumanov
     * @created 02.02.2024
     * @description Сохранение новых данных для дэшборда (показ в доске)
     * @param container
     * @param containerId
     * @param getCurrentData
     * @param itemType
     * @returns {*}
     */
    const savingTypes = useCallback((container, containerId, getCurrentData, itemType) => {
        try {
            return {
                ...container[containerId]?.items,
                [itemType]: {
                    "id": itemType,
                    "type": itemType,
                    "data": getCurrentData?.[0]
                }
            }

        } catch (error) {
            errorHandler("offlinePageEditBoard", "func/savingTypes", `__error: ${error}`)
        }
    }, [useListBoard, offBoardNotUseList])

    /**
     * @author Zholaman Zhumanov
     * @created 02.02.2024
     * @desciption Удаление контейнера по id с обьекта активных в доске
     * @type {(function(*): void)|*}
     */
    const deleteContainer = useCallback((id) => {
        try {
            const fromContainer = Object.values(useListBoard || {})?.filter((item) => item?.container === id);

            if (!fromContainer) {
                toastMessage("Invalid container ID - func/deleteContainer", "error");
                return;
            }

            if (Object.values(fromContainer?.[0]?.items || {}).length > 0) {
                Object.values(fromContainer?.[0]?.items || {}).map((value) => {
                    const itemType = value.type;
                    moveElementToNotUsed(id, itemType, true);
                });
            } else {
                const getOtherElements = Object.values(useListBoard || {}).filter((item) => item?.container !== id)
                setUseListBoard(getOtherElements)
            }
        } catch (error) {
            errorHandler("editBoard", "deleteContainer", error)
        }
    }, [useListBoard, offBoardNotUseList])

    /**
     * @author Zholaman Zhumanov
     * @created 02.02.2024
     * @description перемещение между активными досками
     * @param result
     * @param itemType
     * @param fromContainerId
     * @param toContainerId
     */
    const moveItemsBetweenContainerTest = useCallback((result, itemType, fromContainerId, toContainerId) => {
        try {
            // найти данные от и из контейнера
            const fromKey = Object.keys(useListBoard).find(key => useListBoard[key].container === fromContainerId);
            const toKey = Object.keys(useListBoard).find(key => useListBoard[key].container === toContainerId);

            if (!fromKey || !toKey) {
                toastMessage("Invalid container IDs", "error");
                return;
            }

            const fromContainer = useListBoard[fromKey];
            const toContainer = useListBoard[toKey];

            // Найти items из данных
            const itemKey = Object.keys(fromContainer.items).find(key => fromContainer.items[key].type === itemType);

            // Проверка есть ли данные items и внутри элемент
            if (toContainer.items[itemKey]) {
                toastMessage("Уже содержится выберите другой", "info")
                return;
            }

            if (!itemKey) {
                toastMessage(`No item of type "${itemType}" found in container ${fromContainerId}`, "error");
                return;
            }

            // Сохраенение новых данных
            const movedItem = fromContainer.items[itemKey];
            delete fromContainer.items[itemKey];
            toContainer.items[itemKey] = movedItem;
        } catch (error) {
            errorHandler("offlinePageEditBoard", "func/moveItemsBetweenContainerTest", `__error: ${error}`)
        }
    }, [useListBoard, offBoardNotUseList])

    const saveDataToAContainer = useCallback((droppableData) => {
        try {
            const {containerId, grid, itemType, dropId} = droppableData

            const getCurrentItemData = offlineChartList.filter((item) => item?.key == dropId)

            setUseListBoard(container => {
                return {
                    ...container,
                    [containerId]: {
                        "container": containerId,
                        "grid": parseInt(grid),
                        "items": savingTypes(container, containerId, getCurrentItemData, itemType),
                    }
                }
            })
        } catch (error) {
            errorHandler("offlinePageEditBoard", "func/saveDataToAContainer", `__error: ${error}`)
        }
    }, [useListBoard, offBoardNotUseList])

    const onDragEnd = useCallback((res) => {
        try {
            if (!res.destination) return

            const itemDroppableId = res?.draggableId?.split("-")
            const containerData = res?.destination?.droppableId?.split('_')
            const sourceContainerData = res?.source?.droppableId?.split('_')

            if (res?.source?.droppableId === 'schema_hide_reports' && containerData?.[0] === 'container') {
                console.log('forward')
                checkListIncludes(itemDroppableId?.[0])
                cutOffUnnecessaryElements(itemDroppableId?.[0])
                saveDataToAContainer({
                    "containerId": containerData?.[1],
                    "grid": containerData?.[3],
                    "itemType": itemDroppableId?.[0],
                    "dropId": itemDroppableId?.[0],
                })
            } else if (res?.destination?.droppableId === 'schema_hide_reports' && sourceContainerData?.[0] === 'container') {
                console.log('back')
                moveElementToNotUsed(sourceContainerData?.[1], itemDroppableId?.[0])
            } else if (containerData?.[0] === 'container' && sourceContainerData?.[0] === 'container') {
                console.log('between')
                moveItemsBetweenContainerTest(res, itemDroppableId?.[0], sourceContainerData?.[1], containerData?.[1])
            }
        } catch (error) {
            errorHandler("offlinePageEditBoard", "func/onDragEnd", `__error: ${error}`)
        }
    }, [useListBoard, offBoardNotUseList])

    const addNewContainer = useCallback((childCount) => {
        try {
            if (Object.values(useListBoard || {}).length === 0) {
                setUseListBoard({
                    1: {
                        "container": 1,
                        "type": "container",
                        "grid": childCount,
                        "items": []
                    }
                })
            } else {
                setUseListBoard(container => {
                    return {
                        ...container,
                        [Object.values(useListBoard || {}).length + 1]: {
                            "container": Object.values(useListBoard || {}).length + 1,
                            "type": "container",
                            "grid": childCount,
                            "items": []
                        }
                    }
                })
            }
        } catch (error) {
            errorHandler("offlinePageEditBoard", "func/addNewContainer", `__error: ${error}`)
        }
    }, [useListBoard, offBoardNotUseList])

    // Инициализация данных
    const initialDataStates = useCallback(() => {
        try {
            if (Object.values(localStorage.getItem("schema_hide_reports_saves") || {}).length === 0) {
                events.offBoardNotUseListAction([...offlineChartList])
                return
            }

            setUseListBoard(JSON.parse(localStorage.getItem("schema_show_reports_saves")))
            events.offBoardNotUseListAction(JSON.parse(localStorage.getItem("schema_hide_reports_saves")))
        } catch (e) {
            errorHandler("offlinePageEditBoard", "func/initialDataStates", `__error: ${error}`)
        }
    }, [schemaHideSavesLocalStorage, schemaShowSavesLocalStorage])

    useEffect(() => {
        initialDataStates()
    }, [schemaHideSavesLocalStorage, schemaShowSavesLocalStorage])

    return (
        <>
            <OfflinePageEditToolbar confirmDataClick={saveSchemaHandle}/>

            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <Droppable droppableId="schema_hide_reports">
                    {(provided) => (
                        <ul className={
                            cn("w-full border p-4 my-5 flex items-center rounded flex-wrap content-stretch justify-between gap-5",
                                offEditBoard ? "opacity-100 flex" : "opacity-0 hidden"
                            )
                        }
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {Object.values(offBoardNotUseList || {}).map((item, index) => (
                                <Draggable key={item?.key} draggableId={item?.key?.toString()} index={index}>
                                    {(provided) => (
                                        <li className="flex-1 h-full border rounded p-5 cursor-pointer flex items-center gap-3 text-xs"
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}>
                                            <MoveIcon/>
                                            {item.title}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>

                <div
                    className={cn("w-full py-10 mb-10 flex justify-end", offEditBoard ? "opacity-100 flex" : "opacity-0 hidden")}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className={cn("flex items-center gap-2 ")}>
                                Добавить контейнер <PlusIcon/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[150px]">
                            <DropdownMenuLabel>Выберите контейнер</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={() => addNewContainer(1)}>
                                <div className={cn("grid grid-cols-1 p-1 w-full min-w-[100px]")}>
                                    <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>
                                </div>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => addNewContainer(2)}>
                                <div className={cn("grid grid-cols-2 gap-2 p-1 w-full min-w-[100px]")}>
                                    <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>
                                    <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>
                                </div>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => addNewContainer(3)}>
                                <div className={cn("grid grid-cols-3 gap-2 p-1 w-full min-w-[100px]")}>
                                    <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>
                                    <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>
                                    <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {
                    offEditBoard &&
                    Object.values(useListBoard || {})?.map((container, containerId) => {
                        return (
                            <div key={containerId}>
                                <div className={cn("w-full flex justify-end")}>
                                    <Button variant={'secondary'}
                                            onClick={() => deleteContainer(container?.["container"])}><TrashIcon/></Button>
                                </div>
                                <Droppable key={containerId}
                                           droppableId={`container_${containerId + 1}_grid_${container?.grid}`}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div className={
                                                cn(`w-full border p-4 my-5 rounded grid gap-5 grid-cols-${container?.grid} delay-75`,)
                                            }
                                                 {...provided.droppableProps}
                                                 ref={provided.innerRef}
                                            >
                                                {Object.entries(container?.["items"] || {}).map(([key, value], index) => {
                                                    const data = findItemData(value)
                                                    return (
                                                        <Draggable
                                                            key={value?.id}
                                                            draggableId={`${value.type}-id-${container?.container}-${index}`}
                                                            index={index + 1}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        className="h-full border rounded p-5 flex items-center cursor-pointer gap-3 text-xs mb-5"
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        ref={provided.innerRef}>
                                                                        <MoveIcon/>
                                                                        {data?.title}
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                                {
                                                    snapshot.isDraggingOver &&
                                                    <div
                                                        className={cn("rounded bg-green-300 w-full h-full")}></div>
                                                }
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </div>
                        )
                    })
                }
            </DragDropContext>
        </>
    );
}

export default OfflinePageEditBoard;
