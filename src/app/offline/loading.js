import React from 'react';
import {Skeleton} from "@/components/shared/ui/skeleton";
import {Container} from "@/components/entities/container";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Loading(props) {
    return (
        <Container>
            <div className={"w-100"}>
                <div className={"w-100 grid 2xl:grid-cols-2 grid-cols-1 gap-3 mb-6"}>
                    <Skeleton className="w-[100%] h-[320px] rounded-2"/>
                    <Skeleton className="w-[100%] h-[320px] rounded-2"/>
                </div>

                <div className={"w-100 grid 2xl:grid-cols-2 grid-cols-1 gap-3 mb-6"}>
                    <Skeleton className="w-[100%] h-[320px] rounded-2"/>
                    <Skeleton className="w-[100%] h-[320px] rounded-2"/>
                </div>

                <div className={"w-100 grid 2xl:grid-cols-2 grid-cols-1 gap-3 mb-6"}>
                    <Skeleton className="w-[100%] h-[320px] rounded-2"/>
                    <Skeleton className="w-[100%] h-[320px] rounded-2"/>
                </div>
            </div>
        </Container>
    );
}

export default Loading;
