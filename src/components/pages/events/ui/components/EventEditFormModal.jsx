'use client'

import React, {useState} from 'react';
import * as z from "zod";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {useForm} from "react-hook-form";
import {Pencil1Icon} from "@radix-ui/react-icons";
import {Input} from "@/components/shared/shadcn/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/shared/shadcn/ui/button";
import {useApiRequest} from "@/components/shared/hooks";
import {Checkbox} from "@/components/shared/shadcn/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/shared/shadcn/ui/dialog";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/shared/shadcn/ui/calendar";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {apiEditEventItem} from "@/components/shared/services/axios/clientRequests";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/shadcn/ui/popover";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/shared/shadcn/ui/form";


/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function EventEditFormModal(props) {
    const {editData, updateEventData, id} = props

    const [startDate, setStartDate] = useState(editData?.["a_date"])
    const [endDate, setEndDate] = useState(editData?.["a_date_end"])
    const [everyYearCheck, setEveryYearCheck] = useState(editData?.["a_every_year"])
    const [backgroundColorValue, setBackgroundColorValue] = useState(editData?.["a_label_options"]?.["backgroundColor"])
    const [colorValue, setColorValue] = useState(editData?.["a_label_options"]?.["color"])

    const {apiFetchHandler, loading} = useApiRequest()

    const formSchema = z.object({
        a_name: z.string().min(2, {
            message: "Имя должно состоять минимум из 2 символов.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            a_date: startDate,
            a_date_end: endDate,
            a_every_year: everyYearCheck,
            backgroundColor: editData?.["a_label_options"]?.["backgroundColor"],
            color: editData?.["a_label_options"]?.["color"],
            a_name: editData?.["a_name"]
        },
    })

    const onSubmit = (values) => {
        const {a_name} = values
        fetchEventEdit(a_name)
    }

    const fetchEventEdit = async (name) => {
        const eventSendParams = {
            a_date: format(startDate, 'yyyy-MM-dd'),
            a_date_end: format(endDate, 'yyyy-MM-dd'),
            a_every_year: everyYearCheck || everyYearCheck === 1 ? 1 : 0,
            a_label_options: {
                color: colorValue, backgroundColor: backgroundColorValue
            },
            a_name: name,
            a_id: id
        }

        await apiFetchHandler(
            apiEditEventItem,
            [eventSendParams, id],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        if (!updateEventData) return
                        updateEventData()
                    }
                }
            }
        )
    }

    return (
        <Dialog>
            <DialogTrigger>
                <i><Pencil1Icon/></i>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить событие</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form className={cn("w-100 mt-2")} onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="a_name"
                            render={({field}) => {
                                return (
                                    <FormItem className={cn("grid gap-2 mb-5")}>
                                        <FormLabel>Наименование</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                id="name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="a_date"
                            render={({field}) => {
                                return (
                                    <FormItem className={cn("grid gap-2 mb-5")}>
                                        <FormLabel>Дата начала</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "justify-start text-left font-normal",
                                                            !startDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                                        {startDate ? format(startDate, "PPP") :
                                                            <span>Выберите дату</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={startDate}
                                                        onSelect={setStartDate}
                                                        initialFocus
                                                        {...field}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="a_date_end"
                            render={({field}) => {
                                return (
                                    <FormItem className={cn("grid gap-2 mb-5")}>
                                        <FormLabel>Дата окончание</FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "justify-start text-left font-normal",
                                                            !endDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                                        {endDate ? format(endDate, "PPP") : <span>Выберите дату</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={endDate}
                                                        onSelect={setEndDate}
                                                        initialFocus
                                                        {...field}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />


                        <FormField
                            control={form.control}
                            name="a_every_year"
                            render={({field}) => {
                                return (
                                    <FormItem className={cn("grid gap-2 mb-5")}>
                                        <FormLabel>Ежегодно</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                id="a_every_year"
                                                defaultChecked={editData?.["a_every_year"] === 1}
                                                onCheckedChange={(e) => setEveryYearCheck(e)}
                                                aria-label="Select row"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="backgroundColor"
                            render={({field}) => {
                                return (
                                    <FormItem className={cn("grid gap-2 mb-5")}>
                                        <FormLabel>Цвет фона</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="color"
                                                defaultValue={backgroundColorValue}
                                                onChange={(e) => {
                                                    setBackgroundColorValue(e?.nativeEvent?.target?.value)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="color"
                            render={({field}) => {
                                return (
                                    <FormItem className={cn("grid gap-2 mb-5")}>
                                        <FormLabel>Цвет текста</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="color"
                                                defaultValue={colorValue}
                                                onChange={e => {
                                                    setColorValue(e?.nativeEvent?.target?.value)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />

                        <div className={cn("w-100 flex items-center justify-center gap-5")}>
                            <DialogClose asChild>
                                <Button disabled={loading} variant={"secondary"}>Отмена</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button disabled={loading} type="submit">
                                    <LoaderButton loading={loading}/>
                                    Сохранть
                                </Button>
                            </DialogClose>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default EventEditFormModal;
