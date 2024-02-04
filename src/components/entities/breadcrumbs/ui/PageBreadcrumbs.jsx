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

    const firstPage = {
        "id": 1,
        "title": "Главная",
        "link": routerPagesList.main,
        "slash": true
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
                "link": false,
                "slash": false
            }
        ],
        "offline_plan": [
            firstPage,
            {
                "id": 2,
                "title": "План продаж",
                "link": false,
                "slash": false
            }
        ],
        "products": [
            firstPage,
            {
                "id": 2,
                "title": "Отчет по товарам",
                "link": false,
                "slash": false
            }
        ],
        "offline": [
            firstPage,
            {
                "id": 2,
                "title": "Розница",
                "link": false,
                "slash": false
            }
        ],
        "supply": [
            firstPage,
            {
                "id": 2,
                "title": "Поставки",
                "link": false,
                "slash": false
            }
        ],
        "stock": [
            firstPage,
            {
                "id": 2,
                "title": "Состояние склада",
                "link": false,
                "slash": false
            }
        ],
    }

    if (!page) {
        return null
    }

    return (
        <ul className={"flex items-center md:justify-start justify-center gap-1 md:text-xs text-sm mt-5 mb-10 text-slate-500"}>
            {
                Object.values(pageList[page] || {}).map((pageItem) => (
                    pageItem.link ? (
                        <li
                            key={pageItem?.["id"]}
                            className={"cursor-pointer hover:text-primary"}
                        >
                            <Link href={pageItem.link}>
                                {pageItem?.["title"]} {pageItem?.["slash"] && <span>/</span>}
                            </Link>
                        </li>
                    ) : (
                        <li
                            key={pageItem?.["id"]}
                            className={"cursor-pointer hover:text-primary"}
                        >
                            {pageItem?.["title"]} {pageItem?.["slash"] && <span>/</span>}
                        </li>
                    )
                ))
            }
        </ul>
    );
}

export default PageBreadcrumbs;
