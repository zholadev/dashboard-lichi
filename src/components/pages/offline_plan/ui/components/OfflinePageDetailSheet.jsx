import React from 'react';
import {cn} from "@/lib/utils";
import {Heading} from "@/components/shared/uikit/heading";
import {Sheet, SheetContent, SheetTrigger} from "@/components/shared/shadcn/ui/sheet";
import OfflinePageDetailForm from "@/components/pages/offline_plan_detail/ui/components/OfflinePageDetailForm";
import OfflinePlanDetailData from "@/components/pages/offline_plan_detail/ui/components/OfflinePlanDetailData";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {format} from "date-fns";

/**
 * @author Zholaman Zhumanov
 * @created 04.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageDetailSheet(props) {
    const {children, title, id, date} = props

    const {offPlanDetailDate} = useAppSelector(state => state.offline_plan_detail)

    return (
        <Sheet>
            <SheetTrigger>
                {children}
            </SheetTrigger>
            <SheetContent className={cn("outline-0 md:max-w-[2000px] w-full h-full overflow-y-auto")} side={"right"}>
                <div className={cn("border-b w-full text-center")}>
                    <Heading type={'h2'}>{title}</Heading>
                    {/*<Heading type={'h4'}>{offPlanDetailDate ? format(offPlanDetailDate, 'MM/yyyy') : date}</Heading>*/}
                </div>

                <OfflinePageDetailForm id={id} date={date}/>
                <OfflinePlanDetailData id={id}/>
            </SheetContent>
        </Sheet>
    );
}

export default OfflinePageDetailSheet;
