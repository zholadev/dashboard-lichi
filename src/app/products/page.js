'use client'

import React from 'react';
import {Container} from "@/components/entities/container";
import {PageBreadcrumbs} from "@/components/entities/breadcrumbs";
import {ProductsPage} from "@/components/pages/products";

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
            <PageBreadcrumbs page={"products"}/>
            <ProductsPage/>
        </Container>
    );
}

export default Page;
