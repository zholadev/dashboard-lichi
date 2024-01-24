'use client'

import React from 'react';
import {OfflinePage} from "@/components/pages/offline";
import {Container} from "@/components/entities/container";
import {PageBreadcrumbs} from "@/components/entities/breadcrumbs";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Page(props) {
    return (
        <Container>
            <PageBreadcrumbs page={"offline"}/>
            <OfflinePage/>
        </Container>
    );
}

export default Page;
