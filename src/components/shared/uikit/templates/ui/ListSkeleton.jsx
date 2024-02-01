import React from 'react';
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function ListSkeleton(props) {
    return (
        <div className={cn("w-full flex justify-center items-center my-4")}>
            <div className={cn("w-full flex flex-row flex-wrap md:gap-3 gap-1 items-center")}>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
                <Skeleton className="w-full h-[30px] rounded-2 mb-1"/>
            </div>
        </div>
    );
}

export default ListSkeleton;
