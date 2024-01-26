'use client'

import React from 'react';
import {cn} from "@/lib/utils";
import dynamic from "next/dynamic";
import {Heading} from '@/components/shared/uikit/heading'
import OfflinePageForm from "@/components/pages/offline/ui/components/OfflinePageForm";
import OfflinePageData from "@/components/pages/offline/ui/components/OfflinePageData";


/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function OfflinePage(props) {
    return (
        <div className={cn("w-full")}>
            <Heading type={"h1"}>Розница</Heading>

            <OfflinePageForm/>
            <OfflinePageData/>
        </div>
    );
}

export default OfflinePage;
