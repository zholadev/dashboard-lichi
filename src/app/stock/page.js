import {promises as fs} from "fs"
import path from "path"

import React from 'react';
import {Container} from "@/components/entities/container";
import {PageBreadcrumbs} from "@/components/entities/breadcrumbs";
import {StockPage} from "@/components/pages/stock";

// Simulate a database read for tasks.
async function getTasks() {
    const data = await fs.readFile(
        path.join(process.cwd(), "src/tasks.json")
    )

    return JSON.parse(data.toString())
}

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
async function Page(props) {
    const tasks = await getTasks()

    return (
        <Container>
            <PageBreadcrumbs page={"stock"}/>
            <StockPage data={tasks}/>
        </Container>
    );
}

export default Page;
