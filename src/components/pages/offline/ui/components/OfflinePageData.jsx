'use client'

import React, {useEffect} from 'react';
import {NotData} from "@/components/shared/uikit/templates";
import OfflinePageReportData from "./OfflinePageReportData";
import OfflinePageEditToolbar from "./OfflinePageEditToolbar";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {useApiRequest, useDispatchActionHandle} from "@/components/shared/hooks";
import {apiGetOfflineSchemaData} from "@/components/shared/services/axios/clientRequests";
import OfflinePageEditBoard from "@/components/pages/offline/ui/components/OfflinePageEditBoard";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @returns {Element}
 * @constructor
 */
function OfflinePageData() {
    const events = useDispatchActionHandle()

    const {apiFetchHandler} = useApiRequest()

    const {
        offSchemaData,
        offBoardUseList,
        offSchemaReportData,
    } = useAppSelector(state => state?.offline)

    const fetchOfflineSchema = async () => {
        await apiFetchHandler(
            apiGetOfflineSchemaData,
            [],
            events.offSchemaApiLoader,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.offSchemaGetData(params.data)
                    }
                }
            }
        )
    }

    useEffect(() => {
        fetchOfflineSchema()
    }, []);

    useEffect(() => {

        setTimeout(() => {
            const getCurrentData = Object.values(offSchemaReportData || {}).filter(item => {
                return offBoardUseList.some(board => board?.key === item?.key)
            })

            events.offBoardReportUseDataAction([...getCurrentData])
        }, 1000)
    }, [offBoardUseList, offSchemaReportData])

    if (offSchemaData.length === 0) {
        return <NotData/>
    }

    return (
        <>
            <OfflinePageEditBoard/>
            <OfflinePageReportData/>
        </>
    )

}

export default OfflinePageData;
