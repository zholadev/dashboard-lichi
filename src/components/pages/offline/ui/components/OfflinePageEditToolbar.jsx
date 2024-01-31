import React from 'react';
import {cn} from "@/lib/utils";
import {Pencil2Icon} from "@radix-ui/react-icons";
import {Button} from "@/components/shared/shadcn/ui/button";
import {useDispatchActionHandle} from "@/components/shared/hooks";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 31.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function OfflinePageEditToolbar(props) {
    const {
        offEditBoard
    } = useAppSelector(state => state?.offline)

    const events = useDispatchActionHandle()

    const buttonClickEvent = () => events.offEditBoardAction(!offEditBoard)

    return (
        <div className={cn("flex items-center mb-3 gap-3")}>
            <Button
                variant={"outline"}
                className={cn("flex items-center gap-1")}
                onClick={buttonClickEvent}
            >
                Редактировать <Pencil2Icon/>
            </Button>

            {
                offEditBoard &&
                <Button
                    onClick={buttonClickEvent}
                >
                    Подтвердить
                </Button>
            }
        </div>
    );
}

export default OfflinePageEditToolbar;
