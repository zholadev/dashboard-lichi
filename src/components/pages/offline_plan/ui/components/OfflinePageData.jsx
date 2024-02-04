import React, {useCallback} from 'react';
import {cn} from "@/lib/utils";
import {Pencil1Icon} from "@radix-ui/react-icons";
import {hl_get_random_colors} from "@/lib/random_colors";
import {Badge} from "@/components/shared/shadcn/ui/badge";
import {Heading} from "@/components/shared/uikit/heading";
import OfflinePageDetailSheet from "./OfflinePageDetailSheet";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {ListSkeleton, NotData} from "@/components/shared/uikit/templates";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/shared/shadcn/ui/tooltip";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/shared/shadcn/ui/table";
import {format} from "date-fns";


/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageData(props) {
    const {offPlanApiLoader, offlinePlanData, offPlanDateParams} = useAppSelector(state => state.offline_plan)

    /**
     * @author Zholaman Zhumanov
     * @description берем процент выполнение для плана продажи (план и итоги)
     * @type {(function(*, *): (number|undefined))|*}
     */
    const calculatePercent = useCallback((fact, plan) => {
        try {
            return Math.floor((Math.floor(fact) / Math.floor(plan)) * 100);
        } catch (error) {
            errorHandler("offlinePageData", "func/calculatePercent", error)
        }
    }, [])

    /**
     * @author Zholaman Zhumanov
     * @description берем рандомные цвета для каждого элемента данных
     * @type {(function(*): (*|undefined))|*}
     */
    const getRandomColor = useCallback((index) => {
        try {
            return hl_get_random_colors(offlinePlanData?.["fact"]?.length)?.[index]
        } catch (error) {
            errorHandler("offlinePageData", "func/getRandomColor", error)
        }
    }, [offlinePlanData])

    if (offPlanApiLoader) {
        return <ListSkeleton/>
    }

    if (offlinePlanData.length === 0) {
        return <NotData/>
    }

    return (
        <>
            <div className={cn("space-x-3")}>
                <Heading cls={cn("flex items-center gap-1 cursor-pointer")} type={"h4"}>Выполнение плана <Pencil1Icon
                    width={20}/></Heading>
            </div>
            <div className={cn("w-100 border rounded mt-3")}>

                <Table className={cn("mb-3")}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <h4>Магазин</h4>
                            </TableHead>
                            <TableHead>
                                <h4>План</h4>
                            </TableHead>
                            <TableHead>
                                <h4>Факт</h4>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            Object.entries(offlinePlanData?.["fact"] || {}).map(([key, value], index) => {
                                const percent = calculatePercent(value?.["fact"], value?.["plan"], value?.["plan"])
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">
                                            <TooltipProvider key={index}>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        {
                                                            value?.["guid"] ? (
                                                                <OfflinePageDetailSheet
                                                                    id={value?.["guid"]}
                                                                    date={format(offPlanDateParams, 'MM/yyyy')}
                                                                    title={value?.["name"]}
                                                                >
                                                                    <Heading
                                                                        cls={cn("cursor-pointer select-none hover:opacity-40 transition-opacity duration-100 ease-in-out")}
                                                                        type={"h4"}
                                                                    >
                                                                        {value?.["name"]}
                                                                    </Heading>
                                                                </OfflinePageDetailSheet>
                                                            ) : (
                                                                <Heading
                                                                    cls={cn("cursor-pointer select-none hover:opacity-40 transition-opacity duration-100 ease-in-out")}
                                                                    type={"h4"}
                                                                >
                                                                    {value?.["name"]}
                                                                </Heading>
                                                            )
                                                        }
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Подробнее</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                        </TableCell>
                                        <TableCell className="font-light text-left">
                                            <div
                                                className={cn("w-full flex items-center md:flex-row p-3 flex-col justify-between mb-2 relative")}>
                                                <div className={cn("absolute top-0 left-0 h-full")}
                                                     style={{
                                                         backgroundColor: `${getRandomColor(index)}`,
                                                         width: `${percent}%`
                                                     }}/>
                                                <Heading type={"h4"}
                                                         cls={cn("mb-0 text-bold relative font-medium")}>{value?.["plan"]}</Heading>
                                                <Badge className={cn("relative")}>{percent} %</Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-light">
                                            <Heading type={"h4"} cls={cn("mb-0")}>{value?.["fact"]}</Heading>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

export default OfflinePageData;
