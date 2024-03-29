'use client'

import React from 'react';
import OfflinePageDetailForm from "./components/OfflinePageDetailForm";
import OfflinePlanDetailData from "./components/OfflinePlanDetailData";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePlanDetailPage(props) {
    const {id, date} = props

    return (
        <>
            <OfflinePageDetailForm id={id} date={date}/>
            <OfflinePlanDetailData id={id}/>
        </>
    );
}

export default OfflinePlanDetailPage;
