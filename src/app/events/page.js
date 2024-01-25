import React from 'react';
import {EventsPage} from "@/components/pages/events";
import {Container} from "@/components/entities/container";
import {PageBreadcrumbs} from "@/components/entities/breadcrumbs";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Page(props) {
    return (
        <Container>
            <PageBreadcrumbs page={"events"}/>
            <EventsPage/>
        </Container>
    );
}

export default Page;
