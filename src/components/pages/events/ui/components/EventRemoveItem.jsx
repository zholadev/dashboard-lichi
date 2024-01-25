import React from 'react';
import {useApiRequest} from "@/components/shared/hooks";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/shared/ui/alert-dialog";
import {TrashIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/shared/ui/button";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {apiRemoveEventItem} from "@/components/shared/services/axios/clientRequests";

/**
 * @author Zholaman Zhumanov
 * @created 25.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function EventRemoveItem(props) {
    const {id, updateEventData} = props

    const {apiFetchHandler, loading} = useApiRequest()

    const fetchRemoveEventItem = async () => {
        await apiFetchHandler(
            apiRemoveEventItem,
            [id],
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

                    <Button variant={"destructive"} onClick={fetchRemoveEventItem}>
                        <LoaderButton loading={loading}/>
                        Подтвердит
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default EventRemoveItem;
