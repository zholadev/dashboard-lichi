'use client'

import React from 'react';
import ProductsForm from "./components/ProductsForm";
import ProductsData from "./components/ProductsData";
import {Heading} from "@/components/shared/uikit/heading";
import ProductsPagination from "./components/ProductsPagination";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";

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
    const {formData, productsData, apiLoader} = useAppSelector(state => state.products)

    console.log(apiLoader, productsData)

    return (
        <>
            <Heading type={"h1"}>Отчет по товарам</Heading>
            <ProductsForm/>
            <ProductsData/>
            <ProductsPagination/>
        </>
    );
}

export default ProductsPage;
