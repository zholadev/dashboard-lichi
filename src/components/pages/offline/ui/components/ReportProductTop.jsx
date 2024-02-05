import React, {useCallback, useMemo} from 'react';
import {Heading} from "@/components/shared/uikit/heading";
import {cn} from "@/lib/utils";
import Image from "next/image";
import dynamic from "next/dynamic";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {TableData} from "@/components/shared/uikit/table";
import {imgUrl} from "@/components/shared/contants/links";
import {Button} from "@/components/shared/shadcn/ui/button";
import {ContainerBox} from "@/components/entities/container";
import {useChartApexOptions} from "@/components/shared/hooks";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";

const ChartReact = dynamic(() => import("@/components/shared/uikit/chart/ui/ChartReact"), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @created 02.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function ReportProductTop(props) {
    const {reportData, title, reportType} = props

    const chartApexOptions = useChartApexOptions()

    const {
        offSchemaReportData,
    } = useAppSelector(state => state?.offline)

    const getColumnsProductTop = useMemo(() => {
        try {
            return [
                {
                    "id": "photo",
                    "accessorKey": "photo",
                    cell: ({row}) => (
                        <div className={cn("min-w-[200px] flex justify-center items-center")}>
                            <Image
                                width={120}
                                height={140}
                                loading={"lazy"}
                                src={`${imgUrl}?art=${row?.original?.["photo"]}&size=xs`}
                                alt={'...'}
                            />
                        </div>
                    ),
                    "header": 'Фото',
                },
                {
                    "id": "article",
                    "accessorKey": "article",
                    "header": ({column}) => {
                        return (
                            <Button
                                variant="ghost"
                                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            >
                                Артикул
                                <CaretSortIcon className="ml-2 h-4 w-4"/>
                            </Button>
                        )
                    },
                },
                {
                    "id": reportType === 'product_top_return' ? "refund" : "sale",
                    "accessorKey": reportType === 'product_top_return' ? "refund" : "sale",
                    "header": ({column}) => {
                        return (
                            <Button
                                variant="ghost"
                                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                            >
                                {reportType === 'product_top_return' ? "Возвратов" : "Продаж"}
                                <CaretSortIcon className="ml-2 h-4 w-4"/>
                            </Button>
                        )
                    },
                },
                {
                    "id": "chart",
                    "accessorKey": "chart",
                    "header": "",
                    cell: ({row}) => (
                        <div className={cn("min-w-[200px]")}>
                            <ChartReact
                                optionsData={chartApexOptions(row?.original?.["chart"])?.options}
                                seriesData={chartApexOptions(row?.original?.["chart"])?.series}
                                type={chartApexOptions(row?.original?.["chart"])?.type}
                                height={chartApexOptions(row?.original?.["chart"])?.height}
                            />
                        </div>
                    )
                },
            ]
        } catch (error) {
            errorHandler("offPageReportData", "getTableColumns", error)
        }
    }, [reportData, offSchemaReportData])

    const getTableDataProductTop = useCallback((data) => {
        try {
            return Object.entries(data || {}).map(([key, value]) => {
                if (reportType === 'product_top_return') {
                    return {
                        "photo": key,
                        "article": key,
                        "refund": value?.["total"],
                        "chart": value?.["chart"],
                    }
                } else {
                    return {
                        "photo": key,
                        "article": key,
                        "sale": value?.["total"],
                        "chart": value?.["chart"],
                    }
                }

            })
        } catch (error) {
            errorHandler("offPageReportData", "useCallback/getTableDataProductTop", error)
        }
    }, [reportData, offSchemaReportData])


    return (
        <ContainerBox>
            <Heading type={"h3"} cls={"mb-2 mt-4 md:text-left text-center"}>{title}</Heading>
            <TableData
                data={getTableDataProductTop(reportData)}
                columns={getColumnsProductTop}
                hidePagination
            />
        </ContainerBox>
    );
}

export default ReportProductTop;
