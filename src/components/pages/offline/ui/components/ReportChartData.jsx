import React from 'react';
import dynamic from "next/dynamic";
import {ContainerBox} from "@/components/entities/container";
import {useChartApexOptions} from "@/components/shared/hooks";

const ChartReact = dynamic(() => import("@/components/shared/uikit/chart/ui/ChartReact"), {ssr: false})

/**
 * @author Zholaman Zhumanov
 * @created 02.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function ReportChartData(props) {
    const {chartData, title} = props

    const chartApexOptions = useChartApexOptions()

    return (
        <ContainerBox>
            <ChartReact
                title={title}
                optionsData={chartApexOptions(chartData)?.options}
                seriesData={chartApexOptions(chartData)?.series}
                type={chartApexOptions(chartData)?.type}
                height={chartApexOptions(chartData)?.height}
            />
        </ContainerBox>
    );
}

export default ReportChartData;
