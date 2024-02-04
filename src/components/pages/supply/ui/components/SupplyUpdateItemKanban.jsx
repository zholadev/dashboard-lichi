import React, {useState} from 'react';
import {cn} from "@/lib/utils";
import {Pencil1Icon} from "@radix-ui/react-icons";
import {useApiRequest} from "@/components/shared/hooks";
import {Button} from "@/components/shared/shadcn/ui/button";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import SupplyUpdateItemKanbanModal from "./SupplyUpdateItemKanbanModal";
import {apiGetSupplyKanbanItem} from "@/components/shared/services/axios/clientRequests";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/shared/shadcn/ui/dialog";

/**
 * @author Zholaman Zhumanov
 * @created 04.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function SupplyUpdateItemKanban(props) {
    const {id, weekId, updateKanbanData} = props

    const {apiFetchHandler, loading} = useApiRequest()

    const {
        supplyParamsNetworkId
    } = useAppSelector(state => state?.supply)

    const [toggleDialog, setToggleDialog] = useState(false)
    const [kanbanGetData, setKanbanGetData] = useState([])
    const fetchRemoveItem = async () => {
        await apiFetchHandler(
            apiGetSupplyKanbanItem,
            [id, supplyParamsNetworkId, weekId],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        setToggleDialog(true)
                        setKanbanGetData(params.data?.["item"])
                    }
                }
            }
        )
    }

    return (
        <>
            <Button variant={"ghost"} type={"button"} className={cn("mb-3")} onClick={fetchRemoveItem}>
                <LoaderButton loading={loading}/>
                <Pencil1Icon/>
            </Button>
            <Dialog open={toggleDialog} onOpenChange={setToggleDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={cn("mb-3")}>Обновить товар</DialogTitle>
                    </DialogHeader>
                    <SupplyUpdateItemKanbanModal
                        id={id}
                        weekId={weekId}
                        updateKanbanData={updateKanbanData}
                        article={kanbanGetData?.["sk_item_id"]}
                        closeModalHandle={() => setToggleDialog(false)}
                        data={kanbanGetData?.["sk_data"]?.["amount_by_size"]}
                    />
                </DialogContent>
            </Dialog>
        </>

    );
}

export default SupplyUpdateItemKanban;
