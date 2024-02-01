'use client'

import React from 'react';
import {cn} from "@/lib/utils";
import {PlusIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/shared/shadcn/ui/button";
import SupplyColumnCreateForm from "@/components/pages/supply/ui/components/SupplyColumnCreateForm";
import SupplyColumnSearchArticle from "@/components/pages/supply/ui/components/SupplyColumnSearchArticle";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/shared/shadcn/ui/dialog";

/**
 * @author Zholaman Zhumanov
 * @created 01.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function SupplyColumnModal(props) {
    const {weekId} = props

    return (
        <Dialog>
            <DialogTrigger>
                <Button className={cn("flex items-center gap-2")}>Добавить <PlusIcon/></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить товар</DialogTitle>
                </DialogHeader>

                <SupplyColumnSearchArticle/>
                <SupplyColumnCreateForm weekId={weekId}/>
            </DialogContent>
        </Dialog>
    );
}

export default SupplyColumnModal;

// {
//     "sk_id": "",
//     "sk_item_id": "DR05210",
//     "sk_data": {
//     "amount_by_size": {
//         "l": "10",
//             "s": "10",
//             "m": "10",
//             "xs": "10"
//     }
// },
//     "sk_network_id": "1",
//     "sk_week_id": "2023-01"
// }
