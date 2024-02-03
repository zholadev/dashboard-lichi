'use client'

import React from 'react';
import OfflinePageEditBoard from "./OfflinePageEditBoard";
import OfflinePageReportData from "./OfflinePageReportData";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @todo refactoring
 * @returns {Element}
 * @constructor
 */
function OfflinePageData() {
    return (
        <>
            <OfflinePageEditBoard/>
            <OfflinePageReportData/>
        </>
    )

}

export default OfflinePageData;
