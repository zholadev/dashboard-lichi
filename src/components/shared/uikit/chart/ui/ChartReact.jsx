'use client'

import React from 'react';
import Chart from "react-apexcharts";
import {Heading} from "@/components/shared/uikit/heading";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function ChartReact(props) {
    const {seriesData, optionsData, type, height, title} = props

    if (!seriesData || !optionsData) {
        return null
    }

    return (
        <>
            {title && <Heading type={"h3"}>{title}</Heading>}
            <Chart
                type={type}
                height={height}
                series={seriesData}
                options={optionsData}
            />
        </>
    );
}

export default ChartReact;
