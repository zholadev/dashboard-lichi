'use client'

import React from 'react';
import {TableCell, TableRow} from "@/components/shared/ui/table";
import EventEditFormModal from "@/components/pages/events/ui/components/EventEditFormModal";
import EventRemoveItem from "@/components/pages/events/ui/components/EventRemoveItem";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function EventCard(props) {
    const {name, color, date, everyYear, id, updateEventData, totalData = {}} = props

    return (
        <TableRow>
            <TableCell className="font-medium">
                <div
                    className={`rounded-full w-[10px] h-[10px]`}
                    style={{
                        backgroundColor: color ?? '#000'
                    }}
                ></div>
            </TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{everyYear === 1 ? 'ДА' : 'НЕТ'}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
                <div className={"flex items-center gap-4"}>
                    <EventEditFormModal
                        id={id}
                        editData={totalData}
                        updateEventData={updateEventData}
                    />

                    <EventRemoveItem
                        id={id}
                        updateEventData={updateEventData}/>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default EventCard;
