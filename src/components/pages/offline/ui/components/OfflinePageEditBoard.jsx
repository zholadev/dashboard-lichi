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
        offBoardReportUseData
    } = useAppSelector(state => state?.offline)

    const toggleDrag = (value) => events.offDragStartBoardAction(value)

    const onDragStart = () => toggleDrag(true)

    const checkListIncludes = (result) => {
        const getItem = offBoardUseList.filter((item) => item?.key == result?.draggableId)
        if (getItem.length > 0) return true
    }

    const onDragEnd = (result) => {
        if (!result.destination) return;

        console.log(result)

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

    useEffect(() => {
        if (!localStorage.getItem("schema_use_list")) return
        events.offBoardUseListAction(JSON.parse(localStorage.getItem("schema_use_list")))
    }, [])

    useEffect(() => {
        if (!localStorage.getItem("schema_not_use_list")) events.offBoardNotUseListAction([...offlineChartList])
        events.offBoardNotUseListAction(JSON.parse(localStorage.getItem("schema_not_use_list")))
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
