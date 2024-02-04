'use client'

import React, {useMemo} from 'react';
import {cn} from "@/lib/utils";
import Image from "next/image";
import {TableData} from "@/components/shared/uikit/table";
import {Heading} from "@/components/shared/uikit/heading";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";
import {Sheet, SheetContent, SheetTrigger} from "@/components/shared/shadcn/ui/sheet";
import {ListSkeleton, NotData} from "@/components/shared/uikit/templates";
import SupplyColumnModal from "@/components/pages/supply/ui/components/SupplyColumnModal";
import {Button} from "@/components/shared/shadcn/ui/button";
import {Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function SupplyKanbanColumnSheet(props) {
    const {children, week, year, weekId, updateKanbanData} = props

    const {
        supplyKanbanColumnData,
        supplyKanbanColumnApiLoader
    } = useAppSelector(state => state?.supply)

    const tableColumns = useMemo(() => {
        try {
            return [
                {
                    "accessorKey": "sk_photo",
                    cell: ({row}) => (
                        <div className={cn("min-w-[200px] w-full flex justify-center items-center")}>
                            <Image
                                width={90}
                                height={100}
                                loading={"lazy"}
                                src={row?.original?.["sk_photo"]}
                                alt={'...'}
                            />
                        </div>
                    ),
                    "header": 'Фото',
                },
                {
                    "accessorKey": "sk_product",
                    cell: ({row}) => (
                        <div className={cn("")}>
                            <Heading type={"h4"}>{row?.original?.["sk_product"]?.["sk_item_id"]}</Heading>
                            <Heading type={"h5"}>{row?.original?.["sk_product"]?.["modelsupplier"]}</Heading>
                        </div>
                    ),
                    "header": 'Товар',
                },
                {
                    "accessorKey": "amount",
                    cell: ({row}) => (
                        <div className={cn("")}>
                            <Heading type={"h4"}>{row?.original?.["amount"]}</Heading>
                        </div>
                    ),
                    "header": 'Кол-во',
                },
                {
                    "accessorKey": "sk_created_display",
                    cell: ({row}) => (
                        <div className={cn("")}>
                            <Heading type={"h4"}>{row?.original?.["sk_created_display"]}</Heading>
                        </div>
                    ),
                    "header": 'Дата создание',
                },
                {
                    "accessorKey": "sk_updated_display",
                    cell: ({row}) => (
                        <div className={cn("")}>
                            <Heading type={"h4"}>{row?.original?.["sk_updated_display"]}</Heading>
                        </div>
                    ),
                    "header": 'Обновлен',
                },
                {
                    "accessorKey": "sk_date_display",
                    cell: ({row}) => (
                        <div className={cn("")}>
                            <Heading type={"h4"}>{row?.original?.["sk_date_display"]}</Heading>
                        </div>
                    ),
                    "header": 'Дата поставки',
                },
                {
                    "accessorKey": "",
                    cell: ({row}) => (
                        <div className={cn("")}>
                            <Button variant={"ghost"} className={cn("mb-3")}><Pencil1Icon/></Button>
                            <Button variant={"ghost"} className={cn("text-red-500")}><TrashIcon/></Button>
                        </div>
                    ),
                    "header": 'Изменить/Удалить',
                },
            ]
        } catch (error) {
            errorHandler("supplyKanbanSheet", "memo/tableColumns", error)
        }
    }, [])

    const tableData = useMemo(() => {
        try {
            return Object.values(supplyKanbanColumnData || {}).map((item) => {
                return {
                    "sk_photo": item?.["sk_photo"],
                    "sk_product": {
                        "sk_item_id": item?.["sk_item_id"],
                        "modelsupplier": item?.["sk_data"]?.["product"]?.["modelsupplier"],
                    },
                    "amount": item?.["sk_data"]?.["product"]?.["amount"],
                    "sk_created_display": item?.["sk_created_display"],
                    "sk_updated_display": item?.["sk_updated_display"],
                    "sk_date_display": item?.["sk_date_display"],
                }
            })
        } catch (error) {
            errorHandler("supplyKanbanSheet", "memo/tableData", error)
        }
    }, [supplyKanbanColumnData])

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className={cn("outline-0 md:max-w-[2000px] w-full h-full overflow-y-auto")} side={"right"}>
                <div className={cn("border-b w-full text-center")}>
                    <Heading type={'h2'}>{year}</Heading>
                    <Heading type={'h4'}>{week}</Heading>
                </div>

                <div className={cn("mt-5 mb-8")}>
                    <SupplyColumnModal updateKanbanData={updateKanbanData} weekId={weekId}/>
                </div>

                {
                    supplyKanbanColumnApiLoader ? (
                        <ListSkeleton/>
                    ) : Object.values(supplyKanbanColumnData || {}).length === 0 ? (
                        <NotData/>
                    ) : (
                        <TableData
                            data={tableData}
                            columns={tableColumns}
                            hideLimitContent
                            hidePagination
                        />
                    )
                }

            </SheetContent>
        </Sheet>
    );
}

export default SupplyKanbanColumnSheet;
