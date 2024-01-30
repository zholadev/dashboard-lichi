import React from 'react';
import {Container} from "@/components/entities/container";
import {OfflinePlanDetailPage} from "@/components/pages/offline_plan_detail";

/**
 * @author Zholaman Zhumanov
 * @param props
 * @returns {Element}
 * @constructor
 */
function Page(props) {
    return (
        <Container>
            <OfflinePlanDetailPage id={props.params.id} date={props.searchParams?.date}/>
        </Container>
    );
}

export default Page;
