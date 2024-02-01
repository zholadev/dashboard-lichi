'use client'

import React from 'react';
import {TableCell, TableRow} from "@/components/shared/shadcn/ui/table";
import EventEditFormModal from "@/components/pages/events/ui/components/EventEditFormModal";
import EventRemoveItem from "@/components/pages/events/ui/components/EventRemoveItem";
import {Heading} from "@/components/shared/uikit/heading";

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
                    className={`w-[3px] min-h-[20px]`}
                    style={{
                        backgroundColor: color ?? '#000'
                    }}
                ></div>
            </TableCell>
            <TableCell>
                <Heading type={'h5'} cls={'mb-0'}>{date}</Heading>
            </TableCell>
            <TableCell>
                <Heading type={'h5'} cls={'mb-0'}>{everyYear === 1 ? 'ДА' : 'НЕТ'}</Heading>
            </TableCell>
            <TableCell>
                <Heading type={'h5'} cls={'mb-0'}>{name}</Heading>
            </TableCell>
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
