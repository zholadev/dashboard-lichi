'use client'

import React, {useEffect} from 'react';
import EventsToolbar from "./components/EventsToolbar";
import {Table} from "@/components/shared/shadcn/ui/table"
import {Heading} from "@/components/shared/uikit/heading";
import EventsTableBody from "./components/EventsTableBody";
import EventsTableHeader from "./components/EventsTableHeader";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {ListSkeleton, NotData} from "@/components/shared/uikit/templates";
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {apiGetEventsData} from "@/components/shared/services/axios/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @last-updated 01.02.2024 - Zholaman Zhumanov
 * @update-description refactoring
 * @todo refactoring
 * @returns {JSX.Element}
 * @constructor
 */
function EventsPage() {
    const events = useDispatchActionHandle()

    const {apiFetchHandler} = useApiRequest()

    const {eventsData, eventsApiLoader, eventsParamsPage} = useAppSelector(state => state?.annotations)

    const fetchApiEventsData = async () => {
        await apiFetchHandler(
            apiGetEventsData,
            [eventsParamsPage],
            events.eventsApiLoaderAction,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.eventsDataAction(params.data?.["rows"])
                    }
                }
            }
        )
    }

    useEffect(() => {
        fetchApiEventsData()
    }, []);

    /**
     * @author Zholaman Zhumanov
     * @description page loading Element render
     */
    if (eventsApiLoader) {
        return <ListSkeleton/>
    }

    /**
     * @author Zholaman Zhumanov
     * @description page not data Element render
     */
    if (eventsData.length === 0) {
        return <NotData/>
    }

    return (
        <>
            <Heading type={"h1"}>Настройка событий</Heading>
            <EventsToolbar updateEventData={fetchApiEventsData}/>
            <Table>
                <EventsTableHeader/>
                <EventsTableBody updateEventData={fetchApiEventsData}/>
            </Table>
        </>
    );
}

export default EventsPage;
