import React, {useEffect} from 'react';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {cn} from "@/lib/utils";
import {DragHandleDots2Icon, MoveIcon} from "@radix-ui/react-icons";
import {offlineChartList} from "@/components/shared/data/charts";
import {useApiRequest, useDispatchActionHandle, useToastMessage} from "@/components/shared/hooks";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";

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
        offBoardReportUseData
    } = useAppSelector(state => state?.offline)

    const toggleDrag = (value) => events.offDragStartBoardAction(value)

    const onDragStart = (value) => toggleDrag(true)

    const checkListIncludes = (result) => {
        const getItem = offBoardUseList.filter((item) => item?.key == result?.draggableId)
        if (getItem.length > 0) return true
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;

        // console.log(result, JSON.parse(localStorage.getItem("schema_use_list")))

        if (result?.source?.droppableId === 'not_use_list') {
            if (checkListIncludes(result)) {
                toastMessage('Отчет уже есть в списке', 'info')
                return;
            }

            const itemsFilterDroppable = offBoardNotUseList.filter((item) => item?.key !== result?.draggableId)

            events.offBoardNotUseListAction([...itemsFilterDroppable])

            const itemsFilter = offlineChartList.filter((item) => item?.key == result?.draggableId)

            events.offBoardUseListAction([...offBoardUseList, ...itemsFilter])

            localStorage.setItem("schema_use_list", JSON.stringify([...offBoardUseList, ...itemsFilter]))

        } else if (result?.source?.droppableId === 'use_list') {
            const itemsFilter = offBoardUseList.filter((item) => item?.key !== result?.draggableId)

            events.offBoardUseListAction([...itemsFilter])

            const itemsFilterDroppable = offlineChartList.filter((item) => item?.key == result?.draggableId)

            events.offBoardNotUseListAction([...offBoardNotUseList, ...itemsFilterDroppable])
        } else {
            return;
        }

        toggleDrag(false)
    };

    useEffect(() => {
        events.offBoardNotUseListAction([...offlineChartList])
    }, []);

    return (
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
    );
}

export default OfflinePageEditBoard;
