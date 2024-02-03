import React, {useCallback} from 'react';
import {cn} from "@/lib/utils";
import {Pencil2Icon} from "@radix-ui/react-icons";
import {Button} from "@/components/shared/shadcn/ui/button";
import {useDispatchActionHandle} from "@/components/shared/hooks";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 31.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageEditToolbar(props) {
    const {confirmDataClick} = props

    const {
        offEditBoard
    } = useAppSelector(state => state?.offline)

    const events = useDispatchActionHandle()

    /**
     * @author Zholaman Zhumanov
     * @description cancel, confirm and reset events
     * @type func
     */
    const cancelClickHandle = useCallback(() => {
        try {
            events.offEditBoardAction(!offEditBoard)
        } catch (error) {
            errorHandler("offPageEditToolbar", "cancelClickHandle", error)
        }
    }, [offEditBoard])

    const confirmClickHandle = useCallback(() => {
        try {
            cancelClickHandle()
            confirmDataClick()
        } catch (error) {
            errorHandler("offPageEditToolbar", "confirmClickHandle", error)
        }
    }, [cancelClickHandle, confirmDataClick])

    const resetClickHandle = useCallback(() => {
        try {
            localStorage.removeItem("schema_hide_reports_saves")
            localStorage.removeItem("schema_show_reports_saves")
        } catch (error) {
            errorHandler("offPageEditToolbar", "resetClickHandle", error)
        }
    }, [])

    return (
        <div className={cn("flex items-center mb-3 gap-3")}>
            <Button
                variant={"outline"}
                className={cn("flex items-center gap-1")}
                onClick={cancelClickHandle}
            >
                {offEditBoard ? 'Отмена' : 'Редактировать'} <Pencil2Icon/>
            </Button>

            {
                offEditBoard &&
                <Button
                    onClick={confirmClickHandle}
                >
                    Подтвердить
                </Button>
            }

            {/*{*/}
            {/*    offEditBoard &&*/}
            {/*    <Button*/}
            {/*        onClick={resetClickHandle}*/}
            {/*    >*/}
            {/*        Сбросить*/}
            {/*    </Button>*/}
            {/*}*/}
        </div>
    );
}

export default OfflinePageEditToolbar;
