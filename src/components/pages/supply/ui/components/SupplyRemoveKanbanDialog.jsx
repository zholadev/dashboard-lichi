'use client'

import React from 'react';
import {cn} from "@/lib/utils";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/shared/shadcn/ui/dialog";
import {TrashIcon} from "@radix-ui/react-icons";
import {useApiRequest} from "@/components/shared/hooks";
import {Button} from "@/components/shared/shadcn/ui/button";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {apiGetKanbanRemoveItem} from "@/components/shared/services/axios/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 04.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function SupplyRemoveKanbanDialog(props) {
    const {id, weekId, updateKanbanData} = props

    const {apiFetchHandler, loading} = useApiRequest()

    const {
        supplyParamsNetworkId
    } = useAppSelector(state => state?.supply)

    const fetchRemoveItem = async (id, weekId) => {
        await apiFetchHandler(
            apiGetKanbanRemoveItem,
            [id, supplyParamsNetworkId, weekId],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        updateKanbanData()
                    }
                }
            }
        )
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className={cn("text-red-500")}><TrashIcon/></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Вы действительно хотите удалить?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Отмена
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type={"button"}
                            variant={"destructive"}
                            onClick={async () => {
                                await fetchRemoveItem(id, weekId)
                            }}
                        >
                            Удалить
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default SupplyRemoveKanbanDialog;
