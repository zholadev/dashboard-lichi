'use client'

import React from 'react';
import EventCard from "./EventCard";
import {TableBody} from "@/components/shared/shadcn/ui/table";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function EventsTableBody(props) {
    const {updateEventData} = props

    const {eventsData} = useAppSelector(state => state?.annotations)

    return (
        <TableBody>
            {
                Object.values(eventsData?.["data"] || {}).map((eventItem) => (
                    <EventCard
                        data={eventItem}
                        totalData={eventItem}
                        id={eventItem?.["a_id"]}
                        key={eventItem?.["a_id"]}
                        name={eventItem?.["a_name"]}
                        date={eventItem?.["a_date"]}
                        updateEventData={updateEventData}
                        everyYear={eventItem?.["a_every_year"]}
                        color={eventItem?.["a_label_options"]?.["backgroundColor"]}
                    />
                ))
            }
        </TableBody>
    );
}

export default EventsTableBody;
