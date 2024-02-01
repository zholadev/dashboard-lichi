'use client'

import React from 'react';
import EventAddFormModal from "./EventAddFormModal";
import {Heading} from "@/components/shared/uikit/heading";

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function EventsToolbar(props) {
    const {fetchApiEventsData} = props

    return (
        <div className={"flex items-center justify-between mb-9"}>
            <Heading type={"h3"}>Событие</Heading>
            <EventAddFormModal updateEventData={fetchApiEventsData}/>
        </div>
    );
}

export default EventsToolbar;
