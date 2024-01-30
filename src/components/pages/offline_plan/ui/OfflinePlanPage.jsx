'use client'

import React from 'react';
import {Heading} from "@/components/shared/uikit/heading";
import OfflinePlanPageForm from "./components/OfflinePlanPageForm";
import OfflinePageData from "./components/OfflinePageData";

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
                <Heading type={"h1"}>План продаж</Heading>
                <OfflinePlanPageForm/>
                <OfflinePageData/>
            </div>
        </>
    );
}

export default OfflinePlanPage;
