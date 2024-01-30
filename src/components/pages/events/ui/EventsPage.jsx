'use client'

import React, {useEffect, useState} from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/shared/shadcn/ui/pagination";
import EventCard from "./components/EventCard";
import {useApiRequest} from "@/components/shared/hooks";
import {Heading} from "@/components/shared/uikit/heading";
import EventAddFormModal from "./components/EventAddFormModal";
import {apiGetEventsData} from "@/components/shared/services/axios/clientRequests";
import {Table, TableBody, TableHead, TableHeader, TableRow,} from "@/components/shared/shadcn/ui/table"
import {NotData} from "@/components/shared/uikit/templates";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @last-updated 25.01.2024 - Zholaman Zhumanov
 * @update-description real data is added
 * @todo refactoring
 * @todo loader handler
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function EventsPage(props) {

    const {apiFetchHandler, loading} = useApiRequest()

    const [page, setPage] = useState(1)
    const [eventsData, setEventsData] = useState([])

    const fetchApiEventsData = async () => {
        await apiFetchHandler(
            apiGetEventsData,
            [page],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        setEventsData(params.data?.["rows"])
                    }
                }
            }
        )
    }

    useEffect(() => {
        fetchApiEventsData()
    }, []);

    if (loading) {
        return <div className={cn("w-full flex justify-center items-center my-4")}>
            <div className={cn("w-full flex flex-row flex-wrap md:gap-3 gap-1 items-center")}>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
            </div>
        </div>
    }

    if (eventsData.length === 0) {
        return <NotData/>
    }

    return (
        <>
            <Heading type={"h1"}>Настройка событий</Heading>
            <div className={"flex items-center justify-between mb-9"}>
                <Heading type={"h3"}>Событие</Heading>
                <EventAddFormModal updateEventData={fetchApiEventsData}/>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[30px]"></TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Ежегодно?</TableHead>
                        <TableHead>Наименование</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
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
                                updateEventData={fetchApiEventsData}
                                everyYear={eventItem?.["a_every_year"]}
                                color={eventItem?.["a_label_options"]?.["backgroundColor"]}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </>
    );
}

export default EventsPage;
