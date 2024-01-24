import React from 'react';
import {Skeleton} from "@/components/shared/ui/skeleton";
import {Container} from "@/components/entities/container";

function Loading(props) {
    return (
        <Container>
            <div className={"w-100"}>
                <div className={"w-100 grid grid-cols-4 gap-3 mb-6"}>
                    <Skeleton className="w-[100%] h-[120px] rounded-2"/>
                    <Skeleton className="w-[100%] h-[120px] rounded-2"/>
                    <Skeleton className="w-[100%] h-[120px] rounded-2"/>
                    <Skeleton className="w-[100%] h-[120px] rounded-2"/>
                </div>

                <div className={"w-100 grid grid-cols-2 gap-3 mb-6"}>
                    <Skeleton className="w-[100%] h-[450px] rounded-2"/>
                    <Skeleton className="w-[100%] h-[450px] rounded-2"/>
                </div>

                <div className={"w-100 grid grid-cols-2 gap-3 mb-6"}>
                    <Skeleton className="w-[100%] h-[450px] rounded-2"/>
                    <Skeleton className="w-[100%] h-[450px] rounded-2"/>
                </div>
            </div>
            <Skeleton className="w-[100px] h-[20px] rounded-full"/>
        </Container>
    );
}

export default Loading;
