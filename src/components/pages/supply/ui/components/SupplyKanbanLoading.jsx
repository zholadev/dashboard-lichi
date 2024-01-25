import React from 'react';
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/shared/ui/skeleton";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function SupplyKanbanLoading(props) {
    const {loading} = props

    return (
        <div className={cn("border mb-20 p-4 rounded mt-3")}>
            <div
                className={cn("grid gap-4 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 justify-start grid-cols-1 mb-5 items-end")}>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
                <Skeleton className="w-[100%] h-[320px] rounded-2 mb-3"/>
            </div>
        </div>
    );
}

export default SupplyKanbanLoading;
