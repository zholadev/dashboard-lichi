'use client'

import React from 'react';
import {Heading} from "@/components/shared/uikit/heading";
import SupplyForm from "@/components/pages/supply/ui/components/SupplyForm";
import {cn} from "@/lib/utils";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @last-updated 25.01.2024 - Zholaman Zhumanov
 * @update-description refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function SupplyPage(props) {
    return (
        <>
            <Heading type={"h1"} cls={cn("w-full md:text-left text-center mb-9")}>Поставки</Heading>
            <SupplyForm/>
        </>
    );
}

export default SupplyPage;
