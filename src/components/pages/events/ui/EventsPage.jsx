'use client'

import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/shared/ui/table"
import {Pencil1Icon, PlusIcon, TrashIcon} from '@radix-ui/react-icons'
import {Button} from "@/components/shared/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/shared/ui/dialog"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/shared/ui/alert-dialog"
import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/shared/ui/input";
import {cn} from "@/lib/utils";
import {Checkbox} from "@/components/shared/ui/checkbox";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/shared/ui/pagination";
import {Heading} from "@/components/shared/uikit/heading";

/**
 * @author Zholaman Zhumanov
 * @created 23.01.2024
 * @todo refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function EventsPage(props) {

    const eventsList = [
        {
            id: 1,
            color: "red"
        },
        {
            id: 1,
            color: "green"
        },
        {
            id: 1,
            color: "blue"
        },
        {
            id: 1,
            color: "fuchsia"
        },
    ]

    return (
        <>
            <Heading type={"h1"}>Настройка событий</Heading>
            <div className={"flex items-center justify-between mb-9"}>
                <h3>Событие</h3>

                <div>
                    <Dialog>
                        <DialogTrigger>
                            <Button>
                                <PlusIcon/>
                                Добавить
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Добавить событие</DialogTitle>
                            </DialogHeader>

                            <form className={cn("w-100 mt-2")}>
                                <div className="grid gap-2 mb-5">
                                    <Label htmlFor="name">Наименование</Label>
                                    <Input type="name" id="name" defaultValue=""/>
                                </div>
                                <div className={cn("grid grid-cols-3 gap-4 items-end mb-8")}>
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Дата начала</Label>
                                        <Input id="username" defaultValue=""/>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Дата окончание</Label>
                                        <Input id="username" defaultValue=""/>
                                    </div>
                                    <div className="items-top flex space-x-2 items-center">
                                        <Checkbox id="terms1"/>
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                                htmlFor="terms1"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Ежегодно?
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className={cn("w-100 flex items-center justify-center gap-5")}>
                                    <Button variant={"secondary"}>Отмена</Button>
                                    <Button type="submit">Сохранть</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className={""}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30px]"></TableHead>
                            <TableHead>Дата</TableHead>
                            <TableHead>Ежегодно?</TableHead>
                            <TableHead>Наименование</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            eventsList.map((eventItem) => (
                                <TableRow key={eventItem.id}>
                                    <TableCell className="font-medium">
                                        <div
                                            className={`rounded-full w-[10px] h-[10px] bg-${eventItem.color}-700`}></div>
                                    </TableCell>
                                    <TableCell>2022-03-08</TableCell>
                                    <TableCell>Нет</TableCell>
                                    <TableCell>8 Марта</TableCell>
                                    <TableCell>
                                        <div className={"flex items-center gap-4"}>
                                            <Dialog>
                                                <DialogTrigger>
                                                    <i><Pencil1Icon/></i>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Добавить событие</DialogTitle>
                                                    </DialogHeader>

                                                    <form className={cn("w-100 mt-2")}>
                                                        <div className="grid gap-2 mb-5">
                                                            <Label htmlFor="name">Наименование</Label>
                                                            <Input type="name" id="name" defaultValue=""/>
                                                        </div>
                                                        <div className={cn("grid grid-cols-3 gap-4 items-end mb-8")}>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="username">Дата начала</Label>
                                                                <Input id="username" defaultValue=""/>
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="username">Дата окончание</Label>
                                                                <Input id="username" defaultValue=""/>
                                                            </div>
                                                            <div className="items-top flex space-x-2">
                                                                <Checkbox id="terms1"/>
                                                                <div className="grid gap-1.5 leading-none">
                                                                    <label
                                                                        htmlFor="terms1"
                                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                    >
                                                                        Ежегодно?
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={cn("w-100 flex items-center justify-center gap-5")}>
                                                            <Button variant={"secondary"}>Отмена</Button>
                                                            <Button type="submit">Сохранть</Button>
                                                        </div>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>

                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <i><TrashIcon/></i>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Вы точно хотите удалить?</AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                                                        <Button variant={"destructive"}>
                                                            Подтвердит
                                                        </Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>

            <Pagination className={"mb-20 mt-10"}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious title={"Назад"} href="#"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext title={"Дальше"} href="#"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}

export default EventsPage;
