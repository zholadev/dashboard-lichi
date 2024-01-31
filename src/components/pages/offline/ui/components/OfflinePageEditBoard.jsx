import React, {useEffect} from 'react';
import {cn} from "@/lib/utils";
import {MoveIcon} from "@radix-ui/react-icons";
import {offlineChartList} from "@/components/shared/data/charts";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useApiRequest, useDispatchActionHandle, useToastMessage} from "@/components/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 31.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageEditBoard(props) {
    const toastMessage = useToastMessage()
    const events = useDispatchActionHandle()

    const {apiFetchHandler} = useApiRequest()

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

    const toggleDrag = (value) => events.offDragStartBoardAction(value)

    console.log(
        offSchemaReportData
    )

    const onDragStart = () => toggleDrag(true)

    const checkListIncludes = (result) => {
        const getItem = offBoardUseList.filter((item) => item?.key == result?.draggableId)
        if (getItem.length > 0) return true
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;

        if (result?.source?.droppableId === 'not_use_list') {
            if (checkListIncludes(result)) {
                toastMessage('Отчет уже есть в списке', 'info')
                return;
            }

            const itemsFilterDroppable = offBoardNotUseList.filter((item) => item?.key !== result?.draggableId)

            localStorage.setItem("schema_not_use_list", JSON.stringify([...itemsFilterDroppable]))

            events.offBoardNotUseListAction([...itemsFilterDroppable])

            const itemsFilter = offlineChartList.filter((item) => item?.key == result?.draggableId)

            events.offBoardUseListAction([...offBoardUseList, ...itemsFilter])

            localStorage.setItem("schema_use_list", JSON.stringify([...offBoardUseList, ...itemsFilter]))

        } else if (result?.source?.droppableId === 'use_list') {
            const itemsFilter = offBoardUseList.filter((item) => item?.key !== result?.draggableId)

            localStorage.setItem("schema_use_list", JSON.stringify([...itemsFilter]))

            events.offBoardUseListAction([...itemsFilter])

            const itemsFilterDroppable = offlineChartList.filter((item) => item?.key == result?.draggableId)

            localStorage.setItem("schema_not_use_list", JSON.stringify([...offBoardNotUseList, ...itemsFilterDroppable]))

            events.offBoardNotUseListAction([...offBoardNotUseList, ...itemsFilterDroppable])
        } else {
            return;
        }

        toggleDrag(false)
    };

    const getChildCounts = (childCount = 1) => {
        const keys = [...Array(childCount)?.keys()]

        return keys.map((child, index) => {
            return {
                "id": index,
                "type": ""
            }
        })
    }

    const addNewContainer = (childCount) => {
        if (Object.values(offSchemaContainerData || {}).length === 0) {
            events.offSchemaContainerDataAction({
                "container": 1,
                "type": "container",
                "items": getChildCounts(childCount)
            })
        } else {
            events.offSchemaContainerDataAction({
                "container": Object.values(offSchemaContainerData || {}).length + 1,
                "type": "container",
                "items": getChildCounts(childCount)
            })
        }

    }

    useEffect(() => {
        if (!localStorage.getItem("schema_use_list")) return
        events.offBoardUseListAction(JSON.parse(localStorage.getItem("schema_use_list")))
    }, [])

    useEffect(() => {
        if (Object.values(localStorage.getItem("schema_not_use_list") || {}).length === 0) {
            events.offBoardNotUseListAction([...offlineChartList])
            return
        }
        events.offBoardNotUseListAction(JSON.parse(localStorage.getItem("schema_not_use_list")))
    }, []);

    console.log(offSchemaContainerData)

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <Droppable droppableId="not_use_list">
                    {(provided) => (
                        <ul className={
                            cn("w-full border p-4 my-5 flex items-center rounded content-stretch justify-between gap-5",
                                offEditBoard ? "opacity-100 flex" : "opacity-0 hidden"
                            )
                        }
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {offBoardNotUseList.map((item, index) => (
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
                <Droppable droppableId="use_list">
                    {(provided) => (
                        <ul className={
                            cn("w-full border p-4 my-5 rounded delay-75",
                                offEditBoard ? "opacity-100 block" : "opacity-0 hidden",
                                offDragStartBoard ? "bg-green-100 border-2 border-amber-400" : ""
                            )
                        }
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {offBoardUseList.map((item, index) => (
                                <Draggable key={item?.id} draggableId={item?.key?.toString()} index={index}>
                                    {(provided) => (
                                        <li className="flex-1 h-full border rounded p-5 cursor-pointer flex items-center gap-3 text-xs mb-5"
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
            </DragDropContext>

            {/*<div className={cn("w-full h-full border rounded p-5")}>*/}
            {/*    <div className={cn("w-full flex justify-end mb-4")}>*/}
            {/*        <DropdownMenu>*/}
            {/*            <DropdownMenuTrigger asChild>*/}
            {/*                <Button className={cn("flex items-center gap-2 ")}>*/}
            {/*                    Добавить контейнер<PlusIcon/>*/}
            {/*                </Button>*/}
            {/*            </DropdownMenuTrigger>*/}
            {/*            <DropdownMenuContent align="end" className="w-[150px]">*/}
            {/*                <DropdownMenuLabel>Выберите контейнер</DropdownMenuLabel>*/}
            {/*                <DropdownMenuSeparator/>*/}
            {/*                <DropdownMenuItem onClick={() => addNewContainer(1)}>*/}
            {/*                    <div className={cn("grid grid-cols-1 p-1 w-[100px]")}>*/}
            {/*                        <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>*/}
            {/*                    </div>*/}
            {/*                </DropdownMenuItem>*/}

            {/*                <DropdownMenuItem onClick={() => addNewContainer(2)}>*/}
            {/*                    <div className={cn("grid grid-cols-2 gap-2 p-1 w-[100px]")}>*/}
            {/*                        <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>*/}
            {/*                        <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>*/}
            {/*                    </div>*/}
            {/*                </DropdownMenuItem>*/}

            {/*                <DropdownMenuItem onClick={() => addNewContainer(3)}>*/}
            {/*                    <div className={cn("grid grid-cols-3 gap-2 p-1 w-[100px]")}>*/}
            {/*                        <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>*/}
            {/*                        <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>*/}
            {/*                        <div className={cn("border border-cyan-400 w-full h-[20px]")}></div>*/}
            {/*                    </div>*/}
            {/*                </DropdownMenuItem>*/}
            {/*            </DropdownMenuContent>*/}
            {/*        </DropdownMenu>*/}

            {/*    </div>*/}

            {/*    {*/}
            {/*        Object.values(offSchemaContainerData || {}).map((schemaContentItem, schemaContentId) => {*/}
            {/*            return (*/}
            {/*                <div key={schemaContentId}*/}
            {/*                     className={cn(`grid grid-cols-1 p-2 md:grid-cols-${schemaContentItem?.items?.length} gap-5 mb-5 border rounded`)}>*/}
            {/*                    {*/}
            {/*                        schemaContentItem?.items?.map((childItem, childId) => {*/}
            {/*                            return (*/}
            {/*                                <div key={childId} className={cn("border rounded p-3")}>*/}

            {/*                                </div>*/}
            {/*                            )*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                </div>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</div>*/}
        </>
    );
}

export default OfflinePageEditBoard;
// <Droppable droppableId="use_list">
//     {(provided) => (
//         <ul className={
//             cn("w-full border p-4 my-5 rounded delay-75",
//                 offEditBoard ? "opacity-100 block" : "opacity-0 hidden",
//                 offDragStartBoard ? "bg-green-100 border-2 border-amber-400" : ""
//             )
//         }
//             {...provided.droppableProps}
//             ref={provided.innerRef}>
//             {offBoardUseList.map((item, index) => (
//                 <Draggable key={item?.id} draggableId={item?.key?.toString()} index={index}>
//                     {(provided) => (
//                         <li className="flex-1 h-full border rounded p-5 cursor-pointer flex items-center gap-3 text-xs mb-5"
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             ref={provided.innerRef}>
//                             <MoveIcon/>
//                             {item.title}
//                         </li>
//                     )}
//                 </Draggable>
//             ))}
//             {provided.placeholder}
//         </ul>
//     )}
// </Droppable>

