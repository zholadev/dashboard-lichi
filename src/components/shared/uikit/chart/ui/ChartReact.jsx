'use client'

import React from 'react';
import ReactApexChart from "react-apexcharts";
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
           <div id={"chart"}>
               <ReactApexChart
                   type={type}
                   height={height}
                   series={seriesData}
                   options={optionsData}
               />
           </div>
        </>
    );
}

export default ChartReact;
