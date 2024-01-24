'use client'

import React from 'react';
import {LoginPage} from "@/components/pages/login";
import {Container} from "@/components/entities/container";
import {cn} from "@/lib/utils";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Page(props) {
    return (
        <Container cls={cn("")}>
            <LoginPage/>
        </Container>
    );
}

export default Page;
