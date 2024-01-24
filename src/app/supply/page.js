'use client'

import React from 'react';
import {SupplyPage} from "@/components/pages/supply";
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
            <PageBreadcrumbs page={"supply"}/>
            <SupplyPage/>
        </Container>
    );
}

export default Page;
