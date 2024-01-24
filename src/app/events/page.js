
import React from 'react';
import {EventsPage} from "@/components/pages/events";
import {Container} from "@/components/entities/container";
import {PageBreadcrumbs} from "@/components/entities/breadcrumbs";
import {redirect} from "next/navigation";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Page(props) {
    const accessDenied = true
    if (accessDenied) {
        redirect('/login')
    }

    return (
        <Container>
            <PageBreadcrumbs page={"events"}/>
            <EventsPage/>
        </Container>
    );
}

export default Page;
