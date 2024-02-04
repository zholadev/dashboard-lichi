'use client'

import React from 'react';
import {cn} from "@/lib/utils";
import {Heading} from "@/components/shared/uikit/heading";
import OfflinePageData from "./components/OfflinePageData";
import OfflinePlanPageForm from "./components/OfflinePlanPageForm";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function OfflinePlanPage(props) {
    return (
        <>
            <div className={"w-100"}>
                <Heading type={"h1"} cls={cn("w-full md:text-left text-center mb-9")}>План продаж</Heading>
                <OfflinePlanPageForm/>
                <OfflinePageData/>
            </div>
        </>
    );
}

export default OfflinePlanPage;
