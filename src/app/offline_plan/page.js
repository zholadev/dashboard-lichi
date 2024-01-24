'use client'

import React from 'react';
import {Container} from "@/components/entities/container";
import {PageBreadcrumbs} from "@/components/entities/breadcrumbs";
import {OfflinePlanPage} from "@/components/pages/offline_plan";

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
            <PageBreadcrumbs page={"offline_plan"}/>
            <OfflinePlanPage/>
        </Container>
    );
}

export default Page;
