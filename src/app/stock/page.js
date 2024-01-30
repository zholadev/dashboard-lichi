import React from 'react';
import {Container} from "@/components/entities/container";
import {PageBreadcrumbs} from "@/components/entities/breadcrumbs";
import {StockPage} from "@/components/pages/stock";

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
        <PageBreadcrumbs page={"stock"}/>
            <StockPage/>
        </Container>
    );
}

export default Page;
