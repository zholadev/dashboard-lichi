'use client'

import React from 'react';
import Link from "next/link";
import Cookie from "js-cookie";
import {cn} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/shared/shadcn/ui/dropdown-menu";
import {Input} from "@/components/shared/shadcn/ui/input";
import {Button} from "@/components/shared/shadcn/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {useScrollAction} from "@/components/shared/hooks";
import {ModeToggle} from "@/components/shared/theme-switch";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/shared/shadcn/ui/avatar";
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

    const router = useRouter()
    const pathname = usePathname()

    const isScroll = useScrollAction({position: 20})

    const logoutHandle = () => {
        Cookie.remove("dashboard-token")
        router.push(routerPagesList.login)
    }

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
                                                className={"text-md font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"}>
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
                                    className={"text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"}>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className={'cursor-pointer'}>
                                <AvatarImage
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKZSiWQB-GfxbTtElgRZnQM264qZhkf6LoIZTvuMWkr8BpGxc6MVfwcy_C6UA3LlIfmX8&usqp=CAU"/>
                                <AvatarFallback>Z</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Profile
                                    {/*<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Billing
                                    {/*<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>*/}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Settings
                                    {/*<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
                                </DropdownMenuItem>
                                {/*<DropdownMenuItem>*/}
                                {/*    Themes*/}
                                {/*    <DropdownMenuShortcut><ModeToggle/></DropdownMenuShortcut>*/}
                                {/*</DropdownMenuItem>*/}
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                <Button
                                    type={"button"}
                                    variant={'ghost'}
                                    onClick={logoutHandle}
                                >
                                    Log out
                                </Button>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ModeToggle/>
                </div>
            </header>
        </>
    );
}

export default Header;
