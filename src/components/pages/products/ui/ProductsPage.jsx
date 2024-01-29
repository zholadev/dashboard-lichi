'use client'

import React from 'react';
import ProductsForm from "./components/ProductsForm";
import ProductsData from "./components/ProductsData";
import {Heading} from "@/components/shared/uikit/heading";
import ProductsPagination from "./components/ProductsPagination";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @last-updated 26.01.2024 - Zholaman Zhumanov
 * @update-description refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ProductsPage(props) {
    return (
        <>
            <Heading type={"h1"}>Отчет по товарам</Heading>
            <ProductsForm/>
            <ProductsData/>
        </>
    );
}

export default ProductsPage;
