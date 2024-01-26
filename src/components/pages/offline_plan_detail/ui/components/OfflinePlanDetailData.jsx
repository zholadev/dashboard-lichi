'use client'

import React from 'react';
import dynamic from "next/dynamic";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";
import {cn} from "@/lib/utils";
import {Heading} from "@/components/shared/uikit/heading";

const ChartReact = dynamic(() => import("@/components/shared/uikit/chart/ui/ChartReact"), {ssr: false})


/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @todo refactoring
 * @todo date get is redux
 * @todo sum counts formatted
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePlanDetailData(props) {
    const {offlinePlanDetailData, offPlanDetailApiLoader} = useAppSelector(state => state.offline_plan_detail)

    const chartData = offlinePlanDetailData?.["report"]
    const planDataCounts = offlinePlanDetailData?.["$analytics"]

    if (offPlanDetailApiLoader) {
        return (
            <div>
                <Skeleton className="w-[100%] h-[450px] rounded-2 mb-3"/>
            </div>
        )
    }

    if (offlinePlanDetailData?.length === 0) {
        return null
    }

    return (
        <div>
            <div className={cn("w-full grid xl:grid-cols-3 mb-10 md:grid-cols-2 grid-cols-1 gap-10")}>
                {
                    Object.values(planDataCounts?.["blocks"] || {}).map((count, id) => {
                        return (
                            <div className={cn("border rounded p-4")} key={id}>
                                <Heading type={"h4"}>{count?.["title"]}</Heading>
                                <Heading cls={cn("font-medium")} type={"h4"}>{count?.["value"]}</Heading>
                            </div>
                        )
                    })
                }
            </div>

            <div className={"border rounded p-5"}>
                {/*<ChartReact*/}
                {/*    title={"Анализ продаж"}*/}
                {/*    optionsData={chartData}*/}
                {/*    seriesData={chartData?.series}*/}
                {/*    type={chartData?.chart.type}*/}
                {/*    height={chartData?.chart.height}*/}
                {/*/>*/}
            </div>
        </div>
    );
}

export default OfflinePlanDetailData;
