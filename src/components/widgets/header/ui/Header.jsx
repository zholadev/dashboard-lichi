'use client'

import React, {useState} from 'react';
import Link from "next/link";
import {cn} from "@/lib/utils";
import Logout from "./components/Logout";
import {usePathname} from "next/navigation";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {useScrollAction} from "@/components/shared/hooks";
import {Input} from "@/components/shared/shadcn/ui/input";
import {ModeToggle} from "@/components/shared/theme-switch";
import {routerPagesList} from "@/components/entities/router/model/routerPagesList";
import {Sheet, SheetClose, SheetContent, SheetTrigger,} from "@/components/shared/shadcn/ui/sheet"

/**
 * @author Zholaman Zhumanov
 * @created 22.01.2024
 * @todo refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function Header(props) {
    const pathname = usePathname()

    const isScroll = useScrollAction({position: 20})

    const menuList = [
        {
            "id": 1,
            "title": "Главная",
            "link": routerPagesList.main,
        },
        {
            "id": 2,
            "title": "Розница",
            "link": routerPagesList.offline,
        },
        {
            "id": 3,
            "title": "События",
            "link": routerPagesList.events,
        },
        {
            "id": 4,
            "title": "Товары",
            "link": routerPagesList.products,
        },
        {
            "id": 5,
            "title": "Состояние склада",
            "link": routerPagesList.stock,
        },
        {
            "id": 6,
            "title": "Поставки",
            "link": routerPagesList.supply,
        },
        {
            "id": 7,
            "title": "План продаж",
            "link": routerPagesList.offline_plan,
        },

    ]

    if (pathname === routerPagesList.login) {
        return null
    }

    return (
        <>
            <header className={
                cn(
                    "flex sticky top-0 justify-between z-50 py-4 md:px-7 px-5 items-center transition-all duration-200",
                    isScroll ? "bg-white/30 backdrop-blur-sm" : "bg-transparent"
                )
            }>
                <div className={"w-[60px] items-center xl:hidden"}>
                    <Sheet>
                        <SheetTrigger asChild>
                            <HamburgerMenuIcon width={25} height={25}/>
                        </SheetTrigger>
                        <SheetContent className={cn("outline-0 md:max-w-[600px] w-full")} side={"left"}>
                            <div className="grid gap-4 py-4">
                                <ul className={"flex flex-col gap-8"}>
                                    {
                                        menuList.map((menuItem) => (
                                            <li
                                                key={menuItem.id}
                                                className={cn("text-md font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer", pathname === menuItem.link ? "text-primary" : "")}>
                                                <SheetClose asChild>
                                                    <Link href={menuItem.link}>
                                                        {menuItem.title}
                                                    </Link>
                                                </SheetClose>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <nav rel={"navigation"} aria-label={"navigation"}
                     className={"flex items-center gap-10 space-x-4 lg:space-x-6 max-xl:hidden"}>
                    <h3 className={"text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"}>Dashboard</h3>
                    <ul className={"flex items-center gap-8"}>
                        {
                            menuList.map((menuItem) => (
                                <li
                                    key={menuItem.id}
                                    className={cn("text-md font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer", pathname === menuItem.link ? "text-primary" : "")}>
                                    <Link href={menuItem.link}>
                                        {menuItem.title}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                <div className={"flex items-center justify-center gap-5"}>
                    <Input placeholder={'Search...'} className={cn("w-[340px] max-sm:hidden")}/>
                    <ModeToggle/>
                    <Logout/>
                </div>
            </header>
        </>
    );
}

export default Header;
