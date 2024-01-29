'use client'

import React from 'react';
import StockPageForm from "./components/StockPageForm";
import {Heading} from "@/components/shared/uikit/heading";
import StockPageData from "@/components/pages/stock/ui/components/StockPageData";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @last-updated 29.01.2024 - Zholaman Zhumanov
 * @update-description refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function StockPage({data}) {
    return (
        <>
            <Heading type={"h1"}>Состояние склада</Heading>
            <StockPageForm/>
            <StockPageData/>
        </>
    );
}

export default StockPage;
