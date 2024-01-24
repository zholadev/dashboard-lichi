'use client'

import React from 'react';
import Link from "next/link";
import {routerPagesList} from "@/components/entities/router";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function PageBreadcrumbs(props) {
    const {page, title} = props

    const firstPage =  {
        "id": 1,
        "title": "Главная",
        "link": routerPagesList.main
    }

    const pageList = {
        "main": [
            firstPage
        ],
        "events": [
            firstPage,
            {
                "id": 2,
                "title": "Событие",
                "link": false
            }
        ],
        "offline_plan": [
            firstPage,
            {
                "id": 2,
                "title": "План продаж",
                "link": false
            }
        ],
        "products": [
            firstPage,
            {
                "id": 2,
                "title": "Отчет по товарам",
                "link": false
            }
        ],
        "offline": [
            firstPage,
            {
                "id": 2,
                "title": "Розница",
                "link": false
            }
        ],
        "supply": [
            firstPage,
            {
                "id": 2,
                "title": "Поставки",
                "link": false
            }
        ],
    }

    if (!page) {
        return null
    }

    return (
        <ul className={"flex items-center gap-1 text-xs mt-5 mb-10 text-slate-500"}>
            {
                Object.values(pageList[page] || {}).map((pageItem) => (
                    pageItem.link ? (
                        <li
                            key={pageItem?.["id"]}
                            className={"cursor-pointer hover:text-primary"}
                        >
                            <Link href={pageItem.link}>
                                / {pageItem?.["title"]}
                            </Link>
                        </li>
                    ) : (
                        <li
                            key={pageItem?.["id"]}
                            className={"cursor-pointer hover:text-primary"}
                        >
                            / {pageItem?.["title"]}
                        </li>
                    )
                ))
            }
        </ul>
    );
}

export default PageBreadcrumbs;
