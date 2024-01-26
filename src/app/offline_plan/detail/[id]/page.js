import React from 'react';
import {Container} from "@/components/entities/container";
import {OfflinePlanDetailPage} from "@/components/pages/offline_plan_detail";

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function Page({params}) {
    return (
        <Container>
            <OfflinePlanDetailPage id={params.id}/>
        </Container>
    );
}

export default Page;
