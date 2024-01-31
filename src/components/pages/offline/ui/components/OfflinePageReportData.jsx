import React from 'react';
import {NotData} from "@/components/shared/uikit/templates";
import {cn} from "@/lib/utils";
import {offlineChartList} from "@/components/shared/data/charts";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import dynamic from "next/dynamic";
import {useChartApexOptions} from "@/components/shared/hooks";

const ChartReact = dynamic(() => import("@/components/shared/uikit/chart/ui/ChartReact"), {ssr: false})


/**
 * @author Zholaman Zhumanov
 * @created 31.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageReportData(props) {
    const {
        offEditBoard,
        offSchemaData,
        offBoardUseList,
        offDragStartBoard,
        offBoardNotUseList,
        offSchemaReportData,
        offBoardReportUseData
    } = useAppSelector(state => state?.offline)


    const chartApexOptions = useChartApexOptions()

    if (offSchemaReportData.length === 0) {
        return <NotData/>
    }

    return (
        offEditBoard ? null :
            <div className={cn("w-full border rounded p-5 will-change-auto")}>
                {
                    Object.values(offBoardReportUseData || {}).map((schemaData, schemaId) => {
                        const reportData = schemaData?.["data"]?.["report"]
                        const getChartCurrentData = offlineChartList.filter((item) => item?.key === schemaData?.["key"])
                        return (
                            reportData ? (
                                <div
                                    className={cn("mb-20 grid grid-cols-1 mt-5 gap-5")}
                                    key={schemaId}>
                                    <div className={"border rounded p-5"}>
                                        <ChartReact
                                            title={getChartCurrentData?.[0]?.title}
                                            optionsData={chartApexOptions(reportData).options}
                                            seriesData={chartApexOptions(reportData).series}
                                            type={chartApexOptions(reportData).type}
                                            height={chartApexOptions(reportData).height}
                                        />
                                    </div>
                                </div>
                            ) : null
                        )
                    })
                }
            </div>
    );
}

export default OfflinePageReportData;
