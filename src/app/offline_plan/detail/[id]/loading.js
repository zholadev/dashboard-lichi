import React from 'react';
import {Skeleton} from "@/components/shared/shadcn/ui/skeleton";
import {Container} from "@/components/entities/container";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function Loading(props) {
    return (
        <Container>
            <div className={"w-100"}>
                <div className={"w-100 mb-10"}>
                    <Skeleton className="w-[100%] h-[20px] rounded-2"/>
                </div>

                <div className={"w-100 mb-6"}>
                    <Skeleton className="w-[100%] h-[70px] rounded-2 mb-3"/>
                    <Skeleton className="w-[100%] h-[70px] rounded-2 mb-3"/>
                    <Skeleton className="w-[100%] h-[70px] rounded-2 mb-3"/>
                    <Skeleton className="w-[100%] h-[70px] rounded-2 mb-3"/>
                    <Skeleton className="w-[100%] h-[70px] rounded-2 mb-3"/>
                    <Skeleton className="w-[100%] h-[70px] rounded-2 mb-3"/>
                    <Skeleton className="w-[100%] h-[70px] rounded-2 mb-3"/>
                    <Skeleton className="w-[100%] h-[70px] rounded-2 mb-3"/>
                </div>
            </div>
        </Container>
    );
}

export default Loading;
