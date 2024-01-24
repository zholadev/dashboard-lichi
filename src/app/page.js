'use client'

import {PageBreadcrumbs} from "@/components/entities/breadcrumbs";
import {MainPage} from "@/components/pages/main";
import {Container} from "@/components/entities/container";

export default function Home() {
    return (
        <Container>
            <PageBreadcrumbs page={"main"}/>
            <MainPage/>
        </Container>
    );
}
