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

    if (eventsData.length === 0) {
        return <h3>not found data</h3>
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
                        eventsData?.["data"].map((eventItem) => (
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

            <Pagination className={"mb-20 mt-10"}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious title={"Назад"} href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext title={"Дальше"} href="#"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}

export default EventsPage;
