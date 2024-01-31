'use client'

import React from 'react';
import {Heading} from "@/components/shared/uikit/heading";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), {ssr: false});


/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ChartReact(props) {
    const {seriesData, optionsData, type, height, title} = props

    if (!seriesData && !optionsData || !seriesData || !optionsData) {
        return null
    }

    return (
        <>
            {title && <Heading type={"h3"}>{title}</Heading>}
            <div id={"chart"}>
                <Chart
                    options={optionsData}
                    series={seriesData}
                    type={type}
                    height={height}
                />
            </div>
        </>
    );
}

export default React.memo(ChartReact);
