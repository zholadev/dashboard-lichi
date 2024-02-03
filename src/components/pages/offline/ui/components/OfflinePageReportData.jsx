import React, {useEffect} from 'react';
import {NotData} from "@/components/shared/uikit/templates";
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";
import {offlineChartList} from "@/components/shared/data/charts";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import ReportChartData from "@/components/pages/offline/ui/components/ReportChartData";
import ReportTableData from "@/components/pages/offline/ui/components/ReportTableData";
import ReportProductTop from "@/components/pages/offline/ui/components/ReportProductTop";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {cn} from "@/lib/utils";
import {useDispatchActionHandle} from "@/components/shared/hooks";


/**
 * @author Zholaman Zhumanov
 * @created 31.01.2024
 * @todo refactoring
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageReportData(props) {
    const events = useDispatchActionHandle()

    const {
        offEditBoard,
        offSchemaSavesData,
        offSchemaReportData,
        offBoardReportUseData,
        offSchemaReportApiLoader
    } = useAppSelector(state => state?.offline)

    const getSchemaGridData = () => {
        try {
            const schemaShowSavesLocalStorage = localStorage.getItem("schema_show_reports_saves")
            events.offSchemaSavesDataAction(JSON.parse(schemaShowSavesLocalStorage))
        } catch (error) {
            errorHandler("offlinePageReportData", "func/getSchemaGridData", error)
        }
    }

    useEffect(() => {
        if (Object.values(offSchemaSavesData || {}).length === 0 && localStorage.getItem("schema_show_reports_saves")) {
            getSchemaGridData()
        }
    }, []);

    if (offSchemaReportApiLoader) {
        return (
            <>
                <Skeleton className="w-[100%] h-[170px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[170px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[170px] rounded-2 mb-3"/>
            </>
        )
    }

    // if (!offSchemaSavesData && offSchemaReportData.length > 0) {
    //     return (
    //         <div className={cn("w-full flex items-center justify-center my-4")}>
    //             Отредактируйте доску, чтобы увидеть данные
    //         </div>
    //     )
    // }

    if (offSchemaReportData.length === 0) {
        return <NotData/>
    }

    return (
        offEditBoard ? null :
            <>
                {
                    Object.values(offSchemaSavesData || {}).map((schema, schemaId) => {
                        return (
                            <div key={schemaId}
                                 className={cn(`w-full grid gap-5 md:grid-cols-${schema?.grid} grid-cols-1`)}>
                                {
                                    Object.entries(schema?.["items"] || {}).map(([key, value], index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="h-full">
                                                {
                                                    Object.values(offSchemaReportData || {}).map((schemaData, schemaDataId) => {
                                                        const reportChart = schemaData?.["data"]?.["report"]
                                                        const reportProduct = !schemaData?.["data"]?.["report"]?.["chart"] && !schemaData?.["data"]?.["table"]
                                                        const reportTable = schemaData?.["data"]?.["table"]
                                                        const getChartCurrentData = offlineChartList.filter((item) => item?.key === schemaData?.["key"])
                                                        return (
                                                            value?.["type"] === schemaData?.["key"] ? (
                                                                reportProduct ? (
                                                                    <ReportProductTop
                                                                        key={schemaDataId}
                                                                        title={getChartCurrentData?.[0]?.title}
                                                                        reportData={schemaData?.["data"]?.["report"]}
                                                                    />
                                                                ) : reportTable && !reportChart ? (
                                                                    <ReportTableData
                                                                        key={schemaDataId}
                                                                        tableData={schemaData}
                                                                        tableHead={reportTable?.["head"]}
                                                                        tableBody={reportTable?.["data"]}
                                                                        componentType={schemaData?.["key"]}
                                                                        title={getChartCurrentData?.[0]?.title}
                                                                    />
                                                                ) : reportChart ? (
                                                                        <ReportChartData
                                                                            key={schemaDataId}
                                                                            chartData={reportChart}
                                                                            title={getChartCurrentData?.[0]?.title}
                                                                        />
                                                                    )
                                                                    :
                                                                    null
                                                            ) : null
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </>
    );
}

export default OfflinePageReportData;
