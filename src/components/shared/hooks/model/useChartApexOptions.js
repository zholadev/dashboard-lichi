'use client'

import {useCallback} from 'react';
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {useDarkMode} from "@/components/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 30.01.2024
 * @returns {*}
 */
function useChartApexOptions() {
    const isDarkMode = useDarkMode()

    return useCallback((chartData) => {
        try {
            const CHART_HEIGHT = chartData?.chart?.height || 350
            const CHART_TYPE = chartData?.chart?.type || 'line'

            let optionsValues = {}

            if ("chart" in chartData) {
                optionsValues['chart'] = {
                    ...chartData?.chart,
                    forceColor: isDarkMode ? "#ffffff" : "#000000",
                    tooltip: {
                        ...chartData?.chart?.tooltip,
                        style: {
                            color:  isDarkMode ? "#000000" : "#ffffff",
                        }
                    }
                }
            }

            if ("stroke" in chartData) {
                optionsValues['stroke'] = {
                    ...chartData?.stroke
                }
            }

            if ("xaxis" in chartData) {
                optionsValues['xaxis'] = {
                    ...chartData?.xaxis
                }
            }

            if ("colors" in chartData) {
                optionsValues['colors'] = [...chartData?.colors]
            }

            if ("dataLabels" in chartData) {
                optionsValues['dataLabels'] = chartData?.dataLabels
            }

            if ("yaxis" in chartData) {
                if (!!(chartData?.yaxis?.labels?.formatter?.fn)) {
                    optionsValues['yaxis'] = {
                        ...chartData?.yaxis,
                        labels: {
                            "formatter": value => {
                                return new Intl.NumberFormat("en-GB", {
                                    notation: "compact",
                                    compactDisplay: "short"
                                }).format(value);
                            }
                        }
                    }
                } else {
                    optionsValues['yaxis'] = {...chartData?.yaxis}
                }
            }

            if ("labels" in chartData) {
                optionsValues['labels'] = [...chartData?.labels]
            }

            if ("annotations" in chartData) {
                optionsValues['annotations'] = {
                    ...chartData?.annotations
                }
            }

            return {
                "options": optionsValues,
                "series": chartData?.series || [],
                "type": CHART_TYPE,
                "height": CHART_HEIGHT
            }
        } catch (error) {
            errorHandler("useChartApexOptions", "useChartApexOptions", error)
        }
    }, [isDarkMode])
}

export default useChartApexOptions;
